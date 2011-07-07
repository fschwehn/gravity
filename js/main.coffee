error = (e) ->
	log e
	text
	switch typeof e
		when 'string' then text = e
		when 'object' then text = e.toString()
	$('#error').append('<p class="message">' + text + '</p>').show()

try
	if true
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
		universe.ship.speed.set -30, -50
		universe.addItem universe.ship
		resources.addCompletedListener -> universe.start()
		
		# setup main menu
		mainMenu = new MainMenu
catch e
	error e