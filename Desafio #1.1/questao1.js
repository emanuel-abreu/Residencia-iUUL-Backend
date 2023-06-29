const prompt = require("prompt-sync")({ sigint: true });

class Vertice {
  #x;
  #y;

  constructor(x, y) {
    this.#x = x;
    this.#y = y;
  }

  get x() {
    return this.#x;
  }

  get y() {
    return this.#y;
  }

  get distancia() {
    return (outroVertice) => {
      const dx = outroVertice.x - this.#x;
      const dy = outroVertice.y - this.#y;
      return Math.sqrt(dx ** 2 + dy ** 2);
    };
  }

  move(novoX, novoY) {
    this.#x = novoX;
    this.#y = novoY;
  }

  equals(outroVertice) {
    return this.#x === outroVertice.x && this.#y === outroVertice.y;
  }
}

const vertices = [];
for (let i = 1; i <= 3; i++) {
  console.log(`Entre com as coordenadas do vértice ${i}:`);
  const x = parseFloat(prompt("X: "));
  const y = parseFloat(prompt("Y: "));
  vertices.push(new Vertice(x, y));
}

console.log("\nResultados:");
console.log("-------------");

for (let i = 0; i < vertices.length; i++) {
  const verticeAtual = vertices[i];
  console.log(`Vértice ${i + 1}: (${verticeAtual.x}, ${verticeAtual.y})`);

  for (let j = 0; j < vertices.length; j++) {
    if (i !== j) {
      const outroVertice = vertices[j];
      const distancia = verticeAtual.distancia(outroVertice);
      console.log(`Distância para o vértice ${j + 1}: ${distancia.toFixed(2)}`);
    }
  }

  console.log("Verificando igualdade entre os vértices:");
  for (let j = 0; j < vertices.length; j++) {
    if (i !== j) {
      const outroVertice = vertices[j];
      const isEqual = verticeAtual.equals(outroVertice);
      console.log(`Vértice ${i + 1} é igual ao vértice ${j + 1}? ${isEqual}`);
    }
  }

  console.log("-------------");
}

for (let i = 0; i < vertices.length; i++) {
  console.log(`Entre com as novas coordenadas para o vértice ${i + 1}:`);

  const novoX = parseFloat(prompt("X: "));
  const novoY = parseFloat(prompt("Y: "));

  const verticeAtual = vertices[i];
  if (verticeAtual.x === novoX && verticeAtual.y === novoY) {
    console.log(
      `O vértice ${
        i + 1
      } continua na mesma posição, pois os valores das coordenadas passados são iguais aos anteriores.
`
    );
  }
  verticeAtual.move(novoX, novoY);
  console.log(
    `As novas coordenadas do vértice ${i + 1} são: (${verticeAtual.x}, ${
      verticeAtual.y
    })
    `
  );
}

module.exports = Vertice;
