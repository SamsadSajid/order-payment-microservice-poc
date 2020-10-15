import { Inject, Service } from "typedi";
import { IPocOrder } from "../interfaces/IPoc";

@Service()
export default class V2PocService {
    constructor(
        @Inject("logger") private logger,
        @Inject("paymentRpc") private paymentRpc
    ) {}

    public async V2Poc(
        orderDto: IPocOrder
    ): Promise<{
        isError: boolean;
        currentBalance: string;
        message: string;
        errorCode: string;
    }> {
        this.logger.info(`Order is ${JSON.stringify(orderDto)}`);

        let { err, res } = await this.makePayment(orderDto);
        this.logger.info(
            `err ir ${JSON.stringify(err)} and res is ${JSON.stringify(res)}`
        );

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
                currentBalance: res.currentBalance,
                message: res.message,
                errorCode: res.errorCode
            };
        }
    }

    private async makePayment(orderDto: IPocOrder): Promise<{ err; res }> {
        return new Promise(resolve => {
            this.paymentRpc.MakePayment(
                { userName: orderDto.userName, amount: orderDto.price },
                (err, res) => {
                    if (err) {
                        this.logger.info(`err is ${err}`);
                        return resolve({
                            err: true,
                            res: null
                        });
                    } else {
                        this.logger.info(`res is ${JSON.stringify(res)}`);
                        return resolve({
                            err: false,
                            res: res
                        });
                    }
                }
            );
        });
    }
}
