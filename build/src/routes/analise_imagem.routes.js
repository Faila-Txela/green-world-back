"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analiseImagem = analiseImagem;
const streamifier_1 = __importDefault(require("streamifier"));
const clarifai_1 = __importDefault(require("clarifai"));
const cloudinary_1 = require("cloudinary");
const clarifai_nodejs_1 = require("clarifai-nodejs");
// Configurando Cloudinary
cloudinary_1.v2.config({
    cloud_name: 'dujc01crk',
    api_key: process.env.API_KEY_CLOUDINARY,
    api_secret: process.env.API_SECRET_CLOUDINARY
});
const clarifai = new clarifai_1.default.App({
    apiKey: process.env.API_KEY_CLARIFAI
});
//const uploadStream = promisify(cloudinary.uploader.upload_stream);
async function analiseImagem(app) {
    app.post("/analise-imagem/criar", async (req, reply) => {
        try {
            if (!req.isMultipart()) {
                return reply.status(400).send({ error: "Requisição precisa ser multipart." });
            }
            const parts = req.parts();
            let buffer = null;
            let amontoadoRelatadoId = "";
            let filename = '';
            // Processo do form-data
            for await (const part of parts) {
                console.log("Parte recebida:", part);
                if (part.type === "file") {
                    filename = part.filename;
                }
                if (part.type === "file" && part.fieldname === "image") {
                    buffer = await part.toBuffer();
                }
                else if (part.type === "field" && part.fieldname === "amontoadoRelatadoId") {
                    amontoadoRelatadoId = part.value;
                }
            }
            if (!buffer) {
                return reply.status(400).send({ error: "Nenhuma imagem foi enviada." });
            }
            // Upload da imagem para o Cloudinary
            const cloudinaryStartTime = Date.now();
            const imageStream = streamifier_1.default.createReadStream(buffer);
            const cloudinaryResult = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary_1.v2.uploader.upload_stream({ folder: "greenworld" }, (error, result) => {
                    if (error)
                        reject(error);
                    else
                        resolve(result);
                });
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
            const multiInputs = clarifai_nodejs_1.Input.getMultimodalInput({
                inputId: "",
                rawText: prompt,
                imageUrl: cloudinaryResult.secure_url,
            });
            const modelUrl = "https://clarifai.com/clarifai/main/models/general-image-recognition";
            const model = new clarifai_nodejs_1.Model({
                url: modelUrl,
                authConfig: { pat: "2973e87bfdd44921929e295616e43020" },
            });
            const modelPrediction = await model.predict({
                inputs: [multiInputs],
                inferenceParams: { temperature: 0.2, maxTokens: 100 }
            });
            console.log("multiInputs:", multiInputs);
            console.log("Modelo de previsão:", modelPrediction);
            const conceitos = modelPrediction?.[0]?.data?.conceptsList || [];
            return reply.send({
                conceitos,
                imageUrl: cloudinaryResult.secure_url,
                amontoadoRelatadoId
            });
        }
        catch (error) {
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
