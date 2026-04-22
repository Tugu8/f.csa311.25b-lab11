import React from "react";
import { Cell } from "./game";

interface Props {
  cell: Cell;
}

class BoardCell extends React.Component<Props> {
  render(): React.ReactNode {
    const playable = this.props.cell.playable ? "playable" : "";
    const playerClass =
      this.props.cell.text === "X"
        ? "player-x"
        : this.props.cell.text === "O"
          ? "player-o"
          : "";
    return (
      <div className={`cell ${playable} ${playerClass}`}>
        {this.props.cell.text}
      </div>
    );
  }
}

export default BoardCell;
