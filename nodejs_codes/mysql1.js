'use strict';

const credentials = require('./service_credentials');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: credentials.clearDB.host,
  user: credentials.clearDB.user,
  password: credentials.clearDB.password,
  database : credentials.clearDB.database
});

let refine_recipe = (ugly_recipe) => {

  var refined_recipe = [];
  JSON.parse(JSON.stringify(ugly_recipe), (u,v) => {
    refined_recipe[u] = v;
  });

  var menu = refined_recipe['menu'];
  var image = refined_recipe['image'];
  var ingredient = refined_recipe['ingredient'];
  var cooking_step = refined_recipe['cooking_step'];//.split('|');
  var cooking_time = refined_recipe['cooking_time'];
  var calorie = refined_recipe['calorie'];

  var pretty_recipe = "</br><img src='"+ image +"'' alt='image' style='width:200px;height:100px;'></br>메뉴: "+ menu +"</br> 재료: " + ingredient +"</br> 만드는 방법: "+ cooking_step +"</br> 조리 시간: "+ cooking_time +"</br> 칼로리: " + calorie + "</br>";
  return pretty_recipe;
}

let recommend_recipe = (context) => {
  var ingredients = context.ingredient;
  var query = "SELECT * FROM RECIPES WHERE ingredients LIKE '%/"+ingredients + "/%';";
  con.query(query, function(err, result){
    if(err)
      console.log("error ! :" + err);
    else{
  //    context.output = JSON.stringify(result);
      return context;
    }
  });
  return new Promise((resolved, rejected) => {

  var query = ;
  console.log(query);
  con.query(query , function(err, result) {
    if(err)
      console.log(query);
    else{
      if(context.data == undefined){
        context.data = {};
      }
      else{

      }

      context.data.recipe_result = refine_recipe(result) || {};
      console.log(context.data.recipe_result);
      resolved(context);
    }
  });
  });
}

let search_recipe = (context) => {
    context.command = undefined;
    context.need_conversation = true;

    return new Promise((resolved, rejected) => {
      var menu = context.data.menu;
      var query = "SELECT * FROM RECIPES WHERE menu='" + menu + "';";
      console.log(query);
      con.query(query, function(err, result){
        if(err)
          console.log("error ! :" + err);
        else{
          context.data = {};
          context.data.recipe_result = refine_recipe(result) || {};
          console.log(context.data.recipe_result);
          resolved(context);
        }
      });
    });
};


module.exports = {
    'recommend_recipe': recommend_recipe,
    'search_recipe' : search_recipe
};
