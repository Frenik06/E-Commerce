<?php
try {
    $pdo = new PDO('mysql:host=localhost', 'root', 'root');
    echo "Connected successfully to MySQL server.\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
?>
