var Universe;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Universe = (function() {
  __extends(Universe, GraphicsScene);
  function Universe(ctx, width, height, fmps) {
    if (fmps == null) {
      fmps = 25;
    }
    Universe.__super__.constructor.call(this, ctx, width, height, fmps);
    this.planets = [];
    this.addPlanet(new Planet(this.center.add(v2(-200, 0)), 40, new Color(1, 1, 1, 1)));
    this.addPlanet(new Planet(this.center.add(v2(200, 0)), 39, new Color(1, .5, .5, 1)));
    this.addPlanet(new Planet(this.center.add(v2(0, -200)), 40, new Color(1, 1, 1, 1)));
    this.addPlanet(new Planet(this.center.add(v2(150, 200)), 40, new Color(1, 1, 1, 1)));
    this.addPlanet(new Planet(this.center.add(v2(-81, 260)), 10, new Color(1, 1, 1, 1)));
    this.ship = new SpaceShip(this.center, 20, '/images/kspaceduel.png');
    this.addItem(this.ship);
  }
  Universe.prototype.addPlanet = function(planet) {
    this.planets.push(planet);
    return this.addItem(planet);
  };
  Universe.prototype.move = function() {
    var accel, d, dir, dist, g, p, _i, _len, _ref;
    if (this.ship.alive) {
      accel = v2();
      _ref = this.planets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        d = p.pos.sub(this.ship.pos);
        dist = d.length();
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
    }
    return Universe.__super__.move.apply(this, arguments);
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
    var gridSize, i, maxGridX, maxGridY, minGridX, minGridY, rnd, x, y, _results;
    this.ctx.fillStyle = "#fff";
    gridSize = 100;
    rnd = new Random;
    minGridX = Math.floor(-offset.x / gridSize);
    minGridY = Math.floor(-offset.y / gridSize);
    maxGridX = minGridX + Math.floor(this.width / gridSize) + 1;
    maxGridY = minGridY + Math.floor(this.height / gridSize) + 1;
    _results = [];
    for (x = minGridX; minGridX <= maxGridX ? x <= maxGridX : x >= maxGridX; minGridX <= maxGridX ? x++ : x--) {
      _results.push((function() {
        var _results2;
        _results2 = [];
        for (y = minGridY; minGridY <= maxGridY ? y <= maxGridY : y >= maxGridY; minGridY <= maxGridY ? y++ : y--) {
          rnd.seed((x + 1234) * (y - 463));
          _results2.push((function() {
            var _ref, _results3;
            _results3 = [];
            for (i = 0, _ref = rnd.uInt() % 7; 0 <= _ref ? i <= _ref : i >= _ref; 0 <= _ref ? i++ : i--) {
              _results3.push(this.ctx.fillRect(rnd.uInt() % gridSize + x * gridSize, rnd.uInt() % gridSize + y * gridSize, 1, 1));
            }
            return _results3;
          }).call(this));
        }
        return _results2;
      }).call(this));
    }
    return _results;
  };
  return Universe;
})();