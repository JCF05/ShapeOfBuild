<?php
session_start();

header("Content-Type: application/json; charset=UTF-8");

require_once '../config/db.php';

// Leer JSON del body
$data = json_decode(file_get_contents("php://input"), true);

if (!isset($data['usuario']) || !isset($data['password'])) {
    http_response_code(400);
    echo json_encode(["error" => "Datos incompletos"]);
    exit;
}

$usuario = $data['usuario'];
$password = $data['password'];

$sql = "SELECT id, nombre_usuario, password FROM usuarios WHERE nombre_usuario = ?";
$stmt = $conexion->prepare($sql);
$stmt->execute([$usuario]);

$user = $stmt->fetch();

if (!$user || !password_verify($password, $user['password'])) {
    http_response_code(401);
    echo json_encode(["error" => "Usuario o contraseña incorrectos"]);
    exit;
}

// Login correcto
$_SESSION['usuario_id'] = $user['id'];
$_SESSION['usuario_nombre'] = $user['nombre_usuario'];

echo json_encode([
    "status" => "ok",
    "usuario" => $user['nombre_usuario']
]);
?>