const env = process.env;

export const PORT = env.PORT || 3001;
export const HOST = env.HOST || 'localhost';
export const SERVER_URL = `http://${HOST}:${PORT}`;

export default {
    PORT,
    HOST,
    SERVER_URL,
};