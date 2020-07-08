export default class Cell {
  constructor(public readonly col: number, public readonly row: number)
  {}

  get key(): string {
    return this.col + "," + this.row;
  }

  equals(other: Cell): boolean {
    return this.col === other.col && this.row === other.row;
  }

  * neighbors() {
    yield new Cell(this.col + 1, this.row);
    yield new Cell(this.col, this.row + 1);
    if (this.col > 0) yield new Cell(this.col - 1, this.row);
    if (this.row > 0) yield new Cell(this.col, this.row - 1);
  }

  toRect(color: string) {
    const x = this.col * 32 + 0.5;
    const y = this.row * 32 + 0.5;

    return (
      <rect
        key={this.key}
        x={x}
        y={y}
        width="32"
        height="32"
        stroke="black"
        fill={color}
        strokeWidth="1"
      />
    );
  }
}