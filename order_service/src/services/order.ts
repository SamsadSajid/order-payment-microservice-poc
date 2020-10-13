import { Inject, Service } from "typedi";
import { IOrder } from "../interfaces/IOrder";
// import { Models } from "../types";

@Service()
export default class OrderService {
    constructor(
        @Inject("orderModel") private orderModel: Models.OrderModel,
        @Inject("logger") private logger
    ) {}

    public async order(
        orderDto: IOrder
    ): Promise<{ user: string; token: string }> {
        let user = "user";
        let token = "token";

        this.logger.info(`Order is ${JSON.stringify(orderDto)}`);

        const createdOrder = await this.orderModel.create({ ...orderDto });

        this.logger.info(
            `Order is created with items ${orderDto.order} for user ${orderDto.userName}`
        );

        this.logger.info(createdOrder.id, createdOrder.toJSON());

        return { user, token };
    }
}
