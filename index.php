<!DOCTYPE html>
<?php
	error_reporting(E_ALL);
	ini_set('display_errors', 1);
	
	define('APPLICATION_ENV_DEVELOPMENT', 'development');
	define('APPLICATION_ENV_DEPLOYMENT', 'deployment');
	define('APPLICATION_ENV', isset($_SERVER['APPLICATION_ENV']) ? $_SERVER['APPLICATION_ENV'] : APPLICATION_ENV_DEPLOYMENT);
?>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8"/>
        <title>gravity</title>

		<link type="text/css" href="/lib/jquery-ui/css/trontastic/jquery-ui.css" rel="stylesheet" />	
		<link rel="stylesheet" type="text/css" href="index.css" media="all" />
		
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
		
		<script src="lib/jquery-ui/js/jquery.min.js"></script>
		<script src="lib/jquery-ui/js/jquery-ui.min.js"></script>
		
		<?php
		require_once 'classes/ScriptPack.php';
		
		$scriptPack = new ScriptPack('/js/all.js', array(
			'/js/helpers.js',
			'/js/xMath.js',
			'/js/Random.js',
			'/js/V2.js',
			'/js/Color.js',
			'/js/Resources.js',
			'/js/AudioSampler.js',
			'/js/GraphicsItem.js',
			'/js/GraphicsScene.js',
			'/js/Dot.js',
			'/js/Planet.js',
			'/js/SpaceShip.js',
			'/js/Universe.js',
			'/js/Level.js',
			'/js/MainMenu.js',
			'/js/main.js',
		));
		
		echo $scriptPack->toHtml();
		?>
		
    </body>
</html>
