const campoTarefa = document.getElementById("campo-tarefa");
const botaoAdicionar = document.getElementById("botao-adicionar");
const listaTarefas = document.getElementById("lista-tarefas");
const contadorTarefas = document.getElementById("contador-tarefas");
const botaoModoEscuro = document.getElementById("botao-modo-escuro");



botaoAdicionar.addEventListener("click", adicionarTarefa);

campoTarefa.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        adicionarTarefa();
    }
});

function adicionarTarefa() {

    const texto = campoTarefa.value.trim();

    if (texto === "") {
        return;
    }

    const item = document.createElement("li");

    item.classList.add("item-tarefa");

    item.innerHTML = `
        <span>${texto}</span>

        <div class="acoes-tarefa">

            <button class="botao-acao concluir">
                <i class="fa-solid fa-check"></i>
            </button>

            <button class="botao-acao excluir">
                <i class="fa-solid fa-trash"></i>
            </button>

        </div>
    `;

    const botaoConcluir = item.querySelector(".concluir");

    botaoConcluir.addEventListener("click", function() {
        item.classList.toggle("concluida");
    });


    const botaoExcluir = item.querySelector(".excluir");

    botaoExcluir.addEventListener("click", function() {
        item.remove();
        atualizarContador();
    });


    listaTarefas.appendChild(item);

    campoTarefa.value = "";

    campoTarefa.focus();

    atualizarContador();
}


function atualizarContador() {

    const quantidade = listaTarefas.querySelectorAll(".item-tarefa").length;

    if (quantidade === 0) {
        contadorTarefas.textContent = "0 tarefas na lista";
    }

    else if (quantidade === 1) {
        contadorTarefas.textContent = "1 tarefa na lista";
    }

    else {
        contadorTarefas.textContent = `${quantidade} tarefas na lista`;
    }
}


    botaoModoEscuro.addEventListener("click", function() {

    document.body.classList.toggle("modoescuro");

    const icone = botaoModoEscuro.querySelector("i");

    if (document.body.classList.contains("modoescuro")) {

        icone.classList.remove("fa-moon");
        icone.classList.add("fa-sun");

    } else {

        icone.classList.remove("fa-sun");
        icone.classList.add("fa-moon");

    }
});