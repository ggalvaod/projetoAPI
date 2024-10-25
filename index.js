const express = require("express")

const app = express()

app.get("/", function (req, res) {
    res.send("Hello World");
  });

app.get("/aluno/:nome/:dataNascimento/:matricula/:curso", function (req, res) {
    res.send(req.params);
});

app.listen(3031, () => {
    console.log("server ON")
})
