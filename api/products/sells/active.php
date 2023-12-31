<?php

session_start();

require_once '../../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

$id = $request->query->get('id');

if (isset($id) && is_numeric($id)) {
    $activeSells = R::find('product', ' seller_id = ? AND status = ?', [$id, 'active']);
    $activeSellsArray = array_values(array_map(fn($sell) => $sell->jsonSerialize(), $activeSells));

    $response->headers->set('Content-Type', 'application/json');
    $response->setContent(json_encode($activeSellsArray));
    $response->setStatusCode(Response::HTTP_OK);
} else {
    $response->headers->set('Content-Type', 'application/json');
    $response->setContent('{"message": "Invalid or missing ID parameter."}');
    $response->setStatusCode(Response::HTTP_BAD_REQUEST);
}

$response->send();