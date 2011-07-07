<?php

function main_menu() {
	$path = dirname(__FILE__) . '/levels/';
	
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

main_menu();

