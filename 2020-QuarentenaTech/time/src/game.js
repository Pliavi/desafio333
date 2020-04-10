import Phaser from "phaser";
import GraphicsFactory from "./graphics";

var config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  scene: { preload, create, update },
  pixelArt: true,
};

const game = new Phaser.Game(config);

function preload() {}

function create() {
  const Graphics = GraphicsFactory(this);
  Graphics.drawO(100, 100);
  Graphics.drawX(100, 100);
}

function update() {}
