<?php

session_start();

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');

$request = Request::createFromGlobals();
$response = new Response();

$id = $request->query->get('id');

if (isset($_SESSION['user']) && isset($id) && is_numeric($id)) {
    $userId = $_SESSION['user']['id'];
    if ($userId != $id) {
        $response->setContent(json_encode([
            'status' => 'error',
            'message' => 'Not authenticated',
        ]));
        $response->headers->set('Content-Type', 'application/json');
        $response->setStatusCode(Response::HTTP_UNAUTHORIZED);
    } else {
        if ($request->isMethod('POST')) {
            $json = $request->getContent();
            $userData = json_decode($json, true);

            $user = R::findOne('user', ' id = ? ', [$id]);

            if ($user->id) {
                $user->username = $userData['username'] ?? $user->username;
                $user->email = $userData['email'] ?? $user->email;
                $user->name = $userData['name'] ?? $user->name;
                $user->gender = $userData['gender'] ?? $user->gender;
                $user->phoneNumber = $userData['phoneNumber'] ?? $user->phoneNumber;
                $user->avatar = $userData['avatar'] ?? $user->avatar;
                if (isset($_FILES['avatarFile'])) {
                    $file = $_FILES['avatarFile'];
                    $fileName = uniqid() . "-" . $file['name'];
                    $targetDir = __DIR__ . '/uploads/';
                    if (!file_exists($targetDir)) {
                        mkdir($targetDir, 0777, true);
                    }
                    if (move_uploaded_file($file['tmp_name'], $targetDir . $fileName)) {
                        $user->avatar = "http://{$_SERVER['HTTP_HOST']}/GoShop/api/user/uploads/" . $fileName;
                    }
                }
                $user->totalSells = $userData['totalSells'] ?? $user->totalSells;
                R::store($user);

                $response->setContent(json_encode($user->jsonSerialize()));
                $response->setStatusCode(Response::HTTP_OK);
            } else {
                $response->headers->set('Content-Type', 'application/json');
                $response->setContent(json_encode([
                    'status' => 'error',
                    'message' => 'User not found',
                ]));
                $response->setStatusCode(Response::HTTP_NOT_FOUND);
            }
        } else {
            $response->setContent(json_encode([
                'status' => 'error',
                'message' => 'Method not allowed',
            ]));
            $response->headers->set('Content-Type', 'application/json');
        }
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
