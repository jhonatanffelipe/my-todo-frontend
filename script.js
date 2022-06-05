var context = "";
let screenHeight = 0;
let screenWidth = 0;
let frames = 0;

function click(event) {
  window.alert("Olá");
}

function start() {
  screenHeight = window.innerHeight;
  screenWidth = window.innerWidth;

  if (screenWidth >= 600) {
    screenWidth = 600;
    screenHeight = 600;
  }

  let canvas = document.createElement("canvas");

  canvas.width = screenWidth;
  canvas.height = screenHeight;

  context = canvas.getContext("2d");
  document.body.appendChild(canvas);
  document.addEventListener("mousedown", click);

  loop();
}

function loop() {
  update();
  render();

  window.requestAnimationFrame(loop);
}

function update() {
  frames++;
}

function render() {
  context.fillStyle = "#50beff";
  context.fillRect(0, 0, screenWidth, screenHeight);
}

start();
