var express = require("express");
var v2 = express.Router();

v2.get("/:roomNo", function(request, response) { // localhost:3000/v2

  var entryIndex = -1;
  var entries=request.app.locals.entries;
  var times = false;
  console.log("JSON:-----------------")
  for(var i=0;i<entries.length;i++){
    console.log("request.params.roomNo:", request.params.roomNo);
    console.log("entries[i].roomNo:", entries[i].roomNo);
    if(entries[i].roomNo == request.params.roomNo){
      entryIndex=i;
      console.log("成功訊號") // 獲得房號
      // console.log(entries[i].roomNo) // 獲得房號
    }

    console.log(entryIndex)
    if(entryIndex!=-1 && times == false){
      response.render("enterRoom2", 
            { roomNo:request.params.roomNo,
              user: entries[entryIndex].user,
              chatContent: entries[entryIndex].chatContent});
      times = true;
    }
  }
  if(entryIndex===-1)
    response.status(404).render("404");

});




v2.get("/:roomNo/A", function(request, response) {

  var entryIndex = -1;
  var entries=request.app.locals.entries;
  var times = false;
  console.log("JSON:-----------------")
  for(var i=0;i<entries.length;i++){
    console.log("request.params.roomNo:", request.params.roomNo);
    console.log("entries[i].roomNo:", entries[i].roomNo);
    if(entries[i].roomNo == request.params.roomNo){
      entryIndex=i;
      console.log("成功訊號") // 獲得房號
      // console.log(entries[i].roomNo) // 獲得房號
    }

    console.log(entryIndex)
    if(entryIndex!=-1 && times == false){
      response.render("A", 
            { roomNo:request.params.roomNo,
              user: entries[entryIndex].user,
              chatContent: entries[entryIndex].chatContent});
      times = true;
    }
  }
  if(entryIndex===-1)
    response.status(404).render("404");
});




v2.get("/:roomNo/B", function(request, response) {

 var entryIndex = -1;
  var entries=request.app.locals.entries;
  var times = false;
  console.log("JSON:-----------------")
  for(var i=0;i<entries.length;i++){
    console.log("request.params.roomNo:", request.params.roomNo);
    console.log("entries[i].roomNo:", entries[i].roomNo);
    if(entries[i].roomNo == request.params.roomNo){
      entryIndex=i;
      console.log("成功訊號") // 獲得房號
      // console.log(entries[i].roomNo) // 獲得房號
    }

    console.log(entryIndex)
    if(entryIndex!=-1 && times == false){
      response.render("B", 
            { roomNo:request.params.roomNo,
              user: entries[entryIndex].user,
              chatContent: entries[entryIndex].chatContent});
      times = true;
    }
  }
  if(entryIndex===-1)
    response.status(404).render("404");
});





// v2.get("/A/:123", function(request, response) { // localhost:300/v2

//   response.render("A");

// });

module.exports = v2;




// 初始狀態
// v2.get("/", function(request, response) { // localhost:300/v2
//   response.render("enterRoom2");
// });

// v2.get("/A", function(request, response) { // http://localhost:3000/v2/A
//   response.render("A");
// });

// v2.get("/B", function(request, response) { // http://localhost:3000/v2/B
//   response.render("B");
// });
// 初始狀態結束