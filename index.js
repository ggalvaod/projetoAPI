const express = require("express")
const server = express()
const alunos = require("./src/teste.json")

server.get("/ah", (req, res) => {
    return res.json ({mensagem: "Hello NODE"})
})

server.get("/alunos", (req, res) => {
    return res.json(alunos)
})

server.listen(3300, () => {
    console.log("server ON")
})
