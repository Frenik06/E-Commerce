<?php
$host = 'localhost';
$db   = 'ecommerce_db';
$user = 'root';
$pass = 'Frenik@1954';

$dsn = "mysql:host=$host;dbname=$db;charset=utf8mb4";
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false,
];

try {
    $pdo = new PDO($dsn, $user, $pass, $options);
    echo "Success!\n";
} catch (\PDOException $e) {
    echo "Error: " . $e->getMessage() . "\n";
}
?>
