<?php

header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

require_once '../config/db.php';

try {

    $sql = "SELECT * FROM personajes";

    $stmt = $conexion->prepare($sql);
    $stmt->execute();

    $personajes = $stmt->fetchAll();

    echo json_encode([
        "status" => "ok",
        "data" => $personajes
    ]);

} catch(PDOException $e){

    http_response_code(500);

    echo json_encode([
        "status" => "error",
        "message" => $e->getMessage()
    ]);
}