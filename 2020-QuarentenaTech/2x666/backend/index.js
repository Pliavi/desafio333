var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

/** @type {SocketIO.Socket[]} */
const players = [];

io.on("connection", function (player) {
  player.name = `Player ${players.length}`;
  if (players.length < 2) {
    player.moves = [];
    players.push(player);
  }

  player.on("playerReady", (name) => (player.name = name));
  player.on("playerSelectXorO", (data) => playerSelectXorO(data, player));
  player.on("playerMove", (data) => playerMove(data, player));
});

function playerSelectXorO(selection, player) {
  const otherPlayer = players.find(
    (playerSocket) => player.id !== playerSocket.id
  );

  const otherPlayerSelection = selection == "O" ? "X" : "O";

  otherPlayer.send("finishSelection", {
    forcedSelection: otherPlayerSelection,
  });
}

function playerMove({ move }, player) {
  player.moves.push(move);
  console.log(player.name, player.moves);
  players.forEach((playerSocket) => {
    playerSocket.emit("playerMove", { move });
  });
  console.log("ganhouu uhuuuu", checkWinner(player));
}

function checkWinner(player) {
  const winMoves = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  const winner = winMoves.some((winMove) => {
    return winMove.every((move) => player.moves.includes(move));
  });
  console.log(player.moves);
  return winner;
}

http.listen(3000, function () {
  console.log("listening on *:3000");
});
