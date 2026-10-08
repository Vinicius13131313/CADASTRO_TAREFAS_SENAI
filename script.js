let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];

let entrada = document.getElementById("tarefa");
let adicionar = document.getElementById("adicionar");
let lista = document.getElementById("lista");
let contador = document.getElementById("contador");
let tema = document.getElementById("tema");
let gifBox = document.getElementById("gif-box");
let somConcluido = document.getElementById("som-concluido");

function salvar() {
    localStorage.setItem("tarefas", JSON.stringify(tarefas));
    mostrar();
}

function mostrar() {
    lista.innerHTML = "";

    for (let i = 0; i < tarefas.length; i++) {
        let item = document.createElement("li");

        let cor = tarefas[i].cor || "#ffc5ce";

        item.style.backgroundColor = cor;

        if (tarefas[i].concluida) {
            item.classList.add("feito");
        }

        item.innerHTML = `
            <span class="texto-tarefa">${tarefas[i].descricao}</span>

            <div class="botoes">
                <button class="check" onclick="concluir(${i})">
                    <i class="fa-solid fa-check"></i>
                </button>

                <button class="editar" onclick="editar(${i})">
                    <i class="fa-solid fa-pen"></i>
                </button>

                <button class="cor-btn" onclick="abrirCor(${i})">
                    <i class="fa-solid fa-palette"></i>
                </button>

                <input
                    type="color"
                    id="cor-${i}"
                    class="seletor-cor"
                    value="${cor}"
                    onchange="mudarCor(${i}, this.value)"
                >

                <button class="apagar" onclick="apagar(${i})">
                    <i class="fa-solid fa-xmark"></i>
                </button>
            </div>
        `;

        lista.appendChild(item);
    }

    if (tarefas.length == 1) {
        contador.innerText = "1 tarefa";
    } else {
        contador.innerText = tarefas.length + " tarefas";
    }
}

function adicionarTarefa() {
    let texto = entrada.value.trim();

    if (texto == "") {
        alert("Digite uma tarefa primeiro!");
        return;
    }

    tarefas.push({
        descricao: texto,
        concluida: false,
        cor: "#ffc5ce"
    });

    entrada.value = "";
    entrada.focus();

    salvar();
}

function concluir(numero) {
    tarefas[numero].concluida = !tarefas[numero].concluida;

    salvar();

    if (tarefas[numero].concluida) {
        somConcluido.currentTime = 0;
        somConcluido.play();

        gifBox.classList.add("mostrar");

        setTimeout(function() {
            gifBox.classList.remove("mostrar");
        }, 2000);
    }
}

function apagar(numero) {
    tarefas.splice(numero, 1);
    salvar();
}

function editar(numero) {
    let novoTexto = prompt("Digite o novo nome:", tarefas[numero].descricao);

    if (novoTexto != null && novoTexto.trim() != "") {
        tarefas[numero].descricao = novoTexto.trim();
        salvar();
    }
}

function abrirCor(numero) {
    document.getElementById("cor-" + numero).click();
}

function mudarCor(numero, cor) {
    tarefas[numero].cor = cor;
    salvar();
}

adicionar.addEventListener("click", adicionarTarefa);

entrada.addEventListener("keydown", function(evento) {
    if (evento.key == "Enter") {
        adicionarTarefa();
    }
});

tema.addEventListener("click", function() {
    document.body.classList.toggle("escuro");

    let icone = tema.querySelector("i");

    if (document.body.classList.contains("escuro")) {
        icone.className = "fa-solid fa-sun";
    } else {
        icone.className = "fa-solid fa-moon";
    }
});

mostrar();