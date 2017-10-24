function getMousePos(canvas, evt) {
	const bounding = canvas.getBoundingClientRect();
	return {
		// x: (evt.clientX - bounding.left) / document.documentElement.clientWidth * docWidth,
		// y: (evt.clientY - bounding.top) / document.documentElement.clientHeight * docHeight
		x: evt.clientX - bounding.left,
		y: evt.clientY - bounding.top
	};
}

canvas.addEventListener('mousemove', function(evt) {
	const mousePos = getMousePos(canvas, evt);

	if ((menuMode == 'Tutorial' || menuMode == 'normal') && mode == 'DRAW' && mouseDown && tempDraw.length > 0) {
		context.fillStyle = '#dedede';
		circle(mousePos.x, mousePos.y, 1);
		tempDraw[tempDraw.length - 1].push([mousePos.x, mousePos.y]);
		draw();
	}
}, false);

document.addEventListener('mousedown', function(evt) {
	mouseDown = true;

	const mousePos = getMousePos(canvas, evt);
	if (mousePos.x >= 0 && mousePos.x <= canvas.width && mousePos.y >= 0 && mousePos.y <= canvas.height) {
		tempDraw.push([]);
	}
});

document.addEventListener('mouseup', function(evt) {
	mouseDown = false;
	const mousePos = getMousePos(canvas, evt);
	checkMenuClick(mousePos.x, mousePos.y);
	//draw();
});

function checkMenuClick(x, y){
	if(menuMode == 'mainMenu' && x > canvas.width / 2 - canvas.width / 6 && x < canvas.width / 2 + canvas.width / 6 && y > canvas.height * 0.2 && y < canvas.height * 0.35){
		klickedWas = true;
	}else if(menuMode == 'was'){
		klickedWas = false;
	}else if(menuMode == 'mainMenu' && x > canvas.width / 2 - canvas.width / 6 && x < canvas.width / 2 + canvas.width / 6 && y > canvas.height * 0.35 && y < canvas.height * 0.5){
		klickedTut = true;
	}else if(menuMode == 'mainMenu' && x > canvas.width / 2 - canvas.width / 6 && x < canvas.width / 2 + canvas.width / 6 && y > canvas.height * 0.5 && y < canvas.height * 0.65){
		klickedStart = true;
	}
	// canvas.height * 0.45,
}


function getTouchPos(canvas, evt) {
	const bounding = canvas.getBoundingClientRect();
	return {
		// x: (evt.clientX - bounding.left) / document.documentElement.clientWidth * docWidth,
		// y: (evt.clientY - bounding.top) / document.documentElement.clientHeight * docHeight
		x: evt.changedTouches[0].pageX - bounding.left,
		y: evt.changedTouches[0].pageY - bounding.top
	};
}

canvas.addEventListener('touchmove', function(evt) {
	const TouchPos = getTouchPos(canvas, evt);

	if (mode == 'DRAW' && touchdown && tempDraw.length > 0) {
		context.fillStyle = '#dedede';
		circle(TouchPos.x, TouchPos.y, 1);
		tempDraw[tempDraw.length - 1].push([TouchPos.x, TouchPos.y]);
		draw();
	}
}, false);

let touchdown = false;
canvas.addEventListener('touchstart', function(evt) {
	touchdown = true;
	tempDraw.push([]);
}, false);

canvas.addEventListener('touchend', function(evt) {
	touchdown = false;
	const touchPos = getTouchPos(canvas, evt);
	checkMenuClick(touchPos.x, touchPos.y);
}, false);




document.addEventListener('keydown', event => {
	switch (event.keyCode) {
		case 27:
			startTitleScreen();
			break;
		default:
			//console.log(event.keyCode);
			break;
	}
});