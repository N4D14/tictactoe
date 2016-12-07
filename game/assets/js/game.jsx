import React from 'react';

function determineWinner(squares) {
  // Check rows
  for (let i = 0; i < squares.length; i += 3) {
    if (squares[i] && squares[i] === squares[i+1] && squares[i] === squares[i+2]) {
      return squares[i]
    }
  }
  // Check columns
  for (let i = 0; i < 3; i++) {
    if (squares[i] && squares[i] === squares[i+3] && squares[i] === squares[i+6]) {
      return squares[i]
    }
  }
  // Check Diagonals
  if (squares[0] && squares[0] === squares[4] && squares[0] === squares[8]) {
    return squares[0]
  }
  if (squares[2] && squares[2] === squares[4] && squares[2] === squares[6]) {
    return squares[2]
  }
  // Check for a Draw
  let full = true;
  for (let i=0; i < squares.length; i++) {
    if (!squares[i]) full = false;
  }
  if (full) return 'Draw';

  return null
}

function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
    />;
  }

  renderRow(i) {
    let rowSquares = [];
    for(let j = i; j < i+3; j++) {
      rowSquares.push(this.renderSquare(j));
    }
    return rowSquares;
  }

  renderRows() {
    let boardRows = [];
    for (let i=0; i<9; i += 3) {
      boardRows.push(
        <div className="board-row">
          {this.renderRow(i)}
        </div>
      );
    }
    return boardRows;
  }

  render() {
    return (
      <div>
        {this.renderRows()}
      </div>
    );
  }
}

export class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  render() {
    const winner = determineWinner(this.state.squares);

    let status;
    if (winner) {
      status = (winner != 'Draw') ? `Winner is ${winner}` : 'Draw! Game Over.';
    } else {
      const next = this.nextPlayer();
      status = `Next player: ${next}`;      
    }
    return (
      <div className="game">
        <div className="game-board">
          <h1 className='Header'>Tic Tac Toe</h1>
          <div className="status">{status}</div>
          <Board 
            squares={this.state.squares}
            onClick={(i) => this.handleClick(i)}
          />
          <button className="reset-button" onClick={() => this.reset()}>
            Reset
          </button>
        </div>
      </div>
    );
  }

  handleClick(i) {
    const squares = this.state.squares.slice();
    if (determineWinner(squares) || squares[i]) {
      return;
    }

    squares[i] = this.nextPlayer();
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  nextPlayer() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  reset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true      
    })
  }

}
