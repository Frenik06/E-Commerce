<?php
require_once 'cors.php';
require_once '../config/db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents("php://input"));

    if (!empty($data->name) && !empty($data->email) && !empty($data->password)) {
        // Check if email exists
        $check = $pdo->prepare('SELECT id FROM users WHERE email = ?');
        $check->execute([$data->email]);
        if ($check->rowCount() > 0) {
            http_response_code(400);
            echo json_encode(['error' => 'Email already exists']);
            exit;
        }

        $hashedPassword = password_hash($data->password, PASSWORD_DEFAULT);
        $stmt = $pdo->prepare('INSERT INTO users (name, email, password) VALUES (?, ?, ?)');
        
        if ($stmt->execute([$data->name, $data->email, $hashedPassword])) {
            http_response_code(201);
            echo json_encode(['message' => 'User registered successfully']);
        } else {
            http_response_code(500);
            echo json_encode(['error' => 'Failed to register user']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'Incomplete data']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
