const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "ecommerce"
});

const nome = "teclado"
const preco = 120.00

const insert = "insert into produtos (nome, preco) values (?, ?)"

conexao.query(insert, [nome, preco], function (erro){
    if (erro) {
        console.log("Erro ao cadastrar.")
        console.log(erro); 
    } else {
        console.log("aluno cadastrado com sucesso!")
    }   
});

const nome2 = "mouse"
const preco2 = 70.50

conexao.query(insert, [nome2, preco2], function (erro){
    if (erro) {
        console.log("Erro ao cadastrar.")
        console.log(erro); 
    } else {
            console.log("aluno cadastrado com sucesso!")
    }   
});

const id = 2

const deletar = "delete from produtos where id = ?"

conexao.query(deletar, [id], function (erro, resultado){
    if (erro) {
        console.log("Erro ao excluir o aluno.");
        console.log(erro);
    } else if (resultado.affectedRows === 0) {
        console.log("Aluno não encontrado.");
    } else {
        console.log("Aluno excluído com sucesso!");
    }
      conexao.end();
})







