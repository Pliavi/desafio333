import Phaser from "phaser";

/** @param {Phaser.Scene} scene */
const Graphics = (scene) => {
  function drawO(x, y) {
    const graphics = scene.add.graphics();
    graphics.x = x;
    graphics.y = y;
    graphics.lineStyle(8, 0xea8a8a, 1);

    graphics.strokeCircle(0, 0, 15);
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
    clickable.on("pointerdown", function () {
      drawO(x, y);
    });
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
