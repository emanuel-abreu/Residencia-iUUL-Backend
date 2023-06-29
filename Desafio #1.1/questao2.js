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

class Triangulo extends Vertice {
  #vertice1;
  #vertice2;
  #vertice3;
  constructor(vertice1, vertice2, vertice3) {
    super(0, 0);
    this.#vertice1 = vertice1;
    this.#vertice2 = vertice2;
    this.#vertice3 = vertice3;

    if (!this.formaTriangulo()) {
      throw new Error("Os vértices fornecidos não formam um triângulo válido.");
    }
  }

  formaTriangulo() {
    const distancia12 = this.#vertice1.distancia(this.#vertice2);
    const distancia13 = this.#vertice1.distancia(this.#vertice3);
    const distancia23 = this.#vertice2.distancia(this.#vertice3);

    return (
      distancia12 + distancia13 > distancia23 &&
      distancia12 + distancia23 > distancia13 &&
      distancia13 + distancia23 > distancia12
    );
  }

  equals(outroTriangulo) {
    return (
      this.#vertice1.x === outroTriangulo.#vertice1.x &&
      this.#vertice1.y === outroTriangulo.#vertice1.y &&
      this.#vertice2.x === outroTriangulo.#vertice2.x &&
      this.#vertice2.y === outroTriangulo.#vertice2.y &&
      this.#vertice3.x === outroTriangulo.#vertice3.x &&
      this.#vertice3.y === outroTriangulo.#vertice3.y
    );
  }

  get perimetro() {
    const distancia12 = this.#vertice1.distancia(this.#vertice2);
    const distancia13 = this.#vertice1.distancia(this.#vertice3);
    const distancia23 = this.#vertice2.distancia(this.#vertice3);

    return distancia12 + distancia13 + distancia23;
  }

  tipo() {
    const distancia12 = this.#vertice1.distancia(this.#vertice2);
    const distancia13 = this.#vertice1.distancia(this.#vertice3);
    const distancia23 = this.#vertice2.distancia(this.#vertice3);

    if (distancia12 === distancia13 && distancia12 === distancia23) {
      return "Equilátero";
    } else if (
      distancia12 === distancia13 ||
      distancia12 === distancia23 ||
      distancia13 === distancia23
    ) {
      return "Isósceles";
    } else {
      return "Escaleno";
    }
  }

  clone() {
    const vertice1Clone = new Vertice(this.#vertice1.x, this.#vertice1.y);
    const vertice2Clone = new Vertice(this.#vertice2.x, this.#vertice2.y);
    const vertice3Clone = new Vertice(this.#vertice3.x, this.#vertice3.y);

    return new Triangulo(vertice1Clone, vertice2Clone, vertice3Clone);
  }

  get area() {
    const distancia12 = this.#vertice1.distancia(this.#vertice2);
    const distancia13 = this.#vertice1.distancia(this.#vertice3);
    const distancia23 = this.#vertice2.distancia(this.#vertice3);

    const semiperimetro = this.perimetro / 2;
    return Math.sqrt(
      semiperimetro *
        (semiperimetro - distancia12) *
        (semiperimetro - distancia13) *
        (semiperimetro - distancia23)
    );
  }
}

// Leitura dos vértices do triângulo
function lerVertices() {
  const x1 = parseFloat(prompt("Digite o valor de x para o vértice 1: "));
  const y1 = parseFloat(prompt("Digite o valor de y para o vértice 1: "));
  const x2 = parseFloat(prompt("Digite o valor de x para o vértice 2: "));
  const y2 = parseFloat(prompt("Digite o valor de y para o vértice 2: "));
  const x3 = parseFloat(prompt("Digite o valor de x para o vértice 3: "));
  const y3 = parseFloat(prompt("Digite o valor de y para o vértice 3: "));

  const vertice1 = new Vertice(x1, y1);
  const vertice2 = new Vertice(x2, y2);
  const vertice3 = new Vertice(x3, y3);

  return [vertice1, vertice2, vertice3];
}

try {
  console.log("\n=== Triângulo 1 ===");
  const vertices1 = lerVertices();
  const triangulo1 = new Triangulo(...vertices1);
  console.log("Perímetro:", triangulo1.perimetro);
  console.log("Tipo:", triangulo1.tipo());
  console.log("Área:", triangulo1.area);

  console.log("\n=== Triângulo 2 ===");
  const vertices2 = lerVertices();
  const triangulo2 = new Triangulo(...vertices2);
  console.log("Perímetro:", triangulo2.perimetro);
  console.log("Tipo:", triangulo2.tipo());
  console.log("Área:", triangulo2.area);

  console.log("\n=== Triângulo 3 ===");
  const vertices3 = lerVertices();
  const triangulo3 = new Triangulo(...vertices3);
  console.log("Perímetro:", triangulo3.perimetro);
  console.log("Tipo:", triangulo3.tipo());
  console.log("Área:", triangulo3.area);

  console.log("\n=== Verificação de Igualdade ===");
  console.log(
    "Triângulo 1 é igual ao Triângulo 2:",
    triangulo1.equals(triangulo2)
  );
  console.log(
    "Triângulo 2 é igual ao Triângulo 3:",
    triangulo2.equals(triangulo3)
  );
  console.log(
    "Triângulo 1 é igual ao Triângulo 3:",
    triangulo1.equals(triangulo3)
  );

  console.log("\n=== Teste do Método Clone ===");
  const trianguloClone = triangulo2.clone();
  console.log("Clone do triângulo 2:");
  console.log("Perímetro:", trianguloClone.perimetro);
  console.log("Tipo:", trianguloClone.tipo());
  console.log("Área:", trianguloClone.area);
} catch (error) {
  console.log("Erro:", error.message);
}
