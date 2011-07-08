class SpaceShip extends GraphicsItem
	constructor: (@pos, @radius, image = "viper_mark_ii.png") ->
		@config = {
			rotateWithSpeedVector: true
		}
		
		# physics ..................................
		@mass = 1
		@rotation = -0.5 * Math.PI
		@userAcceleration = new V2
		@maxUserAcceleration = 200
		@maxMouseDistance = 200
		@speed = new V2
		
		# states ...................................
		@alive = true
		@mouseDown = false
		
		# load resources ...........................
		resources.loadImage image, (r) => @shipImage = r
		resources.loadImage "explosion.png", (r) => @explosionImage = r
		resources.loadAudio 'explosion_00', (r) => @explosionAudio = r
		
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
		
		# acceleration
		uaLen = @userAcceleration.abs()
		if uaLen > 0
			uaLen = uaLen / @maxUserAcceleration * 25
			ctx.save()
			ctx.rotate( @userAcceleration.angle() + 0.5 * Math.PI )
			ctx.translate 0, @radius
			ctx.strokeStyle = 'rgba(192, 192, 255, 0.25)'
			ctx.lineWidth = 2
			ctx.lineCap = 'round'
			ctx.beginPath()
			
			i = (@scene.frameCount % 8) * 0.25
			while i <= uaLen
				x = 4 + i * 0.75
				y = i * 4
				ctx.moveTo -x, y
				ctx.lineTo  x, y
				i += 2
			
			ctx.stroke()
			ctx.restore()
		
		# body
		ctx.rotate(@rotation - 0.5 * Math.PI)
		d = @radius * 2;
		ctx.drawImage(@shipImage, -@radius, -@radius, d, d)
		
		ctx.restore()
	
	accelerate: (d) ->
		@speed = @speed.add d.mul(@scene.frameDuration)
		@
	
	explode: ->
		@explosionAudio.play()
		@speed = v2()
		@alive = false
		@shipImage = @explosionImage
		@scene.stop()
		@
	
	move: (t) ->
		return @ if !@alive
		
		@speed = @speed.add(@userAcceleration.mul(t))
		@pos = @pos.add(@speed.mul t)
		
		# set rotation
		if @config.rotateWithSpeedVector
			@rotation = @speed.angle()
		else
			if @userAcceleration.abs() > 0
				@rotation = @userAcceleration.angle()
		@
		
	onMouseDown: (d) ->
		@onMouseDrag d
		
	onMouseDrag: (d) ->
		return @ if !@alive
		
		@userAcceleration = d.div(@maxMouseDistance).mul(@maxUserAcceleration)
		
		# limit to max user acceleration
		len = @userAcceleration.abs()
		if len > @maxUserAcceleration
			@userAcceleration = @userAcceleration.mul( @maxUserAcceleration / len)
		
	onMouseUp: (d) ->
		@userAcceleration = v2()
		
		