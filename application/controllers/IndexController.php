<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $scriptPack = new G_ScriptPack('/js/all.js', array(
			'/js/helpers',
			'/js/xMath.js',
			'/js/Random',
			'/js/V2',
			'/js/Color',
			'/js/Resources',
			'/js/AudioSampler',
			'/js/GraphicsItem',
			'/js/GraphicsScene',
			'/js/Dot',
			'/js/Planet',
			'/js/SpaceShip',
			'/js/Universe',
			'/js/Level',
			'/js/MainMenu',
			'/js/main',
		));
		
		$scriptPack->attachToView($this->view);
		
		$this->view->mainMenu = new A_Model_MainMenu();
    }
	

}

