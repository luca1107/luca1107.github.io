namespace Endabgabe_360_Defender {
  import ƒ = FudgeCore;

  export enum CUBE_TYPE {
    GREEN = "Green",
    RED = "Red",
    BLUE = "Blue",
    YELLOW = "Yellow",
    MAGENTA = "Magenta",
    CYAN = "Cyan"
}
  type Materials = Map<CUBE_TYPE, ƒ.Material>;

  export class Einzelgeometrie extends ƒ.Node {
    static _root:ƒ.Node;
    private static materials: Materials = Einzelgeometrie.createMaterials();
    private static mesh: ƒ.Mesh = new ƒ.MeshCube("Cube");
    rigidbody: ƒ.ComponentRigidbody = new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
    direction: boolean ;

    constructor(_name: string, _pos: ƒ.Vector3, _scale: ƒ.Vector3, _dir: boolean, _type: CUBE_TYPE, root: ƒ.Node) {
      super(_name);

      Einzelgeometrie._root = root;

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);
      this.mtxLocal.translateZ(_pos.z);

      let cmpMesh: ƒ.ComponentMesh = new ƒ.ComponentMesh(Einzelgeometrie.mesh);
      cmpMesh.mtxPivot.scaleX(_scale.x);
      cmpMesh.mtxPivot.scaleY(_scale.y);
      cmpMesh.mtxPivot.scaleZ(_scale.z);

      this.direction = _dir;


      this.addComponent(cmpMesh);

      let cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(Einzelgeometrie.materials.get(_type));
      this.addComponent(cmpMaterial);
      this.addComponent(this.rigidbody);
      this.rigidbody.addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, this.handleCollision);
    }

    private static createMaterials(): Materials {
      return new Map([
          [CUBE_TYPE.RED, new ƒ.Material(CUBE_TYPE.RED, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")))],
          [CUBE_TYPE.GREEN, new ƒ.Material(CUBE_TYPE.GREEN, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")))],
          [CUBE_TYPE.BLUE, new ƒ.Material(CUBE_TYPE.BLUE, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")))],
          [CUBE_TYPE.MAGENTA, new ƒ.Material(CUBE_TYPE.MAGENTA, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("MAGENTA")))],
          [CUBE_TYPE.YELLOW, new ƒ.Material(CUBE_TYPE.YELLOW, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("YELLOW")))],
          [CUBE_TYPE.CYAN, new ƒ.Material(CUBE_TYPE.CYAN, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("CYAN")))]
      ]);
  }

    public setTransform(_pos: ƒ.Vector3, _rot: ƒ.Vector3): void {
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);
      this.mtxLocal.translateZ(_pos.z);

      this.mtxLocal.rotateX(_rot.x);
      this.mtxLocal.rotateY(_rot.y);
      this.mtxLocal.rotateZ(_rot.z);

    }

    

    public move(): void {
      if (!this.direction)
      this.mtxLocal.translateX( - 1 / 4 * ƒ.Loop.timeFrameReal / 1000);
      else
      this.mtxLocal.translateX(  1 / 4 * ƒ.Loop.timeFrameReal / 1000);
    }

    public handleCollision (_event: ƒ.EventPhysics): void
    {
      if(_event.cmpRigidbody.getContainer().name == "Kugel")
      {
        /*let root: ƒ.Node = _event.cmpRigidbody.getContainer().getParent();s
        root.removeChild(_event.cmpRigidbody.getContainer());*/
      }

      if(_event.cmpRigidbody.getContainer().name == "boden")
      {
        console.log("BodenKoll");
        Einzelgeometrie._root.removeChild(this);
      }
    }
    

    private activatePhysics(): void {
      //console.log("Col");
      this.rigidbody.physicsType = ƒ.PHYSICS_TYPE.DYNAMIC;
    }

  }
}