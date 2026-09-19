const gameBoard = document.querySelector("#game-board");

const charecters = [
    "luffy",
    "zoro",
    "nami",
    "usopp",
    "sanji",
    "chopper",
    "robin",
    "franky",
    "brook",
    "zinbe",
    "garp",
    "roger"
];
const TOTAL_PAIRS = charecters.length;

const cards = charecters.flatMap((character) => [
    `images/${character}.png`,
    `images/${character}.png`
]);
const TOTAL_CARDS = cards.length;


function shuffleCards(){
    for(let i = cards.length - 1;i > 0;i--){
    const randomIndex =  Math.floor(Math.random() * (i + 1));
    let temp = cards[i];
    cards[i] = cards[randomIndex];
    cards[randomIndex] = temp;
    }
    
}
shuffleCards();
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let currPlayer = 1;
let score1 = 0;
let score2 = 0;
let gameOver = false;
let pairs = 0;
let matched = []; 
let moves = 0;
let mismatchTimer = null;
const score1Text = document.querySelector("#score1");
const score2Text = document.querySelector("#score2");
const turnText = document.querySelector("#turn");
const gameContainer = document.querySelector(".game-container");
const resultText = document.querySelector("#result");
const restartBtn = document.querySelector("#restart-btn");
const moveText = document.querySelector("#moves");
function updateTurn(){

    turnText.textContent = `Player ${currPlayer}'s Turn`;

    if(currPlayer === 1){
        gameContainer.style.background = "#ffcccc";
    }
    else{
        gameContainer.style.background = "#cce5ff";
    }
}

function changeTurn(){

    currPlayer = currPlayer === 1 ? 2 : 1;

    updateTurn();
}
function updateScore(){
     if(currPlayer === 1){
        score1++;
        score1Text.textContent = score1;
    }
    else{
        score2++;
        score2Text.textContent = score2;
    }
}
function checkGameOver(){

    if(pairs !== TOTAL_PAIRS) return;

    gameOver = true;
    gameBoard.classList.add("game-over");
    turnText.textContent = "Game Over";

    if(score1 > score2){
        resultText.textContent = "Player 1 wins";
    }
    else if(score2 > score1){
        resultText.textContent = "Player 2 wins";
    }
    else{
        resultText.textContent = "It's a Tie";
    }
}
function checkMatch(){
    if(firstCard.dataset.value === secondCard.dataset.value){
                
                pairs++;
                matched.push(firstCard);
                matched.push(secondCard);
                firstCard.classList.add("matched");
                secondCard.classList.add("matched");
                updateScore();
                checkGameOver();
                firstCard = null;
                secondCard = null;
                lockBoard = false;
            }else{
                

                mismatchTimer = setTimeout(() => {
                    firstCard.classList.remove("flipped");
                    secondCard.classList.remove("flipped");
                    firstCard = null;
                    secondCard = null;

                    changeTurn();
                    lockBoard = false;
                    mismatchTimer = null;
                } , 1000);
            }
        
}
function handleCardClick(cardel){
    if(gameOver) return;
        if(lockBoard) return;
        if(matched.includes(cardel)) return;
        if(cardel === firstCard) return;
        
        cardel.classList.add("flipped");
        if(firstCard === null){
            firstCard = cardel;
        }
        else{
            secondCard = cardel;
            lockBoard = true;
            moves++;
            moveText.textContent = `Moves: ${moves}`;
            checkMatch();
        }
}
function createCards(){
    cards.forEach((card) => {
        const cardel = document.createElement("div");
        cardel.classList.add("card");
        const image = document.createElement("img");
        image.src = card;
        cardel.dataset.value = card;
        cardel.append(image);
        gameBoard.append(cardel);
        cardel.addEventListener("click" , () =>{
        handleCardClick(cardel);
        
    });
});
}
createCards();
updateTurn();
    
function restartGame(){
    if(mismatchTimer){
        clearTimeout(mismatchTimer);
        mismatchTimer = null;
    }
    gameBoard.innerHTML = "";
    gameBoard.classList.remove("game-over");
    firstCard = null;
    secondCard = null;
    lockBoard = false;
    currPlayer = 1;
    score1 = 0;
    score2 = 0;
    pairs = 0;
    matched = [];
    gameOver = false;
    moves = 0;
    moveText.textContent = "Moves: 0";
     
    score1Text.textContent = "0";
    score2Text.textContent = "0";
    
    resultText.textContent = "";
    updateTurn();
    shuffleCards();
    createCards();
}
restartBtn.addEventListener("click" , restartGame);
