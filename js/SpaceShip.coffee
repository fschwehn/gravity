class SpaceShip extends GraphicsItem
	constructor: (@pos, @radius, image = "/images/viper_mark_ii.png") ->
		@mass = 0.25
		@rotation = -0.5 * Math.PI
		@speed = new V2()
		@mouseDown = false
		#@image.addEventListener('load', => @draw())
		@alive = true
		
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
			d = (new V2 e.clientX - canvOfst.left, e.clientY - canvOfst.top).sub @pos
			switch e.type
				when 'mousedown' then @mouseDown = true; @onMouseDown d
				when 'mousemove' then if @mouseDown then @onMouseDrag d
				when 'mouseup' then @mouseDown = false; @onMouseUp d
			true
	
	onMouseDown: (d) ->
		@onMouseDrag d
		
		#log v.toString()
	onMouseDrag: (d) ->
		return @ if !@alive
		@rotation = d.angle()
		@accelerate d.norm().mul(3.0 / @scene.fmps)
		#log v.toString()
	onMouseUp: (d) ->
		#log v.toString()
	
	accelerate: (d) ->
		@speed = @speed.add(d)
		#log @speed.toString()
		@
	
	explode: ->
		@speed = v2()
		@alive = false
		@image = @explosionImage
		@
	
	move: (t) ->
		@pos = @pos.add(@speed.div t)
		@

	render: (ctx) ->
		ctx.save()
		ctx.translate(@pos.x, @pos.y)
		ctx.rotate(@rotation - 0.5 * Math.PI)
		d = @radius * 2;
#		ctx.beginPath();
#		ctx.arc(0, 0, @radius, -180, 180);
#		ctx.closePath()
#		ctx.fillStyle = new Color(1, 1, 1, 0.25).toCssString()
#		ctx.fill()
		ctx.drawImage(@image, -@radius, -@radius, d, d);#, dx, dy, dw, dh)
		ctx.restore()
		@