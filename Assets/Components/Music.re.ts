import * as RE from 'rogue-engine';
import * as THREE from 'three';
import { Audio } from 'three';


export default class Music extends RE.Component {

  @RE.Prop("Audio") backgroundMusic: Audio;
  @RE.Prop("Number") soundVolume: number = 0.3; 
  
  
  start() {
    const audio = new Audio(this.backgroundMusic.listener);
    audio.setBuffer(this.backgroundMusic.buffer as AudioBuffer);
    
    this.object3d.add(audio);
    
    const documentBody = document.getElementsByTagName("body") as HTMLCollectionOf<HTMLBodyElement>;
    const startGameButton = document.getElementById("start-game-button") as HTMLDivElement;

    documentBody[0].addEventListener("click", this.startMusic);
    documentBody[0].addEventListener("touchstart", this.startMusic);

    // restart on start button, doesn't start on mobile when clicking on body
    if(startGameButton){
      startGameButton.addEventListener("click", this.restartMusic);
      startGameButton.addEventListener("touchstart", this.restartMusic);
    }
  }
  
  restartMusic = () => {
    if (this.backgroundMusic.isPlaying){
      this.backgroundMusic.stop();
    }
    this.startMusic();
  }

  startMusic = () => {
    if (!this.backgroundMusic.isPlaying){
      this.backgroundMusic.setVolume(this.soundVolume);
      this.backgroundMusic.setLoop(true);
      this.backgroundMusic.play();
    }
  }
}

RE.registerComponent(Music);
