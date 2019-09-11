'use strict';

const mysql = require('mysql');

var con = mysql.createConnection({
  'host':'us-cdbr-sl-dfw-01.cleardb.net',
  'user': 'bbcec353a2bef7',
  'password':'a8da4683',
  'database': 'ibmx_e2d7bb714b1c241'
});

let tts  = (id, step_num, content) => {
//  return new Promise ((resolved, rejected) => {
  var client_id = 'sdfbzl6kil';
  var client_secret = 'dqyQVC0dvijhm3auFpcrqXatDOEtg6SaQd0nvYKf';
  var fs = require('fs');
  var api_url = 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts';
  var request = require('request');
  var options = {
      url: api_url,
      form: { speaker: 'mijin', speed: '0' , text: content },
      headers: { 'X-NCP-APIGW-API-KEY-ID': client_id, 'X-NCP-APIGW-API-KEY': client_secret },
  };
  console.log(id+ " " + step_num + " " + content);
  var writeStream = fs.createWriteStream('./mp3/'+id + '_'+ step_num +'.mp3');
  var _req = request.post(options).on('response', function(response) {
    console.log(response.statusCode); // 200
    console.log(response.headers['content-type']);
    _req.pipe(writeStream); // file로 출력
  });
};

let get_recipe = () => {
    var query = "SELECT `id`, `steps` FROM recipe WHERE id>=8051;";

    console.log(query);
    con.query(query, function(err, result){
      if(err){
        console.log("error ! :" + err);
      }
      else{
        for (var i=0 ; i<result.length ; i++){
          var id = result[i]['id'];
          var steps = result[i]['steps'].split('|');
          for (var j=0 ; j<steps.length; j++){
              tts(id, j+1, steps[j]);
          }
        }
      }
    });
}

get_recipe();
