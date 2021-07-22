namespace Endabgabe_360_Defender {
  import ƒ = FudgeCore;

  export class QuadLane extends ƒ.Node {
    static mesh: ƒ.Mesh = new ƒ.MeshCube("Lane");
    static material: ƒ.Material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));

    constructor(_name: string, _pos: ƒ.Vector3, _scale: ƒ.Vector3 ) {
      super(_name);

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);
      this.mtxLocal.translateZ(_pos.z);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(QuadLane.mesh);
      cmpMesh.mtxPivot.scaleX(_scale.x);
      cmpMesh.mtxPivot.scaleY(_scale.y);
      cmpMesh.mtxPivot.scaleZ(_scale.z);


      this.addComponent(cmpMesh);

      this.addComponent(new ƒ.ComponentMaterial(QuadLane.material));
      this.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
    }

    public setTransform(_pos: ƒ.Vector3, _rot: ƒ.Vector3 ): void {
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);
      this.mtxLocal.translateZ(_pos.z);

      this.mtxLocal.rotateX(_rot.x);
      this.mtxLocal.rotateY(_rot.y);
      this.mtxLocal.rotateZ(_rot.z);
    }

  }
}