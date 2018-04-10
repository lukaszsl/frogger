// Enemies our player must avoid
class Enemy {
	constructor(speedLimitValue) {
		// Variables applied to each of our instances go here
		this.x = 0;
		this.randomPositions = [60, 140, 220]; // possible enemy positions
		this.y =  this.setRandomPosition(this.randomPositions.length); // random position
		this.speed = {
			slow: 100,
			regular: 200,
			fast: 300
		};

		this.speedLimit = this.speed.regular; //initial speed
		this.speedLimitValue = speedLimitValue;
		this.setSpeedLimit(); //speed limit

		// The image/sprite for our enemies, this uses
		// a helper we've provided to easily load images
		this.sprite = 'images/enemy-bug.png';
	}

	// Set speed limit
	setSpeedLimit() {
		switch(this.speedLimitValue) {
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
	}

	// Set random initial position Y
	// Function return one of the random possible positions
	setRandomPosition(max) {
		return this.randomPositions[Math.floor(Math.random() * Math.floor(max))]; // return number from 0 to max
	}

	// Update the enemy's position, required method for game
	// Parameter: dt, a time delta between ticks
	update(dt) {
		// You should multiply any movement by the dt parameter
		// which will ensure the game runs at the same speed for
		// all computers.
		this.x += this.speedLimit * dt;
		// If enemy hit the end of the board, reset positions
		if (this.x > 505) {
			this.x = 0;
			this.y = this.setRandomPosition(this.randomPositions.length);
		}
	}

	// Draw the enemy on the screen, required method for game
	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
	constructor() {
		this.sprite = 'images/char-boy.png'; // Load the player image
		// Set player's initial position
		this.x = 200;
		this.y = 380;
	}

	update() {
		// Handle collision with the enemy
		for (let i = 0; i < allEnemies.length; i++){
			if ((this.y === allEnemies[i].y) && (this.x < allEnemies[i].x + 60) && (this.x > allEnemies[i].x - 60)) {
				this.resetPosition();
			}
		}

		// Reset player position if it reaches the water
		if(this.y === -20) {
			setTimeout(()=> {
				this.resetPosition();
			}, 500);
		}
	}

	render() {
		ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
	}

	handleInput(key) {
		switch(key) {
			case 'left':
			this.x -= 100;
			break;

			case 'right':
			this.x += 100;
			break;

			case 'up':
			this.y -= 80;
			break;

			case 'down':
			this.y += 80;
			break;
		}
		// prevent the player from leaving the board
		if(this.y > 380) this.y -= 80;
		else if(this.y < -20) this.y += 80;
		else if(this.x > 400) this.x -= 100;
		else if(this.x < 0) this.x += 100;
	}

	// return player to initial position
	resetPosition() {
		this.x = 200;
		this.y = 380;
	}
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let enemy1 = new Enemy('slow');
let enemy2 = new Enemy('regular');
let enemy3 = new Enemy('fast');


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
