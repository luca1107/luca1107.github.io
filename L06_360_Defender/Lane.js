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
            let cmpMesh = new ƒ.ComponentMesh(QuadLane.mesh);
            cmpMesh.mtxPivot.scaleX(_scale.x);
            cmpMesh.mtxPivot.scaleY(_scale.y);
            this.addComponent(cmpMesh);
            this.addComponent(new ƒ.ComponentMaterial(QuadLane.material));
        }
    }
    QuadLane.mesh = new ƒ.MeshQuad("Lane");
    QuadLane.material = new ƒ.Material("Black", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 0, 1)));
    Endabgabe_360_Defender.QuadLane = QuadLane;
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=Lane.js.map