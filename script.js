let context = "";
let HEIGHT = 0;
let WIDTH = 0;
let frames = 0;
let maxJump = 3;
let velocity = 6;

let floor = {
  y: 550,
  height: 50,
  color: "#ffdf70",
  render: function () {
    context.fillStyle = this.color;
    context.fillRect(0, this.y, WIDTH, this.height);
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

let obstacles = {
  _obs: [],
  colors: ["#0023F5", "#EB3324", "#FFF200", "#A349A4", "#22B14C", "#FF7F27"],
  insertTime: 0,

  insert: function () {
    this._obs.push({
      x: WIDTH,
      width: 30 + Math.floor(Math.random() * 21),
      height: 30 + Math.floor(Math.random() * 120),
      color: this.colors[Math.floor(Math.random() * 6)],
    });

    this.insertTime = 40 + Math.floor(Math.random() * 60);
  },

  update: function () {
    if (this.insertTime == 0) {
      this.insert();
    } else {
      this.insertTime--;
    }

    for (let i = 0, size = this._obs.length; i < size; i++) {
      let obs = this._obs[i];

      obs.x -= velocity;

      if (obs.x <= -obs.width) {
        this._obs.splice(i, 1);
        size--;
        i--;
      }
    }
  },

  render: function () {
    for (let i = 0, size = this._obs.length; i < size; i++) {
      let obs = this._obs[i];
      context.fillStyle = obs.color;
      context.fillRect(obs.x, floor.y - obs.height, obs.width, obs.height);
    }
  },
};

function click(event) {
  block.jump();
}

function start() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  if (WIDTH >= 600) {
    WIDTH = 600;
    HEIGHT = 600;
  }

  let canvas = document.createElement("canvas");

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

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
  obstacles.update();
}

function render() {
  context.fillStyle = "#50beff";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  floor.render();
  obstacles.render();
  block.render();
}

start();
