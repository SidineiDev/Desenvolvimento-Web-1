const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "colecao_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar filmes")
    console.log("2 - Excluir filmes")
    console.log("3 - Listar filmes")
    console.log("0 - Sair")
    
    const opcao = readline.questionInt("Digite a opção: ")
    
    if (opcao === 1) {
    
        cadastrarFilme()
    
    } else if (opcao === 2 ) {

        deletarFilme()
    
    } else if (opcao === 3) {
    
        listarFilme()
    
    } else if (opcao === 0 ) {
    
        console.log("Programa encerrado.")
        conexao.end()
    
    } else {
    
        console.log("Opção inválida.")
        menu()
    }
}

function cadastrarFilme() {

    const titulo = readline.question("Insira o título: ")
    const ano = readline.question("Insira o ano: ")
    
        const inserir = "insert into filmes (titulo, ano) values (?, ?)"
    
        conexao.query(inserir, [titulo, ano], function(erro) {
    
            if (erro) {
    
                console.log("Erro ao cadastrar filme.")
                console.log(erro)
    
            }  else {
    
                console.log("Filme cadastrado com sucesso.")
                menu()
            }
        })
}

function listarFilme() {

    const sql = "select * from filmes order by titulo asc"

    conexao.query(sql, function(erro, filmes) {

        if (erro) {

            console.log("Erro ao listar filmes.")
            console.log("erro")

        }  else {

            console.log("\n ---FILMES ---")
            filmes.forEach(function (filmes) {
                console.log(
                    filmes.id + " - " +
                    filmes.titulo + " - " + 
                    filmes.ano
                )
            })
        }

        menu()

    })
}

function deletarFilme() {

    const id = readline.question("insira o ID: ")

    const deletar = "delete from filmes where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar filme")
            console.log(erro)

        }  else if (resultado.affectedRows === 0 ) {

            console.log("Filme não encontrado")

        }  else {

            console.log("Filme deletado com sucesso.")
        
        }

        menu()
    })
}

menu()