class Scene3 extends Phaser.Scene {
    constructor() {
        super("2ndMap");
        // this function will be called when the player touches a coins
    }
    preload() {
        console.log("<2nd map>")
            // map2 made with Tiled in JSON format
        this.load.tilemapTiledJSON('map2', 'assets/maps/mapZ.json');
        // tiles in spritesheet 
        this.load.spritesheet('pixelTiles', 'assets/images/pixelTiles.png', { frameWidth: 50, frameHeight: 32 });
        // simple coins image
        this.load.image('pesoGold', 'assets/images/pesoGold.png');
        this.load.image('pesoRed', 'assets/images/pesoRed.png');
        this.load.image('inviWall', 'assets/images/inviWall.png');

        // this.load.image('coinRed', 'assets/images/coinRed.png');

        // player animations
        this.load.atlas('player', 'assets/sprites/player.png', 'assets/sprites/player.json');

        // load map2 BG
        this.load.image('parallax', 'assets/images/pMountain.png');
        this.load.image('BG', 'assets/images/cloudBG.png');

        //load enemy sprite
        // this.load.image('spike', 'assets/images/spike.png');
        this.load.image('walkingEnemy', 'assets/images/walkingEnemy.png');

        //load music
        this.load.audio('theme', [
            'assets/Audio/themeMusic.ogg'
        ]);
        this.load.audio('coinSFX', [
            'assets/Audio/coinCollect.ogg'
        ]);

        this.load.audio('jumpSFX', [
            'assets/Audio/SFXjump.ogg'
        ]);

        this.load.audio('playerDieSFX', [
            'assets/Audio/playerDie.ogg'
        ]);

        this.load.audio('enemyDieSFX', [
            'assets/Audio/enemyDie.ogg'
        ]);


    }

    create() {
        deathInMap1 = 0;
        deathInMap2 = 1;
        this.Es = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.enemyDieSound = this.sound.add("enemyDieSFX");
        this.playerDieSound = this.sound.add("playerDieSFX");
        this.collectCoin = this.sound.add("coinSFX");
        this.jump = this.sound.add("jumpSFX", { volume: 0.8 });;
        this.jump.Volume = 0.1;
        this.themeMusic = this.sound.add("theme");
        this.themeMusic.play();
        this.themeMusic.loop = true;
        // load the map2 
        map2 = this.make.tilemap({ key: 'map2' });
        // add BG 
        this.add.image(500, 400, "BG").setScrollFactor(0);
        this.add.image(300, 400, "parallax").setScale(1).setScrollFactor(.2);



        // tiles for the ground layer
        var groundTiles = map2.addTilesetImage('pixelTiles');
        // create the ground layer
        worldLayer = map2.createDynamicLayer('World', groundTiles, 0, 0);
        // the player will collide with this layer
        worldLayer.setCollisionByExclusion([-1]);

        // bg image used as tileset
        var backgroundA = map2.addTilesetImage('pixelTiles');
        // // add BG as tiles
        bgLayer = map2.createDynamicLayer('BG', backgroundA, 0, 0);

        // coins image used as tilesheet
        var coinGold = map2.addTilesetImage('pesoGold');
        // // add coins as tiles
        coinsLayer = map2.createDynamicLayer('Coins', coinGold, 0, 0);

        coinsLayer.setCollisionByExclusion([-1]);

        var coinR = map2.addTilesetImage('pesoRed');
        // // add coins as tiles
        redCoinsLayer = map2.createDynamicLayer('redCoins', coinR, 0, 0);

        redCoinsLayer.setCollisionByExclusion([-1]);


        var portalTile = map2.addTilesetImage('pixelTiles');
        portal = map2.createDynamicLayer('Portal', portalTile, 0, 0);
        portal.setCollisionByExclusion([-1])


        // var iWall = map2.addTilesetImage('inviWall');
        leftColliderLayer = map2.createDynamicLayer('leftCollider', 0, 0);
        leftColliderLayer.setCollisionByExclusion([-1]);

        //var iWall = map2.addTilesetImage('inviWall');
        rightColliderLayer = map2.createDynamicLayer('rightCollider', 0, 0);
        rightColliderLayer.setCollisionByExclusion([-1]);



        //   var iWall = map2.addTilesetImage('inviWall');
        leftColliderLayer1 = map2.createDynamicLayer('leftCollider1', 0, 0);
        leftColliderLayer1.setCollisionByExclusion([-1]);

        // var iWall = map2.addTilesetImage('inviWall');
        rightColliderLayer1 = map2.createDynamicLayer('rightCollider1', 0, 0);
        rightColliderLayer1.setCollisionByExclusion([-1]);


        // var iWall = map2.addTilesetImage('inviWall');
        leftColliderLayer2 = map2.createDynamicLayer('leftCollider2', 0, 0);
        leftColliderLayer2.setCollisionByExclusion([-1]);

        // var iWall = map2.addTilesetImage('inviWall');
        rightColliderLayer2 = map2.createDynamicLayer('rightCollider2', 0, 0);
        rightColliderLayer2.setCollisionByExclusion([-1]);




        var exit = map2.addTilesetImage('pixelTiles');
        exitLayer = map2.createDynamicLayer('Exit', exit, 0, 0);
        exitLayer.setCollisionByExclusion([-1]);


        var redSpike = map2.addTilesetImage('pixelTiles');
        enemySpikeLayer = map2.createDynamicLayer('enemySpike', redSpike, 0, 0);
        enemySpikeLayer.setCollisionByExclusion([-1]);

        var enemyWalk = map2.addTilesetImage('pixelTiles');
        enemyWalkingLayer = map2.createDynamicLayer('enemyWalking', enemyWalk, 0, 0);
        enemyWalkingLayer.setCollisionByExclusion([-1]);

        enemy = this.physics.add.sprite(1717, 647, "walkingEnemy");
        enemy.setBounce(.1);

        enemy1 = this.physics.add.sprite(537, 669, "walkingEnemy");
        enemy1.setBounce(.1);


        enemy2 = this.physics.add.sprite(1097, 662, "walkingEnemy");
        enemy2.setBounce(.1);


        enemy3 = this.physics.add.sprite(10, 560, "walkingEnemy");
        enemy3.setBounce(.1);


        // set the boundaries of our game world
        this.physics.world.bounds.width = worldLayer.width;
        this.physics.world.bounds.height = worldLayer.height;

        // create the player sprite    
        player = this.physics.add.sprite(playerX, playerY, 'player').setScale(.3);
        player.body.collideWorldBounds = true;
        player.setBounce(0.2); // our player will bounce from items10


        this.physics.add.collider(worldLayer, player);

        this.physics.add.collider(exitLayer, player, nextScene3, null, this);

        this.physics.add.collider(enemySpikeLayer, player, playerSpiked, null, this);

        this.physics.add.collider(player, enemy, playerDied, null, this);
        this.physics.add.collider(player, enemy1, playerDied, null, this);
        this.physics.add.collider(player, enemy2, playerDied, null, this);
        this.physics.add.collider(player, enemy3, playerDied, null, this);

        this.physics.add.collider(player, portal, secretMap, null, this);

        this.physics.add.collider(worldLayer, enemy);
        this.physics.add.collider(worldLayer, enemy1);
        this.physics.add.collider(worldLayer, enemy2);
        this.physics.add.collider(worldLayer, enemy3);

        this.physics.add.collider(leftColliderLayer, enemy);
        this.physics.add.collider(rightColliderLayer, enemy);

        this.physics.add.collider(leftColliderLayer1, enemy1);
        this.physics.add.collider(rightColliderLayer1, enemy1);

        this.physics.add.collider(leftColliderLayer2, enemy2);
        this.physics.add.collider(rightColliderLayer2, enemy2);


        coinsLayer.setTileIndexCallback(251, collectCoin, this);
        this.physics.add.overlap(player, coinsLayer);


        // portal.setTileIndexCallback(15, nextScene3, this);
        // this.physics.add.overlap(player, portal);

        redCoinsLayer.setTileIndexCallback(250, collectRedCoin, this);
        this.physics.add.overlap(player, redCoinsLayer);

        enemySpikeLayer.setTileIndexCallback(103, playerDied, this);
        this.physics.add.overlap(player, enemySpikeLayer);

        leftColliderLayer.setTileIndexCallback(249, enemyCollidedLeft, this);
        this.physics.add.overlap(enemy, leftColliderLayer);
        rightColliderLayer.setTileIndexCallback(249, enemyCollidedRight, this);
        this.physics.add.overlap(enemy, rightColliderLayer);

        leftColliderLayer1.setTileIndexCallback(249, enemyCollidedLeft1, this);
        this.physics.add.overlap(enemy1, leftColliderLayer1);
        rightColliderLayer1.setTileIndexCallback(249, enemyCollidedRight1, this);
        this.physics.add.overlap(enemy1, rightColliderLayer1);



        leftColliderLayer2.setTileIndexCallback(249, enemyCollidedLeft2M2, this);
        this.physics.add.overlap(enemy1, leftColliderLayer2);
        rightColliderLayer2.setTileIndexCallback(249, enemyCollidedRight2M2, this);
        this.physics.add.overlap(enemy1, rightColliderLayer2);



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

        // this.initialTime = 60;
        // timetext = this.add.text(300, 65, '' + formatTime(this.initialTime), {
        //     fontSize: '40px',
        //     fill: '#ffffff'

        // });
        // timetext.setScrollFactor(0);

        timedEvent = this.time.addEvent({ delay: 1000, callback: onEvent, callbackScope: this, loop: true });


        cursors = this.input.keyboard.createCursorKeys();

        // set bounds so the camera won't go outside the game world
        this.cameras.main.setBounds(0, 0, map2.widthInPixels, map2.heightInPixels);
        // make the camera follow the player
        this.cameras.main.startFollow(player);

        // this text will show the score
        text = this.add.text(700, 50, '0', {
            fontSize: '40px',
            fill: '#000000'
        });
        // fix the text to the camera
        text.setScrollFactor(0);

        this.initialTime = maxTime;
        timetext = this.add.text(300, 65, '' + formatTime(this.initialTime), {
            fontSize: '40px',
            fill: '#ffffff'

        });
        timetext.setScrollFactor(0);



        enemy.body.setVelocityX(-50);

        enemy1.body.setVelocityX(+50);
        enemy1.flipX = true;


        enemy2.body.setVelocityX(+100);
        enemy2.flipX = true;


        enemy3.body.setVelocityX(-100);



    }
    update(time, delta) {
        if (lives == 0 || lives < 0) {
            this.time.addEvent({
                delay: 500,
                callback: () => {
                    this.input.keyboard.enabled = true;
                    this.themeMusic.stop();
                    this.scene.start("gameOver");
                },

            });

        }


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

function nextScene3() {
    highScoreSetter();
    // score = 0;
    this.themeMusic.stop();
    playerX = 50;
    playerY = 655;
    this.scene.start('sceneTransition2')
}

function secretMap() {
    if (Phaser.Input.Keyboard.JustDown(this.Es)) {

        this.themeMusic.stop();
        console.log("<secret map>")
        this.scene.start('3rdMap')

    }


}