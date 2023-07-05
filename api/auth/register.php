<?php

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use RedBeanPHP\RedException\SQL;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

if ($request->getMethod() === 'POST') {

    $json = $request->getContent();
    $userData = json_decode($json, true);

    // Extract user details from request data
    $username = $userData['username'] ?? null;
    $password = $userData['password'] ?? null;
    $repeatPassword = $userData['repeatPassword'] ?? null;
    $email = $userData['email'] ?? null;
    $name = $userData['name'] ?? null;
    $lastName = $userData['lastName'] ?? null;
    $gender = $userData['gender'] ?? null;
    $phoneNumber = $userData['phoneNumber'] ?? null;

    // Validate password match
    if ($password !== $repeatPassword) {
        $response->setContent(json_encode([
            'status' => 'error',
            'message' => 'Passwords do not match'
        ]));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_BAD_REQUEST);
        $response->send();
        die();
    }

    if ($username && $password && $email && $phoneNumber) {
        $user = R::dispense('user');

        // Set user details
        $user->username = $username;
        $user->password = password_hash($password, PASSWORD_BCRYPT);
        $user->email = $email;
        $user->name = $name;
        $user->lastName = $lastName;
        $user->gender = $gender;
        $user->phoneNumber = $phoneNumber;

        try {
            $userId = R::store($user);
        } catch (SQL $e) {
            $response->setContent(json_encode([
                'status' => 'error',
                'message' => 'Username or email already exists',
                'error' => $e->getMessage(),
            ]));
            $response->headers->set('Content-Type', 'application/json');
            $response->setStatusCode(Response::HTTP_BAD_REQUEST);
            $response->send();
            die();
        }

        $response->setContent(json_encode([
            'status' => 'success',
            'message' => 'User registered successfully',
            'user_id' => $userId
        ]));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_CREATED);
    } else {
        $response->setContent(json_encode([
            'status' => 'error',
            'message' => 'Missing fields',
        ]));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_BAD_REQUEST);
    }
} else {
    $response->setContent('Method not allowed');
    $response->setStatusCode(Response::HTTP_METHOD_NOT_ALLOWED);
}

$response->send();