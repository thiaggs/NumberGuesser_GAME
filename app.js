/*
GAME FUNCTION:

    - Player must guess a number between min and max;
    - Player gets a certain amount of guesses;
    - Notify player of guesses remaining;
    - Notify the player of the correct answer if loose;
    - Let player choose to play again;

*/

//Game variables
let min = 1,
    max = 10,
    winningNum = setWinningNum(min, max),
    guessesLeft = 3;

//UI variables
const game = document.querySelector('#game'),
    minNum = document.querySelector('.min-num'),
    maxNum = document.querySelector('.max-num'),
    guessBtn = document.querySelector('#try-btn'),
    guessNum = document.querySelector('#try-number'),
    message = document.querySelector('.message');

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;


loadAllEvents();

function loadAllEvents(e){

    guessBtn.addEventListener('click', submitClick);
    game.addEventListener('mousedown', playAgain);

}

function submitClick(){

    let tryNumber = parseInt(guessNum.value);
    

    // Validate
    if(isNaN(tryNumber) || tryNumber < min || tryNumber > max){
        
       guessNum.style.borderColor = 'red';
       showMessage(`Please try a number between ${min} and ${max}`, 'red');

    }else{

        //Game over - Won
        if(tryNumber == winningNum){

            gameOver(`${tryNumber} is correct! You won!`, 'green');
            
        }else{
            //Wrong Number
            guessesLeft--;

            // Game over - Lost
            if(guessesLeft < 1){
                
               gameOver(`${tryNumber} is incorrect, no chances remaining. The correct answer was ${winningNum}`, 'red');

            // Game Continues - Wrong Answer
            }else{
                showMessage(`${tryNumber} is incorrect. Chances remaining: ${guessesLeft}`, 'red');
                guessNum.style.borderColor = 'red';
                guessNum.value = '';
            }

        }
    }
}

//Set Message
function showMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}

function gameOver(msg, color){

    //Disable input
    guessNum.disabled = true;
    //  Change border color
    guessNum.style.borderColor = color;
    // Set message
    showMessage(msg, color);

    guessBtn.value = 'Play again';
    guessBtn.className += ' play-again';
}

function playAgain(e){

    if(e.target.classList.contains('play-again')){
        window.location.reload();
    }
    
}

function setWinningNum(min, max){

    return Math.floor(Math.random() *(max - min + 1) + min);
}