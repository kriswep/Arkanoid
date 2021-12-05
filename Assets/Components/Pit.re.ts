import CannonBody from 'Assets/rogue_packages/rogue-cannon/Components/CannonBody.re';
import * as RE from 'rogue-engine';

export default class Pit extends RE.Component {
  static onHit = () => {};

  bodyComponent: CannonBody

  start() {
    this.bodyComponent = RE.getComponent(CannonBody, this.object3d) as CannonBody;
    
    this.bodyComponent.onCollide((event )=> {
      const otherBody = CannonBody.findByBody(event.other);

      if (otherBody?.object3d.name === "Ball"){
        Pit.onHit();
      }
    })
  
  }
}

RE.registerComponent(Pit);
