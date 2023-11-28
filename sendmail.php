<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'path/to/PHPMailer/src/Exception.php';
require 'path/to/PHPMailer/src/PHPMailer.php';

$mail = new PHPMailer(true);
$mail->CharSet = 'UTF-8';
$mail->setLanguage('uk', 'phpmailer/language/');
$mail->IsHTML(true);

// From who
$mail->setFrom($_POST['email'],'РадосНа');
// To whom
$mail->addAddress('lexxus07@yandex.ru');
// Email's topic
$mail->Subject = 'Hello, there is an email from website Radosna.rs';

$body.'<h1>Here is the letter</h1>';

if(trim(!empty($_POST['name']))) {
  $body.='<p><strong>Ім\'я:</strong> '.$POST['name'].'</p>';
}
if(trim(!empty($_POST['email']))) {
  $body.='<p><strong>Email:</strong> '.$POST['email'].'</p>';
}
if(trim(!empty($_POST['message']))) {
  $body.='<p><strong>Питання:</strong> '.$POST['message'].'</p>';
}

$mail->Body = $body;

if (!$mail->send()) {
  $message = 'Помилка';
} else {
  $message = 'Питання відправлено!';
}

$response = ['message' => $message];
header('Content-type: application/json');
echo json_encode($response);

?>