const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "root",
    database: "escolaAtv3"

})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar aluno")
    console.log("2 - Excluir aluno")
    console.log("3 - Listar aluno")
    console.log("0 - Sair")

    const opcao = readline.questionInt("Escolha uma opção: ")

    if (opcao === 1) {

        cadastrarAluno()

    } else if (opcao === 2 ) {

        excluirAluno()

    } else if (opcao === 3) {

        listarAluno()

    } else if (opcao === 0 ) {

        console.log("Programa encerrado.")
        conexao.end()

    } else {

        console.log("Opção inválida.")
        menu()
    }  
}

function cadastrarAluno() {

    const nome = readline.question("Digite o nome do aluno: ")
    const email = readline.question("Digite o email do aluno: ")
    const endereco = readline.question("Digite o endereço do aluno: ")
    const matricula = readline.question("Digite a matrícula do aluno: ")
    const curso = readline.question("Digite o curso do aluno: ")
    const serie = readline.question("Digite a série do aluno: ")

    const inserir = "insert into alunos (nome, email, endereco, matricula, curso, serie) values (?, ?, ?, ?, ?, ?)"

    conexao.query(inserir, [nome, email, endereco, matricula, curso, serie], function(erro){

        if (erro) {

            console.log("Erro ao cadastrar aluno.")
            console.log(erro)

        } else {

            console.log("Aluno cadastrado com sucesso.")
            menu()

        }
    })
}

function excluirAluno() {

    const id = readline.questionInt("Digite o ID do aluno: ")

    const deletar = "delete from alunos where id = ?"

    conexao.query(deletar,[id], function(erro, resultado){

        if (erro) {

            console.log("Erro ao deletar aluno.")
            console.log(erro)

        } else if (resultado.affectedRows === 0 ) {

            console.log("Aluno não encontrado!")

        } else {

            console.log("Aluno deletado com sucesso.")

        }

        menu()
        
    })
}

function listarAluno() {

    const sql = "select id, nome, email from alunos"

    conexao.query(sql, function(erro, alunos){

        if (erro) {
            console.log("Erro ao buscar alunos.")
            console.log(erro)

        } else {

            console.log("\n --- ALUNOS ---")
            alunos.forEach(function (aluno) {
                console.log(
                    aluno.id + " - " +
                    aluno.nome + " - " +
                    aluno.email
                    
                )
            })
        }

        menu()

    })

}


menu()