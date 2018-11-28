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
        music:'town_mp3',
        events: [
            //
            {type:"npc", img:"黑色梅卡瓦", x:11,  y:19,action:(npc)=>{
                // 对话模版
                Talk.startTalk([
                    {msg: "乘降战车",option:[
                        {text:"是",action:()=>{
                            UI.changeDress(player,npc.img);
                            npc.visible = false;

                        }},
                        {text:"否",action:()=>{
                            Talk.closeTalk();
                        }},
                    ]},
                ]);

                // 选项对话模版
                Talk.startTalk([
                    {msg: "你好呀",option:[
                        {text:"是",action:()=>{
                            Talk.startTalk([{msg:'啊？那真是不幸'}]);
                        }},
                        {text:"否",action:()=>{
                            Talk.closeTalk();
                        }},
                    ]},
                ]);

                if (stage.storyList["费雷塔"] && RPG.checkSwitch('费雷塔任务')) {

                    let char1 = stage.storyList["费雷塔"];
                    char1.setCoordinate(4, 7, UP);
                    char1.visible = true;

                    moveNpc(char1,[3,3,3,3,1],()=>{
                        Talk.startTalk([
                            {msg: "乘降战车",option:[
                                {text:"是",action:()=>{

                                }},
                                {text:"否",action:()=>{

                                }},
                            ]},
                        ]);
                        Talk.waitTalk(()=>{
                            RPG.pushState(RPG.FIGHT_RESULT);
                            RPG.flickerAnimation(Fight.bossFight,2,60);
                        });
                        RPG.setSwitch('wolf已战斗');
                    });
                }
            }},
            // 备用地图角色
            {type:"npc", img:"毁灭战车", x:-1,  y:-2, story:"wolf"},
            {type:"auto", img:"", x:0,  y:0, story:"wolf",action:()=>{
                let chara = stage.storyList['戈麦斯'];
                let npc1 = stage.storyList['喽啰1'];
                let npc2 = stage.storyList['喽啰2'];
                let npc3 = stage.storyList['喽啰3'];
                let npc4 = stage.storyList['喽啰4'];

                player.setCoordinate(10, 2, DOWN);
                chara.visible = true;
                Talk.startTalk([
                    {name:'戈麦斯',msg:'哈哈!又是来讨伐我的赏金猎人吗？小的们，上！他们的战车和钱谁抢到就是谁的！'},
                    {name:'费雷塔',msg:'站住！不要跑！'},
                ]);
                npc1.visible = true;
                npc2.visible = true;
                npc3.visible = true;
                npc4.visible = true;
                moveNpc(chara,[0,0,1,1,1,1,1,1,1,1,1,1],()=>{
                    chara.visible = false;
                    RPG.setSwitch('戈麦斯已跑',1);
                    RPG.pushState(RPG.FIGHT_RESULT);
                    RPG.flickerAnimation(Fight.normalFight,[4,4,4,4],10);
                    npc1.visible = false;
                    npc2.visible = false;
                    npc3.visible = false;
                    npc4.visible = false;
                    Menu.waitMenu(()=>{
                        RPG.popState();
                        if(Fight.state===Fight.LOST) {
                            Talk.startTalk([
                                {name:'费雷塔',msg:'尼玛，几个土匪都那么强。。。'},
                                {name:'费雷塔',msg:'给老子等着'},
                            ]);
                            RPG.setSwitch('戈麦斯已跑',0);
                            return;
                        }
                        Talk.startTalk([
                            {name:'费雷塔',msg:'可恶啊...让那个混蛋溜了...得赶紧追...'},
                            {name:'费雷塔',msg:'啊...这声音...引擎好像出了些问题，我不会修车，你下车看看吧.'},
                        ]);
                        Talk.callback = ()=>{
                            mainTeam.downTank();
                            chara.setCoordinate(15, 3, LEFT);
                            chara.visible = true;
                            moveNpc(chara,[1,1,1,1,1,3],()=>{
                                Talk.startTalk([
                                    {name:'戈麦斯',msg:'没想到吧？我还在这里呢！去死吧，肮脏的赏金猎人！'},
                                ]);
                                Talk.callback = ()=>{
                                    RPG.pushState(RPG.FIGHT_RESULT);
                                    RPG.flickerAnimation(Fight.normalFight,[7],40);
                                    Menu.waitMenu(()=>{
                                        Talk.startTalk([
                                            {name:'费雷塔',msg:'如何？我已经表现出我对掠夺者的忠心了，现在能让我加入掠夺者了吧？'},
                                            {name:'戈麦斯',msg:'嗯，你对我的确很忠诚，不过...'},
                                        ]);
                                        Talk.callback = ()=>{
                                            gameStageInit(27,6,2,DOWN);
                                            RPG.setSwitch('第一章结束');
                                        };
                                    });
                                }
                            })
                        }
                    });
                });



            }},
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
            {type: "npc", img: "姐姐", x: 10, y: 13,action:function () {
                Talk.startTalk([{msg:'测试玩玩'}]);
            }},
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
            {type:"npc", img:"白象战车", x:5,  y:2, move:1, action: function(){
                RPG.pushState(RPG.FIGHT_RESULT);
                // RPG.flickerAnimation(Fight.simpleFight,1);
            }},
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
                (npc)=>{
                    Talk.startTalk([
                        {name: "费雷塔", msg: "新来的，过来一下，看看这个吧"},
                    ]);
                    Talk.waitTalk(
                        ()=>{UI.showImg('通缉令-戈麦斯');}
                    )
                    Talk.startTalk([
                        {name: "费雷塔", msg: "如何？不错吧？打败他就有50000G的赏金，这些钱可够花好几个月的。"},
                        {name: "费雷塔", msg: "我们明天讨伐的讨伐目标就是他了。你先去镇子里的旅馆休息一下吧。"},
                    ]);
                    RPG.setSwitch("费雷塔任务", true);
                }
            }},
            // 赏金猎人办事处
            {type:"npc", img:"办事员", x:7,  y:7,dir:RIGHT, action:()=>{
                Talk.startTalk(stage.talk.赏金猎人办事处);
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
                            Talk.startTalk([{name: "赏金猎人办事处", msg: "最近一到夜晚，镇子周围就会冒出许多杀人虫，严重威胁到了大家的安全，你有兴趣活动活动么？"},])
                        }},
                        {text:"领赏金",action: function(){
                            Talk.startTalk([{name: "赏金猎人办事处", msg: "哈哈，就算打倒了赏金首也要有些证据吧？"},])
                        }},
                        {text:"离开",action: function(){
                            Talk.closeTalk();
                        }},
                ]},
            ],
        },
    },

};