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
    scene: [Scene1, Scene2, Scene3, death, sceneTransition]
}

var game = new Phaser.Game(config);
var map;
var map2;
var player;
var enemy;
var enemy1;
var enemy;
var enemy2;
var enemy3;
var cursors;
// var bgLayer, worldLayer, coinsLayer, coinRed, spikeLayer, leftColliderWall, rightColliderWall;
var redCoinsLayer, coinsLayer, enemySpikeLayer, worldLayer, exitLayer,
    rightColliderLayer, leftColliderLayer, rightColliderLayer1, leftColliderLayer1,
    rightColliderLayer2, leftColliderLayer2, enemyWalkingLayer, bgLayer, exitLayer;
var text;
var score = 0;
var lives = 3;