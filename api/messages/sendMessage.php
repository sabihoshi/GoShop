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
    $chatId = $content['chatId'];
    $messageText = $content['message'];

    $userId = $_SESSION['user']['id'];

    $message = R::dispense('conversation');
    $message->sender_id = $userId;
    $message->chat_id = $chatId;
    $message->message = $messageText;
    R::store($message);

    $chat = R::findOne('chat', ' id = ? ', [$chatId]);

    $response->setContent(json_encode($chat->jsonSerialize()));
    $response->setStatusCode(Response::HTTP_OK);
} else {
    $response->setContent(json_encode([
        'status' => 'error',
        'message' => 'Not authenticated',
    ]));
    $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
}

$response->headers->set('Content-Type', 'application/json');
$response->send();