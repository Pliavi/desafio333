const app = require("express")();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const utils = require("./utils.js");

/** @type {SocketIO.Socket[]} */
const room = [];
let playerTurn = 0;
let moved = 0;

io.on("connection", function (playerSocket) {
  const player = addPlayerToRoom(playerSocket);

  player.on("disconnect", () => {
    const winnerPlayer = utils.findAdversary(room, player);
    // if(winnerPlayer){
    winnerPlayer.emit("finish", "you win!");
    // }
  });

  player.on("ready", (name) => (player.name = name));
  player.on("move", (data) => playerMove(data, player));
});

function playerMove({ move }, playerMoving) {
  if (utils.playerCanMove(room, playerTurn, playerMoving, move)) {
    moved++;
    playerMoving.moves.push(move);
    playerMoving.emit("move", { move, player: "you" });

    playerTurn = playerTurn === 0 ? 1 : 0;
    const newPlayerOfTheTurn = room[playerTurn];
    newPlayerOfTheTurn.emit("move", { move, player: "enemy" });
    newPlayerOfTheTurn.emit("turn", "your turn");

    checkWinner(playerMoving);
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

  const isPlayerWinner = winMoves.some((winMove) =>
    winMove.every((move) => player.moves.includes(move))
  );

  if (isPlayerWinner) {
    player.score++;
    player.emit("game_finish", "you win!");
    playerTurn = -1;
    const loser = utils.findAdversary(room, player);
    loser.emit("game_finish", "you lose!");
  }

  if (moved == 9 && !isPlayerWinner) {
    player.emit("game_finish", "draw");
    const adversary = utils.findAdversary(room, player);
    adversary.emit("game_finish", "draw");
    return false;
  }
}

function addPlayerToRoom(playerSocket) {
  const playersInRoom = room.length;
  const player = playerSocket;

  player.score = 0;
  player.name = "Player" + room.length;
  player.moves = [];

  if (playersInRoom < 2) {
    room.push(player);

    return player;
  }

  return playerSocket;
}

http.listen(3000, function () {
  console.log("listening on *:3000");
});