const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');

// const docHeight = document.documentElement.clientWidth;
// const docWidth = document.documentElement.clientHeight;
const docWidth = window.innerWidth;
const docHeight = window.innerHeight;

canvas.width = docWidth * 0.9;
canvas.height = docHeight * 0.85;

context.textAlign = 'center';

const frameButtons = document.getElementById('frameButtons');
const againButtons = document.getElementById('againButtons');
const jsonStuff = document.getElementById('jsonStuff');
const jsonToggler = document.getElementById('jsonToggler');

let menuMode = 'titleScreen';
let klickedWas = false;
let klickedStart = false;
let klickedTut = false;
let animationAlpha = 2;

let mode = 'DRAW';

const frametime = 200;

let mouseX = 0;
let mouseY = 0;
let mouseDown = false;


const texts = new Array(3);


const tempDraw = [];
let drawFighter = 1;
let drawState = 0;
const drawStates = ['stehend', 'wird verletzt', 'verletzt Gegner', 'stirbt', 'toetet'];

const fighters = [];

let curFighter;

function draw() {
	background('#222230');

	if (menuMode == 'titleScreen') {
		text('Draw My Fight', canvas.width / 2, canvas.height * 0.5, canvas.height * 0.25, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
		animationAlpha -= 1 / 60;
		if (animationAlpha < -0.3) {
			startMainMenu();
		}
	} else if (menuMode == 'mainMenu') {
		if (animationAlpha < 1.1 && !klickedWas && !klickedStart && !klickedTut) {
			animationAlpha += 0.05;
		} else if (klickedWas) {
			animationAlpha -= 0.05;
			if (animationAlpha < 0) {
				menuMode = 'was';
			}
		} else if (klickedStart) {
			animationAlpha -= 0.05;
			if (animationAlpha < 0) {
				start();
			}
		} else if (klickedTut) {
			animationAlpha -= 0.05;
			if (animationAlpha < 0) {
				startTut();
			}
		}

		drawMenuText();
	} else if (menuMode == 'was') {
		if (animationAlpha < 1.1 && klickedWas) {
			animationAlpha += 0.05;
		} else if (!klickedWas) {
			animationAlpha -= 0.05;
			if (animationAlpha < 0) {
				menuMode = 'mainMenu';
			}
		}
		drawDescription();
	} else {
		if (menuMode == 'normal') {
			drawTexts();
		}

		if (mode == 'DRAW') {
			context.beginPath();
			context.lineWidth = canvas.width * 0.07;
			context.strokeStyle = '#452000';
			line(canvas.width * 0.2, canvas.height * 0.45, canvas.width * 0.2, canvas.height * 0.7);
			line(canvas.width * 0.8, canvas.height * 0.45, canvas.width * 0.8, canvas.height * 0.7);
			context.stroke();

			context.beginPath();
			context.strokeStyle = '#124500';
			let x;
			if (curFighter == 0) {
				x = canvas.width * 0.2;
			} else if (curFighter == 1) {
				x = canvas.width * 0.8;
			}
			line(x, canvas.height * 0.45, x, canvas.height * 0.7);
			context.stroke();

			context.strokeStyle = '#434343';
			let curAnimation = getCurAnimation();
			if (curAnimation.length > 0)
				drawMatrix(curAnimation[curAnimation.length - 1]);

			context.strokeStyle = '#ababab';
			drawMatrix(tempDraw);
		} else {
			const x = getBalanceX();
			//context.strokeStyle = '#FF0000';
			context.strokeWidth = 5;
			line(x, 2, x, canvas.height * 0.05);
			context.stroke();

			context.strokeStyle = '#CDCDCD';
			drawMatrix(fighters[0].curFrame);
			drawMatrix(fighters[1].curFrame);
		}

		if(menuMode == 'Tutorial')
			drawTutText();
	}
}



function drawScreen() {
	draw();

	requestAnimationFrame(drawScreen);
}

function fight() {
	balance = dice / 2 + 0.5;
	setMode('FIGHT');
}

function finishAnimation() {
	nextFrame();

	drawState++;
	if (drawState == drawStates.length) {
		drawState = 0;
		curFighter++;
		if (curFighter == fighters.length) {
			curFighter = 0;
			setMode('FIGHT');
		}
		if (curFighter == 1) {
			texts[0] = "Zeichne deinen zweiten Charakter";
		}
	}
	if (mode == 'DRAW')
		texts[1] = 'Mode: ' + drawStates[drawState];


	draw();
}

function getBalanceX() {
	return canvas.width * 0.75 + (balance - 0.5 - dice) * canvas.width / 2 / dice;
}

function getCurAnimation() {
	if (drawStates[drawState] == 'stehend') {
		return fighters[curFighter].animations.stand;
	} else if (drawStates[drawState] == 'wird verletzt') {
		return fighters[curFighter].animations.getHurt;
	} else if (drawStates[drawState] == 'verletzt Gegner') {
		return fighters[curFighter].animations.hurt;
	} else if (drawStates[drawState] == 'stirbt') {
		return fighters[curFighter].animations.die;
	} else if (drawStates[drawState] == 'toetet') {
		return fighters[curFighter].animations.finish;
	}
}

function nextFrame() {

	if (drawStates[drawState] == 'stehend') {
		fighters[curFighter].animations.stand.push(tempDraw.splice(0, tempDraw.length));
	} else if (drawStates[drawState] == 'wird verletzt') {
		fighters[curFighter].animations.getHurt.push(tempDraw.splice(0, tempDraw.length));
	} else if (drawStates[drawState] == 'verletzt Gegner') {
		fighters[curFighter].animations.hurt.push(tempDraw.splice(0, tempDraw.length));
	} else if (drawStates[drawState] == 'stirbt') {
		fighters[curFighter].animations.die.push(tempDraw.splice(0, tempDraw.length));
	} else if (drawStates[drawState] == 'toetet') {
		fighters[curFighter].animations.finish.push(tempDraw.splice(0, tempDraw.length));
	}


	draw();
}


let waitedLastRound = false;
const hitmin = 2;
const killmin = 7;
const dice = killmin * 2 + 2;
let balance = dice / 2 + 0.5;

console.log("dice: " + dice);

function nextRound() {
	if (!waitedLastRound) {
		fighters[0].stand();
		fighters[1].stand();
		texts[1] = '';
		waitedLastRound = true;
	} else {
		waitedLastRound = false;
		const rnd = (betterRandom() * dice | 0) + 1;
		const hitpoint = balance - rnd;
		if (hitpoint <= -hitmin && hitpoint > -killmin) {
			fighters[0].hurt();
			fighters[1].getHurt();
			balance--;
			texts[1] = 'Kaempfer 1 schlaegt Kaempfer 2';
		} else if (hitpoint >= hitmin && hitpoint < killmin) {
			fighters[0].getHurt();
			fighters[1].hurt();
			texts[1] = 'Kaempfer 2 schlaegt Kaempfer 1';
			balance++;
		} else if (hitpoint <= -killmin) {
			fighters[0].finish();
			fighters[1].die();
			texts[1] = 'Kaempfer 1 toetet Kaempfer 2';
			setMode('GAMEOVER');
		} else if (hitpoint >= killmin) {
			fighters[0].die();
			fighters[1].finish();
			texts[1] = 'Kaempfer 2 toetet Kaempfer 1';
			setMode('GAMEOVER');
		} else {
			fighters[0].stand();
			fighters[1].stand();
			texts[1] = '';
			waitedLastRound = true;
		}
		console.log("hitpoint: " + hitpoint, "= balance: " + balance, "- rnd:" + rnd);
	}
}

function setMode(m) {
	mode = m;
	if (mode == "DRAW") {
		fighters[0] = new Fighter;
		fighters[1] = new Fighter;
		curFighter = 0;

		balance = dice / 2 + 0.5;

		drawState = 0;
		mode = 'DRAW';

		texts[0] = "Zeichne deinen ersten Charakter";
		texts[1] = "Mode: stehend";
		texts[2] = "Gruener Kasten: zu zeichnender Kaempfer; Roter Kasten: Feind";

		frameButtons.hidden = false;
		againButtons.hidden = true;
		jsonToggler.hidden = false;
	} else if (mode == 'FIGHT') {
		mode = 'FIGHT';
		console.warn('New fight')
		texts[0] = "Let's fight!";
		texts[1] = "";
		texts[2] = "";
		frameButtons.hidden = true;
		againButtons.hidden = false;
	}
}

function start() {
	menuMode = 'normal';
	setMode('DRAW');
}

function startMainMenu() {
	menuMode = 'mainMenu';
	animationAlpha = 1;
}

function startTitleScreen() {
	menuMode = 'titleScreen';
	klickedWas = false;
	klickedStart = false;
	klickedTut = false;
	animationAlpha = 2;
	tutStelle = 0;
	mode = 'DRAW';
}

function startTut(){
	menuMode = 'Tutorial';
	animationAlpha = 1;
	setMode('DRAW');
}

function update() {
	if (mode == 'FIGHT') {
		context.strokeStyle = '#ababab'
		if (!fighters[0].isPlayingAnimation && !fighters[1].isPlayingAnimation) {
			nextRound();
		}


	}

	//requestAnimationFrame(update);
	setTimeout(function() {
		if (menuMode == 'Tutorial' || menuMode == 'normal') {
			fighters[0].playAnimation();
			fighters[1].playAnimation();
		}
		update();
	}, frametime);
}