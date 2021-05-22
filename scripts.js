//get the popup div
const popup = document.querySelector('openModal');
//variable for image src
var video = "images\20210514_145135.mp4";
//function to close modal
document.addEventListener(
	'click',
	function (event) {
// If you either click X btn(hidden) OR clicks outside the modal window, then close modal by calling closeModal()
	if (
	event.target.matches('.button-close-modal') ||
	!event.target.closest('.modal')
) {
	closeModal();
	}
},
	false
);

function closeModal() {
	document.querySelector('.modal').style.display = "none";
}

//BoardGame Code
//Cards
const cards=document.querySelectorAll('.card');

let secondFlip = false;
let lockBoard = false;
let firstCard;
let secondCard;
let score = 0;

//Clicks to update user on webpage
let totalclicks = 0;
let ticker = document.getElementById('totalclicks');//

//Flips cards to see if they match
function flipCard () {
  //if cards are flipping back over, don't allow another click
  if (lockBoard) return;
  //if the first card is clicked a second time, do not do anything
  if (this === firstCard) return;
  // if cards don't match flip both cards back over.
  this.classList.add('flip');
  //if a card hasn't already been turned over this is first card.
  if (!secondFlip) {
    secondFlip = true;
    firstCard = this;
    totalclicks++;
    ticker.innerText = totalclicks;
  } else { //flipped check for a match, add click counter to html
    secondCard= this;
    totalclicks++;
    ticker.innerText = totalclicks;
    checkForMatch();
    checkForWin();
  }
}
//if cards match keep flipped
function checkForMatch() {
  let isMatch = firstCard.dataset.icon === secondCard.dataset.icon;

//if matched keep flipped and if no match flip back over
if (isMatch) {
  disableCards();
  updateScore();
  setTimeout(() => {
  updateScoreboard();

  }, 500);
} else {
  unflipCards();
  setTimeout(() => {
  }, 1500);
}
}

//Check for a win alert Winner
function checkForWin() {
  if (score === 800) {
    setTimeout(() => {
    alert("Winner");
    resetGame();
  }, 800);
  }
}
//update score 100 points for every match.
function updateScore() {
  score = score + 100;
}

//updates scoreboard in html
function updateScoreboard() {
  document.getElementById('score').textContent = score;
}
//updates click counter in html
function  clicks() {
  totalclicks ++;
  counter.innerHTML = 'ticker';
}

//disable cards remove click listener, so matched cards cannont be clicked again.
function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetTurn();
}
//flip cards back over if they don't match
function unflipCards() {
  lockboard = true;
  //set timeout so second card finished flip before flipping back over.
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetTurn();
  }, 1500);
}
//reset turn clears the classes from the cards that are not matches and allows a new first card to be clicked.
function resetTurn() {
  secondFlip = false;
  lockBoard = false;
  firstCard = null;
  secondCard = null;
}

attemps= 0;
//shuffle cards... This one was tricky!!!
function shuffleCards() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}
//reset gameboard resets score and clicks to 0
function resetGame() {
    secondFlip = false;
    lockBoard = false;
    firstCard = null;
    secondCard = null;
    totalclicks = 0;
    score = 0;
    document.getElementById('score').innerHTML = 0;
    document.getElementById('totalclicks').innerHTML = 0;

    cards.forEach(card => card.addEventListener('click', flipCard));
    cards.forEach(card => card.classList.remove('flip'));

    lockBoard = true;

    setTimeout(() => {
      shuffleCards();
      lockBoard = false;
    }, 1000);
  }
//Reset Game button (New Game Btn on html)
(function startGame() {
  resetGame();
  document.getElementById('new-game').addEventListener('click', resetGame);
  alert("Do you want to play a game?");
})();
