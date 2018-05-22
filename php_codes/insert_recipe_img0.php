<?php
  if(isset($_POST['submit'])){
    $db_server = "us-cdbr-sl-dfw-01.cleardb.net";
    $db_id = "bbcec353a2bef7";
    $db_password = "a8da4683";
    $db_name = "ibmx_e2d7bb714b1c241";
    $db = mysqli_connect($db_server, $db_id , $db_password, $db_name);

    if(mysqli_connect_errno())
      echo "</br>"."error !"."</br>";

    $image_name = date("Ymd").uniqid().".jpg";
    $target = "images/{$image_name}";
    $image = "http://csy9608.cafe24.com/IBM/".$target;
    $type_id = $_POST['type_id'];
    $menu = $_POST['menu'];
    $ingredients = $_POST['ingredients'];
    $amounts = $_POST['amounts']

    $steps = "";
    for($i=0; $i<count($_POST['ingredients']); $i++){
      $steps += ("{$i}. " + $_POST['ingredients'][$i])
      if($i !== (count($_POST['ingredients'])-1))
        $steps += "|";
    }
    $time=$_POST['time'];
    $calorie=$_POST['calorie'];

    # 1. insert row in recipe table
    $query = "INSERT INTO RECIPES(`type_id`, `menu`, `image`, `steps`, `time`, `calorie`) VALUES({$type_id}, '{$menu}', '{$image}', '{$steps}', {$cooking_time}, {$calorie});";
    echo $query;

    # 2. check ingredient table and get id (if not exsits add row in ingredient table)

    # 4. insert rows in recipe+ingredient table

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
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>insert recipe</title>
    <script type="text/javascript">
      var ingredient_cnt = 0;
      var recipe_cnt = 0;

      function add_ingredient(){
        ingredient_cnt++;
        var para = document.createElement("p");

        var ingredient = document.createElement("INPUT");
        ingredient.setAttribute("type", "text");
        ingredient.setAttribute("name", "ingredients[]");
        ingredient.setAttribute("placeholder", "재료이름");

        var amount = document.createElement("INPUT");
        amount.setAttribute("type", "text");
        amount.setAttribute("name", "amounts[]");
        amount.setAttribute("placeholder", "수량");

        para.appendChild(ingredient);
        para.innerHTML += ' ';
        para.appendChild(amount);

        var element = document.getElementById("ingredients");
        element.appendChild(para);
      }
      function add_recipe(){
        recipe_cnt++;
        var para = document.createElement("p");
        para.innerHTML += ((recipe_cnt+1)+" ");

        var step = document.createElement("INPUT");
        step.setAttribute("type", "text");
        step.setAttribute("name", "steps[]");

        para.appendChild(step);

        var element = document.getElementById("steps");
        element.appendChild(para);
      }
    </script>
  </head>
  <body>
    <h1>[ 메뉴 레시피 넣기 :D ]</h1>
        <form class="" action="insert_recipe_img0.php" method="post">
          <p>● 메뉴 이름:
            <input type="text" name="menu">
          </p>
          <p>● 종류: <input type="radio" name="menu_type_id" value="1">일반레시피</input>
              <input type="radio" name="menu_type_id" value="2">배달음식</input>
              <input type="radio" name="menu_type_id" value="3">편의점꿀팁레시피</input>
          </p>
          <p>● 재료:
            <p>
                <div id="ingredients">
                  <p>
                      <input type="text" name="ingredients[]" placeholder="재료 이름">
                      <input type="text" name="amounts[]" placeholder="수량">
                  </p>
                </div>
                <button type="button" onclick="add_ingredient()">재료 추가</button>
            </p>
          </p>
          <p>● 칼로리:
            <input type="text" name="calorie">
          </p>
          <p>● 시간:
            <input type="number" name="time">
          </p>
            ● 조리방법:
            <div id="steps">
              <p>
                1.&nbsp;<input type="text" name="steps[]">
              </p>
            </div>
            <button type="button" onclick="add_recipe()">단계 추가</button>
          <p>
            ● 이미지:
            <input type="file" name="imgae">
          </p>
      </br><input type="submit" name="submit" value="레시피 업로드" style="width:100px;height:50px">
    </form>
  </body>
</html>
