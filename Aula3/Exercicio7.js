const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "empresa_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar funcionarios")
    console.log("2 - Excluir funcionarios")
    console.log("3 - Listar funcionarios")
    console.log("0 - Sair")
    
    const opcao = readline.questionInt("Digite a opção: ")
    
    if (opcao === 1) {
    
        cadastrarFuncionario()
    
    } else if (opcao === 2 ) {

        deletarFuncionario()
    
    } else if (opcao === 3) {
    
        listarFuncionario()
    
    } else if (opcao === 0 ) {
    
        console.log("Programa encerrado.")
        conexao.end()
    
    } else {
    
        console.log("Opção inválida.")
        menu()
    }
}

function cadastrarFuncionario() {

    const nome = readline.question("Insira o nome: ")
    const cargo = readline.question("Insira o cargo: ")
    
        const inserir = "insert into funcionarios (nome, cargo) values (?, ?)"
    
        conexao.query(inserir, [nome,cargo], function(erro) {
    
            if (erro) {
    
                console.log("Erro ao cadastrar funcionario.")
                console.log(erro)
    
            }  else {
    
                console.log("Funcionario cadastrado com sucesso.")
                menu()
            }
        })
}

function listarFuncionario() {

    const sql = "select * from funcionarios"

    conexao.query(sql, function(erro, funcionarios) {

        if (erro) {

            console.log("Erro ao listar funcionarios.")
            console.log("erro")

        }  else {

            console.log("\n ---FUNCIONÁRIOS ---")
            funcionarios.forEach(function (funcionarios) {
                console.log(
                    funcionarios.id + " - " +
                    funcionarios.nome + " - " + 
                    funcionarios.cargo
                )
            })
        }

        menu()

    })
}

function deletarFuncionario() {

    const id = readline.question("insira o ID: ")
    const resposta = readline.question("Deseja realmente excluir este funcionário? [S/N]: ").toLowerCase()

        if (resposta === "s") {

            const deletar = "delete from funcionarios where id = ?"

            conexao.query(deletar, [id], function(erro, resultado) {

                if (erro) {
                    console.log("Erro ao deletar funcionario")
                    console.log(erro)

                }  else if (resultado.affectedRows === 0 ) {

                    console.log("Funcionario não encontrado")

                }  else {

                    console.log("Funcionario deletado com sucesso.")
                
                }  

            menu()

            })

        } else if (resposta == "n") {

            menu()

        } else {

            console.log("Erro ao processar resposta.")
            menu()

        }               
}

menu()