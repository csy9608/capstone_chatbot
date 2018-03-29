// util/mysql.js

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

  con.connect(function(err) {
    if (err) {
      console.log("error occured!");
      throw err;
    }

    else{
      return new Promise((resolved, rejected) => {
        var ingredients = context.data.ingredients;
        var menu_type = context.data.menu_type;
        var query = "SELECT menu FROM " + menu_type + " WHERE ingredient LIKE '%"+ingredients + "%'";
//        console.log(query);

        con.query(query, function(err, result){
          if(err){
            console.log("error ! :" + err);
            throw err;
          }

          else{
            var menus = [];
            JSON.parse(JSON.stringify(result), (u,v) => {
              menus[u] = v;
            });
            context.data.recom_menu_list = JSON.stringify(result) || {};
            console.log(context.data.recom_menu_list);
            con.end();
            resolved(context);
          }
        });
      });
    }
  });
}


let search_recipe = (context) => {
    context.command = undefined;
    context.need_conversation = true;

    con.connect(function(err) {
      if (err) {
        console.log("error occured!");
        throw err;
      }

      else{
        return new Promise((resolved, rejected) => {
          var menu = context.data.menu;
          var query = "SELECT * FROM RECIPES WHERE menu='" + menu + "'";
          con.query(query, function(err, result){
            if(err){
              console.log("error ! :" + err);
              throw err;
            }

            else{
              context.data = {};
              console.log(JSON.stringify(result));
              context.data.recipe_result = refine_recipe(result) || {};
              console.log(context.data.recipe_result);
              con.end();
              resolved(context);
            }
        });
      });
    }
  });
}

let check_id = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  con.connect(function(err) {
    if (err) {
      console.log("error occured!");
      throw err;
    }

    else{
      return new Promise((resolved, rejected) => {
        var user_id = context.data.user_id;
        var query = "SELECT user_id FROM users WHERE user_id='" + user_id + "'";
//        console.log(query);

        con.query(query, function(err, result){
          if(err){
            console.log("error ! :" + err);
            throw err;
          }

          else{
            var pretty_result = [];
            JSON.parse(JSON.stringify(result), (u,v) => {
              pretty_result[u] = v;
            });
            if(pretty_result['user_id'] == undefined){
              context.data.id_exists = false;
              con.query("INSERT INTO users(user_id) VALUES('" + pretty_result['user_id'] + "');");
            }
            else{
              context.data.id_exists = true;
              context.data.user_id = undefined;
            }

            console.log(context.data.id_exists);
            con.end();
            resolved(context);
          }
        });
      });
    }
  });
}

let login = (context) => {
  context.command = undefined;
  context.need_conversation = true;

  con.connect(function(err) {
    if (err) {
      console.log("error occured!");
      throw err;
    }

    else{
      return new Promise((resolved, rejected) => {
        var user_id = context.data.user_id;
        var query = "SELECT * FROM users WHERE user_id='" + user_id + "'";
//        console.log(query);

        con.query(query, function(err, result){
          if(err){
            console.log("error ! :" + err);
            throw err;
          }

          else{
            var pretty_result = [];
            JSON.parse(JSON.stringify(result), (u,v) => {
              pretty_result[u] = v;
            });
            if(pretty_result['user_id'] == undefined){
              context.login = false;
              context.data.user_id = undefined;
            }
            else{
              context.login = true;
              context.data.preference.allergy = pretty_result['allergy'];
              context.data.preference.priority = pretty_result['priority'];
              context.data.preference.likes = pretty_result['likes'];
              context.data.preference.hates = pretty_result['hates'];
            }

            console.log(context.data.login);
            con.end();
            resolved(context);
          }
        });
      });
    }
  });
}


let user_settings = (context) => {

  context.command = undefined;
  context.need_conversation = true;

  con.connect(function(err) {
    if (err) {
      console.log("error occured!");
      throw err;
    }

    else{
      return new Promise((resolved, rejected) => {
        var user_id = context.data.user_id;
        var allergy = context.data.preference.allergy;
        var priority = context.data.preference.priority;
        var likes = context.data.preference.likes;
        var hates = context.data.preference.hates;
        var settings = []

        if (allergy != undefined){
            settings.push({col:'allergy', val:allergy});
        }

        if (priority != undefined){
            settings.push({col:'priority', val:priority});
        }

        if (likes != undefined){
            settings.push({col:'likes', val:likes});
        }

        if (hates != undefined){
            settings.push({col:'hates', val:hates});
        }

        for(var j=0 ; j<settings.length; j++){
          var query = "UPDATE users SET " +  settings[j]['col'] + "='" + settings[j]['val'] + "' WHERE user_id='" + user_id + "';";
          con.query(query, function(err, result){
            ixf(err)
            {
              console.log("error ! :" + err);
              throw err;
            }
          });
        }

        resolved(context);
      });
    }
  });
}

module.exports = {
    'recommend_recipe': recommend_recipe,
    'search_recipe' : search_recipe,
    'check_id' : check_id,
    'login' : login,
    "user_settings" : user_settings
};
