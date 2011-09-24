(function() {
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
  this.GraphicsItem = GraphicsItem;
}).call(this);
