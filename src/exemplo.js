const Clarifai = require('clarifai');

// Inicializa com sua API key
const app = new Clarifai.App({
  apiKey: 'd9bf899de2c54473879054e6e59c0b04'
});

async function analisarImagem(urlDaImagem) {
  try {
    const response = await app.models.predict(
      Clarifai.GENERAL_MODEL,
      urlDaImagem
    );
    console.log("Resultado da análise:", response.outputs[0].data.concepts);
  } catch (err) {
    console.error("Erro na análise:", err);
  }
}

analisarImagem('https://images.squarespace-cdn.com/content/v1/5f088a46ebe405013044f1a4/62b55ab8-9e73-4ce9-8e9c-27876e91720c/Ellie+Romans+Draper.png');
