const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "cadastro_cliente_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar clientes")
    console.log("2 - Excluir clientes")
    console.log("3 - Listar clientes")
    console.log("4 - Atualizar clientes")
    console.log("0 - Sair")
    
    const opcao = readline.questionInt("Digite a opção: ")
    
    if (opcao === 1) {
    
        cadastrarCliente()
    
    } else if (opcao === 2 ) {

        deletarCliente()
    
    } else if (opcao === 3) {
    
        listarCliente()
    
    } else if (opcao === 4) {
    
        atualizarCliente()
    
    } else if (opcao === 0 ) {
    
        console.log("Programa encerrado.")
        conexao.end()
    
    } else {
    
        console.log("Opção inválida.")
        menu()
    }
}

function atualizarCliente() {

    const nome = readline.question("Insira o nome: ")
    const telefone = readline.question("Insira o telefone: ")
  
    const id = readline.questionInt("Digite o ID do cliente: ")
    
    const update = "UPDATE clientes SET nome = ?, telefone = ? WHERE id= ?"

    conexao.query(update, [nome, telefone, id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao atualizar cliente.")
            console.log(erro)

        } else if (resultado.affectedRows === 0) {

            console.log("Cliente não encontrado.")

        }  else {

            console.log("cliente atualizado com sucesso!")

        }
        conexao.end()
    })
}

function cadastrarCliente() {

    const nome = readline.question("Insira o nome: ")
    const telefone = readline.question("Insira o telefone: ")
    
        const inserir = "insert into clientes (nome, telefone) values (?, ?)"
    
        conexao.query(inserir, [nome, telefone], function(erro) {
    
            if (erro) {
    
                console.log("Erro ao cadastrar cliente.")
                console.log(erro)
    
            }  else {
    
                console.log("Cliente cadastrado com sucesso.")
                menu()
            }
        })
}

function listarCliente() {

    const sql = "select * from clientes"

    conexao.query(sql, function(erro, clientes) {

        if (erro) {

            console.log("Erro ao listar clientes.")
            console.log("erro")

        }  else {

            console.log("\n --- CLIENTES ---")
            clientes.forEach(function (clientes) {
                console.log(
                    clientes.id + " - " +
                    clientes.nome + " - " + 
                    clientes.telefone
                )
            })
        }

        menu()

    })
}

function deletarCliente() {

    const id = readline.questionInt("insira o ID: ")

    const deletar = "delete from clientes where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar cliente")
            console.log(erro)

        }  else if (resultado.affectedRows === 0 ) {

            console.log("Cliente não encontrado")

        }  else {

            console.log("Cliente deletado com sucesso.")
        
        }

        menu()
    })
}

menu()