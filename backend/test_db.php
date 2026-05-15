<?php
try {
    $pdo = new PDO('mysql:host=localhost', 'root', 'Frenik@1954');
    echo "Connected successfully to MySQL server.\n";
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage() . "\n";
}
?>
