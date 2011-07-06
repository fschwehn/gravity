class Universe extends GraphicsScene
	constructor: (ctx, width, height, fmps = 25) -> 
		super(ctx, width, height, fmps)
		@ship = new SpaceShip(@center, 20, 'kspaceduel.png')
		@clear()
		
	clear: ->
		super
		@planets = []
		@
	
	populateRandomly: (numPlanets) ->
		# add planets
		rnd = new Random (Math.random() * 1231548)
		for i in [1..numPlanets]
			posRad = rnd.floatRange(-Math.PI, Math.PI)
			posX = Math.cos(posRad)
			posY = Math.sin(posRad)
			pos = v2(posX, posY).mul rnd.floatRange(150, 500)
			radius = rnd.floatRange(8, 60)
			color = new Color(1, 1, 1, 1)
			
			@addPlanet( new Planet(@center.add(pos), radius, color) );

		# add ship
		@addItem(@ship)
		@
	

	addPlanet: (planet) ->
		@planets.push planet
		@addItem(planet)
		
	move: ->
		Dot.oscillate()
		
		if @ship.alive
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
			#for p in @planets
			#	p.pos = p.pos.sub accel
		super
	
	render: ->
		@ctx.save()
		offset = @center.sub @ship.pos
		@ctx.translate offset.x, offset.y
		@renderBackground offset
		super
		@ctx.restore()
		
	renderBackground: (offset) ->
		@ctx.fillStyle = "#fff"
		gridSize = 100
		rnd = new Random
		
		minGridX = Math.floor(-offset.x / gridSize)
		minGridY = Math.floor(-offset.y / gridSize)
		maxGridX = minGridX + Math.floor(@width / gridSize) + 1
		maxGridY = minGridY + Math.floor(@height / gridSize) + 1
	
		for x in [minGridX..maxGridX]
			for y in [minGridY..maxGridY]
				rnd.seed (x + 1234) * (y - 463)
				iMax = rnd.uInt(7)
				for i in [0..iMax]
					size = rnd.floatRange(1, 2)
					@ctx.fillRect(rnd.uFloat(gridSize) + x * gridSize, rnd.uFloat(gridSize) + y * gridSize, size, size)