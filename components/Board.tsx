import { MouseEvent, TouchEvent, useState } from "react";
import Cell from "./Cell";

interface BoardProps {
  start: Cell
  setStart: React.Dispatch<React.SetStateAction<Cell>>
  end: Cell
  setEnd: React.Dispatch<React.SetStateAction<Cell>>
  walls: Map<string, Cell>
  setWalls: React.Dispatch<React.SetStateAction<Map<string, Cell>>>
}

enum Operation {
  None,
  Ignore,
  AddWall,
  RemoveWall,
  MoveStart,
  MoveEnd,
}

const WALL_COLOR = "#9e9e9e";
const START_COLOR = "#4CAF50";
const END_COLOR = "#F44336";

export default function Board(props: BoardProps) {
  const [operation, setOperation] = useState(Operation.None);

  const addWall = (cell: Cell): void => {
    if (props.walls.has(cell.key)) return;

    props.setWalls(walls => {
      const newWalls = new Map(walls);
      newWalls.set(cell.key, cell);
      return newWalls;
    });
  }

  const removeWall = (cell: Cell): void => {
    if (!props.walls.has(cell.key)) return;

    props.setWalls(walls => {
      const newWalls = new Map(walls);
      newWalls.delete(cell.key);
      return newWalls;
    });
  }

  const eventToCell = (target: Element, x: number, y: number): Cell => {
      const rect = target.getBoundingClientRect();
      const col = Math.floor((x - rect.left) / 32);
      const row = Math.floor((y - rect.top) / 32);
      return new Cell(col, row);
  }

  const down = (target: Element, x: number, y: number): void => {
    const cell = eventToCell(target, x, y);

    if (props.start.key === cell.key) {
      setOperation(Operation.MoveStart);
    } else if (props.end.key === cell.key) {
      setOperation(Operation.MoveEnd);
    } else if (props.walls.has(cell.key)) {
      setOperation(Operation.RemoveWall);
      removeWall(cell);
    } else {
      setOperation(Operation.AddWall);
      addWall(cell);
    }
  }

  const move = (target: Element, x: number, y: number): void => {
    const cell = eventToCell(target, x, y);

    if (operation === Operation.MoveStart && props.end.key !== cell.key) {
      props.setStart(cell);
    } else if (operation === Operation.MoveEnd && props.start.key !== cell.key) {
      props.setEnd(cell);
    } else if (operation === Operation.RemoveWall) {
      removeWall(cell);
    } else if (operation === Operation.AddWall) {
      addWall(cell);
    }
  }

  const handleMouseDown = (event: MouseEvent): void => {
    if (operation == Operation.Ignore || !(event.target instanceof Element)) return;
    down(event.target, event.clientX, event.clientY);
  }

  const handleMouseMove = (event: MouseEvent): void => {
    if (operation === Operation.None || operation === Operation.Ignore || !(event.target instanceof Element))
      return;
    move(event.target, event.clientX, event.clientY);
  }

  const handleMouseUp = (): void => {
    setOperation(Operation.None);
  }

  const handleTouchStart = (event: TouchEvent): void => {
    if (!(event.target instanceof Element))
      return;
    down(event.target, event.touches[0].clientX, event.touches[0].clientY);
  }

  const handleTouchMove = (event: TouchEvent): void => {
    if (operation === Operation.None || !(event.target instanceof Element))
      return;
    move(event.target, event.touches[0].clientX, event.touches[0].clientY);
  }

  const handleTouchEnd = (): void => {
    setOperation(Operation.Ignore);
  }

  const wall_rects = Array.from(props.walls.values()).map(wall => wall.toRect(WALL_COLOR));
  const start_rect = props.start.toRect(START_COLOR);
  const end_rect = props.end.toRect(END_COLOR);

  return (
    <svg
      version="1.1" width="100%" height="100%"
      onMouseDown={(event) => handleMouseDown(event)}
      onMouseMove={(event) => handleMouseMove(event)}
      onMouseUp={() => handleMouseUp()}
      onTouchStart={(event) => handleTouchStart(event)}
      onTouchMove={(event) => handleTouchMove(event)}
      onTouchEnd={() => handleTouchEnd()}
    >
      {wall_rects}
      {start_rect}
      {end_rect}
      <style jsx>{`
        svg {
          background-size: 32px 32px;
          background-image:
            linear-gradient(to right, black 1px, transparent 1px),
            linear-gradient(to bottom, black 1px, transparent 1px);
        }
      `}</style>
    </svg>
  );
}