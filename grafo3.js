class GrafoPonderado {
    constructor() {
        this.adjacencia = new Map();
        this.pesos = new Map();
    }

    adicionarNo(no) {
        if (!this.adjacencia.has(no)) {
            this.adjacencia.set(no, []);
        }
    }

    adicionarAresta(origem, destino, peso) {
        this.adicionarNo(origem);
        this.adicionarNo(destino);
        this.adjacencia.get(origem).push(destino);
        this.adjacencia.get(destino).push(origem);
        this.pesos.set(`${origem}-${destino}`, peso);
        this.pesos.set(`${destino}-${origem}`, peso);
    }

    // Algoritmo de Dijkstra
    dijkstra(inicio, fim) {
        const distancias = new Map();
        const predecessores = new Map();
        const visitado = new Set();
        const tabelaControle = [];
        const fila = new PriorityQueue();

        this.adjacencia.forEach((_, no) => {
            distancias.set(no, Infinity);
            predecessores.set(no, null);
        });
        distancias.set(inicio, 0);
        fila.enqueue(inicio, 0);

        while (!fila.isEmpty()) {
            const { item: u } = fila.dequeue();
            if (u === fim) break;
            if (visitado.has(u)) continue;

            visitado.add(u);
            tabelaControle.push({
                u,
                distancias: Array.from(distancias.values()),
                predecessores: Array.from(predecessores.values())
            });

            this.adjacencia.get(u).forEach(v => {
                if (!visitado.has(v)) {
                    const peso = this.pesos.get(`${u}-${v}`);
                    const novaDistancia = distancias.get(u) + peso;
                    if (novaDistancia < distancias.get(v)) {
                        distancias.set(v, novaDistancia);
                        predecessores.set(v, u);
                        fila.enqueue(v, novaDistancia);
                    }
                }
            });
        }

        const caminho = [];
        let passo = fim;
        while (passo !== null) {
            caminho.push(passo);
            passo = predecessores.get(passo);
        }
        caminho.reverse();

        return {
            tabelaControle,
            caminho
        };
    }

    // Algoritmo A*
    astar(inicio, fim, heuristica) {
        const distancias = new Map();
        const heuristicas = new Map();
        const predecessores = new Map();
        const visitado = new Set();
        const tabelaControle = [];
        const fila = new PriorityQueue();

        this.adjacencia.forEach((_, no) => {
            distancias.set(no, Infinity);
            heuristicas.set(no, heuristica(no, fim));
            predecessores.set(no, null);
        });
        distancias.set(inicio, 0);
        fila.enqueue(inicio, heuristicas.get(inicio));

        while (!fila.isEmpty()) {
            const { item: u } = fila.dequeue();
            if (u === fim) break;
            if (visitado.has(u)) continue;

            visitado.add(u);
            tabelaControle.push({
                u,
                distancias: Array.from(distancias.values()),
                heuristicas: Array.from(heuristicas.values()),
                predecessores: Array.from(predecessores.values())
            });

            this.adjacencia.get(u).forEach(v => {
                if (!visitado.has(v)) {
                    const peso = this.pesos.get(`${u}-${v}`);
                    const novaDistancia = distancias.get(u) + peso;
                    if (novaDistancia < distancias.get(v)) {
                        distancias.set(v, novaDistancia);
                        heuristicas.set(v, heuristica(v, fim));
                        predecessores.set(v, u);
                        fila.enqueue(v, novaDistancia + heuristicas.get(v));
                    }
                }
            });
        }

        const caminho = [];
        let passo = fim;
        while (passo !== null) {
            caminho.push(passo);
            passo = predecessores.get(passo);
        }
        caminho.reverse();

        return {
            tabelaControle,
            caminho
        };
    }
}

// PriorityQueue para Dijkstra e A*
class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    enqueue(item, prioridade) {
        this.queue.push({ item, prioridade });
        this.queue.sort((a, b) => a.prioridade - b.prioridade);
    }

    dequeue() {
        return this.queue.shift();
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}
