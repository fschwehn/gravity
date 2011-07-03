var SpaceShip, keyDown, keyLeft, keyRight, keyUp;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; }, __indexOf = Array.prototype.indexOf || function(item) {
  for (var i = 0, l = this.length; i < l; i++) {
    if (this[i] === item) return i;
  }
  return -1;
};
keyLeft = 37;
keyUp = 38;
keyRight = 39;
keyDown = 40;
SpaceShip = (function() {
  __extends(SpaceShip, GraphicsItem);
  function SpaceShip(pos, radius, image) {
    this.pos = pos;
    this.radius = radius;
    if (image == null) {
      image = "/images/viper_mark_ii.png";
    }
    this.mass = 1;
    this.speed = new V2;
    this.userAcceleration = new V2;
    this.rotation = -0.5 * Math.PI;
    this.rotationSpeed = 0;
    this.maxRotationSpeed = Math.PI;
    this.alive = true;
    this.mouseDown = false;
    this.keyStates = {};
    this.shipImage = resources.getImage(image);
    this.explosionImage = resources.getImage("/images/explosion.png");
    this.image = this.shipImage;
  }
  SpaceShip.prototype.setScene = function(scene) {
    SpaceShip.__super__.setScene.call(this, scene);
    this.installMouseListener();
    return this.installKeyboardListener();
  };
  SpaceShip.prototype.installMouseListener = function() {
    var $canvas;
    $canvas = $(this.scene.ctx.canvas);
    return $canvas.bind('mousedown mousemove mouseup', __bind(function(e) {
      var canvOfst, d;
      canvOfst = $canvas.offset();
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
  SpaceShip.prototype.installKeyboardListener = function() {
    return $(window).bind('keydown keyup', __bind(function(e) {
      var arrowKeys, key;
      arrowKeys = [keyLeft, keyRight, keyUp, keyDown];
      key = e.which;
      if (__indexOf.call(arrowKeys, key) >= 0) {
        switch (e.type) {
          case 'keydown':
            this.keyStates[e.which] = true;
            break;
          case 'keyup':
            this.keyStates[e.which] = false;
        }
        return false;
      }
      return true;
    }, this));
  };
  SpaceShip.prototype.direction = function() {
    return v2(Math.cos(this.rotation), Math.sin(this.rotation));
  };
  SpaceShip.prototype.render = function(ctx) {
    var d, triangle;
    triangle = function(x0, y0, x1, y1, x2, y2) {
      ctx.moveTo(x0, y0);
      ctx.lineTo(x1, y1);
      return ctx.lineTo(x2, y2);
    };
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    ctx.rotate(this.rotation - 0.5 * Math.PI);
    d = this.radius * 2;
    ctx.drawImage(this.image, -this.radius, -this.radius, d, d);
    ctx.beginPath();
    if (this.keyStates[keyDown]) {
      triangle(5, this.radius, 0, this.radius + 10, -5, this.radius);
    }
    if (this.keyStates[keyUp]) {
      triangle(-5, -this.radius, 0, -this.radius - 10, 5, -this.radius);
    }
    if (this.keyStates[keyLeft]) {
      triangle(-this.radius, this.radius - 5, -this.radius - 10, this.radius, -this.radius, this.radius + 5);
      triangle(this.radius, -this.radius + 5, this.radius + 10, -this.radius, this.radius, -this.radius - 5);
    }
    if (this.keyStates[keyRight]) {
      triangle(this.radius, this.radius - 5, this.radius + 10, this.radius, this.radius, this.radius + 5);
      triangle(-this.radius, -this.radius + 5, -this.radius - 10, -this.radius, -this.radius, -this.radius - 5);
    }
    ctx.fill();
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
    if (this.keyStates[keyUp]) {
      this.accelerate(this.direction().mul(100));
    }
    if (this.keyStates[keyDown]) {
      this.accelerate(this.direction().mul(-100));
    }
    if (this.keyStates[keyLeft]) {
      this.rotationAccelerate(-1);
    } else if (this.keyStates[keyRight]) {
      this.rotationAccelerate(1);
    } else {
      this.rotationAccelerate(0);
    }
    this.rotation += this.rotationSpeed * t;
    this.speed = this.speed.add(this.userAcceleration);
    this.pos = this.pos.add(this.speed.mul(t));
    return this;
  };
  SpaceShip.prototype.rotationAccelerate = function(direction) {
    switch (direction) {
      case 0:
        return this.rotationSpeed = 0;
      case -1:
        return this.rotationSpeed = -Math.PI;
      case 1:
        return this.rotationSpeed = Math.PI;
    }
  };
  SpaceShip.prototype.onMouseDown = function(d) {
    return this.onMouseDrag(d);
  };
  SpaceShip.prototype.onMouseDrag = function(d) {
    if (!this.alive) {
      return this;
    }
    return this.userAcceleration = d.mul(this.scene.frameDuration / 2);
  };
  SpaceShip.prototype.onMouseUp = function(d) {
    return this.userAcceleration = v2();
  };
  return SpaceShip;
})();