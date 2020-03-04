var lives = 3;
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
            var lives = 3;
            this.scene.start("2ndMap");

        });
    }
    update() {

        if (Phaser.Input.Keyboard.JustDown(this.Em)) {

            this.beamSound.play();
            this.beamSound.loop = true;

        }




    }
}