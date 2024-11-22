const express = require("express");
const cors = require("cors"); // Importa o CORS
const Sequelize = require("sequelize");

// Configurações do banco de dados
const conexaoBanco = new Sequelize("controledefrequencia", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

// Definindo o modelo de Aluno
const Aluno = conexaoBanco.define("aluno", {
  nome: {
    type: Sequelize.STRING,
  },
  dataNascimento: {
    type: Sequelize.DATE,
  },
  matricula: {
    type: Sequelize.INTEGER,
  },
  curso: {
    type: Sequelize.STRING,
  },
});

Aluno.sync({ force: false }); // Cria a tabela, se necessário

// Configurações do Express
const app = express();

// Habilitando CORS para todas as origens
app.use(cors());

// Rota para cadastrar um aluno
app.get("/cadastrar/:nome/:dataNascimento/:matricula/:curso", async function (req, res) {
  try {
    const { nome, dataNascimento, matricula, curso } = req.params;

    // Converte a data para o formato adequado (exemplo: yyyy-mm-dd)
    const dataFormatada = new Date(dataNascimento);
    
    if (isNaN(dataFormatada)) {
      return res.status(400).json({ resposta: "Data de nascimento inválida" });
    }

    const novoAluno = await Aluno.create({
      nome,
      dataNascimento: dataFormatada,
      matricula,
      curso,
    });

    res.status(200).json({
      resposta: "Aluno criado com sucesso",
      aluno: novoAluno,
    });
  } catch (error) {
    res.status(500).json({ resposta: "Erro ao criar aluno", error: error.message });
  }
});

// Rota para editar um aluno
app.get("/editar/:id/:nome/:dataNascimento/:matricula/:curso", async function (req, res) {
  const { id, nome, dataNascimento, matricula, curso } = req.params;
  const idNumber = parseInt(id, 10);

  try {
    const [updated] = await Aluno.update(
      { nome, dataNascimento, matricula, curso },
      { where: { id: idNumber } }
    );

    if (updated) {
      res.json({
        mensagem: "Aluno atualizado com sucesso",
      });
    } else {
      res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: `Erro ao editar aluno: ${error.message}` });
  }
});

// Rota para apagar um aluno
app.get("/apagar/:id", async function (req, res) {
  const { id } = req.params;
  const idNumber = parseInt(id, 10);

  try {
    const deleted = await Aluno.destroy({ where: { id: idNumber } });

    if (deleted) {
      res.json({ mensagem: "Aluno deletado com sucesso" });
    } else {
      res.status(404).json({ mensagem: "Aluno não encontrado" });
    }
  } catch (error) {
    res.status(500).json({ mensagem: `Erro ao deletar aluno: ${error.message}` });
  }
});

// Inicia o servidor na porta 3031
app.listen(3031, function () {
  console.log("Servidor rodando na porta 3031");
});
