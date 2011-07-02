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
  }
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
    return this;
  };
  GraphicsScene.prototype.addItem = function(item) {
    this.items.push(item);
    item.setScene(this);
    return this;
  };
  return GraphicsScene;
})();