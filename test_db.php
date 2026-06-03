<?php
require_once 'api/config/db.php';

echo password_hash("1234", PASSWORD_DEFAULT);

$sql = "SELECT * FROM categorias";
$stmt = $conexion->query($sql);
$categorias = $stmt->fetchAll();

echo "<h2>Conexión correcta</h2>";
echo "<pre>";
print_r($categorias);
echo "</pre>";
?>