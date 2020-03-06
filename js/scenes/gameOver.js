class gameOver extends Phaser.Scene {
    constructor() {
        super("gameOver");

    }

    preload() {
        console.log("gameOver")

        this.load.image('play', 'assets/images/play.png');
        this.load.image('BG1', 'assets/images/mapYpreview.png');
        this.load.audio('deathTheme', [
            'assets/Audio/deathMusic.ogg'
        ])

    }

    create() {
        this.Em = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.gameOverMusic = this.sound.add("deathTheme");
        this.add.image(500, 400, "BG1");


        this.Congrats = this.add.text(520, 100, 'Game Over!', { fontSize: "60px", fill: '#00ffff' });
        const helloButton = this.add.image(700, 480, 'play').setScale(.5);
        helloButton.setInteractive();
        helloButton.on('pointerdown', () => {
            this.gameOverMusic.stop();
            lives = 3;
            playerX = 50;
            playerY = 666;
            score = 0;
            deathInMap1 = 0;
            deathInMap2 = 0;
            deathInMap3 = 0;
            deathInMap4 = 0;
            console.log("maxTime:",
                maxTime);
            this.scene.start("bootGame");

        });

        textHighScore = this.add.text(700, 50, '', {
            fontSize: '40px',
            fill: '#000000'
        });
        // fix the text to the camera   
        this.gameOverMusic.play();
        this.gameOverMusic.loop = true;
        textHighScore.setScrollFactor(0);
    }
    update() {

        textHighScore.setText(
            "Session High score:" + highScore);
        if (Phaser.Input.Keyboard.JustDown(this.Em)) {
            this.gameOverMusic.stop();
            this.gameOverMusic.play();
            this.gameOverMusic.loop = true;

        }
    }

}