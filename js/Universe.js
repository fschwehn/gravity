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
    this.ship = new SpaceShip(this.center, 20);
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
    this.ctx.translate(this.ship.pos);
    return Universe.__super__.render.apply(this, arguments);
  };
  return Universe;
})();