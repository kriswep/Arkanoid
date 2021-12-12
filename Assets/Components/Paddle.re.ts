import CannonBody from 'Assets/rogue_packages/rogue-cannon/Components/CannonBody.re';
import * as RE from 'rogue-engine';

export default class Paddle extends RE.Component {
  @RE.Prop("Number") speed = 10;
  @RE.Prop("Number") xLimit = 24.5;

  bodyComponent: CannonBody;

  private actualXLimit;

  awake() {
    this.bodyComponent = RE.getComponent(CannonBody, this.object3d) as CannonBody;
    this.actualXLimit = this.xLimit - this.object3d.scale.x / 2;
  }

  update() {
    const movementX =  RE.Input.mouse.movementX;

    this.bodyComponent.body.position.x += movementX * this.speed * RE.Runtime.deltaTime;
  
    if (this.bodyComponent.body.position.x < -this.actualXLimit){
      this.bodyComponent.body.position.x = -this.actualXLimit;
    } else if (this.bodyComponent.body.position.x > this.actualXLimit){
      this.bodyComponent.body.position.x = this.actualXLimit;
    }
  }
}

RE.registerComponent(Paddle);
