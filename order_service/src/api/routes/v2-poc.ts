import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import V2PocService from "../../services/v2PocService";
import { IPocOrder } from "../../interfaces/IPoc";

const route = Router();

export default (app: Router) => {
    app.use("/v2", route);

    route.post("/poc", async (req: Request, res: Response) => {
        const logger: Logger = Container.get("logger");
        logger.info(`Order request ${JSON.stringify(req.body)}`);

        const v2PocService = Container.get(V2PocService);

        const {
            isError,
            currentBalance,
            message,
            errorCode
        } = await v2PocService.V2Poc(req.body as IPocOrder);

        if (isError) {
            return res.status(400).json({
                message: "Could not create the order. Please try again."
            });
        } else {
            return res.status(200).json({
                currentBalance: currentBalance,
                message: message,
                errorCode: errorCode
            });
        }
    });
};
