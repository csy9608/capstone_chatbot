/**
 * Copyright 2017 IBM Corp. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

'use strict';

var express = require('express'); // app server
var bodyParser = require('body-parser'); // parser for post requests

var api = require('./api');
var app = express();

// Bootstrap application settings
app.use(express.static('./public')); // load UI from public folder
app.use(bodyParser.json());
api.initialize(app);

var client_id = 'sdfbzl6kil';
var client_secret = 'dqyQVC0dvijhm3auFpcrqXatDOEtg6SaQd0nvYKf';
var fs = require('fs');
app.get('/tts', function(req, res) {
  var api_url = 'https://naveropenapi.apigw.ntruss.com/voice/v1/tts';
  var request = require('request');
  var options = {
    url: api_url,
    form: { speaker: 'mijin', speed: '0', text: '좋은 하루 되세요' },
    headers: { 'X-NCP-APIGW-API-KEY-ID': client_id, 'X-NCP-APIGW-API-KEY': client_secret },
  };
  var writeStream = fs.createWriteStream('./tts1.mp3');
  var _req = request.post(options).on('response', function(response) {
    console.log(response.statusCode); // 200
    console.log(response.headers['content-type']);
  });
  _req.pipe(writeStream); // file로 출력
  _req.pipe(res); // 브라우저로 출력
});
app.listen(3600, function() {
  console.log('http://127.0.0.1:3600/tts app listening on port 3600!');
});
module.exports = app;
