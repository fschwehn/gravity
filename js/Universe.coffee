class Universe extends GraphicsScene
	constructor: (ctx, width, height, fmps = 25) -> 
		super(ctx, width, height, fmps)
		
		@audioSampler = new AudioSampler 4	
		
		@ship = new SpaceShip(@center, 20, 'kspaceduel.png')
		@clear()
		
	clear: ->
		super
		@planets = []
		@dots = []
		@bgScaleSpeed = 0.75
		@
	
	addPlanet: (planet) ->
		@planets.push planet
		@addItem(planet)

	addDot: (dot) ->
		@dots.push dot
		@addItem(dot)
		
	setLevel: (level) ->
		@stop()
		@clear()
		level.load =>
			@addPlanet p for p in level.planets
			@addDot d for d in level.dots
			@addItem @ship = level.ship
			@start()
		@
		
	move: ->
		Dot.oscillate()
		
		if @ship.alive
			# iterate over planets
			accel = v2()
			for p in @planets
				d = p.pos.sub @ship.pos
				dist = d.abs()
				if dist < p.radius #+ @ship.radius
					@ship.explode()
					accel = v2()
					break
				g = p.mass * @ship.mass / Math.sqr(dist)
				dir = d.div dist
				accel = accel.add (dir.mul g)
			@ship.accelerate accel
			
			# iterate over dots
			for dot in @dots
				d = dot.pos.sub @ship.pos
				if d.abs() < Dot.radius + @ship.radius
					@hitDot dot
					break
		super
	
	hitDot: (dot) ->
		dot.collect()
		@dots.splice @dots.indexOf(dot), 1
		@removeItem dot
	
	render: ->
		@ctx.save()
		offset = @center.sub @ship.pos
		@ctx.translate offset.x, offset.y
		@renderBackground offset
		super
		@ctx.restore()
		
	renderBackground: (offset) ->
		@ctx.save()
		
		d = offset.mul (@bgScaleSpeed-1)
		@ctx.translate d.x, d.y
	
		@ctx.fillStyle = "#ccc"
		gridSize = 100
		rnd = new Random
		
		minGridX = Math.floor(-offset.x * @bgScaleSpeed / gridSize)
		minGridY = Math.floor(-offset.y * @bgScaleSpeed / gridSize)
		maxGridX = minGridX + Math.floor(@width / gridSize) + 1
		maxGridY = minGridY + Math.floor(@height / gridSize) + 1
	
		for x in [minGridX..maxGridX]
			for y in [minGridY..maxGridY]
				rnd.seed (x + 1234) * (y - 463)
				iMax = rnd.uInt(7)
				for i in [0..iMax]
					size = rnd.floatRange(1, 2)
					@ctx.fillRect(rnd.uFloat(gridSize) + x * gridSize, rnd.uFloat(gridSize) + y * gridSize, size, size)
		
		@ctx.restore()
		
