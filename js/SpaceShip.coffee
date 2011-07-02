class SpaceShip extends GraphicsItem
	constructor: (@pos, @radius, image = "/images/viper_mark_ii.png") ->
		# physics ..................................
		@mass = 1
		@rotation = -0.5 * Math.PI
		@userAcceleration = new V2
		@speed = new V2
		
		# states ...................................
		@alive = true
		@mouseDown = false
		
		# images ...................................
		@shipImage = new Image()
		@shipImage.src = image
		
		@explosionImage = new Image()
		@explosionImage.src = "/images/explosion.png"
		
		@image = @shipImage
		
	setScene: (scene) ->
		super scene
		
		# install mouse event listener
		$(scene.ctx.canvas).bind 'mousedown mousemove mouseup', (e) => 
			canvOfst = $(scene.ctx.canvas).offset()
			d = (new V2 e.clientX - canvOfst.left, e.clientY - canvOfst.top).sub @scene.center
			switch e.type
				when 'mousedown' then @mouseDown = true; @onMouseDown d
				when 'mousemove' then if @mouseDown then @onMouseDrag d
				when 'mouseup' then @mouseDown = false; @onMouseUp d
			true

	render: (ctx) ->
		ctx.save()
		ctx.translate(@pos.x, @pos.y)
		ctx.rotate(@rotation - 0.5 * Math.PI)
		d = @radius * 2;
		ctx.drawImage(@image, -@radius, -@radius, d, d)
		ctx.restore()
	
	accelerate: (d) ->
		@speed = @speed.add d.mul(@scene.frameDuration)
		@
	
	explode: ->
		@speed = v2()
		@alive = false
		@image = @explosionImage
		@
	
	move: (t) ->
		return @ if !@alive
		
		@speed = @speed.add(@userAcceleration)
		@pos = @pos.add(@speed.mul t)
		@rotation = @speed.angle()
		@
		
	onMouseDown: (d) ->
		@onMouseDrag d
		
	onMouseDrag: (d) ->
		return @ if !@alive
		
		@userAcceleration = d.mul(@scene.frameDuration / 2)
		
	onMouseUp: (d) ->
		@userAcceleration = v2()
		
		