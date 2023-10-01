<?php

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header("Access-Control-Allow-Headers: X-Requested-With");

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Capture data from the POST array
    $json = file_get_contents('php://input');
    $data = json_decode($json);

    // Extract data from the decoded JSON object
    $firstName = $data->firstName;
    $lastName = $data->lastName;
    $email = $data->email;
    $subject = $data->subject;
    $message = $data->message;

    // Recipient email address
    // TODO: Enter your email address
    $to = 'liamatthey@icloud.com';

    // Create email content
    $emailContent = "Vorname: $firstName\n";
    $emailContent .= "Nachname: $lastName\n";
    $emailContent .= "Email: $email\n\n";
    $emailContent .= "Betreff: $subject\n\n";
    $emailContent .= "$message\n";

    $from = "From: $firstName $lastName <absender@domain.de>";

    // Send email
    $result = mail($to, $subject, $emailContent, $from);

    if ($result) {
        // Successfully sent
        http_response_code(200);
        echo 'Email sent successfully';
    } else {
        // Error while sending
        http_response_code(500);
        echo 'Error sending email';
    }
} else {
    // Invalid request
    http_response_code(400);
    echo 'Invalid request';
}
?>
