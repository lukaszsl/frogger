// Enemies our player must avoid
class Enemy {
	constructor(positionY) {
		// Variables applied to each of our instances go here
		this.x = 0;
		this.y = positionY;
		this.speed = {
			slow: 100,
			regular: 200,
			fast: 300
		};
		//initial speed
		this.speedLimit = this.speed.regular;


		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
	}
		// Update the enemy's position, required method for game
		// Parameter: dt, a time delta between ticks
		update(dt) {
				// You should multiply any movement by the dt parameter
				// which will ensure the game runs at the same speed for
				// all computers.
				this.x += this.speedLimit * dt;
		}

		// Draw the enemy on the screen, required method for game
		render() {
				ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
		}

		// Set speed limit
		setSpeedLimit(speedLimit) {
			switch(speedLimit) {
				case 'slow':
					this.speedLimit = this.speed.slow;
					break;
				case 'regular':
					this.speedLimit = this.speed.regular;
					break;
				case 'fast':
					this.speedLimit = this.speed.fast;
					break;
			}
		};
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
	constructor() {
		this.sprite = 'images/char-boy.png';
	}

	update(dt) {

	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	handleInput() {

	}
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy1 = new Enemy(60);
enemy1.setSpeedLimit('slow');
let enemy2 = new Enemy(180);
let enemy3 = new Enemy(320);
enemy3.setSpeedLimit('fast');

const allEnemies = [enemy1, enemy2, enemy3];

let player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
		var allowedKeys = {
				37: 'left',
				38: 'up',
				39: 'right',
				40: 'down'
		};

		player.handleInput(allowedKeys[e.keyCode]);
});
