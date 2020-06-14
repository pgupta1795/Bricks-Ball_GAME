
export class InputHandler {

  constructor(paddle, game) {
    //Keyup is called when user releases a key
    document.addEventListener("keydown", event => {
      switch (event.keyCode) {
        case 37:
          paddle.moveLeft();
          break;
        case 39:
          paddle.moveRight();
          break;
        case 32://spacebar
          game.start();
          break;
        case 27://escape
          game.pause();
          break;
      }
    });

    //Keyup is called when user releases a key
    document.addEventListener("keyup", event => {
      switch (event.keyCode) {
        case 39:
          if (paddle.speed > 0)
            paddle.stop();
          break;

        case 37:
          if (paddle.speed < 0)
            paddle.stop();
          break;
      }
    });
  }
}