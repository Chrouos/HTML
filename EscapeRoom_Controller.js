exports.list_all_entries = function(req, res){

  var obj={
    entries:[],
  }

  var entries=req.app.locals.entries;
  for(var i=0; i<entries.length; i++){
      obj.entries.push(entries[i]);
  }

  obj.success=true;
  res.json(obj);

}

exports.create_an_entry = function(req, res) {
  var new_entry = req.body;
  req.app.locals.entries.push(new_entry);
  console.log( 'Create new entry');

  res.json({
    success:true,
  })
};