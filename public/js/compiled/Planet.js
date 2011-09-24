(function() {
  var Planet;
  var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
    for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
    function ctor() { this.constructor = child; }
    ctor.prototype = parent.prototype;
    child.prototype = new ctor;
    child.__super__ = parent.prototype;
    return child;
  };
  Planet = (function() {
    __extends(Planet, GraphicsItem);
    function Planet(pos, radius, color, antigravity) {
      this.pos = pos;
      this.radius = radius;
      this.color = color;
      this.antigravity = antigravity != null ? antigravity : false;
      this.mass = 4 / 3 * Math.PI * Math.cube(this.radius);
      if (antigravity) {
        this.mass *= -1;
      }
    }
    Planet.prototype.render = function(ctx) {
      var c, canvas, d, g, rs;
      if (!this.image) {
        d = this.radius * 2;
        canvas = document.createElement('canvas');
        canvas.width = d;
        canvas.height = d;
        c = canvas.getContext('2d');
        c.clearRect(0, 0, d, d);
        rs = 1.125;
        if (this.antigravity) {
          rs = 1;
        }
        g = c.createRadialGradient(this.radius, this.radius, 0, this.radius * rs, this.radius * rs, this.radius);
        if (this.antigravity) {
          g.addColorStop(0, new Color(0, 0, 0, 0).toCssString());
          g.addColorStop(0.8, this.color.toCssString());
          g.addColorStop(1, new Color(0, 0, 0, 0).toCssString());
        } else {
          g.addColorStop(0, this.color.toCssString());
          g.addColorStop(1, new Color(0, 0, 0, this.color.a).toCssString());
        }
        c.beginPath();
        c.arc(this.radius, this.radius, this.radius, -180, 180);
        c.closePath();
        c.fillStyle = g;
        c.fill();
        this.image = c.getImageData(0, 0, d, d);
        this.image = new Image();
        this.image.src = canvas.toDataURL("image/png");
        delete canvas;
      }
      ctx.drawImage(this.image, this.pos.x - this.radius, this.pos.y - this.radius);
      return this;
    };
    return Planet;
  })();
  this.Planet = Planet;
}).call(this);
