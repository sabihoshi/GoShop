<?php

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

$id = $request->query->get('id');

if (isset($id) && is_numeric($id)) {
    $product = R::load('product', $id);

    if ($product->id) {
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent(json_encode($product->jsonSerialize()));
        $response->setStatusCode(Response::HTTP_OK);
    } else {
        $response->headers->set('Content-Type', 'application/json');
        $response->setContent('{"message": "No product found with the provided ID."}');
        $response->setStatusCode(Response::HTTP_NOT_FOUND);
    }
} else {
    $response->headers->set('Content-Type', 'application/json');
    $response->setContent('{"message": "Invalid or missing ID parameter."}');
    $response->setStatusCode(Response::HTTP_BAD_REQUEST);
}

$response->send();