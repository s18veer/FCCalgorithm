'use strict';

var count = 30;
var extra = 12;
var timeSpan = 90;

var canvas = void 0;
var ui = {};

function setup() {
	ui.easeName = createSelect();
	Object.keys(eases).forEach(function (n) {
		return ui.easeName.option(n[0].toUpperCase() + n.slice(1), n);
	});
	ui.easeName.selected('quartic');

	ui.type = createSelect();
	ui.type.option('in');
	ui.type.option('out');
	ui.type.option('both');
	ui.type.selected('both');

	canvas = createCanvas(windowWidth, windowHeight - 20);
	colorMode(HSB);
}

function draw() {
	background(0);

	noStroke();
	fill(255);

	var size = min(width, height);

	translate(width / 2 - size / 2, size / count / 2);

	for (var m = 0; m < extra; m++) {
		fill(map(m / extra, 0, 1, 360, -360 / extra), 100, 100);
		for (var i = 0; i < count; i++) {
			var time = (frameCount + i + m * 4) % timeSpan;
			var easeFunc = eases[ui.easeName.value()][ui.type.value()];
			var ease = constrain(easeFunc(time, 0, 1, timeSpan), 0, 1);

			ellipse(ease * size, i / count * size, 4);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth, windowHeight - 20);
}
