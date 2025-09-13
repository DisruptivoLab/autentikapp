<?php
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
header('Access-Control-Allow-Headers: Content-Type');

// Simple API key validation
$api_key = $_GET['key'] ?? '';
$valid_key = 'wm_auth_2025';

if ($api_key !== $valid_key) {
    http_response_code(401);
    echo json_encode(['error' => 'Unauthorized access']);
    exit;
}

// Load business data
$business_data = file_get_contents('../business.json');

if ($business_data === false) {
    http_response_code(500);
    echo json_encode(['error' => 'Data unavailable']);
    exit;
}

// Add timestamp and obfuscate source
$response = json_decode($business_data, true);
$response['_meta'] = [
    'timestamp' => time(),
    'version' => '2.1.0',
    'source' => 'wmerch_api'
];

echo json_encode($response);
?>