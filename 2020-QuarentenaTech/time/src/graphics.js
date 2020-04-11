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
    const graphics = scene.add.graphics();
    graphics.x = x;
    graphics.y = y;
    graphics.lineStyle(8, 0xbe9fe1, 1);

    graphics.strokePoints(
      [
        { x: -15, y: -15 },
        { x: 15, y: 15 },
        { x: 0, y: 0 },
        { x: -15, y: 15 },
        { x: 15, y: -15 },
      ],
      false,
      false
    );
  }

  function drawClickable(pos, x, y) {
    const graphics = scene.add.graphics();
    graphics.x = x;
    graphics.y = y;
    graphics.fillStyle(0x00ff00, 1);

    const rectGeom = new Phaser.Geom.Rectangle(-28, -28, 54, 54);
    const clickable = graphics.fillRectShape(rectGeom);

    clickable.setInteractive(rectGeom, Phaser.Geom.Rectangle.Contains);
    clickable.pos = pos;
    return clickable;
  }

  function drawBoard(x, y) {
    const lineWidth = 8;
    const graphics = scene.add.graphics();
    graphics.x = x;
    graphics.y = y;
    graphics.lineStyle(lineWidth, 0xffffff, 1);

    graphics.strokeLineShape(
      new Phaser.Geom.Line(
        0,
        30 + 16 + 8 + lineWidth,
        (30 + 16 + 12) * 3 + lineWidth * 2,
        30 + 16 + 8 + lineWidth
      )
    );
    graphics.strokeLineShape(
      new Phaser.Geom.Line(
        0,
        (30 + 16 + 12) * 2 + lineWidth,
        (30 + 16 + 12) * 3 + lineWidth * 2,
        (30 + 16 + 12) * 2 + lineWidth
      )
    );
    graphics.strokeLineShape(
      new Phaser.Geom.Line(
        30 + 16 + 8 + lineWidth,
        0,
        30 + 16 + 8 + lineWidth,
        (30 + 16 + 12) * 3 + lineWidth * 2
      )
    );
    graphics.strokeLineShape(
      new Phaser.Geom.Line(
        (30 + 16 + 12) * 2 + lineWidth,
        0,
        (30 + 16 + 12) * 2 + lineWidth,
        (30 + 16 + 12) * 3 + lineWidth * 2
      )
    );
  }

  return {
    drawO,
    drawX,
    drawClickable,
    drawBoard,
  };
};
export default Graphics;
