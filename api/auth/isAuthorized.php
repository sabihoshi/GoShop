<?php

session_start();

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

$response->setContent(false);
$response->headers->set('Content-Type', 'text/plain');
$response->setStatusCode(Response::HTTP_OK);

if (isset($_SESSION['user'])) {
    $userId = $_SESSION['user']['id'];
    $user = R::findOne('user', ' id = ? ', [$userId]);

    if ($user) {
        $response->setContent(true);
    }
}

$response->send();