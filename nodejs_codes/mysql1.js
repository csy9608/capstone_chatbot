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
  context.command = undefined;
  context.need_conversation = true;

  return new Promise((resolved, rejected) => {

    var ingredients = context.data.ingredients;
    var menu_type = context.data.menu_type;
    var query = "SELECT menu FROM " + menu_type + " WHERE ingredient LIKE '%"+ingredients + "%'";
    if(typeof context.data.preference.priority !== undefined && context.data.preference.priority == "C"){
        query += "ORDER BY calorie ASC;";
    }
    else if(typeof context.data.preference.priority !== undefined && context.data.preference.priority == "T"){
        query += "ORDER BY cooking_time ASC;";
    }
    else{
      query += ";";
    }
    console.log(query);

    con.query(query , function(err, result) {
      if(err)
        console.log("error ! :" + err);
      else{
        var menus = [];
        JSON.parse(JSON.stringify(result), (u,v) => {
          menus[u] = v;
        });
        context.data.recom_menu_list = JSON.stringify(result) || {};
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
          context.data.recipe_result = refine_recipe(result) || {};
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
        var pretty_result = [];
        JSON.parse(JSON.stringify(result), (u,v) => {
          pretty_result[u] = v;
        });
        if(typeof pretty_result['user_id'] === 'undefined'){
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
        var pretty_result = [];
        JSON.parse(JSON.stringify(result), (u,v) => {
          pretty_result[u] = v;
        });

        if(typeof pretty_result['user_id'] === undefined || pretty_result['user_id'] == null){
          context.login = false;
          context.data.user_id = undefined;
        }
        else{
          context.login = true;
          context.data.preference = {};
          context.data.preference.allergy = pretty_result['allergy'];
          context.data.preference.priority = pretty_result['priority'];
          context.data.preference.likes = pretty_result['likes'];
          context.data.preference.hates = pretty_result['hates'];
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
        var pretty_result = [];
        JSON.parse(JSON.stringify(result), (u,v) => {
          pretty_result[u] = v;
        });
        context.data.term_descript = JSON.stringify(result) || {};
      }
        console.log(context.data.term_descript);
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
    "search_term" : search_term
};
