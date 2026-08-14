const mysql = require("mysql2")

const conexao = mysql.createConnection ({
    host: "localhost",
    user: "root",
    password: "root",
    database: "instuicao"
})

const nome = "Desenvolvimento de Sistemas"
const carga_horaria = 1200

const insert = "insert into cursos (nome, carga_horaria) values (?, ?)"

conexao.query(insert, [nome, carga_horaria], function(erro){
    if (erro) {
        console.log("Erro dao cadastrar.")
    } else {
        console.log("Curso cadastrado com sucesso!")
    }
})

const nome2 = "Informática"
const carga_horaria2 = 1000

conexao.query(insert, [nome2, carga_horaria2], function(erro){
    if (erro) {
        console.log("Erro dao cadastrar.")
    } else {
        console.log("Curso cadastrado com sucesso!")
    }
})

const nome3 = "Administração"
const carga_horaria3 = 800

conexao.query(insert, [nome3, carga_horaria3], function(erro){
    if (erro) {
        console.log("Erro dao cadastrar.")
    } else {
        console.log("Curso cadastrado com sucesso!")
    }
})

const id = 3

const deletar = "delete from cursos where id = ?"

conexao.query(deletar, [id], function(erro, resultado){
    if (erro) {
        console.log("Erro ao cadastrar")
        console.log.apply(erro)
    } else if (resultado.affectedRows === 0){
        console.log("Curso nãi encotrado.")
    } else {
        console.log("Curso cadastrado com sucesso!")
    }
        conexao.end()
})