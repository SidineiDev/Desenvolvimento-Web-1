const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "escola_atv3"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar cursos")
    console.log("2 - Excluir cursos")
    console.log("3 - Listar cursos")
    console.log("0 - Sair")
    
    const opcao = readline.questionInt("Digite a opção: ")
    
    if (opcao === 1) {
    
        cadastrarCurso()
    
    } else if (opcao === 2 ) {

        deletarCurso()
    
    } else if (opcao === 3) {
    
        listarCurso()
    
    } else if (opcao === 0 ) {
    
        console.log("Programa encerrado.")
        conexao.end()
    
    } else {
    
        console.log("Opção inválida.")
        menu()
    }
}

function cadastrarCurso() {

    const nome = readline.question("Insira o nome: ")
    const carga_horaria = readline.question("Insira a carga_horaria: ")
    
        const inserir = "insert into cursos (nome, carga_horaria) values (?, ?)"
    
        conexao.query(inserir, [nome, carga_horaria], function(erro) {
    
            if (erro) {
    
                console.log("Erro ao cadastrar curso.")
                console.log(erro)
    
            }  else {
    
                console.log("Curso cadastrado com sucesso.")
                menu()
            }
        })
}

function listarCurso() {

    const sql = "select * from cursos"

    conexao.query(sql, function(erro, cursos) {

        if (erro) {

            console.log("Erro ao listar cursos.")
            console.log("erro")

        }  else {

            console.log("\n ---CURSOS ---")
            cursos.forEach(function (cursos) {
                console.log(
                    cursos.id + " - " +
                    cursos.nome + " - " + 
                    cursos.carga_horaria + " horas"
                )
            })
        }

        menu()

    })
}

function deletarCurso() {

    const id = readline.question("insira o ID: ")

    const deletar = "delete from cursos where id = ?"

    conexao.query(deletar, [id], function(erro, resultado) {

        if (erro) {

            console.log("Erro ao deletar curso")
            console.log(erro)

        }  else if (resultado.affectedRows === 0 ) {

            console.log("Curso não encontrado")

        }  else {

            console.log("Curso deletado com sucesso.")
        
        }

        menu()
    })
}

menu()