var Universe;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Universe = (function() {
  __extends(Universe, GraphicsScene);
  function Universe(ctx, width, height, fmps) {
    if (fmps == null) {
      fmps = 25;
    }
    Universe.__super__.constructor.call(this, ctx, width, height, fmps);
    this.ship = new SpaceShip(this.center, 20, 'kspaceduel.png');
    this.clear();
  }
  Universe.prototype.clear = function() {
    Universe.__super__.clear.apply(this, arguments);
    this.planets = [];
    this.dots = [];
    this.bgScaleSpeed = 0.75;
    return this;
  };
  Universe.prototype.addPlanet = function(planet) {
    this.planets.push(planet);
    return this.addItem(planet);
  };
  Universe.prototype.addDot = function(dot) {
    this.dots.push(dot);
    return this.addItem(dot);
  };
  Universe.prototype.setLevel = function(level) {
    this.stop();
    this.clear();
    level.load(__bind(function() {
      var d, p, _i, _j, _len, _len2, _ref, _ref2;
      _ref = level.planets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        this.addPlanet(p);
      }
      _ref2 = level.dots;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        d = _ref2[_j];
        this.addDot(d);
      }
      this.addItem(this.ship = level.ship);
      return this.start();
    }, this));
    return this;
  };
  Universe.prototype.move = function() {
    var accel, d, dir, dist, dot, g, p, _i, _j, _len, _len2, _ref, _ref2;
    Dot.oscillate();
    if (this.ship.alive) {
      accel = v2();
      _ref = this.planets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        d = p.pos.sub(this.ship.pos);
        dist = d.abs();
        if (dist < p.radius) {
          this.ship.explode();
          accel = v2();
          break;
        }
        g = p.mass * this.ship.mass / Math.sqr(dist);
        dir = d.div(dist);
        accel = accel.add(dir.mul(g));
      }
      this.ship.accelerate(accel);
      _ref2 = this.dots;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        dot = _ref2[_j];
        d = dot.pos.sub(this.ship.pos);
        if (d.abs() < Dot.radius + this.ship.radius) {
          this.hitDot(dot);
          break;
        }
      }
    }
    return Universe.__super__.move.apply(this, arguments);
  };
  Universe.prototype.hitDot = function(dot) {
    dot.collect();
    this.dots.splice(this.dots.indexOf(dot), 1);
    return this.removeItem(dot);
  };
  Universe.prototype.render = function() {
    var offset;
    this.ctx.save();
    offset = this.center.sub(this.ship.pos);
    this.ctx.translate(offset.x, offset.y);
    this.renderBackground(offset);
    Universe.__super__.render.apply(this, arguments);
    return this.ctx.restore();
  };
  Universe.prototype.renderBackground = function(offset) {
    var d, gridSize, i, iMax, maxGridX, maxGridY, minGridX, minGridY, rnd, size, x, y;
    this.ctx.save();
    d = offset.mul(this.bgScaleSpeed - 1);
    this.ctx.translate(d.x, d.y);
    this.ctx.fillStyle = "#ccc";
    gridSize = 100;
    rnd = new Random;
    minGridX = Math.floor(-offset.x * this.bgScaleSpeed / gridSize);
    minGridY = Math.floor(-offset.y * this.bgScaleSpeed / gridSize);
    maxGridX = minGridX + Math.floor(this.width / gridSize) + 1;
    maxGridY = minGridY + Math.floor(this.height / gridSize) + 1;
    for (x = minGridX; minGridX <= maxGridX ? x <= maxGridX : x >= maxGridX; minGridX <= maxGridX ? x++ : x--) {
      for (y = minGridY; minGridY <= maxGridY ? y <= maxGridY : y >= maxGridY; minGridY <= maxGridY ? y++ : y--) {
        rnd.seed((x + 1234) * (y - 463));
        iMax = rnd.uInt(7);
        for (i = 0; 0 <= iMax ? i <= iMax : i >= iMax; 0 <= iMax ? i++ : i--) {
          size = rnd.floatRange(1, 2);
          this.ctx.fillRect(rnd.uFloat(gridSize) + x * gridSize, rnd.uFloat(gridSize) + y * gridSize, size, size);
        }
      }
    }
    return this.ctx.restore();
  };
  return Universe;
})();