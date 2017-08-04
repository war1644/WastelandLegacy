let script = {
    stage01:{
        name: "河畔镇",
        id: "stage01",
        map: laduo,
        imgName:['town_0','town_1'],
        mapData: {},
        talk: talkList,
        // 为了表达复杂情节，须预存一些人物
        storyList: [],
        bgm:'town_mp3',
        events: [
            //
            {type:"npc", img:"黑色梅卡瓦", x:11,  y:19,action:()=>{
                // 情节开始
                if (stage.storyList["wolf"] && !RPG.checkSwitch('wolf已战斗')) {
                    let char1 = stage.storyList["wolf"];
                    char1.setCoordinate(9, 10, DOWN);
                    char1.visible = true;

                    moveNpc(char1,[0,0,0,0,0,0,0,2,2],()=>{
                        Talk.startTalk([
                            {name:'狼',msg:'臭小子，敢动我战车？'}
                        ]);
                        Talk.waitTalk(()=>{Fight.bossFight(2)});
                        RPG.setSwitch('wolf已战斗')
                    });
                }
            }},
            // 备用地图角色
            {type:"npc", img:"红色梅卡瓦", x:-1,  y:-2, story:"wolf"},
            // 备用地图角色
            {type:"npc", img:"猎人A", x:15,  y:16, move:1,action:()=>{
                Talk.startTalk([{name:'路人',msg:'欢迎来到河畔镇'}]);
            }},
            // 售卖员
            {type:"npc", img:"售卖员", x:17,  y:19, action:()=>{
                Talk.startTalk(talkList.售卖员);
            }},
            //剧情NPC
            {type:"npc", img:"雷娜", x:13,  y:19, visible: ()=>{return (!RPG.checkSwitch("雷娜firstTalk"));},action:(npc)=>{
                Talk.waitTalk(()=>{
                    npc.speed = 2;
                    //移动NPC到指定位置,并触发之后的func
                    moveNpc(npc,[3,3,1,1,1,1,1,3,3],()=>{
                        RPG.hideChar(npc);
                        RPG.setSwitch("雷娜firstTalk", true);
                    });
                });
                Talk.startTalk(talkList.雷娜);
            }},
            /*{type:"auto",visible: ()=>{return (!RPG.checkSwitch("gameInitAutoTalk"));},
                action: function() {
                    // 自动发言位置居中
                    Talk.startTalk(talkList.gameExplainTalk);
                    RPG.setSwitch("gameInitAutoTalk", true);
                }
            },*/

            {type:"jump",x:11,y:15,action:()=>{
                // 战车工厂
                console.log('jump战车工厂');
                jumpStage(script.stage02, 19, 12, LEFT);
            }},
            {type:"jump",x:13,y:14,action:()=>{
                // 战车工厂
                console.log('jump战车工厂');
                jumpStage(script.stage02, 10, 19, UP);
            }},
            {type:"jump",x:8,y:14,action:()=>{
                // 猎人中心
                console.log('jump猎人中心');
                jumpStage(script.stage04, 11, 12, UP);
            }},
            {type:"jump",x:8,y:10,action:()=>{
                // 人类装备
                console.log('jump人类装备');
                jumpStage(script.stage01, 5, 8, 3);
            }},
            {type:"jump",x:12,y:8,action:()=>{
                // bar
                console.log('jump bar');
                jumpStage(script.stage01, 5, 8, 3);
            }},
            // 旅馆
            {type:"jump",x:17,y:7,action:()=>{
                console.log('jump 旅馆');
                jumpStage(script.stage01, 5, 8, 3);}
            },
            // 传送
            {type:"jump",x:20,y:3,action:()=>{
                console.log('jump 传送');
                jumpStage(script.stage01, 5, 8, 3);}
            },
            {type:"jump",x:23,y:6,action:()=>{
                // 明奇
                console.log('jump 明奇');
                jumpStage(script.stage01, 5, 8, 3);
            }},

        ],
    },
    stage02:{
        name: "战车工厂",
        id: "stage02",
        map: home1,
        imgName:['home1_0','home1_1'],
        mapData: {},
        bgm:'town2_mp3',
        events: [
            {type: "npc", img: "姐姐", x: 10, y: 13,

            },
            {type:"item", img:"box",col:1,row:2, x:6,  y:11, action: function(npc){
                // box
                if (!RPG.checkSwitch("战车工厂_boxTalk1")){
                    Talk.startTalk(talkList.box);
                    Talk.waitTalk(function(){
                        //更改箱子为打开画面
                        npc.anime.setAction(1);
                        mainTeam.addItem(12, 3, true);
                        RPG.setSwitch("战车工厂_boxTalk1", true);
                    });
                }else {
                    Talk.startTalk(talkList.box,2);
                }
            }},
            // fight test
            {type:"npc", img:"白象战车", x:5,  y:2, move:1, action: function(){Fight.simpleFight(1)}},
            {type:"jump",x: 6, y: 13, action:()=>{
                    // 二楼
                    jumpStage(script.stage03, 2, 8, RIGHT);
                }
            },
            {type:'jump',x: 10, y: 20,action:()=>{
                    // 镇里
                    jumpStage(script.stage01, 7, 20, UP);
                }
            },
            {type:'jump',x: 10, y: 20,action:()=>{
                // 镇里
                jumpStage(script.stage01, 7, 20, UP);
            }
            }

        ],
        talk: talklist3,
        choice: {
            choice1:{ img: "face7", msg: "是否同意去？",
                choise:[
                    {text:"去",action: function(){
                        Talk.closeTalk();
                        Talk.startTalk(stage.talk.talk2);
                        RPG.setSwitch("accept", true);
                        Talk.waitTalk(function(){
                            mainTeam.addItem(1, 5, true);
                        });
                    }},
                    {text:"不去",action: function(){
                        Talk.closeTalk();
                        Talk.startTalk(stage.talk.talk3);
                    }}]
            }
        }
    },
    stage03:{
        name: "猎人家",
        id: "stage03",
        map: home2,
        imgName:['home2_0','home2_1'],
        mapData: {},
        // 为了表达复杂情节，须预存一些人物
        storyList: [],
        bgm:'town2_mp3',
        events: [
            {type:"item", img:"box",col:1,row:2, x:1,  y:4, action: function(npc){
                // box
                if (!RPG.checkSwitch("猎人家_boxTalk1")){
                    Talk.startTalk(talkList.box);
                    Talk.waitTalk(function(){
                        //更改箱子为打开画面
                        npc.anime.setAction(1);
                        mainTeam.addItem(12, 3, true);
                        RPG.setSwitch("猎人家_boxTalk1", true);
                    });
                }else {
                    Talk.startTalk(talkList.box,2);
                }
            }},
        // 备用地图角色
         {type:"npc", img:"黑色梅卡瓦", x:-2,  y:-2, story:"boss"},
            {
                type: "npc", img: "黑色梅卡瓦'", x: 13, y: 15, action: function (npc) {
					if (RPG.checkSwitch("accept")) {
						Talk.startTalk(stage.talk.talk4);
					} else if (RPG.checkSwitch("secondTalk")) {
						Talk.makeChoice(stage.choice.choice1);
					} else {
						Talk.startTalk(stage.talk.talk1);
						RPG.setSwitch("secondTalk", true);
                        Talk.waitTalk(function () {
							Talk.makeChoice(stage.choice.choice1);
						});
					}
            	}
            },
            {type:"npc", img:"box",col:1,row:2, x:6,  y:11, action: function(npc){
                // 隐藏的item
                if (!RPG.checkSwitch("breadTake1")){
                    Talk.startTalk(stage.talk.talk7);
                    Talk.waitTalk(function(){
                        npc.anime.setAction(1);
                        mainTeam.addItem(12, 3, true);
                        RPG.setSwitch("breadTake1", true);
                    });
                }else {
                    Talk.startTalk(stage.talk.talk6);
                }
            }},
            
            {type: "jump",x: 1, y: 7, action: function () {
                // 1楼
                jumpStage(script.stage02, 6, 14, 0);
            }},
            {type: "npc", img: "empty", x: 6, y: 2, row: 1, col: 1, action: function () {
                // 休息一夜
                RPG.pushState(RPG.MAP_WAITING);
                Talk.startTalk(stage.talk.talk5);
                Talk.waitTalk(function () {
                    player.setCoordinate(6, 2, 0);
                    // Lib.resetChildIndex(charaLayer);
                    RPG.nightAndDay(function () {
                        player.setCoordinate(5, 2, 0);
                        mainTeam.fullHeal();
                        RPG.popState();
                    });
                });
            }},
        ],
        talk: talklist3,
    },
    stage04:{
        name: "猎人中心",
        id: "stage04",
        map: hunter_center,
        imgName:['hunter_center_0','hunter_center_1'],
        mapData: {},
        // 为了表达复杂情节，须预存一些人物
        storyList: [],
        bgm:'town_mp3',
        events: [
            // 备用地图角色
            {type:"npc", img:"猎人A", x:8,  y:10,dir:UP, move:1,action:()=>{
                Talk.startTalk(stage.talk.猎人);
            }},
            // 赏金猎人办事处
            {type:"npc", img:"办事员", x:7,  y:7,dir:RIGHT, action:()=>{
                Talk.makeChoice(stage.talk.赏金猎人办事处[1]);
            }},
            //剧情NPC
            {type:"npc", img:"雷娜", x:10,  y:7,dir:UP, visible: ()=>{return (RPG.checkSwitch("雷娜firstTalk"));},action:(npc)=>{
                if(RPG.checkSwitch("费雷塔task")){
                    Talk.startTalk(stage.talk.雷娜,undefined,4);
                }
            }},
            {type:"auto",visible: ()=>{return (RPG.checkSwitch("雷娜firstTalk"));},
                action: function() {
                    // 自动发言
                    Talk.startTalk(stage.talk.雷娜,undefined,0,3);
                    RPG.setSwitch("费雷塔task", true);
                }
            },
            {type:"jump",x:11,y:15,action:()=>{
                console.log('jump TOWN');
                jumpStage(script.stage01, 8, 15, DOWN);
            }},
            {type:"jump",x:12,y:15,action:()=>{
                console.log('jump TOWN');
                jumpStage(script.stage01, 8, 15, DOWN);
            }},

        ],
        talk: {
            雷娜: [
                {name: "雷娜", msg: "新来的，过来一下吧"},
                {name: "雷娜", msg: "看看这个吧"},
                {name: "雷娜", msg: "如何？不错吧？打败他就有50000G的赏金，这些钱可够花好几个月的。"},
                {name: "雷娜", msg: "我们明天讨伐的讨伐目标就是他了。你先去镇子里的旅馆休息一下吧。"},
                {name: "雷娜", msg: "不想休息呀？那你到处逛逛吧"},
            ],
            猎人: [
                {name: "猎人", msg: "这附近没有什么赏金首可以猎取啊。"},
            ],
            赏金猎人办事处:[
                {name: "赏金猎人办事处", msg: "有事吗？"},
                {msg: "赏金猎人办事处",option:[
                        {text:"听情报",action: function(){
                            Talk.startTalk([{name: "赏金猎人办事处", msg: "这附近很太平，没有什么赏金首"},])
                        }},
                        {text:"本周委托任务",action: function(){
                            Talk.startTalk({name: "赏金猎人办事处", msg: "最近一到夜晚，镇子周围就会冒出许多杀人虫，严重威胁到了大家的安全，你有兴趣活动活动么？"},)
                        }},
                        {text:"领赏金",action: function(){
                            Talk.startTalk({name: "赏金猎人办事处", msg: "哈哈，就算打倒了赏金首也要有些证据吧？"},)
                        }},
                        {text:"离开",action: function(){
                            Talk.closeTalk();
                        }},
                ]},
            ],
        },
    },

};


/*
stage02:{
    name: "荒漠洞穴",
    id: "stage02",
    map: map1_1_cave,
    mapdata:{},
    // 为了表达复杂情节，须预存一些人物
    charaList: [],
    events:[
         // 回到大地图，以及获胜主情节
         {chara:"npc", img:"",     x:4,   y:1, action: function(){
             if (!RPG.checkSwitch("gate1win")){
                 if (mainTeam.haveItem(0)) {
                     // 主情节开始
                     //RPG.pushState(RPG.MAP_WAITING);
                     player.setCoordinate(4, 2, 3);
                     if (stage.charaList["boss"]) {
                         let char1= stage.charaList["boss"];
                         char1.setCoordinate(4, 1, 0);
                         char1.visible= true;
                     }
                     Talk.startTalk(stage.talk.talk6);
                     RPG.waitTalk(function(){
                         Talk.makeChoice(stage.choice.choice1);
                     });
                 } else {
                     // 未得到宝物直接离洞
                     jumpStage(script.stage01, 9, 14, 0);
                 }
             } else {
                 // 胜利后直接离洞
                 jumpStage(script.stage01, 9, 14, 0);
             }
         }},
         // 备用地图角色
         {chara:"npc", img:"npc17", x:-2,  y:-2, list:"boss"},
         // 山洞战斗者
         {chara:"touch", img:"npc5", x:6,  y:5, move:1, visible: function(){return (!RPG.checkSwitch("BatDenTaken"));}, action: function(aChar){RPG.simpleFight(1, aChar);}},
         {chara:"touch", img:"npc5", x:14,  y:4, move:1, visible: function(){return (!RPG.checkSwitch("BatDenTaken"));}, action: function(aChar){RPG.simpleFight(1, aChar);}},
         {chara:"touch", img:"npc5", x:13,  y:9, move:1, visible: function(){return (!RPG.checkSwitch("BatDenTaken"));}, action: function(aChar){RPG.simpleFight(1, aChar);}},
         {chara:"touch", img:"npc1", x:9,  y:11, move:1, visible: function(){return (!RPG.checkSwitch("HookDenTaken"));}, action: function(aChar){RPG.simpleFight(0, aChar);}},
         {chara:"touch", img:"npc1", x:5,  y:15, move:1, visible: function(){return (!RPG.checkSwitch("HookDenTaken"));}, action: function(aChar){RPG.simpleFight(0, aChar);}},
         {chara:"touch", img:"npc1", x:14,  y:16, move:1, visible: function(){return (!RPG.checkSwitch("HookDenTaken"));}, action: function(aChar){RPG.simpleFight(0, aChar);}},
         {chara:"touch", img:"npc1", x:17,  y:14, move:1, visible: function(){return (!RPG.checkSwitch("HookDenTaken"));}, action: function(aChar){RPG.simpleFight(0, aChar);}},
         {chara:"npc", img:"empty",     x:10,   y:7, action: function(){
             // 蝙蝠巢穴
             if (!RPG.checkSwitch("BatDenTaken")){
                 Talk.startTalk(stage.talk.talk1);
                 RPG.waitTalk(function(){
                     RPG.denFight(3, "BatDenTaken");
                 });
             } else {
                 Talk.startTalk(stage.talk.talk3);
             }
         }},
         {chara:"npc", img:"empty",     x:17,   y:13, action: function(){
             // 蝎子巢穴
             if (!RPG.checkSwitch("HookDenTaken")){
                 Talk.startTalk(stage.talk.talk2);
                 RPG.waitTalk(function(){
                     RPG.denFight(2, "HookDenTaken");
                 });
             } else {
                 Talk.startTalk(stage.talk.talk4);
             }
         }},
         {chara:"npc", img:"",     x:17,   y:6, action: function(){
             // 回到大地图：进入谷底
             jumpStage(script.stage01, 8, 4, 1);
         }},
         {chara:"npc", img:"",     x:12,   y:15, action: function(){
             // 回到大地图：上山
             jumpStage(script.stage01, 1, 5, 0);
         }},
         {chara:"npc", img:"",     x:19,   y:17, action: function(){
             // 进入深洞
             jumpStage(script.stage04, 1, 5, RIGHT);
         }},
         {chara:"npc", img:"",     x:19,   y:18, action: function(){
             // 进入深洞
             jumpStage(script.stage04, 1, 6, RIGHT);
         }}
         ],
    talk: talklist2,
    choice: {
        choice1:{ img: "face7", msg: "是否把副炮交给他？",
                choise:[
                    {text:"给",action: function(){
                         Talk.closeTalk();
                         mainTeam.takeItem(0);
                         RPG.enemyTeam[5].getHero(0).weapon= 0;
                         RPG.enemyTeam[5].addItem(0, 1);
                         Talk.startTalk(stage.talk.talk7);
                         RPG.waitTalk(function(){
                             RPG.gate1Fight();
                         });
                     }},
                     {text:"不给",action: function(){
                         Talk.closeTalk();
                         RPG.enemyTeam[5].getHero(0).weapon= -1;
                         RPG.enemyTeam[5].itemList=[];
                         Talk.startTalk(stage.talk.talk8);
                         RPG.waitTalk(function(){
                             RPG.gate1Fight();
                         });
                     }}]
              }
    }
},
stage03:{
    name: "商人帐篷",
    id: "stage03",
    map: map1_2_tent,
    mapdata: {},
    events:[
         {chara:"npc", img:"npc1", x:3,  y:5, visible: function(){return (RPG.checkSwitch("firstTalk") && !RPG.checkSwitch("gate1win"));},action: function(aChar){
             // 第二轮说话
             if (RPG.checkSwitch("accept")) {
                 Talk.startTalk(stage.talk.talk4);
             } else if (RPG.checkSwitch("secondTalk")) {
                 Talk.makeChoice(stage.choice.choice1);
             } else {
                 Talk.startTalk(stage.talk.talk1);
                 RPG.setSwitch("secondTalk", true);
                 RPG.waitTalk(function(){
                     Talk.makeChoice(stage.choice.choice1);
                });
             }
         }},
         {chara:"npc", img:"empty", x:4,  y:2, action: function(){
             // 隐藏的食物
             if (RPG.checkSwitch("gate1win")) {
                 if (!RPG.checkSwitch("breadTake")){
                     Talk.startTalk(stage.talk.talk7);
                     RPG.waitTalk(function(){
                         mainTeam.addItem(12, 3, true);
                         RPG.setSwitch("breadTake", true);
                     });
                 }
             } else {
                 Talk.startTalk(stage.talk.talk6);
             }
         }},
         {chara:"npc", img:"", x:5,  y:9, action: function(){
             // 回到大地图
             jumpStage(script.stage01, 16, 17, 0);
         }},
         {chara:"npc", img:"empty", x:9,  y:5, row:1, col:1, action: function(){
             // 休息一夜
             if (RPG.checkSwitch("gate1win")) {
                 Talk.startTalk(stage.talk.talk8);
             } else if (RPG.checkSwitch("accept")) {
                 RPG.pushState(RPG.MAP_WAITING);
                 Talk.startTalk(stage.talk.talk5);
                 RPG.waitTalk(function(){
                     player.setCoordinate(9, 5, 0);
                     RPG.resetChildIndex(charaLayer);
                     RPG.nightAndDay(function(){
                         player.setCoordinate(8, 5, 0);
                         mainTeam.fullHeal();
                         RPG.popState();
                     });
                 });
             }
         }}
         ],
    talk: talklist3,
    choice: {
        choice1:{ img: "face7", msg: "是否同意去？",
                choise:[
                    {text:"去",action: function(){
                         Talk.closeTalk();
                         Talk.startTalk(stage.talk.talk2);
                         RPG.setSwitch("accept", true);
                         RPG.waitTalk(function(){
                             mainTeam.addItem(1, 5, true);
                         });
                     }},
                     {text:"不去",action: function(){
                         Talk.closeTalk();
                         Talk.startTalk(stage.talk.talk3);
                     }}]
              }
    }
},
stage04:{
    name: "荒漠魔王洞",
    id: "stage04",
    map: map1_3_deep,
    mapdata:{},
    hasBig: true,
    events:[
         // 魔王龙
         {chara:"touch", img:"no17", x:8,  y:7, col:4, move:1, action: (npc)=>{
            Talk.startTalk(stage.talk.talk2);
            RPG.waitTalk(()=>{
                 RPG.simpleFight(4, npc);
             });
         }},
         // 宝箱
         {chara:"npc", img:"box", x:8,  y:8, move:0,
             action: function(npc){
                 if (!RPG.checkSwitch("box")){
                     npc.anime.setAction(3);
                     RPG.setSwitch("box", true);
                     mainTeam.addItem(0, 1, true);
                 }
             },
             preSet: function(npc){
                 if (RPG.checkSwitch("box")){
                     npc.anime.setAction(3,0);
                     // 走一帧，以使正常显示
                    npc.anime.onframe();
                 } else {
                     npc.anime.setAction(0);
                 }
             }
         },
         // 地图跳转
         {chara:"npc", img:"",     x:0,   y:5, action: function(){
             // 回到大洞
             jumpStage(script.stage02, 18, 17, RPG.LEFT);
             if (!RPG.checkSwitch("firstSigh")){
                 if (mainTeam.haveItem(0)){
                     RPG.setSwitch("firstSigh");
                    Talk.startTalk(stage.talk.talk5);
                 }
             }
         }},
         {chara:"npc", img:"",     x:0,   y:6, action: function(){
             // 回到大洞
             jumpStage(script.stage02, 18, 18, RPG.LEFT);
             if (!RPG.checkSwitch("firstSigh")){
                 if (mainTeam.haveItem(0)){
                     RPG.setSwitch("firstSigh");
                    Talk.startTalk(stage.talk.talk5);
                 }
             }
         }},
         ],
    talk: talklist4,
},*/