class Text{
	constructor(text, x, y, size, align) {
		this.text = text;
		this.x = x;
		this.y = y;
		this.size = size;
		this.align = align;
	}

	draw(color) {
		text(this.text, this.x, this.y, this.size, color, this.align);
	}
}


let tutStelle = 0;
const tutTexts = [
	[
	new Text('Wir zeichnen jetzt zwei Figuren, ', canvas.width * 0.05, canvas.height * 0.3, canvas.height * 0.05, 'LEFT'),
	new Text('die im Anschluss gegeneinander kaempfen werden.', canvas.width * 0.05, canvas.height * 0.37, canvas.height * 0.05, 'LEFT')
	],
	[new Text('Dabei muessen wir beide in unterschiedlichen Posen zeichnen!', canvas.width * 0.06, canvas.height * 0.2, canvas.height * 0.05, 'LEFT')],
	[new Text('Fangen wir mit der linken Figur an.', canvas.width * 0.5, canvas.height * 0.7, canvas.height * 0.05, 'CENTER')],
	[new Text('Zeichne sie so, wie sie aussieht, wenn sie einfach nur da steht.', canvas.width * 0.05, canvas.height * 0.055, canvas.height * 0.05, 'LEFT'),
		new Text('Der grüne Kasten hilft dir zur Orientierung, wo ungefaehr der Koerper sein sollte.', canvas.width * 0.2, canvas.height * 0.25, canvas.height * 0.05, 'LEFT'),
		new Text('Klicke anschließend auf den \'Animation beenden\'-Button', canvas.width * 0.7, canvas.height * 0.4, canvas.height * 0.05, 'RIGHT'),
	]
	[new Text('Sehr gut! Zeichne sie nun, wie sie aussieht, wenn sie verletzt wird.', canvas.width * 0.05, canvas.height * 0.052, canvas.height * 0.05, 'LEFT'),
		new Text('Klicke dann auf den \'Naechstes Bild in Animation\'-Button', canvas.width * 0.7, canvas.height * 0.4, canvas.height * 0.05, 'RIGHT')
	],
	[new Text('Nun kannst du ein weiteres Bild zeichnen.'),
		new Text('Dieses und das Vorherige werden hinterheinander abgespielt und bilden somit eine Animation.'),
		new Text('Du kannst so viele Bilder pro Animation zeichnen, wie du willst.'),
		new Text('Aber bedenke, die Animation wird nur mit 5 Bildern die Sekunde abgespielt, zeichne sie also nicht zu langsam!'),
		new Text('Du gehst zur nächsten Animation, indem du den \'Animation beenden\'-Button erneut drückst.')
	],
	[new Text('Hier zeichnest du sie, wie sie den Gegner verletzt.'),
		new Text('Du siehst, wo deine Figur hin schlagen muss, an dem roten Kaestchen.'),
		new Text('Wahrscheinlich muss sie das grüne Kaestchen dafür verlassen.'),
		new Text('Aber bedenke, du musst jetzt nicht den Gegner zeichnen, nur deine Figur!')
	],
	[new Text('Hier zeichnest du sie, wie sie stirbt.')],
	[new Text('Dies ist die letzte Animation fuer diese Figur.'),
		new Text('Hier zeichnest du, wie sie den Gegner tötet.')
	],
	[new Text('Nun das ganze noch einmal für die zweite Figur.'),
		new Text('Probiere andere Posen, Bewegungen, usw aus!'),
		new Text('Denke daran: der Charakter, den du jetzt zeichnen sollst, steht im grünen Feld, der Feind im roten.'),
		new Text('So behälst du immer in Erinnerung, wo du nun zeichnen musst.')
	]
];