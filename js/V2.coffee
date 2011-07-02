class V2
	constructor: (@x = 0, @y = 0) ->
	
	add: (v) -> new V2(@x + v.x, @y + v.y )
	sub: (v) -> new V2(@x - v.x, @y - v.y )
	mul: (s) -> new V2(@x * s, @y * s)
	div: (s) -> new V2(@x / s, @y / s)
	length: -> Math.sqrt(Math.sqr(@x) + Math.sqr(@y))
	distance: (v) -> v.sub(@).length()
	
	norm: ->
		len = @length
		if len > 0
			return @div(len)
		@
	
	angle: ->
		d = Math.atan(@y / @x)
		if @x < 0.0
			d += Math.PI
		d
	
	toString: -> "[#{ @x }, #{ @y }]"

# helper functions ---------------
v2 = (x, y) -> new V2(x, y)