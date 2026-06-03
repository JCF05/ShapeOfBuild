<?php

// HEADERS CORS
header("Access-Control-Allow-Origin: http://localhost:5173");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json; charset=UTF-8");

// Manejo de preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Conexión BD
require_once '../config/db.php';

try {
    $sql = "
        SELECT 
            objetos.id,
            objetos.nombre,
            objetos.descripcion,
            objetos.rareza,
            objetos.nivel_requerido,
            categorias.nombre AS categoria
        FROM objetos
        INNER JOIN categorias ON objetos.categoria_id = categorias.id
    ";

    $stmt = $conexion->prepare($sql);
    $stmt->execute();

    $objetos = $stmt->fetchAll();

    echo json_encode([
        "status" => "ok",
        "total" => count($objetos),
        "data" => $objetos
    ]);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Error al obtener los objetos"
    ]);
}
?>