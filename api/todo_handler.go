package main

import (
	"encoding/json"
)

type TaskHandler struct{}

func (h *TodoHandler) index(w http.ResponseWriter, r *http.Request) {
	tasks = getAllTasks()
	for t := range tasks {
	}
}
