package main

import (
	"context"
	"fmt"
	"github.com/SamsadSajid/payment-microservice-poc/payment_service/protos"
	"log"
	"net"

	"google.golang.org/grpc"
)

type server struct{}

func (s *server) MakePayment(ctx context.Context, request *protos.PaymentRequest) (*protos.PaymentResponse, error) {
	userName := request.GetUserName()
	amount := request.GetAmount()

	fmt.Printf("Amout deducted for user %s with amount %f\n", userName, amount)

	res := &protos.PaymentResponse{
		CurrentBalance: 10000.00 - amount,
		Message: "Payment was successful",
		ErrorCode: "0",
	}

	return res, nil
}

func main() {
	fmt.Println("Hello world")

	lis, err := net.Listen("tcp", "127.0.0.1:50051")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	var opts []grpc.ServerOption

	s := grpc.NewServer(opts...)
	protos.RegisterPaymentServiceServer(s, &server{})

	if err := s.Serve(lis); err != nil {
		log.Fatalf("failed to serve: %v", err)
	}
}
