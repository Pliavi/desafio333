import Phaser from "phaser";

var config = {
  type: Phaser.AUTO,
  width: 500,
  height: 500,
  scene: { preload, create, update },
  pixelArt: true,
};

const game = new Phaser.Game(config);

function preload() {}

function create() {}

function update() {}
