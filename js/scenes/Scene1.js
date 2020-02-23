class Scene1 extends Phaser.Scene {
  constructor() {
    super("bootGame");
    
  }

  
preload(){

  this.load.image('play', 'assets/images/play.png');
  this.load.image('BG', 'assets/images/BG.png');
  this.load.audio('theme', [
    'assets/Audio/Torikago.ogg'
])
  
  


}

  create() {
    this.Em = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);
    this.beamSound = this.sound.add("theme");
    this.add.image(500,400 ,"BG");
   
    
    this.titleText = this.add.text(520, 100, 'mArIo GaMe', {fontSize:"60px", fill: '#00ffff' });
    const helloButton = this.add.image(700, 480, 'play').setScale(.5); 
    helloButton.setInteractive();
    helloButton.on('pointerdown', () => { 
    this.scene.start("playGame");
    this.beamSound.stop();
    });
  }
  update(){

    if (Phaser.Input.Keyboard.JustDown(this.Em)) {
      
      this.beamSound.play();
      }

  }
}

