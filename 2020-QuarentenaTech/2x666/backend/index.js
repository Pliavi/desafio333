var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

/** @type {SocketIO.Socket[]} */
const players = [];
let playerTurn = 0;

io.on("connection", function (player) {
  if (players.length < 2) {
    player.score = 0;
    player.name = `Player ${players.length}`;
    player.moves = [];
    players.push(player);
  }

  player.on("disconnect", () => {
    const winnerPlayer = players.find(
      (findPlayer) => player.id !== findPlayer.id
    );
    winnerPlayer.send("winner");
  });

  player.on("playerReady", (name) => (player.name = name));
  player.on("playerMove", (data) => playerMove(data, player));
});

function playerMove({ move }, player) {
  if (canMove(move)) {
    if (player.id == players[playerTurn].id) {
      player.moves.push(move);
      console.log(player.name, player.moves);

      players[playerTurn].emit("playerMove", { move, player: "you" });
      playerTurn = playerTurn == 0 ? 1 : 0;
      players[playerTurn].emit("playerMove", { move, player: "enemy" });

      players[playerTurn].send("Your Turn");
      checkWinner(player);
    } else {
      player.send("Not your Turn");
    }
  } else {
    console.log("Not Permitted this move");
  }
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
  const winner = winMoves.some((winMove) =>
    winMove.every((move) => player.moves.includes(move))
  );
  if (winner) {
    player.score++;
  }
  return winner;
}

function canMove(move) {
  const hasMove = players.some((player) => player.moves.includes(move));
  return !hasMove;
}

http.listen(3000, function () {
  console.log("listening on *:3000");
});
