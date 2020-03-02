var map;
var player;
var enemy;
var cursors;
var bgLayer, groundLayer, coinLayer, coinRed, spikeLayer, leftColliderWall, rightColliderWall;
var text;
var score = 0;


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
        this.load.image('coin32', 'assets/images/coin32.png');
        this.load.image('coinRed', 'assets/images/coinRed.png');
        this.load.image('inviWall', 'assets/images/inviWall.png');

        // this.load.image('coinRed', 'assets/images/coinRed.png');

        // player animations
        this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');

        // load map BG
        this.load.image('parallax', 'assets/images/pMountain.png');
        this.load.image('BG', 'assets/images/BG.png');

        //load enemy sprite
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('walkingEnemy', 'assets/images/walkingEnemy.png');

        //load music
        this.load.audio('theme', [
            'assets/Audio/themeMusic.ogg'
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
        this.jump.Volume = 0.1;
        this.themeMusic = this.sound.add("theme");
        this.themeMusic.play();
        this.themeMusic.loop = true;
        // load the map 
        map = this.make.tilemap({ key: 'map' });
        // add BG 
        this.add.image(500, 400, "BG").setScrollFactor(0);
        this.add.image(300, 500, "parallax").setScale(2).setScrollFactor(.1);



        // tiles for the ground layer
        var groundTiles = map.addTilesetImage('tilesheet');
        // create the ground layer
        groundLayer = map.createDynamicLayer('World', groundTiles, 0, 0);
        // the player will collide with this layer
        groundLayer.setCollisionByExclusion([-1]);

        // bg image used as tileset
        var backgroundA = map.addTilesetImage('tilesheet');
        // // add BG as tiles
        bgLayer = map.createDynamicLayer('BG', backgroundA, 0, 0);

        // coin image used as tilesheet
        var coinGold = map.addTilesetImage('coin32');
        // // add coins as tiles
        coinLayer = map.createDynamicLayer('Coin', coinGold, 0, 0);

        coinLayer.setCollisionByExclusion([-1]);

        var coinR = map.addTilesetImage('coinRed');
        // // add coins as tiles
        coinRed = map.createDynamicLayer('redCoin', coinR, 0, 0);

        coinRed.setCollisionByExclusion([-1]);

        // var iWall = map.addTilesetImage('inviWall');
        // // add coins as tiles
        leftColliderWall = map.createDynamicLayer('leftWall', 0, 0);

        leftColliderWall.setCollisionByExclusion([-1]);

        // var iWall = map.addTilesetImage('inviWall');
        // // add coins as tiles
        rightColliderWall = map.createDynamicLayer('rightWall', 0, 0);

        rightColliderWall.setCollisionByExclusion([-1]);


        //create enemies
        var redSpike = map.addTilesetImage('spike');
        // // add coins as tiles
        spikeLayer = map.createDynamicLayer('Enemy', redSpike, 0, 0);
        spikeLayer.setCollisionByExclusion([-1]);

        enemy = this.physics.add.sprite(1100, 500, "walkingEnemy");
        enemy.setBounce(.1);


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
        this.physics.add.collider(coinLayer, player);
        this.physics.add.collider(coinRed, player);
        this.physics.add.collider(spikeLayer, player);
        this.physics.add.collider(groundLayer, enemy);
        this.physics.add.collider(leftColliderWall, enemy);
        this.physics.add.collider(rightColliderWall, enemy);
        this.physics.add.collider(player, enemy);

        coinLayer.setTileIndexCallback(101, collectCoin, this);
        // when the player overlaps with a tile with index 101, collectCoin 
        // will be called    
        this.physics.add.overlap(player, coinLayer);

        coinRed.setTileIndexCallback(102, collectRedCoin, this);
        // when the player overlaps with a tile with index 17, collectCoin 
        // will be called    
        this.physics.add.overlap(player, coinRed);

        spikeLayer.setTileIndexCallback(103, playerDied, this);
        // when the player overlaps with a tile with index 17, collectCoin 
        // will be called    
        this.physics.add.overlap(player, spikeLayer);

        leftColliderWall.setTileIndexCallback(104, enemyCollidedLeft, this);
        // when the player overlaps with a tile with index 17, collectCoin 
        // will be called    
        this.physics.add.overlap(enemy, leftColliderWall);

        rightColliderWall.setTileIndexCallback(104, enemyCollidedRight, this);
        // when the player overlaps with a tile with index 17, collectCoin 
        // will be called    
        this.physics.add.overlap(enemy, rightColliderWall);


        rightColliderWall.setTileIndexCallback(playerDied, this);
        // when the player overlaps with a tile with index 17, collectCoin 
        // will be called    

        this.physics.add.overlap(enemy, player, this.playerDied, null, this);



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

        // this text will show the score
        text = this.add.text(700, 50, '0', {
            fontSize: '40px',
            fill: '#000000'
        });
        // fix the text to the camera
        text.setScrollFactor(0);
        enemy.body.setVelocityX(-50);

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

function enemyMovement() {
    enemy.flipX = false;
    enemy.body.setVelocityX(-50);
    //enemy.x = 1125;
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
    coinRed.removeTileAt(tile.x, tile.y); // remove the tile/coin
    score = score + 100; // add 10 points to the score

    this.collectCoin.play();
    text.setText(score); // set the text to show the current score
    return false;

}

function playerDied() {
    this.scene.start('death');

}

function enemyCollidedLeft() {
    console.log('enemy collided')
    enemy.body.setVelocityX(-500);
    enemy.flipX = true;
}

function enemyCollidedRight() {
    console.log('enemy collided')
    enemy.body.setVelocityX(+500);
    enemy.flipX = false;

}