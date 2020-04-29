const findPlayer = (room, actualPlayer) => {
  if (room.length > 1) {
    return room.find((player) => player.id == actualPlayer.id);
  }

  return null;
};

const findAdversary = (room, actualPlayer) => {
  if (room.length > 1) {
    return room.find((player) => player.id !== actualPlayer.id);
  }

  return null;
};

function playerCanMove(room, turn, playerMoving, move) {
  const playerOfTheTurn = room[turn]; // XXX: O player do turno
  const isPlayerTurn = playerMoving.id == playerOfTheTurn.id;
  const isMoveable = !room.some((player) => player.moves.includes(move));

  if (!isMoveable) {
    playerMoving.emit("game_error", "forbidden move");
    return false;
  }

  if (!isPlayerTurn) {
    playerMoving.emit("game_error", "not your turn");
    return false;
  }

  return true;
}

module.exports = {
  findPlayer,
  findAdversary,
  playerCanMove,
};
