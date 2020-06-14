export function detectCollison(ball, gameObject) {
  let ballBottom = ball.position.y + ball.size;
  let ballTop = ball.position.y;

  let gameObjBottom = gameObject.position.y + gameObject.height;
  let gameObjTop = gameObject.position.y;
  let gameObjLeftSide = gameObject.position.x;
  let gameObjRightSide = gameObject.position.x + gameObject.width;

  if (ballBottom >= gameObjTop
    && ball.position.x >= gameObjLeftSide
    && ball.position.x + ball.size <= gameObjRightSide
    //below is for bricks and above condition is for paddle
    && ballTop <= gameObjBottom
  ) {
    return true;
  } else {
    return false;
  }
}