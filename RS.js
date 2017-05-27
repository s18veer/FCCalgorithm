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
  },

  rule1: function(a, b, c) {
    var barycenter = new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);
    var a0 = getPointAt(0.5, a, b);
    var b0 = getPointAt(0.5, b, c);
    var c0 = getPointAt(0.5, c, a);

    this.children.push(
      new Cell(a, barycenter, a0),
      new Cell(a0, barycenter, b),
      new Cell(b, barycenter, b0),
      new Cell(b0, barycenter, c),
      new Cell(c, barycenter, c0),
      new Cell(c0, barycenter, a)
    );
  },

  rule2: function(a, b, c) {
    var t0 = getPointAt(0.5, a, b);
    var t1 = getPointAt(0.5, b, c);
    var t2 = getPointAt(0.5, c, a);

    var a0 = getPointAt(0.5, t2, t0);
    var b0 = getPointAt(0.5, t0, t1);
    var c0 = getPointAt(0.5, t1, t2);

    this.children.push(
      //central cell
      new Cell(a0, b0, c0),
      //outer cells
      new Cell(a, b, a0),
      new Cell(a0, b, b0),
      new Cell(b, c, b0),
      new Cell(b0, c, c0),
      new Cell(c, a, c0),
      new Cell(c0, a, a0)
    );
  },

  rule3: function(a, b, c) {
    var barycenter = new Point((a.x + b.x + c.x) / 3, (a.y + b.y + c.y) / 3);

    var bp0 = project(barycenter, a, b);
    var bp1 = project(barycenter, b, c);
    var bp2 = project(barycenter, c, a);

    var bc0 = getPointAt(0.5, barycenter, bp0);
    var bc1 = getPointAt(0.5, barycenter, bp1);
    var bc2 = getPointAt(0.5, barycenter, bp2);

    var a0 = getPointAt(0.5, a, bp0);
    var a1 = getPointAt(0.5, bp0, b);

    var b0 = getPointAt(0.5, b, bp1);
    var b1 = getPointAt(0.5, bp1, c);

    var c0 = getPointAt(0.5, c, bp2);
    var c1 = getPointAt(0.5, bp2, a);

    this.children.push(
      //center
      new Cell(bc0, bc1, bc2),
      //central cells
      new Cell(a0, bc0, c1),
      new Cell(c1, bc0, bc2),
      new Cell(b0, bc1, a1),
      new Cell(a1, bc1, bc0),
      new Cell(c0, bc2, b1),
      new Cell(b1, bc2, bc1),
      //outer cells
      new Cell(a, a0, c1),
      new Cell(a0, bp0, bc0),
      new Cell(bp0, a1, bc0),
      new Cell(a1, b, b0),
      new Cell(b0, bp1, bc1),
      new Cell(bp1, b1, bc1),
      new Cell(b1, c, c0),
      new Cell(c0, bp2, bc2),
      new Cell(bp2, c1, bc2)
    );
  },

  render: function(ctx) {
    if (this.children.length == 0) {
      ctx.moveTo(this.a.x, this.a.y);
      ctx.lineTo(this.b.x, this.b.y);
      ctx.lineTo(this.c.x, this.c.y);
      ctx.lineTo(this.a.x, this.a.y);
    } else {
      this.children.forEach(function(c) {
        c.render(ctx);
      });
    }
  }
};

