(function() {
  var Level;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
  Level = (function() {
    function Level(id) {
      this.id = id;
      this.planets = [];
      this.dots = [];
      this.ship = new SpaceShip(v2(), 20, 'kspaceduel.png');
    }
    Level.prototype.load = function(callback) {
      Level.current = this;
      $.getScript("/levels/" + this.id + ".js", __bind(function() {
        return callback();
      }, this));
      return this;
    };
    return Level;
  })();
  this.Level = Level;
}).call(this);
