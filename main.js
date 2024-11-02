const express = require("express");
const rotas = express();
const Sequelize = require("sequelize");

//###Banco de dados###
const conexaoBanco = new Sequelize("controledefrequencia", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

//###Banco de dados###
//create table
const Aluno = conexaoBanco.define("aluno", {
    nome: {
        type: Sequelize.STRING,//TEXTAREA
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

Aluno.sync({ force: false }); //false para não deletar a porra do banco existente 

//###Rotas###
rotas.get("/", function (req, res) {
    res.send("Rota principal");
});

//salvar
rotas.get("/salvar/:nome/:dataNascimento/:matricula/:curso", async function (req, res) {
    const { nome, dataNascimento, matricula, curso } = req.params;

    const novoAluno = await Aluno.create({ nome, dataNascimento, matricula, curso }); //função que espera
  
    res.json({
      resposta: "Aluno criado com sucesso",
      aluno: novoAluno,
    });
});

rotas.get("/deletar/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número
  
    const deleted = await Aluno.destroy({
      where: { id: idNumber },
    });
  
    if (deleted) {
      res.json({ mensagem: "Aluno deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
  });

// Editar aluno via ID, nome e idade como parâmetros
rotas.get("/editar/:id/:nome/:dataNascimento/:matricula/:curso", async function (req, res) {
    const { id, nome, dataNascimento, matricula, curso } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número
  
    const [updated] = await Aluno.update(
      { nome, dataNascimento, matricula, curso },
      {
        where: { id: idNumber }, // Usa o ID numérico
      }
    );
  
    res.json({
      mensagem: "Aluno atualizado com sucesso",
    });
  });

// Exibir todos os alunos
/*rotas.get("/mostrar", async function (req, res) {
    const alunos = await Aluno.findAll(); // Busca todos os registros
    res.json(alunos); // Retorna os registros em formato JSON
});*/

// Exibir todos os alunos com tratativa de erros:
rotas.get("/mostrar", async function (req, res) {
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