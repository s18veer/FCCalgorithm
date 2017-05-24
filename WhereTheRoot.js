class Line {
	constructor(x, y, a, n, w) {
		this.x = x;
		this.y = y;
		this.w = w;
		this.n = n;
		this.ang = a;
		this.angVel = 0;
	}
	anim() {
		this.x += 3 * Math.cos(this.ang);
		this.y += 3 * Math.sin(this.ang);
		this.angVel += 0.2 * (Math.random() - Math.random());
		this.angVel *= 0.7;
		this.ang += this.angVel;
		let dx = this.x - size * 0.5;
		let dy = this.y - size * 0.5;
		this.x -= dx / (size * 0.25);
		this.y -= dy / (size * 0.25);
		if (this.w > 1) {
			ict.beginPath();
			ict.fillStyle = "#000";
			ict.arc(this.x, this.y, this.w + 0.5, 0, 2 * Math.PI);
			ict.fill();
		}
		ict.beginPath();
		ict.fillStyle = "#fff";
		ict.arc(this.x, this.y, this.w, 0, 2 * Math.PI);
		ict.fill();
		if (this.n > 0) {
			this.n--;
			if (this.n <= 1) {
				lines.delete(this);
			}
		}
	}
}
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const width = canvas.width = canvas.offsetWidth * 1;
const height = canvas.height = canvas.offsetHeight * 1;
const calc = document.createElement('canvas');
const ict = calc.getContext('2d');
const size = 2 * Math.max(width, height);
calc.width = size;
calc.height = size;
ict.lineCap = "round";
let line = new Line(size / 2, size / 2, Math.random() * 2 * Math.PI, -1, 14);
const lines = new Set();
const pos = [];
for (let i = 0; i < 16; i++) pos.push([0,0]);
function run() {
	requestAnimationFrame(run);
	ctx.clearRect(0, 0, width, height);
	line.anim();
	for (let l of lines) l.anim();
	const r = Math.random() > 0.99;
	const len = r ? 500 : 10 + Math.random() * 400;
	const wid = r ? 5 : 0.5;
	lines.add(new Line(line.x, line.y, line.ang, len, wid));
	const [x, y] = pos.shift();
	pos.push([line.x, line.y]);
	ctx.drawImage(calc, width * 0.5 - x, height * 0.5 - y);
}
run();
