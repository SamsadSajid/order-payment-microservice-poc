import expressLoader from "./express";
import Logger from "./logger";
import dependencyInjectorLoader from "./dependencyInjector";

export default async ({ expressApp }) => {
    await dependencyInjectorLoader();
    Logger.info("✌️ Dependency Injector loaded");

    await expressLoader({ app: expressApp });
    Logger.info("✌️ Express loaded");
};
