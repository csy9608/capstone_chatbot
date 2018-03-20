<?php

  if(isset($_POST['send'])){
    $db_server = "us-cdbr-sl-dfw-01.cleardb.net";
    $db_id = "bb811a6cd5e48d";
    $db_password = "902c44f6";
    $db_name = "ibmx_d059eaf5fdadf65";
    $db = mysqli_connect($db_server, $db_id , $db_password, $db_name);

    if(mysqli_connect_errno())
      echo "</br>"."error !"."</br>";

    $image_name = date("Ymd").uniqid().".jpg";
    $target = "images/{$image_name}";
    $image = "http://csy9608.cafe24.com/IBM/".$target;
    $menu_type=$_POST['menu_type'];
    $menu=$_POST['menu'];
    $ingredient=$_POST['ingredient'];
    $cooking_step=$_POST['cooking_step'];
    $cooking_time=$_POST['cooking_time'];
    $calorie=$_POST['calorie'];

    if (move_uploaded_file($_FILES['image']['tmp_name'], $target)) {
      $msg = "Image uploaded successfully";
      $query = "INSERT INTO RECIPES(menu_type, menu, image, ingredient, cooking_step, cooking_time, calorie) VALUES({$menu_type}, '{$menu}', '{$image}' ,'{$ingredient}', '{$cooking_step}', {$cooking_time}, {$calorie});";
      echo "</br>".$query."</br>";
      mysqli_query($db, $query);
      $query = "SELECT * FROM RECIPES WHERE menu='$menu';";
      echo "</br>".$query."</br>";
      $result = mysqli_query($db, $query);
    }
    else{
      $msg = "Failed to upload image";
    }
    echo $msg;
}
?>

<!DOCTYPE html>
<html>
<head>
	<title>Insert Recipe</title>
</head>
<body>
  <form method="POST" action="insert_recipe_img.php" enctype="multipart/form-data">
		<input type="hidden" name="size" value="1000000">
		<div>
			<input type="file" name="image">
      <div class="radio_group">
        <input type="radio" name="menu_type" value="1">1.normal</input>
        <input type="radio" name="menu_type" value="2">2.delivery</input>
        <input type="radio" name="menu_type" value="3">3.store24</input>
      </div></br>
      <input type="text" name="menu" placeholder="menu"></br>
      <textarea name="ingredient" rows="8" cols="80" placeholder="ingredients"></textarea></br>
      <textarea name="cooking_step" rows="8" cols="80" placeholder="cooking_step"></textarea></br>
      <input type="number" name="cooking_time" placeholder="cooking_time"></br>
      <input type="float" name="calorie" placeholder="calorie">
    </div>
			<button type="submit" name="send">SEND</button>
	</form>

<?php
	while ($row = mysqli_fetch_array($result)) {
    echo "Query Success";
    echo "<div id='img_div'>";
    echo "<p><img src='".$row['image']."' alt='image_load_failed' height='42' width='42'></p>";
    echo "</div>";
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
