<?php
    $db_server = "us-cdbr-sl-dfw-01.cleardb.net";
    $db_id = "bb811a6cd5e48d";
    $db_password = "902c44f6";
    $db_name = "ibmx_d059eaf5fdadf65";
    $db = mysqli_connect($db_server, $db_id , $db_password, $db_name);
    $response = array();

    if(mysqli_connect_errno()){
      $response['error'] = true;
    }

    else{
      $query = $_POST['query'];
      $result = mysqli_query($db, $query);
      while($row = mysqli_fetch_array($result)){
          array_push($response, $row);
      }
      mysqli_close($db);
    }

    echo json_encode($response);
?>
