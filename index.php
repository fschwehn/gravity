<!DOCTYPE html>
<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <title>gravity</title>

		<link type="text/css" href="/lib/jquery-ui/css/trontastic/jquery-ui.css" rel="stylesheet" />	
		<link rel="stylesheet" type="text/css" href="index.css" media="all" />
		
		<script type="text/javascript" src="/lib/jquery-ui/js/jquery.min.js"></script>
		<script type="text/javascript" src="/lib/jquery-ui/js/jquery-ui.min.js"></script>
    </head>
	
    <body>
		<header class="ui-widget ui-header ui-corner-all ui-state-default">
			<h1>gravity</h1>
			<button id="but-main-menu">main menu</button>
		</header
		
		<div id="error" class="ui-widget ui-corner-all ui-state-error">
			<h3><span class="ui-icon ui-icon-alert" style="float: left; margin-right: .3em;"></span>An Error occurred:</h3>
			<p class="message"></p>
		</div>
		
		<div id="main-menu">
			<?php require 'main_menu.php' ?>
		</div>
		
		<canvas id="viewport">your browser ain't support no canvas.</canvas>
		
		<script src="/js/helpers.js"></script>
		<script src="/js/xMath.js"></script>
		<script src="/js/Random.js"></script>
		<script src="/js/V2.js"></script>
		<script src="/js/Color.js"></script>
		<script src="/js/Resources.js"></script>
		<script src="/js/GraphicsItem.js"></script>
		<script src="/js/GraphicsScene.js"></script>
		<script src="/js/Dot.js"></script>
		<script src="/js/Planet.js"></script>
		<script src="/js/SpaceShip.js"></script>
		<script src="/js/Universe.js"></script>
		<script src="/js/Level.js"></script>
		<script src="/js/MainMenu.js"></script>
		<script src="/js/main.js"></script>
    </body>
</html>
