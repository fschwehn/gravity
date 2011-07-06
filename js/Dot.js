var Dot;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
};
Dot = (function() {
  __extends(Dot, GraphicsItem);
  Dot.radius = 15;
  Dot.color1 = new Color(0, 0, 1, 1);
  Dot.color2 = new Color(0.5, 0.5, 1, 0.125);
  Dot.oscillationActive = true;
  Dot.phs = 0;
  Dot.oscillRange = 1.5;
  Dot.rx = 0;
  Dot.ry = 0;
  Dot.oscillate = function() {
    var d;
    Dot.phs += 0.3;
    if (Dot.phs > 3) {
      Dot.phs -= 4;
    }
    d = Dot.phs;
    if (d > 1) {
      d = 2 - d;
    }
    Dot.rx = Dot.radius + d;
    return Dot.ry = Dot.radius - d;
  };
  function Dot(pos, order) {
    if (order == null) {
      order = 0;
    }
    this.pos = pos;
  }
  Dot.prototype.render = function(ctx) {
    var c, canvas, d, g, r;
    if (!Dot.image) {
      r = Dot.radius;
      d = r * 2;
      canvas = document.createElement('canvas');
      canvas.width = d;
      canvas.height = d;
      c = canvas.getContext('2d');
      g = c.createRadialGradient(r, r, 0, r * 1.125, r * 1.125, r);
      g.addColorStop(0, Dot.color1.toCssString());
      g.addColorStop(1, Dot.color2.toCssString());
      c.beginPath();
      c.arc(r, r, r, -180, 180);
      c.fillStyle = g;
      c.fill();
      Dot.image = new Image();
      Dot.image.src = canvas.toDataURL("image/png");
      delete canvas;
    }
    if (Dot.oscillationActive) {
      ctx.drawImage(Dot.image, this.pos.x - Dot.rx, this.pos.y - Dot.ry, Dot.rx * 2, Dot.ry * 2);
    } else {
      ctx.drawImage(Dot.image, this.pos.x - Dot.radius, this.pos.y - Dot.radius, Dot.radius * 2, Dot.radius * 2);
    }
    return this;
  };
  return Dot;
})();