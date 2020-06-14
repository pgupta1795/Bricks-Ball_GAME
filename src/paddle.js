export class Paddle {

  constructor(game) {
    this.canvasWidth = game.canvasWidth;
    this.canvasHeight = game.canvasHeight;
    this.width = 150;
    this.height = 25;
    //create object of position so we fill x and y axis both
    this.position = {
      x: this.canvasWidth / 2 - this.width / 2,
      y: this.canvasHeight - this.height - 5
    };
    //to control speed
    this.maxSpeed = 7;
    this.speed = 0;

    console.log(this.width, this.height, this.position, this.maxSpeed, this.speed);
  }

  draw(context) {
    //x,y,width,height
    context.fillStyle = 'black';
    context.fillRect(this.position.x, this.position.y, this.width, this.height);
  }

  update(deltaTime) {
    if (!deltaTime) { return; }
    this.position.x = this.position.x + this.speed;
    if (this.position.x < 0)
      this.position.x = 0;

    if (this.position.x + this.width > this.canvasWidth)
      this.position.x = this.canvasWidth - this.width;
  }

  moveLeft() {
    this.speed = this.speed - this.maxSpeed;
  }

  moveRight() {
    this.speed = this.maxSpeed;
  }

  stop() {
    this.speed = 0;
  }
}