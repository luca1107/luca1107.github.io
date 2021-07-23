"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    class Kugeln extends ƒ.Node {
        constructor(_name, _pos, _scale, _rot) {
            super(_name);
            this.rigidbody = new ƒ.ComponentRigidbody(2, ƒ.PHYSICS_TYPE.DYNAMIC, ƒ.COLLIDER_TYPE.SPHERE, ƒ.PHYSICS_GROUP.DEFAULT);
            let forward = new ƒ.Vector3();
            console.log(_rot.x);
            this.velocity = new ƒ.Vector3(_pos.x * 2.5, _pos.y * 2.5, 1);
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translate(_pos);
            this.mtxLocal.scale(_scale);
            this.mtxLocal.rotate(_rot);
            this.addComponent(this.rigidbody);
            this.rigidbody.restitution = 2;
            this.rigidbody.addEventListener("ColliderEnteredCollision" /* COLLISION_ENTER */, this.handleCollision);
            let cmpMesh = new ƒ.ComponentMesh(Kugeln.mesh);
            this.addComponent(cmpMesh);
            this.addComponent(new ƒ.ComponentMaterial(Kugeln.material));
            this.getComponent(ƒ.ComponentRigidbody).setVelocity(this.velocity);
            this.getComponent(ƒ.ComponentRigidbody).setPosition(new ƒ.Vector3(0, 0, 0));
        }
        handleCollision(_event) {
            let name = _event.cmpRigidbody.getContainer().name;
            //console.log(_event.cmpRigidbody.getContainer().name);
            switch (name) {
                case "boden":
                    break;
                case "enemy":
                    _event.cmpRigidbody.physicsType = ƒ.PHYSICS_TYPE.DYNAMIC;
                    _event.cmpRigidbody.applyImpulseAtPoint(new ƒ.Vector3(_event.collisionNormal.x * _event.normalImpulse / 3, _event.collisionNormal.y * _event.normalImpulse / 3, _event.collisionNormal.z * _event.normalImpulse / 3), _event.collisionPoint);
                    break;
            }
        }
    }
    Kugeln.mesh = new ƒ.MeshSphere("Sphere");
    Kugeln.material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 0, 1)));
    Endabgabe_360_Defender.Kugeln = Kugeln;
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=Kugeln.js.map