import Phaser from "phaser";
import io from "socket.io-client";
import GraphicsFactory from "./graphics";

var socket = io("http://localhost:3000");
var config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  scene: { preload, create, update },
  debug: true,
};

socket.on("connect", function (socket) {
  console.log("The server Connected");
});

const game = new Phaser.Game(config);

function preload() {}

function create() {
  const Graphics = GraphicsFactory(this, socket);

  const screenSize = 500;
  const symbolSize = 30;
  const symbolBorder = 16;
  const symbolMargin = 16;
  const boardSize = 98;

  const boardPosition = (screenSize + boardSize) / 4;
  const symbolSpace = symbolSize + symbolBorder + symbolMargin;
  const symbolOffset = boardPosition - 30;

  Graphics.drawBoard(boardPosition, boardPosition);

  Graphics.drawClickable(
    0,
    symbolOffset + symbolSpace * 1,
    symbolSpace * 1 + symbolOffset
  );
  Graphics.drawClickable(
    1,
    symbolOffset + symbolSpace * 2,
    symbolSpace * 1 + symbolOffset
  );
  Graphics.drawClickable(
    2,
    symbolOffset + symbolSpace * 3,
    symbolSpace * 1 + symbolOffset
  );
  Graphics.drawClickable(
    3,
    symbolOffset + symbolSpace * 1,
    symbolSpace * 2 + symbolOffset
  );
  Graphics.drawClickable(
    4,
    symbolOffset + symbolSpace * 2,
    symbolSpace * 2 + symbolOffset
  );
  Graphics.drawClickable(
    5,
    symbolOffset + symbolSpace * 3,
    symbolSpace * 2 + symbolOffset
  );
  Graphics.drawClickable(
    6,
    symbolOffset + symbolSpace * 1,
    symbolSpace * 3 + symbolOffset
  );
  Graphics.drawClickable(
    7,
    symbolOffset + symbolSpace * 2,
    symbolSpace * 3 + symbolOffset
  );
  Graphics.drawClickable(
    8,
    symbolOffset + symbolSpace * 3,
    symbolSpace * 3 + symbolOffset
  );

  /** Ativa o clique nos objetos com setInteractive ativado */
  this.input.on("gameobjectup", function (pointer, gameObject) {
    console.log(gameObject.pos);
    gameObject.emit("clicked", gameObject);
  });
}

function update() {}
