const width = 10;
const height = 10;
const lightMaskWidth = 14;
const lightMaskHeight = 14;

const squareSize = 64;
const fogSquareSize = squareSize / 2;
const playerSpace = 6;
let playerPos = { x: 1, y: 1 };

let root = document.documentElement;
root.style.setProperty("--squareSize", squareSize + "px");
root.style.setProperty("--playerSpace", playerSpace + "px");

//hardcode level for now
let levelArray = new Array(height);
levelArray[0] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
levelArray[1] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 1];
levelArray[2] = [1, 0, 1, 1, 1, 1, 1, 1, 0, 1];
levelArray[3] = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1];
levelArray[4] = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1];
levelArray[5] = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1];
levelArray[6] = [1, 0, 1, 0, 0, 0, 0, 1, 0, 1];
levelArray[7] = [1, 0, 1, 1, 1, 1, 1, 1, 0, 1];
levelArray[8] = [1, 0, 0, 0, 0, 0, 0, 0, 0, 1];
levelArray[9] = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1];

let lightMaskArray = new Array(lightMaskHeight);
lightMaskArray[0] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
lightMaskArray[1] = [0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0];
lightMaskArray[2] = [0, 0, 0, 2, 3, 4, 5, 5, 4, 3, 2, 0, 0, 0];
lightMaskArray[3] = [0, 0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0, 0];
lightMaskArray[4] = [0, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 0];
lightMaskArray[5] = [0, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3, 0];
lightMaskArray[6] = [0, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 0];
lightMaskArray[7] = [0, 4, 5, 6, 7, 8, 9, 9, 8, 7, 6, 5, 4, 0];
lightMaskArray[8] = [0, 3, 4, 5, 6, 7, 8, 8, 7, 6, 5, 4, 3, 0];
lightMaskArray[9] = [0, 2, 3, 4, 5, 6, 7, 7, 6, 5, 4, 3, 2, 0];
lightMaskArray[10] = [0, 0, 2, 3, 4, 5, 6, 6, 5, 4, 3, 2, 0, 0];
lightMaskArray[11] = [0, 0, 0, 2, 3, 4, 5, 5, 4, 3, 2, 0, 0, 0];
lightMaskArray[12] = [0, 0, 0, 0, 0, 0, 4, 4, 0, 0, 0, 0, 0, 0];
lightMaskArray[13] = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//create level divs
for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    let square = document.createElement("div");
    square.classList.add("square");
    square.classList.add(levelArray[x][y] ? "wall" : "walkway");
    square.style.left = x * squareSize + "px";
    square.style.top = y * squareSize + "px";
    document.body.appendChild(square);
  }
}

//create light mask divs
let offsetX = width - lightMaskWidth;
let offsetY = height - lightMaskHeight;
for (let y = 0; y < lightMaskHeight; y++) {
  for (let x = 0; x < lightMaskWidth; x++) {
    let maskSquare = document.createElement("div");
    maskSquare.id = `fog${x}_${y}`;
    maskSquare.classList.add("square", "fog");
    maskSquare.style.left = (x + offsetX) * fogSquareSize + "px";
    maskSquare.style.top = (y + offsetY) * fogSquareSize + "px";
    let type = lightMaskArray[x][y];
    if (type == 9) maskSquare.style.opacity = "0";
    if (type == 8) maskSquare.style.opacity = "0.1";
    if (type == 7) maskSquare.style.opacity = "0.2";
    if (type == 6) maskSquare.style.opacity = "0.3";
    if (type == 5) maskSquare.style.opacity = "0.4";
    if (type == 4) maskSquare.style.opacity = "0.5";
    if (type == 3) maskSquare.style.opacity = "0.7";
    if (type == 2) maskSquare.style.opacity = "0.8";
    if (type == 1) maskSquare.style.opacity = "0.9";
    if (type == 0) maskSquare.style.opacity = "1.0";
    document.body.appendChild(maskSquare);
  }
}

//create black mask around light
let leftMask = document.createElement("div");
leftMask.id = "leftMask";
leftMask.classList.add("outerMask");
leftMask.style.left = "0px";
leftMask.style.top = "0px";
leftMask.style.height = window.innerHeight + "px";
leftMask.style.width = "50px";
leftMask.style.position = "absolute";
document.body.appendChild(leftMask);

let topMask = document.createElement("div");
topMask.id = "topMask";
topMask.classList.add("outerMask");
topMask.style.left = "0px";
topMask.style.top = "0px";
topMask.style.height = "50px";
topMask.style.width = lightMaskWidth * fogSquareSize + "px";
topMask.style.position = "absolute";
document.body.appendChild(topMask);

let rightMask = document.createElement("div");
rightMask.id = "rightMask";
rightMask.classList.add("outerMask");
rightMask.style.left = (playerPos.x + 9) * fogSquareSize + "px";
rightMask.style.top = "0 px";
rightMask.style.height = window.innerHeight + "px";
rightMask.style.width = window.innerWidth - (playerPos.x + 7) * fogSquareSize + "px";
rightMask.style.position = "absolute";
document.body.appendChild(rightMask);

let bottomMask = document.createElement("div");
bottomMask.id = "bottomMask";
bottomMask.classList.add("outerMask");
bottomMask.style.left = "0 px";
bottomMask.style.top = (playerPos.x + 9) * fogSquareSize + "px";
bottomMask.style.height = window.innerHeight + "px";
bottomMask.style.width = lightMaskWidth * fogSquareSize + "px";
bottomMask.style.position = "absolute";
document.body.appendChild(bottomMask);

//make player
let player = document.createElement("div");
player.classList.add("player");
player.style.left = playerPos.x * squareSize + playerSpace / 2 + "px";
player.style.top = playerPos.y * squareSize + playerSpace / 2 + "px";
document.body.appendChild(player);

window.addEventListener("keydown", function (event) {
  const key = event.keyCode;
  const x = playerPos.x;
  const y = playerPos.y;

  switch (key) {
    case 37: //left
      if (levelArray[x - 1][y] !== 1) {
        playerPos.x--;
      }
      event.preventDefault();
      break;
    case 38: //up
      if (levelArray[x][y - 1] !== 1) {
        playerPos.y--;
      }
      event.preventDefault();
      break;
    case 39: //right
      if (levelArray[x + 1][y] !== 1) {
        playerPos.x++;
      }
      event.preventDefault();
      break;
    case 40: //down
      if (levelArray[x][y + 1] !== 1) {
        playerPos.y++;
      }
      event.preventDefault();
      break;
  }
});

function mainLoop() {
  player.style.left = playerPos.x * squareSize + playerSpace / 2 + "px";
  player.style.top = playerPos.y * squareSize + playerSpace / 2 + "px";

  computeLightMask();

  requestAnimationFrame(mainLoop);
}

function computeLightMask() {
  let offsetX = playerPos.x * squareSize; // - lightMaskWidth;
  let offsetY = playerPos.y * squareSize; // - lightMaskHeight;
  for (let y = 0; y < lightMaskHeight; y++) {
    for (let x = 0; x < lightMaskWidth; x++) {
      let maskSquare = document.getElementById(`fog${x}_${y}`);
      maskSquare.style.left = offsetX + (x - 6) * fogSquareSize + "px";
      maskSquare.style.top = offsetY + (y - 6) * fogSquareSize + "px";
      let type = lightMaskArray[x][y];
    }
  }

  //update surrounding dark mask
  let leftMask = document.getElementById("leftMask");
  let topMask = document.getElementById("topMask");
  let rightMask = document.getElementById("rightMask");
  let bottomMask = document.getElementById("bottomMask");

  leftMask.style.width = offsetX - 6 * fogSquareSize + "px";

  topMask.style.left = offsetX - 6 * fogSquareSize + "px";
  topMask.style.height = offsetY - 6 * fogSquareSize + "px";

  rightMask.style.left = offsetX + fogSquareSize * 7 + "px";
  rightMask.style.width = window.innerWidth - offsetX - fogSquareSize * 7 - 500 + "px";

  bottomMask.style.left = offsetX - 6 * fogSquareSize + "px";
  bottomMask.style.top = offsetY + 8 * fogSquareSize + "px";
  //console.log(window.innerWidth);
}

mainLoop();
