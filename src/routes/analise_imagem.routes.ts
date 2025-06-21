import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import streamifier from 'streamifier';
import Clarifai from 'clarifai';
import { v2 as cloudinary } from 'cloudinary';
import { promisify } from 'util';

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'dujc01crk',
  api_key: process.env.API_KEY_CLOUDINARY,
  api_secret: process.env.API_SECRET_CLOUDINARY
});

const clarifai = new Clarifai.App({
  apiKey: process.env.API_KEY_CLARIFAI
});

//const uploadStream = promisify(cloudinary.uploader.upload_stream);

export async function analiseImagem(app: FastifyInstance) {
  app.post("/analise-imagem/criar", async (req: FastifyRequest, reply: FastifyReply) => {
    try {
      //const startTime = Date.now();
      
      if (!req.isMultipart()) {
        return reply.status(400).send({ error: "Requisição precisa ser multipart." });
      }

      const parts = req.parts();
      let buffer: Buffer | null = null;
      let amontoadoRelatadoId = "";

      // Processo do form-data
      for await (const part of parts) {
        if (part.type === "file" && part.fieldname === "image") {
          buffer = await part.toBuffer();
        } else if (part.type === "field" && part.fieldname === "amontoadoRelatadoId") {
          amontoadoRelatadoId = part.value as string;
        }
      }

      if (!buffer) {
        return reply.status(400).send({ error: "Nenhuma imagem foi enviada." });
      }

      // Upload da imagem para o Cloudinary
      const cloudinaryStartTime = Date.now();
      const imageStream = streamifier.createReadStream(buffer);
      const cloudinaryResult = await new Promise((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "greenworld" },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        );
        imageStream.pipe(uploadStream);
      });
      console.log("Cloudinary upload time:", Date.now() - cloudinaryStartTime);

      // Analisando a imagem com o Clarifai
      const clarifaiStartTime = Date.now();
      const clarifaiResponse = await clarifai.models.predict(
        Clarifai.IMAGE_CROP_MODEL, 
        { base64: buffer.toString("base64") }
      );
      console.log("Clarifai response time:", Date.now() - clarifaiStartTime);

      const conceitos = clarifaiResponse.outputs[0].data.concepts;

      return reply.send({ 
        conceitos, 
        imageUrl: (cloudinaryResult as any).secure_url, 
        amontoadoRelatadoId 
      });
      
    } catch (error: any) {
      console.error("Error processing image:", error);
      return reply.status(500).send({ 
        error: "Erro ao processar a imagem", 
        details: error.message 
      });
    }
  });
}