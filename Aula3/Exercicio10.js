const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "biblioteca_atv3"
})

// trocar funçoes

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar livro")
    console.log("2 - Excluir livro")
    console.log("3 - Listar livro")
    console.log("4 - Atualizar livro")
    console.log("0 - Sair")

    const opcao = readline.questionInt("Digite a opção: ")

    if (opcao === 1) {

        cadastrarLivro()

    } else if (opcao === 2 ) {

        deletarLivro()

    } else if (opcao === 3) {

        listarLivro()
    
    } else if (opcao === 4) {

        atualizarLivro()

    } else if (opcao === 0 ) {

        console.log("Programa encerrado.")
        conexao.end()

    } else {

        console.log("Opção inválida.")
        menu()
    }
}

function atualizarLivro() {

    const titulo = readline.question("Digite o título do livro: ")
    const autor = readline.question("Digite o autor do livro: ")

    const id = readline.questionInt("Digite o ID do livro: ")

    const update = "update livros set titulo = ?, autor = ? where id = ?"

    conexao.query(update[titulo, autor, id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao atualizar livro.")
            console.log(erro)

        } else if (resultado.affectedRows === 0) {

            console.log("Livro não encontrado")

        } else {

            console.log("Livro atualizado com sucesso")

        }
    })

    menu()
}

function cadastrarLivro() {

    const titulo = readline.question("Digite o título do livro: ")
    const autor = readline.question("Digite o autor do livro: ")

    const inserir = "insert into livros (titulo, autor) values (?, ?)"

    conexao.query(inserir, [titulo, autor], function(erro){
        
        if (erro) {

            console.log("Erro ao cadastrar livro.")
            console.log(erro)

        }  else {

            console.log("Livro cadastrado com sucesso.")
            menu()
        }
    })
}

function listarLivro() {
    
    const sql = "select titulo, autor from livros"

    conexao.query(sql, function(erro, livros) {

        if (erro) {

            console.log("Erro ao listar livros.")
            console.log(erro)

        }  else {

            console.log("\n --- LIVROS ---")
            livros.forEach( function (livros) {
                console.log(
                    livros.titulo + " - " +
                    livros.autor
                )
            })
        }

        menu()
    })
}

function deletarLivro() {

    const id = readline.question("Digite o ID do livro: ")

    const deletar = "delete from livros where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar livro.")
            console.log(erro)

        }  else if (resultado.affectedRows === 0 ) {

            console.log("Produto não encontrado")

        }   else {

            console.log("Produto deletado com sucesso.")

        }

        menu()

    })
}

menu()