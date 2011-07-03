class Resources
	hash: {}
	incomplete: 0
	completedListeners: []
	
	addCompletedListener: (callback) ->
		@completedListeners.push callback
	
	getImage: (url) ->
		img = @hash[url]
		return img if img
		
		img = new Image
		@hash[url] = img
		++@incomplete
		
		$(img).bind 'load', => @onLoad()
		
		img.src = url
		img
		
	onLoad: ->
		--@incomplete
		if @incomplete == 0
			callback() for callback in @completedListeners