namespace Endabgabe_360_Defender {
  import ƒ = FudgeCore;
  window.addEventListener("load", init);
  let viewport: ƒ.Viewport = new ƒ.Viewport();
  let gameRoot: ƒ.Node = new ƒ.Node("GameRoot");
  let lanesRoot: ƒ.Node = new ƒ.Node("Lanes_Root");
  let canon: ƒ.Node = new ƒ.Node("canon"); 
  let boden: ƒ.Node = new ƒ.Node("boden");
  let waende: ƒ.Node = new ƒ.Node("waende");
  let kugel_spawner : ƒ.Node = new ƒ.Node("kugelSpawner"); 

  let audioManager: ƒ.AudioManager = new ƒ.AudioManager();
  let audioListener: ƒ.ComponentAudioListener = new  ƒ.ComponentAudioListener();
  let audioShoot: ƒ.Audio = new  ƒ.Audio("Audio/shoot.mp3");
  let audioComponentShoot: ƒ.ComponentAudio = new ƒ.ComponentAudio(audioShoot, false, false, audioManager);
  let audioSchwer: ƒ.Audio = new  ƒ.Audio("Audio/hard.mp3");
  let audioComponentSchwer : ƒ.ComponentAudio = new ƒ.ComponentAudio(audioSchwer, false, false, audioManager);
  let audioStart: ƒ.Audio = new  ƒ.Audio("Audio/start_game.mp3");
  let audioComponentStart : ƒ.ComponentAudio = new ƒ.ComponentAudio(audioStart, false, false, audioManager);
  let audioNewEnemy: ƒ.Audio = new  ƒ.Audio("Audio/new_enemy.mp3");
  let audioComponentNewEnemy : ƒ.ComponentAudio = new ƒ.ComponentAudio(audioNewEnemy, false, false, audioManager);

  let schwierigkeit_schwer = false;

  let score: number = 0;

  let ctrRotationY: ƒ.Control = new ƒ.Control("AvatarRotationY", -0.1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrRotationY.setDelay(100);
  let ctrRotationX: ƒ.Control = new ƒ.Control("AvatarRotationX", -0.1, ƒ.CONTROL_TYPE.PROPORTIONAL);
  ctrRotationX.setDelay(100);
  

  

  function init(_event: Event): void {
    const canvas: HTMLCanvasElement = document.querySelector("canvas");
    document.getElementById("myScore").innerHTML = "Score" + score;
    document.getElementById("btnNormal").addEventListener("click", handleButtonNormal);
    document.getElementById("btnSchwer").addEventListener("click", handleButtonSchwer);
    document.getElementById("btnStart").addEventListener("click", handleButtonStart);


    //Init Listener vor Keypress events
    document.addEventListener("keypress", handler_Key_Pressed);

    
    //Physic Settings
    ƒ.Physics.settings.defaultRestitution = 0.5;
    ƒ.Physics.settings.defaultFriction = 0.8;
    ƒ.Physics.world.setGravity(new ƒ.Vector3(0, 0, -.55) );



    //Boden Material
    let material_Boden: ƒ.Material = new ƒ.Material("Boden_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
    let cmpMaterialBoden: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material_Boden);

    //Wand Material
    let material_Wand: ƒ.Material = new ƒ.Material("Wand_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.5, 1, 0, 1)));
    let cmpMaterialWand_1: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material_Wand);
    let cmpMaterialWand_2: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material_Wand);
    let cmpMaterialWand_3: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material_Wand);
    let cmpMaterialWand_4: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material_Wand);

    //Wand Mesh
    let meshWand: ƒ.MeshCube = new ƒ.MeshCube("Wand");
    let cmpMeshWand_1: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshWand);
    let cmpMeshWand_2: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshWand);
    let cmpMeshWand_3: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshWand);
    let cmpMeshWand_4: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshWand);

    //Init Game Root / Boden
    let meshBoden: ƒ.MeshCube = new ƒ.MeshCube("Boden");
    let cmpMeshBoden: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshBoden);
    //cmpMeshBoden.mtxPivot.scale(new ƒ.Vector3(20, 20, 1));


    gameRoot.addComponent(new ƒ.ComponentTransform()); //Wurzelknoten

    //Erstelle Boden
    let transformBoden:  ƒ.ComponentTransform = new ƒ.ComponentTransform();
    transformBoden.mtxLocal.scale(new ƒ.Vector3(20, 20, 1));
    boden.addComponent(transformBoden);
    boden.addComponent(cmpMaterialBoden);
    boden.addComponent(cmpMeshBoden);
    boden.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
    boden.getComponent(ƒ.ComponentRigidbody).addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, handleCollision);

    //Erstelle Wände

    let transformWand_1:  ƒ.ComponentTransform = new ƒ.ComponentTransform();
    transformWand_1.mtxLocal.scale(new ƒ.Vector3(1, 20, 10));
    transformWand_1.mtxLocal.translateX(10);

    let transformWand_2:  ƒ.ComponentTransform = new ƒ.ComponentTransform();
    transformWand_2.mtxLocal.scale(new ƒ.Vector3(1, 20, 10));
    transformWand_2.mtxLocal.translateX(-10);

    let transformWand_3:  ƒ.ComponentTransform = new ƒ.ComponentTransform();
    transformWand_3.mtxLocal.scale(new ƒ.Vector3(1, 20, 10));
    transformWand_3.mtxLocal.rotation = new ƒ.Vector3(0, 0, 90);
    transformWand_3.mtxLocal.translateX(10);

    let transformWand_4:  ƒ.ComponentTransform = new ƒ.ComponentTransform();
    transformWand_4.mtxLocal.scale(new ƒ.Vector3(1, 20, 10));
    transformWand_4.mtxLocal.rotation = new ƒ.Vector3(0, 0, 90);
    transformWand_4.mtxLocal.translateX(-10);

    let transformWaende: ƒ.ComponentTransform = new ƒ.ComponentTransform();
    waende.addComponent(transformWaende);

    let wand_1: ƒ.Node = new ƒ.Node("Wand");
    wand_1.addComponent(transformWand_1);
    wand_1.addComponent(cmpMaterialWand_1);
    wand_1.addComponent(cmpMeshWand_1);
    wand_1.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
    //wand_1.getComponent(ƒ.ComponentRigidbody).addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, handleCollision);

    
    let wand_2: ƒ.Node = new ƒ.Node("Wand");
    wand_2.addComponent(transformWand_2);
    wand_2.addComponent(cmpMaterialWand_2);
    wand_2.addComponent(cmpMeshWand_2);
    wand_2.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
    //wand_2.getComponent(ƒ.ComponentRigidbody).addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, handleCollision);

    let wand_3: ƒ.Node = new ƒ.Node("Wand");
    wand_3.addComponent(transformWand_3);
    wand_3.addComponent(cmpMaterialWand_3);
    wand_3.addComponent(cmpMeshWand_3);
    wand_3.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
    //wand_3.getComponent(ƒ.ComponentRigidbody).addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, handleCollision);

    let wand_4: ƒ.Node = new ƒ.Node("Wand");
    wand_4.addComponent(transformWand_4);
    wand_4.addComponent(cmpMaterialWand_4);
    wand_4.addComponent(cmpMeshWand_4);
    wand_4.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
    //wand_4.getComponent(ƒ.ComponentRigidbody).addEventListener(ƒ.EVENT_PHYSICS.COLLISION_ENTER, handleCollision);
    

    waende.addChild(wand_1);
    waende.addChild(wand_2);
    waende.addChild(wand_3);
    waende.addChild(wand_4);
    

  

    

    //Erstelle KugelSpawner
    let material_KS: ƒ.Material = new ƒ.Material("KS_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 1, 1)));
    let cmpMaterialKS: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(material_KS);
    let meshKugelSpawner: ƒ.MeshCube = new ƒ.MeshCube("KugelSpawner");
    let cmpMeshKS: ƒ.ComponentMesh = new ƒ.ComponentMesh(meshKugelSpawner);
    let transformKugelSpawner:  ƒ.ComponentTransform = new ƒ.ComponentTransform();
    transformKugelSpawner.mtxLocal.translate(new ƒ.Vector3(0, 3, 3.5));
    transformKugelSpawner.mtxLocal.scale(new ƒ.Vector3(.25, .25, .25));
    kugel_spawner.addComponent(transformKugelSpawner);
    kugel_spawner.addComponent(cmpMaterialKS);
    kugel_spawner.addComponent(cmpMeshKS);


    

    //Init Mouse Listener
    canvas.addEventListener("mousemove", hndMouse);
    canvas.addEventListener("click", canvas.requestPointerLock);


    //Audio
    gameRoot.addComponent(audioListener);
    gameRoot.addComponent(audioComponentShoot);
    gameRoot.addComponent(audioComponentSchwer);
    gameRoot.addComponent(audioComponentStart);
    gameRoot.addComponent(audioComponentNewEnemy);
    audioManager.listenTo(gameRoot);

   
    //Init first Camera Setup
    let cmpCamera: ƒ.ComponentCamera = new ƒ.ComponentCamera();
    //cmpCamera.mtxPivot.translateZ(20.5);
    //cmpCamera.mtxPivot.rotateX(0);
    cmpCamera.mtxPivot.translateZ(4.5);
    cmpCamera.mtxPivot.rotateX(75);
    cmpCamera.mtxPivot.rotateY(180);
   
    console.log(cmpCamera);


    //Init Canon / Player
    let meshCanon: ƒ.MeshCube = new ƒ.MeshCube("Cube_Player");
    let transformCanon: ƒ.ComponentTransform = new ƒ.ComponentTransform(new ƒ.Matrix4x4());
    transformCanon.mtxLocal.translateZ(0);
    let cmpMeshCanon = (new ƒ.ComponentMesh(meshCanon));
    //cmpMeshGameRoot.mtxPivot.scale(new ƒ.Vector3(1, 1, 1));


    let canon_material: ƒ.Material = new ƒ.Material("Canon_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
    let canon_cmpMaterial: ƒ.ComponentMaterial = new ƒ.ComponentMaterial(canon_material);
    canon.addComponent(canon_cmpMaterial);
    canon.addComponent(cmpMeshCanon);
    canon.addComponent(transformCanon);
    canon.addComponent(cmpCamera);
    canon.appendChild(kugel_spawner);

    

    
    //Appending Children to GameRoot
    
    gameRoot.appendChild(boden);
    gameRoot.appendChild(canon);
    gameRoot.appendChild(waende);

    console.log(gameRoot);

    //Init Update Method
    ƒ.Physics.settings.debugDraw = true;
    ƒ.Physics.adjustTransforms(gameRoot);

  
    //Init Viewport
    viewport.initialize("Viewport", gameRoot, cmpCamera, canvas);
    viewport.draw();
  }


  function handleButtonNormal(): void
  {
    schwierigkeit_schwer = false;
    document.getElementById("schwierigkeitsgrad").innerHTML = "Schwierigkeitsgrad : " + "NORMAL";
    console.log("normalPressed");
    lanesRoot.removeAllChildren();
    gameRoot.removeChild(lanesRoot);

    //Init Lanes
    for (let i: number = 0; i < 4; i++) {
      let lane: QuadLane = new QuadLane("Lane" + i, new ƒ.Vector3(0, 0, 1), new ƒ.Vector3(6, 1, 1 ));
      switch (i) {
        //Setup LanePositions

        case 0:
          lane.setTransform(new ƒ.Vector3(-5, 0, 1), new ƒ.Vector3(0, 0, 0));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
          //lane.addChild(new Einzelgeometrie("Test_1", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
          break;
        case 1:
          lane.setTransform(new ƒ.Vector3(0, 5, 1), new ƒ.Vector3(0, 0, 90));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));
          //lane.addChild(new Einzelgeometrie("Test_2", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
          break;
          case 2:
          lane.setTransform(new ƒ.Vector3(5, 0, 1), new ƒ.Vector3(0, 0, 0));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));

          //lane.addChild(new Einzelgeometrie("Test_3", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
          break;
          case 3:
          lane.setTransform(new ƒ.Vector3(0, -5, 1), new ƒ.Vector3(0, 0, 90));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
          //lane.addChild(new Einzelgeometrie("Test_4", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true));
          break;

      }
      lanesRoot.appendChild(lane);

    }
    lanesRoot.addComponent(new ƒ.ComponentTransform());
    gameRoot.appendChild(lanesRoot);
    viewport.draw();
  }
  
  function handleButtonSchwer(): void
  {
    audioComponentSchwer.play(true);
    schwierigkeit_schwer = true;
    document.getElementById("schwierigkeitsgrad").innerHTML = "Schwierigkeitsgrad : " + "SCHWER";
    console.log("normalPressed");
    lanesRoot.removeAllChildren();
    gameRoot.removeChild(lanesRoot);

    //Init Lanes
    for (let i: number = 0; i < 4; i++) {
      let lane: QuadLane = new QuadLane("Lane" + i, new ƒ.Vector3(0, 0, 1), new ƒ.Vector3(6, 1, 1 ));
      switch (i) {
        //Setup LanePositions

        case 0:
          lane.setTransform(new ƒ.Vector3(-5, 0, 1), new ƒ.Vector3(0, 0, 0));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 3));
          break;
        case 1:
          lane.setTransform(new ƒ.Vector3(0, 5, 1), new ƒ.Vector3(0, 0, 90));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 3));
          break;
          case 2:
          lane.setTransform(new ƒ.Vector3(5, 0, 1), new ƒ.Vector3(0, 0, 0));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 3));
          break;
          case 3:
          lane.setTransform(new ƒ.Vector3(0, -5, 1), new ƒ.Vector3(0, 0, 90));
          lane.addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 3));
          break;

      }
      lanesRoot.appendChild(lane);

    }
    lanesRoot.addComponent(new ƒ.ComponentTransform());
    gameRoot.appendChild(lanesRoot);
    viewport.draw();
  }

  function handleButtonStart(): void
  {
    audioComponentStart.play(true);
    ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
    ƒ.Loop.addEventListener(ƒ.EVENT.LOOP_FRAME, update);
  }



  function handleCollision(_event: ƒ.EventPhysics): void {
      
    if (_event.cmpRigidbody.getContainer().name == "enemy")
    score++;

    /*if(score==20)
    lanesRoot.getChildren().forEach(element => {
      element.getChildren().forEach(element => {
        element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
      });
      element.removeAllChildren();
    });*/
    

    console.log("Kol mit Boden");
    
    
    _event.cmpRigidbody.activate(false);
    _event.cmpRigidbody.setScaling(ƒ.Vector3.ZERO());
    _event.cmpRigidbody.getContainer().removeComponent(_event.cmpRigidbody.getContainer().getComponent(ƒ.ComponentRigidbody));
    /*
    _event.cmpRigidbody.getContainer().removeComponent(_event.cmpRigidbody.getContainer().getComponent(ƒ.ComponentMesh));
    _event.cmpRigidbody.getContainer().removeComponent(_event.cmpRigidbody.getContainer().getComponent(ƒ.ComponentMaterial));
    _event.cmpRigidbody.getContainer().removeComponent(_event.cmpRigidbody.getContainer().getComponent(ƒ.ComponentTransform));*/
    gameRoot.removeChild(_event.cmpRigidbody.getContainer());

    if (schwierigkeit_schwer)
    {
      if (score % 10 == 0 && score > 0)
      createNewEnemys();
    }
    else
    {
      if (score % 6 == 0 && score > 0)
      createNewEnemys();
    }

    document.getElementById("myScore").innerHTML = "Score : " + score;


  }

  function createNewEnemys(): void {
    audioComponentNewEnemy.play(true);
    let lanes: ƒ.Node[] = lanesRoot.getChildren();
   
    
    let i: number = Math.round(Math.random() * 4);
    if (schwierigkeit_schwer)
    {
      switch (i) {
        //Setup LanePositions

        case 0:
          lanes[i].getChildren().forEach(element => {
            element.getComponent(ƒ.ComponentRigidbody).activate(false);
            element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
            element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
          });
          lanes[i].removeAllChildren();
          lanes[i].addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 3));
          break;
        case 1:
          lanes[i].getChildren().forEach(element => {
            element.getComponent(ƒ.ComponentRigidbody).activate(false);
            element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
            element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
          });
          lanes[i].removeAllChildren();
          lanes[i].addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 3));
          break;
          case 2:
            lanes[i].getChildren().forEach(element => {
              element.getComponent(ƒ.ComponentRigidbody).activate(false);
              element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
              element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
            });
            lanes[i].removeAllChildren();
            lanes[i].addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 3));
            break;
          case 3:
            lanes[i].getChildren().forEach(element => {
              element.getComponent(ƒ.ComponentRigidbody).activate(false);
              element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
              element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
            });
            lanes[i].removeAllChildren(); 
            lanes[i].addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 3));
            break;

      }
    }
    else
    {
      switch (i) {
        //Setup LanePositions

        case 0:
          lanes[i].getChildren().forEach(element => {
            element.getComponent(ƒ.ComponentRigidbody).activate(false);
            element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
            element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
          });
          lanes[i].removeAllChildren();
          lanes[i].addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
          break;
        case 1:
          lanes[i].getChildren().forEach(element => {
            element.getComponent(ƒ.ComponentRigidbody).activate(false);
            element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
            element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
          });
          lanes[i].removeAllChildren();
          lanes[i].addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));
          break;
          case 2:
            lanes[i].getChildren().forEach(element => {
              element.getComponent(ƒ.ComponentRigidbody).activate(false);
              element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
              element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
            });
            lanes[i].removeAllChildren();
            lanes[i].addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));
            break;
          case 3:
            lanes[i].getChildren().forEach(element => {
              element.getComponent(ƒ.ComponentRigidbody).activate(false);
              element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
              element.removeComponent(element.getComponent(ƒ.ComponentRigidbody));
            });
            lanes[i].removeAllChildren();  
            lanes[i].addChild(new Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
            break;

      }
    }
        
    
  }


  function hndMouse(_event: MouseEvent): void {
    // console.log(_event.movementX, _event.movementY);
    ctrRotationX.setInput(_event.movementX);
    ctrRotationY.setInput(_event.movementY);
  }

  function handler_Key_Pressed(_event: KeyboardEvent): void {

    if (_event.code ==  ƒ.KEYBOARD_CODE.SPACE ) {
      let kugel: Kugeln = new Kugeln("Kugel", kugel_spawner.mtxWorld.translation, ƒ.Vector3.ONE(.1), kugel_spawner.mtxWorld.rotation);
      gameRoot.addChild(kugel);
      //gameRoot.getComponent(ƒ.ComponentAudio).play(true);
      audioComponentShoot.play(true);
      ƒ.Physics.adjustTransforms(gameRoot);
    }
    if (_event.code == ƒ.KEYBOARD_CODE.T) {
      ƒ.Physics.settings.debugMode = ƒ.Physics.settings.debugMode == ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER ? ƒ.PHYSICS_DEBUGMODE.PHYSIC_OBJECTS_ONLY : ƒ.PHYSICS_DEBUGMODE.JOINTS_AND_COLLIDER;
  }
    if (_event.code == ƒ.KEYBOARD_CODE.Y) {
    ƒ.Physics.settings.debugDraw = !ƒ.Physics.settings.debugDraw;
  }

  }


  function update(_event: Event): void {

    

    for (let lanes of lanesRoot.getChildren() as QuadLane[]) {
      let counter: number = 0;
      for (let gegnerGeo of lanes.getChildren() as Gegnergeometrie[]) {
        if(gegnerGeo.getPosX() < 1)
        {
          let einzelgeo: ƒ.Node[]  = gegnerGeo.getChildren();
          einzelgeo.forEach(element => {
            if(element.getComponent(ƒ.ComponentRigidbody)!= null)
            element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO()); 
          });
          lanes.removeChild(gegnerGeo);
          score -= 5;
          createNewEnemys();
          document.getElementById("myScore").innerHTML = "Score : " + score;
        }
       
        gegnerGeo.move();  
      }
    //Bewegung der Geometrie etc.


    

    
      canon.mtxLocal.rotateZ(ctrRotationX.getOutput()); //Z Achse weil Objekt gedreht wurde --> X Achse ist jetzt die Z Achse
      canon.mtxLocal.rotateX(ctrRotationY.getOutput());
      canon.mtxLocal.rotation = new ƒ.Vector3(canon.mtxLocal.rotation.x, 0, canon.mtxLocal.rotation.z);
      ctrRotationX.setInput(0);
      ctrRotationY.setInput(0);



      //Refresh Viewport
      ƒ.Physics.adjustTransforms(gameRoot);
      ƒ.Physics.world.simulate(ƒ.Loop.timeFrameReal / 1000);
      viewport.draw();

  }


  
}
}