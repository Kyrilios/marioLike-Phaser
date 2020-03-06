var config = {
    type: Phaser.AUTO,
    width: 1400,
    height: 768,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 1400 },
            debug: false
        }
    },
    scene: [Scene1, Scene2, Scene3, Scene4, Scene5, death, sceneTransition, sceneTransition2, congratulations, gameOver]
}

var game = new Phaser.Game(config);
var map;
var map2;
var map3;
var map4;
var player;
var enemy;
var enemy1;
var enemy2;
var enemy3;
var cursors;
var themeMusic;
var redCoinsLayer, coinsLayer, enemySpikeLayer, worldLayer, exitLayer,
    rightColliderLayer, leftColliderLayer, rightColliderLayer1, leftColliderLayer1,
    rightColliderLayer2, leftColliderLayer2, rightColliderLayer2M2, leftColliderLayer2M2, enemyWalkingLayer, bgLayer, exitLayer, portal;
var text;
var livesText;
var timetext;
var timedEvent;
var score = 0;
var textHighScore;
var highScore = 0;
var lives = 3;
var maxTime = 60;
var intialTime;
var playerX = 50;
var playerY = 666;
var deathInMap1 = 0;
var deathInMap2 = 0;
var deathInMap3 = 0;
var deathInMap4 = 0;


//Functions//

function updateCounter() {

    total++;

}


function enemyCollidedLeft() {
    console.log('enemy collided left')
    enemy.body.setVelocityX(-1500);
    enemy.flipX = true;
}

function enemyCollidedRight() {
    console.log('enemy collided right')
    enemy.body.setVelocityX(+1500);
    enemy.flipX = false;

}


function enemyCollidedLeft1() {
    console.log('enemy1 collided left1')
    enemy1.body.setVelocityX(-500);
    enemy1.flipX = true;
}

function enemyCollidedRight1() {
    console.log('enemy1 collided right1')
    enemy1.body.setVelocityX(+500);
    enemy1.flipX = false;

}

function enemyCollidedLeft2() {
    console.log('enemy2 collided yes')
    enemy2.body.setVelocityX(+1000);
    enemy2.flipX = false;
}

function enemyCollidedRight2() {
    console.log('enemy2 collided right2')
    enemy2.body.setVelocityX(-1000);
    enemy2.flipX = true;

}

function enemyCollidedLeft2M2() {
    console.log('enemy2 collided yes')
    enemy2.body.setVelocityX(-1000);
    enemy2.flipX = true;
}

function enemyCollidedRight2M2() {
    console.log('enemy2 collided right2')
    enemy2.body.setVelocityX(+1000);
    enemy2.flipX = false;

}

function collectCoin(sprite, tile) {
    // this.scene.start('bootGame');
    coinsLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 10 points to the score
    this.collectCoin.play();
    text.setText("Score" +
        score);
    // set the text to show the current score
    return false;

}

function collectRedCoin(sprite, tile) {

    redCoinsLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score = score + 100; // add 10 points to the score
    text.setText("Score" +
        score);

    this.collectCoin.play();
    // set the text to show the current score
    return false;

}

function playerSpiked() {
    this.playerDieSound.play();
    this.themeMusic.stop();
    this.input.keyboard.enabled = false;
    player.body.setVelocityY(-2000);
    player.body.collideWorldBounds = false;
    lives -= 1;
    console.log('lives:', lives);

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            this.input.keyboard.enabled = true;
            this.scene.start('death');
        },

    });
}

function playerDied(player, enemy, enemy1, enemy2, enemy3) {

    if (enemy.body.touching.up) {
        this.enemyDieSound.play()
        enemy.destroy();
        score += 20;
        text.setText("Score" +
            score);
        player.body.setVelocityY(-500);
    } else {
        this.themeMusic.stop();
        this.input.keyboard.enabled = false;
        player.body.collideWorldBounds = false;
        player.body.setVelocityY(-2000);
        console.log("player died");
        this.playerDieSound.play();

        lives -= 1;
        console.log('lives:', lives);
        console.log("enemy 0 killed player")
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.input.keyboard.enabled = true;
                this.scene.start('death');
            },

        });


    }
    if (enemy1.body.touching.up) {
        enemy1.destroy();
        score += 20;
        text.setText("Score" +
            score);
        player.body.setVelocityY(-250);
    } else {
        this.themeMusic.stop();
        player.body.setVelocityY(-250);
        console.log("enemy 1 killed player")
        lives -= 1;
        console.log('lives:', lives);
        console.log("player died");
        this.playerDieSound.play();

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.start('death');
            },

        });

    }
    if (enemy2.body.touching.up) {
        enemy2.destroy();
        score += 20;
        text.setText("Score" +
            score);
        player.body.setVelocityY(-250);
    } else {
        this.themeMusic.stop();
        player.body.setVelocityY(-250);
        console.log("enemy 2 killed player")
        lives -= 1;
        console.log('lives:', lives);
        console.log("player died");
        this.playerDieSound.play();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.start('death');
            },

        });

    }
    if (enemy3.body.touching.up) {
        enemy3.destroy();
        score += 20;
        text.setText("Score" +
            score);
        player.body.setVelocityY(-250);
    } else {
        this.themeMusic.stop();
        player.body.setVelocityY(-250);
        player.input.enabled = false;
        console.log("enemy 3 killed player")
        lives -= 1;
        console.log('lives:', lives);
        console.log("player died");
        this.playerDieSound.play();
        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.start('death');
            },

        });
    }


    this.themeMusic.stop();
    player.body.setVelocityY(-250);
    console.log("someone killed player")

    this.time.addEvent({
        delay: 1000,
        callback: () => {
            this.scene.start('death');
        },

    });

}

function formatTime(seconds) {
    // Minutes
    var minutes = Math.floor(seconds / 60);
    // Seconds
    var partInSeconds = seconds % 60;
    // Adds left zeros to seconds
    partInSeconds = partInSeconds.toString().padStart(2, '0');
    // Returns formated time
    return `${minutes}:${partInSeconds}`;
}



function highScoreSetter() {

    if (score > highScore) {
        highScore = score;
    }
}