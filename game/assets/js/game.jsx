import { sample } from 'underscore';
import React from 'react';

// Function to render a square on the tic tac toe board
function Square(props) {
  return (
    <button className="square" onClick={() => props.onClick()}>
      {props.value}
    </button>
  );
}

// Render main board
class Board extends React.Component {
  // Render a single square and pass click function
  renderSquare(i) {
    return <Square
      key={`square-${i}`} 
      value={this.props.squares[i]} 
      onClick={() => this.props.onClick(i)}
    />;
  }

  // Render a single row
  renderRow(i) {
    let rowSquares = [];
    for(let j = i; j < i+3; j++) {
      rowSquares.push(this.renderSquare(j));
    }
    return rowSquares;
  }

  // Render the rows in a loop
  renderRows() {
    let boardRows = [];
    for (let i=0; i<9; i += 3) {
      boardRows.push(
        <div key={`board-row-${i}`} 
          className="board-row">
          {this.renderRow(i)}
        </div>
      );
    }
    return boardRows;
  }

  // Render the board
  render() {
    return (
      <div>
        {this.renderRows()}
      </div>
    );
  }
}

// Main game class contatins state of board and turn
export class Game extends React.Component {
  constructor() {
    super();
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  // Render the game and pass state and click function
  render() {
    const winner = this.determineWinner(this.state.squares);

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

  // Handle user click on squaress
  handleClick(i) {
    const squares = this.state.squares.slice();
    if (this.determineWinner(squares) || squares[i] || !this.state.xIsNext) {
      return;
    }

    squares[i] = this.nextPlayer();
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    });
  }

  // Get the next player string
  nextPlayer() {
    return this.state.xIsNext ? 'X' : 'O';
  }

  // Reset the board (at any time)
  reset() {
    this.setState({
      squares: Array(9).fill(null),
      xIsNext: true      
    })
  }

  // Following a board update play the computer's turn if necessary
  componentDidUpdate(prevProps, prevState) {
    if (!this.determineWinner(this.state.squares) && !this.state.xIsNext) {
      fetch('/api/engine.json', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          next_player: this.nextPlayer(),
          squares: this.state.squares,
        })
      }).then(function(response) {
        return response.json();
      }).then((board) => {this.setState({
          squares: board.squares,
          xIsNext: board.next_player === 'X' ? true : false
        })
      }).catch(function(ex) {
        console.log('parsing failed', ex);
      });
    }
  }

  // Determine if the current game state has provided a winner or a draw
  determineWinner(squares) {
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
}
