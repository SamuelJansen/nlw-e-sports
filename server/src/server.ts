import express from "express"

const app = express()

app.get('/users', (request: any, response: any) => {
    return response.json({"users": [
        {"id": 1, "name": "Jhon"},
        {"id": 2, "name": "Elisa"},
        {"id": 3, "name": "Robson"}
    ]})
})

app.listen(3333) 