import * as RE from 'rogue-engine';
import * as THREE from 'three';
import Ball from './Ball.re';
import Pit from './Pit.re';

export default class GameLogic extends RE.Component {
  @RE.Prop("Prefab") ballPrefab: RE.Prefab;
  @RE.Prop("Prefab") brickWallPrefab: RE.Prefab;
  @RE.Prop("Prefab") paddlePrefab: RE.Prefab;

  @RE.Prop("Number") lives: number;
  currentLives = 0;

  ball: THREE.Object3D;
  brickWall: THREE.Object3D;
  paddle: THREE.Object3D;

  ballComponent: Ball;

  startGameUI: HTMLDivElement;
  gameOverUI: HTMLDivElement;

  start() {
    this.initUI();

    Pit.onHit = () => this.onHitPit();
  }

  async initUI() {
    const htmlPath = RE.getStaticPath("ui.html");

    const gameUI = await (await fetch(htmlPath)).text();

    RE.Runtime.uiContainer.innerHTML = gameUI;

    this.startGameUI = document.getElementById("start-game-ui") as HTMLDivElement;
    this.gameOverUI = document.getElementById("game-over-ui") as HTMLDivElement;

    const startGameButton = document.getElementById("start-game-button") as HTMLDivElement;
    const restartButton = document.getElementById("restart-button") as HTMLDivElement;

    startGameButton.onclick = () => this.onStartGame();
    restartButton.onclick = () => this.onStartOver();

    this.startGameUI.style.display = "block";
  }

  onHitPit() {
    this.currentLives -= 1;
    
    if (this.currentLives <= 0) {
      return this.endGame();
    }

    this.ballComponent.bodyComponent.body.position.x = 0;
    this.ballComponent.bodyComponent.body.position.y = -31;
  }

  onStartGame() {
    this.startGameUI.style.display = "none";
    this.startGame();
  }

  onStartOver() {
    this.gameOverUI.style.display = "none";
    this.startGame();
  }

  startGame() {    
    this.currentLives = this.lives;

    this.ball = this.ballPrefab.instantiate();
    this.brickWall = this.brickWallPrefab.instantiate();
    this.paddle = this.paddlePrefab.instantiate();

    this.ballComponent = RE.getComponent(Ball, this.ball) as Ball;

    this.paddle.position.y = -32;
    this.ball.position.y = -31;

    RE.Input.mouse.lock();
  }

  endGame() {
    RE.Input.mouse.unlock();

    this.gameOverUI.style.display = "block";

    RE.Runtime.scene.remove(this.ball);
    RE.Runtime.scene.remove(this.brickWall);
    RE.Runtime.scene.remove(this.paddle);
  }
}

RE.registerComponent(GameLogic);
