import { Router } from "express";
import OrderV1 from "./routes/v1-order";
import PoCV2 from "./routes/v2-poc";

export default () => {
    const app = Router();
    OrderV1(app);
    PoCV2(app);

    return app;
};
