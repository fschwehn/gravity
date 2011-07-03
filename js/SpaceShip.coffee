keyLeft		= 37
keyUp		= 38
keyRight	= 39
keyDown		= 40

class SpaceShip extends GraphicsItem
	constructor: (@pos, @radius, image = "/images/viper_mark_ii.png") ->
		# physics ..................................
		@mass = 1
		
		@speed = new V2
		@userAcceleration = new V2
		
		@rotation = -0.5 * Math.PI
		@rotationSpeed = 0
		@maxRotationSpeed = Math.PI
		
		# states ...................................
		@alive = true
		@mouseDown = false
		@keyStates = {}
		
		# images ...................................
		@shipImage = resources.getImage image
		@explosionImage = resources.getImage "/images/explosion.png"
		
		@image = @shipImage
		
	setScene: (scene) ->
		super scene
		
		# install event listeners
		@installMouseListener()
		@installKeyboardListener()
	
	installMouseListener: ->
		$canvas = $(@scene.ctx.canvas)
		$canvas.bind 'mousedown mousemove mouseup', (e) => 
			canvOfst = $canvas.offset()
			d = (new V2 e.clientX - canvOfst.left, e.clientY - canvOfst.top).sub @scene.center
			switch e.type
				when 'mousedown' then @mouseDown = true; @onMouseDown d
				when 'mousemove' then if @mouseDown then @onMouseDrag d
				when 'mouseup' then @mouseDown = false; @onMouseUp d
			true
		
	installKeyboardListener: ->
		$(window).bind 'keydown keyup', (e) => 
			
			arrowKeys = [keyLeft, keyRight, keyUp, keyDown]
			key = e.which
			
			if key in arrowKeys
				switch e.type
					when 'keydown'	then @keyStates[e.which] = true
					when 'keyup'	then @keyStates[e.which] = false
				return false
			true
			
	direction: ->
		v2 Math.cos(@rotation), Math.sin(@rotation)

	render: (ctx) ->
		triangle = (x0, y0, x1, y1, x2, y2) ->
			ctx.moveTo x0, y0
			ctx.lineTo x1, y1
			ctx.lineTo x2, y2
	
		ctx.save()
		
		# body ---------------
		ctx.translate(@pos.x, @pos.y)
		ctx.rotate(@rotation - 0.5 * Math.PI)
		d = @radius * 2;
		ctx.drawImage(@image, -@radius, -@radius, d, d)
		
		# jets ---------------
		ctx.beginPath()
		# front jet
		if @keyStates[keyDown]
			triangle 5, @radius, 0, @radius + 10, -5, @radius
		# rear jet
		if @keyStates[keyUp]
			triangle -5, -@radius, 0, -@radius - 10, 5, -@radius
		# left rotation jets
		if @keyStates[keyLeft]
			triangle -@radius, @radius - 5, -@radius - 10, @radius, -@radius, @radius + 5
			triangle @radius, -@radius + 5, @radius + 10, -@radius, @radius, -@radius - 5
		# right rotation jets
		if @keyStates[keyRight]
			triangle @radius, @radius - 5, @radius + 10, @radius, @radius, @radius + 5
			triangle -@radius, -@radius + 5, -@radius - 10, -@radius, -@radius, -@radius - 5
		ctx.fill()
		
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
		
		# front / rear acceleration
		if @keyStates[keyUp]
			@accelerate @direction().mul(100)
		if @keyStates[keyDown]
			@accelerate @direction().mul(-100)
		
		# rotation acceleration
		if @keyStates[keyLeft]
			@rotationAccelerate -1
		else if @keyStates[keyRight]
			@rotationAccelerate  1
		else
			@rotationAccelerate 0
		
		# rotate
		@rotation += @rotationSpeed * t
		
		# accelerate
		@speed = @speed.add(@userAcceleration)
		
		# move
		@pos = @pos.add(@speed.mul t)
		@
	
	rotationAccelerate: (direction) ->
		switch direction
			when  0 then @rotationSpeed = 0
			when -1 then @rotationSpeed = -Math.PI
			when  1 then @rotationSpeed = Math.PI
		
		#@maxRotationSpeed
	
	onMouseDown: (d) ->
		@onMouseDrag d
		
	onMouseDrag: (d) ->
		return @ if !@alive
		
		@userAcceleration = d.mul(@scene.frameDuration / 2)
		
	onMouseUp: (d) ->
		@userAcceleration = v2()
		
		