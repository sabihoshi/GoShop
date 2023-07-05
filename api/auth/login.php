<?php

session_start();

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

if ($request->getMethod() === 'POST') {

    $json = $request->getContent();
    $userData = json_decode($json, true);

    $username = $userData['username'];
    $password = $userData['password'];

    $user = R::findOne('user', ' username = ? ', [$username]);

    if ($user && password_verify($password, $user->password)) {
        $_SESSION['user'] = [
            'id' => $user->id,
            'username' => $user->username,
        ];

        $response->setContent(json_encode([
            'status' => 'success',
            'message' => 'Logged in successfully',
            'user' => $user
        ]));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_OK);
    } else {
        $response->setContent(json_encode([
            'status' => 'error',
            'message' => 'Invalid credentials',
        ]));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
    }
} else {
    $response->setContent('Method not allowed');
    $response->setStatusCode(Response::HTTP_METHOD_NOT_ALLOWED);
}

$response->send();