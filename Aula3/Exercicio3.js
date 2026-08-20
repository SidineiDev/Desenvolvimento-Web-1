const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar livro")
    console.log("2 - Excluir livro")
    console.log("3 - Listar livro")
    console.log("0 - Sair")

    const opcao = readline.question("Digite a opção: ")

    if (opcao === 1) {

        cadastrarLivro()

    } else if (opcao === 2 ) {

        deletarLivro()

    } else if (opcao === 3) {

        listarLivro()

    } else if (opcao === 0 ) {

        console.log("Programa encerrado.")
        conexao.end()

    } else {

        console.log("Opção inválida.")
        menu()
    }
}

function cadastrarLivro() {

    const titulo = readline.question("Digite o título do livro: ")
    const autor = readline.question("Digite o autor do livro: ")

    const inserir = "insert into livros (titulo, autor) values (?, ?)"

    conexao.query(inserir, [titulo, autor], function(erro){
        
    })
}