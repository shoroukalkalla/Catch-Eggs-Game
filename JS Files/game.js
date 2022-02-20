//GLOBAL AREA
let gameContainer = document.getElementById("gameContainer");
let gameBasket = document.getElementById("basket");
let playerName = document.getElementById("playerName");
let gameTimer = document.getElementById("gameTimer");
const scoreWindow = document.getElementById("scoreWindow");
const scoreMessage = document.getElementById("scoreMessage");
const finalScore = document.getElementById("finalScore");
let gameScore = document.getElementById("gameScore");
let eggFallSpeed = 5;
let gameInterval;
let eggInterval;
let counter;
let basketGame;
let eggs = [];
let score = 0;
let username;

/******************************************************************************************************************/
//BASKET CLASS:
class Basket {
  #body;
  #container; //parent div

  constructor() {
    this.#body = document.getElementById("basket");
    this.#container = document.getElementById("gameContainer");
    this.#body.style.top =
      this.#container.offsetHeight - this.#body.offsetHeight - 20 + "px";
    this.#basketMouseEvent();
  }

  #basketMouseEvent() {
    this.#container.addEventListener("mousemove", (event) => {
      let moveBasket = this.#container.offsetWidth - this.#body.offsetWidth - 5;
      let moveLeft = event.clientX - this.#body.offsetWidth / 2;
      if (moveLeft > moveBasket) moveLeft = moveBasket;
      if (moveLeft < 5) moveLeft = 5;
      this.#body.style.left = moveLeft + "px";
    });
  }
} //END OF BASKET CLASS

//SEARCHING NOTES:
//offsetwidth = width + border + padding + vertical scrollbar .. it doesn't include margin.
//clientX provides the horizontal coordinate within the application's viewport at which the event 'mouseEvent" occurred.

/******************************************************************************************************************/
//EGG CLASS:
class Egg {
  #body;
  #getBasket;
  #container;
  #startFallingInterval;

  constructor() {
    this.#container = document.getElementById("gameContainer");
    this.#body = document.createElement("img");
    this.#getBasket = document.getElementById("basket");
    this.#body.className = "gameEgg";
    this.#body.setAttribute("src", "../Pictures/object_012_egg.png");
    this.#body.style.left = this.#generateRandomLeftEggs() + "px";
    this.#container.prepend(this.#body);
    this.#eggStartFalling();
  }

  #generateRandomLeftEggs() {
    let setMaxWidth = this.#container.offsetWidth - 20;
    let randomLeft = Math.random() * setMaxWidth - 20 + 20;
    return randomLeft;
  }

  #eggStartFalling() {
    this.#startFallingInterval = setInterval(() => {
      let eggTop = this.#body.offsetTop;
      eggTop += eggFallSpeed;
      this.#body.style.top = eggTop + "px";

      let basketTop = this.#getBasket.offsetTop;
      if (eggTop >= basketTop + this.#getBasket.offsetHeight - 50) {
        this.#eggStopFalling();
      }
    }, 30);
  }

  #eggStopFalling() {
    clearInterval(this.#startFallingInterval);
    let eggLeft = this.#body.offsetLeft;
    let eggRight = eggLeft + this.#body.offsetWidth;
    let basketLeft = this.#getBasket.offsetLeft;
    let basketRight = basketLeft + this.#getBasket.offsetWidth;

    if (eggLeft >= basketLeft && eggRight <= basketRight) {
      score++;
      updateScore();
      this.#body.remove();
    } else {
      this.#body.setAttribute("src", "../Pictures/object_012_broken_egg.png");
      setTimeout(() => {
        this.#body.remove();
      }, 1500);
    }
  }

  removingEgg() {
    this.#body.remove();
  }
} //END OF EGG CLASS

/******************************************************************************************************************/
//LOADING EVENT
window.addEventListener("DOMContentLoaded", function () {
  username = getUsername();
  playerName.innerHTML = username;
  basketGame = new Basket();
  startGame();
}); //The DOMContentLoaded event fires when the document is loaded and the DOM tree is fully constructed.
//The load event fires when all subframes, images, stylesheets, scripts, etc have been downloaded.

/******************************************************************************************************************/
//SCORE WINDOW BUTTONS EVENTS
document.getElementById("playAgainButton").addEventListener("click", startGame);

document
  .getElementById("backHomeButton")
  .addEventListener("click", function () {
    window.location.href = "index.html";
  });

/******************************************************************************************************************/

function startGame() {
  lastLoginDate(username);
  resetAll();
  gameInterval = setInterval(() => {
    counter--;
    gameTimer.innerHTML = counter;
    if (counter == 0) {
      finishGame();
    }
  }, 1000);
  eggInterval = setInterval(() => {
    let egg = new Egg();
    eggs.push(egg);
  }, 1500);
}

/******************************************************************************************************************/

let updateScore = function () {
  gameScore.innerHTML = score;
};

let targetScore = function () {
  //if user got score 5 or more then he won otherwise he lost
  if (score >= 5) return true;
  else return false;
};

function resetAll() {
  //when the game start, everything will be rested
  score = 0;
  counter = 20;
  eggs = [];
  updateScore();
  scoreWindow.style.display = "none";
}

/******************************************************************************************************************/

//when the time ends, the user data will be save & all intervals will be cleared && the scoreWindow will be displayed with the scoreMessage..

function finishGame() {
  saveGameDate(username);
  clearInterval(gameInterval);
  clearInterval(eggInterval);

  eggs.forEach((egg) => {
    egg.removingEgg();
  });

  displayScore();
}

/******************************************************************************************************************/

function displayScore() {
  scoreWindow.style.display = "flex";

  if (targetScore()) {
    scoreMessage.innerHTML = "You won";
  } else {
    scoreMessage.innerHTML = "You lost";
  }

  finalScore.innerHTML = score;
}

/******************************************************************************************************************/

function getUsername() {
  let search = window.location.search; //'?username=shorouk'
  if (search) {
    search = search.substring(1); //'username=shorouk' "WILL EXCLUDE THE ?"
    let parts = search.split("="); //['username', 'shorouk']
    let username = parts[1]; //'shorouk'
    return username;
  } else {
    location.href = "index.html";
  }
} //THE END

/******************************************************************************************************************/
