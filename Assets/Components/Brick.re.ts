import CannonBody from 'Assets/rogue_packages/rogue-cannon/Components/CannonBody.re';
import * as RE from 'rogue-engine';

export default class Brick extends RE.Component {

  bodyComponent: CannonBody;

  start() {
    this.bodyComponent = RE.getComponent(CannonBody, this.object3d) as CannonBody;

    this.bodyComponent.onCollide(()=>{
      this.object3d.parent?.remove(this.object3d);
    })
  }
}

RE.registerComponent(Brick);
