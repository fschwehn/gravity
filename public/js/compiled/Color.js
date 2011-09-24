(function() {
  var Color;
  Color = (function() {
    function Color(r, g, b, a) {
      this.r = r;
      this.g = g;
      this.b = b;
      this.a = a != null ? a : 1.0;
    }
    Color.prototype._clip = function(c) {
      return Math.max(0.0, Math.min(1.0, c));
    };
    Color.prototype.clip = function() {
      this.r = this._clip(this.r);
      this.g = this._clip(this.g);
      this.b = this._clip(this.b);
      this.a = this._clip(this.a);
      return this;
    };
    Color.prototype.toCssString = function() {
      var a, b, g, r;
      r = Math.floor(this.r * 255.0);
      g = Math.floor(this.g * 255.0);
      b = Math.floor(this.b * 255.0);
      a = new Number(this.a).toFixed(3);
      return "rgba(" + r + "," + g + "," + b + "," + a + ")";
    };
    return Color;
  })();
  this.Color = Color;
}).call(this);
