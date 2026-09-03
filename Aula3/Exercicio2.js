const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "root",
    database: "loja_atv3"

})

function menu() {

   console.log("\n ===== MENU =====")
       console.log("1 - Cadastrar produto")
       console.log("2 - Excluir produto")
       console.log("3 - Listar produto")
       console.log("4 - Atualizar produto")
       console.log("0 - Sair")
   
       const opcao = readline.questionInt("Escolha uma opção: ")
   
       if (opcao === 1) {
   
           cadastrarProduto()

       } else if (opcao === 2 ) {
   
           excluirProduto()
   
       } else if (opcao === 3) {
   
           listarProduto()
   
       } else if (opcao === 4) {
   
           atualizarProduto()

    } else if (opcao === 0 ) {

        console.log("Programa encerrado.")
        conexao.end()

    } else {

        console.log("Opção inválida.")
        menu()
    }
     
}

function cadastrarProduto() {

    const nome = readline.question("Cadastrar nome do produto: ")
    const preco = readline.questionFloat("Cadastrar preço do produto: ")
    const quantidade = readline.questionInt("Cadastrar quantidade em estoque: ")

    const inserir = "insert into produtos (nome, preco, quantidade) values (?, ?, ?)"

    conexao.query(inserir, [nome, preco, quantidade], function(erro) {

        if (erro) {

            console.log("Erro ao cadastrar.")
            console.log(erro)

        } else {
            console.log("Produto cadastrado com sucesso.")
            menu()
        }
    })
}

function listarProduto() {

    const sql = "select * from produtos"

    conexao.query(sql, function(erro, produtos) {

        if (erro) {

            console.log("Erro ao listar produtos.")
            console.log(erro)

        }  else {

            console.log("\n --- PRODUTOS ---")
            produtos.forEach(function (produtos) {
                console.log(
                    produtos.id + " - " +
                    produtos.nome + " - " +
                    produtos.preco + " - " +
                    produtos.quantidade
                )
            })
        }

        menu()

    })
}

function deletarProduto() {

    const id = readline.questionInt("Digite o ID do produto: ")

    const deletar = "delete from produtos where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar produto.")
            console.log(erro)

        }  else if (resultado.affectedRows === 0) {

            console.log("Produto não encontrado.")

        } else {

            console.log("Produto deletado com sucesso.")
        }

        menu()

    })
}

function atualizarProduto() {

    const nome = readline.question("Cadastrar nome do produto: ")
    const preco = readline.questionFloat("Cadastrar preço do produto: ")
    const quantidade = readline.questionInt("Cadastrar quantidade em estoque: ")

    const id = readline.questionInt("Digite o ID do aluno: ")
    
    const update = "UPDATE alunos SET nome = ?, preco = ?, quantidade = ? WHERE id= ?"

    conexao.query(update, [nome, preco, quantidade, id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao atualizar produto.")
            console.log(erro)

        } else if (resultado.affectedRows === 0) {

            console.log("Produto não encontrado.")

        }  else {

            console.log("Produto atualizado com sucesso!")

        }
        conexao.end()
    })
}

menu()