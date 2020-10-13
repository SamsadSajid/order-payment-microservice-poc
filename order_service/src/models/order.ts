import { IOrder } from "../interfaces/IOrder";
import mongoose from "mongoose";

const Order = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true
        },

        userName: {
            type: String,
            lowercase: true,
            unique: true,
            index: true
        },

        order: Array
    },
    { timestamps: true }
);

export default mongoose.model<IOrder & mongoose.Document>("Order", Order);
