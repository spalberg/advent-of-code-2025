import { defineSolution, runSolution } from "@/utils.ts";

const solution = defineSolution(8, (input) => {
  const { part1, part2 } = solve(input);
  return {
    part1: () => part1,
    part2: () => part2,
  };
});

function solve(input: Array<string>) {
  const { nodes, edges } = buildGraph(input);
  let part1 = -1;
  let part2 = -1;
  const limit = 10 ** Math.floor(Math.log10(nodes.length));
  let unions = 0;
  edges.sort((a, b) => a.weight - b.weight);
  for (let i = 0; i < edges.length; i += 1) {
    const edge = edges[i];
    const x = edge.u.findSetRoot();
    const y = edge.v.findSetRoot();
    if (x !== y) {
      x.union(y);
      unions += 1;
      if (unions === nodes.length - 1) {
        part2 = edge.u.x * edge.v.x;
        return { part1, part2 };
      }
    }
    if (i === limit - 1) {
      part1 = productOf3LargestCircuitSizes(nodes);
    }
  }
  return { part1, part2 };
}

function productOf3LargestCircuitSizes(nodes: Array<Node>) {
  const rootNodes = [
    ...new Set(nodes.map((node) => node.findSetRoot())),
  ];
  const [max1, max2, max3] = rootNodes.map((node) => node.size).sort((
    a,
    b,
  ) => b - a);
  return max1 * max2 * max3;
}

function buildGraph(input: Array<string>) {
  const nodes = input.map((line) => line.split(",").map(Number))
    .map(([x, y, z]) => new Node(x, y, z));
  const edges: Array<Edge> = [];
  for (let i = 0; i < nodes.length; i += 1) {
    for (let j = i + 1; j < nodes.length; j += 1) {
      edges.push(new Edge(nodes[i], nodes[j]));
    }
  }
  return { nodes, edges };
}

class Node {
  #x: number;
  #y: number;
  #z: number;
  #parent: Node;
  #size: number;

  constructor(x: number, y: number, z: number) {
    this.#x = x;
    this.#y = y;
    this.#z = z;
    this.#parent = this;
    this.#size = 1;
  }

  get size() {
    return this.#size;
  }

  get x() {
    return this.#x;
  }

  distance(other: Node) {
    return Math.sqrt(
      Math.pow(this.#x - other.#x, 2) +
        Math.pow(this.#y - other.#y, 2) +
        Math.pow(this.#z - other.#z, 2),
    );
  }

  findSetRoot() {
    let x = this as Node;
    let parent: Node;
    while ((parent = x.#parent) !== x) {
      x.#parent = parent.#parent;
      x = parent;
    }
    return x;
  }

  union(other: Node) {
    let x = this.findSetRoot();
    let y = other.findSetRoot();
    if (x === y) return;
    if (x.#size < y.#size) {
      const tmp = x;
      x = y;
      y = tmp;
    }
    y.#parent = x;
    x.#size += y.#size;
  }

  toString() {
    return `[${this.#x},${this.#y},${this.#z}]`;
  }
}

class Edge {
  #u: Node;
  #v: Node;
  #weight: number;

  constructor(u: Node, v: Node) {
    this.#u = u;
    this.#v = v;
    this.#weight = u.distance(v);
  }

  get u() {
    return this.#u;
  }

  get v() {
    return this.#v;
  }

  get weight() {
    return this.#weight;
  }

  toString() {
    return `(${this.#u},${this.#v},${this.#weight})`;
  }
}

if (import.meta.main) {
  runSolution(solution);
}

export default solution;
