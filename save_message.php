<?php
$message = $_POST['message'];
$username = $_POST['username'];

file_put_contents('messages.txt', "$username: $message\n", FILE_APPEND);

echo json_encode(['status' => 'success']);
?>
