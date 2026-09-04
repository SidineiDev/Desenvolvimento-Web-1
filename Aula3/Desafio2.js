const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "registros_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar usuários")
    console.log("2 - Excluir usuários")
    console.log("3 - Listar usuários")
    console.log("4 - Atualizar usuários")
    console.log("0 - Sair")
    
    const opcao = readline.questionInt("Digite a opção: ")
    
    if (opcao === 1) {
    
        cadastrarUsuarios()
    
    } else if (opcao === 2 ) {

        deletarUsuarios()
    
    } else if (opcao === 3) {
    
        listarUsuarios()

    } else if (opcao === 4) {

        atualizarUsuario()
    
    } else if (opcao === 0 ) {
    
        console.log("Programa encerrado.")
        conexao.end()
    
    } else {
    
        console.log("Opção inválida.")
        menu()
    }
}

function atualizarUsuario() {

    const nome = readline.question("Digite o nome do usuário: ")
    const email = readline.question("Digite o email do usuário: ")

    const id = readline.question("Digite o ID do usuário: ")

    const update = "update usuarios set nome = ?, email = ? where id = ?"

    conexao.query(update[nome, email, id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao atualizar usuário: ")
            console.log(erro)

        } else if (resultado.affectedRows === 0) {

            console.log("Usuário não encontrado.")

        }  else {

            console.log("Usuário atualizado com sucesso!")
        }
    })
    
    menu()
}


function cadastrarUsuarios() {

    const nome = readline.question("Insira o nome: ")
    const email = readline.question("Insira o email: ")
    
        const inserir = "insert into usuarios (nome, email) values (?, ?)"
    
        conexao.query(inserir, [nome, email], function(erro) {
    
            if (erro) {
    
                console.log("Erro ao cadastrar usúario.")
                console.log(erro)
    
            }  else {
    
                console.log("Usuário cadastrado com sucesso.")
            
            }
            menu()
        })
    
}

function listarUsuarios() {

    const sql = "select * from usuarios"

    conexao.query(sql, function(erro, usuarios) {

        if (erro) {

            console.log("Erro ao listar usuário.")
            console.log("erro")

        }  else {

            console.log("\n ---USUÁRIOS ---")
            usuarios.forEach(function (usuarios) {
                console.log(
                    usuarios.id + " - " +
                    usuarios.nome + " - " + 
                    usuarios.email 
                )
            })
        }

        menu()

    })
}

function deletarUsuarios() {

    const id = readline.question("Insira o ID: ")

    const consultar = "SELECT * FROM usuarios WHERE id = ?"

    conexao.query(consultar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao consultar usuário")
            console.log(erro)
            menu()
            return

        }

        if (resultado.length === 0) {

            console.log("Usuário não encontrado")
            menu()
            return

        }

        console.log("\nRegistro encontrado:")
        console.log("Nome:", resultado[0].nome)
        console.log("E-mail:", resultado[0].email)

        const resposta = readline.question("Deseja excluir? (S/N): ").toLowerCase()

        if (resposta === "s") {

            const deletar = "DELETE FROM usuarios WHERE id = ?"

            conexao.query(deletar, [id], function(erro, resultado) {

                if (erro) {

                    console.log("Erro ao deletar usuário")
                    console.log(erro)

                } else {

                    console.log("Usuário deletado com sucesso.")

                }

                menu()

            })

        } else if (resposta === "n") {

            console.log("Exclusão cancelada.")
            menu()

        } else {

            console.log("Opção inválida.")
            menu()

        }

    })
}

menu()