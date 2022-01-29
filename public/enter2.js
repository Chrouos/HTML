
function showEntriesChat(entries){

  var url = location.href; // 獲得當前網址
  var reg = /\/\d{2,8}/ // 正規法 數字二到八個
  var roomNo_incomplete = (reg.exec(url));
  var reg_2 = /\d+/ // 把"/"去掉
  var roomNo_path = (reg_2.exec(roomNo_incomplete));

  // 時間
  var today = new Date();
  var $list = $("#chatlist");
  $list.empty();

  entries.forEach((entry)=>{
        if(entry.roomNo == roomNo_path && entry.user){
        var $panel = $("<div>").addClass("text-white-50").addClass("text-lg-start").addClass().text(entry.user + ":" + entry.chatContent)

        $list.append($panel); // 新增進去
      }
  })

  $('#chatlist').scrollTop(9999999); // 自動拉到最下面（對話框）
}
 

function inputChat(entries){

  var $input = $("#enterChat");
  $input.empty();

  var $inputPanel = $("<form>").addClass("mb-0").addClass("text-white-50");
  $input.append($inputPanel);
  
  var $inputPart = $("<input id='inputPart' >").addClass("form-control").addClass("strap").addClass("enterChatCSS");
  $input.append($inputPart);

  // // 按下enter
  //  $inputPart.keydown(function (e){
  //   if(e.keyCode == 13){
  //       alert("WTF: "+ $inputPart.value  );
  //       // $input.contentText = " ";
  //   }
  // }) 

}


function pushChenContent(){

  var $inputPart = $("#inputPart");
  
  // 按下enter
   $inputPart.keydown(function (e){
    if(e.keyCode == 13){
      // alert("WTF: " + $inputPart.val()); // 獲得input裡面的東西

      var url = location.href; // 獲得當前網址

      var reg = /\/\d{2,8}/ // 正規法 數字二到八個
      var roomNo_incomplete = (reg.exec(url));
      var reg_2 = /\d+/ // 把"/"去掉
      var roomNo_path = (reg_2.exec(roomNo_incomplete));

      var reg_user = /A|B/
      var userName = (reg_user.exec(url));
      if(userName == '') userName = '公共空間'

      var d = ({roomNo: roomNo_path[0], user: userName[0], chatContent: $inputPart.val()})

      $.ajax({
        type: 'POST',
        url:  '/api/escaperoom',
        data: d,
        success: function (data){
          
          // data.entries.push({roomNo:1234, user:'C', chatContent: $inputPart.val() })
          // console.log(data);
          // console.log( $inputPart.val())
          $inputPart.val('') // 清空內容
        },
        error: function(){
          console.log("fail")
        }
      }); 
      
      
    }
    
  }) 

  
}

function reload(){
  $.ajax({
    type: 'GET',
    url:  '/api/escaperoom',
    // timeout: 15000, //請求限時，單位是毫秒
    error: function() {},
    success: function(data) {
      //if(data.success) console.log(data );
      if(data.success) {
        showEntriesChat(data.entries);     
        // inputChat(data.entries);      
        // pushChenContent();
      } 
    } 
  });
}

function ont_times(){
  $.ajax({
    type: 'GET',
    url:  '/api/escaperoom',
    // timeout: 15000, //請求限時，單位是毫秒
    error: function() {},
    success: function(data) {
      if(data.success) console.log(data );
      if(data.success) {
        // showEntriesChat(data.entries);     
        inputChat(data.entries);      
        pushChenContent();
      } 
    } 
  });
}



$(function() {
  var $list = $("#chatlist");
  var $input = $("#enterChat");
  // reload();
  
  ont_times();
  // inputChat(data.entries);
  // enterPost();

  // 參考: http://www.divcss.online/divcssbuju/jsrumen/ajaxrm/ajaxjc/201612/17224.html
   setInterval(reload,100);


});