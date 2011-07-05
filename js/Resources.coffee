class Resources
	constructor: ->
		@imageHash = {}
		@audioHash = {}
		@incomplete = 0
		@completedListeners = []
		@audioTypeInfo = @createAudioTypeInfo()
	
	# creates an info object for an audiotype that is supported by the browser.
	# returns null on failure
	createAudioTypeInfo: ->
		typeInfos = [
			{
				type: 'audio/ogg' 
				extension: 'ogg'
			},
			{
				type: 'audio/mpeg' 
				extension: 'mp3'
			},
			{
				type: 'audio/wav' 
				extension: 'wav'
			},
		]
		
		audio = new Audio()
		for info in typeInfos
			if audio.canPlayType info.type
				return info
		
		alert 'Audio playback is supported by your browser!'
		return null
	
	addCompletedListener: (callback) ->
		@completedListeners.push callback

	# get an image object eg. 'my_image.png'.
	getImage: (subPath) ->
		img = @imageHash[subPath]
		if !img
			@imageHash[subPath] = img = new Image
			$(img).bind 'load', => @onLoad()
			img.src = '/images/' + subPath
			++@incomplete
		img
	
	# get an audio object eg. 'my_audio'. (omit the extension!)
	getAudio: (fileName) ->
		audio = @audioHash[fileName]
		if !audio
			@audioHash[fileName] = audio = new Audio()
			audio.src = "/audio/#{ fileName }.#{ @audioTypeInfo.extension }"
			$(audio).bind 'canplay', => @onLoad()
			++@incomplete
		audio

	onLoad: ->
		--@incomplete
		if @incomplete == 0
			callback() for callback in @completedListeners