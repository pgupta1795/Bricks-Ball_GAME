import { detectCollison } from "./detectCollison.js"

export class Ball {

  constructor(game) {
    this.game = game;
    this.canvasWidth = game.canvasWidth;
    this.canvasHeight = game.canvasHeight;
    this.image = document.getElementById("ball");
    this.reset();
    this.size = 15;
  }

  reset() {
    this.position = {
      x: 10,
      y: 400
    };
    this.speed = {
      x: 4,
      y: -4
    };
  }

  draw(context) {
    context.drawImage(this.image,
      this.position.x,
      this.position.y,
      this.size,
      this.size
    );
    // context.beginPath();
    // //x,y,radius,start angle(0),end angle(2*math.PI)
    // context.arc(
    //   this.position.x,
    //   this.position.y,
    //   this.radius,
    //   0,
    //   Math.PI * 2);
    // context.fillStyle = 'red';
    // context.fill();
    // context.stroke();
  }

  update(deltaTime) {
    this.position.x = this.position.x + this.speed.x;
    this.position.y = this.position.y + this.speed.y;

    //hit wall on right,left
    if (this.position.x + this.size > this.canvasWidth || this.position.x < 0) {
      this.speed.x = -this.speed.x;
    }
    //hit wall on top,left
    if (this.position.y < 0) {
      this.speed.y = -this.speed.y;
    }

    if (this.position.y + this.size > this.canvasHeight) {
      this.game.lives--;
      this.reset();
    }

    //collision between top of paddle and bottom of ball

    if (detectCollison(this, this.game.paddle)) {
      this.speed.y = -this.speed.y;
      this.position.y = this.game.paddle.position.y - this.size;
    }
  }
}