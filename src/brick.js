import { detectCollison } from "./detectCollison.js"
export class Brick {

  constructor(game, position) {
    this.game = game;
    this.canvasWidth = game.canvasWidth;
    this.canvasHeight = game.canvasHeight;
    this.image = document.getElementById("brick");
    this.position = position;
    this.width = 50;
    this.height = 25;
    this.markedForDeletion = false;
  }

  update(deltaTime) {
    if (detectCollison(this.game.ball, this)) {
      this.game.ball.speed.y = -this.game.ball.speed.y
      this.markedForDeletion = true;
    }
  }

  draw(context) {
    context.drawImage(this.image,
      this.position.x,
      this.position.y,
      this.width,
      this.height);
  }
}