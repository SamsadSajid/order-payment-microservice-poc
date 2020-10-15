import { Router, Request, Response } from "express";
import { Container } from "typedi";
import { Logger } from "winston";
import OrderService from "../../services/order";
import { IOrder } from "../../interfaces/IOrder";
import orderValidator from "../../validators/orderValidator";
import { celebrate } from "celebrate";

const route = Router();

export default (app: Router) => {
    app.use("/v1", route);

    route.post(
        "/order",
        celebrate({ body: orderValidator }),
        async (req: Request, res: Response) => {
            const logger: Logger = Container.get("logger");
            logger.info(`Order request ${JSON.stringify(req.body)}`);

            const orderService = Container.get(OrderService);

            const { isError, user, token } = await orderService.order(
                req.body as IOrder
            );

            if (isError) {
                return res.status(400).json({
                    message: "Could not create the order. Please try again."
                });
            } else {
                return res.status(200).json({
                    user: user,
                    token: token
                });
            }
        }
    );
};
