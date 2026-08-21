const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "tarefas_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar tarefas")
    console.log("2 - Excluir tarefas")
    console.log("3 - Listar tarefas")
    console.log("0 - Sair")
    
    const opcao = readline.questionInt("Digite a opção: ")
    
    if (opcao === 1) {
    
        cadastrarTarefa()
    
    } else if (opcao === 2 ) {

        deletarTarefa()
    
    } else if (opcao === 3) {
    
        listarTarefa()
    
    } else if (opcao === 0 ) {
    
        console.log("Programa encerrado.")
        conexao.end()
    
    } else {
    
        console.log("Opção inválida.")
        menu()
    }
}

function cadastrarTarefa() {

    const descricao = readline.question("Insira a descrição: ")
    const responsavel = readline.question("Insira o responsável: ")

    if (descricao == "") {

        console.log("insira uma descrição!!!")
        menu()
        
    }
    
        const inserir = "insert into tarefas (descricao, responsavel) values (?, ?)"
    
        conexao.query(inserir, [descricao, responsavel], function(erro) {
    
            if (erro) {
    
                console.log("Erro ao cadastrar tarefa.")
                console.log(erro)
    
            }  else {
    
                console.log("tarefa cadastrado com sucesso.")
                menu()
            }
        })
}

function listarTarefa() {

    const sql = "select * from tarefas"

    conexao.query(sql, function(erro, tarefas) {

        if (erro) {

            console.log("Erro ao listar tarefas.")
            console.log("erro")

        }  else {

            console.log("\n ---TAREFAS  ---")
            tarefas.forEach(function (tarefas) {
                console.log(
                    tarefas.id + " - " +
                    tarefas.descricao + " - " + 
                    tarefas.responsavel
                )
            })
        }

        menu()

    })
}

function deletarTarefa() {

    const id = readline.question("insira o ID: ")

    const deletar = "delete from tarefas where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar tarefas")
            console.log(erro)

        }  else if (resultado.affectedRows === 0 ) {

            console.log("Tarefas não encontrado")

        }  else {

            console.log("Tarefas deletado com sucesso.")
        
        }

        menu()
    })
}

menu()