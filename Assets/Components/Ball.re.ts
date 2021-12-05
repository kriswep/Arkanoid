import CannonBody from 'Assets/rogue_packages/rogue-cannon/Components/CannonBody.re';
import { Vec3 } from 'cannon-es';
import * as RE from 'rogue-engine';

export default class Ball extends RE.Component {
  @RE.Prop("Number") speed = 50;
  bodyComponent: CannonBody;
  
  awake() {
    this.bodyComponent = RE.getComponent(CannonBody, this.object3d) as CannonBody;
    this.bodyComponent.body.velocity.set(0.3,0.7,0);
  }

  update() {
    const velocity = this.bodyComponent.body.velocity;

    if (velocity.length() !== this.speed) {
      velocity.normalize();
      velocity.scale(this.speed, velocity);
    }

    this.correctSlowAngles(velocity);

  }

  correctSlowAngles(velocity: Vec3) {
    if (velocity.y < 0 && velocity.y > -10 ){
      velocity.y -= 10;
    }
    if (velocity.y >= 0 && velocity.y < 10 ){
      velocity.y += 10;
    }
  }
}

RE.registerComponent(Ball);
