(function() {
  var V2;
  V2 = (function() {
    function V2(x, y) {
      this.x = x != null ? x : 0;
      this.y = y != null ? y : 0;
    }
    V2.prototype.set = function(x, y) {
      this.x = x;
      this.y = y;
      return this;
    };
    V2.prototype.add = function(v) {
      return new V2(this.x + v.x, this.y + v.y);
    };
    V2.prototype.sub = function(v) {
      return new V2(this.x - v.x, this.y - v.y);
    };
    V2.prototype.mul = function(s) {
      return new V2(this.x * s, this.y * s);
    };
    V2.prototype.div = function(s) {
      return new V2(this.x / s, this.y / s);
    };
    V2.prototype.abs = function() {
      return Math.sqrt(Math.sqr(this.x) + Math.sqr(this.y));
    };
    V2.prototype.distance = function(v) {
      return v.sub(this).abs();
    };
    V2.prototype.norm = function() {
      var a;
      a = this.abs;
      if (a > 0) {
        return this.div(a);
      }
      return v2(this.x, this.y);
    };
    V2.prototype.angle = function() {
      var d;
      d = Math.atan(this.y / this.x);
      if (this.x < 0.0) {
        d += Math.PI;
      }
      return d;
    };
    V2.prototype.toString = function() {
      return "[" + this.x + ", " + this.y + "]";
    };
    return V2;
  })();
  this.v2 = function(x, y) {
    return new V2(x, y);
  };
  this.V2 = V2;
}).call(this);
