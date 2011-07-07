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
			.hover(
				-> $(this).addClass('ui-state-hover').removeClass('ui-state-active'),
				-> $(this).addClass('ui-state-active').removeClass('ui-state-hover')
			)
			.click ->
				$('#main-menu').dialog 'close'
				universe.setLevel(new Level $(this).text(), ->
					universe.start()
				)
		
	show: ->
		@dialog.dialog('open')