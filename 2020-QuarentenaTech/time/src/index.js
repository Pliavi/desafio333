import Phaser from "phaser";
import block from "./sprites/block.png";
import block2 from "./sprites/block2.png";

var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: { preload, create, update },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  fps: {
    target: 60,
    forceSetTimeOut: true
  }
};

const game = new Phaser.Game(config);
let floor;
let player;
let cursors;
let movingBlock;
let mover;

function preload() {
  // Aqui vem as imagens
  this.load.image("block", block);
  this.load.image("block2", block2);
}

function create() {
  // Aqui os objetos
  cursors = this.input.keyboard.createCursorKeys();

  player = this.physics.add.image(100, 100, "block2");
  player.setCollideWorldBounds(true);

  floor = this.physics.add.staticGroup();
  floor.create(0, 400, "block").setScale(50, 1).refreshBody();

  this.physics.add.collider(player, floor);

  movingBlock = this.add.image(400, 60, "block");
  mover = this.tweens.add({
    targets: movingBlock,
    x: movingBlock.x - 5,
    duration: 60,
    ease: 'Quad.easeIn'
  });
}

function update() {
  // Aqui o que acontece em cada frame
  if (cursors.left.isDown && mover.isPaused()) {
    player.setVelocityX(-80);
    mover.play()
  } else if (cursors.right.isDown && mover.isPaused()) {
    player.setVelocityX(80);
  } else {
    player.setVelocityX(0);
  }
}
