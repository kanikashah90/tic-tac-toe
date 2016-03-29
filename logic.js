'use strict';

var R0 = '___', R1 = '___', R2 = '___', C0 = '___', C1 = '___', C2 = '___', D1 = '___', D2 = '___',
    currentPlayer = 'X',
    count = 0,
    gameOver = false;

var ticTacInputs = document.getElementsByClassName('tic-tac-input'),
    messageDisplay = document.getElementById('message-display'),
    resetButton = document.getElementById('reset-button');

for (var i = 0; i < ticTacInputs.length; i++) {
    ticTacInputs[i].addEventListener('click', callbackFunc, false);
}

resetButton.addEventListener('click', resetBoard, false);
/*
    return type:
        1: player has won the game
        2: Continue the game
        3: The board is complete and no player has wone the game
 */
function move (cell, player) {
    switch (cell.r) {
        case 0:
            R0 = update(R0, cell.c, player);
            if (winCheck(R0, player)) {
                highlightWinningSeq(R0);
                return 1;
            }
            break;
        case 1:
            R1 = update(R1, cell.c, player);
            if (winCheck(R1, player)) {
                highlightWinningSeq(R1);
                return 1;
            }
            break;
        case 2:
            R2 = update(R2, cell.c, player);
            if (winCheck(R2, player)) {
                highlightWinningSeq(R2);
                return 1;
            }
            break;
    }
    switch (cell.c) {
        case 0:
            C0 = update(C0, cell.r, player);
            if (winCheck(C0, player)) {
                highlightWinningSeq(C0);
                return 1;
            }
            break;
        case 1:
            C1 = update(C1, cell.r, player);
            if (winCheck(C1, player)) {
                highlightWinningSeq(C1);
                return 1;
            }
            break;
        case 2:
            C2 = update(C2, cell.r, player);
            if (winCheck(C2, player)) {
                highlightWinningSeq(C2);
                return 1;
            }
    }
    switch (cell.value) {
        case '00':
            D1 = update(D1, 0, player);
            if (winCheck(D1, player)) {
                highlightWinningSeq(D1);
                return 1;
            }
            break;
        case '02':
            D2 = update(D2, 0, player);
            if (winCheck(D2, player)) {
                highlightWinningSeq(D2);
                return 1;
            }
            break;
        case '11':
            D1 = update(D1, 1, player);
            D2 = update(D2, 1, player);
            if (winCheck(D1, player)) {
                highlightWinningSeq(D1);
                return 1;
            }
            if (winCheck(D2, player)) {
                highlightWinningSeq(D2);
                return 1;
            }
            break;
        case '20':
            D2 = update(D2, 2, player);
            if (winCheck(D2, player)) {
                highlightWinningSeq(D2);
                return 1;
            }
            break;
        case '22':
            D1 = update(D1, 2, player);
            if (winCheck(D1, player)) {
                highlightWinningSeq(D1);
                return 1;
            }
            break;
    }

    // Check if the board is full or not
    if (count == 9) {
        return 3;
    }

    return 2;
}

function update (oldValue, position, value) {
    return oldValue.substring(0, position) + value + oldValue.substring(position + 1);
}

function getRC (cellId) {
    var cell = {value: cellId};
    cell.r = parseInt(cellId.substring(0,1), 10);
    cell.c = parseInt(cellId.substring(1,2), 10);
    return cell;
}

function winCheck (sequence, player) {
    var winSequence = player + player + player;
    return sequence === winSequence;
}

// Attach click handler to each cell of the grid
function callbackFunc () {
    if (this.classList.contains('played')) {
        messageDisplay.innerHTML = this.innerHTML + ' already played in this cell. Choose other cell ' + currentPlayer;
    } else if (gameOver) {
        messageDisplay.innerHTML = 'Game is over';
    } else {
        var cell = getRC(this.id),
            moveResult;
        count ++;
        this.innerHTML = currentPlayer;
        this.classList.add('played');
        moveResult = move(cell, currentPlayer);
        switch (moveResult) {
            case 1:
                messageDisplay.innerHTML = 'player' + ' ' + currentPlayer + ' won the game';
                // Disable all the cells so that no one can play till the game is reset
                disableBoard();
                gameOver = true;
                break;
            case 2:
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                messageDisplay.innerHTML = 'It is player ' + currentPlayer + ' turn';
                break;
            case 3:
                messageDisplay.innerHTML = 'no one won the game';
                gameOver = true;
        }
    }
}

function resetBoard() {
    count = 0;
    currentPlayer = 'X';
    R0 = '___', R1 = '___', R2 = '___', C0 = '___', C1 = '___', C2 = '___', D1 = '___', D2 = '___';
    messageDisplay.innerHTML = 'It is player X turn';
    gameOver = false;
    for (var i = 0; i < ticTacInputs.length; i++) {
        ticTacInputs[i].classList.remove('disable');
        ticTacInputs[i].classList.remove('played');
        ticTacInputs[i].classList.remove('won');
        ticTacInputs[i].innerHTML = '';
    }
}

function disableBoard() {
    for (var i = 0; i < ticTacInputs.length; i++) {
        ticTacInputs[i].classList.add('disable');
    }
}

function highlightWinningSeq (seq) {
    switch (seq) {
        case R0:
            winCells(0,1,2);
            break;
        case R1:
            winCells(3,4,5);
            break;
        case R2:
            winCells(6,7,8);
            break;
        case C0:
            winCells(0,3,6);
            break;
        case C1:
            winCells(1,4,7);
            break;
        case C2:
            winCells(2,5,8);
            break;
        case D1:
            winCells(0,4,8);
            break;
        case D2:
            winCells(2,4,6);
            break;
    }
}

function winCells (cell1, cell2, cell3) {
    ticTacInputs[cell1].classList.add('won');
    ticTacInputs[cell2].classList.add('won');
    ticTacInputs[cell3].classList.add('won');
}