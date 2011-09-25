<?php

class Bootstrap extends Zend_Application_Bootstrap_Bootstrap {

	protected function _initLoggger() {
		$this->bootstrap('Log');
		
		// send an email notification in production environment if a critical error occurs
		if(APPLICATION_ENV == 'production') {
			$mail = new Zend_Mail();
			$mail->setFrom('errors@' . $_SERVER['HTTP_HOST'])
				->addTo($_SERVER['SERVER_ADMIN']);

			$writer = new Zend_Log_Writer_Mail($mail);
			$writer->setSubjectPrependText('Errors sent via mail.');
			$writer->addFilter(Zend_Log::WARN);
			
			$this->getResource('Log')->addWriter($writer);
		}
	}

}
