const express = require("express");
const rotas = express();
const Sequelize = require("sequelize");

//###Banco de dados###
const conexaoBanco = new Sequelize("controledefrequencia", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

//###Banco de dados###
const Aluno = conexaoBanco.define("aluno", {
    nome: {
        type: Sequelize.STRING,
    },
    dataNascimento: {
        type: Sequelize.DATE
    },
    matricula: {
        type: Sequelize.INTEGER
    },
    curso: {
        type: Sequelize.STRING
    },
});

Aluno.sync({ force: false });

//###Configurações do EJS###
rotas.set("view engine", "ejs");
rotas.set("views", __dirname + "/views"); // Define o diretório das views

//###Rotas###
rotas.get("/", function (req, res) {
    res.send("Rota principal");
});

rotas.get("/cadastrar/:nome/:dataNascimento/:matricula/:curso", async function (req, res) {
    const { nome, dataNascimento, matricula, curso } = req.params;

    const novoAluno = await Aluno.create({ nome, dataNascimento, matricula, curso });
  
    res.json({
      resposta: "Aluno criado com sucesso",
      aluno: novoAluno,
    });
});

rotas.get("/apagar/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10);
  
    const deleted = await Aluno.destroy({
      where: { id: idNumber },
    });
  
    if (deleted) {
      res.json({ mensagem: "Aluno deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
});

rotas.get("/editar/:id/:nome/:dataNascimento/:matricula/:curso", async function (req, res) {
    const { id, nome, dataNascimento, matricula, curso } = req.params;
    const idNumber = parseInt(id, 10);
  
    const [updated] = await Aluno.update(
      { nome, dataNascimento, matricula, curso },
      {
        where: { id: idNumber },
      }
    );
  
    res.json({
      mensagem: "Aluno atualizado com sucesso",
    });
});

// Exibir todos os alunos em HTML
rotas.get("/exibir", async function (req, res) {
  try {
    const alunos = await Aluno.findAll(); // Busca todos os registros
    res.json(alunos); // Retorna os registros em formato JSON
} catch (error) {
    res.status(500).json({ message: `Erro ao buscar alunos: ${error}` }); // Retorna erro ao cliente
}
});

//###Servidor###
rotas.listen(3031, function () {
    console.log("Server is running on port 3031");
});
