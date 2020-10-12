import dotenv from "dotenv";

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const envFound = dotenv.config();
if (!envFound) {
    // This error should crash whole process

    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    /**
     * PORT configs
     */
    port: parseInt(process.env.PORT, 10),

    /**
     * API configs
     */
    api: {
        prefix: "/api"
    },

    logs: {
        level: process.env.LOG_LEVEL
    },

    databaseURL: process.env.MONGODB_URI
};
