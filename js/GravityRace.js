var canvas, universe;
canvas = document.getElementById('viewport');
canvas.width = 600;
canvas.height = 600;
universe = new Universe(canvas.getContext('2d'), canvas.width, canvas.height, 33);
universe.start();