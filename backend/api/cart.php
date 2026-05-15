<?php
require_once 'cors.php';
require_once '../config/db.php';

header('Content-Type: application/json');

$method = $_SERVER['REQUEST_METHOD'];

// Expect user_id in the query params or body depending on the method
if ($method === 'GET') {
    if (!isset($_GET['user_id'])) {
        http_response_code(400);
        echo json_encode(['error' => 'user_id is required']);
        exit;
    }
    $userId = $_GET['user_id'];
    
    // Join cart with products to get product details
    $stmt = $pdo->prepare('
        SELECT c.id as cart_id, c.quantity, p.* 
        FROM cart c 
        JOIN products p ON c.product_id = p.id 
        WHERE c.user_id = ?
    ');
    $stmt->execute([$userId]);
    echo json_encode($stmt->fetchAll());
} 
elseif ($method === 'POST') {
    $data = json_decode(file_get_contents("php://input"));
    
    if (!empty($data->user_id) && !empty($data->product_id)) {
        $quantity = isset($data->quantity) ? (int)$data->quantity : 1;

        // Check if item already exists in cart
        $check = $pdo->prepare('SELECT id, quantity FROM cart WHERE user_id = ? AND product_id = ?');
        $check->execute([$data->user_id, $data->product_id]);
        $existing = $check->fetch();

        if ($existing) {
            // Update quantity
            $newQuantity = $existing['quantity'] + $quantity;
            $stmt = $pdo->prepare('UPDATE cart SET quantity = ? WHERE id = ?');
            $stmt->execute([$newQuantity, $existing['id']]);
            echo json_encode(['message' => 'Cart updated']);
        } else {
            // Insert new item
            $stmt = $pdo->prepare('INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)');
            $stmt->execute([$data->user_id, $data->product_id, $quantity]);
            echo json_encode(['message' => 'Item added to cart']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'user_id and product_id are required']);
    }
}
elseif ($method === 'PUT') {
    // Update quantity
    $data = json_decode(file_get_contents("php://input"));
    if (!empty($data->cart_id) && isset($data->quantity)) {
        if ($data->quantity <= 0) {
            // Delete if quantity 0
            $stmt = $pdo->prepare('DELETE FROM cart WHERE id = ?');
            $stmt->execute([$data->cart_id]);
            echo json_encode(['message' => 'Item removed from cart']);
        } else {
            $stmt = $pdo->prepare('UPDATE cart SET quantity = ? WHERE id = ?');
            $stmt->execute([$data->quantity, $data->cart_id]);
            echo json_encode(['message' => 'Quantity updated']);
        }
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'cart_id and quantity are required']);
    }
}
elseif ($method === 'DELETE') {
    if (isset($_GET['cart_id'])) {
        $stmt = $pdo->prepare('DELETE FROM cart WHERE id = ?');
        $stmt->execute([$_GET['cart_id']]);
        echo json_encode(['message' => 'Item removed from cart']);
    } else {
        http_response_code(400);
        echo json_encode(['error' => 'cart_id is required']);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method Not Allowed']);
}
?>
