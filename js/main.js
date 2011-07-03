var $canvas, canvas, height, resources, universe, width;
$canvas = $('#viewport');
width = $canvas.width();
height = $canvas.height();
canvas = $canvas[0];
canvas.width = width;
canvas.height = height;
resources = new Resources;
universe = new Universe(canvas.getContext('2d'), width, height, 100 / 3);
universe.populateRandomly(11);
resources.addCompletedListener(function() {
  return universe.start();
});
$canvas.bind('resize', function(e) {
  var h, w;
  alert('canvas was resized');
  w = $canvas.width();
  h = $canvas.height();
  canvas.width = w;
  canvas.height = h;
  universe.width = w;
  universe.height = h;
  universe.center.x = w / 2;
  return universe.center.y = h / 2;
});