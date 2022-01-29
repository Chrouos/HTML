var express = require("express");
var api=express.Router();

var escaperoom = require('./EscapeRoom_Controller');
api.route('escaperoom')

api.route('/escaperoom')
    .get(escaperoom.list_all_entries)
    .post(escaperoom.create_an_entry)
    // .put(escaperoom.update_an_entry)
    // .delete(escaperoom.delete_an_entry);

    
api.use(function(req, res, next){
  res.status(404);
  if (req.accepts('json')) {
    return res.send({ error: 'Not found' });
  }
  res.type('txt').send('Not found');
});


// DONE 
module.exports = api;
