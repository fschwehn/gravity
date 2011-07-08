class Dot extends GraphicsItem
	@radius: 15
	@color1: new Color(0, 0, 1, 1)
	@color2: new Color(0.5, 0.5, 1, 0.125)
	
	@oscillationActive: true
	@phs: 0
	@oscillRange: 1.5
	@rx: 0
	@ry: 0
	
	@oscillate: ->
		Dot.phs += 0.3
		Dot.phs -= 4 if Dot.phs > 3
		d = Dot.phs
		d = 2 - d if d > 1
		Dot.rx = Dot.radius + d
		Dot.ry = Dot.radius - d
		
	
	constructor: (pos, order = 0) ->
		if !Dot.audio 
			resources.loadAudio 'dot_collected', (r) -> Dot.audio = r
		@pos = pos
		
	collect: ->
		Dot.audio.play()
		@
		
	render: (ctx) ->
		if !Dot.image
			r = Dot.radius
			d = r * 2
			
			# create offline render contex
			canvas = document.createElement 'canvas'
			canvas.width = d
			canvas.height = d
			c = canvas.getContext('2d')
			
			# create gradient
			g = c.createRadialGradient(
				r, r, 0, 
				r * 1.125, r * 1.125, r
			)
			g.addColorStop(0, Dot.color1.toCssString());
			g.addColorStop(1, Dot.color2.toCssString());

			# create path
			c.beginPath();
			c.arc(r, r, r, -180, 180);

			# draw
			c.fillStyle = g;
			c.fill();
			
			# get image
			Dot.image = new Image()
			Dot.image.src = canvas.toDataURL("image/png")
			
			# cleanup
			delete canvas
		
		if Dot.oscillationActive
			ctx.drawImage(Dot.image, @pos.x - Dot.rx, @pos.y - Dot.ry, Dot.rx * 2, Dot.ry * 2)
		else
			ctx.drawImage(Dot.image, @pos.x - Dot.radius, @pos.y - Dot.radius, Dot.radius * 2, Dot.radius * 2)
		@
