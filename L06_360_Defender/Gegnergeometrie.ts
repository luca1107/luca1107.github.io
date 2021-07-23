namespace Endabgabe_360_Defender {
  import ƒ = FudgeCore;

  export class Gegnergeometrie extends ƒ.Node  {

    direction: boolean;

    constructor(_name: string, _pos: ƒ.Vector3, _scale: ƒ.Vector3, _dir: boolean, _count: number) {
      super(_name);

      this.direction = _dir;

      let rand_1 : number;
      let rand_2 : number;

      this.addComponent(new ƒ.ComponentTransform());
      this.mtxLocal.translateX(_pos.x);
      this.mtxLocal.translateY(_pos.y);
      this.mtxLocal.translateZ(_pos.z);
      //Setup der Gegnerstruktur
      for ( let i: number = 1; i < _count + 1; i++) {
        if (_count == 3)
        i++;

        // tslint:disable-next-line: typedef
        let positions = new Map();
          
        for (let j: number = 1; j < _count + 1; j++) {

          rand_1  = Gegnergeometrie.createRandomNumber(j);
          rand_2  = Gegnergeometrie.createRandomNumber(j);
          if(rand_2>3)
          rand_2=3;


          if (positions.has(rand_1 + "|" + rand_2)) {
            
            j--;
          }

          else {
            positions.set(rand_1 + "|" + rand_2 , true);
            let pos: ƒ.Vector3 = new ƒ.Vector3(0, rand_1, rand_2);
            let _type: CUBE_TYPE =  Gegnergeometrie.getRandomEnum(CUBE_TYPE);
            this.appendChild(new Einzelgeometrie(_name, pos, _scale, _dir, _type, this)); 

          }      
        }
      }
      //this.direction = _dir;
    }

    private static getRandomEnum<T>(_enum: {[key: string]: T}): T {
      let randomKey: string = Object.keys(_enum)[Math.floor(Math.random() * Object.keys(_enum).length)];
      console.log(randomKey);
      return _enum[randomKey];
  }

    private static createRandomNumber(j: number): number {
      let rand: number = Math.round(Math.random() * j);
      return rand;
    }

    public move(): void {
      if (!this.direction)
      this.mtxLocal.translateX( - 1 / 6 * ƒ.Loop.timeFrameReal / 1000);
      else
      this.mtxLocal.translateX(  1 / 6 * ƒ.Loop.timeFrameReal / 1000);
    }


    public getPosX(): number {
      let pos: number = 3;

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
}