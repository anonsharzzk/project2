<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1" />
<meta name="viewport" content="initial-scale=1, maximum-scale=1" />

<title>Air - online personal portfolio</title>

<!-- Styleswitch JavaScript Files -->
<link rel="alternate stylesheet" type="text/css" media="screen" title="color-cream" href="css/color-cream.css" />
<link rel="alternate stylesheet" type="text/css" media="screen" title="color-light" href="css/color-light.css" />
<link rel="alternate stylesheet" type="text/css" media="screen" title="color-dark" href="css/color-dark.css" />
<script type="text/javascript" src="javascript/styleswitch.js"></script>

<script type="text/javascript">

  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-10614277-17']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();

</script>

</head>

<body>

<?php
$email_to = "sharan@gmail.com";
$name = $_POST["name"];
$email = $_POST["email"];
$url = $_POST["url"];
$message = $_POST["message"];
$text = "NAME: $name<br>
         EMAIL: $email<br>
		 URL: $url<br>		 
         MESSAGE: $message";
$headers = "MIME-Version: 1.0" . "\r\n"; 
$headers .= "Content-type:text/html; charset=utf-8" . "\r\n"; 
$headers .= "From: <$email>" . "\r\n";
mail($email_to, "Message", $text, $headers);
?>

</body>
</html>
