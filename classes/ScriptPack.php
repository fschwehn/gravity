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
//		return $this->toSingleTags();
		return $this->toPackedScript();
	}
	
	/**
	 * generates one single script tag.
	 * 
	 * @return string
	 */
	protected function toPackedScript() {
		$src = $this->name;
		
		if(APPLICATION_ENV == APPLICATION_ENV_DEVELOPMENT) {
			// concat and save all scripts
			$data = '';
			foreach($this->scripts as $fileName) {
				$filePath = $_SERVER['DOCUMENT_ROOT'] . $fileName;
				$data .= file_get_contents($filePath) . PHP_EOL;
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
