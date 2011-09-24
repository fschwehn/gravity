(function() {
  var $canvas, canvas, error, height, mainMenu, width;
  error = function(e) {
    var text;
    if (typeof console !== "undefined" && console !== null) {
      console.log(e);
    }
    text;
    switch (typeof e) {
      case 'string':
        text = e;
        break;
      case 'object':
        text = e.toString();
    }
    return $('#error').append('<p class="message">' + text + '</p>').fadeIn(600);
  };
  try {
    $canvas = $('#viewport');
    $canvas.bind('select', function() {
      return false;
    });
    width = $canvas.width();
    height = $canvas.height();
    canvas = $canvas[0];
    canvas.width = width;
    canvas.height = height;
    this.resources = new Resources;
    this.universe = new Universe(canvas.getContext('2d'), width, height, 100 / 3);
    this.universe.ship.speed.set(-30, -50);
    this.universe.addItem(universe.ship);
    this.resources.addCompletedListener(function() {
      return universe.start();
    });
    mainMenu = new MainMenu;
  } catch (e) {
    error(e);
  }
}).call(this);
