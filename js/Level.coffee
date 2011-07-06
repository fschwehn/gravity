class Level
	constructor: (id, universe) ->
		@id = id
		@universe = universe
	
	initialize: ->
		Level.current = @
		
		@universe.clear()
		
		script = document.createElement 'script'
		script.src = "/levels/#{ @id }.js"
		$('body').append(script)
		
		@universe.addItem @universe.ship
		@
