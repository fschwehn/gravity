# setup canvas
canvas = document.getElementById('viewport');
canvas.width = 600;
canvas.height = 600;

# setup universe
universe = new Universe(canvas.getContext('2d'), canvas.width, canvas.height, 33)

# go...
universe.start()
