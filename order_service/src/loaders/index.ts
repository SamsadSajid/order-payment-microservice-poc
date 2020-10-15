import expressLoader from "./express";
import Logger from "./logger";
import dependencyInjectorLoader from "./dependencyInjector";
import mongooseLoader from "./mongoose";
import paymentRPCLoader from "./paymentRpc";

export default async ({ expressApp }) => {
    await mongooseLoader();
    Logger.info("✌️ DB loaded and connected!");

    const orderModel = {
        name: "orderModel",
        model: require("../models/order").default
    };

    await dependencyInjectorLoader({ models: [orderModel] });
    Logger.info("✌️ Dependency Injector loaded");

    await expressLoader({ app: expressApp });
    Logger.info("✌️ Express loaded");

    await paymentRPCLoader();
    Logger.info("✌️ PaymentRPC loaded");
};
