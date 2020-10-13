import { Document, Model } from "mongoose";
import { IOrder } from "../interfaces/IOrder";

declare global {
    namespace Models {
        export type OrderModel = Model<IOrder & Document>;
    }
}

// declare namespace Models {
//     export type OrderModel = Model<IOrder & Document>;
// }
