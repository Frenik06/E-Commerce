<?php
$host = 'localhost';
$user = 'root';
$pass = 'Frenik@1954';

try {
    // Connect without database
    $pdo = new PDO("mysql:host=$host;charset=utf8mb4", $user, $pass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    
    // Read the SQL file
    $sql = file_get_contents(__DIR__ . '/database.sql');
    
    // Execute the SQL
    $pdo->exec($sql);
    
    echo "Database imported successfully!\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
?>
