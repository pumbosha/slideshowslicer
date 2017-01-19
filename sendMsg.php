<?php
	$decoded = json_decode($_REQUEST['json']);
	$email=$decoded->sender;
    $message=$decoded->msg;
    $from="From: $email\r\nReturn-path: $email";
    $subject="Message sent using your contact form from SLICER";
    echo $email." ".$from." ".$message;
    echo mail("pumbosza@wp.pl", $subject, $message, $from); 
?> 