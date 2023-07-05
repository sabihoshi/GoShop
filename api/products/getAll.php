<?php

require_once '../vendor/autoload.php';

use RedBeanPHP\R as R;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

R::setup('mysql:host=localhost;dbname=goshop', 'root', '');
$request = Request::createFromGlobals();
$response = new Response();

$limit = 10;
$page = $request->query->get('page', 1);
$offset = ($page - 1) * $limit;

$query = $request->query->get('search');
$category = $request->query->get('category');

$sql = 'SELECT p.*, c.name as category FROM product p JOIN category c ON p.category_id = c.id';
$params = [];

if (!empty($query)) {
    $sql .= ' WHERE p.title LIKE ?';
    $params[] = "%$query%";
}
elseif (!empty($category) && $category !== 'all') {
    $sql .= ' WHERE c.name = ?';
    $params[] = $category;
}

$sql .= ' LIMIT ? OFFSET ?';
$params[] = $limit;
$params[] = $offset;

$products = R::getAll($sql, $params);

$response->setContent(json_encode($products));
$response->headers->set('Content-Type', 'application/json');
$response->setStatusCode(Response::HTTP_OK);
$response->send();