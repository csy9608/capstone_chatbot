'use strict';

const credentials = require('./service_credentials');
const mysql = require('mysql');

var con = mysql.createConnection({
  host: credentials.clearDB.host,
  user: credentials.clearDB.user,
  password: credentials.clearDB.password,
  database : credentials.clearDB.database
});

let prettify_json = (ugly_json) => {
  var pretty_json = [];
  JSON.parse(JSON.stringify(ugly_json), (u,v) => {
    pretty_json[u] = v;
  });
  return pretty_json;
}

let prettify_term_descript = (ugly_term_descript) => {
  var pretty_term_descript = "[" + ugly_term_descript['title'] + "]</br> - " + ugly_term_descript['descript'];
  return pretty_term_descript;
}

let prettify_menus = (ugly_menus) => {
  var menus = ugly_menus['menus'].split(',');
  var pretty_menus = "";
  for(var i=0; i<menus.length; i++){
      pretty_menus = pretty_menus + "</br> - " + menus[i];
  }
  return pretty_menus;
}

let prettify_recipe = (ugly_recipe) => {
  var menu = ugly_recipe['menu'];
  var image = ugly_recipe['image'];
  var ingredient = ugly_recipe['ingredient'].split('|');
  var cooking_step = ugly_recipe['cooking_step'].split('|');
  var cooking_time = ugly_recipe['cooking_time'];
  var calorie = ugly_recipe['calorie'];

  var ingredients = "";
  for(var i=0; i<ingredient.length; i++){
    ingredients = ingredients + "</br>&emsp;" + ingredient[i];
  }
  var cooking_steps = "";
  for(var i=0; i<cooking_step.length; i++){
    cooking_steps = cooking_steps + "</br>&emsp;" + cooking_step[i];
  }
  var pretty_recipe = "</br><img src='"+ image +"'' alt='image' style='width:400px;height:400px;'></br>["+ menu +"]</br> - 재료: " + ingredients +"</br> - 만드는 방법: "+ cooking_steps +"</br> - 조리 시간: "+ cooking_time +"</br> - 칼로리: " + calorie + "</br>";

  return pretty_recipe;
}

let recommend_recipe = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {

    var ingredients = context.data.ingredients;
    var menu_type = context.data.menu_type;
    var query = "SELECT menu FROM " + menu_type + " WHERE ingredient LIKE '%"+ingredients + "%'";
    if(typeof context.data.preference.priority !== undefined && context.data.preference.priority == "C"){
        query += "ORDER BY calorie ASC";
    }
    else if(typeof context.data.preference.priority !== undefined && context.data.preference.priority == "T"){
        query += "ORDER BY cooking_time ASC";
    }
    query = "SELECT GROUP_CONCAT(menu) as menus from (" + query +") as R;";
    console.log(query);

    con.query(query , function(err, result) {
      if(err)
        console.log("error ! :" + err);
      else{
        var pretty_json = prettify_json(result);
        var pretty_menus = prettify_menus(pretty_json);
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
      var query = "SELECT * FROM RECIPES WHERE menu='" + menu + "';";
      console.log(query);
      con.query(query, function(err, result){
        if(err)
          console.log("error ! :" + err);
        else{
          var pretty_json = prettify_json(result);
          var pretty_recipe = prettify_recipe(pretty_json);
          context.data.recipe_result = pretty_recipe || {};
          console.log(context.data.recipe_result);
          resolved(context);
        }
      });
    });
}


let check_id = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {
    var user_id = context.data.user_id;
    var query = "SELECT user_id FROM users WHERE user_id='" + user_id + "';";
    console.log(query);

    con.query(query, function(err, result) {
      if(err)
        console.log("error ! :" + err);
      else{
        var pretty_json = prettify_json(result);

        if(typeof pretty_json['user_id'] === 'undefined'){
          context.data.id_exists = false;
          var query = "INSERT INTO users(user_id) VALUES('" + user_id + "');";
          console.log(query);

          con.query(query, function(err, result) {
            if(err)
              console.log("error !" + err);
            else{
              context.login = true;
              console.log(context.data.id_exists);
              resolved(context);
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
    });
  });
}

let login = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {
    var user_id = context.data.user_id;
    var query = "SELECT * FROM users WHERE user_id='" + user_id + "';";
    console.log(query);
    con.query(query, function(err, result){
      if(err)
        console.log("error ! :" + err);
      else{
        var pretty_json = prettify_json(result);

        if(typeof pretty_json['user_id'] === undefined || pretty_json['user_id'] == null){
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
        resolved(context);
      }
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

          var query = "UPDATE users SET ";
          for(var j=0 ; j<settings.length; j++){
            var sub_query = settings[j]['col'] + "= '" + settings[j]['val'] + "'";
            console.log(sub_query);

            if (j != (settings.length-1)) {
              sub_query = sub_query + ",";
            }
            query = query + sub_query;
          }
          query = query + " WHERE user_id='" + user_id + "';"
          console.log(query);

          con.query(query, function(err, result){
            if(err)
              console.log("error ! :" + err);
            else{
              context.data.preference.done = true;
              resolved(context);
            }
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
      if(err)
        console.log("error ! :" + err);
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
      if(err)
        console.log("error ! :" + err);
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
