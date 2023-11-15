import dotenv from 'dotenv'

dotenv.config();

export const env = {
    port: parseInt(process.env.ENV_PORT) || 3000,
    env: process.env.ENV,
};

export const db = {
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 3306,
    name: process.env.DB_NAME || "name",
    user: process.env.DB_USER || "user",
    password: process.env.DB_PASS || "123",
};

export const lg = {
    level: process.env.LG_LEVEL || "info",
}

export const jwt = {
    secretKey: process.env.JWT_SECRET || 'your_secret_key'
}