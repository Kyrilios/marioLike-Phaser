class death extends Phaser.Scene {
    constructor() {
        super("death");

    }


    preload() {

        this.load.image('play', 'assets/images/play.png');
        this.load.image('BG0', 'assets/images/mapYpreview.png?v=1');
        this.load.image('quit', 'assets/images/quit.png');
        this.load.image('retry', 'assets/images/retry.png');
        this.load.audio('deathTheme', [
            'assets/Audio/deathMusic.ogg'
        ])
    }

    create() {
        this.deathSound = this.sound.add("deathTheme");
        this.deathSound.play();
        this.add.image(500, 400, "BG0");

        livesText = this.add.text(700, 50, '0', {
            fontSize: '40px',
            fill: '#000000'

        });
        livesText.setText("Lives:" + lives);
        console.log(lives);
        // this.livesText = this.add.text(520, 100, 'You Dieded', lives, { fontSize: "60px", fill: '#00ffff' });


        const retryButton = this.add.image(700, 380, 'retry').setScale(.5);
        retryButton.setInteractive();
        retryButton.on('pointerdown', () => {
            this.deathSound.stop()
            if (deathInMap1 == 1) {
                this.scene.start("playGame");

            } else if (deathInMap2 == 1) {
                this.scene.start("2ndMap");

            } else if (deathInMap3 == 1) {
                this.scene.start("3rdMap")
            } else if (deathInMap4 == 1) {
                this.scene.start("4thMap");
            }




        });



        const quitButton = this.add.image(700, 480, 'quit').setScale(.5);
        quitButton.setInteractive();
        quitButton.on('pointerdown', () => {
            highScoreSetter();
            score = 0;
            this.deathSound.stop()
            this.scene.start("bootGame");
            console.log("play death bgm");




        });
    }
    update() {


    }
}