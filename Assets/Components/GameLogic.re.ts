import * as RE from 'rogue-engine';
import * as THREE from 'three';

export default class GameLogic extends RE.Component {
  @RE.Prop("Prefab") ballPrefab: RE.Prefab;
  @RE.Prop("Prefab") brickWallPrefab: RE.Prefab;
  @RE.Prop("Prefab") paddlePrefab: RE.Prefab;

  ball: THREE.Object3D;
  brickWall: THREE.Object3D;
  paddle: THREE.Object3D;

  startGameUI: HTMLDivElement;

  start() {
    this.initUI();
  }

  async initUI() {
    const htmlPath = RE.getStaticPath("ui.html");

    const gameUI = await (await fetch(htmlPath)).text();

    RE.Runtime.uiContainer.innerHTML = gameUI;

    this.startGameUI = document.getElementById("start-game-ui") as HTMLDivElement;

    const startGameButton = document.getElementById("start-game-button") as HTMLDivElement;

    startGameButton.onclick = () => this.onStartGame();
  }

  onStartGame() {
    this.startGameUI.style.display = "none";
    this.startGame();
  }

  startGame() {
    this.ball = this.ballPrefab.instantiate();
    this.brickWall = this.brickWallPrefab.instantiate();
    this.paddle = this.paddlePrefab.instantiate();

    this.paddle.position.y = -32;
    this.ball.position.y = -31;

    RE.Input.mouse.lock();
  }
}

RE.registerComponent(GameLogic);
