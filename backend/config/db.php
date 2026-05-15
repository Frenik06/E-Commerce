<?php
$host = 'localhost';
$db   = 'ecommerce_db';
$user = 'root'; // Change if using a different MySQL user
$pass = 'Frenik@1954';     // Change if using a password

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
} catch (\PDOException $e) {
    header('Content-Type: application/json');
    echo json_encode(["error" => "Database connection failed", "details" => $e->getMessage()]);
    exit;
}
?>
