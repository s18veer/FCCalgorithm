var RENDERER = {
	DELTA_SATURATION : 0.05,
	DELTA_LUMINANCE : 0.005,
	
	init : function(){
		this.setParameters();
		this.reconstructMethod();
		this.bindEvent();
		this.render();
	},
	setParameters : function(){
		this.$container = $('#jsi-tree-container');
		this.width = this.$container.width();
		this.height = this.$container.height();
		this.context = $('<canvas />').attr({width : this.width, height : this.height}).appendTo(this.$container).get(0).getContext('2d');
		this.node = TREE.init(this);
		this.radius = Math.sqrt(Math.pow(this.width / 2, 2) + Math.pow(this.height / 2, 2));
		this.rendered = false;
		this.isVivid = false;
		this.saturationRate = 0;
		this.luminanceRate = 0;
	},
	getRandomValue : function(min, max){
		return min + (max - min) * Math.random();
	},
	reconstructMethod : function(){
		this.render = this.render.bind(this);
	},
	bindEvent : function(){
		this.$container.on('mouseout', this.changeSaturation.bind(this, false));
		this.$container.on('mousemove', this.changeSaturation.bind(this, true));
	},
	changeSaturation : function(isVivid){
		this.isVivid = isVivid;
	},
	controlView : function(){
		if(this.isVivid){
			if(this.saturationRate < 1){
				this.saturationRate = Math.min(this.saturationRate + this.DELTA_SATURATION, 1);
			}
		}else{
			if(this.saturationRate > 0){
				this.saturationRate = Math.max(this.saturationRate - this.DELTA_SATURATION, 0);
			}
		}
		if(this.luminanceRate < 1){
			this.luminanceRate = Math.min(this.luminanceRate + this.DELTA_LUMINANCE, 1);
		}
	},
	render : function(){
		requestAnimationFrame(this.render);
		
		var gradient = this.context.createRadialGradient(this.width / 2, this.height / 2, 0, this.width / 2, this.height / 2, this.radius),
			saturation = (60 * this.saturationRate) | 0;
		gradient.addColorStop(0, 'hsl(180, ' + saturation  + '%, ' + ((30 + 60 * this.luminanceRate) | 0) + '%)');
		gradient.addColorStop(0.3, 'hsl(200, ' + saturation + '%, ' + ((20 + 20 * this.luminanceRate) | 0) + '%)');
		gradient.addColorStop(1, 'hsl(200, ' + saturation + '%, ' + ((10 * this.luminanceRate) | 0) + '%)');
		this.context.fillStyle = gradient;
		this.context.fillRect(0, 0, this.width, this.height);
		this.context.save();
		this.node.renderLeaf(this.context, this.rendered, false, this.saturationRate);
		this.rendered = this.node.renderBranch(this.context, this.saturationRate);
		this.node.renderLeaf(this.context, this.rendered, true, this.saturationRate);
		this.context.restore();
		this.controlView();
	}
};
var TREE = {
	TRUNK_RATE : 0.8,
	BRANCH_RADIAN : Math.PI / 5,
	BRANCH_RATE : 0.6,
	BRANCH_LEVEL : 6,
	
	init : function(renderer){
		this.renderer = renderer;
		this.radius = this.renderer.height / 70;
		return this.drawTree(this.renderer.width / 2, this.renderer.height * 9 / 10, Math.PI / 2, this.renderer.height / 4, this.renderer.height / 60, 0);
	},
	drawTree : function(x, y, radian, length, width, level){
		if (level > this.BRANCH_LEVEL || length < this.renderer.height / 40) {
			return;
		}
		var sin = length * Math.sin(radian),
			cos = length * Math.cos(radian),
			node = new NODE(this.renderer, x, y, x + cos, y - sin, width, this.radius, level);
			
		node.nodes.push(this.drawTree(x + cos * this.TRUNK_RATE, y - sin * this.TRUNK_RATE, radian, length * this.TRUNK_RATE, width * this.TRUNK_RATE, level + 1));
		
		for(var i = -1; i <= 1; i += 2){
			node.nodes.push(this.drawTree(x + cos * this.BRANCH_RATE, y - sin * this.BRANCH_RATE, radian + this.BRANCH_RADIAN * i, length * this.BRANCH_RATE, width * this.BRANCH_RATE, level + 1));
		}
		for(var i = node.nodes.length - 1; i >= 0; i--){
			if(!node.nodes[i]){
				node.nodes.splice(i, 1);
			}
		}
		return node;
	}
};
var NODE = function(renderer, x0, y0, x1, y1, width, radius, level){
	this.renderer = renderer;
	this.width = width;
	this.level = level;
	this.init(x0, y0, x1, y1, radius);
};
NODE.prototype = {
	UNIT_LENGTH : 3,
	THRESHOLD_LEVEL : 4,
	
	init : function(x0, y0, x1, y1, radius){
		this.nodes = [];
		this.dx = (x0 + x1) / 2;
		this.dy = (y0 + y1) / 2;
		this.length = Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
		this.theta = Math.atan2(x1 - x0, y0 - y1);
		this.maxCount = Math.ceil(this.length / this.UNIT_LENGTH);
		this.count = this.maxCount;
		this.leaves = [];
		
		if(this.level >= this.THRESHOLD_LEVEL){
			for(var i = -1; i <= 1; i += 2){
				this.leaves.push(new LEAF(this.renderer, this.dx, this.dy, (radius + this.width / 2) * i, -this.length / 2, radius, this.theta, -Math.PI / 10 * i));
			}
		}
	},
	renderBranch : function(context, saturationRate){
		context.save();
		context.translate(this.dx, this.dy);
		context.rotate(this.theta);
		context.strokeStyle = 'hsl(' + (40 + 20 * this.level) + ', ' + saturationRate * 30 + '%, ' + (10 + 10 * saturationRate) + '%)';
		context.lineWidth = this.width;
		context.beginPath();
		context.moveTo(0, this.length / 2);
		context.lineTo(0, this.length / 2 - this.length * (this.maxCount - this.count) / this.maxCount);
		context.stroke();
		context.restore();
		
		if(this.count > 0){
			this.count--;
			return false;
		}else{
			var rendered = true;
			
			for(var i = 0, length = this.nodes.length; i < length; i++){
				if(!this.nodes[i].renderBranch(context, saturationRate)){
					rendered = false;
				}
			}
			return rendered;
		}
	},
	renderLeaf : function(context, isLeaf, isForward, saturationRate){
		if(!isLeaf){
			return;
		}
		for(var i = 0, length = this.leaves.length; i < length; i++){
			this.leaves[i].render(context, isForward, saturationRate);
		}
		for(var i = 0, length = this.nodes.length; i < length; i++){
			this.nodes[i].renderLeaf(context, isLeaf, isForward, saturationRate);
		}
	}
};
var LEAF = function(renderer, x0, y0, x, y, radius, theta0, theta){
	this.renderer = renderer;
	this.x0 = x0;
	this.y0 = y0;
	this.x = x;
	this.y = y;
	this.radius = radius;
	this.theta0 = theta0;
	this.theta = theta;
	this.init(false);
};
