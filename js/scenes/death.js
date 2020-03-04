var score = score - score;
class death extends Phaser.Scene {
    constructor() {
        super("death");

    }


    preload() {

        this.load.image('play', 'assets/images/play.png');
        this.load.image('BG0', 'assets/images/mapYpreview.png?v=1');
        this.load.image('quit', 'assets/images/quit.png');
        this.load.image('retry', 'assets/images/retry.png');
        this.load.audio('menuTheme', [
            'assets/Audio/menu.ogg'
        ])
    }

    create() {
        this.Em = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.beamSound = this.sound.add("menuTheme");
        this.add.image(500, 400, "BG0");


        //this.titleText = this.add.text(520, 100, 'You Dieded', { fontSize: "60px", fill: '#00ffff' });

        const retryButton = this.add.image(700, 380, 'retry').setScale(.5);
        retryButton.setInteractive();
        retryButton.on('pointerdown', () => {
            this.scene.start("playGame");

        });



        const quitButton = this.add.image(700, 480, 'quit').setScale(.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            this.scene.start("bootGame");


        });
    }
    update() {

        if (Phaser.Input.Keyboard.JustDown(this.Em)) {

            this.beamSound.play();
            this.beamSound.loop = true;
        }

    }
}