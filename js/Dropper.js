//sources:
// https://scratch.mit.edu/projects/72691440/#editor




//player class
class Player {
    constructor(src, x, y, width, height, speed) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.img = new Image();
        this.img.src = src;
        this.velX = 0;
        this.velY = 0;
        this.jumping = false;
        this.grounded = false;
        this.waitTimer = 0;
        this.waitTime = 0;
        this.runTimer = 0;
        this.runTime = 10;
        this.direction = "right";
        this.imageName = "Idle Right1";
        this.isSprinting = false;
        this.orgW = width;
        this.orgH = height;
        this.slideW = width+25;
        this.slideH = height-25;
        this.isSliding = false;

    }
}

//block class
class Block {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.img = new Image();
        this.img.src = "https://i.stack.imgur.com/ZcPaO.png";
    }
}

//main player
var player = new Player("images/Idle Right/Stick Idle1.png", 50, 50, 8, 23, 2);

//global attributes
var keys = [];
var friction = 0.7;
var gravity = 0.2;
var maxGravity = 5;

var canvas;
var context; var h; var w;

//map


var map1 = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0],
    [0, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0]
];

var map2 = [
    [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
    [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0],
    [0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0],
    [1, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 0],
    [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
]



var worldMap = [map1, map2];
var worldMapCounter = 0;

//holds all game objects
var worldObjs = [
    [],
    [],
    [],
    [],
    [],
    []
];


var playerImgs = {};

var lastTarget;

function init() {
    canvas = document.getElementById("dropper_canvas");
    context = canvas.getContext("2d");
    h = canvas.height; w = canvas.width;

    setUp();
    drawScreen();

    document.addEventListener("mousedown", function(e) {
        lastTarget = e.target;
        if (e.target == canvas) {
            document.getElementById("dropper_canvas").style.cursor = "none";
        } else {
            document.getElementById("dropper_canvas").style.cursor = "auto";
        }
    }, false);

    document.addEventListener("keydown", function(e) {
        if (lastTarget == canvas) {
            console.log(e.keyCode);
            console.log("A");
            keys[e.keyCode] = true;
        }
    });

    document.addEventListener("keyup", function(e) {
        if (lastTarget == canvas) {
            keys[e.keyCode] = false;
        }
    });

    //canvas.addEventListener("keydown", keyDown);
    //canvas.addEventListener("keyup", keyUp);
}

var blocks = [];
var sb = 25;
function setUp() {
    var map = worldMap[worldMapCounter];
    //adding in the world elements

    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map1[i][j] == 1) {
                var b = new Block(j*sb, i*sb, sb, sb);
                worldObjs[i].push(b);
            }
        }
    }

    //setting up the player's images
    var idleL1 = new Image(); idleL1.src = "images/Idle Left/Stick Idle Left 1.png"; playerImgs["Idle Left1"] = idleL1;
    var idleL2 = new Image(); idleL2.src = "images/Idle Left/Stick Idle Left 2.png"; playerImgs["Idle Left2"] = idleL2;
    var idleL3 = new Image(); idleL3.src = "images/Idle Left/Stick Idle Left 3.png"; playerImgs["Idle Left3"] = idleL3;
    var idleL4 = new Image(); idleL4.src = "images/Idle Left/Stick Idle Left 4.png"; playerImgs["Idle Left4"] = idleL4;

    var idleR1 = new Image(); idleR1.src = "images/Idle Right/Stick Idle1.png"; playerImgs["Idle Right1"] = idleR1;
    var idleR2 = new Image(); idleR2.src = "images/Idle Right/Stick Idle2.png"; playerImgs["Idle Right2"] = idleR2;
    var idleR3 = new Image(); idleR3.src = "images/Idle Right/Stick Idle3.png"; playerImgs["Idle Right3"] = idleR3;
    var idleR4 = new Image(); idleR4.src = "images/Idle Right/Stick Idle4.png"; playerImgs["Idle Right4"] = idleR4;

    var jumpR = new Image(); jumpR.src = "images/Jump Right/Stick Jump 6.png"; playerImgs["Jump Right"] = jumpR;
    var jumpL = new Image(); jumpL.src = "images/Jump Left/Stick Jump Left 6.png"; playerImgs["Jump Left"] = jumpL;
    var fallR = new Image(); fallR.src = "images/Jump Right/Stick Jump 7.png"; playerImgs["Fall Right"] = fallR;
    var fallL = new Image(); fallL.src = "images/Jump Left/Stick Jump Left 7.png"; playerImgs["Fall Left"] = fallL;

    var runL1 = new Image(); runL1.src = "images/Run Left/Stick Run Left1.png"; playerImgs["Run Left1"] = runL1;
    var runL2 = new Image(); runL2.src = "images/Run Left/Stick Run Left2.png"; playerImgs["Run Left2"] = runL2;
    var runL3 = new Image(); runL3.src = "images/Run Left/Stick Run Left3.png"; playerImgs["Run Left3"] = runL3;
    var runL4 = new Image(); runL4.src = "images/Run Left/Stick Run Left4.png"; playerImgs["Run Left4"] = runL4;
    var runL5 = new Image(); runL5.src = "images/Run Left/Stick Run Left5.png"; playerImgs["Run Left5"] = runL5;

    var runR1 = new Image(); runR1.src = "images/Run Right/Stick Run1.png"; playerImgs["Run Right1"] = runR1;
    var runR2 = new Image(); runR2.src = "images/Run Right/Stick Run2.png"; playerImgs["Run Right2"] = runR2;
    var runR3 = new Image(); runR3.src = "images/Run Right/Stick Run3.png"; playerImgs["Run Right3"] = runR3;
    var runR4 = new Image(); runR4.src = "images/Run Right/Stick Run4.png"; playerImgs["Run Right4"] = runR4;
    var runR5 = new Image(); runR5.src = "images/Run Right/Stick Run5.png"; playerImgs["Run Right5"] = runR5;

    var slideL = new Image(); slideL.src = "images/Sliding/Stick Sliding Left.png"; playerImgs["Slide Left"] = slideL;
    var slideR = new Image(); slideR.src = "images/Sliding/Stick Sliding Right.png"; playerImgs["Slide Right"] = slideR;

}

function keyDown(e) {
    keys[e.keyCode] = true;
}

function keyUp(e) {
    keys[e.keyCode] = false;
}

function random(min, max) {
    return Math.floor(Math.random() * (max-min+1) + min);
}

function drawScreen() {
    context.clearRect(0, 0, w, h);
    player.isSprinting = false;
    if (keys[87]) {
        //W
        if(!player.jumping && player.velY <= 0){
            player.jumping = true;
            player.velY = -player.speed*2;
        }
        player.isSprinting = false;
    }
    if (keys[68]) {
        //D
        player.direction = "right";
        if (player.velX < player.speed) {
            player.velX++;
        }

        player.isSprinting = true;
    }
    if (keys[65]) {
        //A
        player.direction = "left";
        if (player.velX > -player.speed) {
            player.velX--;
        }
        player.isSprinting = true;
    }
    if (keys[83]) {
        //S
        if (player.jumping && player.velY <= maxGravity) {
            player.velY += gravity;
        }
    }

    if (player.jumping) player.isSprinting = false;

    //calculate player movements

    player.velX *= friction;
    if (player.velY <= maxGravity) player.velY += gravity;

    player.x += player.velX; player.y += player.velY;

    //check if player is moving
    if (Math.trunc(player.velX) == 0) {
        player.move = false;

    } else{
        player.move = true;
    }

    //check horizontal bounds
    if (player.x >= w-player.width) {
        player.x = w-player.width;
    } else if (player.x <= 0) {
        player.x = 0;
    }

    player.grounded = false;
    player.isClimbing = false;
    //check collision
    for (var i = 0; i < worldObjs.length; i++) {
        for (var j = 0; j < worldObjs[i].length; j++) {
            var b = worldObjs[i][j];
            if (b != null) {
                var dir = colCheck(player, b);

                //if (dir != null && dir != "b") console.log(dir);
                if (dir === "l" || dir === "r") {
                    player.velX = 0;
                    console.log("WHAT??");
                    //toggle wall jumping
                    //player.jumping = false;
                }else if (dir === "b") {
                    player.grounded = true;
                    player.jumping = false;
                } else if (dir === "t") {
                    if (player.velY <= 0) player.velY = 0;

                }
            }
        }
    }

    if(player.grounded){
        player.velY = 0;
    }

    //setting up player animations
    if (player.move == false) {
        player.waitTimer++;
        var d = player.direction;
        if (player.waitTimer < player.waitTime) {
            if (d == "right") player.imageName = "Idle Right1";
            else if (d == "left") player.imageName = "Idle Left1";
        } else if (player.waitTimer < player.waitTime + 10) {
            if (d == "right") player.imageName = "Idle Right2";
            else if (d == "left") player.imageName = "Idle Left2";
        } else if (player.waitTimer < player.waitTime + 20) {
            if (d == "right") player.imageName = "Idle Right3";
            else if (d == "left") player.imageName = "Idle Left3";
        } else if (player.waitTimer < player.waitTime + 30) {
            if (d == "right") player.imageName = "Idle Right4";
            else if (d == "left") player.imageName = "Idle Left4";
        } else if (player.waitTimer >= player.waitTime + 40) {
            player.waitTimer = 0;
            player.waitTime = random(100, 180);
        }
    } else {
        player.waitTimer = 0;
        player.waitTime = random(100, 180);

        player.runTimer++;
        var offset = 7;
        var d = player.direction;
        if (player.runTimer < player.runTime) {
            if (d == "right") {
                player.imageName = "Run Right1";
            } else if (d == "left") {
                player.imageName = "Run Left1";
            }
        }else if (player.runTimer < player.runTime + offset) {
            if (d == "right") {
                player.imageName = "Run Right2";
            } else if (d == "left") {
                player.imageName = "Run Left2";
            }
        } else if (player.runTimer < player.runTime + offset*2) {
            if (d == "right") {
                player.imageName = "Run Right3";
            } else if (d == "left") {
                player.imageName = "Run Left3";
            }
        } else if (player.runTimer < player.runTime + offset*3) {
            if (d == "right") {
                player.imageName = "Run Right4";
            } else if (d == "left") {
                player.imageName = "Run Left4";
            }
        } else if (player.runTimer < player.runTime + offset*4) {
            if (d == "right") {
                player.imageName = "Run Right5";
            } else if (d == "left") {
                player.imageName = "Run Left5";
            }
        }else if (player.runTimer >= player.runTime + offset*5) {
            player.runTimer = 0;
        }
    }


    if (player.jumping) {
        if (player.direction == "right") {
            player.imageName = "Jump Right";
        } else if (player.direction == "left") {
            player.imageName = "Jump Left";
        }
    }

    if (player.velY >= 0 && !player.grounded) {
        if (player.direction == "right") {
            player.imageName = "Fall Right";
        } else if (player.direction == "left") player.imageName = "Jump Left";
    }

    player.height = player.orgH; player.width = player.orgW;
    /*
    if (keys[83]) {
        //S
        if(player.isSprinting) {
            if (player.direction == "right") {
                player.imageName = "Slide Right";
            } else if (player.direction == "left") {
                player.imageName = "Slide Left";
            }
            player.height = player.slideH;
            player.width = player.slideW;
        }
    }*/


    //falls out of world
    if (player.y > h) {
        changeMap();
        player.y = -player.height;
    }

    //draw player
    context.drawImage(playerImgs[player.imageName], player.x, player.y, player.width, player.height);

    //drawing the world objects
    for (var i = 0; i < worldObjs.length; i++) {
        for (var j = 0; j < worldObjs[i].length; j++) {
            var obj = worldObjs[i][j];
            if (obj != null) context.drawImage(obj.img, obj.x, obj.y, obj.width, obj.height);
        }
    }
    requestAnimationFrame(drawScreen);
}


function changeMap() {
    worldMapCounter++;
    if (worldMapCounter >= worldMap.length) worldMapCounter = 0;

    var map = worldMap[worldMapCounter];
    for (var i = 0; i < map.length; i++) {
        for (var j = 0; j < map[i].length; j++) {
            if (map[i][j] == 1) {
                var b = new Block(j*sb, i*sb, sb, sb);
                worldObjs[i][j] = b;
            } else {
                worldObjs[i][j] = null;
            }
        }
    }
}

function colCheck(shapeA, shapeB, isIBlock) {
    isIBlock = isIBlock || false;
    // get the vectors to check against
    var vX = (shapeA.x + (shapeA.width / 2)) - (shapeB.x + (shapeB.width / 2));
    var vY = (shapeA.y + (shapeA.height / 2)) - (shapeB.y + (shapeB.height / 2));
    // add the half widths and half heights of the objects
    var hWidths = (shapeA.width / 2) + (shapeB.width / 2);
    var hHeights = (shapeA.height / 2) + (shapeB.height / 2);
    var colDir = null;

    // if the x and y vector are less than the half width or half height, they we must be inside the object, causing a collision
    if (Math.abs(vX) < hWidths && Math.abs(vY) < hHeights) {         // figures out on which side we are colliding (top, bottom, left, or right)
        var oX = hWidths - Math.abs(vX);
        var oY = hHeights - Math.abs(vY);
        if (oX >= oY) {
            if (vY > 0) {
                colDir = "t";
                shapeA.y += oY;
            } else {
                colDir = "b";
                if (!isIBlock) shapeA.y -= oY;
            }
        } else {
            if (vX > 0) {
                colDir = "l";
                if (!isIBlock) shapeA.x += oX;
            } else {
                colDir = "r";
                if (!isIBlock) shapeA.x -= oX;
            }
        }
    }
    return colDir;
}

init();