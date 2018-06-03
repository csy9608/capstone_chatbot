// util/mysql1.js

'use strict';

const credentials = require('./service_credentials');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: credentials.clearDB.host,
  user: credentials.clearDB.user,
  password: credentials.clearDB.password,
  database : credentials.clearDB.database
});
const enter = "</br>";
const space = "&emsp;";

let prettify_json = (ugly_json) => {
  var pretty_json = [];
  JSON.parse(JSON.stringify(ugly_json), (u,v) => {
    pretty_json[u] = v;
  });

  return pretty_json;
}

let prettify_term_descript = (ugly_term_descript) => {
  var pretty_term_descript = "[" + ugly_term_descript['title'] + "]"+ enter +" - " + ugly_term_descript['descript'];
  return pretty_term_descript;
}

let prettify_menus = (ugly_menus) => {
  var menus = ugly_menus['menus'].split(',');
  var pretty_menus = "";
  var index = {};

  for(var i=0; i<5; i++){
        pretty_menus = pretty_menus + enter +" - " + menus[i];
  }

  return pretty_menus;
}

let prettify_recipe = (ugly_recipe) => {
  var image = "<img src='" + ugly_recipe['image'] +"' alt='image' style='width:300px;height:300px;'>";
  var menu = ugly_recipe['menu'];
  var ingredient = ugly_recipe['ingredients'].split('|');
  var cooking_step = ugly_recipe['steps'].split('|');
  var cooking_time = ugly_recipe['time'];
  var calorie = ugly_recipe['calorie'];

  var ingredients = "";
  for(var i=0; i<ingredient.length; i++){
    ingredients = ingredients + enter + space + ingredient[i];
  }
  var cooking_steps = "";
  for(var i=0; i<cooking_step.length; i++){
    cooking_steps = cooking_steps + enter + space + cooking_step[i];
  }
  var pretty_recipe = enter + image + enter + "["+ menu +"]" + enter + " - 재료: " + ingredients + enter +" - 만드는 방법: "+ cooking_steps + enter +" - 조리 시간: "+ cooking_time + enter +" - 칼로리: " + calorie + enter;

  return pretty_recipe;
}

let recommend_recipe = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {

    var ingredients = context.data.ingredients;
    var menu_type = context.data.menu_type;
    var query = "";

    for (var i=0; i<ingredients.length; i++){

      if(i!=0){
        query += " UNION ALL";
      }

      query += "(SELECT `menu` FROM " + menu_type + " WHERE `id` IN (SELECT recipe_id FROM `recipe+ingredient` WHERE `ingredient_id` IN (SELECT `id` FROM `ingredient` WHERE `name` LIKE '%" + ingredients[i] + "%')))";

/*
      if(typeof context.data.preference.priority !== undefined){
          switch (context.data.preference.priority) {
            case "CA":
              query += "ORDER BY `calorie` ASC";
              break;
            case "CD":
              query += "ORDER BY `calorie` DESC";
              break;
            case "TD":
              query += "ORDER BY `time` DESC";
              break;
            case "TA":
              query += "ORDER BY `time` ASC";
              break;
            default:
          }
    }
    */
  }

  query = "SELECT GROUP_CONCAT(`menu`) AS `menus` FROM (" + query +" LIMIT 5) as `R`;";
  console.log(query);

  con.query(query , function(err, result) {
    if(err){
      console.log("error ! :" + err);
      context.error = true;
    }
    else{
      var pretty_json = prettify_json(result);
      var pretty_menus = pretty_json['menus'];
  //    pretty_menus = pretty_menus +  prettify_menus(pretty_json);

      context.data.recom_menu_list = pretty_menus || {};
      console.log(context.data.recom_menu_list);
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
      var query = "SELECT `menu`, `image`, GROUP_CONCAT(CONCAT(`ingredient_name`, ' ', `ingredient_amount`) SEPARATOR '|') as ingredients, `steps`, `time`, `calorie` FROM (SELECT `recipe_id`,`ingredient_id`, `name` as `ingredient_name`, `amount` as `ingredient_amount` FROM `ingredient` AS `I` INNER JOIN `recipe+ingredient` AS `RI` ON `I`.`id`=`RI`.`ingredient_id`) AS `I+RI` INNER JOIN `recipe` AS `R` ON `R`.`id`=`I+RI`.`recipe_id` WHERE `menu`='" + menu + "';";
      console.log(query);
      con.query(query, function(err, result){
        if(err){
          console.log("error ! :" + err);
          context.error = true;
        }
        else{
          var pretty_json = prettify_json(result);
          var pretty_recipe = prettify_recipe(pretty_json);
          context.data.recipe_result = pretty_recipe || {};
          context.image = pretty_json['image']; // set image url (For kakaotalk photo output)
          console.log(context.data.recipe_result);
        }
        resolved(context);
      });
    });
}

let check_id = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {
    var user_id = context.data.user_id;
    var query = "SELECT id FROM user WHERE id='" + user_id + "';";
    console.log(query);

    con.query(query, function(err, result) {
      if(err){
        console.log("error ! :" + err);
        context.error = true;
      }
      else{
        var pretty_json = prettify_json(result);

        if(typeof pretty_json['id'] === 'undefined'){
          context.data.id_exists = false;
          var query = "INSERT INTO user(id) VALUES('" + user_id + "');";
          console.log(query);

          con.query(query, function(err, result) {
            if(err){
              console.log("error ! :" + err);
              context.error = true;
            }
            else{
              context.login = true;
              console.log(context.data.id_exists);
            }
          });
        }
        else{
          context.data.id_exists = true;
          context.data.user_id = undefined;
          console.log(context.data.id_exists);
          resolved(context);
        }
      }
      resolved(context);
    });
  });
}

let login = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {
    var user_id = context.data.user_id;
    var query = "SELECT * FROM user WHERE id='" + user_id + "';";
    console.log(query);
    con.query(query, function(err, result){
      if(err){
        console.log("error ! :" + err);
        context.error = true;
      }
      else{
        var pretty_json = prettify_json(result);

        if(typeof pretty_json['id'] === undefined || pretty_json['id'] == null){
          context.login = false;
          context.data.user_id = undefined;
        }
        else{
          context.login = true;
          context.data.preference = {};
          context.data.preference.allergy = pretty_json['allergy'];
          context.data.preference.priority = pretty_json['priority'];
          context.data.preference.likes = pretty_json['likes'];
          context.data.preference.hates = pretty_json['hates'];
        }
        console.log(context.data.login);
      }
      resolved(context);
    });
  });
}

let user_settings = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {
    var user_id = context.data.user_id;
    var allergy = context.data.preference.allergy;
    var priority = context.data.preference.priority;
    var likes = context.data.preference.likes;
    var hates = context.data.preference.hates;
    var settings = [];

    if(context.login){
          if (typeof allergy !== undefined && allergy != null){
              settings.push({col:'allergy', val:allergy});
          }

          if (typeof priority !== undefined && priority != null){
              settings.push({col:'priority', val:priority});
          }

          if (typeof likes !== undefined && likes != null){
              settings.push({col:'likes', val:likes});
          }

          if (typeof hates !== undefined && hates != null){
              settings.push({col:'hates', val:hates});
          }

          var query = "UPDATE user SET ";
          for(var j=0 ; j<settings.length; j++){
            var sub_query = settings[j]['col'] + "= '" + settings[j]['val'] + "'";
            console.log(sub_query);

            if (j != (settings.length-1)) {
              sub_query = sub_query + ",";
            }
            query = query + sub_query;
          }
          query = query + " WHERE id='" + user_id + "';"
          console.log(query);

          con.query(query, function(err, result){
            if(err){
              console.log("error ! :" + err);
              context.error = true;
            }
            else{
              context.data.preference.done = true;
              console.log(context.data.preference.done);
            }
            resolved(context);
          });
    }
    else {
      context.data.preference.done = false;
      resolved(context);
    }
  });
}

let search_term = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {
    var term = context.data.term;
    var query = "SELECT * FROM term WHERE title='" + term + "';";
    console.log(query);
    con.query(query, function(err, result){
      if(err){
        console.log("error ! :" + err);
        context.error = true;
      }
      else{
        var pretty_json = prettify_json(result);
        var pretty_term_descript = prettify_term_descript(pretty_json);
        context.data.term_descript = pretty_term_descript || {};
      }
      console.log(context.data.term_descript);
      resolved(context);
    });
  });
}

let recommend_meal = (context, meal) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {
    var query = "SELECT GROUP_CONCAT(menu) AS menus FROM (SELECT menu FROM " + meal + ") AS R;";
    console.log(query);
    con.query(query, function(err, result){
      if(err){
        console.log("error ! :" + err);
        context.error = true;
      }
      else{
        var pretty_json = prettify_json(result);
        var pretty_menus = prettify_menus(pretty_json);
        context.data.recom_menu_list = pretty_menus || {};
      }
      console.log(context.data.recom_menu_list);
      resolved(context);
    });
  });
}

module.exports = {
    'recommend_recipe': recommend_recipe,
    'search_recipe' : search_recipe,
    'check_id' : check_id,
    'login' : login,
    "user_settings" : user_settings,
    "search_term" : search_term,
    "recommend_meal" : recommend_meal
};
