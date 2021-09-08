// index.js é o arquivo principal

const express = require('express');
const app = express();
const bodyParser = require('body-parser'); // traduz inf. do formulário p/ serem utilizados no back-end
const connection = require('./database/database'); //importando a conexão ./database/database
const Pergunta = require ("./database/Pergunta");


connection
.authenticate()
.then(() => {
    console.log('conexão feita com sucesso!');
})
.catch((msgErro) => {
    console.log (msgErro);
})

app.set('view engine','ejs'); // para usar EJS como viem (desenhar como html)
app.use(express.static('public')); // Para aceitar arquivos estáticos, ex. imagens
//body parser
app.use(bodyParser.urlencoded({extended: false}));//comando traduz a estrutura do Formulario em JS p/usar no projeto
app.use(bodyParser.json());// para ler dados do formulário via JSON (USO COM API)

//ROTAS
app.get("/",(req, res) => {    // 1ª Rota
    Pergunta.findAll({ raw: true }).then(perguntas => {
        console.log(perguntas);
    });
    res.render('index', {
            });      
});
app.get("/perguntar",(req, res) => {    // 2ª Rota
    res.render('perguntar');      
});

app.post("/salvarpergunta",(req, res) => {    // 3ª => Rota para o Node
    var titulo = req.body.titulo;
    var descricao = req.body.descricao;
    Pergunta.create({ // igual ao insert To do mysql 
        titulo: titulo,
        descricao: descricao
    }). then(() => {
        res.redirect("/") // redirecionar após a pergunta
    })    
});


app.listen(3000,() => {console.log("App rodando :)");
});