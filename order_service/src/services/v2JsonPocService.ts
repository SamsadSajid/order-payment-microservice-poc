import { Inject, Service } from "typedi";
import axios from "axios";
import { IPocOrder } from "../interfaces/IPoc";

@Service()
export default class V2JsonPocService {
    constructor(@Inject("logger") private logger) {}

    public async v2JsonPoc(
        orderDto: IPocOrder
    ): Promise<{
        isError: boolean;
        currentBalance: string;
        message: string;
        errorCode: string;
    }> {
        this.logger.info(`Order is ${JSON.stringify(orderDto)}`);

        let { err, res } = await this.makePayment(orderDto);
        if (err) {
            return {
                isError: true,
                currentBalance: null,
                message: null,
                errorCode: null
            };
        } else {
            return {
                isError: false,
                currentBalance: res.data.currentBalance,
                message: res.data.message,
                errorCode: res.data.errorCode
            };
        }
    }

    private async makePayment(orderDto: IPocOrder): Promise<{ err; res }> {
        return new Promise(resolve => {
            axios
                .post("http://127.0.0.1:8020/api/pay", {
                    userName: orderDto.userName,
                    amount: orderDto.price
                })
                .then(res => {
                    this.logger.info(
                        `Payment response is ${JSON.stringify(res.data)}`
                    );
                    resolve({
                        err: false,
                        res: res
                    });
                })
                .catch(err => {
                    this.logger.error(`Error occurred ${err}`);

                    resolve({
                        err: true,
                        res: null
                    });
                });
        });
    }
}
