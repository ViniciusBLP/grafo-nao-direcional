class Grafo {
    constructor() {
        this.adjacencia = new Map();
    }

    adicionarNo(no) {
        if (!this.adjacencia.has(no)) {
            this.adjacencia.set(no, []);
        }
    }

    adicionarAresta(origem, destino) {
        this.adicionarNo(origem);
        this.adicionarNo(destino);
        this.adjacencia.get(origem).push(destino);
    }

    // Função auxiliar para realizar a busca em profundidade (DFS)
    _dfs(no, visitado, stack, tempos, tempoAtual) {
        visitado.add(no);
        tempos.descoberta[no] = ++tempoAtual.valor;

        const vizinhos = this.adjacencia.get(no);
        for (let vizinho of vizinhos) {
            if (!visitado.has(vizinho)) {
                this._dfs(vizinho, visitado, stack, tempos, tempoAtual);
            }
        }

        tempos.finalizacao[no] = ++tempoAtual.valor;
        stack.push(no);
    }

    // Ordenação Topológica
    ordenacaoTopologica() {
        const visitado = new Set();
        const stack = [];
        const tempos = { descoberta: {}, finalizacao: {} };
        let tempoAtual = { valor: 0 };

        this.adjacencia.forEach((_, no) => {
            if (!visitado.has(no)) {
                this._dfs(no, visitado, stack, tempos, tempoAtual);
            }
        });

        return {
            ordemTopologica: stack.reverse(),
            tempos
        };
    }

    // Função auxiliar para transpor a matriz de adjacência
    _transporGrafo() {
        const grafoTransposto = new Grafo();

        this.adjacencia.forEach((vizinhos, no) => {
            vizinhos.forEach(vizinho => {
                grafoTransposto.adicionarAresta(vizinho, no);
            });
        });

        return grafoTransposto;
    }

    // Componentes Fortemente Conectados
    componentesFortementeConectados() {
        const ordenacao = this.ordenacaoTopologica();
        const grafoTransposto = this._transporGrafo();

        const visitado = new Set();
        const componentes = [];
        const temposGT = { descoberta: {}, finalizacao: {} };
        let tempoAtual = { valor: 0 };

        while (ordenacao.ordemTopologica.length > 0) {
            const no = ordenacao.ordemTopologica.pop();
            if (!visitado.has(no)) {
                const stack = [];
                grafoTransposto._dfs(no, visitado, stack, temposGT, tempoAtual);
                componentes.push(stack);
            }
        }

        return {
            componentes,
            temposOriginal: ordenacao.tempos,
            temposTransposto: temposGT
        };
    }
}
