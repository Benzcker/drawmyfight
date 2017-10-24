function background(c) {
	context.fillStyle = c;
	context.fillRect(0, 0, canvas.width, canvas.height);
}

function drawMatrix(matrix) {
	context.lineWidth = 2;
	context.beginPath();
	matrix.forEach(part => {
		part.forEach((coord, index) => {
			if (index < part.length - 2) {
				context.moveTo(coord[0], coord[1]);
				context.lineTo(part[index + 1][0], part[index + 1][1]);
			}
		});
	});
	context.stroke();
	context.closePath();
}

function drawTexts() {
	context.fillStyle = '#787878';
	rect(0, canvas.height * 0.8, canvas.width, canvas.height * 0.2);
	texts.forEach((text, index) => {
		print(text, index);
	});
}

function circle(x, y, r) {
	context.beginPath();
	context.arc(x, y, r, 0, 2 * Math.PI);
	context.fill();
}

function print(txt, line) {
	context.font = docHeight / 25 + 'px Arial';
	context.fillStyle = '#000';

	let y = canvas.height * 0.85 + canvas.height * 0.05 * line;
	context.fillText(txt, canvas.width / 2, y);
}

function text(txt, x, y, size, color, align) {
	if (align == 'CENTER') {
		context.textAlign = "center";
	} else if (align == 'LEFT') {
		context.textAlign = "left";
	} else if (align == 'RIGHT') {
		context.textAlign = "right";
	}
	context.font = size + 'px Arial';
	context.fillStyle = color;

	context.fillText(txt, x, y);
}

function rect(x, y, w, h) {
	context.fillRect(x, y, w, h);
}

function line(x1, y1, x2, y2){
	context.moveTo(x1, y1);
	context.lineTo(x2, y2);	
}



function drawMenuText() {
	text('Was ist das hier?', canvas.width / 2, canvas.height * 0.3, canvas.height * 0.1, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
	text('Tutorial (unfinished!)', canvas.width / 2, canvas.height * 0.45, canvas.height * 0.1, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
	text('Start', canvas.width / 2, canvas.height * 0.6, canvas.height * 0.1, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
}

function drawDescription() {
	text('Auf dieser Webseite kannst du', canvas.width / 2, canvas.height * 0.3, canvas.height * 0.05, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
	text('deine eigenen Strichmaennchen zeichnen', canvas.width / 2, canvas.height * 0.37, canvas.height * 0.05, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
	text('und diese dann gegeneinander', canvas.width / 2, canvas.height * 0.44, canvas.height * 0.05, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
	text('kaempfen lassen', canvas.width / 2, canvas.height * 0.51, canvas.height * 0.05, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
	text('Wie das geht?', canvas.width / 2, canvas.height * 0.65, canvas.height * 0.05, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
	text('Sieh dir doch einfach das Tutorial an!', canvas.width / 2, canvas.height * 0.72, canvas.height * 0.05, 'rgba(240, 230, 230, ' + animationAlpha + ')', 'CENTER');
}

function drawTutText() {
	tutTexts[tutStelle].forEach(text => {
		text.draw('rgba(240, 230, 230, ' + animationAlpha + ')');
	});
}





function betterRandom(){
	return Math.sqrt(Math.random() * Math.random());
}