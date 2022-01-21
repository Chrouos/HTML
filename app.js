// 套件區
var http = require("http");
var path = require("path");
var express = require("express");
var logger = require("morgan");
var bodyParser = require("body-parser");

var app = express();

// 設定位置 // 
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/public', express.static(__dirname + '/public'))

app.set("views", path.resolve(__dirname, "views"));
app.set("view engine", "ejs");   

// --------------------------- //

// 準備儲存的空間，預設有兩個房間為 1234 及 5678
var entries = [{roomNo:1234, user: "上天大人", chatContent: "你們被不小心困在這裡了，請同心協力一起離開！這裡是留言板，好好溝通吧！⁽⁽٩(๑˃̶͈̀ ᗨ ˂̶͈́)۶⁾⁾"},{roomNo:5678, user: "上天大人", chatContent: "這是上天大人的秘密小房間，呵呵"}]

app.locals.entries = entries;
app.use(logger("dev"));
app.use(bodyParser.urlencoded({ extended: false }));

// --------------------------- //

// 根目錄為 index 網頁顯示
app.get("/", function(request, response) {
  response.render("index" , { info: 'This is lobby'});
});

// --------------------------- //

// 輸入房號
app.get("/inputRoomNo", function(request, response) {
  response.render("inputRoomNo" , { info: 'This is inputRoomNo'});
});

// --------------------------- //

// 創建房間 GET
app.get("/createRoom", function(request, response) {
  response.render("createRoom" , { info: 'This is createRoom'});
});
// 創建房間 POST
app.post('/PostcreateRoom', function (request, response) {
    //接收資料
  entries.push({
    roomNo: request.body.roomNo,
    user: "上天大人", 
    chatContent: "又有一個人進來了呢，你們被困在這裡了，請好好加油逃脫吧"
	});

  var path = '/v2/'+ request.body.roomNo
  response.redirect(path)
  response.render(path)
})

// --------------------------- //

// 進入房間 GET
app.get("/enterRoom", function(request, response) {
  response.render("enterRoom" , { info: 'This is inside the Room'});
});
// 進入房間 POST
app.post("/PostenterRoom", function(request, response) {
   //接收資料
  entries.push({
    chatContent: request.body.chatContent
	});

  response.redirect('enterRoom')
  response.render('enterRoom')

});

// --------------------------- //

// 當不知道什麼網頁的時候
app.use(function(request, response) {
  response.status(404).render("404");
});

// --------------------------- //

// API
var api = require('./apiroutes'); 
app.use('/api', api);

var v2 = require('./v2routes'); 
app.use('/v2', v2);

// --------------------------- //

// 設定 port 為 3000
http.createServer(app).listen(3000, function() {
  console.log("ESCAPE ROOM started on port 3000.");
  console.log("http://localhost:3000/")
});

// 取得本機 IP 等...
var os = require('os');
var ifaces = os.networkInterfaces();
Object.keys(ifaces).forEach(function (ifname) {
  var alias = 0;

  ifaces[ifname].forEach(function (iface) {
    if ('IPv4' !== iface.family || iface.internal !== false) {
      // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
      return;
    }

    if (alias >= 1) {
      // this single interface has multiple ipv4 addresses
      // console.log(ifname + ':' + alias, iface.address);
    } else {
      // this interface has only one ipv4 adress
      console.log(ifname, iface.address);
    }
    ++alias;
  });
});

// en0 192.168.1.101
// eth0 10.0.0.101