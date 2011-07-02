# setup canvas
$canvas = $('#viewport')

width = $canvas.width()
height = $canvas.height()

canvas = $canvas[0]
canvas.width = width
canvas.height = height

# setup universe
universe = new Universe(canvas.getContext('2d'), width, height, 33)

# go...
universe.start()
