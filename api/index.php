<?php

header('Access-Control-Allow-Origin: *');
header('Content-type:application/json;charset=utf-8');

$url = 'data.json';
$data = file_get_contents($url);
$rooms = json_decode($data);

// echo $data;

$checkin = $_GET["checkin"];
$checkout = $_GET["checkout"];
$adults = $_GET["adults"];
$children = $_GET["children"];
   
$checkin = strtotime($checkin);
$checkout = strtotime($checkout);
$dateArray = array();
for ($i=$checkin; $i<=$checkout; $i+=86400) {  
    $dateArray[] = date("Y-m-d", $i);  
}

foreach ($rooms as $room) {
    $freeDates = array_diff($dateArray, $room->bookedDays) ;
     if($freeDates) {
        $freeRooms[] = $room;
    }
}

echo json_encode($freeRooms);
?>



