class Grafo {
    constructor(direcional, ponderado) {
        this.direcional = direcional;
        this.ponderado = ponderado;
        this.nos = new Map();
    }

    adicionarNo(no) {
        if (!this.nos.has(no)) {
            this.nos.set(no, []);
        }
    }

    adicionarAresta(origem, destino, peso = 1) {
        this.adicionarNo(origem);
        this.adicionarNo(destino);
        if (this.ponderado) {
            this.nos.get(origem).push({ no: destino, peso });
            if (!this.direcional) {
                this.nos.get(destino).push({ no: origem, peso });
            }
        } else {
            this.nos.get(origem).push(destino);
            if (!this.direcional) {
                this.nos.get(destino).push(origem);
            }
        }
    }

    imprimirGrafo() {
        let resultado = '';
        this.nos.forEach((arestas, no) => {
            resultado += `${no}`;
            arestas.forEach(aresta => {
                if (this.ponderado) {
                    resultado += ` (${aresta.no}: ${aresta.peso})`;
                } else {
                    resultado += ` (-> ${aresta})`;
                }
            });
            resultado += '\n';
        });
        return resultado;
    }
}

function criarGrafo() {
    const tipoGrafo = document.getElementById("tipoGrafo").value;
    const numNos = parseInt(document.getElementById("numNos").value);
    const grafo = new Grafo(tipoGrafo === 'direcional', tipoGrafo === 'ponderado');

    for (let i = 0; i < numNos; i++) {
        const no = document.getElementById(`no${i}`).value;
        grafo.adicionarNo(no);
    }

    const numArestas = document.getElementById("numArestas").value;
    for (let i = 0; i < numArestas; i++) {
        const origem = document.getElementById(`origem${i}`).value;
        const destino = document.getElementById(`destino${i}`).value;
        const peso = tipoGrafo === 'ponderado' ? parseInt(document.getElementById(`peso${i}`).value) : null;
        grafo.adicionarAresta(origem, destino, peso);
    }

    const resultado = grafo.imprimirGrafo();
    document.getElementById("resultado").textContent = resultado;
}

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
            ${document.getElementById("tipoGrafo").value === 'ponderado' ? `<label for="peso${i}">Peso:</label><input type="number" id="peso${i}" name="peso${i}" min="1" value="1">` : ''}
            <br><br>
        `;
    }
}

window.onload = function() {
    criarInputsNos();
    document.getElementById("numNos").addEventListener("change", criarInputsNos);
    document.getElementById("numArestas").addEventListener("change", criarInputsArestas);
};
