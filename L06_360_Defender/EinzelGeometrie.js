"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    let CUBE_TYPE;
    (function (CUBE_TYPE) {
        CUBE_TYPE["GREEN"] = "Green";
        CUBE_TYPE["RED"] = "Red";
        CUBE_TYPE["BLUE"] = "Blue";
        CUBE_TYPE["YELLOW"] = "Yellow";
        CUBE_TYPE["MAGENTA"] = "Magenta";
        CUBE_TYPE["CYAN"] = "Cyan";
    })(CUBE_TYPE = Endabgabe_360_Defender.CUBE_TYPE || (Endabgabe_360_Defender.CUBE_TYPE = {}));
    class Einzelgeometrie extends ƒ.Node {
        constructor(_name, _pos, _scale, _dir, _type, root) {
            super(_name);
            this.rigidbody = new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT);
            Einzelgeometrie._root = root;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.mtxLocal.translateZ(_pos.z);
            let cmpMesh = new ƒ.ComponentMesh(Einzelgeometrie.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            cmpMesh.mtxPivot.scaleZ(_scale.z);
            this.direction = _dir;
            this.addComponent(cmpMesh);
            let cmpMaterial = new ƒ.ComponentMaterial(Einzelgeometrie.materials.get(_type));
            this.addComponent(cmpMaterial);
            this.addComponent(this.rigidbody);
            this.rigidbody.addEventListener("ColliderEnteredCollision" /* COLLISION_ENTER */, this.handleCollision);
        }
        static createMaterials() {
            return new Map([
                [CUBE_TYPE.RED, new ƒ.Material(CUBE_TYPE.RED, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("RED")))],
                [CUBE_TYPE.GREEN, new ƒ.Material(CUBE_TYPE.GREEN, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("GREEN")))],
                [CUBE_TYPE.BLUE, new ƒ.Material(CUBE_TYPE.BLUE, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("BLUE")))],
                [CUBE_TYPE.MAGENTA, new ƒ.Material(CUBE_TYPE.MAGENTA, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("MAGENTA")))],
                [CUBE_TYPE.YELLOW, new ƒ.Material(CUBE_TYPE.YELLOW, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("YELLOW")))],
                [CUBE_TYPE.CYAN, new ƒ.Material(CUBE_TYPE.CYAN, ƒ.ShaderUniColor, new ƒ.CoatColored(ƒ.Color.CSS("CYAN")))]
            ]);
        }
        setTransform(_pos, _rot) {
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.mtxLocal.translateZ(_pos.z);
            this.mtxLocal.rotateX(_rot.x);
            this.mtxLocal.rotateY(_rot.y);
            this.mtxLocal.rotateZ(_rot.z);
        }
        move() {
            if (!this.direction)
                this.mtxLocal.translateX(-1 / 4 * ƒ.Loop.timeFrameReal / 1000);
            else
                this.mtxLocal.translateX(1 / 4 * ƒ.Loop.timeFrameReal / 1000);
        }
        handleCollision(_event) {
            if (_event.cmpRigidbody.getContainer().name == "Kugel") {
                /*let root: ƒ.Node = _event.cmpRigidbody.getContainer().getParent();s
                root.removeChild(_event.cmpRigidbody.getContainer());*/
            }
            if (_event.cmpRigidbody.getContainer().name == "boden") {
                console.log("BodenKoll");
                Einzelgeometrie._root.removeChild(this);
            }
        }
        activatePhysics() {
            //console.log("Col");
            this.rigidbody.physicsType = ƒ.PHYSICS_TYPE.DYNAMIC;
        }
    }
    Einzelgeometrie.materials = Einzelgeometrie.createMaterials();
    Einzelgeometrie.mesh = new ƒ.MeshCube("Cube");
    Endabgabe_360_Defender.Einzelgeometrie = Einzelgeometrie;
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=EinzelGeometrie.js.map