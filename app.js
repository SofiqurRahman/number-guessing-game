/*
GAME FUNCTIONS:
-------------
- Player must guess a number between a min and max.
- Player gets a certain amount of guesses
- Notify Player of guesses Remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// game value
let min=1,
    max=10,
    winningNumber=randomWinNum(min, max),
    guessesLeft=3;
// ui element
const game=document.querySelector('#game'),
      minNum=document.querySelector('.min-num'),
      maxNum=document.querySelector('.max-num'),
      guessBtn=document.querySelector('#guess-btn'),
      guessInput=document.querySelector('#guess-input'),
      message=document.querySelector('.message'),
      loading=document.querySelector('#loading'),
      progress=document.querySelector('.progress-bar');

// assign ui min and max
minNum.textContent=min;
maxNum.textContent=max;

// listen for guess
guessBtn.addEventListener('click',function(e){
  let guess=parseInt(guessInput.value);
  loading.style.display='block';

  // after 2 sec
  setTimeout(function(){
    loading.style.display='none';

     // validation
    if(isNaN(guess) || guess < min || guess > max){
      setMessage(`Please enter a number between ${min} and ${max}`,'red');
    }else{
      // check if win
      if(guess===winningNumber){
        // game over (win)
        gameOver(true,`${guess} is correct, You WIN`);

        // progress
        showProgress('progress-bar','100%','25px','Win!! Win!! Win!!','bg-success');
      }else{
        // wrong number input
        guessesLeft-=1;
        if(guessesLeft===0){
          // game over (lost)
          gameOver(false,`Game Over , You Lost. Correct number Was ${winningNumber}`);

          // progress
          showProgress('progress-bar','100%','25px','Game Over!! You Lost The Game','bg-danger');
        }else{
          // try again
          setMessage(`Wrong input , ${guess} is not correct, ${guessesLeft} guesses left`,'red');

          switch(guessesLeft){
            case 2:
              // progress
              showProgress('progress-bar','33%','25px','Wrong!! Two Guess Left','bg-info');
              break;
            case 1:
              // progress
              showProgress('progress-bar','66%','25px','Wrong!! One Guess Left','bg-warning');
              break;
          }
        }
      }
    }
  }, 2000);
  e.preventDefault();
})

function setMessage(text,color){
  message.textContent=text;
  message.style.color=color;
}

function gameOver(win,msg){
  let color;
  win===true ? color = 'green' : color = 'red';
  // disable input
  guessInput.disabled=true;
  // change border color
  guessInput.style.borderColor=color;
  // set message
  setMessage(msg, color);
  // play again
  guessBtn.innerHTML = 'Play Again';
  guessBtn.className += ' play-again'; 
}

// play again
game.addEventListener('mousedown', function(e){
  if(e.target.classList.contains('play-again')){
    window.location.reload();
  }
})

function showProgress(setClass,width,height,msg,alertClass){
  progress.className = setClass;
  progress.style.width = width;
  progress.parentElement.style.height = height;
  progress.textContent = msg;
  progress.classList.add(alertClass);
}

function randomWinNum(min, max){
  return Math.floor(Math.random() * (max - min + 1));
}