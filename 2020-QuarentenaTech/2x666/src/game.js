import Phaser from "phaser";
import io from "socket.io-client";
import GraphicsFactory from "./graphics";

var socket = io("http://localhost:3000");
var config = {
  parent: "game",
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  scene: { preload, create, update },
  debug: true,
};

const game = new Phaser.Game(config);
let clickables = [];

function preload() {
  this.load.css({
    key: "headers",
    url: "./css/pres.css",
  });
}

function create() {
  const Graphics = GraphicsFactory(this, socket);

  socket.on("connect", function (socket) {
    console.log("The server Connected");
  });

  socket.on("game_error", console.log);
  socket.on("game_finish", console.log);

  socket.on("game_finish", (result) => {
    if (result == "you win!") {
      this.add.text(150, 200, "You \nWIN!", {
        fontSize: 50,
        fontFamily: 'Press',
        fill: "#fcf300"
      });
    }
    if (result == "you lose!") {
      this.add.text(120, 200, ' You \nLOSER!', {
        fontSize: 50,
        fontFamily: 'Press',
        fill: "#db3a34"
      });
    }
    if (result == "draw") {
      this.add.text(150, 200, "DRAW", {
        fontSize: 50,
        fontFamily: 'Press',
        fill: '#ffffff'
      });
    }
  });

  socket.on("move", ({ move, player }) => {
    console.log(move, player);
    const { x, y } = clickables[move];

    if (player == "you") {
      Graphics.drawX(x, y);
    } else {
      Graphics.drawO(x, y);
    }
  });

  const screenSize = 500;
  const symbolSize = 30;
  const symbolBorder = 16;
  const symbolMargin = 16;
  const boardSize = 98;

  const boardPosition = (screenSize + boardSize) / 4;
  const symbolSpace = symbolSize + symbolBorder + symbolMargin;
  const symbolOffset = boardPosition - 30;

  Graphics.drawBoard(boardPosition, boardPosition);

  clickables.push(
    Graphics.drawClickable(
      0,
      symbolOffset + symbolSpace * 1,
      symbolSpace * 1 + symbolOffset
    )
  );
  clickables.push(
    Graphics.drawClickable(
      1,
      symbolOffset + symbolSpace * 2,
      symbolSpace * 1 + symbolOffset
    )
  );
  clickables.push(
    Graphics.drawClickable(
      2,
      symbolOffset + symbolSpace * 3,
      symbolSpace * 1 + symbolOffset
    )
  );
  clickables.push(
    Graphics.drawClickable(
      3,
      symbolOffset + symbolSpace * 1,
      symbolSpace * 2 + symbolOffset
    )
  );
  clickables.push(
    Graphics.drawClickable(
      4,
      symbolOffset + symbolSpace * 2,
      symbolSpace * 2 + symbolOffset
    )
  );
  clickables.push(
    Graphics.drawClickable(
      5,
      symbolOffset + symbolSpace * 3,
      symbolSpace * 2 + symbolOffset
    )
  );
  clickables.push(
    Graphics.drawClickable(
      6,
      symbolOffset + symbolSpace * 1,
      symbolSpace * 3 + symbolOffset
    )
  );
  clickables.push(
    Graphics.drawClickable(
      7,
      symbolOffset + symbolSpace * 2,
      symbolSpace * 3 + symbolOffset
    )
  );
  clickables.push(
    Graphics.drawClickable(
      8,
      symbolOffset + symbolSpace * 3,
      symbolSpace * 3 + symbolOffset
    )
  );

  /** Ativa o clique nos objetos com setInteractive ativado */
  this.input.on("gameobjectup", function (pointer, gameObject) {
    console.log(gameObject.pos);
    gameObject.emit("clicked", gameObject);
  });
}

function update() {}
