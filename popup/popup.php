<?php
ob_start();
$con=mysqli_connect("localhost","root","","beechart");
// Check connection
if (mysqli_connect_errno())
  {
  echo "Failed to connect to MySQL: " . mysqli_connect_error();
  }
if(isset($_POST['submit']))
{
$username=$_POST['username'];
$password=$_POST['password'];
$select="select * from login where username='$username' and password='$password'";
$exe1=mysqli_query($con,$select);
$row=mysqli_num_rows($exe1);
if($row>0)
{
echo '<h1>login.!!</h1>';
}
else
{
	echo '<h1>login failed.!!</h1>';
}
}
?>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Bee Chart</title>
<meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=yes">
<link rel='stylesheet prefetch' href="css/font.css">
<link rel="stylesheet" href="css/style_wrap.css">

  <link rel="stylesheet" href="css/bootstrap.min.css">
  <script src="js/jquery-3.1.1.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/bootstrap.js"></script>
<style>
	html, body {
  font-size: 62.5%;
  height: 500px;
  width: 325px;
  overflow: hidden;
}
</style>
</head>

<body>
	<div class="cont">
	  <div class="demo">
		<div class="login">
            <div class="img-top">
            	<img src="bee-gif.gif" class="bee-logo" alt="Cinque Terre" width="104" height="106" align="center">
            </div>
            <div class="login__form">
         		<div class="login__row">
         			<form method="post" name="formtag" action="popup.php">
		          <svg class="login__icon name svg-icon" viewBox="0 0 20 20">
		            <path d="M0,20 a10,8 0 0,1 20,0z M10,0 a4,4 0 0,1 0,8 a4,4 0 0,1 0,-8" />
		          </svg>
		          <input name="username" type="text" class="login__input name" placeholder="Username"/>
        		</div>
        
	        <div class="login__row">
	          <svg class="login__icon pass svg-icon" viewBox="0 0 20 20">
	            <path d="M0,20 20,20 20,8 0,8z M10,13 10,16z M4,8 a6,8 0 0,1 12,0" />
	          </svg>
	          <input name="password" type="password" class="login__input pass" placeholder="Password"/>
	        </div>
       
	        <button type="submit" class="btn btn-success outline sharp login__submit" name="submit">Sign In</button>
	        <p class="login__signup">Don't have an account? &nbsp;<a href="register.html">Sign up</a></p>
       		</form>
      		<!-- <div class="btn-group">
			    <button type="button" class="btn btn-primary btn-down">Screenshot Data</button>
			    <button type="button" class="btn btn-primary btn-down">HTML Data</button>
		  	</div> -->
		  	<div class="btn-group ">
			    <button type="button" class="btn btn-success sharp outline border">Screenshot Data</button>
			    <button type="button" class="btn btn-success sharp outline">HTML Data</button>
			    
			</div>
      		
      	</div>
           
            
      </div>
   
    
    </div>
    
    </div>
    
<script src='http://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>

    <!-- <script src="js/index.js"></script> -->
    
</body>

</html> 