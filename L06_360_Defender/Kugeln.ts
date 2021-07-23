namespace Endabgabe_360_Defender {

  import ƒ = FudgeCore;

  export class Kugeln extends ƒ.Node {
    static mesh: ƒ.Mesh = new ƒ.MeshSphere("Sphere");
    static material: ƒ.Material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 0, 1)));
    rigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(2, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.DEFAULT);

    velocity: ƒ.Vector3;
    

    constructor(_name: string, _pos: ƒ.Vector3, _scale: ƒ.Vector3, _rot: ƒ.Vector3) {
      super(_name);

      let forward : ƒ.Vector3 = new ƒ.Vector3();

      console.log(_rot.x);

      this.velocity = new ƒ.Vector3(_pos.x * 2.5 , _pos.y * 2.5 , 1);

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translate(_pos);
      this.mtxLocal.scale(_scale);
      this.mtxLocal.rotate(_rot);

      this.addComponent(this.rigidbody);
      this.rigidbody.restitution = 2;
      this.rigidbody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.handleCollision);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Kugeln.mesh);
      this.addComponent(cmpMesh);

      this.addComponent(new ƒ.ComponentMaterial(Kugeln.material));
      
      this.getComponent(ƒ.ComponentRigidbody).setVelocity(this.velocity);
      this.getComponent(ƒ.ComponentRigidbody).setPosition(new ƒ.Vector3(0, 0, 0));
     
    }


    private handleCollision(_event: ƒ.EventPhysics) : void
    {
      let name: string = _event.cmpRigidbody.getContainer().name;

      //console.log(_event.cmpRigidbody.getContainer().name);
      
      switch (name)
      {
        case "boden": 
        break;

        case "enemy":
        _event.cmpRigidbody.physicsType = ƒ.PHYSICS_TYPE.DYNAMIC;
        _event.cmpRigidbody.applyImpulseAtPoint(new ƒ.Vector3
          (_event.collisionNormal.x * _event.normalImpulse/3, _event.collisionNormal.y * _event.normalImpulse/3,
            _event.collisionNormal.z * _event.normalImpulse/3), _event.collisionPoint);

        break;
      }

    }

  }

}

 

