import EventEmitter from "events";
import { Inject, Service } from "typedi";
import { IOrder } from "../interfaces/IOrder";

@Service()
export default class OrderService {
    constructor(
        @Inject("orderModel") private orderModel: Models.OrderModel,
        @Inject("logger") private logger,
        private eventEmitter = new EventEmitter()
    ) {}

    public async order(
        orderDto: IOrder
    ): Promise<{ isError: boolean; user: string; token: string }> {
        let user = "user";
        let token = "token";

        this.logger.info(`Order is ${JSON.stringify(orderDto)}`);

        try {
            const createdOrder = await this.orderModel.create(
                { ...orderDto },
                err => {
                    if (err) {
                        this.logger.error(`Error creating order ${err}`);

                        return { isError: true, user: null, token: null };
                    } else {
                        this.logger.info(
                            `Order is created with items ${orderDto.order} for user ${orderDto.userName}`
                        );

                        // this.eventEmitter.emit(events.order.orderCreated);
                    }
                }
            );

            this.logger.info(createdOrder);

            return { isError: false, user, token };
        } catch (e) {
            this.logger.error(`Error occurred --> ${e}`);

            return { isError: true, user: null, token: null };
        }
    }
}
