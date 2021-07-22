"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    class QuadLane extends ƒ.Node {
        constructor(_name, _pos, _scale) {
            super(_name);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.mtxLocal.translateZ(_pos.z);
            let cmpMesh = new ƒ.ComponentMesh(QuadLane.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            cmpMesh.mtxPivot.scaleZ(_scale.z);
            this.addComponent(cmpMesh);
            this.addComponent(new ƒ.ComponentMaterial(QuadLane.material));
            this.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.KINEMATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
        }
        setTransform(_pos, _rot) {
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.mtxLocal.translateZ(_pos.z);
            this.mtxLocal.rotateX(_rot.x);
            this.mtxLocal.rotateY(_rot.y);
            this.mtxLocal.rotateZ(_rot.z);
        }
    }
    QuadLane.mesh = new ƒ.MeshCube("Lane");
    QuadLane.material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 0, 0, 1)));
    Endabgabe_360_Defender.QuadLane = QuadLane;
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=QuadLane.js.map