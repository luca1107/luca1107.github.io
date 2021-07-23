"use strict";
var Endabgabe_360_Defender;
(function (Endabgabe_360_Defender) {
    var ƒ = FudgeCore;
    //import nameJson from "../L06_360_Defender/";
    window.addEventListener("load", init);
    let viewport = new ƒ.Viewport();
    let gameRoot = new ƒ.Node("GameRoot");
    let lanesRoot = new ƒ.Node("Lanes_Root");
    let canon = new ƒ.Node("canon");
    let boden = new ƒ.Node("boden");
    let wand_1 = new ƒ.Node("Wand");
    let wand_2 = new ƒ.Node("Wand");
    let wand_3 = new ƒ.Node("Wand");
    let wand_4 = new ƒ.Node("Wand");
    let waende = new ƒ.Node("waende");
    let kugel_spawner = new ƒ.Node("kugelSpawner");
    let cmpCamera = new ƒ.ComponentCamera();
    let audioManager = new ƒ.AudioManager();
    let audioListener = new ƒ.ComponentAudioListener();
    let audioShoot = new ƒ.Audio("Audio/shoot.mp3");
    let audioComponentShoot = new ƒ.ComponentAudio(audioShoot, false, false, audioManager);
    let audioSchwer = new ƒ.Audio("Audio/hard.mp3");
    let audioComponentSchwer = new ƒ.ComponentAudio(audioSchwer, false, false, audioManager);
    let audioStart = new ƒ.Audio("Audio/start_game.mp3");
    let audioComponentStart = new ƒ.ComponentAudio(audioStart, false, false, audioManager);
    let audioNewEnemy = new ƒ.Audio("Audio/new_enemy.mp3");
    let audioComponentNewEnemy = new ƒ.ComponentAudio(audioNewEnemy, false, false, audioManager);
    let schwierigkeit_schwer = false;
    let score = 0;
    let ctrRotationY = new ƒ.Control("AvatarRotationY", -0.1, 0 /* PROPORTIONAL */);
    ctrRotationY.setDelay(100);
    let ctrRotationX = new ƒ.Control("AvatarRotationX", -0.1, 0 /* PROPORTIONAL */);
    ctrRotationX.setDelay(100);
    function init(_event) {
        const canvas = document.querySelector("canvas");
        document.getElementById("myScore").innerHTML = "Score" + score;
        document.getElementById("btnNormal").addEventListener("click", handleButtonNormal);
        document.getElementById("btnSchwer").addEventListener("click", handleButtonSchwer);
        document.getElementById("btnStart").addEventListener("click", handleButtonStart);
        //Init Listener vor Keypress events
        document.addEventListener("keypress", handler_Key_Pressed);
        //Physic Settings
        ƒ.Physics.settings.defaultRestitution = 0.5;
        ƒ.Physics.settings.defaultFriction = 0.8;
        ƒ.Physics.world.setGravity(new ƒ.Vector3(0, 0, -.55));
        gameRoot.addComponent(new ƒ.ComponentTransform()); //Wurzelknoten
        //Erstelle Boden
        createBoden();
        //Erstelle Wände
        createWalls();
        //Erstelle KugelSpawner
        createKugelSpawner();
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
        //cmpCamera.mtxPivot.translateZ(20.5);
        //cmpCamera.mtxPivot.rotateX(0);
        cmpCamera.mtxPivot.translateZ(4.5);
        cmpCamera.mtxPivot.rotateX(75);
        cmpCamera.mtxPivot.rotateY(180);
        console.log(cmpCamera);
        //Init Canon / Player
        createCanon();
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
    function createBoden() {
        let material_Boden = new ƒ.Material("Boden_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(1, 1, 1, 1)));
        let cmpMaterialBoden = new ƒ.ComponentMaterial(material_Boden);
        let meshBoden = new ƒ.MeshCube("Boden");
        let cmpMeshBoden = new ƒ.ComponentMesh(meshBoden);
        let transformBoden = new ƒ.ComponentTransform();
        transformBoden.mtxLocal.scale(new ƒ.Vector3(20, 20, 1));
        boden.addComponent(transformBoden);
        boden.addComponent(cmpMaterialBoden);
        boden.addComponent(cmpMeshBoden);
        boden.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
        boden.getComponent(ƒ.ComponentRigidbody).addEventListener("ColliderEnteredCollision" /* COLLISION_ENTER */, handleCollision);
    }
    function createWalls() {
        //Wand Material
        let material_Wand = new ƒ.Material("Wand_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0.5, 1, 0, 1)));
        let cmpMaterialWand_1 = new ƒ.ComponentMaterial(material_Wand);
        let cmpMaterialWand_2 = new ƒ.ComponentMaterial(material_Wand);
        let cmpMaterialWand_3 = new ƒ.ComponentMaterial(material_Wand);
        let cmpMaterialWand_4 = new ƒ.ComponentMaterial(material_Wand);
        //Wand Mesh
        let meshWand = new ƒ.MeshCube("Wand");
        let cmpMeshWand_1 = new ƒ.ComponentMesh(meshWand);
        let cmpMeshWand_2 = new ƒ.ComponentMesh(meshWand);
        let cmpMeshWand_3 = new ƒ.ComponentMesh(meshWand);
        let cmpMeshWand_4 = new ƒ.ComponentMesh(meshWand);
        //Erstelle Wände
        let transformWand_1 = new ƒ.ComponentTransform();
        transformWand_1.mtxLocal.scale(new ƒ.Vector3(1, 20, 10));
        transformWand_1.mtxLocal.translateX(10);
        let transformWand_2 = new ƒ.ComponentTransform();
        transformWand_2.mtxLocal.scale(new ƒ.Vector3(1, 20, 10));
        transformWand_2.mtxLocal.translateX(-10);
        let transformWand_3 = new ƒ.ComponentTransform();
        transformWand_3.mtxLocal.scale(new ƒ.Vector3(1, 20, 10));
        transformWand_3.mtxLocal.rotation = new ƒ.Vector3(0, 0, 90);
        transformWand_3.mtxLocal.translateX(10);
        let transformWand_4 = new ƒ.ComponentTransform();
        transformWand_4.mtxLocal.scale(new ƒ.Vector3(1, 20, 10));
        transformWand_4.mtxLocal.rotation = new ƒ.Vector3(0, 0, 90);
        transformWand_4.mtxLocal.translateX(-10);
        let transformWaende = new ƒ.ComponentTransform();
        waende.addComponent(transformWaende);
        wand_1.addComponent(transformWand_1);
        wand_1.addComponent(cmpMaterialWand_1);
        wand_1.addComponent(cmpMeshWand_1);
        wand_1.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
        wand_2.addComponent(transformWand_2);
        wand_2.addComponent(cmpMaterialWand_2);
        wand_2.addComponent(cmpMeshWand_2);
        wand_2.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
        wand_3.addComponent(transformWand_3);
        wand_3.addComponent(cmpMaterialWand_3);
        wand_3.addComponent(cmpMeshWand_3);
        wand_3.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
        wand_4.addComponent(transformWand_4);
        wand_4.addComponent(cmpMaterialWand_4);
        wand_4.addComponent(cmpMeshWand_4);
        wand_4.addComponent(new ƒ.ComponentRigidbody(1, ƒ.PHYSICS_TYPE.STATIC, ƒ.COLLIDER_TYPE.CUBE, ƒ.PHYSICS_GROUP.DEFAULT));
        waende.addChild(wand_1);
        waende.addChild(wand_2);
        waende.addChild(wand_3);
        waende.addChild(wand_4);
    }
    function createKugelSpawner() {
        let material_KS = new ƒ.Material("KS_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 0, 1, 1)));
        let cmpMaterialKS = new ƒ.ComponentMaterial(material_KS);
        let meshKugelSpawner = new ƒ.MeshCube("KugelSpawner");
        let cmpMeshKS = new ƒ.ComponentMesh(meshKugelSpawner);
        let transformKugelSpawner = new ƒ.ComponentTransform();
        transformKugelSpawner.mtxLocal.translate(new ƒ.Vector3(0, 3, 3.5));
        transformKugelSpawner.mtxLocal.scale(new ƒ.Vector3(.25, .25, .25));
        kugel_spawner.addComponent(transformKugelSpawner);
        kugel_spawner.addComponent(cmpMaterialKS);
        kugel_spawner.addComponent(cmpMeshKS);
    }
    function createCanon() {
        //Init Canon / Player
        let meshCanon = new ƒ.MeshCube("Cube_Player");
        let transformCanon = new ƒ.ComponentTransform(new ƒ.Matrix4x4());
        transformCanon.mtxLocal.translateZ(0);
        let cmpMeshCanon = (new ƒ.ComponentMesh(meshCanon));
        let canon_material = new ƒ.Material("Canon_Color", ƒ.ShaderUniColor, new ƒ.CoatColored(new ƒ.Color(0, 1, 0, 1)));
        let canon_cmpMaterial = new ƒ.ComponentMaterial(canon_material);
        canon.addComponent(canon_cmpMaterial);
        canon.addComponent(cmpMeshCanon);
        canon.addComponent(transformCanon);
        canon.appendChild(kugel_spawner);
        canon.addComponent(cmpCamera);
    }
    function handleButtonNormal() {
        schwierigkeit_schwer = false;
        document.getElementById("schwierigkeitsgrad").innerHTML = "Schwierigkeitsgrad : " + "NORMAL";
        console.log("normalPressed");
        lanesRoot.removeAllChildren();
        gameRoot.removeChild(lanesRoot);
        //Init Lanes
        for (let i = 0; i < 4; i++) {
            let lane = new Endabgabe_360_Defender.QuadLane("Lane" + i, new ƒ.Vector3(0, 0, 1), new ƒ.Vector3(6, 1, 1));
            switch (i) {
                //Setup LanePositions
                case 0:
                    lane.setTransform(new ƒ.Vector3(-5, 0, 1), new ƒ.Vector3(0, 0, 0));
                    lane.addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
                    //lane.addChild(new Einzelgeometrie("Test_1", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
                    break;
                case 1:
                    lane.setTransform(new ƒ.Vector3(0, 5, 1), new ƒ.Vector3(0, 0, 90));
                    lane.addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));
                    //lane.addChild(new Einzelgeometrie("Test_2", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
                    break;
                case 2:
                    lane.setTransform(new ƒ.Vector3(5, 0, 1), new ƒ.Vector3(0, 0, 0));
                    lane.addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));
                    //lane.addChild(new Einzelgeometrie("Test_3", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false));
                    break;
                case 3:
                    lane.setTransform(new ƒ.Vector3(0, -5, 1), new ƒ.Vector3(0, 0, 90));
                    lane.addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
                    //lane.addChild(new Einzelgeometrie("Test_4", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true));
                    break;
            }
            lanesRoot.appendChild(lane);
        }
        lanesRoot.addComponent(new ƒ.ComponentTransform());
        gameRoot.appendChild(lanesRoot);
        viewport.draw();
    }
    function handleButtonSchwer() {
        audioComponentSchwer.play(true);
        schwierigkeit_schwer = true;
        document.getElementById("schwierigkeitsgrad").innerHTML = "Schwierigkeitsgrad : " + "SCHWER";
        console.log("normalPressed");
        lanesRoot.removeAllChildren();
        gameRoot.removeChild(lanesRoot);
        //Init Lanes
        for (let i = 0; i < 4; i++) {
            let lane = new Endabgabe_360_Defender.QuadLane("Lane" + i, new ƒ.Vector3(0, 0, 1), new ƒ.Vector3(6, 1, 1));
            switch (i) {
                //Setup LanePositions
                case 0:
                    lane.setTransform(new ƒ.Vector3(-5, 0, 1), new ƒ.Vector3(0, 0, 0));
                    lane.addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 3));
                    break;
                case 1:
                    lane.setTransform(new ƒ.Vector3(0, 5, 1), new ƒ.Vector3(0, 0, 90));
                    lane.addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 3));
                    break;
                case 2:
                    lane.setTransform(new ƒ.Vector3(5, 0, 1), new ƒ.Vector3(0, 0, 0));
                    lane.addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 3));
                    break;
                case 3:
                    lane.setTransform(new ƒ.Vector3(0, -5, 1), new ƒ.Vector3(0, 0, 90));
                    lane.addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 3));
                    break;
            }
            lanesRoot.appendChild(lane);
        }
        lanesRoot.addComponent(new ƒ.ComponentTransform());
        gameRoot.appendChild(lanesRoot);
        viewport.draw();
    }
    function handleButtonStart() {
        audioComponentStart.play(true);
        ƒ.Loop.start(ƒ.LOOP_MODE.TIME_REAL, 60);
        ƒ.Loop.addEventListener("loopFrame" /* LOOP_FRAME */, update);
    }
    function handleCollision(_event) {
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
        if (schwierigkeit_schwer) {
            if (score % 12 == 0 && score > 0) {
                score++;
                createNewEnemys();
            }
        }
        else {
            if (score % 8 == 0 && score > 0) {
                score++;
                createNewEnemys();
            }
        }
        document.getElementById("myScore").innerHTML = "Score : " + score;
    }
    function createNewEnemys() {
        audioComponentNewEnemy.play(true);
        let lanes = lanesRoot.getChildren();
        let i = Math.round(Math.random() * 4);
        if (schwierigkeit_schwer) {
            switch (i) {
                //Setup LanePositions
                case 0:
                    lanes[i].addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 3));
                    break;
                case 1:
                    lanes[i].addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 3));
                    break;
                case 2:
                    lanes[i].addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 3));
                    break;
                case 3:
                    lanes[i].addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 3));
                    break;
            }
        }
        else {
            switch (i) {
                //Setup LanePositions
                case 0:
                    lanes[i].addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
                    break;
                case 1:
                    lanes[i].addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));
                    break;
                case 2:
                    lanes[i].addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(3, 0, 1), new ƒ.Vector3(1, 1, 1), false, 2));
                    break;
                case 3:
                    lanes[i].addChild(new Endabgabe_360_Defender.Gegnergeometrie("enemy", new ƒ.Vector3(-3, 0, 1), new ƒ.Vector3(1, 1, 1), true, 2));
                    break;
            }
        }
    }
    function hndMouse(_event) {
        // console.log(_event.movementX, _event.movementY);
        ctrRotationX.setInput(_event.movementX);
        ctrRotationY.setInput(_event.movementY);
    }
    function handler_Key_Pressed(_event) {
        if (_event.code == ƒ.KEYBOARD_CODE.SPACE) {
            let kugel = new Endabgabe_360_Defender.Kugeln("Kugel", kugel_spawner.mtxWorld.translation, ƒ.Vector3.ONE(.1), kugel_spawner.mtxWorld.rotation);
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
    function update(_event) {
        for (let lanes of lanesRoot.getChildren()) {
            let counter = 0;
            for (let gegnerGeo of lanes.getChildren()) {
                if (gegnerGeo.getPosX() < 1) {
                    let einzelgeo = gegnerGeo.getChildren();
                    einzelgeo.forEach(element => {
                        if (element.getComponent(ƒ.ComponentRigidbody) != null)
                            element.getComponent(ƒ.ComponentRigidbody).setScaling(ƒ.Vector3.ZERO());
                    });
                    lanes.removeChild(gegnerGeo);
                    score -= 2;
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
})(Endabgabe_360_Defender || (Endabgabe_360_Defender = {}));
//# sourceMappingURL=Main.js.map