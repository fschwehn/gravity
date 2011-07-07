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