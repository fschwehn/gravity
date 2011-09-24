<?php

class G_ScriptPack
{
	/**
	 * the delivery modes:
	 */
	const DeliverOnlyPackedScripts		= 0;
	const DeliverOnlyCompiledScripts	= 1;
	const DeliverMostRecent				= 2;
	const DeliverOnlyCoffeeScripts		= 3;
	
	/**
	 * complete file path of the coffee script compiler script.
	 * @var string
	 */
	protected $coffeeScriptCompilerScript;
	
	/**
	 * the file name used for the packed script
	 * @var string
	 */
	protected $name;
	
	/**
	 * the script names registered to this pack.
	 * @var array
	 */
	protected $scriptNames;
	
	/**
	 * the delivery mode
	 * @var int
	 */
	protected $deliveryMode = 0;
	
	/**
	 * constructor
	 * 
	 * @param array $scriptNames - the scripts that will be registered to this pack
	 */
	public function __construct($name, array $scriptNames = array()) {
		$this->coffeeScriptCompilerScript = '/js/javascript/coffee-script.js';
		$this->name = $name;
		$this->scriptNames = $scriptNames;
		
		if(APPLICATION_ENV == 'development') {
			$this->deliveryMode = self::DeliverMostRecent;
		}
	}
	
	/**
	 * determines which scripts will be deliverd as either coffe- plain java- or 
	 * packed javascript. this depends on each script's processing state as well 
	 * as on the delivery mode.
	 * 
	 * @return array - array containing subarrays whose keys correspond to the type.
	 */
	protected function getScriptsToDeliver() {
		$javascripts = array();
		$coffeescripts = array();
		$publicPath = realpath(APPLICATION_PATH . '/../public');
		
		switch($this->deliveryMode) {
			case self::DeliverMostRecent : 
				foreach($this->scriptNames as $scriptName) {
					$coffeeFile		= '/js/coffee/' . $scriptName . '.coffee';
					$compiledFile	= '/js/compiled/' . $scriptName . '.js';
					$javascriptFile	= '/js/javascript/' . $scriptName . '.js';

					$coffeeFilePath		= $publicPath . $coffeeFile;
					$compiledFilePath	= $publicPath . $compiledFile;
					$javascriptFilePath	= $publicPath . $javascriptFile;

					$coffeeFileExists		= file_exists($coffeeFilePath);
					$compiledFileExists		= file_exists($compiledFilePath);
					$javascriptFileExists	= file_exists($javascriptFilePath);

					if($coffeeFileExists) {
						if($compiledFileExists) {
							if(filectime($coffeeFilePath) < filectime($compiledFilePath)) {
								$javascripts[] = $compiledFile;
							}
							else {
								$coffeescripts[] = $coffeeFile;
							}
						}
						else {
							$coffeescripts[] = $coffeeFile;
						}
					}
					else if($javascriptFileExists) {
						$javascripts[] = $javascriptFile;
					}
					else {
						throw new Zend_Exception("Script '$scriptName' could not be delivered!");
					}
				}
				break;
			default:
				throw new Zend_Exception("Unknown or unimplemented delivery mode ($this->deliveryMode)!");
		}
		
		if(count($coffeescripts)) {
			array_unshift($javascripts, $this->coffeeScriptCompilerScript);
		}
		
		return array(
			'text/javascript' => $javascripts,
			'text/coffeescript' => $coffeescripts,
		);
	}
	
	/**
	 * passes the scripts to deliver to the inline script view helper.
	 * 
	 * @param Zend_View_Interface $view 
	 */
	public function attachToView(Zend_View_Interface $view) {
		$helper = $view->inlineScript();
		
		foreach($this->getScriptsToDeliver() as $type => $files) {
			foreach($files as $file) {
				$helper->appendFile($file, $type);
			}
		}
	}
	
}
