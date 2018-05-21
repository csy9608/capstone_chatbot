<?php

  if(isset($_POST['send'])){
    $db_server = "210.94.185.46:3306";
    $db_id = "root";
    $db_password = "choi";
    $db_name = "recipe_bot";
    $db = mysqli_connect($db_server, $db_id , $db_password, $db_name);

    if(mysqli_connect_errno())
      echo "error !";

    $query = $_POST['query'];
    echo "<p>".$query."</p>";
    $result = mysqli_query($db, $query);
    while ($row = mysqli_fetch_array($result)) {
      echo "<p>";
      foreach ($row as $key => $val) {
          echo "{$key}:{$val}";
          echo "<br>";
      }
      echo "</p>";
    }
    mysqli_close($db);
  }
?>

<!DOCTYPE html>
<html>
<head>
	<title>DB QUERY</title>
</head>
<body>
<form class="" action="db_query0.php" method="post">
  <textarea name="query" rows="8" cols="80"></textarea></br>
  <input type="submit" name="send" value="send">
</form>

<?php

?>

</body>
</html>
