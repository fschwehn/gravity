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
  function Planet(pos, radius, color) {
    this.pos = pos;
    this.radius = radius;
    this.color = color;
    this.mass = 4 / 3 * Math.PI * Math.cube(this.radius);
  }
  Planet.prototype.render = function(ctx) {
    var c, canvas, d, g;
    if (!this.image) {
      d = this.radius * 2;
      canvas = document.createElement('canvas');
      canvas.width = d;
      canvas.height = d;
      c = canvas.getContext('2d');
      c.clearRect(0, 0, d, d);
      g = c.createRadialGradient(this.radius, this.radius, 0, this.radius * 1.125, this.radius * 1.125, this.radius);
      g.addColorStop(0, this.color.toCssString());
      g.addColorStop(1, new Color(0.25, 0.25, 0.25, this.color.a * 0.25).toCssString());
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