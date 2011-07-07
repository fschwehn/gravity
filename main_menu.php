<?php

$main_menu = function() {
	$path = 'levels/';
	
	echo '<ul class="menu">';
	
	foreach(scandir($path) as $fileName) {
		$pos = stripos($fileName, '.js');
		if($pos) {
			$name = substr($fileName, 0, $pos);
			printf('<li class="ui-state-active">%s</li>', $name);
		}
	}
	
	echo '</ul>';
};

$main_menu();

