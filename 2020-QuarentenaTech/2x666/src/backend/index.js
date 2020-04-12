var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

io.on("connection", function (socket) {
  console.log("a user connected");
  socket.on("chat message", function (msg) {
    console.log("message: " + msg);
  });
  socket.on("Player Move", function (playerMove) {
    console.log(JSON.stringify(playerMove));
  });
});

http.listen(3000, function () {
  console.log("listening on *:3000");
});
