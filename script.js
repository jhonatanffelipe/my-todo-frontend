let context = "";
let HEIGHT = 0;
let WIDTH = 0;
let frames = 0;
let maxJump = 3;
let velocity = 5;
let currentStatus = 0;

typeStatus = {
  play: 0,
  playing: 1,
  lost: 2,
};

floor = {
  y: 550,
  height: 50,
  color: "#ffdf70",
  render: function () {
    context.fillStyle = this.color;
    context.fillRect(0, this.y, WIDTH, this.height);
  },
};

block = {
  x: 50,
  y: 0,
  height: 50,
  width: 50,
  color: "#ff4e4e",
  gravity: 1.4,
  velocity: 0,
  jumpForce: 26.6,
  numberJumps: 0,

  update: function () {
    this.velocity += this.gravity;
    this.y += this.velocity;

    if (this.y > floor.y - this.height && currentStatus != typeStatus.lost) {
      this.y = floor.y - this.height;
      this.velocity = 0;
      this.numberJumps = 0;
    }
  },

  jump: function () {
    if (this.numberJumps < maxJump) {
      this.numberJumps++;
      this.velocity = -this.jumpForce;
    }
  },

  render: function () {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
  },
};

obstacles = {
  _obs: [],
  colors: ["#0023F5", "#EB3324", "#FFF200", "#A349A4", "#22B14C", "#FF7F27"],
  insertTime: 0,

  insert: function () {
    this._obs.push({
      x: WIDTH,
      width: 40 + Math.floor(Math.random() * 21),
      height: 30 + Math.floor(Math.random() * 100),
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

      if (
        block.x < obs.x + obs.width &&
        block.x + block.width >= obs.x &&
        block.y + block.height >= floor.y - obs.height
      ) {
        currentStatus = typeStatus.lost;
      } else if (obs.x <= -obs.width) {
        this._obs.splice(i, 1);
        size--;
        i--;
      }
    }
  },

  clear: function () {
    this._obs = [];
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
  if (currentStatus === typeStatus.playing) {
    block.jump();
  } else if (currentStatus === typeStatus.play) {
    currentStatus = typeStatus.playing;
  } else if (currentStatus === typeStatus.lost && block.y >= HEIGHT * 1.5) {
    currentStatus = typeStatus.play;
    block.velocity = 0;
    block.y = 0;
  }
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

  currentStatus = typeStatus.play;

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
  if (currentStatus === typeStatus.playing) {
    obstacles.update();
  } else if (currentStatus === typeStatus.play) {
    obstacles.clear();
  }
}

function render() {
  context.fillStyle = "#50beff";
  context.fillRect(0, 0, WIDTH, HEIGHT);

  if (currentStatus === typeStatus.play) {
    context.fillStyle = "green";
    context.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
  } else if (currentStatus === typeStatus.lost) {
    context.fillStyle = "red";
    context.fillRect(WIDTH / 2 - 50, HEIGHT / 2 - 50, 100, 100);
  } else if (currentStatus === typeStatus.playing) {
    obstacles.render();
  }

  floor.render();
  block.render();
}

start();
