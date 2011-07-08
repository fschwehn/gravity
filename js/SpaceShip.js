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
      image = "viper_mark_ii.png";
    }
    this.config = {
      rotateWithSpeedVector: true
    };
    this.mass = 1;
    this.rotation = -0.5 * Math.PI;
    this.userAcceleration = new V2;
    this.maxUserAcceleration = 200;
    this.maxMouseDistance = 200;
    this.speed = new V2;
    this.alive = true;
    this.mouseDown = false;
    resources.loadImage(image, __bind(function(r) {
      return this.shipImage = r;
    }, this));
    resources.loadImage("explosion.png", __bind(function(r) {
      return this.explosionImage = r;
    }, this));
    resources.loadAudio('explosion_00', __bind(function(r) {
      return this.explosionAudio = r;
    }, this));
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
    var d, i, uaLen, x, y;
    ctx.save();
    ctx.translate(this.pos.x, this.pos.y);
    uaLen = this.userAcceleration.abs();
    if (uaLen > 0) {
      uaLen = uaLen / this.maxUserAcceleration * 25;
      ctx.save();
      ctx.rotate(this.userAcceleration.angle() + 0.5 * Math.PI);
      ctx.translate(0, this.radius);
      ctx.strokeStyle = 'rgba(192, 192, 255, 0.25)';
      ctx.lineWidth = 2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      i = (this.scene.frameCount % 8) * 0.25;
      while (i <= uaLen) {
        x = 4 + i * 0.75;
        y = i * 4;
        ctx.moveTo(-x, y);
        ctx.lineTo(x, y);
        i += 2;
      }
      ctx.stroke();
      ctx.restore();
    }
    ctx.rotate(this.rotation - 0.5 * Math.PI);
    d = this.radius * 2;
    ctx.drawImage(this.shipImage, -this.radius, -this.radius, d, d);
    return ctx.restore();
  };
  SpaceShip.prototype.accelerate = function(d) {
    this.speed = this.speed.add(d.mul(this.scene.frameDuration));
    return this;
  };
  SpaceShip.prototype.explode = function() {
    this.explosionAudio.play();
    this.speed = v2();
    this.alive = false;
    this.shipImage = this.explosionImage;
    this.scene.stop();
    return this;
  };
  SpaceShip.prototype.move = function(t) {
    if (!this.alive) {
      return this;
    }
    this.speed = this.speed.add(this.userAcceleration.mul(t));
    this.pos = this.pos.add(this.speed.mul(t));
    if (this.config.rotateWithSpeedVector) {
      this.rotation = this.speed.angle();
    } else {
      if (this.userAcceleration.abs() > 0) {
        this.rotation = this.userAcceleration.angle();
      }
    }
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