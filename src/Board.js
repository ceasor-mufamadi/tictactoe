import React from 'react';
import Square from './Square'

class Board extends React.Component {

    //render a Square component with prop value i. (i.e. value of player who selected square i)
    renderSquare(i) {
        return <Square value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
     />;
    }

    //render the board
    render(){
        
        return (
          <div>
           <div className="board-row">
              {this.renderSquare(0)}
              {this.renderSquare(1)}
              {this.renderSquare(2)}
            </div>
            <div className="board-row">
              {this.renderSquare(3)}
              {this.renderSquare(4)}
              {this.renderSquare(5)}
            </div>
            <div className="board-row">
              {this.renderSquare(6)}
              {this.renderSquare(7)}
              {this.renderSquare(8)}
            </div>
          </div>
        );
    }

}

export default Board;