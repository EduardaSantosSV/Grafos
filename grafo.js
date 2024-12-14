/* 
O código cria e manipula um grafo simples de até 20 vértices. Ele garante que as arestas não sejam duplicadas ao adicionar a mesma aresta em ambos os sentidos. 
O uso de listas de adjacência e a verificação para prevenir duplicação são estratégias eficientes para gerenciar grafos simples.
*/
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

class Grafo {
  constructor() {
    this.vertices = new Array(20).fill(null).map(() => []);
  }

  adicionarAresta( v1, v2, peso ) {
    if (peso <= 0) {
      console.log('O peso da aresta deve ser um valor positivo!');
      return;
    }
    if (!this.vertices[v1].some(aresta => aresta.vertice === v2)) {
      this.vertices[v1].push({ vertice: v2, peso: peso });
    }
    if (!this.vertices[v2].some(aresta => aresta.vertice === v1)) {
      this.vertices[v2].push({ vertice: v1, peso: peso });
    }
  }

  mostrarGrafo() {
    console.log('Dados armazenados no grafo:');
    for (let i = 0; i < 20; i++) {
      if (this.vertices[i].length > 0) {
        console.log(`Vértice ${i}:`);
        this.vertices[i].forEach(aresta => {
          console.log(`  Conectado ao vértice ${aresta.vertice} com peso ${aresta.peso}`);
        });
      }
    }
  }
}

function lerEntrada( question ) {
  return new Promise(resolve => rl.question(question, resolve));
}

async function main() {
  const grafo = new Grafo();

  const numVertices = await lerEntrada('Digite o número de vértices (máximo 20): ');
  const vertices = parseInt(numVertices);

  if (vertices < 1 || vertices > 20) {
    console.log('Número de vértices inválido! O número deve estar entre 1 e 20.');
    rl.close();
    return;
  }

  for (let i = 0; i < vertices; i++) {
    const arestas = await lerEntrada(`Digite o número de arestas para o vértice ${i}: `);
    const numArestas = parseInt(arestas);

    for (let j = 0; j < numArestas; j++) {
      const v2 = await lerEntrada(`Digite o vértice de destino para a aresta ${j + 1} de ${i}: `);
      const peso = await lerEntrada(`Digite o peso da aresta de ${i} para ${v2}: `);
      const pesoNum = parseInt(peso);

      grafo.adicionarAresta(i, parseInt(v2), pesoNum);
    }
  }

  grafo.mostrarGrafo();
  rl.close();
}

main();
