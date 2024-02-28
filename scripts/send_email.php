<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $message = $_POST['message'];
    
    $to = "jostlearn@gmail.com";
    $subject = "New Message from $name";
    $body = "Name: $name\nEmail: $email\n\n$message";
    
    // Attempt to send the email
    if (mail($to, $subject, $body)) {
        echo "<p>Thank you for your message. We will contact you soon.</p>";
    } else {
        // If the email failed to send, display an error message
        echo "<p>Oops! Something went wrong while sending the email. Please try again later.</p>";
        
        // Optionally, display more detailed error information
        echo "<p>Error: " . error_get_last()['message'] . "</p>";
    }
}