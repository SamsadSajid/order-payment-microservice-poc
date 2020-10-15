import { Router } from "express";
import OrderV1 from "./routes/v1-order";
import PoCV2 from "./routes/v2-poc";
import PocV2Json from "./routes/v2-poc-json";

export default () => {
    const app = Router();
    OrderV1(app);
    PoCV2(app);
    PocV2Json(app);

    return app;
};
