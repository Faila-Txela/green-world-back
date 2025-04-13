import { config } from "dotenv";

config()

export const port = Number(process.env.PORT)
export const host = process.env.HOST
export const crypto_key = process.env.CRYPTO_KEY
export const algoritmo = process.env.ALGORITMO
export const jwt_key = process.env.JWT_KEY
export const jwt_expires = process.env.JWT_EXPIRES_IN

