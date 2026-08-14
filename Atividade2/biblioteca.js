const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca"
});

const titulo = "Dom Casmurro";
const autor = "Machado de Assis";

const insert = "insert into livros (titulo, autor) values (?, ?)";

conexao.query(insert,[titulo, autor], function(erro){
    if (erro) {
        console.log("Erro ao cadastrar.")
        console.log(erro)
    } else {
        console.log("Livro cadastrado com sucesso!")
    }
});

const titulo2 = "O Pequeno Príncipe";
const autor2 = "Antoine de Saint-Exupéry";

conexao.query(insert,[titulo2, autor2], function(erro){
    if (erro) {
        console.log("Erro ao cadastrar.")
        console.log(erro)
    } else {
        console.log("Livro cadastrado com sucesso!")
    }
});

const titulo3 = "Turma da Mõnica";
const autor3 = "Maúricio de Souza";

conexao.query(insert,[titulo3, autor3], function(erro){
    if (erro) {
        console.log("Erro ao cadastrar.")
        console.log(erro)
    } else {
        console.log("Livro cadastrado com sucesso")
    }
});

const id = 2;

const deletar = "delete from livros where id = 2";

conexao.query(deletar,[id], function(erro, resultado){
    if (erro) {
        console.log("Erro ao deletar livro.")
        console.log(erro)
    } else if (resultado.affectedRows === 0) {
        console.log("Livro não encontrado")
    } else {
        console.log("Livro deletado com sucesso!")
    }
      conexao.end()
});