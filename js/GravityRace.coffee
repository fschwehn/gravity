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

$canvas.bind 'resize', (e) ->
	alert('canvas was resized')
	w = $canvas.width()
	h = $canvas.height()
	
	canvas.width = w
	canvas.height = h
	
	universe.width = w
	universe.height = h
	universe.center.x = w / 2
	universe.center.y = h / 2