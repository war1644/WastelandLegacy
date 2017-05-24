/**
 * Created by Troy on 2016/8/4.
 */
var mapCode = {
    'bigMap':'bigMap',
    'desertTown':'desertTown',
    'desertTown_scene01':'desertTown_scene01',
    'desertTown_scene02':'desertTown_scene02',
    'home2':'home2',
    'home1':'home1'

};
//197,208
var gameEv = [
    //home2
    {
        coordinate:[
            {tileX:1,tileY:7}
        ],
        scene:mapCode['home2'],
        //离开坐标
        leaveCoordinate:[
            {x:6*24,y:13*24}
        ],
        mapLoaded:false,
        action:function() {
            game.mapCode = mapCode['home1'];
            let that = this;
            //进入1楼，开始过渡场景
            new TransitionScene(game.width,game.height,function() {
                new SoundManage('music06',true);
                let map = [],
                    stage,
                    scene = new enchant.Scene();
                if(!that.mapLoaded) {
                    map = setHome1Map();
                    that.mapLoaded = true;
                } else {
                    map = game.mapList.home1;
                }

                game.playerList.forEach(function(o) {
                    //应用当前地图的障碍规则
                    o.map = map[0];
                    //更新玩家位置
                    o.updatePlace(6,14);

                });
                p1 = game.playerList[0];
                //按层绘制，很重要
                stage = addToStage(map);

                if(!game.npcList[game.mapCode].npc.length) {
                    //保管员
                    let npc01 = createNPC({
                        tileX: 13,
                        tileY: 15,
                        imageName: 'dade',
                        stay:true,
                        direction: 3,
                        face: 0,
                        sells:'item',
                        action: function () {
                            //创建对话场景
                            let msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) {
                                displayDialog(this.dialogID, 'dialogID', this, msgScene);
                            } else {
                                Deal('dade1', 'npcID', this, msgScene,game.npcList[game.mapCode].commodity2);
                            }
                        }
                    });
                    game.npcList[game.mapCode].npc.push(npc01);
                    stage.addChild(npc01);
                    /*
                    //战车补充店员
                    let npc02 = createNPC({
                        tileX: 12,
                        tileY: 9,
                        imageName: 'npc04',
                        direction: 0,
                        face: 0,
                        sells:'item',
                        action: function () {
                            //创建对话场景
                            let msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this,
                                msgScene,game.npcList[game.mapCode].commodity);
                            else Deal('salesman2', 'npcID', this, msgScene,game.npcList[game.mapCode].commodity2);
                        }
                    });
                    game.npcList[game.mapCode].npc.push(npc02);
                    stage.addChild(npc02);
                */
                    //添加npc
                    let tankNpc01 = createNPC({
                        tileX: 9,
                        tileY: 17,
                        imageName: 'tankNpc01',
                        direction: 0,
                        face: 0,
                        action: function () {
                            //创建对话场景
                            let msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) {
                                displayDialog(this.dialogID, 'dialogID', this, msgScene, game.npcList[game.mapCode].commodity);
                            } else {
                                displayDialog('tankNpc01', 'npcID', this, msgScene);
                            }
                        }
                    });
                    game.npcList[game.mapCode].npc.push(tankNpc01);
                    stage.addChild(tankNpc01);

                } else {
                    //否则添加列表里的npc
                    game.npcList[game.mapCode].npc.forEach(function(o) {
                        resetNpcLocation(o);
                        stage.addChild(o);
                    });
                }

                scene.addChild(stage);
                game.pushScene(scene);

                if(game.mapCode === mapCode['home1']) {
                    scene.on('enterframe', function () {
                        setCamera(map[0].width, map[0].height, game.playerList, stage);
                        //离开一楼到二楼
                        if (p1.isOut(that.leaveCoordinate)) {
                            new TransitionScene(game.width, game.height, function () {
                                game.popScene();
                                new SoundManage('music06',true);
                                game.mapCode = mapCode['home2'];
                                p1.map = game.mapList.home2[0];
                                p1.updatePlace(1, 8);
                                game.playerList[0] = p1;
                                // game.currentScene.addChild(p1.player);
                            });
                        }
                    });
                }
            });
        }
    },
    //路标
    {
        coordinate:[
            {tileX:4,tileY:8}
        ],
        scene:mapCode['home2'],
        lock: false,
        action: function () {
            if(this.lock) return;
            this.lock = true;

            let that = this,
                spl = new SignPostLabel('路漫漫的两层小洋房',function() {
                    that.lock = false;
                });
        }
    },
    //路标
    {
        coordinate:[
            {tileX:2,tileY:3}
        ],
        scene:mapCode['bigMap'],
        lock: false,
        action: function () {
            if(this.lock) return;
            this.lock = true;

            var that = this,
                spl = new SignPostLabel('东→沙漠绿洲',function() {
                    that.lock = false;
                });
        }
    },
    //路标
    {
        coordinate:[
            {tileX:20,tileY:6}
        ],
        scene:mapCode['bigMap'],
        lock:false,
        action:function() {
            if(this.lock) return;
            this.lock = true;

            var that = this,
                spl = new SignPostLabel('补给站',function() {
                    that.lock = false;
                });
        }
    },
    //路标
    {
        coordinate:[
            {tileX:0,tileY:20}
        ],
        scene:mapCode['bigMap'],
        lock:false,
        action:function() {
            if(this.lock) return;
            this.lock = true;

            var that = this,
                spl = new SignPostLabel('怪物出没禁止靠近',function() {
                    that.lock = false;
                });
        }
    },
    //战车店
    {
        coordinate:[
            {tileX:5,tileY:10}
        ],
        scene:mapCode['desertTown'],
        //离开坐标
        leaveCoordinate:[
            {x:320,y:512}
        ],
        mapLoaded:false,
        action:function() {
            game.mapCode = mapCode['desertTown_scene02'];
            var that = this;
            new TransitionScene(game.width,game.height,function() {
                new SoundManage(g.resource['music08'],true,g.resource['music06'],0.6);
                var map = [],
                    stage,
                    scene = new Scene();

                if(!that.mapLoaded) {
                    map = setDesertTownShop2Map();
                    stage = addToStage(map);
                    that.mapLoaded = true;
                } else {
                    map[0] = game.mapList.desertTown_scene02[0];
                    stage = addToStage(map);
                }

                game.playerList.forEach(function(o) {
                    o.map = map[0]; //应用当前地图的障碍规则
                    o.updatePlace(10,15);
                    stage.addChild(o.player);
                });

                if(!game.npcList[game.mapCode].npc.length) {
                    var npc01 = createNPC({
                        tileX: 9,
                        tileY: 14,
                        imageName: 'npc05',
                        standing:true,
                        direction: 2,
                        face: 2,
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this,
                                msgScene,game.npcList[game.mapCode].commodity);
                            else displayDialog('badguy', 'npcID', this, msgScene);
                        }
                    });
                    game.npcList[game.mapCode].npc.push(npc01);
                    stage.addChild(npc01);

                    var npc02 = createNPC({
                        tileX: 11,
                        tileY: 14,
                        imageName: 'npc05',
                        standing:true,
                        direction: 1,
                        face: 1,
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this,
                                msgScene,game.npcList[game.mapCode].commodity);
                            else displayDialog('badguy', 'npcID', this, msgScene);
                        }
                    });
                    game.npcList[game.mapCode].npc.push(npc02);
                    stage.addChild(npc02);

                    var npc03 = createNPC({
                        tileX: 10,
                        tileY: 7,
                        imageName: 'npc05',
                        specialActionStart:false,
                        specialAction: {
                            0: {y: 13}
                            /*1: {y: 11},
                             2: {x: 10},
                             3: {y : 7}*/
                        },
                        beforeSpecialAction:function() {
                            this.specialActionStart = false;
                            //当玩家到达指定位置时开始移动
                            if(p1.square().x === 10 && p1.square().y === 14 &&
                                p1.player.x % 32 === 0 && p1.player.y % 32 === 0) {
                                this.specialActionStart = true;
                                p1.player.stop = true;
                            }

                        },
                        afterSpecialAction:function() {
                            p1.player.stop = false;
                        },
                        direction: 0,
                        face:0,
                        action:function() {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this, msgScene);
                            else displayDialog('badguyleader', 'npcID', this, msgScene);
                        }
                    });

                    game.npcList[game.mapCode].npc.push(npc03);
                    stage.addChild(npc03);
                } else {
                    game.npcList[game.mapCode].npc.forEach(function(o) {
                        resetNpcLocation(o);
                        stage.addChild(o);
                    });
                }

                scene.addChild(stage);
                game.pushScene(scene);

                if(game.mapCode === mapCode['desertTown_scene02']) {
                    scene.on('enterframe', function () {
                        setCamera(map[0].width, map[0].height, game.playerList, stage);

                        //离开商店
                        if (p1.isOut(that.leaveCoordinate)) {
                            new TransitionScene(game.width, game.height, function () {
                                g.popScene();
                                new SoundManage(g.resource['music06'],true,g.resource['music08']);
                                game.mapCode = mapCode['desertTown'];
                                p1.map = game.mapList.desertTown[0];
                                p1.updatePlace(5, 11);
                                g.currentScene.addChild(p1.player);
                            });
                        }
                    });
                }
            });
        }
    },
    //城镇道具商店
    {
        coordinate:[
            {tileX:11,tileY:5}
        ],
        scene:mapCode['desertTown'],
        //离开坐标
        leaveCoordinate:[
            {x:320,y:576}
        ],
        mapLoaded:false,
        action:function() {
            game.mapCode = mapCode['desertTown_scene01'];
            var that = this;
            //进入商店
            new TransitionScene(game.width,game.height,function() {
                new SoundManage(g.resource['music02'],true,g.resource['music06']);
                var map = [],
                    stage,
                    scene = new Scene();
                if(!that.mapLoaded) {
                    map = setDesertTownShopMap();
                    stage = addToStage(map);
                    that.mapLoaded = true;
                } else {
                    map[0] = game.mapList.desertTown_scene01[0];
                    map[1] = game.mapList.desertTown_scene01[1];
                    stage = addToStage(map);
                }

                game.playerList.forEach(function(o) {
                    o.map = map[0]; //应用当前地图的障碍规则
                    o.updatePlace(10,17);
                    stage.addChild(o.player);
                });

                if(!game.npcList[game.mapCode].npc.length) {
                    //添加店员1
                    var npc01 = createNPC({
                        tileX: 5,
                        tileY: 7,
                        imageName: 'npc01',
                        stay:true,
                        direction: 0,
                        face: 0,
                        sells:'item',
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this,
                                msgScene,game.npcList[game.mapCode].commodity);
                            else Deal('salesman', 'npcID', this, msgScene,game.npcList[game.mapCode].commodity);
                        }
                    });
                    game.npcList[game.mapCode].npc.push(npc01);
                    stage.addChild(npc01);

                    //添加店员2
                    var npc02 = createNPC({
                        tileX: 16,
                        tileY: 7,
                        imageName: 'npc04',
                        direction: 0,
                        face: 0,
                        sells:'item',
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this,
                                msgScene,game.npcList[game.mapCode].commodity);
                            else Deal('salesman2', 'npcID', this, msgScene,game.npcList[game.mapCode].commodity2);
                        }
                    });
                    game.npcList[game.mapCode].npc.push(npc02);
                    stage.addChild(npc02);

                    //添加npc
                    var npc03 = createNPC({
                        tileX: 6,
                        tileY: 12,
                        imageName: 'npc01',
                        direction: 0,
                        standing:true,
                        face: 0,
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this,
                                msgScene,game.npcList[game.mapCode].commodity);
                            else displayDialog('npc04', 'npcID', this, msgScene);
                        }
                    });
                    game.npcList[game.mapCode].npc.push(npc03);
                    stage.addChild(npc03);

                    //添加npc
                    var npc04 = createNPC({
                        tileX: 13,
                        tileY: 13,
                        imageName: 'npc02',
                        direction: 2,
                        standing:true,
                        face: 2,
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this,
                                msgScene,game.npcList[game.mapCode].commodity);
                            else displayDialog('npc05', 'npcID', this, msgScene);
                        }
                    });
                    game.npcList[game.mapCode].npc.push(npc04);
                    stage.addChild(npc04);

                } else {//否则添加列表里的npc
                    game.npcList[game.mapCode].npc.forEach(function(o) {
                        resetNpcLocation(o);
                        stage.addChild(o);
                    });
                }

                scene.addChild(stage);
                game.pushScene(scene);

                if(game.mapCode === mapCode['desertTown_scene01']) {

                    scene.on('enterframe', function () {
                        setCamera(map[0].width, map[0].height, game.playerList, stage);

                        //离开商店
                        if (p1.isOut(that.leaveCoordinate)) {
                            new TransitionScene(game.width, game.height, function () {
                                g.popScene();
                                new SoundManage(g.resource['music06'],true,g.resource['music02']);
                                game.mapCode = mapCode['desertTown'];
                                p1.map = game.mapList.desertTown[0];
                                p1.updatePlace(11, 6);
                                g.currentScene.addChild(p1.player);
                            });
                        }
                    });
                }
            });
        }
    },
    //城镇
    {
        coordinate:[
            {tileX:4,tileY:4},
            {tileX:5,tileY:4}
        ],
        scene:mapCode['bigMap'],
        //离开坐标
        leaveCoordinate:[
            {x:224,y:512},
            {x:256,y:512}
        ],
        mapLoaded:false,
        action:function() {
            //地图代码变更
            game.mapCode = mapCode['desertTown'];
            //不遇敌
            g.encounter = false;

            //上一首背景音乐
            g.prevBGM = g.curBGM;
                //背景音乐变更
            g.curBGM = g.resource['music06'];

            var that = this;

            new TransitionScene(game.width,game.height,function() {
                var map = [],
                    stage,
                    scene = new Scene();
                if(!that.mapLoaded) {
                    map = setDesertTownMap();
                    stage = addToStage(map);
                    that.mapLoaded = true;
                } else {
                    map[0] = game.mapList.desertTown[0];
                    map[1] = game.mapList.desertTown[1];
                    stage = addToStage(map);
                }
                game.playerList.forEach(function(o) {
                    o.map = map[0]; //应用当前地图的障碍规则
                    o.updatePlace(8,15);
                    stage.addChild(o.player);
                });
                if(!game.npcList[game.mapCode].npc.length) {//如果是第一次进入，创建npc
                    var npc01 = createNPC({
                        tileX: 8,
                        tileY: 9,
                        imageName: 'npc01',
                        canPush: true,
                        direction: 2,
                        face: 2,
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this, msgScene);
                            else displayDialog('npc01', 'npcID', this, msgScene);
                        }
                    });
                    var npc02 = createNPC({
                        tileX: 9,
                        tileY: 14,
                        imageName: 'npc03',
                        standing: true,
                        direction: 1,
                        face: 1,
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this, msgScene);
                            else displayDialog('npc02', 'npcID', this, msgScene);
                        }
                    });
                    var npc03 = createNPC({
                        tileX: 14,
                        tileY: 5,
                        imageName: 'npc02',
                        stay: true,
                        direction: 0,
                        face: 0,
                        action: function () {
                            //创建对话场景
                            var msgScene = createDialogScene(this.tempScene, this);
                            game.pushScene(msgScene[0]);

                            //处理对话逻辑
                            if (this.dialogID !== null) displayDialog(this.dialogID, 'dialogID', this, msgScene);
                            else displayDialog('npc03', 'npcID', this, msgScene);
                        }
                    });

                    game.npcList["desertTown"]["npc"].push(npc01);
                    game.npcList["desertTown"]["npc"].push(npc02);
                    game.npcList["desertTown"]["npc"].push(npc03);


                    stage.addChild(npc01);
                    stage.addChild(npc02);
                    stage.addChild(npc03);

                } else {//否则添加列表里的npc
                    game.npcList[game.mapCode].npc.forEach(function(o) {
                        resetNpcLocation(o);
                        stage.addChild(o);
                    });
                }

                scene.addChild(stage);

                game.pushScene(scene);

                new SoundManage(g.curBGM,true,g.prevBGM);

                if(game.mapCode === mapCode['desertTown']) {

                    scene.on('enterframe', function () {
                        //进出场景时addChild player会将player从当前stage中移除
                        //造成camera错误 故需要检测stage中是否包含player
                        if(!checkPlayerInStage(stage.childNodes)) stage.addChild(p1.player);
                        setCamera(map[0].width, map[0].height, game.playerList, stage);

                        //角色离开当前场景
                        if (p1.isOut(that.leaveCoordinate)) {
                            new TransitionScene(game.width, game.height, function () {
                                var temp;
                                temp = g.prevBGM;
                                g.prevBGM = g.curBGM;
                                g.curBGM = temp;

                                new SoundManage(g.curBGM, true, g.prevBGM);
                                g.popScene();
                                game.mapCode = mapCode['bigMap'];
                                p1.map = game.mapList.bigMap[0];
                                g.currentScene.addChild(p1.player);
                                p1.updatePlace(4, 4);

                                g.encounter = true; //遇敌开启

                            });
                        }
                    });
                }

            });
        }
    }
];