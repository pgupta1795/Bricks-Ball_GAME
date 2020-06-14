//gameLoop - clear earlier position, update position and create again paddle and call gameLoop again
//deltaTime - how much time has passed
//lastTime - last timstamp value

import { Game } from "./game.js";

let canvas = document.getElementById("myCanvas");
let context = canvas.getContext("2d");

let canvasWidth = canvas.clientWidth
let canvasHeight = canvas.clientHeight;
let game = new Game(canvasWidth, canvasHeight);

let lastTime = 0;
function gameLoop(timeStamp) {
  let deltaTime = timeStamp - lastTime;
  lastTime = timeStamp;

  context.clearRect(0, 0, canvasWidth, canvasWidth);
  game.update(deltaTime);
  game.draw(context);
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);




