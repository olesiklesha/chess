import React, {FC, useEffect, useState} from 'react';
import {Board} from "../../models/Board";
import {CellComponent} from "../index";
import {Cell} from "../../models/Cell";
import {Player} from "../../models/Player";

interface BoardProps {
  board: Board;
  setBoard: (board: Board) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}

const BoardComponent: FC<BoardProps> = ({board, setBoard, swapPlayer, currentPlayer}) => {
  const [selectedCell, setSelectedCell] = useState<Cell | null>(null)

  function handleClick(cell: Cell) {
    if (selectedCell && selectedCell !== cell && selectedCell.figure?.canMove(cell)) {
      selectedCell.moveFigure(cell);
      setSelectedCell(null);
      swapPlayer();
      updateBoard();
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }

  }

  useEffect(() => {
    highlightCells()
  }, [selectedCell])

  function highlightCells() {
    board.highlightCells(selectedCell)
    updateBoard();
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  }

  return (
    <div>
      <h3>Current player: {currentPlayer?.color}</h3>
      <div className='board'>
        {board.cells.map((row, i) =>
          <React.Fragment key={i}>
            {row.map(cell =>
              <CellComponent
                click={handleClick}
                key={cell.id}
                cell={cell}
                selected={cell.x === selectedCell?.x && cell.y === selectedCell?.y}
              />)}
          </React.Fragment>
        )}
      </div>
    </div>
  );
};

export default BoardComponent;