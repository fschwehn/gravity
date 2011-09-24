<?php

class G_ScriptPack
{
	const DeliverAsJavaScript	= 0;
	const DeliverAsCoffeescript = 1;
	
	/**
	 * the file name used for the packed script
	 * @var string
	 */
	protected $name;
	
	/**
	 * the scripts registered to this pack
	 * @var array
	 */
	protected $scripts;
	
	/**
	 * the delivery mode
	 * @var int
	 */
	protected $mode = self::DeliverAsCoffeescript;
	
	/**
	 * constructor
	 * 
	 * @param array $scripts - the scripts that will be registered to this pack
	 */
	public function __construct($name, array $scripts = array()) {
		$this->name = $name;
		$this->scripts = $scripts;
	}
	
	public function attachToView(Zend_View_Interface $view) {
		$helper = $view->inlineScript();
		
		$helper->appendFile('/js/coffee-script.js');
		
		foreach($this->scripts as $file) {
			$len = strlen($file);
			
			if(strpos($file, '.js') === $len - 3) {
				$type = 'text/javascript';
			}
			else {
				$type = 'text/coffeescript';
				$file .= '.coffee';
			}
			
			$helper->appendFile($file, $type);
		}
	}
	
}
