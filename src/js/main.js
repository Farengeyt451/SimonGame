const sounds = {
	green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
	red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
	blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
	yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

// const squreGreen = document.querySelector("#clrGreen");
// const squreRed = document.querySelector("#clrRed");
// const squreYellow = document.querySelector("#clrYellow");
// const squreBlue = document.querySelector("#clrBlue");
const sections = document.querySelectorAll(".section");
const startBtn = document.querySelector("#startGame");
const strictBtn = document.querySelector("#strictMode");
const outputDisplay = document.querySelector("#output");

let count= 0;
let generatedSeq = [];
let playersSeq = [];
let strict = false;

strictBtn.style.backgroundColor = "#D83838";
strictBtn.style.color = "#FFF";
function attachSouds(color) {
	switch (color) {
		case "clrGreen":
			sounds.green.play();
			break;
		case "clrRed":
			sounds.red.play();
			break;
		case "clrYellow":
			sounds.yellow.play();
			break;
		case "clrBlue":
			sounds.blue.play();
			break;
	}
}

function checkPlayerMove(color) {
	// if (playersSeq[playersSeq.length - 1] !== playPushedSeq[playPushedSeq.length -1]) {
		attachSouds(color);
	// }
}

function addPlayerColor() {
	let playerColor = this.id;
	playersSeq.push(playerColor);
	checkPlayerMove(playerColor);
}

function playAnimation(square) {
	console.log(square);
	let squareID = document.querySelector(`#${square}`);
	squareID.classList.add("animate-square");
	attachSouds(square);
	setTimeout(function() {
		squareID.classList.remove("animate-square");
	}, 500);
}

function playPushedSeq() {
	for (let k = 0; k < generatedSeq.length; k++) {
		console.log("GEB" + generatedSeq[k]);
		setTimeout(function() {
			playAnimation(generatedSeq[k]);
		}, k * 1000);
	}
	playersSeq = [];
}



function genColor() {
	let innerCount;
	count++;
	count < 10 ? innerCount = `0${count}` : innerCount = `${count}`;
	console.log(innerCount);
	outputDisplay.innerText = innerCount;
	generatedSeq.push(sections[(Math.floor(Math.random() * 4))].id);
	console.log("generatedSeq  " + generatedSeq);
	playPushedSeq();
}

function resetAll() {
	count = 0;
	generatedSeq = [];
	playersSeq = [];
}

function startGame() {
	resetAll();
	genColor();
}


sections.forEach(section => section.addEventListener("click", addPlayerColor));
startBtn.addEventListener("click", startGame);
