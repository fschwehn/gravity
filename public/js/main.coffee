# @todo move universe to a closure
error = (e) ->
	log e
	text
	switch typeof e
		when 'string' then text = e
		when 'object' then text = e.toString()
	$('#error').append('<p class="message">' + text + '</p>')
		.fadeIn(600)

try
	# setup canvas
	$canvas = $('#viewport')
	$canvas.bind 'select', -> false

	width = $canvas.width()
	height = $canvas.height()

	canvas = $canvas[0]
	canvas.width = width
	canvas.height = height

	# init resources
	@resources = new Resources

	# setup universe
	@universe = new Universe(canvas.getContext('2d'), width, height, 100 / 3)
	@universe.ship.speed.set -30, -50
	@universe.addItem universe.ship
	# @todo der darf immer nur einmal ausführen:
	@resources.addCompletedListener -> universe.start()

	# setup main menu
	mainMenu = new MainMenu
catch e
	error e