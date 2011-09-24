class Color
	constructor: (@r, @g, @b, @a = 1.0) ->
	
	_clip: (c) -> 
		return Math.max(0.0, Math.min(1.0, c))
	
	clip: ->
		@r = @._clip(@r)
		@g = @._clip(@g)
		@b = @._clip(@b)
		@a = @._clip(@a)
		return @
	
	toCssString: ->
		r = Math.floor(@r * 255.0)
		g = Math.floor(@g * 255.0)
		b = Math.floor(@b * 255.0)
		a = new Number(@a).toFixed(3)
		return "rgba(#{r},#{g},#{b},#{a})"

@Color = Color