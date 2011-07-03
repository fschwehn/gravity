class GraphicsScene
	constructor: (ctx, @width, @height, @fmps = 25) -> 
		@ctx = ctx
		@frameDuration = 1 / @fmps
		@center = new V2(@width / 2, @height / 2)
		@timer
		@items = []
		
	# ---------------------------
	# animation stuff
	# ---------------------------
	start: ->
		if !@timer
			self = @
			@timer = window.setInterval(
				-> self.move().render(),
				1000 * @frameDuration)
		@
		
	stop: ->
		window.clearInterval(@timer)
		@timer = null
		@
	
	move: ->
		@ctx.fillStyle = '#000'
		@ctx.fillRect(0, 0, @width, @height)
		item.move(@frameDuration) for item in @items
		@
		
	render: ->
		item.render(@ctx) for item in @items
		@
	
	# ---------------------------
	# item management
	# ---------------------------
	addItem: (item) ->
		@items.push(item)
		item.setScene(@)
		@
		