class Random
	constructor: (value = 0) ->
		@ceiling = 1073741824
		@seed value
		
	seed: (value) ->
		@value = parseInt(value)
	
	uInt: ->
		@value *= 1103515245
		@value += 12345
		@value %= @ceiling
		