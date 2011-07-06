<?php
function respond(array $data = array()) {
	exit(json_encode($data));
}

function error($message) {
	respond(array(
		'error' => $message
	));
}

if(!isset($_REQUEST['action'])) {
	error('missing action!');
}

$action = $_REQUEST['action'];

switch($action) {
	case 'getLevel':
		if(!isset($_REQUEST['levelId'])) {
			error('missing levelId!');
		}
		
		$levelId = $_REQUEST['levelId'];
		$filePath = "levels/$levelId.json";
		$json = file_get_contents($filePath);
		
		respond(array(
			'level' => $json
		));
	default:
		error("Undefined action '$action'!");
}
