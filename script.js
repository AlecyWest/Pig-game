'use strict';

//Selecting Elements
const score0 = document.getElementById('score--0');
const score1 = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const bntNew = document.querySelector('.btn--new');
const bntRoll = document.querySelector('.btn--roll');
const bntHold = document.querySelector('.btn--hold');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const activePlayer0 = document.querySelector('.player--0');
const activePlayer1 = document.querySelector('.player--1');

//Functions
const closeDice = function () {
  diceEl.classList.add('hidden');
};
const showDice = function () {
  diceEl.classList.remove('hidden');
};
//Switching form P1 to P2
const switchlabels0 = function () {
  activePlayer0.classList.remove('player--active');
  activePlayer1.classList.add('player--active');
};
//Switching form P2 to P1
const switchlabels1 = function () {
  activePlayer1.classList.remove('player--active');
  activePlayer0.classList.add('player--active');
};

const switchingPlayers = function () {
  document.getElementById(`current--${activePlayer}`).textContent = currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  activePlayer0.classList.toggle('player--active');
  activePlayer1.classList.toggle('player--active');
};
//Starting conditions
closeDice();
score0.textContent = 0;
score1.textContent = 0;

const scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

//Rolling a dice
bntRoll.addEventListener('click', function () {
  if ((playing = true)) {
    const diceNum = Math.trunc(Math.random() * 6) + 1;
    //console.log(diceNum);
    showDice();
    diceEl.src = `dice-${diceNum}.png`;
    if (diceNum !== 1) {
      // Add dice to current score
      currentScore += diceNum;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent = currentScore;

      // Switch player
      activePlayer = activePlayer === 0 ? 1 : 0;
      // console.log(activePlayer);
      // if (activePlayer === 1) {
      //   switchlabels0();
      // } else {
      //   switchlabels1();
      // }

      activePlayer0.classList.toggle('player--active');
      activePlayer1.classList.toggle('player--active');
    }
  }
});

bntHold.addEventListener('click', function () {
  if ((playing = true)) {
    // Add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
    currentScore = 0;
    //Switching
    // Chek if player's score is >=100
    if (scores[activePlayer] >= 10) {
      playing = false;
      console.log(`Player ${activePlayer} won`);
      document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
      document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
      closeDice();
    } else {
      switchingPlayers();
    }
  }
});

bntNew.addEventListener('click', function () {
  showDice();
  document.querySelector(`.player--${activePlayer}`).classList.remove('player--winner');
  document.querySelector(`.player--${activePlayer}`).classList.add('player--active');
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  scores[0] = 0;
  scores[1] = 0;
  document.getElementById(`score--${activePlayer}`).textContent = scores[activePlayer];
});
