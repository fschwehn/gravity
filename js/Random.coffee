class Random
	constructor: (value = 0) ->
		#@ceiling = 1073741824
		@ceiling = 0x8FFFFFFF
		@seed value
		
	seed: (value) ->
		@value = Math.abs(Math.floor(value))
	
	uInt: (max = @ceiling) ->
		@value *= 1103515245
		@value += 12345
		@value %= @ceiling
		@value % max
		
	intRange: (min, max) ->
		@uInt(max - min) + min
		
	uFloat: (max = 1.0) ->
		(@uInt() / @ceiling) * max
		
	floatRange: (min, max) ->
		@uFloat(max - min) + min