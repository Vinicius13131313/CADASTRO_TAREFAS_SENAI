class Produto {
    constructor(descricao, valor, qtd) {
        this.nome = descricao
        this.preco = parseFloat(valor)
        this.quantidade = parseInt(qtd)
    }

    calcularSubtotal() {
        return this.preco * this.quantidade
    }
}

const produtos = []
const chavestorage = "sistema_estoque_produtos"

function salvarProdutos() {
    const dados = JSON.stringify(produtos)
    localStorage.setItem(chavestorage, dados)
}

function carregarProdutos() {
    const dados = localStorage.getItem(chavestorage)

    if (dados) {
        const produtosSalvos = JSON.parse(dados)

        produtosSalvos.forEach((item) => {
            const produto = new Produto(
                item.nome,
                item.preco,
                item.quantidade
            )

            produtos.push(produto)
        })
    }
}

const formulario = document.getElementById("produto-form")
const botaoLimpar = document.getElementById("limpar-tabela")
const elementoTotal = document.getElementById("total-estoque")

formulario.addEventListener("submit", function (evento) {
    evento.preventDefault()

    const nome = document.getElementById("nome").value
    const preco = document.getElementById("preco").value
    const quantidade = document.getElementById("quantidade").value

    const produto = new Produto(nome, preco, quantidade)

    produtos.push(produto)
    salvarProdutos()
    atualizarInterface()
    formulario.reset()
})

botaoLimpar.addEventListener("click", function () {
    if (produtos.length === 0) {
        alert("A tabela já está vazia!")
        return
    }

    if (confirm("Tem certeza que deseja remover todos os produtos?")) {
        produtos.length = 0
        localStorage.removeItem(STORAGE_KEY)
        atualizarInterface()
    }
})

function excluirProduto(posicao) {
    produtos.splice(posicao, 1)
    salvarProdutos()
    atualizarInterface()
}

function atualizarTotal() {
    const valorTotal = produtos.reduce((total, item) => {
        return total + item.calcularSubtotal()
    }, 0)

    elementoTotal.textContent = `Total em Estoque: R$ ${valorTotal.toFixed(2)}`
}

function montarTabela() {
    const corpoTabela = document.querySelector("#tabela-produtos tbody")

    corpoTabela.innerHTML = ""

    produtos.forEach((item, posicao) => {
        const novaLinha = document.createElement("tr")

        novaLinha.innerHTML = `
            <td>${item.nome}</td>
            <td>R$ ${item.preco.toFixed(2)}</td>
            <td>${item.quantidade}</td>
            <td>R$ ${item.calcularSubtotal().toFixed(2)}</td>
            <td>
                <button class="btn-remover">Remover</button>
            </td>
        `

        const botaoRemover = novaLinha.querySelector(".btn-remover")

        botaoRemover.addEventListener("click", () => excluirProduto(posicao))

        corpoTabela.appendChild(novaLinha)
    })
}

function atualizarInterface() {
    montarTabela()
    atualizarTotal()
}

carregarProdutos()
atualizarInterface()