var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

/** @type {SocketIO.Socket[]} */
const players = [];

io.on("connection", function (socket) {
  if (players.length < 2) {
    players.push(socket);
  }

  socket.on("playerReady", (name) => socket.name = name)
  socket.on("playerSelectXorO", (data) => playerSelectXorO(data, socket));
  socket.on("playerMove", playerMove);
});

function playerSelectXorO(selection, socket) {
  const otherPlayer = players.find(
    (playerSocket) => socket.id !== playerSocket.id
  );

  const otherPlayerSelection = selection == "O" ? "X" : "O";

  otherPlayer.send("finishSelection", {
    forcedSelection: otherPlayerSelection,
  });
}

http.listen(3000, function () {
  console.log("listening on *:3000");
});
