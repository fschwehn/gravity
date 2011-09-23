class Planet extends GraphicsItem
	constructor: (@pos, @radius, @color, @antigravity = false) ->
		@mass = 4 / 3 * Math.PI * Math.cube(@radius)
		@mass *= -1 if antigravity
	
	render: (ctx) ->
		if !@image
			d = @radius * 2
			
			# create offline render contex
			canvas = document.createElement 'canvas'
			canvas.width = d
			canvas.height = d
			c = canvas.getContext('2d')
			c.clearRect(0, 0, d, d)
			
			# create gradient
			rs = 1.125
			rs = 1 if @antigravity
			g = c.createRadialGradient(
				@radius, @radius, 0, 
				@radius * rs, @radius * rs, @radius
			)
			if @antigravity
				g.addColorStop(0, new Color(0, 0, 0, 0).toCssString());
				g.addColorStop(0.8, @color.toCssString());
				g.addColorStop(1, new Color(0, 0, 0, 0).toCssString());
			else
				g.addColorStop(0, @color.toCssString());
				g.addColorStop(1, new Color(0, 0, 0, @color.a).toCssString());

			# create path
			c.beginPath();
			c.arc(@radius, @radius, @radius, -180, 180);
			c.closePath()

			# draw
			c.fillStyle = g;
			c.fill();
			
			# get image
			@image = c.getImageData(0, 0, d, d)
			
			@image = new Image()
			@image.src = canvas.toDataURL("image/png")
			
			# cleanup
			delete canvas
		ctx.drawImage(@image, @pos.x - @radius, @pos.y - @radius)
		@
