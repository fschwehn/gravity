<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $this->view->scriptPack = new G_ScriptPack('/js/all.js', array(
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
		
		$this->view->mainMenu = new A_Model_MainMenu();
    }

}

