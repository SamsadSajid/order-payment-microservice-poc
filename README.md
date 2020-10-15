# Motivation
This codebase is a proof of concept to showcase in micro-service level, `gRPC + protobuf(http/2.0)` performs better than `json based rest(http/1.0)`.

# System V1
![gRpc-Page-1](https://user-images.githubusercontent.com/19304394/96085770-20778180-0ee3-11eb-9580-c33c61bbe12d.png)

There are two services. Order service is written in Typescript. And was run with `pm2`. There was only one instance. 

The payment service is written in Golang and was run with `go run` command.

Order service accepts `json` request from client. Namely, the connection between client and order service is `REST`.

Payment Service accepts `binary` requests in protocol buffer. The connection between order service and payment service is remote procedure call `gRPC` with `protocol buffer` payload.

# Benchmarking V1
<img width="971" alt="Screenshot 2020-10-15 at 8 10 08 AM" src="https://user-images.githubusercontent.com/19304394/96068489-fbbce300-0ebd-11eb-8633-0438b1311ccb.png">


> 1000K requests in 329.12s, 318 MB read


# System V2
![gRpc-Page-2](https://user-images.githubusercontent.com/19304394/96085776-240b0880-0ee3-11eb-9b85-ab0e8261672e.png)

There are two services. Order service is written in Typescript. And was run with `pm2`. There was only one instance. 

The payment service is written in Golang and was run with `go run` command. No extra package is used i.e `gin Gonic, Gorilla Mux` etc.

Order service accepts `json` request from client. Namely, the connection between client and order service is `REST`.

Payment service accepts `json` also. Namely the connection between order service and payment service is `REST`.

# Benchmarking V2
<img width="1174" alt="Screenshot 2020-10-15 at 12 45 48 PM" src="https://user-images.githubusercontent.com/19304394/96086576-5cf7ad00-0ee4-11eb-813a-b36a7851a6de.png">



> 976796 2xx responses, 7465 non 2xx responses
> 
> 984k requests in 2449.86s, 312 MB read
> 
> 16k errors (16k timeouts)

# Conclusion
**System V1** manage to handle `1000K` requests. No `timeout` issue occurred. On the other hand **System V2** has `timeout` issue. It could not handle `1000K` requests and there were `976796` success response.

In **System V1**, order service used the `gRPC + protobuf` to talk to payment service.

In **System V2**, order service used the rest based `json` to talk to payment service.

So, `gRPC + protobuf` performs better than `rest` not only in reducing payload size and reducing bandwidth, it also performs better as there are very few timeout issues.

In this experiment as the payload is smaller so there was no major difference observed in payload in both system. But if it is high, I could see that in such scenario `gRPC + protobuf` performs better than `rest`.