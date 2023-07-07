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
    $title = $_POST['title'];
    $price = $_POST['price'];
    $description = $_POST['description'];
    $city = $_POST['city'];
    $category = $_POST['category'];
    $category_id = R::findOne('category', ' name = ? ', [$category])->id;
    $image = $_POST['image'];

    $userId = $_SESSION['user']['id'];

    $product = R::dispense('product');
    $product->seller_id = $userId;
    $product->title = $title;
    $product->price = $price;
    $product->description = $description;
    $product->city = $city;
    $product->category_id = $category_id;

    if (isset($_FILES['imageFile'])) {
        $file = $_FILES['imageFile'];
        $fileName = uniqid() . "-" . $file['name'];
        $targetDir = __DIR__ . '/uploads/';
        if (!file_exists($targetDir)) {
            mkdir($targetDir, 0777, true);
        }
        if (move_uploaded_file($file['tmp_name'], $targetDir . $fileName)) {
            $product->image = "http://{$_SERVER['HTTP_HOST']}/GoShop/api/products/uploads/" . $fileName;
        }
    } else {
        $product->image = $image;
    }

    R::store($product);

    $response->setContent(json_encode($product));
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