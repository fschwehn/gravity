class Universe extends GraphicsScene
	constructor: (ctx, width, height, fmps = 25) -> 
		super(ctx, width, height, fmps)
		
		@planets = []
		
		# add planets
		@addPlanet(new Planet(@center.add(v2(-200, 0)), 40, new Color(1, 1, 1, 1) ) );
		@addPlanet(new Planet(@center.add(v2( 200, 0)), 39, new Color(1, .5, .5, 1) ) );
		@addPlanet(new Planet(@center.add(v2( 0, -200)), 40, new Color(1, 1, 1, 1) ) );
		@addPlanet(new Planet(@center.add(v2( 150,  200)), 40, new Color(1, 1, 1, 1) ) );
		@addPlanet(new Planet(@center.add(v2( -81,  260)), 10, new Color(1, 1, 1, 1) ) );

		# add ship
		@ship = new SpaceShip(@center, 20, '/images/kspaceduel.png')
		@addItem(@ship)
		
	addPlanet: (planet) ->
		@planets.push planet
		@addItem(planet)
		
	move: ->
		if @ship.alive
			accel = v2()
			for p in @planets
				d = p.pos.sub @ship.pos
				dist = d.length()
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
				for i in [0..rnd.uInt()%7]
					@ctx.fillRect(rnd.uInt() % gridSize + x * gridSize, rnd.uInt() % gridSize + y * gridSize, 1, 1)
			
		#@stop()
		
		