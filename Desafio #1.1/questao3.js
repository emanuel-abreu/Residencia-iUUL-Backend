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

class Poligono extends Vertice {
  #vertices;

  constructor(...vertices) {
    super(0, 0);
    if (vertices.length < 3) {
      throw new Error("O polígono deve ter pelo menos 3 vértices.");
    }

    this.#vertices = [];

    for (const vertice of vertices) {
      if (!this.#vertices.some((v) => v.equals(vertice))) {
        this.#vertices.push(vertice);
      }
    }
  }

  addVertice(vertice) {
    if (!this.#vertices.some((v) => v.equals(vertice))) {
      this.#vertices.push(vertice);
      return true;
    }

    return false;
  }

  get qtdVertices() {
    return this.#vertices.length;
  }

  get perimetro() {
    let perimetro = 0;

    for (let i = 0; i < this.#vertices.length; i++) {
      const verticeAtual = this.#vertices[i];
      const verticeProximo = this.#vertices[(i + 1) % this.#vertices.length];
      perimetro += verticeAtual.distancia(verticeProximo);
    }

    return perimetro;
  }
}

function lerVertices() {
  const vertices = [];

  const numVertices = parseInt(
    prompt("Digite o número de vértices do polígono: ")
  );
  if (numVertices < 3) {
    throw new Error("O polígono deve ter pelo menos 3 vértices.");
  }

  for (let i = 0; i < numVertices; i++) {
    const x = parseFloat(
      prompt(`Digite o valor de x para o vértice ${i + 1}: `)
    );
    const y = parseFloat(
      prompt(`Digite o valor de y para o vértice ${i + 1}: `)
    );
    vertices.push(new Vertice(x, y));
  }

  return vertices;
}

try {
  const vertices = lerVertices();
  const poligono = new Poligono(...vertices);

  console.log("Polígono criado com sucesso!");
  console.log("Quantidade de vértices:", poligono.qtdVertices);
  console.log("Perímetro:", poligono.perimetro);
} catch (error) {
  console.log("Erro:", error.message);
}
