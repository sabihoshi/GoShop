<?php

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

if ($request->getMethod() === "GET") {

    $id = $request->query->get('id');
    
    // Load the product with the given ID
    $product = R::load('product', $id);
    
    // Check if the product exists
    if ($product->id) {
        // The product exists, update its status
        $product->status = "active"; // Set `enabled` to 1 to activate the sell
        R::store($product);
        
        $response->setContent(json_encode([
            'status' => 'success',
            'message' => 'Product Activated Successfully',
        ]));
        $response->setStatusCode(Response::HTTP_OK);
    } else {
        // The product does not exist, set an appropriate response
        $response->setContent(json_encode([
            'status' => 'error',
            'message' => 'Product Not Found',
        ]));
        $response->setStatusCode(Response::HTTP_NOT_FOUND);
    }

    $response->headers->set('Content-Type', 'application/json');
}

$response->send();
