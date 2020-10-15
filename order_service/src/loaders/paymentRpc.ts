import { Container } from "typedi";
import LoggerInstance from "./logger";
import grpc from "grpc";
import protoLoader from "@grpc/proto-loader";
import path from "path";

// const PROTO_PATH = `${__dirname}/order.proto`;
// console.log(PROTO_PATH);
// console.log(path.isAbsolute(PROTO_PATH));
// console.log(
//     path.dirname(PROTO_PATH),
//     path.resolve(__dirname, PROTO_PATH),
//     path.relative(__dirname, PROTO_PATH)
// );
//
// const PROTO_PATH1 = path.join(__dirname, "..", "protos", "order.proto");
// console.log(PROTO_PATH1);
//
// const packageDefinition = protoLoader.loadSync(PROTO_PATH1, {
//     keepCase: true,
//     longs: String,
//     enums: String,
//     defaults: true,
//     oneofs: true
// });
// console.log(packageDefinition);

const protoDescriptor = grpc.load(
    path.join(__dirname, "../protos/order.proto")
) as any;

// const protoPackage = grpc.loadPackageDefinition(packageDefinition) as any;
// this.logger.info(JSON.stringify(protoPackage));

export default () => {
    const client = new protoDescriptor.payment.PaymentService(
        "127.0.0.1:50051",
        grpc.credentials.createInsecure()
    );

    Container.set("paymentRpc", client);

    LoggerInstance.info(
        `Connected to payment service ${JSON.stringify(client)}`
    );
};
