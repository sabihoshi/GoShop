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

if (null === $id) {
    $response->setContent(json_encode([
        'error' => 'User ID is required'
    ]));
    $response->setStatusCode(Response::HTTP_BAD_REQUEST);
} else {
    $activeSells = R::find('product', ' seller_id = ? AND status = ?', [$id, 'active']);

    $activeSellsArray = array_values(array_map(fn($sell) => $sell->export(), $activeSells));

    $response->setContent(json_encode($activeSellsArray));
    $response->setStatusCode(Response::HTTP_OK);
}

$response->send();