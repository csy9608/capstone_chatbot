<?php

  if(isset($_POST['send'])){
    $db_server = "us-cdbr-sl-dfw-01.cleardb.net";
    $db_id = "bb811a6cd5e48d";
    $db_password = "902c44f6";
    $db_name = "ibmx_d059eaf5fdadf65";
    $db = mysqli_connect($db_server, $db_id , $db_password, $db_name);

    if(mysqli_connect_errno())
      echo "error !";

    $menu_type=$_POST['menu_type'];
    $menu=$_POST['menu'];
    $ingredients=$_POST['ingredient'];
    $cooking_step=$_POST['cooking_step'];
    $cooking_time=$_POST['cooking_time'];
    $calorie=$_POST['calorie'];

    $query = "INSERT INTO RECIPES(menu_type, menu, ingredient, cooking_step, cooking_time, calorie) VALUES({$menu_type}, '{$menu}', '{$ingredients}', '{$cooking_step}', {$cooking_time}, {$calorie});";
    mysqli_query($db, $query);
    echo $query;

    $query = "SELECT * FROM RECIPES WHERE menu='$menu';";
    $result = mysqli_query($db, $query);
    echo $query;

    $db_server = "localhost";
    $db_id = "csy9608";
    $db_password = "tjdud9608";
    $db_name = "csy9608";
    $db = mysqli_connect($db_server, $db_id , $db_password, $db_name);
    $msg = "";

    $target = "IBM/images/".basename($_FILES['image']['name']);
    $image = "http://csy9608.cafe24.com/".$target;
    	$image_text = mysqli_real_escape_string($db, $_POST['image_text']);
      $image_temper = $_POST['temper'];

    	$sql = "INSERT INTO IMAGE(imagePath, imageTags, imageTempID) VALUES ('$image', '$image_text', $image_temper)";

    	mysqli_query($db, $sql);
    	if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
    		$msg = "Image uploaded successfully";
    	}else{
    		$msg = "Failed to upload image";
    	}
    	$result = mysqli_query($db, "SELECT * FROM IMAGE WHERE imagePath='$image'");
  }
?>

<!DOCTYPE html>
<html>
<head>
	<title>DB QUERY</title>
  <style type="text/css">
    #content{
      width: 50%;
      margin: 20px auto;
      border: 1px solid #cbcbcb;
    }
    form{
      width: 50%;
      margin: 20px auto;
    }
    form div{
      margin-top: 5px;
    }
    #img_div{
      width: 80%;
      padding: 5px;
      margin: 15px auto;
      border: 1px solid #cbcbcb;
    }
    #img_div:after{
      content: "";
      display: block;
      clear: both;
    }
    img{
      float: left;
      margin: 5px;
      width: 300px;
      height: 140px;
    }
  </style>
</head>
<body>
  <form method="POST" action="insert_recipe.php" enctype="multipart/form-data">
		<input type="hidden" name="size" value="1000000">
		<div>
			<input type="file" name="image">
      <div class="radio_group">
        <input type="radio" name="menu_type" value="1">1.normal</input>
        <input type="radio" name="menu_type" value="2">2.delivery</input>
        <input type="radio" name="menu_type" value="3">3.store24</input>
      </div>
      <input type="text" name="menu" value="" placeholder="menu">
      <input type="text" name="ingredients" value="" placeholder="ingredients">
      <input type="textarea" name="cooking_step" value="" placeholder="cooking_step">
      <input type="number" name="cooking_time" value="0" placeholder="cooking_time">
      <input type="float" name="calorie" value="" placeholder="calorie">
    </div>
			<button type="submit" name="send">SEND</button>
	</form>

<?php
	while ($row = mysqli_fetch_array($result)) {
    echo "Query Success";
    echo "<p>id : {$row['id']}</p>";
    echo "<p>menu_type : {$row['menu_type']}</p>";
    echo "<p>menu : {$row['menu']}</p>";
    echo "<p>ingredient : {$row['ingredient']}</p>";
    echo "<p>cooking_step : {$row['cooking_step']}</p>";
    echo "<p>calorie : {$row['calorie']}</p>";
    echo "<p>cooking_time : {$row['cooking_time']}</p>";
	}
?>

</body>
</html>
