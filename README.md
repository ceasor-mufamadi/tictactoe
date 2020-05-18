## Tic Tac Toe (minimax algorithm)

This project is a tic tac toe game that uses minimax strategy to determine AI move.
Minimax is a game tree search strategy in which at each move the AI tries to minimize the maximum value the human can achieve.

The game UI was developed following Tutorial: Intro to React. which can be found at this <a href="https://reactjs.org/tutorial/tutorial.html">link</a>.

To find the best move for AI, the algorithm must find the move that gives the human the worst board value. The algorithm creates a variable ``best_move`` to keep track of the possible move foun so far for the AI. Initially it is set to **null**. To ensure that it is replaced by a better move, when one is found. It's given a value of either +1000 or -1000 to indicate that the tree branch is either in favor for human or AI.
```javascript
let best_move;                               //best move for AI at given board position. when minimax is called.
if (isComp) {
    best_move = [null, +1000];
}
else {
    best_move = [null, -1000];
}
```
The algorithm start by checking if this board position is better for the human, this is not preferable for AI therefore play it is saved as ``best_move`` for AI to play to block a win.
if human is not winner. The algorithm returns.

```javascript
squares[square] = (!isComp ? 'X' : 'O');
let winner = calculateWinner(squares);
if(winner){ 
    if( winner === (!isComp ? 'X' : 'O')){
        best_move = [square, +1000];                    
    }else{
        return;
    }
```
Next the algorithm loops through all the moves the AI could make. It makes a test move and then recursively calls itself to find the best move the opponent could make after the AI makes that test move. At each recursion call the algorithm updates the ``best_move``, based on whether if the opponet wins or loses.

```javascript
if( calculateWinner(squares) === (isComp ? 'X' : 'O')){
    best_move = [square, +1000];
    }else if( calculateWinner(squares) === (!isComp ? 'X' : 'O')){
        best_move = [square, -1000];
    }
```

After the recursive call returns, the algorithm compares the best result the opponent could obtain with the value saved in ``best_move``. If the test value is higher, the algorithm updates the ``best_move``, so it knows that this move is preferable (for the AI).

```javascript
let test_move = minimax(squares,isComp);

if (test_move[1] > best_move[1]){
    best_move = test_move;
}
```

In case where it is not clear whether the opponent wins or loses, the AI chooses a random move that is available.

```javascript
if(best_move[0] == null){
    const empt = emptyCells(squares)
    best_move[0] = empt[Math.floor(Math.random() * empt.length)];
}
```

## Scripts

To run the project use:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.