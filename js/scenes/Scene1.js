class Scene1 extends Phaser.Scene {
    constructor() {
        super("bootGame");

    }

    preload() {

        this.load.image('play', 'assets/images/play.png');
        this.load.image('BG1', 'assets/images/mapYpreview.png');
        this.load.audio('menuTheme', [
            'assets/Audio/menu.ogg'
        ])

    }

    create() {
        this.Em = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.beamSound = this.sound.add("menuTheme");
        this.add.image(500, 400, "BG1");


        this.titleText = this.add.text(520, 100, 'mArIo GaMe', { fontSize: "60px", fill: '#00ffff' });
        const helloButton = this.add.image(700, 480, 'play').setScale(.5);
        helloButton.setInteractive();
        helloButton.on('pointerdown', () => {
            this.beamSound.stop();
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
            this.scene.start("4thMap");

        });
        this.beamSound.play();
        this.beamSound.loop = true;

        textHighScore = this.add.text(700, 50, '', {
            fontSize: '40px',
            fill: '#000000'
        });
        // fix the text to the camera   
        textHighScore.setScrollFactor(0);
    }
    update() {

        textHighScore.setText(
            "Session High score:" + highScore);

        if (Phaser.Input.Keyboard.JustDown(this.Em)) {
            this.beamSound.stop();
            this.beamSound.play();
            this.beamSound.loop = true;

        }
    }

}