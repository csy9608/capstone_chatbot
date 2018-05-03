<?php
  if(isset($_POST['search'])){
    $db_server = "us-cdbr-sl-dfw-01.cleardb.net";
    $db_id = "b8bffc65a004a2";
    $db_password = "9967464e";
    $db_name = "ibmx_a76885bd405e9c0";
    $db = mysqli_connect($db_server, $db_id , $db_password, $db_name);

    $menu = $_POST['menu'];
    $query = "SELECT * FROM RECIPES WHERE menu='$menu';";
    echo "</br>".$query."</br>";
    $result = mysqli_query($db, $query);

    while ($row = mysqli_fetch_array($result)) {
      echo "Search Success";
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
    mysql_close($db);
  }
?>
<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
  </head>
  <body>
    <form class="" action="search_menu_2.php" method="post">
      <input type="text" name="menu" placeholder="MENU">
      <input type="submit" name="search" value="SEARCH">
    </form>
  </body>
</html>
