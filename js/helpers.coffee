log = (x) ->
	if console
		console.log if typeof( x.toString) == 'function' then x.toString() else x
	x