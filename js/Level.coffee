class Level
	constructor: (id) ->
		@id = id
		@planets = []
		@dots = []
		@ship = new SpaceShip(v2(), 20, 'kspaceduel.png')
	
	load: (callback) ->
		Level.current = @
		$.getScript("/levels/#{ @id }.js", => callback())
		@
