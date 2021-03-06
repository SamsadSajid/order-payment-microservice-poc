import "reflect-metadata";
import express from "express";
import config from "./config";
import Logger from "./loaders/logger";
import { errors } from "celebrate";

const startServer = async () => {
    const app = express();

    /**
     * A little hack here
     * Import/Export can only be used in 'top-level code'
     * Well, at least in node 10 without babel and at the time of writing
     * So we are using good old require.
     **/
    await require("./loaders").default({ expressApp: app });

    app.listen(config.port, () => {
        Logger.info(`
      ################################################
      🛡️  Server listening on port: ${config.port} 🛡️
      ################################################
    `);
    });

    app.use(errors());
};

startServer();
