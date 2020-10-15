package main


import (
	"encoding/json"
    "fmt"
    "log"
    "net/http"
)

type Payment struct {
	UserName string
	Amount float32
}

type PaymentResponse struct {
    CurrentBalance float32 `json:"currentBalance"`
    Message string `json:"message"`
    ErrorCode string `json:"errorCode"`
}

func makePayment(w http.ResponseWriter, r *http.Request){
	var payment Payment;

    err := json.NewDecoder(r.Body).Decode(&payment)
    if err != nil {
        http.Error(w, err.Error(), http.StatusBadRequest)
        return
	}
	
	fmt.Println("Payment request is ", payment);

	paymentResponse := PaymentResponse {
		CurrentBalance: 10000.00 - payment.Amount,
		Message: "Payment is successful",
		ErrorCode: "0",
	};

	res, err := json.Marshal(paymentResponse)

	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
  	w.Write(res)
}

func handleRequests() {
    http.HandleFunc("/api/pay", makePayment)
	log.Fatal(http.ListenAndServe(":8020", nil))
	fmt.Println("Server is running...")
}

func main() {
    handleRequests()
}
