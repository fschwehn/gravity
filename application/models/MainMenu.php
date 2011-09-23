<?php

/**
 * Description of MainMenu
 *
 * @author fschwehn
 */
class A_Model_MainMenu {
	public function toHtml() 
	{
		$path = APPLICATION_PATH . '/../public/levels/';

		$html = '<ul class="menu">';

		foreach(scandir($path) as $fileName) {
			$pos = stripos($fileName, '.js');
			if($pos) {
				$name = substr($fileName, 0, $pos);
				$html .= sprintf('<li class="ui-state-active">%s</li>', $name);
			}
		}

		$html .= '</ul>';
		
		return $html;
	}
	
}
