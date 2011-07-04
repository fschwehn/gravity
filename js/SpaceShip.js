var SpaceShip;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
SpaceShip = (function() {
  __extends(SpaceShip, GraphicsItem);
  function SpaceShip(pos, radius, image) {
    this.pos = pos;
    this.radius = radius;
    if (image == null) {
      image = "/images/viper_mark_ii.png";
    }
    this.mass = 1;
    this.rotation = -0.5 * Math.PI;
    this.userAcceleration = new V2;
    this.maxUserAcceleration = 200;
    this.maxMouseDistance = 200;
    this.speed = new V2;
    this.alive = true;
    this.mouseDown = false;
    this.shipImage = resources.getImage(image);
    this.explosionImage = resources.getImage("/images/explosion.png");
    this.image = this.shipImage;
  }
  SpaceShip.prototype.setScene = function(scene) {
    SpaceShip.__super__.setScene.call(this, scene);
    return $(scene.ctx.canvas).bind('mousedown mousemove mouseup', __bind(function(e) {
      var canvOfst, d;
      canvOfst = $(scene.ctx.canvas).offset();
      d = (new V2(e.clientX - canvOfst.left, e.clientY - canvOfst.top)).sub(this.scene.center);
      switch (e.type) {
        case 'mousedown':
          this.mouseDown = true;
          this.onMouseDown(d);
          break;
        case 'mousemove':
          if (this.mouseDown) {
            this.onMouseDrag(d);
          }
          break;
        case 'mouseup':
          this.mouseDown = false;
          this.onMouseUp(d);
      }
      return true;
    }, this));
  };
  SpaceShip.prototype.render = function(ctx) {
    var d;
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotation - 0.5 * Math.PI);
    d = this.radius * 2;
    ctx.drawImage(this.image, -this.radius, -this.radius, d, d);
    return ctx.restore();
  };
  SpaceShip.prototype.accelerate = function(d) {
    this.speed = this.speed.add(d.mul(this.scene.frameDuration));
    return this;
  };
  SpaceShip.prototype.explode = function() {
    this.speed = v2();
    this.alive = false;
    this.image = this.explosionImage;
    return this;
  };
  SpaceShip.prototype.move = function(t) {
    if (!this.alive) {
      return this;
    }
    this.speed = this.speed.add(this.userAcceleration.mul(t));
    this.pos = this.pos.add(this.speed.mul(t));
    this.rotation = this.speed.angle();
    return this;
  };
  SpaceShip.prototype.onMouseDown = function(d) {
    return this.onMouseDrag(d);
  };
  SpaceShip.prototype.onMouseDrag = function(d) {
    var len;
    if (!this.alive) {
      return this;
    }
    this.userAcceleration = d.div(this.maxMouseDistance).mul(this.maxUserAcceleration);
    len = this.userAcceleration.abs();
    if (len > this.maxUserAcceleration) {
      return this.userAcceleration = this.userAcceleration.mul(this.maxUserAcceleration / len);
    }
  };
  SpaceShip.prototype.onMouseUp = function(d) {
    return this.userAcceleration = v2();
  };
  return SpaceShip;
})();