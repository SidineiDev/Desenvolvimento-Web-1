const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "concessionaria_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar veículo")
    console.log("2 - Listar veículo")
    console.log("3 - Excluir veículo")
    console.log("4 - Atualizar veículo")
    console.log("0 - Sair")

    const opcao = readline.questionInt("Digite uma opção: ")

    if (opcao === 1) {

        cadastrarVeiculo()

    }  else if (opcao === 2) {

        listarVeiculo()

    }  else if (opcao === 3) {

        excluirVeiculo() 

    }  else if (opcao === 4) {

        atualizarVeiculo()

    }  else if (opcao === 0) {

        console.log("Programa encerrado")
        conexao.end()

    } else {

        console.log("opção inválida")
        menu()

    }
}

function atualizarVeiculo() {

    const modelo = readline.question("Digite o modelo do veículo: ")
    const placa = readline.question("Digite a placa do veículo: ")
    const id = readline.question("digite o ID do veículo: ")

    const update = "update veiculos set modelo = ?, placa = ? where id = ?"
    
    conexao.query(update, [modelo, placa, id], function(erro, resultado){

        if (erro) {

            console.log("Erro ao atualizar veículo.")
            console.log(erro)

        } else if (resultado.affectedRows === 0) {

            console.log("Veículo não encontrado.")

        }  else {

            console.log("Veículo atualizado com sucesso")

        }

        menu()
    })
}

function cadastrarVeiculo() {

    const modelo = readline.question("Digite o modelo do veículo: ")
    const placa = readline.question("Digite a placa do veículo: ")

    const inserir = "insert into veiculos (modelo, placa) values (?, ?)"

    conexao.query(inserir,[modelo, placa], function(erro) {

        if (erro) {

            console.log("Erro ao cadastrar veículo.")
            console.log(erro)

        }  else {

            console.log("Veículo cadastrado com sucesso.")

        }

        menu()
    })
    
}

function listarVeiculo() {

    const sql = "select * from veiculos"

    conexao.query(sql, function(erro, veiculos) {

        if (erro) {

            console.log("Erro ao listar veículos.")
            console.log(erro)

        }  else if (veiculos.length === 0) {

            console.log("=========================")
            console.log("Nenhum veículo encontrado")
            console.log("=========================")

        }  else {

            console.log("\n --- Veículos ---")
            veiculos.forEach(function(veiculos) {
                console.log(
                    veiculos.modelo + " - " +
                    veiculos.placa
                )
            })

        }

        menu()

    })
}

function excluirVeiculo() {

    const id = readline.question("Digite o ID do veículos: ")

    const deletar = "delete from veiculos where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar veículo.")
            console.log(erro)

        }  else if (resultado.affectedRows === 0) {

            console.log("Veículo não encontrado.")

        }  else {

            console.log("Veículo deletado com sucesso.")
        }
    })

    menu()
}

menu()