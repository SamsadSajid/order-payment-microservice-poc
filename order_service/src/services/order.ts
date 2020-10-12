import { Inject, Service } from "typedi";
import { IOrder } from "../interfaces/IOrder";

@Service()
export default class OrderService {
    constructor(@Inject("logger") private logger) {}

    public async order(
        order: IOrder
    ): Promise<{ user: string; token: string }> {
        let user = "user";
        let token = "token";

        this.logger.info(`Order is ${JSON.stringify(order)}`);

        return { user, token };
    }
}
