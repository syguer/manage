package main

import (
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

type Task struct {
	Id         int    `json:"id"`
	Text       string `json:"text"`
	Completed  bool   `json:"completed"`
	CategoryId string `json:"categoryId"`
	Order      int    `json:"order"`
}

func getAllTasks() []Task {
	db, err := sql.Open("mysql", "root:@/manage")

	if err != nil {
		panic(err.Error())
	}

	defer db.Close()

	rows, err := db.Query("SELECT * FROM tasks")

	if err != nil {
		panic(err.Error())
	}

	result = make([]Task, 0)

	for rows.Next() {
		var id int
		var text string
		var completed bool
		var categoryId string
		var order int

		err := rows.Scan(&id, &text, &completed, &categoryId, &order)
		append(result, Task{Id: id, Text: text, Completed: completed, CategoryId: categoryId, Order: order})
	}

	return result
}
