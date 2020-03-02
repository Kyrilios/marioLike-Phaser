var map;
var player;
var cursors;
var groundLayer, coinLayer, coinRed;
var text;
var score = '';


class Scene2 extends Phaser.Scene {
    constructor() {
        super("playGame");
        // this function will be called when the player touches a coin

    }
    preload() {
        // map made with Tiled in JSON format
        this.load.tilemapTiledJSON('map', 'assets/maps/mapX.json');
        // tiles in spritesheet 
        this.load.spritesheet('tilesheet', 'assets/images/tilesheet.png', { frameWidth: 50, frameHeight: 32 });
        // simple coin image
        // this.load.image('coin', 'assets/images/coinGold.png');
        // this.load.image('coinRed', 'assets/images/coinRed.png');



        // player animations
        this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');
        // load map BG
        this.load.image('BG', 'assets/images/BG.png');

        this.load.audio('theme', [
            'assets/Audio/Torikago.ogg'
        ]);

        this.load.audio('coinSFX', [
            'assets/Audio/coinCollect.ogg'
        ]);

        this.load.audio('jumpSFX', [
            'assets/Audio/jump.ogg'
        ]);
    }

    create() {

        this.collectCoin = this.sound.add("coinSFX");
        this.jump = this.sound.add("jumpSFX");
        this.beamSound = this.sound.add("theme");
        this.beamSound.play();
        this.beamSound.loop = true;
        // load the map 
        map = this.make.tilemap({ key: 'map' });
        // add BG
        this.add.image(500, 400, "BG").setScrollFactor(0);
        // tiles for the ground layer
        var groundTiles = map.addTilesetImage('tilesheet');
        // create the ground layer
        groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        // the player will collide with this layer
        groundLayer.setCollisionByExclusion([-1]);

        // coin image used as tileset
        // var coinTiles = map.addTilesetImage('coin');
        // // add coins as tiles
        // coinLayer = map.createDynamicLayer('Coins', coinTiles, 0, 0);

        // var RedCoins = map.addTilesetImage('coinRed');
        // // add coins as tiles
        // coinRed = map.createDynamicLayer('redCoin', RedCoins, 0, 0);

        // set the boundaries of our game world
        this.physics.world.bounds.width = groundLayer.width;
        this.physics.world.bounds.height = groundLayer.height;

        // create the player sprite    
        player = this.physics.add.sprite(100, 600, 'player').setScale(.5);
        player.setBounce(0.2); // our player will bounce from items10

        // small fix to our player images, we resize the physics body object slightly
        //player.body.setSize(player.width, player.height);

        // player will collide with the level tiles 
        this.physics.add.collider(groundLayer, player);

        // coinLayer.setTileIndexCallback(17, collectCoin, this);
        // // when the player overlaps with a tile with index 17, collectCoin 
        // // will be called    
        // this.physics.add.overlap(player, coinLayer);



        // coinRed.setTileIndexCallback(21, collectRedCoin, this);
        // when the player overlaps with a tile with index 17, collectCoin 
        // will be called    
        // this.physics.add.collider(player, coinRed);
        // coinRed.setCollisionByExclusion([-1]);


        // player walk animation
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', { prefix: 'p1_walk', start: 1, end: 11, zeroPad: 2 }),
            frameRate: 10,
            repeat: -1
        });
        // idle with only one frame, so repeat is not neaded
        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 'p1_stand' }],
            frameRate: 10,
        });


        cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(player);

        // set background color, so the sky is not black    
        // this.cameras.main.setBackgroundColor('#ccccff');

        // this text will show the score
        text = this.add.text(700, 50, '0', {
            fontSize: '40px',
            fill: '#000000'
        });
        // fix the text to the camera
        text.setScrollFactor(0);

    }
    update(time, delta) {


        if (cursors.left.isDown) {
            player.body.setVelocityX(-200);
            player.anims.play('walk', true); // walk left
            player.flipX = true; // flip the sprite to the left
        } else if (cursors.right.isDown) {
            player.body.setVelocityX(200);
            player.anims.play('walk', true);
            player.flipX = false; // use the original sprite looking to the right
        } else {
            player.body.setVelocityX(0);
            player.anims.play('idle', true);
        }
        // jump 
        if (cursors.up.isDown && player.body.onFloor()) {
            this.jump.play();
            player.body.setVelocityY(-500);

        }
    }

}

function collectCoin(sprite, tile) {
    // this.scene.start('bootGame');
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 10 points to the score

    this.collectCoin.play();
    text.setText(score); // set the text to show the current score
    return false;


}

function collectRedCoin(sprite, tile) {
    // this.scene.start('bootGame');
    coinLayer.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score++; // add 10 points to the score

    this.collectCoin.play();
    text.setText(score); // set the text to show the current score
    return false;

}


function coinOverlap(player, redCoin) {
    score++;
    redCoin.kill();
}