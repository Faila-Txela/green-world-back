import axios from "axios";

const INFObip_API_BASE_URL = "https://e5r442.api.infobip.com"; 
const API_KEY = process.env.INFOBIP_API_KEY;

export const sendSms = async (to: string, message: string) => {
  try {
    const response = await axios.post(
      `${INFObip_API_BASE_URL}/sms/2/text/advanced`,
      {
        messages: [
          {
            destinations: [{ to }],
            from: "GreenWorld",
            text: message,
          },
        ],
      },
      {
        headers: {
          Authorization: `App ${API_KEY}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Erro ao enviar SMS:", error);
    throw error;
  }
};
