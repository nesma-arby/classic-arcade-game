
// Enemies our player must avoid
let Enemy = function (Ex, Ey) {
  // variables applied to each of our instances go here,
  // we've provided one for you to get started

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = "images/enemy-bug.png";
  this.x = Ex;
  this.y = Ey;

  //take a copy from x and y For Reset function
  this.intial_x = Ex;
  this.intial_y = Ey;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
  for (let i = 0; i < allEnemies.length; i++) {
    allEnemies[i].speed = 170;
  }

  // multiplying any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  this.x = this.x + this.speed * dt;

  //reset enemy's position
  if (this.x >= 500) {
    this.reset();
  }

  //handling collision with the enemies
  if (player.x >= this.x - 40 && player.x <= this.x + 40) {
    if (player.y >= this.y - 40 && player.y <= this.y + 40) {
      player.x = 200;
      player.y = 400;
    }
  }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.reset = function () {
  this.x = this.intial_x;
  this.y = this.intial_y;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

let enemy1 = new Enemy(-100, 60);
let enemy2 = new Enemy(-300, 200);
let enemy3 = new Enemy(-165, 140);
let enemy4 = new Enemy(-500, 140);

let allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

let Player = function (x, y) {
  this.sprite = "images/char-boy.png";
  this.x = x;
  this.y = y;
};

// Place the player object in a variable called player
let player = new Player(200, 400);

// Update the player's position, required method for game
Player.prototype.update = function () {
  if (this.y <= -18) {
    document.getElementById("result").textContent = "Congratulations!";
    setTimeout(this.reset(), 1000);
    setTimeout(resetResult, 1000);
  }
};

let resetResult = function () {
  document.getElementById("result").textContent = "";
};

// Draw the player on the screen, required method for game
Player.prototype.render = function () {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// method, which should receive user input, allowedKeys (the key which was pressed)
//and move the player according to that input.
Player.prototype.handleInput = function (inpt) {
  if (inpt === "left" && this.x > 0) this.x = this.x - 20;
  else if (inpt === "right" && this.x < 400) this.x = this.x + 20;
  else if (inpt === "up" && this.y > -50) this.y = this.y - 20;
  else if (inpt === "down" && this.y < 400) this.y = this.y + 20;
};

// method to reset player position
Player.prototype.reset = function () {
  this.x = 200;
  this.y = 400;
};

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener("keyup", function (e) {
  let allowedKeys = {
    37: "left",
    38: "up",
    39: "right",
    40: "down"
  };

  player.handleInput(allowedKeys[e.keyCode]);
});


