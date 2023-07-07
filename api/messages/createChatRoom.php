<?php

session_start();

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

if (isset($_SESSION['user']) && $request->isMethod('POST')) {
    $content = json_decode($request->getContent(), true);
    $receiver_id = $content['receiver_id'];

    $userId = $_SESSION['user']['id'];

    $chat = R::dispense('chat');
    $chat->seller_id = $userId;
    $chat->receiver_id = $receiver_id;
    $chat_id = R::store($chat);

    $response->setContent(json_encode($chat->jsonSerialize()));
    $response->setStatusCode(Response::HTTP_OK);

}  else {
    $response->setContent(json_encode([
        'status' => 'error',
        'message' => 'Not authenticated',
    ]));
    $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
}

$response->headers->set('Content-Type', 'application/json');
$response->send();
