<?php

class IndexController extends Zend_Controller_Action
{

    public function init()
    {
        /* Initialize action controller here */
    }

    public function indexAction()
    {
        $scriptPack = new G_ScriptPack('all', array(
			'helpers',
			'Random',
			'V2',
			'Color',
			'Resources',
			'AudioSampler',
			'GraphicsItem',
			'GraphicsScene',
			'Dot',
			'Planet',
			'SpaceShip',
			'Universe',
			'Level',
			'MainMenu',
			'main',
			'xMath',
		));
		
		$scriptPack->attachToView($this->view);
		
		$this->view->mainMenu = new A_Model_MainMenu();
    }
	

}

