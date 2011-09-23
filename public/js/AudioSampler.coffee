class AudioSampler
	constructor: (numVoices = 4) ->
		@channels = []
		@numVoices = 0
		@setNumVoices numVoices
		@nextChannel = 0
		
	setNumVoices: (numVoices) ->
		if @numVoices > numVoices
			@channels.splice numVoices
		else
			while @channels.length < numVoices
				@channels.push new Audio
			
		@numVoices = numVoices
		@
		
	play: (url) ->
		c = @channels[@nextChannel]
		c.src = url
		c.play()
		@nextChannel = (@nextChannel + 1) % @numVoices