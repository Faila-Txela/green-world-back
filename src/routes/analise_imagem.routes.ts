import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import streamifier from 'streamifier';
import Clarifai from 'clarifai';
import { v2 as cloudinary } from 'cloudinary';


cloudinary.config({
  cloud_name: 'dujc01crk',
  api_key: '331127929196393',
  api_secret: 'kOYuTBy3MtHze8xEbq0orDZxE2w'
});

const clarifai = new Clarifai.App({
  apiKey: 'd9bf899de2c54473879054e6e59c0b04'
});

export async function analiseImagem(app: FastifyInstance){
  app.post("/analise-imagem/criar", async (req: FastifyRequest, reply: FastifyReply) => {
    const parts = req.parts();

    let buffer: Buffer | null = null;
    let amontoadoRelatadoId = "";

    //Processando os dados do formulário
    for await (const part of parts) {
      if (part.type === "file" && part.fieldname === "image") {
        buffer = await part.toBuffer();
      }

      if (part.type === "field" && part.fieldname === "amontoadoRelatadoId") {
        if (typeof part.value === "string") {
          amontoadoRelatadoId = part.value
        }
      }
    }

    try {

      const startTime = Date.now();

      //Upload da imagem no cloudinary
      const imageUrl = await new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "greenworld", timestamp: new Date().getTime() },
          (error, result) => {
            if (error || !result) return reject(error); 
              reject(error);
            resolve(result.secure_url);
          }
        );
        if (buffer) {
          streamifier.createReadStream(buffer).pipe(uploadStream);
        } else {
          reject(new Error("Buffer is null"));
        }
      });

      console.log("Cloudinary upload time:", Date.now() - startTime)

      const clarifaiStartTime = Date.now();

      //Analisando a imagem com o Clarifai
      const clarifaiResponse = await clarifai.models.predict(
        clarifai.GENERAL_MODEL,
        { base64: buffer ? buffer.toString("base64") : "" }
      ).catch((error: any) => {
        if (error.message.includes('timeout')) {
          throw new Error('Clarifai API Timeout');
        }
        throw error;
      })

    console.log("Clarifai response time:", Date.now() - clarifaiStartTime)

    const conceitos = clarifaiResponse.outputs[0].data.concepts;

    //Criando o registro no banco de dados
    return reply.send({ conceitos, imageUrl, amontoadoRelatadoId });  
    } catch (error: any) {
      if (error.message.includes("timeout")) {
        throw new Error("Clarifai API Timeout")
      }
      throw error;
    }
  })
}
