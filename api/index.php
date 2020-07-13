<?php

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$url = 'data.json';
$data = file_get_contents($url);

echo($data);

/* echo $_GET["adults"]; */


?>

