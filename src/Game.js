import React, { Component } from 'react';
import Board from './Board';
import './App.css'

class Game extends Component {
    constructor(props) {
        super(props);
        //history is used to store all board states, (store the past squares arrays) 
        //from the first to the last move.
        this.state = {
          squares: Array(9).fill(null),
          xIsNext: true,
        };
      }

    setMove(i){

        const squares = this.state.squares.slice();
        
        //assign selected square with current player symbol
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        console.log("player: "+(this.state.xIsNext ? 'X' : 'O')+", move: "+i)
        //concatenate new history entries onto history
        this.setState({
            squares: squares,
            xIsNext: !this.state.xIsNext,         //switch to next player
        });
    }

    handleClick(i) {    
        
        const squares = this.state.squares.slice();
     
        //     const squares = this.state.squares.slice();
        //ignore a click if someone has won the game or 
        //if a Square is already filled. - therefore it's a draw
        if(calculateWinner(squares) || squares[i]){
            return;
        }

        this.setMove(i);
    }

    aiTurn(comp){
        const squares = this.state.squares.slice();
     
        //optimize the game search tree
        if(squares[4] === null){
            this.setMove(4);                                          //this trims the game tree.            
        }else{
            const move = minimax(squares,comp);   //it is the AI's move
            this.setMove(move[0]);                                          //return move as selected by minimax 
        }
    }
   
    render() {
        
    const squares = this.state.squares.slice();
    
    if(!this.state.xIsNext){
        this.aiTurn((this.state.xIsNext));
    }

    //value of winner
    const winner = calculateWinner(squares); 

    let status;
    //check if game is over.
    if(winner){
        status = 'Winner: ' + winner;
    } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O'); 
    }

    return (
        <div className="game">
        <div className="game-board">
            <Board 
                squares={ squares }
                onClick={ (i) => this.handleClick(i) }
            />
        </div>
        <div className="game-info">
            <div>{ status }</div>
        </div>
        </div>
    );
    }
}

export default Game;

function calculateWinner(squares){
    //lines that correspond to win.
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    //check if any of the player has won.
    for( let i = 0; i < lines.length; i++){
        const [a, b, c] = lines[i];
        if(squares[a] && squares[a] === squares[b]
             && squares[a] === squares[c]){
                return squares[a];
        }
    }
    //no winner, game goes on.
    return null;
}

function emptyCells(squares) {
	let cells = [];
	for (let i = 0; i < squares.length; i++) {
        if (squares[i] === null)                    
            cells.push(i);                      //push empty board cells. i.e remaining moves.
	}
	return cells;           //return all available board position.
}

function minimax(squares,isComp){
    let best_move;                               //best move for AI at given board position. when minimax is called.
	if (isComp) {
		best_move = [null, +1000];               //minimax called to play for AI.
	}
	else {
		best_move = [null, -1000];              //minimax called to play for human.
    }    	

	emptyCells(squares).forEach(function (square) {    
        //First check if this board position is better for the human, and quickly try to force a draw.
        squares[square] = (!isComp ? 'X' : 'O');
        let winner = calculateWinner(squares);
        if(winner){ 
            if( winner === (!isComp ? 'X' : 'O')){                  //if human is not winner, then AI is winner.
                best_move = [square,+1000];                              //best move to play. i.e the intention is to block threat.
            }else{
                return;
            }
        } 
        else {  //if we get here, we can safely try this board position.
            squares[square] = (isComp ? 'X' : 'O');                             //Recursively try other future moves.       ***
            if( calculateWinner(squares) === (isComp ? 'X' : 'O')){
                best_move = [square, +1000];                                      //this is an improvement, save it.
            }else if( calculateWinner(squares) === (!isComp ? 'X' : 'O')){
                best_move = [square, -1000];                  //otherwise return lowest value to indicate this is not a good move for AI.
            }

            let test_move = minimax(squares,isComp);      //calculate score value of the following (child) board position.
                    
            if (test_move[1] > best_move[1]){                   //follow node tree with value better or equal to current board position.
                best_move = test_move;                    //this trims the game tree
            }
        }
        squares[square] = null;     //Restore board position to unmake test move.
    });

    if(best_move[0] == null){
        const empt = emptyCells(squares)
        best_move[0] = empt[Math.floor(Math.random() * empt.length)];
    }

    return best_move;
}//end of minimax
