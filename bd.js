//import library
const Sequelize = require("sequelize");
//keys
const controledefrequencia = new Sequelize("controledefrequencia", "root", "", {
  host: "localhost",
  dialect: "mysql",
});

const aluno = controledefrequencia.define("aluno", {
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

//Postagem.sync({ force: true });

//INSERT
aluno.create({
  id: "17",
  nome: "Gabriel",
  dataNascimento: "2008-03-20",
  matricula: "17",
  curso: "DS",
});