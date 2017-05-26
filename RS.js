var Point = function(x, y) {
  this.x = x || 0;
  this.y = y || 0;
  return this;
};

var Cell = function(a, b, c) {
  this.a = a;
  this.b = b;
  this.c = c;
  this.children = [];
  cellCount++; //global id
};

Cell.prototype = {
  split: function(ruleId) {
    ruleId = ruleId || 0;

    if (this.children.length == 0) {
      var a = this.a;
      var b = this.b;
      var c = this.c;

      switch (ruleId) {
        case 0:
          this.rule0(a, b, c);
          break;
        case 1:
          this.rule1(a, b, c);
          break;
        case 2:
          this.rule2(a, b, c);
          break;
        case 3:
          this.rule3(a, b, c);
          break;
      }
    } else {
      this.children.forEach(function(c) {
        if (area(c.a, c.b, c.c) < 20) return;
        var rule = parseInt(PRNG.random() * cellCount) % 4;
        c.split(rule);
      });
    }
  },

  rule0: function(a, b, c) {
    var a0 = getPointAt(0.5, a, b);
    var b0 = getPointAt(0.5, b, c);
    var c0 = getPointAt(0.5, c, a);

    this.children.push(
      //central cell
      new Cell(a0, b0, c0),
      //outer cells
      new Cell(a, a0, c0),
      new Cell(b, b0, a0),
      new Cell(c, c0, b0)
    );
  }

 