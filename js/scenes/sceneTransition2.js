class sceneTransition2 extends Phaser.Scene {
    constructor() {
        super("sceneTransition2");

    }


    preload() {
        console.log('<Scene Transistion>')
        this.load.image('play', 'assets/images/play.png');
        this.load.image('BG1', 'assets/images/mapYpreview.png');
        // this.load.audio('menuTheme', [
        //     'assets/Audio/menu.ogg'
        // ])




    }

    create() {
        this.Em = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
        this.beamSound = this.sound.add("menuTheme");
        this.add.image(500, 400, "BG1");


        this.titleText = this.add.text(520, 100, 'Level Start', { fontSize: "60px", fill: '#00ffff' });

    }
    update() {

        this.time.addEvent({
            delay: 1000,
            callback: () => {
                this.scene.start('4thMap');
            },

        });
    }
}