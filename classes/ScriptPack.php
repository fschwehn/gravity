<?php

class ScriptPack
{
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
	 * constructor
	 * 
	 * @param array $scripts - the scripts that will be registered to this pack
	 */
	public function __construct($name, array $scripts = array()) {
		$this->name = $name;
		$this->scripts = $scripts;
	}
	
	/**
	 * returns an html string containing all scripts tags needed for this pack.
	 * 
	 * @return string 
	 */
	public function toHtml() {
		return $this->toPackedScript();
	}
	
	/**
	 * generates one single script tag.
	 * 
	 * @return string
	 */
	protected function toPackedScript() {
		$root = $_SERVER['DOCUMENT_ROOT'];
		$src = $this->name;
		
		if(APPLICATION_ENV == APPLICATION_ENV_DEVELOPMENT) {
			$data = '';
			
			// concat and save all scripts
			foreach($this->scripts as $fileName) {
				$coffeeFile	= $root . preg_replace('{\.js$}', '.coffee', $fileName);
				$jsFile		= $root . $fileName;

				// coffee script compilation
				if(file_exists($coffeeFile)) {
					if( !file_exists($jsFile) || ( filemtime($coffeeFile) > filemtime($jsFile) ) ) {
						$result;
						$text = system('coffee -cb ' . $coffeeFile, $result);
						if($text || $result) {
							die("compilation of '$coffeeFile' failed!");
						}
					}
				}
				
				$data .= file_get_contents($jsFile) . PHP_EOL;
			}
			file_put_contents($_SERVER['DOCUMENT_ROOT'] . $src, $data);
		}
		return '<script src="' . $src . '"></script>' . PHP_EOL;
	}
	
	/**
	 * generates one script tag for each script.
	 * 
	 * @return string 
	 */
	protected function toSingleTags() {
		$html = '';
	
		foreach($this->scripts as $fileName) {
			$html .= '<script src="' . $fileName . '"></script>' . PHP_EOL;
		}
		
		return $html;
	}
	
	public function pack() {
		
	}
}
