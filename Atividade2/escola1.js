const mysql = require("mysql2")

const conexao = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola1"
})

const nome = "Maria"
const disciplina = "Matemática"

const insert = "insert into professores (nome, disciplina) values (?, ?)"

conexao.query(insert, [nome, disciplina], function(erro){
    if (erro) {
        console.log("Erro ao cadastrar.")
        console.log(erro)
    } else {
        console.log("Professor cadastrado com sucesso!")
    }
})

const nome2 = "Carlos"
const disciplina2 = "Banco de Dados"

conexao.query(insert, [nome2, disciplina2], function(erro){
    if (erro) {
        console.log("Erro ao cadastrar.")
    } else {
        console.log("Professor cadastrado com sucesso!")
    }
})

const nome3 = "Fernanda"
const disciplina3 = "Programação"

conexao.query(insert, [nome3, disciplina3], function(erro){
    if (erro) {
        console.log("Erro ao cadastrar.")
    } else {
        console.log("Professor cadastrado com sucesso!")
    }
})

const id = 2

const deletar = "delete from professores where id = ?"

conexao.query(deletar,[id], function(erro, resultado){
    if (erro) {
        console.log("Erro ao cadastrar.")
        console.log(erro)
    } else if (resultado.affectedRows === 0) {
        console.log("Professor não encontrado.")
    } else {
        console.log("Professor deletado com sucesso!")
    }
})

const id2 = 20
conexao.query(deletar,[id2], function(erro, resultado){
    if (erro) {
        console.log("Erro ao cadastrar.")
        console.log(erro)
    } else if (resultado.affectedRows === 0) {
        console.log("Professor não encontrado.")
    } else {
        console.log("Professor deletado com sucesso!")
    }
        conexao.end()
})

