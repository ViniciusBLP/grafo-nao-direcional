function criarInputsNos() {
    const numNos = document.getElementById("numNos").value;
    const inputsNos = document.getElementById("inputsNos");
    inputsNos.innerHTML = '';

    for (let i = 0; i < numNos; i++) {
        inputsNos.innerHTML += `
            <label for="no${i}">Nó ${i + 1}:</label>
            <input type="text" id="no${i}" name="no${i}">
            <br><br>
        `;
    }
}

function criarInputsArestas() {
    const numArestas = document.getElementById("numArestas").value;
    const inputsArestas = document.getElementById("inputsArestas");
    inputsArestas.innerHTML = '';

    for (let i = 0; i < numArestas; i++) {
        inputsArestas.innerHTML += `
            <label for="origem${i}">Origem:</label>
            <input type="text" id="origem${i}" name="origem${i}">
            <label for="destino${i}">Destino:</label>
            <input type="text" id="destino${i}" name="destino${i}">
            <br><br>
        `;
    }
}

function executarAlgoritmo() {
    const grafo = new Grafo();

    const numNos = document.getElementById("numNos").value;
    for (let i = 0; i < numNos; i++) {
        grafo.adicionarNo(document.getElementById(`no${i}`).value);
    }

    const numArestas = document.getElementById("numArestas").value;
    for (let i = 0; i < numArestas; i++) {
        const origem = document.getElementById(`origem${i}`).value;
        const destino = document.getElementById(`destino${i}`).value;
        grafo.adicionarAresta(origem, destino);
    }

    const algoritmo = document.getElementById("algoritmo").value;
    let resultado;

    if (algoritmo === "ordenacao") {
        const { ordemTopologica, tempos } = grafo.ordenacaoTopologica();
        resultado = `Ordenação Topológica: ${ordemTopologica.join(' -> ')}\n\n`;
        resultado += 'Tempos de descoberta/finalização:\n';
        for (let no in tempos.descoberta) {
            resultado += `${no} (${tempos.descoberta[no]}/${tempos.finalizacao[no]})\n`;
        }
    } else if (algoritmo === "componentes") {
        const { componentes, temposOriginal, temposTransposto } = grafo.componentesFortementeConectados();
        resultado = `Componentes Fortemente Conectados: ${componentes.map(c => `{${c.join(', ')}}`).join(', ')}\n\n`;
        resultado += 'Tempos de descoberta/finalização (G):\n';
        for (let no in temposOriginal.descoberta) {
            resultado += `${no} (${temposOriginal.descoberta[no]}/${temposOriginal.finalizacao[no]})\n`;
        }
        resultado += '\nTempos de descoberta/finalização (GT):\n';
        for (let no in temposTransposto.descoberta) {
            resultado += `${no} (${temposTransposto.descoberta[no]}/${temposTransposto.finalizacao[no]})\n`;
        }
    }

    document.getElementById("resultado").textContent = resultado;
}

window.onload = function() {
    criarInputsNos();
    document.getElementById("numNos").addEventListener("change", criarInputsNos);
    document.getElementById("numArestas").addEventListener("change", criarInputsArestas);
};
