const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "escola"
})

function cadastrarAluno() {
    const nome = readline.question("Digite o nome do aluno: ")
    const email = readline.question("Dgite o email do aluno: ")

    const insert = "insert into alunos (nome, email) values (?, ?)"

    conexao.query(insert, [nome, email], function(erro){
        if (erro) {
        console.log("Erro ao calcular")
        console.log(erro)
        } else {
            console.log("Aluno cadastrado com sucesso!")
        }
            //menu()
    })
}

cadastrarAluno();

function excluirAluno() {
    const id = readline.question("Digite o ID do aluno: ")

    const deletar = "delete from alunos where id = ?"

    conexao.query(deletar, [id], function(erro, resultado){
        if (erro) {
        console.log("Erro ao cadastrar")
        console.log.apply(erro)
    } else if (resultado.affectedRows === 0){
        console.log("aluno não encotrado.")
    } else {
        console.log("Aluno deletado com sucesso!")
    }
    })
}

excluirAluno()