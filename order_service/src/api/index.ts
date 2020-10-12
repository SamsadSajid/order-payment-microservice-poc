import { Router } from "express";
import OrderV1 from "./routes/v1-order";

export default () => {
    const app = Router();
    OrderV1(app);

    return app;
};
