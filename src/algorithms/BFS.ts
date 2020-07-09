import Queue from "mnemonist/queue";
import Cell from "../../components/Cell";

export default function BFS(start: Cell, end: Cell, walls: Map<string, Cell>): Array<Cell> {
  const result = new Array<Cell>();
  const visited = new Map<string, Cell>();
  const queue = new Queue<Cell>();

  visited.set(start.key, start);
  queue.enqueue(start);

  while(queue.size) {
    const cell = queue.dequeue() as Cell;
    result.push(cell);

    if (cell.equals(end)) break;

    for (let neighbor of cell.neighbors()) {
      if (visited.has(neighbor.key) || walls.has(neighbor.key)) {
        continue;
      }

      queue.enqueue(neighbor);
      visited.set(neighbor.key, neighbor);
    }
  }

  return result;
}
