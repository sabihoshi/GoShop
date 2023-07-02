<?php
   http_response_code(200);
   header("Content-Type: application/json");

$response = ['message' => 'Hello, ningen'];

echo json_encode($response);
?>