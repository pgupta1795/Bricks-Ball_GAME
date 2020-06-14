import { Paddle } from "./paddle.js";
import { Ball } from "./ball.js"
import { InputHandler } from "./input.js"
import { Brick } from "./brick.js";
import { level1, level2, level3, level4, level5, level6, buildLevel } from "./levels.js";


const GAMESTATE = {
  PAUSED: 0,
  RUNNING: 1,
  MENU: 2,
  GAMEOVER: 3,
  NEWLEVEL: 4
}
export class Game {

  constructor(canvasWidth, canvasHeight) {
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.state = GAMESTATE.MENU;
    this.paddle = new Paddle(this);
    this.ball = new Ball(this);
    new InputHandler(this.paddle, this);
    this.gameObjects = [];
    this.bricks = [];
    this.lives = 3;
    this.levels = [level1, level2, level3, level4, level5, level6];
    this.currentLevel = 0;
  }

  start() {
    if (this.state !== GAMESTATE.MENU && this.state !== GAMESTATE.NEWLEVEL) return;
    this.bricks = buildLevel(this, this.levels[this.currentLevel]);
    this.ball.reset();
    this.gameObjects = [this.paddle, this.ball];
    this.state = GAMESTATE.RUNNING;
  }

  update(deltaTime) {
    if (this.lives === 0) this.state = GAMESTATE.GAMEOVER;

    if (this.state === GAMESTATE.PAUSED || this.state === GAMESTATE.MENU || this.state === GAMESTATE.GAMEOVER) { return; }

    // this.paddle.update(deltaTime);
    // this.ball.update(deltaTime);

    if (this.bricks.length === 0) {
      this.currentLevel++;
      this.state = GAMESTATE.NEWLEVEL;
      this.start();
    }

    [...this.gameObjects, ...this.bricks].forEach(gameObject => gameObject.update(deltaTime));
    this.bricks = this.bricks.filter(brick => !brick.markedForDeletion);
  }

  draw(context) {
    // this.ball.draw(context);
    // this.paddle.draw(context);


    [...this.gameObjects, ...this.bricks].forEach(gameObject => gameObject.draw(context));

    context.rect(900, 500, 20, 20);
    let levelTxt = "LEVEL " + this.currentLevel;
    context.font = '20px sans-serif';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText(levelTxt, 900, 500);
    let livesTxt = "LIVES: " + this.lives;
    context.font = '20px sans-serif';
    context.fillStyle = 'black';
    context.textAlign = 'center';
    context.fillText(livesTxt, 900, 550);

    if (this.state == GAMESTATE.PAUSED) {
      context.rect(0, 0, this.canvasWidth, this.canvasHeight)
      context.fillStyle = 'rgba(0,0,0,0.5)';
      context.fill();

      context.font = '40px sans-serif';
      context.fillStyle = 'Black';
      context.textAlign = 'center';
      context.fillText("PAUSED", this.canvasWidth / 2, this.canvasHeight / 2);
    }

    if (this.state == GAMESTATE.MENU) {
      context.rect(0, 0, this.canvasWidth, this.canvasHeight)
      context.fillStyle = 'rgba(0,0,0,1)';
      context.fill();

      context.font = '40px sans-serif';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(" Press SPACEBAR to start ", this.canvasWidth / 2, this.canvasHeight / 2);
    }

    if (this.state == GAMESTATE.GAMEOVER) {
      context.rect(0, 0, this.canvasWidth, this.canvasHeight)
      context.fillStyle = 'rgba(0,0,0,1)';
      context.fill();

      context.font = '40px sans-serif';
      context.fillStyle = 'white';
      context.textAlign = 'center';
      context.fillText(" GAMEOVER ", this.canvasWidth / 2, this.canvasHeight / 2);
    }
  }

  pause() {
    if (this.state == GAMESTATE.PAUSED) {
      this.state = GAMESTATE.RUNNING;
    } else {
      this.state = GAMESTATE.PAUSED;
    }
  }
}