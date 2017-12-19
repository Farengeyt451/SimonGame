const sounds = {
	green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
	red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
	blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
	yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
};

const sections = document.querySelectorAll(".section");
const startBtn = document.querySelector("#startGame");
const strictBtn = document.querySelector("#strictMode");
const outputDisplay = document.querySelector("#output");
const statusGame = document.querySelector("#statusGame");


let count= 0;
let generatedSeq = [];
let playersSeq = [];
let strict = false;

function showMsg(msg) {
	statusGame.innerText = msg;
	let delMsg = setTimeout(() => {
		statusGame.innerText = "";
	}, 2000);
	if (msg === "You win") {
		clearTimeout(delMsg);
	}
}

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
	if (playersSeq[0] !== generatedSeq[0]) {
		attachSouds(color);
		if (strict) {
			showMsg("You Lost");
			setTimeout(startGame, 1000);
		} else {
			showMsg("Wrong Step Try Again ;)");
			setTimeout(playPushedSeq, 2000);
		}
	} else {
		attachSouds(color);
		let checkCorrect = playersSeq.length === generatedSeq.length;
		if (checkCorrect) {
			if (count === 20) {
				showMsg("You win");
			} else {
				setTimeout(genColor, 1500);
			}
		}
	}
}

function addPlayerColor() {
	let playerColor = this.id;
	playersSeq.push(playerColor);
	checkPlayerMove(playerColor);
}

function playAnimation(square) {
	let squareID = document.querySelector(`#${square}`);
	squareID.classList.add("animate-square");
	attachSouds(square);
	setTimeout(function() {
		squareID.classList.remove("animate-square");
	}, 800);
}

function playPushedSeq() {
	for (let k = 0; k < generatedSeq.length; k++) {
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
	outputDisplay.innerText = innerCount;
	generatedSeq.push(sections[(Math.floor(Math.random() * 4))].id);
	playPushedSeq();
}

function resetAll() {
	count = 0;
	generatedSeq = [];
	playersSeq = [];
	statusGame.innerText = "";
}

function startGame() {
	resetAll();
	setTimeout(genColor, 1000);
	sections.forEach(section => section.addEventListener("click", addPlayerColor));
}

function enableStrcit() {
	if (!strict) {
		strictBtn.style.backgroundColor = "#D83838";
		strictBtn.style.color = "#FFF";
		strict = true;
	} else {
		strictBtn.style.backgroundColor = "#F95";
		strictBtn.style.color = "#333";
		strict = false;
	}
	setTimeout(startGame, 1000);
}

function debounce(func, wait, immediate) {
	let timeout;
	return function() {
		let context = this, args = arguments;
		let later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		let callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
}


startBtn.addEventListener("click", debounce(startGame, 1000));
strictBtn.addEventListener("click", enableStrcit);
