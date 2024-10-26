const express = require("express");
const rotas = express();
const Sequelize = require("sequelize");

const conexaoBanco = new Sequilize("controledefrequencia", "root", "", {
    host: "localhost",
    dialect: "mysql",
});

const Aluno = conexaoBanco.define("alunos", {
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

  Aluno.sync({ force: false });

  