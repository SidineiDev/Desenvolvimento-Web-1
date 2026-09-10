const mysql = require("mysql2")
const readline = require("readline-sync")

const conexao = mysql.createConnection ({

    host: "localhost",
    user: "root",
    password: "root",
    database: "laboratorio_avaliacao"
})

function menu() {

    console.log("\n ===== MENU =====")
    console.log("1 - Cadastrar computador")
    console.log("2 - Excluir computador")
    console.log("3 - Listar computador")
    console.log("4 - Atualizar computador")
    console.log("0 - Sair")

    const opcao = readline.questionInt("Digite a opção: ")

    if (opcao === 1) {

        cadastrarComputador()

    } else if (opcao === 2 ) {

        deletarComputador()

    } else if (opcao === 3) {

        listarComputador()
    
    } else if (opcao === 4) {

        atualizarComputador()

    } else if (opcao === 0 ) {

        console.log("Programa encerrado.")
        conexao.end()

    } else {

        console.log("Opção inválida.")
        menu()
    }
}

function atualizarComputador() {
    const id = readline.questionInt("Digite o ID do computador: ");
    const sql = "select * from computadores where id = ?";

    conexao.query(sql, [id], function(erro, resultado) {
        if (erro) {
            console.log("Erro ao buscar computador:");
            console.log(erro);
            menu(); 
        } 
        else if (resultado.length === 0) {
            console.log("Computador não encontrado!");
            menu(); 
        } 
        else {
            console.log("\n--- STATUS ATUAIS ---");
            resultado.forEach(function (computador) {
                console.log(
                    "Localização: " + computador.localizacao + " | " +
                    "Responsável: " + computador.responsavel + " | " +
                    "Status: " + computador.status
                );
            });
            console.log("----------------------\n");

            const localizacao = readline.question("Digite a nova localização: ");
            const responsavel = readline.question("Digite o novo responsável: ");
            const status = readline.question("Digite o novo status: ");

            const update = "update computadores set localizacao = ?, responsavel = ?, status = ? where id = ?";

            conexao.query(update, [localizacao, responsavel, status, id], function(erro, resultadoUpdate) {
                if (erro) {
                    console.log("Erro ao atualizar Computador.");
                    console.log(erro);
                } else {
                    console.log("Computador atualizado com sucesso!");
                }
                
               
                menu();
            });
        }
    });
}

function cadastrarComputador() {

    const patrimonio = readline.question("Digite o patrimônio: ")
    const localizacao = readline.question("Digite a localização: ")
    const responsavel = readline.question("Digite o responsável: ")
    const status = readline.question("Digite o status: ")

    const inserir = "insert into computadores (patrimonio, localizacao, responsavel, status) values (?, ?, ?, ?)"

    conexao.query(inserir, [patrimonio, localizacao, responsavel, status], function(erro){
        
        if (erro) {

            console.log("Erro ao cadastrar computador.")
            console.log(erro)

        }  else {

            console.log("Computador cadastrado com sucesso.")
            menu()
        }
    })
}

function listarComputador() {
    
    const sql = "select patrimonio, localizacao, responsavel, status from computadores"

    conexao.query(sql, function(erro, computadores) {

        if (erro) {

            console.log("Erro ao listar os computadores.")
            console.log(erro)

        }  else {

            console.log("\n --- COMPUTADORES ---")
            computadores.forEach( function (computadores) {
                    console.log(
                    computadores.id + " - " +
                    computadores.patrimonio + " - " +
                    computadores.localizacao + " - " +
                    computadores.responsavel + " - " +
                    computadores.status
                )
            })
        }

        menu()
    })
}

function deletarComputador() {

    const id = readline.question("Digite o ID do computador: ")

    

    const consultar = "SELECT * FROM computadores WHERE id = ?"
    
        conexao.query(consultar, [id], function(erro, resultado) {
    
            if (erro) {
    
                console.log("Erro ao consultar computador")
                console.log(erro)
                menu()
                return
    
            }
    
            if (resultado.length === 0) {
    
                console.log("Computador não encontrado")
                menu()
                return
    
            }
    
            console.log("\nComputador encontrado:")
            console.log("Patrimônio:", resultado[0].patrimonio)
            console.log("Localização:", resultado[0].localizacao)
            console.log("Responsável:", resultado[0].responsavel)
            console.log("Status:", resultado[0].status)
    
            const resposta = readline.question("Deseja excluir? (S/N): ").toLowerCase()
    
            if (resposta === "s") {
    
                const deletar = "DELETE FROM computadores WHERE id = ?"
    
                conexao.query(deletar, [id], function(erro, resultado) {
    
                    if (erro) {
    
                        console.log("Erro ao deletar computador")
                        console.log(erro)
    
                    } else {
    
                        console.log("Computador deletado com sucesso.")
    
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