<?php

session_start();

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

if (isset($_SESSION['user'])) {
    $userId = $_SESSION['user']['id'];
    $user = R::findOne('user', ' id = ? ', [$userId]);
    if ($user) {
        $response->setContent(json_encode($user->jsonSerialize()));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_OK);
    } else {
        $response->setContent(json_encode([
            'status' => 'error',
            'message' => 'User not found',
        ]));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_NOT_FOUND);
    }
} else {
    $response->setContent(json_encode([
        'status' => 'error',
        'message' => 'Not authenticated',
    ]));
    $response->headers->set('Content-Type', 'application/json');
    $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
}

$response->send();