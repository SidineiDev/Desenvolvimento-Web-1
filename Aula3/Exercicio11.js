const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "sistemaEventos_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar eventos")
    console.log("2 - Listar eventos")
    console.log("3 - Excluir eventos")
    console.log("4 - Atualizar evento")
    console.log("0 - Sair")

    const opcao = readline.questionInt("Digite a opção: ")

    if (opcao === 1 ) {

        cadastrarEvento()

    }  else if (opcao === 2) {

        listarEvento()

    }  else if (opcao === 3) {

        excluirEvento()

    }  else if (opcao === 4) {

        atualizarEvento()
    
    }  else if (opcao === 0) {

        console.log("Programa encerrado.")
        conexao.end()

    } else {

        console.log("Opção inválida.")
        menu()

    }
}

function atualizarEvento() {

    const nome = readline.question("Digite o nome do evento: ")
    const data_evento = readline.question("Digite a data do evento: ")

    const id = readline.question("Digite o nome do id: ")

    const update = "update eventos set nome = ?, data_evento = ? where id = ?"

    conexao.query(update,[nome, data_evento, id], function(erro, resposta) {

        if (erro) {

            console.log("Erro ao atualizar evento.")
            console.log(erro)

        }  else if (resposta.affectedRows === 0 ) {

            console.log("Evento não encontrado.")

        } else {

            console.log("Evento atualizado com sucesso")

        }
    })
    menu()
}

function cadastrarEvento() {

    const nome = readline.question("Digite o nome do evento: ")
    const data_evento = readline.question("Digite a data do evento: ")

    const inserir = "insert into eventos (nome, data_evento) values (?, ?)"

    conexao.query(inserir,[nome, data_evento], function(erro) {

        if (erro) {

            console.log("Erro ao cadastrar evento.")
            console.log(erro)

        }  else {

            console.log("Evento cadastrado com sucesso.")

        }

        menu()
    })
    
}

function listarEvento() {

    const sql = "select * from eventos order by data_evento asc"

    conexao.query(sql, function(erro, eventos) {

        if (erro) {

            console.log("Erro ao listar eventos.")
            console.log(erro)

        }  else {

            console.log("\n --- EVENTOS ---")
            eventos.forEach(function(eventos) {
                console.log(
                    eventos.nome + " - " +
                    eventos.data_evento
                )
            })

            menu()

        }

    })
}

function excluirEvento() {

    const id = readline.question("Digite o ID do evento: ")

    const deletar = "delete from eventos where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar evento.")
            console.log(erro)

        }  else if (resultado.affectedRows === 0) {

            console.log("Evento não encontrado.")

        }  else {

            console.log("Evento deletado com sucesso.")
        }
    })

    menu()
}

menu()