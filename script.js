let context = "";
let screenHeight = 0;
let screenWidth = 0;
let frames = 0;
let maxJump = 3;

let floor = {
  y: 550,
  height: 50,
  color: "#ffdf70",
  render: function () {
    context.fillStyle = this.color;
    context.fillRect(0, this.y, screenWidth, this.height);
  },
};

let block = {
  x: 50,
  y: 0,
  height: 50,
  width: 50,
  color: "#ff4e4e",
  gravity: 1.6,
  velocity: 0,
  jumpForce: 26.6,
  numberJumps: 0,

  update: function () {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > floor.y - this.height) {
      this.y = floor.y - this.height;
    }
  },

  jump: function () {
    if (this.numberJumps < maxJump) {
      this.numberJumps++;
      this.velocity = -this.jumpForce;
      this.numberJumps = 0;
    }
  },

  render: function () {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  },
};

function click(event) {
  block.jump();
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

  block.update();
}

function render() {
  context.fillStyle = "#50beff";
  context.fillRect(0, 0, screenWidth, screenHeight);

  floor.render();
  block.render();
}

start();
