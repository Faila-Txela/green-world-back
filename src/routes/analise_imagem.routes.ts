import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import streamifier from 'streamifier';
import Clarifai from 'clarifai';
import { v2 as cloudinary } from 'cloudinary';
import { Model, Input } from "clarifai-nodejs";

// Configurando Cloudinary
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

      if (!req.isMultipart()) {
        return reply.status(400).send({ error: "Requisição precisa ser multipart." });
      }

      const parts = req.parts();
      let buffer: Buffer | null = null;
      let amontoadoRelatadoId = "";
      let filename: string = '';

      // Processo do form-data
      for await (const part of parts) {
        console.log("Parte recebida:", part);
        if (part.type === "file") {
          filename = part.filename as string;
        }
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

      // Analisando a imagem com o Clarifai, usando o modelo público e gratuito
      // const clarifaiStartTime = Date.now();
      // console.log("Iniciando análise com Clarifai...", clarifai);
      // const clarifaiResponse = await clarifai.models.predict(
      //   Clarifai.GENERAL_MODEL, // = 'aaa03c23b3724a16a56b629203edc62c'
      //   { base64: buffer.toString("base64") }
      // );
      // console.log("Clarifai response:", clarifaiResponse);
      // console.log("Clarifai response time:", Date.now() - clarifaiStartTime);

      
      const prompt = "What time of day is it?";
      const multiInputs = Input.getMultimodalInput({
        inputId: "",
        rawText: prompt,
        imageUrl: (cloudinaryResult as any).secure_url,
      });
      const modelUrl = "https://clarifai.com/clarifai/main/models/general-image-recognition"
      
      const model = new Model({
        url: modelUrl,

        authConfig: { pat: "2973e87bfdd44921929e295616e43020" },
      });

      const modelPrediction = await model.predict({
        inputs: [multiInputs],
        inferenceParams:{ temperature: 0.2, maxTokens: 100 }
      });

      console.log("multiInputs:", multiInputs);
      console.log("Modelo de previsão:", modelPrediction);


      const conceitos = modelPrediction?.[0]?.data?.conceptsList || [];

      return reply.send({
        conceitos,
        imageUrl: (cloudinaryResult as any).secure_url,
        amontoadoRelatadoId
      });

    } catch (error: any) {
      console.error("Erro na análise com Clarifai:", error?.response?.data || error);
      return reply.status(500).send({
        error: "Erro ao processar a imagem com Clarifai",
        details: error?.response?.data?.status?.description || error?.message,
      });
    }
  });
}

// fixing a bug🐛🛠️

// aa7f35c01e0642fda5cf400f543e7c40

