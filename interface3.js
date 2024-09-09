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
            <label for="peso${i}">Peso:</label>
            <input type="number" id="peso${i}" name="peso${i}">
            <br><br>
        `;
    }
}

function heuristicaEuclidiana(no, fim) {
    const coordenadas = {
        '0': [0, 0],
        '1': [1, 2],
        '2': [2, 1],
        '3': [1, 1],
        '4': [3, 0],
        '5': [2, 2],
        '6': [3, 2]
    };

    const [x1, y1] = coordenadas[no] || [0, 0];
    const [x2, y2] = coordenadas[fim] || [0, 0];

    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

function executarAlgoritmo() {
    const grafo = new GrafoPonderado();

    const numNos = document.getElementById("numNos").value;
    const nos = Array.from({ length: numNos }, (_, i) => document.getElementById(`no${i}`).value);

    const numArestas = document.getElementById("numArestas").value;
    for (let i = 0; i < numArestas; i++) {
        const origem = document.getElementById(`origem${i}`).value;
        const destino = document.getElementById(`destino${i}`).value;
        const peso = parseInt(document.getElementById(`peso${i}`).value, 10);
        grafo.adicionarAresta(origem, destino, peso);
    }

    const algoritmo = document.getElementById("algoritmo").value;
    const inicio = document.getElementById("inicio").value;
    const fim = document.getElementById("fim").value;
    const resultado = document.getElementById("resultado");

    let output = '';

    if (algoritmo === 'dijkstra') {
        const { tabelaControle, caminho } = grafo.dijkstra(inicio, fim);
        output += 'Algoritmo de Dijkstra\n';
        output += 'Tabela de Controle:\n';
        tabelaControle.forEach((item, index) => {
            output += `Passo ${index + 1}:\n`;
            output += `Distâncias: ${item.distancias.join(', ')}\n`;
            output += `Predecessores: ${item.predecessores.join(', ')}\n`;
        });
        output += `Caminho Mínimo: ${caminho.join(' -> ')}\n`;
    } else if (algoritmo === 'astar') {
        const { tabelaControle, caminho } = grafo.astar(inicio, fim, heuristicaEuclidiana);
        output += 'Algoritmo A*\n';
        output += 'Lista Aberta e Fechada:\n';
        tabelaControle.forEach((item, index) => {
            output += `Passo ${index + 1}:\n`;
            output += `Aberta: ${item.heuristicas.join(', ')}\n`;
            output += `Fechada: ${item.distancias.join(', ')}\n`;
        });
        output += `Caminho Mínimo: ${caminho.join(' -> ')}\n`;
    }

    resultado.textContent = output;
}
