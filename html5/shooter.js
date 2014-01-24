/*
  Basic Game code taken from this tutorial
  For learning the joys of HTML5
  All code credit goes to Steven Lambert
  https://github.com/straker/galaxian-canvas-game
  http://blog.sklambert.com/html5-canvas-game-the-player-ship/


   */

/*
  Initialize the game and begin
  */
var game = new Game();

function init() {
    if(game.init())
	game.start();
}


/*
  set background
  */
var imageRepository = new function () {

    
    this.background = new Image();
    this.spaceship = new Image();
    this.bullet = new Image();

    var numImages = 3;
    var numLoaded = 0;
    function imageLoaded() {
	numLoaded++;
	if(numLoaded === numImages){
	    window.init();
	}
    }
    this.background.onload = function() {
	imageLoaded();
    }
    this.spaceship.onload = function() {
	imageLoaded();
    }
    this.bullet.onload = function() {
	imageLoaded();
    }
    
    this.background.src = "../assets/bg.png";
    this.spaceship.src = "../assets/ship.png";
    this.bullet.src = "../assets/bullet.png";
}

/*
  Base Class for all Drawable stuff on the game page.
  Move to separate file soon.
  */

function Drawable() {
    this.init = function(x,y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
    }

    this.speed = 0;
    this.canvasWidth = 0;
    this.canvasHeight = 0;

    /*overloadable function for child classes*/
    this.draw = function(){
    };

    this.move = function(){
    };
}

/*
  Background object creator---> inherits from Drawable


  */
function Background(){
    this.speed = 1;

    this.draw = function(){
	this.y += this.speed;
	this.context.drawImage(imageRepository.background, this.x, this.y);

	this.context.drawImage(imageRepository.background, this.x, this.y - this.canvasHeight);
	if (this.y >= this.canvasHeight)
	    this.y = 0;
    };
}
/*This is the object constructor */
Background.prototype = new Drawable();

/*
  Bullet class def and impl
  */
function Bullet(){
    this.alive = false;

    this.spawn = function(x,y,speed){
	this.x = x;
	this.y = y;
	this.speed = speed;
	this.alive = true;
    };

    /* dirty rectangle for bullet movement */
    this.draw = function() {
	this.context.clearRect(this.x, this.y, this.width, this.height);
	this.y -= this.speed;
	if ( this.y <=0 -this.height) {
	    return true;
	} else {
	    this.context.drawImage(imageRepository.bullet, this.x, this.y);
	}
    };

    /*  Bullet reset
      */
    this.clear = function() {
	this.x = 0;
	this.y = 0;
	this.speed = 0;
	this.alive = false;
    };
}
/* Bullet constructor */
Bullet.prototype = new Drawable();


/**
 * Custom Pool object. Holds Bullet objects to be managed to prevent
 * garbage collection. 
 * The pool works as follows:
 * - When the pool is initialized, it populates an array with 
 *   Bullet objects.
 * - When the pool needs to create a new object for use, it looks at
 *   the last item in the array and checks to see if it is currently
 *   in use or not. If it is in use, the pool is full. If it is 
 *   not in use, the pool "spawns" the last item in the array and 
 *   then pops it from the end and pushed it back onto the front of
 *   the array. This makes the pool have free objects on the back 
 *   and used objects in the front.
 * - When the pool animates its objects, it checks to see if the 
 *   object is in use (no need to draw unused objects) and if it is, 
 *   draws it. If the draw() function returns true, the object is 
 *   ready to be cleaned so it "clears" the object and uses the 
 *   array function splice() to remove the item from the array and 
 *   pushes it to the back.
 * Doing this makes creating/destroying objects in the pool 
 * constant.
 */
function Pool(maxSize) {
    var size = maxSize;
    var pool = [];

    // populate the pool with Bullet objs
    this.init = function() {
	for (var i = 0; i < size; i++){
	    var bullet = new Bullet();
	    bullet.init(0,0, imageRepository.bullet.width,
			imageRepository.bullet.height);
	    pool[i] = bullet;
	}
    };

    /*
      grab the last item in the list construct it and push it
      to the front of the array
      */
    this.get = function( x, y, speed) {
	if( !pool[size - 1].alive) {
	    pool[size-1].spawn(x,y,speed);
	    pool.unshift(pool.pop());
	}
    };

    /*
      enables 2 bullets at once
      */
    this.getTwo = function(x1, y1, speed1, x2, y2, speed2) {
	if(!pool[size -1].alive &&
	   !pool[size -2].alive) {
	    this.get(x1,y1,speed1);
	    this.get(x2,y2,speed2);
	}
    };

    /*
      draws the in-use bullets
      */
    this.animate = function() {
	for (var i = 0; i < size; i++) {
	    if (pool[i].alive) {
		if (pool[i].draw()) {
		    pool[i].clear();
		    pool.push((pool.splice(i,1))[0]);
		}
	    } else
		break;
	}
    };
}

/*
  Ship object 
  */
function Ship() {
    this.speed = 3;
    this.bulletPool = new Pool(30);
    this.bulletPool.init();

    var fireRate = 15;
    var counter = 0;

    this.draw = function() {
	this.context.drawImage(imageRepository.spaceship, this.x, this.y);
    };

    this.move = function() {
	counter++;
	if (KEY_STATUS.left || KEY_STATUS.right ||
	    KEY_STATUS.down || KEY_STATUS.up) {
	    this.context.clearRect(this.x, this.y, this.width, this.height);

	    /*
	      update the ships positional image
	      */
	    if (KEY_STATUS.left) {
		this.x -= this.speed
		if (this.x <= 0)
		    this.x = 0;
	    } else if (KEY_STATUS.right) {
		this.x += this.speed
		if (this.x >= this.canvasWidth - this.width)
		    this.x = this.canvasWidth - this.width;
	    } else if (KEY_STATUS.up) {
		this.y -= this.speed
		if (this.y <= this.canvasHeight/4*3)
		    this.y = this.canvasHeight/4*3;
	    } else if (KEY_STATUS.down) {
		this.y += this.speed
		if (this.y >= this.canvasHeight - this.height)
		    this.y = this.canvasHeight -this.height;
	    }
	    
	    this.draw();
	}
    
	if (KEY_STATUS.space && counter >= fireRate) {
	    this.fire();
	    counter = 0;
	}
    };

    this.fire = function() {
	this.bulletPool.getTwo(this.x+6, this.y, 3,
			       this.x+33, this.y, 3);
    };
}
Ship.prototype = new Drawable();



	
function Game() {


    this.init = function() {
	this.bgCanvas = document.getElementById('background');
	this.shipCanvas = document.getElementById('ship');
	this.mainCanvas = document.getElementById('main');
	
	
	if(this.bgCanvas.getContext) {
	    this.bgContext = this.bgCanvas.getContext('2d');
	    this.shipContext = this.shipCanvas.getContext('2d');
	    this.mainContext = this.mainCanvas.getContext('2d');
	    

	    Background.prototype.context = this.bgContext;
	    Background.prototype.canvasWidth = this.bgCanvas.width;
	    Background.prototype.canvasHeight = this.bgCanvas.height;

	    Ship.prototype.context = this.shipContext;
	    Ship.prototype.canvasWidth = this.shipCanvas.width;
	    Ship.prototype.canvasHeight = this.shipCanvas.height;

	    Bullet.prototype.context = this.mainContext;
	    Bullet.prototype.canvasWidth = this.mainCanvas.width;
	    Bullet.prototype.canvasHeight = this.mainCanvas.height;

	    this.background = new Background();
	    this.background.init(0,0);

	    this.ship = new Ship();
	    var shipStartX = this.shipCanvas.width/2 - imageRepository.spaceship.width;
	    var shipStartY = this.shipCanvas.height/4*3 + imageRepository.spaceship.height*2;
	    this.ship.init( shipStartX, shipStartY,
			    imageRepository.spaceship.width,
			    imageRepository.spaceship.height);
	    return true;
	} else {
	    return false;
	}
    };

    this.start = function() {
	this.ship.draw();
	animate();
    };
}


function animate() {
    requestAnimFrame( animate );
    game.background.draw();
    game.ship.move();
    game.ship.bulletPool.animate();
}

// The keycodes that will be mapped when a user presses a button.
// Original code by Doug McInnes
KEY_CODES = {
  32: 'space',
  37: 'left',
  38: 'up',
  39: 'right',
  40: 'down',
}

KEY_STATUS = {};
for (code in KEY_CODES ){
    KEY_STATUS[KEY_CODES[code]] = false;
}

/*
  listener for key down
  */
document.onkeydown = function(e){
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
	e.preventDefault();
	KEY_STATUS[KEY_CODES[keyCode]] = true;
    }
}

document.onkeyup = function(e) {
    var keyCode = (e.keyCode) ? e.keyCode : e.charCode;
    if (KEY_CODES[keyCode]) {
	e.preventDefault();
	KEY_STATUS[KEY_CODES[keyCode]] = false;
    }
}



window.requestAnimFrame = (function() {
    return window.requestAnimationFrame ||
	window.webkitRequestAnimationFrame ||
	window.mozRequestAnimationFrame ||
	window.oRequestAnimationFrame ||
	window.msRequestAnimationFrame ||
	function(/*function*/callback, /*Dom element*/ element){
	    window.seTimeout(callback, 1000 / 60);
	};
})();
    