'use strict;';

//selecting the elements
let score0E1 = document.querySelector('#score--0');
let score0E2 = document.getElementById('score--1');
const diceE1 = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentSoreP1 = document.getElementById('current--0');
const currentSoreP2 = document.getElementById('current--1');

//starting conditions
score0E1.textContent = 0;
score0E2.textContent = 0;
diceE1.classList.add('hidden');

let currentScore = 0;
let activePlayer = 0;
let totalScore = [0, 0];
let playing = true;

//rolling dice functionality
btnRoll.addEventListener('click', () => {
  if (playing) {
    //generating random number
    const dice = Math.trunc(Math.random() * 6) + 1;

    //display dice
    diceE1.classList.remove('hidden');

    //changing the dice picture according to the random number generated
    diceE1.src = `dice-${dice}.png`;

    //check for roll if true ,switch to the next player
    if (dice !== 1) {
      //add dice to current score
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      //siwtch to the next player1
      switchPlayer();
    }
    console.log(activePlayer);
  }
});

//hold the currentscore and add that to the totalscore
btnHold.addEventListener('click', function () {
  if (playing) {
    //adding the current score to totalscore of active player before changing
    totalScore[activePlayer] += currentScore;

    //the value of totalscore is updated in the UI
    document.getElementById(`score--${activePlayer}`).textContent = totalScore[activePlayer];

    //IF totalscore is greater or equal to 100(win) ELSE switch player
    if (totalScore[activePlayer] >= 100) {
      //stop playing
      playing = false;

      //hide the dice
      diceE1.classList.add('hidden');

      //remove action and add winner css
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
    } else {
      // switch player
      switchPlayer();
    }
  }
});

//new game
btnNew.addEventListener('click', () => {
  //remove winner css
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');

  //add class to player 1 always
  document.querySelector(`.player--0`).classList.add('player--active');

  //playing true
  playing = true;

  //changing values along with dice
  currentScore = 0;

  //clicked on new game the values of the current player  currentscore is made 0
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //total score is made 0
  document.getElementById(`score--${activePlayer}`).textContent = 0;

  //active player made 0 means first person will play always when new game is played
  activePlayer = 0;

  //total score of both is 0
  totalScore = [0, 0];

  //both the total score is made 0
  score0E1.textContent = 0;
  score0E2.textContent = 0;
});
function switchPlayer() {
  //current score is made 0 before changing the active player
  document.getElementById(`current--${activePlayer}`).textContent = 0;

  //active player value is changed if 0 to 1 and if 1 to 0
  activePlayer = activePlayer === 0 ? 1 : 0;

  //current score of active player is made 0
  currentScore = 0;

  //active player is changed in the ui
  document.querySelector(`.player--0`).classList.toggle('player--active');
  document.querySelector(`.player--1`).classList.toggle('player--active');
}
