const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "root",
    database: "gamehub_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar jogos")
    console.log("2 - Excluir jogos")
    console.log("3 - Listar jogos")
    console.log("4 - Atualizar jogos")
    console.log("0 - Sair")

    const opcao = readline.questionInt("Digite a opção: ")

    if (opcao === 1) {

        cadastrarJogo()

    } else if (opcao === 2 ) {

        deletarJogo()

    } else if (opcao === 3) {

        listarJogo()
    
    } else if (opcao === 4) {

        atualizarJogo()

    } else if (opcao === 0 ) {

        console.log("Programa encerrado.")
        conexao.end()

    } else {

        console.log("Opção inválida.")
        menu()
    }
}

function cadastrarJogo() {

    const nome = readline.question("Insira o nome do jogo: ")
    const genero = readline.question("Insira o gênero do jogo: ")

    const inserir = "insert into jogos (nome, genero) values (?, ?)"

    conexao.query(inserir, [nome, genero], function(erro) {

        if (erro) {

            console.log("Erro ao cadastrar jogo.")
            console.log(erro)

        }  else {

            console.log("Jogo cadastrado com sucesso.")
            menu()
        }
    })
}

function listarJogo() {

    const sql = "select nome, genero from jogos"

    conexao.query(sql, function(erro, jogos) {

        if (erro) {

            console.log("Erro ao listar jogos.")
            console.log(erro)
        }  else {

            console.log("\n --- JOGOS ---")
                jogos.forEach(function (jogos) {
                    console.log(
                    
                    jogos.id + " - " +
                    jogos.nome + " - " +
                    jogos.genero
                    )
                })
            
        }

        menu()

    })
}

function deletarJogo() {

    const id = readline.question("Digite o ID: ")

    const deletar = "delete from jogos where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar jogo.")
            console.log(erro)

        }  else if (resultado.affectedRows === 0 ) {

            console.log("Jogo não encontrado")

        }  else {

            console.log("Jogo deletado com sucesso.")
        
        }

        menu()
    })
}

function atualizarJogo() {

    const nome = readline.question("Insira o nome do jogo: ")
    const genero = readline.question("Insira o gênero do jogo: ")

    const id = readline.question("Digite o ID do aluno: ")
    
    const update = "UPDATE jogos SET nome = ?, genero = ? WHERE id= ?"

    conexao.query(update, [nome, genero, id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao atualizar jogo.")
            console.log(erro)

        } else if (resultado.affectedRows === 0) {

            console.log("Jogo não encontrado.")

        }  else {

            console.log("Jogo atualizado com sucesso!")

        }
        conexao.end()
    })
}

menu()