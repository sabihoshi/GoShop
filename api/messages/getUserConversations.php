<?php

session_start();

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

if (isset($_SESSION['user']) && $request->isMethod('GET')) {
    $userId = $_SESSION['user']['id'];

    $chats = R::find('chat', ' sender_id = ? or receiver_id = ? ', [$userId, $userId]);

    $userChats = array();
    foreach ($chats as $chat) {
        $conversation = R::find('conversation', ' chat_id = ? ', [$chat->id]);
        $userChats[] = array(
            'id' => $chat->id,
            'buyer' => R::findOne('user', $chat->receiver_id),
            'seller' => R::findOne('user', $chat->seller_id),
            'conversation' => array_values($conversation),
        );
    }

    $response->setContent(json_encode([
        'chats' => $userChats,
        'isBuyer' => false,
        'myId' => $userId,
    ]));
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