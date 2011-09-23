class Resources
	constructor: ->
		@imageHash = {}
		@audioHash = {}
		@incomplete = 0
		@completedListeners = []
		@audioTypeInfos = @createAudioTypeInfos()
	
	# creates an info object for an audiotype that is supported by the browser.
	# returns null on failure
	createAudioTypeInfos: ->
		infos = [
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
		
		for i in [infos.length-1..0]
			info = infos[i]
			if !audio.canPlayType info.type
				infos.splice(i, 1)
		
		if infos.length == 0
			throw 'Audio playback is supported by your browser!'
		
		infos
	
	# registers a callback to be executed when all resources have been loaded
	addCompletedListener: (callback) ->
		@completedListeners.push callback

	# get an image object eg. 'my_image.png'.
	loadImage: (fileName, callback) ->
		img = @imageHash[fileName]
		if img
			callback img
			return @
		
		@imageHash[fileName] = img = new Image
		++@incomplete
		$(img).bind 'load', =>
			callback img
			@onLoad()
		$(img).bind 'error', =>
			error "The resource #{ fileName } could not be found!"
		img.src = '/images/' + fileName
		@
		
	# get an audio object eg. 'my_audio'. (omit the extension!)
	loadAudio: (fileName, callback) ->
		# check if object is already hashed
		audio = @audioHash[fileName]
		return callback(audio) if audio
		
		++@incomplete
		@tryLoadAudio fileName, 0, callback
	
	tryLoadAudio: (fileName, typeIndex, callback) ->
		# no suitable file could be found
		if typeIndex >= @audioTypeInfos.length
			return error "The resource #{ fileName } could not be found!"
		
		# create new audio object
		audio = new Audio()
		@audioHash[fileName] = audio
		
		# response on this event means success
		$(audio).bind 'canplay', => 
			$(audio).unbind('error')
			callback audio
			@onLoad()

		# response on this event means failure so let's try the next format
		$(audio).bind 'error', =>
			@tryLoadAudio fileName, ++typeIndex, callback

		# set source and wait for result
		info = @audioTypeInfos[typeIndex]
		audio.src = "/audio/#{ fileName }.#{ info.extension }"
		@
	
	# called when a resource has been loaded
	# calls all callbacks registered with @addCompletedListener()
	onLoad: ->
		--@incomplete
		if @incomplete == 0
			callback() for callback in @completedListeners