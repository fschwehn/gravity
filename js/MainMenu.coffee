class MainMenu
	constructor: ->
		# setup main menu button
		$('#but-main-menu').button({
			icons: { primary: 'ui-icon-circle-arrow-s' },
		}).click => @show()
		
		@dialog = $ '#main-menu'
		@dialog.dialog({
			title: 'choose a level'
		})
		
		@dialog.find('li')
			.hover ->
				$(this).toggleClass 'ui-state-hover ui-state-active'
			.click ->
				$('#main-menu').dialog 'close'
				universe.stop()
				levelName = $(this).text()
				level = new Level levelName, universe
				level.initialize(universe)
				universe.start()
		
	show: ->
		@dialog.dialog('open')