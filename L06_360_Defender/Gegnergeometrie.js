"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    class Gegnergeometrie extends ƒ.Node {
        constructor(_name, _pos, _scale, _dir, _count) {
            super(_name);
            this.direction = _dir;
            let rand_1;
            let rand_2;
            this.addComponent(new ƒ.ComponentTransform());
            this.mtxLocal.translateX(_pos.x);
            this.mtxLocal.translateY(_pos.y);
            this.mtxLocal.translateZ(_pos.z);
            //Setup der Gegnerstruktur
            for (let i = 1; i < _count + 1; i++) {
                if (_count == 3)
                    i++;
                // tslint:disable-next-line: typedef
                let positions = new Map();
                for (let j = 1; j < _count + 1; j++) {
                    rand_1 = Gegnergeometrie.createRandomNumber(j);
                    rand_2 = Gegnergeometrie.createRandomNumber(j);
                    if (rand_2 > 3)
                        rand_2 = 3;
                    if (positions.has(rand_1 + "|" + rand_2)) {
                        j--;
                    }
                    else {
                        positions.set(rand_1 + "|" + rand_2, true);
                        let pos = new ƒ.Vector3(0, rand_1, rand_2);
                        let _type = Gegnergeometrie.getRandomEnum(Endabgabe_360_Defender.CUBE_TYPE);
                        this.appendChild(new Endabgabe_360_Defender.Einzelgeometrie(_name, pos, _scale, _dir, _type, this));
                    }
                }
            }
            //this.direction = _dir;
        }
        static getRandomEnum(_enum) {
            let randomKey = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
            console.log(randomKey);
            return _enum[randomKey];
        }
        static createRandomNumber(j) {
            let rand = Math.round(Math.random() * j);
            return rand;
        }
        move() {
            if (!this.direction)
                this.mtxLocal.translateX(-1 / 6 * ƒ.Loop.timeFrameReal / 1000);
            else
                this.mtxLocal.translateX(1 / 6 * ƒ.Loop.timeFrameReal / 1000);
        }
        getPosX() {
            let pos = 3;
            if (!this.direction)
                return pos + this.mtxLocal.translation.x;
            else {
                if (this.mtxLocal.translation.x > 0) {
                    return pos - this.mtxLocal.translation.x;
                }
                else {
                    return pos + Math.abs(this.mtxLocal.translation.x);
                }
            }
        }
    }
    Endabgabe_360_Defender.Gegnergeometrie = Gegnergeometrie;
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=Gegnergeometrie.js.map