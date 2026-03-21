"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendSms = void 0;
const axios_1 = __importDefault(require("axios"));
const INFObip_API_BASE_URL = "https://e5r442.api.infobip.com";
const API_KEY = process.env.INFOBIP_API_KEY;
const sendSms = async (to, message) => {
    try {
        const response = await axios_1.default.post(`${INFObip_API_BASE_URL}/sms/2/text/advanced`, {
            messages: [
                {
                    destinations: [{ to }],
                    from: "GreenWorld",
                    text: message,
                },
            ],
        }, {
            headers: {
                Authorization: `App ${API_KEY}`,
                "Content-Type": "application/json",
                Accept: "application/json",
            },
        });
        return response.data;
    }
    catch (error) {
        console.error("Erro ao enviar SMS:", error);
        throw error;
    }
};
exports.sendSms = sendSms;
