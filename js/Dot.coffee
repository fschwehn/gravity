class Dot extends GraphicsItem
	radius: 5
	
	constructor: (pos, order = 0) ->
		@pos = pos
		@order = order
		
	render: (ctx) ->
		if !Dot.image
			d = Dot.radius * 2
			
			# create offline render contex
			canvas = document.createElement 'canvas'
			canvas.width = d
			canvas.height = d
			c = canvas.getContext('2d')
			#c.clearRect(0, 0, d, d)
			
			# create gradient
			g = c.createRadialGradient(
				@radius, @radius, 0, 
				@radius * 1.125, @radius * 1.125, @radius
			)
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
