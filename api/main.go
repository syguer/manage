package main

import (
	"fmt"
	"net/http"
)

func main() {
	topHandler := TodoHandler{}
	http.HandleFunc("/tasks", todoHandler.index)
	http.ListenAndServe(":8080", nil)
}
