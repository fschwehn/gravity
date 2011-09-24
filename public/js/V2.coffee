class V2
	constructor: (@x = 0, @y = 0) ->
	
	set: (x, y) -> @x = x; @y = y; @
	add: (v) -> new V2(@x + v.x, @y + v.y )
	sub: (v) -> new V2(@x - v.x, @y - v.y )
	mul: (s) -> new V2(@x * s, @y * s)
	div: (s) -> new V2(@x / s, @y / s)
	abs: -> Math.sqrt(Math.sqr(@x) + Math.sqr(@y))
	distance: (v) -> v.sub(@).abs()
	
	norm: ->
		a = @abs
		if a > 0
			return @div(a)
		v2(@x, @y)
	
	angle: ->
		d = Math.atan(@y / @x)
		if @x < 0.0
			d += Math.PI
		d
	
	toString: -> "[#{ @x }, #{ @y }]"

# helper functions ---------------
@v2 = (x, y) -> new V2(x, y)

@V2 = V2