class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
  }
preload(){

  this.load.image('play', 'assets/images/play.png');
  this.load.image('BG', 'assets/images/BG.png');
  // game.load.audio('torikago', ['assets/Audio/torikago.mp3']);


}

  create() {
   // this.stage.backgroundColor = "#4488AA";
    this.add.image(500,400 ,"BG");
    // music = game.add.audio('torikago');
    // music.play();
    this.titleText = this.add.text(520, 100, 'mArIo GaMe', {fontSize:"60px", fill: '#00ffff' });
    const helloButton = this.add.image(700, 480, 'play').setScale(.5); 
    helloButton.setInteractive();
    helloButton.on('pointerdown', () => { 
    this.scene.start("playGame");
    });
  }
}

