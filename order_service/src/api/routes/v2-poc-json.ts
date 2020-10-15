import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import V2JsonPocService from "../../services/v2JsonPocService";
import { IPocOrder } from "../../interfaces/IPoc";

const route = Router();

export default (app: Router) => {
    app.use("/v2/poc", route);

    route.post("/json", async (req: Request, res: Response) => {
        const logger: Logger = Container.get("logger");
        logger.info(`Order request ${JSON.stringify(req.body)}`);

        const v2PocService = Container.get(V2JsonPocService);

        const {
            isError,
            currentBalance,
            message,
            errorCode
        } = await v2PocService.v2JsonPoc(req.body as IPocOrder);

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
