		var canvas  = document.getElementById('canvas');
    		ctx = canvas.getContext('2d'),
		    requestAnimationFrame = window.requestAnimationFrame || 
		                        window.mozRequestAnimationFrame || 
		                        window.webkitRequestAnimationFrame || 
		                        window.msRequestAnimationFrame;

		var WIDTH = document.documentElement.clientWidth;
		var HEIGHT = document.documentElement.clientHeight;                      

		canvas.setAttribute("width", WIDTH);
		canvas.setAttribute("height", HEIGHT);

		var 
			shapes = [],
			pos = [],
			it = 0,
			img = new Image(),
			img_w = Math.floor(300*.6),
			img_h = Math.floor(411*.6),
			size_amp = 3
		;

		img.src = 'data:image/png;;
		
		img.onload = function(){
		  ctx.drawImage(img, 0, 0, img_w, img_h);
		  walkPixels(img_w, img_h);
		}

		function walkPixels(area_w, area_h) {
			for (var x = 0; x <= area_w; x++) {
				for (var y = 0; y <= area_h; y++) {
					var p = ctx.getImageData(x, y, 1, 1).data;
					if (p[0] == 0 && p[3] >= 255) store(x, y);
					if (x == area_w && y == area_h) {
						init();
						return;
					}
				}
			}
		}
		
		function store(x, y) {
			pos[pos.length] = [x, y];
		}

		function init(){
			ctx.fillStyle = "rgba(0,0,0,1)";
			for (var i in pos){
				shapes[shapes.length] = new Shape(i, pos[i][0], pos[i][1]);
			}
			animate();
		}

		function animate() {
		    ctx.clearRect(0, 0, WIDTH, HEIGHT);
		    for (var i in shapes){
		    	shapes[i].pulse();
		    }
		    requestAnimationFrame(animate);
		}

		function Shape(id, x, y){
			this.id = id;
			this.randomStartSize = Math.floor(Math.random()*2);
			this.x = x + WIDTH/2/size_amp/2;
			this.y = y;
			this.it = 0;
			this.pulseSpeed = Math.floor(Math.random()*10)/200;
			this.pulseIntensity = Math.floor(Math.random()*7);

			Shape.prototype.pulse = function() {
				this.it += this.pulseSpeed;
				this.size = this.randomStartSize+(Math.sin(this.it)*this.pulseIntensity);
				this.size = Math.abs(this.size)+1;
				this.y = this.y - Math.sin(this.it)/50;
				this.draw();
			}

			Shape.prototype.draw = function() {
				ctx.beginPath();
				ctx.arc(this.x*size_amp, this.y*size_amp, this.size, 0, 2 * Math.PI, false);
				ctx.fill();
				ctx.closePath();
			}
		}

		
