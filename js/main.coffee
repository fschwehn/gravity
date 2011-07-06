error = (e) ->
	log e
	text
	switch typeof e
		when 'string' then text = e
		when 'object' then text = e.toString()
	$('#error').append('<p class="message">' + text + '</p>').show()

try
	# setup canvas
	$canvas = $('#viewport')

	width = $canvas.width()
	height = $canvas.height()

	canvas = $canvas[0]
	canvas.width = width
	canvas.height = height

	# init resources
	resources = new Resources

	# setup universe
	universe = new Universe(canvas.getContext('2d'), width, height, 100 / 3)

	# load a level
	level = new Level 'level_00', universe
	level.initialize()

	# go...
	resources.addCompletedListener -> universe.start()

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
catch e
	error e