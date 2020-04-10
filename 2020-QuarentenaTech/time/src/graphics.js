import Phaser from "phaser";

/** @param {Phaser.Scene} scene */
const Graphics = (scene) => {
  let graphics = scene.add.graphics({
    x: 0,
    y: 0,
    lineStyle: {
      width: 8,
      color: 0xffffff,
      alpha: 1,
    },
    add: true,
  });
  function drawO(x, y) {
    graphics.strokeCircle(x, y, 17);
  }
  function drawX(x, y) {
    graphics.strokeLineShape(
      new Phaser.Geom.Line(x + 30, y + 30, x + 60, y + 60)
    );
    graphics.strokeLineShape(
      new Phaser.Geom.Line(x + 60, y + 30, x + 30, y + 60)
    );
  }

  return {
    drawO,
    drawX,
  };
};
export default Graphics;
