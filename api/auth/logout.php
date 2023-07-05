<?php

session_start();

require_once '../vendor/autoload.php';

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

$request = Request::createFromGlobals();
$response = new Response();

if (isset($_SESSION['user'])) {
    unset($_SESSION['user']);

    if (ini_get('session.use_cookies')) {
        $params = session_get_cookie_params();
        setcookie(session_name(), '', time() - 42000,
            $params['path'], $params['domain'],
            $params['secure'], $params['httponly']
        );
    }
    session_destroy();

    $response->setContent(json_encode([
        'status' => 'success',
        'message' => 'Logged out successfully',
    ]));
    $response->headers->set('Content-Type', 'application/json');
    $response->setStatusCode(Response::HTTP_OK);
} else {
    $response->setContent(json_encode([
        'status' => 'error',
        'message' => 'Not authenticated',
    ]));
    $response->headers->set('Content-Type', 'application/json');
    $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
}

$response->send();