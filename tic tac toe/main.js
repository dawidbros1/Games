var boardItems = document.getElementsByClassName('board-item');
var boardItemValues = document.getElementsByClassName('board-item-value');
var winConditions = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var boardValues = new Array(9);
var marker = ['X', "O"]
var counter = 0;
var stopGame = false;


// Init On Click Event --- START

for (var i = 0; i < boardItems.length; i++) {
    (function (i) {
        boardItems[i].addEventListener('click', function () {
            clickAction(boardItemValues[i], i);
        }, false);
    })(i);
}

// Init On Click Event --- END

function clickAction(boardItemValue, number) {
    if (boardItemValue.innerHTML == "" && !stopGame) {
        boardValues[number] = marker[counter % 2];
        boardItemValue.innerHTML = marker[(counter++) % 2];
        checkWinCondition();
    }
}

function checkWinCondition() {
    winConditions.forEach(wc => {
        if (boardValues[wc[0]] == marker[0] && boardValues[wc[1]] == marker[0] && boardValues[wc[2]] == marker[0]) {
            alert('Wygrywa gracz grajacy jako: ' + marker[0]);
            stopGame = true;
        }

        if (boardValues[wc[0]] == marker[1] && boardValues[wc[1]] == marker[1] && boardValues[wc[2]] == marker[1]) {
            alert('Wygrywa gracz grajacy jako: ' + marker[1]);
            stopGame = true;
        }
    });

    if (counter > 8 && !stopGame) {
        alert('Gra zakończyła się remisem')
    }
	
	 if (counter > 8 || stopGame) {
        window.location.reload(true);
    }
}