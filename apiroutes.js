// 可以用來方便查看目前 json 的狀態
var express = require("express");
var api=express.Router();

// 輸入網址 http://localhost:3000/api/escaperoom
var escaperoom = require('./EscapeRoom_Controller'); 
api.route('escaperoom')

api.route('/escaperoom')
    .get(escaperoom.list_all_entries)
    .post(escaperoom.create_an_entry)
 
api.use(function(req, res, next){
  res.status(404);
  if (req.accepts('json')) {
    return res.send({ error: 'Not found' });
  }
  res.type('txt').send('Not found');
});

// DONE 
module.exports = api;
