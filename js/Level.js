var Level;
Level = (function() {
  function Level(id, universe) {
    this.id = id;
    this.universe = universe;
  }
  Level.prototype.initialize = function() {
    var script;
    Level.current = this;
    this.universe.clear();
    script = document.createElement('script');
    script.src = "/levels/" + this.id + ".js";
    $('body').append(script);
    this.universe.addItem(this.universe.ship);
    return this;
  };
  return Level;
})();