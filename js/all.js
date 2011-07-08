var log;
log = function(x) {
  if (console) {
    console.log(x);
  }
  return x;
};
Math.sqr = function(x) {
	return x * x;
}
Math.cube = function(x) {
	return x * x * x;
}

var Random;
Random = (function() {
  function Random(value) {
    if (value == null) {
      value = 0;
    }
    this.ceiling = 0x8FFFFFFF;
    this.seed(value);
  }
  Random.prototype.seed = function(value) {
    return this.value = Math.abs(Math.floor(value));
  };
  Random.prototype.uInt = function(max) {
    if (max == null) {
      max = this.ceiling;
    }
    this.value *= 1103515245;
    this.value += 12345;
    this.value %= this.ceiling;
    return this.value % max;
  };
  Random.prototype.intRange = function(min, max) {
    return this.uInt(max - min) + min;
  };
  Random.prototype.uFloat = function(max) {
    if (max == null) {
      max = 1.0;
    }
    return (this.uInt() / this.ceiling) * max;
  };
  Random.prototype.floatRange = function(min, max) {
    return this.uFloat(max - min) + min;
  };
  return Random;
})();
var V2, v2;
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
v2 = function(x, y) {
  return new V2(x, y);
};
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
var Resources;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Resources = (function() {
  function Resources() {
    this.imageHash = {};
    this.audioHash = {};
    this.incomplete = 0;
    this.completedListeners = [];
    this.audioTypeInfos = this.createAudioTypeInfos();
  }
  Resources.prototype.createAudioTypeInfos = function() {
    var audio, i, info, infos, _ref;
    infos = [
      {
        type: 'audio/ogg',
        extension: 'ogg'
      }, {
        type: 'audio/mpeg',
        extension: 'mp3'
      }, {
        type: 'audio/wav',
        extension: 'wav'
      }
    ];
    audio = new Audio();
    for (i = _ref = infos.length - 1; _ref <= 0 ? i <= 0 : i >= 0; _ref <= 0 ? i++ : i--) {
      info = infos[i];
      if (!audio.canPlayType(info.type)) {
        infos.splice(i, 1);
      }
    }
    if (infos.length === 0) {
      throw 'Audio playback is supported by your browser!';
    }
    return infos;
  };
  Resources.prototype.addCompletedListener = function(callback) {
    return this.completedListeners.push(callback);
  };
  Resources.prototype.loadImage = function(fileName, callback) {
    var img;
    img = this.imageHash[fileName];
    if (img) {
      callback(img);
      return this;
    }
    this.imageHash[fileName] = img = new Image;
    ++this.incomplete;
    $(img).bind('load', __bind(function() {
      callback(img);
      return this.onLoad();
    }, this));
    $(img).bind('error', __bind(function() {
      return error("The resource " + fileName + " could not be found!");
    }, this));
    img.src = '/images/' + fileName;
    return this;
  };
  Resources.prototype.loadAudio = function(fileName, callback) {
    var audio;
    audio = this.audioHash[fileName];
    if (audio) {
      return callback(audio);
    }
    ++this.incomplete;
    return this.tryLoadAudio(fileName, 0, callback);
  };
  Resources.prototype.tryLoadAudio = function(fileName, typeIndex, callback) {
    var audio, info;
    if (typeIndex >= this.audioTypeInfos.length) {
      return error("The resource " + fileName + " could not be found!");
    }
    audio = new Audio();
    this.audioHash[fileName] = audio;
    $(audio).bind('canplay', __bind(function() {
      $(audio).unbind('error');
      callback(audio);
      return this.onLoad();
    }, this));
    $(audio).bind('error', __bind(function() {
      return this.tryLoadAudio(fileName, ++typeIndex, callback);
    }, this));
    info = this.audioTypeInfos[typeIndex];
    audio.src = "/audio/" + fileName + "." + info.extension;
    return this;
  };
  Resources.prototype.onLoad = function() {
    var callback, _i, _len, _ref, _results;
    --this.incomplete;
    if (this.incomplete === 0) {
      _ref = this.completedListeners;
      _results = [];
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        callback = _ref[_i];
        _results.push(callback());
      }
      return _results;
    }
  };
  return Resources;
})();
var GraphicsItem;
GraphicsItem = (function() {
  function GraphicsItem() {}
  GraphicsItem.prototype.construct = function() {
    this.scene;
    return this;
  };
  GraphicsItem.prototype.move = function(t) {
    return this;
  };
  GraphicsItem.prototype.render = function(ctx) {
    return this;
  };
  GraphicsItem.prototype.setScene = function(scene) {
    this.scene = scene;
    return this;
  };
  return GraphicsItem;
})();
var GraphicsScene;
GraphicsScene = (function() {
  function GraphicsScene(ctx, width, height, fmps) {
    this.width = width;
    this.height = height;
    this.fmps = fmps != null ? fmps : 25;
    this.ctx = ctx;
    this.frameDuration = 1 / this.fmps;
    this.center = new V2(this.width / 2, this.height / 2);
    this.timer;
    this.items = [];
    this.frameCount = 0;
  }
  GraphicsScene.prototype.clear = function() {
    this.items = [];
    return this;
  };
  GraphicsScene.prototype.start = function() {
    var self;
    if (!this.timer) {
      self = this;
      this.timer = window.setInterval(function() {
        return self.move().render();
      }, 1000 * this.frameDuration);
    }
    return this;
  };
  GraphicsScene.prototype.stop = function() {
    window.clearInterval(this.timer);
    this.timer = null;
    return this;
  };
  GraphicsScene.prototype.move = function() {
    var item, _i, _len, _ref;
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.width, this.height);
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      item.move(this.frameDuration);
    }
    return this;
  };
  GraphicsScene.prototype.render = function() {
    var item, _i, _len, _ref;
    _ref = this.items;
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      item = _ref[_i];
      item.render(this.ctx);
    }
    this.frameCount++;
    return this;
  };
  GraphicsScene.prototype.addItem = function(item) {
    this.items.push(item);
    item.setScene(this);
    return this;
  };
  GraphicsScene.prototype.removeItem = function(item) {
    var i;
    i = this.items.indexOf(item);
    if (i > -1 && i < this.items.length) {
      this.items.splice(i, 1);
    }
    return this;
  };
  return GraphicsScene;
})();
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
      g.addColorStop(1, new Color(0, 0, 0, this.color.a).toCssString());
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
var Universe;
var __hasProp = Object.prototype.hasOwnProperty, __extends = function(child, parent) {
  for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; }
  function ctor() { this.constructor = child; }
  ctor.prototype = parent.prototype;
  child.prototype = new ctor;
  child.__super__ = parent.prototype;
  return child;
}, __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
Universe = (function() {
  __extends(Universe, GraphicsScene);
  function Universe(ctx, width, height, fmps) {
    if (fmps == null) {
      fmps = 25;
    }
    Universe.__super__.constructor.call(this, ctx, width, height, fmps);
    this.ship = new SpaceShip(this.center, 20, 'kspaceduel.png');
    this.clear();
  }
  Universe.prototype.clear = function() {
    Universe.__super__.clear.apply(this, arguments);
    this.planets = [];
    this.dots = [];
    this.bgScaleSpeed = 0.75;
    return this;
  };
  Universe.prototype.addPlanet = function(planet) {
    this.planets.push(planet);
    return this.addItem(planet);
  };
  Universe.prototype.addDot = function(dot) {
    this.dots.push(dot);
    return this.addItem(dot);
  };
  Universe.prototype.setLevel = function(level) {
    this.stop();
    this.clear();
    level.load(__bind(function() {
      var d, p, _i, _j, _len, _len2, _ref, _ref2;
      _ref = level.planets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        this.addPlanet(p);
      }
      _ref2 = level.dots;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        d = _ref2[_j];
        this.addDot(d);
      }
      this.addItem(this.ship = level.ship);
      return this.start();
    }, this));
    return this;
  };
  Universe.prototype.move = function() {
    var accel, d, dir, dist, dot, g, p, _i, _j, _len, _len2, _ref, _ref2;
    Dot.oscillate();
    if (this.ship.alive) {
      accel = v2();
      _ref = this.planets;
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        p = _ref[_i];
        d = p.pos.sub(this.ship.pos);
        dist = d.abs();
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
      _ref2 = this.dots;
      for (_j = 0, _len2 = _ref2.length; _j < _len2; _j++) {
        dot = _ref2[_j];
        d = dot.pos.sub(this.ship.pos);
        if (d.abs() < Dot.radius + this.ship.radius) {
          this.hitDot(dot);
          break;
        }
      }
    }
    return Universe.__super__.move.apply(this, arguments);
  };
  Universe.prototype.hitDot = function(dot) {
    this.dots.splice(this.dots.indexOf(dot), 1);
    return this.removeItem(dot);
  };
  Universe.prototype.render = function() {
    var offset;
    this.ctx.save();
    offset = this.center.sub(this.ship.pos);
    this.ctx.translate(offset.x, offset.y);
    this.renderBackground(offset);
    Universe.__super__.render.apply(this, arguments);
    return this.ctx.restore();
  };
  Universe.prototype.renderBackground = function(offset) {
    var d, gridSize, i, iMax, maxGridX, maxGridY, minGridX, minGridY, rnd, size, x, y;
    this.ctx.save();
    d = offset.mul(this.bgScaleSpeed - 1);
    this.ctx.translate(d.x, d.y);
    this.ctx.fillStyle = "#ccc";
    gridSize = 100;
    rnd = new Random;
    minGridX = Math.floor(-offset.x * this.bgScaleSpeed / gridSize);
    minGridY = Math.floor(-offset.y * this.bgScaleSpeed / gridSize);
    maxGridX = minGridX + Math.floor(this.width / gridSize) + 1;
    maxGridY = minGridY + Math.floor(this.height / gridSize) + 1;
    for (x = minGridX; minGridX <= maxGridX ? x <= maxGridX : x >= maxGridX; minGridX <= maxGridX ? x++ : x--) {
      for (y = minGridY; minGridY <= maxGridY ? y <= maxGridY : y >= maxGridY; minGridY <= maxGridY ? y++ : y--) {
        rnd.seed((x + 1234) * (y - 463));
        iMax = rnd.uInt(7);
        for (i = 0; 0 <= iMax ? i <= iMax : i >= iMax; 0 <= iMax ? i++ : i--) {
          size = rnd.floatRange(1, 2);
          this.ctx.fillRect(rnd.uFloat(gridSize) + x * gridSize, rnd.uFloat(gridSize) + y * gridSize, size, size);
        }
      }
    }
    return this.ctx.restore();
  };
  return Universe;
})();
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
var MainMenu;
var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
MainMenu = (function() {
  function MainMenu() {
    $('#but-main-menu').button({
      icons: {
        primary: 'ui-icon-circle-arrow-s'
      }
    }).click(__bind(function() {
      return this.show();
    }, this));
    this.dialog = $('#main-menu');
    this.dialog.dialog({
      title: 'choose a level',
      position: 'top',
      show: 'fade',
      hide: 'fade'
    });
    this.dialog.find('li').hover(function() {
      return $(this).addClass('ui-state-hover').removeClass('ui-state-active');
    }, function() {
      return $(this).addClass('ui-state-active').removeClass('ui-state-hover');
    }).click(function() {
      $('#main-menu').dialog('close');
      return universe.setLevel(new Level($(this).text(), function() {
        return universe.start();
      }));
    });
  }
  MainMenu.prototype.show = function() {
    return this.dialog.dialog('open');
  };
  return MainMenu;
})();
var $canvas, canvas, error, height, mainMenu, resources, universe, width;
error = function(e) {
  var text;
  log(e);
  text;
  switch (typeof e) {
    case 'string':
      text = e;
      break;
    case 'object':
      text = e.toString();
  }
  return $('#error').append('<p class="message">' + text + '</p>').show();
};
try {
  if (true) {
    $canvas = $('#viewport');
    $canvas.bind('select', function() {
      return false;
    });
    width = $canvas.width();
    height = $canvas.height();
    canvas = $canvas[0];
    canvas.width = width;
    canvas.height = height;
    resources = new Resources;
    universe = new Universe(canvas.getContext('2d'), width, height, 100 / 3);
    universe.ship.speed.set(-30, -50);
    universe.addItem(universe.ship);
    resources.addCompletedListener(function() {
      return universe.start();
    });
    mainMenu = new MainMenu;
  }
} catch (e) {
  error(e);
}
