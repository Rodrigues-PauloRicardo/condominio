// MODEL DE PERGUNTAS
const Sequelize = require ('sequelize');
const connection = require("./database");

const Pergunta = connection.define("pergunta",{
    titulo:{
        type: Sequelize.STRING, //TEXTOS CURTOS
        allowNull: false         // PARA NÃO ACEITA CAMPO NULL
    },
    descricao:{
        type: Sequelize.TEXT, // TEXTOS LONGOS
        allowNull:false
    }
});

Pergunta.sync({force:false}).then(() => { // vai sincronizar com o banco de dados
    console.log ("criado tabela com sucesso")
})

module.exports = Pergunta;
