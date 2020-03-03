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
    scene: [Scene1, Scene2, death]
}


var game = new Phaser.Game(config);