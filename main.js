// the "main" code begins here

window.onload = function () {
    var socket = io.connect("http://24.16.255.56:8888");

    socket.on("load", function (data) {
        console.log(data);
        loadCrates(data.crateData);
    });

    var text = document.getElementById("text");
    var saveButton = document.getElementById("save");
    var loadButton = document.getElementById("load");

    saveButton.onclick = function () {
        var crateData = [];
        crateData[0] = {x: crate0.x, xAcceleration: crate0.xAcceleration, y: crate0.y, yAcceleration: crate0.yAcceleration, color: crate0.toggleColor}
        crateData[1] = {x: crate1.x, xAcceleration: crate1.xAcceleration, y: crate1.y, yAcceleration: crate1.yAcceleration, color: crate1.toggleColor}
        crateData[2] = {x: crate2.x, xAcceleration: crate2.xAcceleration, y: crate2.y, yAcceleration: crate2.yAcceleration, color: crate2.toggleColor}
        crateData[3] = {x: crate3.x, xAcceleration: crate3.xAcceleration, y: crate3.y, yAcceleration: crate3.yAcceleration, color: crate3.toggleColor}
        crateData[4] = {x: crate4.x, xAcceleration: crate4.xAcceleration, y: crate4.y, yAcceleration: crate4.yAcceleration, color: crate4.toggleColor}
        crateData[5] = {x: crate5.x, xAcceleration: crate5.xAcceleration, y: crate5.y, yAcceleration: crate5.yAcceleration, color: crate5.toggleColor}
        crateData[6] = {x: crate6.x, xAcceleration: crate6.xAcceleration, y: crate6.y, yAcceleration: crate6.yAcceleration, color: crate6.toggleColor}
        crateData[7] = {x: crate7.x, xAcceleration: crate7.xAcceleration, y: crate7.y, yAcceleration: crate7.yAcceleration, color: crate7.toggleColor}
        crateData[8] = {x: crate8.x, xAcceleration: crate8.xAcceleration, y: crate8.y, yAcceleration: crate8.yAcceleration, color: crate8.toggleColor}
        crateData[9] = {x: crate.x, xAcceleration: crate.xAcceleration, y: crate.y, yAcceleration: crate.yAcceleration}
        console.log("save");
        text.innerHTML = "Saved."
        socket.emit("save", { studentname: "Jake Yang", statename: "gameState", crateData: crateData });
    };

    loadButton.onclick = function () {
        console.log("load");
        text.innerHTML = "Loaded."
        socket.emit("load", { studentname: "Jake Yang", statename: "gameState" });
    };

};


var friction = 1;
var acceleration = 1000000;
var maxSpeed = 200;

var ASSET_MANAGER = new AssetManager();
var context;
var canvas;
var mousedownID = -1;
var xMouse;
var yMouse;

var crate0;
var crate1;
var crate2;
var crate3;
var crate4;
var crate5;
var crate6;
var crate7;
var crate8;
var crate;

function loadCrates(crateData) {
    crate0.x = crateData[0].x;
    crate0.y = crateData[0].y;
    crate0.xAcceleration = crateData[0].xAcceleration;
    crate0.yAcceleration = crateData[0].yAcceleration;
    crate0.toggleColor = crateData[0].color;

    crate1.x = crateData[1].x;
    crate1.y = crateData[1].y;
    crate1.xAcceleration = crateData[1].xAcceleration;
    crate1.yAcceleration = crateData[1].yAcceleration;
    crate1.toggleColor = crateData[1].color;

    crate2.x = crateData[2].x;
    crate2.y = crateData[2].y;
    crate2.xAcceleration = crateData[2].xAcceleration;
    crate2.yAcceleration = crateData[2].yAcceleration;
    crate2.toggleColor = crateData[2].color;

    crate3.x = crateData[3].x;
    crate3.y = crateData[3].y;
    crate3.xAcceleration = crateData[3].xAcceleration;
    crate3.yAcceleration = crateData[3].yAcceleration;
    crate3.toggleColor = crateData[3].color;

    crate4.x = crateData[4].x;
    crate4.y = crateData[4].y;
    crate4.xAcceleration = crateData[4].xAcceleration;
    crate4.yAcceleration = crateData[4].yAcceleration;
    crate4.toggleColor = crateData[4].color;

    crate5.x = crateData[5].x;
    crate5.y = crateData[5].y;
    crate5.xAcceleration = crateData[5].xAcceleration;
    crate5.yAcceleration = crateData[5].yAcceleration;
    crate5.toggleColor = crateData[5].color;

    crate6.x = crateData[6].x;
    crate6.y = crateData[6].y;
    crate6.xAcceleration = crateData[6].xAcceleration;
    crate6.yAcceleration = crateData[6].yAcceleration;
    crate6.toggleColor = crateData[6].color;

    crate7.x = crateData[7].x;
    crate7.y = crateData[7].y;
    crate7.xAcceleration = crateData[7].xAcceleration;
    crate7.yAcceleration = crateData[7].yAcceleration;
    crate7.toggleColor = crateData[7].color;
    
    crate8.x = crateData[8].x;
    crate8.y = crateData[8].y;
    crate8.xAcceleration = crateData[8].xAcceleration;
    crate8.yAcceleration = crateData[8].yAcceleration;
    crate8.toggleColor = crateData[8].color;

    crate.x = crateData[9].x;
    crate.y = crateData[9].y;
    crate.xAcceleration = crateData[9].xAcceleration;
    crate.yAcceleration = crateData[9].yAcceleration;
}

ASSET_MANAGER.queueDownload("./img/mapAssets1.png");
ASSET_MANAGER.queueDownload("./img/background2.png");
// ASSET_MANAGER.queueDownload("./img/background.png");

ASSET_MANAGER.downloadAll(function () {
    console.log("starting up da sheild");
    canvas = document.getElementById('gameWorld');
    var ctx = canvas.getContext('2d');
    context = canvas.getContext('2d');


    var gameEngine = new GameEngine();
    fullCollisions = [];
    bottomOnlyCollisions = [];
    new FullCollision(0, 554, 922, 45); // Ground floor left
    new FullCollision(1034, 554, 200, 45); // Ground floor right
    // new FullCollision(1195, 0, 5, 600); // Right side wall
    new FullCollision(-10, -110, 1220, 110); // Ceiling
    new BottomOnlyCollision(800, 62, 255); // Small top left
    new BottomOnlyCollision(1120, 62, 90); // Small top right
    new BottomOnlyCollision(1032, 142, 110); // Small middle
    new BottomOnlyCollision(-100, 226, 1310); // Main divider
    new BottomOnlyCollision(315, 331, 291); // Upper hanging platform
    new BottomOnlyCollision(315, 423, 291); // Lower hanging platform
    new BottomOnlyCollision(0, 494, 250); // Throne platform
    // new FullCollision(-100, 480, 1030, 200);
    // new FullCollision(1080, 480, 200, 200);
    // new FullCollision(300, 219, 345, 230);
    // new FullCollision(420, -100, 225, 250);
    // new BottomOnlyCollision(53, 361, 213);
    // new BottomOnlyCollision(-100, 241, 345);
    // new BottomOnlyCollision(500, 219, 750);
    // new BottomOnlyCollision(734, 344, 133);
    crate0 = new Crate(gameEngine, 400, 400, false);
    crate1 = new Crate(gameEngine, 400, 350, false);
    crate2 = new Crate(gameEngine, 800, 400, false);
    crate3 = new Crate(gameEngine, 700, 400, false);
    crate4 = new Crate(gameEngine, 700, 300, false);
    crate9 = new Crate(gameEngine, 700, 250, false);
    crate5 = new Crate(gameEngine, 200, 100, false);
    crate6 = new Crate(gameEngine, 100, 100, false);
    crate7 = new Crate(gameEngine, 900, 100, false);
    crate8 = new Crate(gameEngine, 500, 300, false);
    crate = new Crate(gameEngine, 600, 400, true);
    gameEngine.addEntity(crate);
    gameEngine.addEntity(crate0);
    gameEngine.addEntity(crate1);
    gameEngine.addEntity(crate2);
    gameEngine.addEntity(crate3);
    gameEngine.addEntity(crate4);
    gameEngine.addEntity(crate5);
    gameEngine.addEntity(crate6);
    gameEngine.addEntity(crate7);
    gameEngine.addEntity(crate8);
    gameEngine.addEntity(crate9);

    gameEngine.init(ctx);
    gameEngine.start();
    canvas.addEventListener('mousemove', menuMouseMove);
    canvas, addEventListener('mousedown', mouseDownEvent);
});

function menuMouseMove(event) {
    var rect = canvas.getBoundingClientRect();
    xMouse = event.clientX - rect.left;
    yMouse = event.clientY - rect.top;
}

function mouseDownEvent(event) {
    var rect = canvas.getBoundingClientRect();
    xMouse = event.clientX - rect.left;
    yMouse = event.clientY - rect.top;
}

var fullCollisions = [];
var bottomOnlyCollisions = [];

function FullCollision(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    fullCollisions.push(this);
}

function BottomOnlyCollision(x, y, width) {
    this.x = x;
    this.y = y;
    this.width = width;
    bottomOnlyCollisions.push(this);
}

function distance(a, b) {
    var dx = a.x - b.x;
    var dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

//distance(this, other) < this.radius + other.radius;

function Crate(game, x, y, player) {
    this.x = x;
    this.y = y;
    this.centerX;
    this.centerY;
    this.width = 32;
    this.height = 32;
    this.isPlayer = player;
    this.toggleColor = 0;
    this.game = game;
    this.xAcceleration = 0;
    this.yAcceleration = 0;
    this.currentDisplacementX = this.width;
    this.currentDisplacementY = this.height;
    this.spriteSheet = ASSET_MANAGER.getAsset("./img/mapAssets1.png");

    this.moving = false;
    this.fullMCollisions = [];
    this.bottomMCollisions = [];
    this.grabbed = false;
}

Crate.prototype = new Entity();
Crate.prototype.constructor = Crate;

Crate.prototype.getMapCollisions = function () {
    this.fullMCollisions = [];
    // console.log("X ACCEL: " + this.xAcceleration + " Y ACCEL: " + this.yAcceleration);
    for (var i = 0; i < fullCollisions.length; i++) {
        let current = fullCollisions[i];
        if (this.x + this.xAcceleration < current.x + current.width && this.x + this.xAcceleration + this.width > current.x &&
            this.y + this.yAcceleration + this.height < current.y + current.height && this.y + this.yAcceleration + this.height > current.y) {
            var direction = [];
            if (this.y + this.height + 1 > current.y + current.height) {
                direction = "top";
            } else if (this.y + this.height > current.y) {
                direction = "bottom";
            }
            if (this.x >= current.x + current.width + 5 && this.x + this.xAcceleration <= current.x + current.width + 5) {
                direction = "right";
            } else if (this.x + this.width <= current.x + 1 && this.x + this.xAcceleration + this.width <= current.x + current.width + 1 && this.x + this.xAcceleration + 1 + this.width >= current.x) {
                direction = "left";
            }
            this.fullMCollisions.push({ object: current, direction: direction });
        }
    }
    for (var i = 0; i < this.game.entities.length; i++) {
        let current = this.game.entities[i];
        if (current != this) {
            if (this.x + this.xAcceleration <= current.x + current.width && this.x + this.xAcceleration + this.width >= current.x &&
                this.y + this.yAcceleration + this.height <= current.y + current.height && this.y + this.yAcceleration + this.height >= current.y) {
                this.y -= this.yAcceleration;
                this.x -= this.xAcceleration;
                if (this.y <= current.y && this.y + this.width + this.yAcceleration <= current.y + current.width && current.grabbed) {
                    this.y--;
                }
                var tempXAcceleration = current.xAcceleration;
                var tempYAcceleration = current.yAcceleration;
                if (Math.abs(this.xAcceleration) > 10 || Math.abs(this.yAcceleration) > 10 || Math.abs(tempXAcceleration) > 10 || Math.abs(tempYAcceleration) > 10) {
                    this.toggleColor = (this.toggleColor + 1) % 3;
                    current.toggleColor = (current.toggleColor + 1) % 3;
                }
                current.xAcceleration = this.xAcceleration * 0.6;
                current.yAcceleration = this.yAcceleration * 0.6;
                this.xAcceleration = tempXAcceleration * 0.6;
                this.yAcceleration = tempYAcceleration * 0.6;
            }
        }
    }
    this.bottomMCollisions = [];
    if (!this.grabbed) {
        for (var i = 0; i < bottomOnlyCollisions.length; i++) {
            let current = bottomOnlyCollisions[i];
            if (this.x + this.xAcceleration + this.width < current.x + current.width && this.x + this.xAcceleration + this.width > current.x && this.y + this.yAcceleration + this.height > current.y &&
                this.y + this.height * 2 > current.y && this.y + this.yAcceleration + this.height <= current.y + 20 && this.yAcceleration >= 0) {
                this.bottomMCollisions.push(bottomOnlyCollisions[i]);
            }
        }
    }
}

Crate.prototype.getMapCollision = function (direction) {
    for (var i = 0; i < this.fullMCollisions.length; i++) {
        if (this.fullMCollisions[i].direction == direction) {
            return this.fullMCollisions[i].object;
        }
    }
    if (direction == "bottom") {
        if (this.bottomMCollisions.length > 0) {
            return this.bottomMCollisions[i];
        }
    }
    return null;
}

function pointsDistance(ax, ay, bx, by) {
    var dx = ax - bx;
    var dy = ay - by;
    return Math.sqrt(dx * dx + dy * dy);
}

Crate.prototype.push = function () {
    var delta_x = (xMouse - this.centerX);
    var delta_y = (yMouse - this.centerY);
    var hypotenuse = Math.sqrt((delta_x * delta_x) + (delta_y * delta_y));
    var angle = Math.asin(delta_x / hypotenuse);
    var xMagnitude = Math.sin(angle) * 400;
    var yMagnitude;
    if (delta_y < 0) {
        yMagnitude = -Math.cos(angle) * 400;
    } else {
        yMagnitude = Math.cos(angle) * 400;
    }
    var pushDistance = pointsDistance(this.centerX, this.centerY, this.centerX + xMagnitude, this.centerY + yMagnitude);
    for (var i = 0; i < this.game.entities.length; i++) {
        var current = this.game.entities[i];
        if (current != this) {
            var distToCurrent = pointsDistance(this.centerX, this.centerY, current.centerX, current.centerY);
            var distCurrentToMag = pointsDistance(current.centerX, current.centerY, this.centerX + xMagnitude, this.centerY + yMagnitude);
            var sumDistance = distToCurrent + distCurrentToMag;
            // if (sumDistance + 50 >= pushDistance && sumDistance - 50 <= pushDistance) {
            // 	accelModifier = (1 - distToCurrent / pushDistance);
            // 	if (accelModifier > 0) {
            //  	current.xAcceleration += xMagnitude * accelModifier * 0.1;
            // 		current.yAcceleration += yMagnitude * accelModifier * 0.1;
            // 	}
            // }

            var delta_x2 = (current.centerX - this.centerX);
            var delta_y2 = (current.centerY - this.centerY);
            var hypotenuse2 = Math.sqrt((delta_x2 * delta_x2) + (delta_y2 * delta_y2));
            var angle2 = Math.asin(delta_x2 / hypotenuse2);
            // console.log(angle);
            // console.log(angle2);
            if (sumDistance + 50 >= pushDistance && sumDistance - 50 <= pushDistance) {
                accelModifier = (1 - distToCurrent / pushDistance);
                if (accelModifier > 0) {
                    current.xAcceleration += xMagnitude * accelModifier * 0.1 * (1 + (angle2 - angle));
                    current.yAcceleration += yMagnitude * accelModifier * 0.1 * (1 - (angle2 - angle));
                }
            }
        }
    }
}

Crate.prototype.update = function () {
    this.centerX = (this.x + this.width / 2);
    this.centerY = (this.y + this.height / 2);

    this.getMapCollisions();
    collisionRight = this.getMapCollision("right");
    collisionLeft = this.getMapCollision("left");
    collisionTop = this.getMapCollision("top");
    collisionBottom = this.getMapCollision("bottom");
    if (collisionBottom != null) {
        if (this.yAcceleration > 2) {
            this.yAcceleration = -this.yAcceleration * 0.4;
        } else {
            this.y = collisionBottom.y + 1 - this.width;
            this.yAcceleration = 0;
        }
    } else {
        this.yAcceleration += 0.4;
    }

    if (collisionTop != null) {
        if (this.yAcceleration < 2) {
            this.yAcceleration = -this.yAcceleration * 0.4;
        } else {
            this.y = collisionTop.y + collisionTop.height + 1;
        }
    }

    if (collisionLeft != null) {
        if (this.xAcceleration > 2) {
            this.xAcceleration = -this.xAcceleration * 0.4;
        } else {
            this.x = collisionLeft.x - this.width - 5;
        }
    } else if (collisionRight != null) {
        if (this.xAcceleration < -2) {
            this.xAcceleration = -this.xAcceleration * 0.4;
        } else {
            this.x = collisionRight.x + collisionRight.width + 5;
        }
    }

    if (this.game.keyup) {
        if (this.game.keyReleased == 'f') {
            this.grabbed = false;
            this.game.grabbing = false;
        } else if (this.game.keyReleased == 'q') {
            if (this.isPlayer) {
                this.push();
            }
        }
    }

    if (this.grabbed) {
        var yMagnitude = (this.y - yMouse) / 600 + 0.4;
        var xMagnitude = (this.x - xMouse) / 500;
        this.yAcceleration -= yMagnitude;
        this.xAcceleration -= xMagnitude;
        if (this.xAcceleration > 0) {
            this.xAcceleration -= 0.1;
        } else {
            this.xAcceleration += 0.1;
        }
    }

    var speed = Math.sqrt(this.xAcceleration * this.xAcceleration + this.yAcceleration * this.yAcceleration);
    if (speed > 20) {
        var ratio = 20 / speed;
        this.xAcceleration *= ratio;
        this.yAcceleration *= ratio;
    };

    this.y += this.yAcceleration;
    this.x += this.xAcceleration;

    if (this.x <= 0 || this.x + this.width >= 1200) {
        if (this.x <= 0) {
            this.x += 10;
        } else {
            this.x -= 10;
        }
        this.xAcceleration = -this.xAcceleration * 0.6;
    } else if (!this.grabbed) {
        if (this.xAcceleration > 0) {
            if (collisionBottom != null) {
                this.xAcceleration -= 0.25;
            } else {
                this.xAcceleration -= 0.1;
            }
            if (this.xAcceleration < 0) {
                this.xAcceleration = 0;
            }
        } else if (this.xAcceleration < 0) {
            if (collisionBottom != null) {
                this.xAcceleration += 0.25;
            } else {
                this.xAcceleration += 0.1;
            }
            if (this.xAcceleration > 0) {
                this.xAcceleration = 0;
            }
        }
    }
}

Crate.prototype.draw = function () {
    context.drawImage(this.spriteSheet,
        160, 125,  // source from sheet
        64, 64,
        this.x, this.y,
        this.width,
        this.height);
    context.beginPath();
    if (this.isPlayer) {
        context.fillStyle = "Green";
    } else if (this.toggleColor == 0) {
        context.fillStyle = "Blue";
    } else if (this.toggleColor == 1) {
        context.fillStyle = "Red";
    } else {
        context.fillStyle = "Yellow";
    }
    context.arc(this.x + 16, this.y + 18, 5, 0, Math.PI * 2, false);
    context.fill();
    context.closePath();
}