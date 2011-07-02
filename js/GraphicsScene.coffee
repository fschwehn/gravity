class GraphicsScene
	constructor: (ctx, @width, @height, @fmps = 25) -> 
		@ctx = ctx
		@center = new V2(@width / 2, @height / 2)
		@frameSize = 1000 / @fmps
		@timer
		@frameCount = 0
		@items = []
	
	# ---------------------------
	# animation stuff
	# ---------------------------
	start: ->
		if !@timer
			self = @
			@timer = window.setInterval(
				-> self.move().render(),
				@frameSize )
		@
		
	stop: ->
		window.clearInterval(@timer)
		@timer = null
		@
	
	move: ->
		@ctx.fillStyle = '#000'
		@ctx.fillRect(0, 0, @width, @height)
		item.move(@frameSize) for item in @items
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
		