let StageData = {
    25: {
        name: "河畔镇",
        id: 25,
        music: "道具屋",
        fileName: "河畔镇",
        events: [
            {
                id: "27",
                type: "npc",
                img: "黑色战车MMR",
                name: "暴揍",
                row: "4",
                col: "4",
                dir: "0",
                action: `()=>{ if (stage.storyList["wolf"] && !RPG.checkSwitch('wolf已战斗')) { let char1 = stage.storyList["wolf"]; char1.setCoordinate(9, 10, DOWN); char1.visible = true; moveNpc(char1,[0,0,0,0,0,0,0,2,2],()=>{ Talk.startTalk([ {name:'狼',msg:'臭小子，敢动我战车？'} ]); Talk.waitTalk(()=>{ RPG.pushState(RPG.FIGHT_RESULT); RPG.flickerAnimation(Fight.bossFight,2,60); }); RPG.setSwitch('wolf已战斗'); }); }}`,
                move: "0",
                eventMapId: "25",
                x: "11",
                y: "19",
                story: "",
                visible: ""
            },
            {
                id: "28",
                type: "npc",
                img: "红狼战车MMR",
                name: "隐藏npc",
                row: "4",
                col: "4",
                dir: "0",
                action: "()=>{ }",
                move: "0",
                eventMapId: "25",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "30",
                type: "npc",
                img: "交易员",
                name: "售卖员对话",
                row: "4",
                col: "4",
                dir: "0",
                action: `()=>{ Talk.startTalk([ {msg: "欢迎来到废土商店！贵干？"}, {msg: "欢迎来到废土商店！贵干？",option:[ {text: "买", action:()=>{ Talk.closeTalk(); Menu.trade = 'buy'; Menu.menuShowItems(); }}, {text: "卖",action:()=>{ Talk.closeTalk(); Menu.trade = 'sell'; Menu.menuShowItems(); }} ]}, ]);}`,
                move: "0",
                eventMapId: "25",
                x: "17",
                y: "19",
                story: "",
                visible: ""
            },
            {
                id: "32",
                type: "jump",
                img: "",
                name: "河畔镇到酒吧",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(10, 12, 14, 3); }",
                move: "0",
                eventMapId: "25",
                x: "12",
                y: "8",
                story: "",
                visible: ""
            },
            {
                id: "33",
                type: "jump",
                img: "",
                name: "河畔镇到人类武器店",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{gameStageInit(26, 12, 15, 3);} ",
                move: "0",
                eventMapId: "25",
                x: "8",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "34",
                type: "jump",
                img: "",
                name: "河畔镇到猎人中心",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(22, 12, 15, UP);}",
                move: "0",
                eventMapId: "25",
                x: "8",
                y: "14",
                story: "",
                visible: ""
            },
            {
                id: "35",
                type: "jump",
                img: "",
                name: "河畔镇到主角家",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(18, 10, 19, 3);}",
                move: "0",
                eventMapId: "25",
                x: "11",
                y: "15",
                story: "",
                visible: ""
            },
            {
                id: "39",
                type: "box",
                img: "事件/箱子",
                name: "战车工厂箱子",
                row: "2",
                col: "1",
                dir: "0",
                action: `(npc)=>{ if (!RPG.checkSwitch("战车工厂_boxTalk1")){ Talk.startTalk([ {img: "", name: "", msg: "让我看看这里有什么" }, {img: "", name: "", msg: "呵呵，收获不小啊" }, {img: "", name: "", msg: "不要乱翻别人东西哦，小心被暴揍哦^_^" }, ]); Talk.waitTalk(function(){ npc.anime.setAction(1); mainTeam.addItem(12, 3, true); RPG.setSwitch("战车工厂_boxTalk1", true); }); }else { Talk.startTalk([ {img: "", name: "", msg: "让我看看这里有什么" }, {img: "", name: "", msg: "呵呵，收获不小啊" }, {img: "", name: "", msg: "不要乱翻别人东西哦，小心被暴揍哦^_^" }, ],2); }}`,
                move: "0",
                eventMapId: "25",
                x: "6",
                y: "11",
                story: "",
                visible: ""
            },
            {
                id: "40",
                type: "jump",
                img: "",
                name: "河畔镇到旅店",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(14, 10, 12, UP);}",
                move: "0",
                eventMapId: "25",
                x: "17",
                y: "7",
                story: "",
                visible: ""
            },
            {
                id: "44",
                type: "npc",
                img: "红狼战车MMR",
                name: "战斗测试233",
                row: "4",
                col: "4",
                dir: "0",
                action: "()=>{ Talk.startTalk([ {msg:'遭遇袭击'}, ]); Talk.waitTalk(()=>{ RPG.pushState(RPG.FIGHT_RESULT); RPG.flickerAnimation(Fight.bossFight,[3,3],10); }); }",
                move: "1",
                eventMapId: "25",
                x: "5",
                y: "2",
                story: "",
                visible: ""
            },
            {
                id: "45",
                type: "jump",
                img: "",
                name: "河畔镇到明奇家",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(8, 10, 17, UP);}",
                move: "0",
                eventMapId: "25",
                x: "23",
                y: "6",
                story: "",
                visible: ""
            },
            {
                id: "46",
                type: "box",
                img: "事件/箱子",
                name: "猎人家箱子",
                row: "2",
                col: "1",
                dir: "0",
                action: `(npc)=>{ if (!RPG.checkSwitch("猎人家_boxTalk1")){ Talk.startTalk(talkList.box); Talk.waitTalk(function(){ npc.anime.setAction(1); mainTeam.addItem(12, 3, true); RPG.setSwitch("猎人家_boxTalk1", true); }); }else { Talk.startTalk(talkList.box,2); }}`,
                move: "0",
                eventMapId: "25",
                x: "1",
                y: "4",
                story: "",
                visible: ""
            },
            {
                id: "47",
                type: "npc",
                img: "黑色战车MMR",
                name: "剧情人物",
                row: "4",
                col: "4",
                dir: "0",
                action: "(npc)=>{ }",
                move: "0",
                eventMapId: "25",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "140",
                type: "jump",
                img: "",
                name: "河畔镇到主角家-左",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(18, 29, 11, 1); }",
                move: "0",
                eventMapId: "25",
                x: "13",
                y: "14",
                story: "",
                visible: ""
            }
        ]
    },
    10: {
        name: "酒吧",
        id: "10",
        music: "BarTheme",
        fileName: "酒吧",
        map: "酒吧",
        events: [
            {
                id: "65",
                type: "jump",
                img: "",
                name: "酒吧到德西多",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(21, 13, 7,DOWN ); }",
                move: "0",
                eventMapId: "10",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            // {
            //     id: "83",
            //     type: "npc",
            //     img: "护士",
            //     name: "库莱勒酒吧护士对话",
            //     row: "4",
            //     col: "4",
            //     dir: "0",
            //     action: `(npc)=>{ Talk.startTalk([ {msg:"许多人都质疑我们护士的战斗能力。我们护士的战斗能力的确不怎么样，但是在白兵战中我们却可以为其他人做紧急治疗。"}, ]); }`,
            //     move: "1",
            //     eventMapId: "10",
            //     x: "14",
            //     y: "8",
            //     story: "",
            //     visible: ""
            // },
            {
                id: "84",
                type: "npc",
                img: "机械师",
                name: "库莱勒酒吧机械师对话",
                row: "4",
                col: "4",
                dir: "0",
                action: `(npc)=>{ Talk.startTalk([ {msg: "战车大破了就要拖到镇子里进行维修——除非你的同伴中有厉害的机械师。"}, {name:playerName,msg: "你可以么？"}, {msg: "什么？我？我只会修理破损的战车啦。"}, ]) }`,
                move: "1",
                eventMapId: "10",
                x: "11",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "85",
                type: "npc",
                img: "猎人",
                name: "库莱勒酒吧猎人对话",
                row: "4",
                col: "4",
                dir: "0",
                action: `(npc)=>{ Talk.startTalk([ {msg:"听说在镇子西边的草原上有一辆四处游荡的战车，时常攻击附近的旅客。"}, ]); }`,
                move: "1",
                eventMapId: "10",
                x: "6",
                y: "10",
                story: "",
                visible: ""
            },
            // {
            //     id: "86",
            //     type: "npc",
            //     img: "猎人",
            //     name: "库莱勒酒吧士兵对话",
            //     row: "4",
            //     col: "4",
            //     dir: "0",
            //     action: `(npc)=>{ Talk.startTalk([ {msg:"在这里东南方的森绿市住着一位制造战车的博士。"}, ]); }`,
            //     move: "0",
            //     eventMapId: "10",
            //     x: "15",
            //     y: "9",
            //     story: "",
            //     visible: ""
            // },
            {
                id: "87",
                type: "npc",
                img: "战士",
                name: "库莱勒酒吧摔跤手对话",
                row: "4",
                col: "4",
                dir: "0",
                action: `(npc)=>{ Talk.startTalk([ {msg:"传言最近总是能看到已经被击败的赏金首，是赏金首都复活了吗？"}, ]); }`,
                move: "0",
                eventMapId: "10",
                x: "17",
                y: "9",
                story: "",
                visible: ""
            },
            {
                id: "88",
                type: "npc",
                img: "商人妹子",
                name: "库莱勒酒吧酒保对话",
                row: "4",
                col: "4",
                dir: "0",
                action: `(npc)=>{ Talk.startTalk([ {msg:"哼......"}, {msg: "什么事？", option:[ {text:"买",action:()=>{ Talk.startTalk([{msg: "喝些什么？" , option:[ {text:"摔角士酒 5G",action:()=>{ Talk.startTalk([{msg: "挺能喝啊，再来一杯？"}]); RPG.setSwitch("已喝",true); }}, {text:"波姆霍霍酒 10G",action:()=>{ Talk.startTalk([{msg: "挺能喝啊，再来一杯？"}]); RPG.setSwitch("已喝",true); }}, {text:"死亡球 15G",action:()=>{ Talk.startTalk([{msg: "挺能喝啊，再来一杯？"}]); RPG.setSwitch("已喝",true); }}, {text:"液体火焰 20G",action:()=>{ Talk.startTalk([{msg: "挺能喝啊，再来一杯？"}]); RPG.setSwitch("已喝",true); }}, {text:"取消",action:()=>{ Talk.startTalk([{msg: "哼......"}]) }}, ]}]) }}, {text:"卖",action:()=>{ Talk.closeTalk(); Menu.trade = 'sell'; Menu.menuShowItems(); }}, {text:"听情报",action:()=>{ if(RPG.checkSwitch("已喝")){ Talk.startTalk([{msg: "在镇子东面有一个叫努卡酒吧的酒吧，你可以在那里招募同伴。"}]) }else{ Talk.startTalk([{msg: "哼......"}]) } }}, {text:"离开",action:()=>{ Talk.closeTalk(); }}, ]}, ]); }`,
                move: "0",
                eventMapId: "10",
                x: "9",
                y: "8",
                story: "",
                visible: ""
            },
            {
                id: "96",
                type: "npc",
                img: "人物行走图/猎人",
                name: "德西多酒吧猎人对话",
                row: "4",
                col: "4",
                dir: "1",
                action: `(npc)=>{ Talk.startTalk([ {img: "", name: "", msg: "曾经有一位了不起的赏金猎人驾驶着红色战车。"}, ] ); }`,
                move: "0",
                eventMapId: "10",
                x: "16",
                y: "9",
                story: "",
                visible: ""
            },
            {
                id: "97",
                type: "npc",
                img: "人物行走图/重甲猎人",
                name: "德西多酒吧猎人2对话",
                row: "4",
                col: "4",
                dir: "2",
                action: `(npc)=>{ Talk.startTalk([ {img: "", name: "", msg: "你听说过打败了诺亚的赏金猎人的传闻吗？"}, ] ); }`,
                move: "1",
                eventMapId: "10",
                x: "6",
                y: "11",
                story: "",
                visible: ""
            },
            {
                id: "98",
                type: "npc",
                img: "人物行走图/穷猎人",
                name: "德西多酒吧猎人3对话",
                row: "4",
                col: "4",
                dir: "3",
                action: `(npc)=>{ Talk.startTalk([ {img: "", name: "", msg: "十年前，"}, {img: "", name: "", msg: "有个强的可怕的猎人."}, {img: "", name: "", msg: "连勇士们都感到畏惧‥‥‥"}, {img: "", name: "", msg: "他曾打败过诺亚."}, {img: "", name: "", msg: "名叫雷班纳..."}, ] ); }`,
                move: "0",
                eventMapId: "10",
                x: "8",
                y: "10",
                story: "",
                visible: ""
            }
        ]
    },
    26: {
        name: "德西多商店",
        id: "26",
        music: "道具屋",
        fileName: "猎人商店",
        map: "猎人商店",
        events: [
            {
                id: "38",
                type: "npc",
                img: "交易员",
                name: "德西多售卖员",
                row: "4",
                col: "4",
                dir: "0",
                action: () => {
                    Talk.startTalk([{
                        msg: "欢迎来到德西多废土商店！贵干？", option: [{
                            text: "买", action: () => {
                                Talk.closeTalk();
                                Menu.trade = 'buy';
                                Menu.menuShowItems();
                            }
                        }, {
                            text: "卖", action: () => {
                                Talk.closeTalk();
                                Menu.trade = 'sell';
                                Menu.menuShowItems();
                            }
                        }]
                    },]);
                },
                move: "1",
                eventMapId: "26",
                x: "7",
                y: "8",
                story: "",
                visible: ""
            },
            {
                id: "68",
                type: "jump",
                img: "",
                name: "人类商店到德西多",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(21, 5, 11, DOWN); }",
                move: "0",
                eventMapId: "26",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "93",
                type: "npc",
                img: "人物行走图/穷猎人",
                name: "德西多商店猎人对话",
                row: "4",
                col: "4",
                dir: "1",
                action: `(npc)=>{ Talk.startTalk([ {img: "", name: "", msg: "武器和防卫没有装备.等于一堆废品。"}, ] ); }`,
                move: "0",
                eventMapId: "26",
                x: "13",
                y: "11",
                story: "",
                visible: ""
            },
            {
                id: "94",
                type: "npc",
                img: "人物行走图/猎人",
                name: "德西多商店猎人2对话",
                row: "4",
                col: "4",
                dir: "2",
                action: `(npc)=>{ Talk.startTalk([ {img: "", name: "", msg: "装备和工具可以分别带着."}, {img: "", name: "", msg: "如果步行去外面应该买一点回复胶囊！."}, ] ); }`,
                move: "0",
                eventMapId: "26",
                x: "6",
                y: "12",
                story: "",
                visible: ""
            }
        ]
    },
    18: {
        name: "主角家1楼",
        id: "18",
        music: "商队",
        fileName: "主角家1楼",
        map: "主角家1楼",
        events: [
            /*{
             id: "",
             type: "jump",
             img: "",
             name: "战车工厂到河畔",
             row: "0",
             col: "0",
             dir: "0",
             action: "()=>{ gameStageInit(25, 14, 25, UP); }",
             move: "0",
             eventMapId: "18",
             x: "0",
             y: "0",
             story: "",
             visible: ""
             },*/
            {
                id: "67",
                type: "jump",
                name: "战车工厂到德西多",
                action: "()=>{ console.log('战车工厂到德西多');gameStageInit(21, 4, 16, DOWN); }",
                x: "0",
                y: "0",
            },
            {
                id: "70",
                type: "jump",
                img: "",
                name: "战车工厂到2楼",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(19, 1, 8, DOWN); }",
                move: "0",
                eventMapId: "18",
                x: "6",
                y: "13",
                story: "",
                visible: ""
            },
            {
                id: "113",
                type: "npc",
                img: "人物行走图/重甲猎人",
                name: "德西多主角家1F废弃铁屑处理场",
                row: "4",
                col: "4",
                dir: "3",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "这里是废弃铁屑处理场！"},{img: "", name: "", msg: "冒险的途中获得的破铜烂铁可以拿到这来哦，保证高价回收"}]);
                },
                move: "0",
                eventMapId: "18",
                x: "16",
                y: "15",
                story: "",
            },
            {
                id: "116",
                type: "npc",
                img: "人物行走图/穷猎人",
                name: "主角家1Fnpc",
                row: "4",
                col: "4",
                dir: "0",
                action: () => {
                    // let npc = stage.storyList['主角家1Fnpc'];
                    // moveNpc(npc,[]);
                    Talk.startTalk([{msg: "说什么大话，想成为赏金猎人？"},]);
                    // Talk.waitTalk(()=>{
                    //     RPG.pushState(RPG.MAP_CONTROL);
                    // });
                },
                move: "0",
                eventMapId: "18",
                x: "10",
                y: "18",
                story: "主角家一楼",
                visible: ()=>{
                    return 1;
                }
            },
            {
                type: "auto",
                action: () => {
                    let npc = stage.storyList["主角家一楼"];
                    moveNpc(npc,[UP,UP,LEFT,LEFT,LEFT],()=>{
                        Talk.startTalk([{msg: "哈哈哈！"}, {msg: "都这么大了，还会被家里给赶出来！？"},]);
                        Talk.waitTalk(()=>{
                            RPG.pushState(RPG.MAP_CONTROL);
                            RPG.setSwitch('轰出家门1f',false);
                            RPG.setSwitch('轰出家门',1);
                            npc.move = 1;
                        });
                    });
                },
                visible: ()=>{
                    return RPG.checkSwitch('轰出家门1f');
                }
            },
            {
                id: "127",
                type: "npc",
                img: "人物行走图/交易员",
                name: "德西多主角家寄存处",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "保管员", msg: "这里是勇士财产保管处！."}, {
                        name: "保管员",
                        msg: "雷班纳,有什么事？",
                        option: [{
                            text: "保管", action: function () {
                                Talk.startTalk([{
                                    name: "保管员", msg: "存什么？", option: [{
                                        text: "人类道具", action: function () {
                                            Talk.startTalk([{name: "保管员", msg: "功能建设中"},])
                                        }
                                    }, {
                                        text: "战车道具", action: function () {
                                            Talk.startTalk([{name: "保管员", msg: "功能建设中"},])
                                        }
                                    },]
                                },])
                            }
                        }, {
                            text: "取出", action: function () {
                                Talk.startTalk([{
                                    name: "保管员", msg: "要取什么？", option: [{
                                        text: "人类道具", action: function () {
                                            Talk.startTalk([{name: "保管员", msg: "功能建设中"},])
                                        }
                                    }, {
                                        text: "战车道具", action: function () {
                                            Talk.startTalk([{name: "保管员", msg: "功能建设中"},])
                                        }
                                    },]
                                },])
                            }
                        }, {
                            text: "离开", action: function () {
                                Talk.startTalk([{name: "保管员", msg: "随时都能取，再见！"},]);
                            }
                        },]
                    },]);
                },
                move: "0",
                eventMapId: "18",
                x: "9",
                y: "9",
                story: "",
            },
            {
                id: "128",
                type: "npc",
                img: "人物行走图/交易员",
                name: "德西多全满服务",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "补充员", msg: "欢迎光临全满服务！"}, {
                        img: "",
                        name: "补充员",
                        msg: "补充什么？",
                        option: [{
                            text: "弹药", action: function () {
                                Talk.startTalk([{
                                    img: "",
                                    name: "补充员",
                                    msg: "补充弹药",
                                    option: [{
                                        text: "全部", action: function () {
                                            Talk.startTalk([{img: "", name: "补充员", msg: "已经装满了！"},]);
                                        }
                                    }, {
                                        text: "部分", action: function () {
                                            Talk.startTalk([{img: "", name: "补充员", msg: "已经装满了！"},]);
                                        }
                                    },]
                                },]);
                            }
                        }, {
                            text: "装甲片", action: function () {
                                Talk.startTalk([{
                                    img: "",
                                    name: "补充员",
                                    msg: "补充弹药",
                                    option: [{
                                        text: "全部", action: function () {
                                            Talk.startTalk([{img: "", name: "补充员", msg: "已经装满了！"},]);
                                        }
                                    }, {
                                        text: "部分", action: function () {
                                            Talk.startTalk([{img: "", name: "补充员", msg: "已经装满了！"},]);
                                        }
                                    },]
                                },]);
                            }
                        }, {
                            text: "离开", action: function () {
                                Talk.startTalk([{img: "", name: "补充员", msg: "请再来！"},]);
                            }
                        },]
                    }]);
                },
                move: "0",
                eventMapId: "18",
                x: "12",
                y: "9",
                story: "",
            },
            {
                id: "136",
                type: "npc",
                img: "人物行走图/老爹",
                name: "修理的老爹",
                row: "4",
                col: "4",
                dir: "3",
                action: () => {
                    Talk.startTalk([{msg: "怎么？不想你无聊的梦想了么？"},]);
                },
                move: "0",
                eventMapId: "18",
                x: "13",
                y: "15",
                story: "",
                visible: () => {
                    return RPG.checkSwitch("轰出家门");
                }
            },
            {
                id: "143",
                type: "jump",
                img: "",
                name: "战车工厂到车库-左",
                row: "0",
                col: "0",
                dir: "0",
                action: (npc) => {
                    gameStageInit(28, 8, 18, 3);
                },
                move: "0",
                eventMapId: "18",
                x: "16",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "145",
                type: "jump",
                img: "",
                name: "主角家一楼到车库-右",
                row: "0",
                col: "0",
                dir: "0",
                action: (npc) => {
                    gameStageInit(28, 8, 18, 3);
                },
                move: "0",
                eventMapId: "18",
                x: "17",
                y: "10",
                story: "",
                visible: ""
            },

        ]
    },
    22: {
        name: "德西多猎人中心",
        id: "22",
        music: "道具屋",
        fileName: "猎人中心",
        map: "猎人中心",
        events: [
            /*{
                id: "9",
                type: "touch",
                img: "empty",
                name: "通缉令-戈麦斯",
                row: "1",
                col: "1",
                dir: "0",
                action: "()=>{ UI.showImg('通缉令-戈麦斯'); }",
                move: "0",
                eventMapId: "22",
                x: "10",
                y: "6",
                story: "",
                visible: ""
            },*/
            {
                id: "23",
                type: "jump",
                img: "",
                name: "猎人中心到德西多",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(21, 8, 11, 0) }; ",
                move: "0",
                eventMapId: "22",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            /*{
                id: "25",
                type: "npc",
                img: "战车行走图/MMR/红狼战车MMR",
                name: "战斗测试2",
                row: "4",
                col: "4",
                dir: "0",
                action: "()=>{ Talk.startTalk([ {msg:'遭遇袭击'}, ]); Talk.waitTalk(()=>{ RPG.pushState(RPG.FIGHT_RESULT); RPG.flickerAnimation(Fight.bossFight,[1,2],10); }); }",
                move: "1",
                eventMapId: "22",
                x: "3",
                y: "12",
                story: "",
                visible: ""
            },*/
            {
                id: "59",
                type: "npc",
                img: "大姐姐",
                name: "德西多猎人中心-干事",
                row: "4",
                col: "4",
                dir: "2",
                action: () => {
                    Talk.startTalk([{
                        msg: "赏金猎人办事处", option: [{
                            text: "听情报", action: function () {
                                Talk.startTalk([{name: "赏金猎人办事处", msg: "这附近很太平，没有什么赏金首"},])
                            }
                        }, {
                            text: "本周委托任务", action: function () {
                                Talk.startTalk([{name: "赏金猎人办事处", msg: "最近一到夜晚，镇子周围就会冒出许多杀人虫，严重威胁到了大家的安全，你有兴趣么？"},])
                            }
                        }, {
                            text: "领赏金", action: function () {
                                Talk.startTalk([{name: "赏金猎人办事处", msg: "哈哈，就算打倒了赏金首也要有些证据吧？"},])
                            }
                        }, {
                            text: "离开", action: function () {
                                Talk.closeTalk();
                            }
                        },]
                    },]);
                },
                move: "0",
                eventMapId: "22",
                x: "7",
                y: "7",
                story: "",
                visible: ""
            },
            {
                id: "60",
                type: "auto",
                img: "",
                name: "德西多猎人中心-自动触发",
                action: () => {
                    RPG.setSwitch("费雷塔任务", true);
                    RPG.pushState(RPG.MAP_WAITING);
                    Talk.startTalk([{name: "费雷塔", msg: "新来的，过来看看这个吧"},]);
                    Talk.waitTalk(() => {
                        moveNpc(player,[UP,UP,UP,UP,UP,UP],()=>{
                            Lib.setCamera(player.px,player.py);
                            UI.showImg('通缉令-戈麦斯', () => {
                                Talk.startTalk([
                                    {name: "费雷塔", msg: "如何？不错吧？打败他就有50000G的赏金，这些钱可够花好几个月的。"},
                                    {name: "费雷塔", msg: "我们明天的讨伐目标就是他了，你先去整顿下装备，旅馆睡个饱觉，明天我会去旅馆跟你会合的。"},
                                    {name: "费雷塔", msg: "这是1000G，够你买些好装备了！"},]);
                                Talk.waitTalk(() => {
                                    UI.showInfo('获得1000G',()=>{
                                        mainTeam.addMoney(1000);
                                        RPG.popState();
                                    });
                                });
                            });
                        });
                    });
                },
                eventMapId: "22",
                visible: () => {
                    return (RPG.checkSwitch("费雷塔对话") && !RPG.checkSwitch("费雷塔任务"));
                }
            },
            {
                id: "61",
                type: "npc",
                img: "重甲猎人",
                name: "费雷塔",
                row: "4",
                col: "4",
                dir: "3",
                move: "0",
                eventMapId: "22",
                x: "10",
                y: "7",
                story: "",
                visible: () => {
                    return (RPG.checkSwitch("费雷塔对话") && !RPG.checkSwitch('费雷塔加入'));
                }
            },
            {
                id: "90",
                type: "npc",
                img: "人物行走图/穷猎人",
                name: "德西多猎人中心npc",
                row: "4",
                col: "4",
                dir: "1",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "赏金猎人把干掉怪物作为赚钱的途径！"},]);
                },
                move: "1",
                eventMapId: "22",
                x: "14",
                y: "12",
                story: "",
                visible: ""
            },
            {
                id: "91",
                type: "npc",
                img: "人物行走图/穷猎人",
                name: "德西多猎人中心猎人2对话",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "啊，小屁孩，你有战车么？"},]);
                },
                move: "1",
                eventMapId: "22",
                x: "7",
                y: "11",
                story: "",
                visible: ""
            }
        ]
    },
    8: {
        name: "明奇博士家",
        id: "8",
        music: "TownTheme",
        fileName: "明奇博士家",
        map: "明奇博士家",
        events: [
            {
                id: "69",
                type: "jump",
                img: "",
                name: "明奇家到德西多",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(21, 5, 7, DOWN); }",
                move: "0",
                eventMapId: "8",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "119",
                type: "npc",
                img: "人物行走图/明奇",
                name: "德西多明奇博士家",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "明奇", msg: "我是天才科学家明奇博士."}, {
                        msg: "有事吗？",
                        option: [{
                            text: "看尸体", action: function () {
                                Talk.startTalk([{name: "明奇", msg: "尸体在哪儿？"}, {
                                    name: "明奇",
                                    msg: "给我看看",
                                    option: [{
                                        text: "克里夫", action: function () {
                                            Talk.startTalk([{name: "明奇", msg: "多好的实验材料啊.这次一定要成功。"}, {
                                                name: "明奇",
                                                msg: "接通电流.苏醒过来吧！"
                                            }, {name: "明奇", msg: "这电击！"}, {name: "明奇", msg: "呵！成功了！"}, {
                                                name: "明奇",
                                                msg: "你还有别的尸体没有？",
                                                option: [{
                                                    text: "否", action: function () {
                                                        Talk.startTalk([{name: "", msg: "没有？真遗憾！如果谁死了.一定要再来！"},]);
                                                    }
                                                },]
                                            }])
                                        }
                                    }, {
                                        text: "雷班纳", action: function () {
                                            Talk.startTalk([{name: "明奇", msg: "这具尸体不是还活着吗？"}, {
                                                name: "明奇",
                                                msg: "有没有更合适的尸体？",
                                                option: [{
                                                    text: "否", action: function () {
                                                        Talk.startTalk([{name: "", msg: "遗憾啊！下次再来玩.我等着你。"},]);
                                                    }
                                                },]
                                            }])
                                        }
                                    },]
                                },])
                            }
                        }, {
                            text: "没事", action: function () {
                                Talk.startTalk([{name: "", msg: "尸体腐烂了.不能作实验！看到完好尸体就拿到我这儿来。"},]);
                            }
                        },]
                    },]);
                },
                move: "0",
                eventMapId: "8",
                x: "10",
                y: "11",
                story: "",
                visible: ""
            },
            {
                id: "120",
                type: "npc",
                img: "事件/empty",
                name: "德西多明奇博士家罗拉",
                row: "1",
                col: "1",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "罗拉", msg: "我叫罗拉，是世界上最漂亮的大脑哦！"},]);
                },
                move: "0",
                eventMapId: "8",
                x: "17",
                y: "3",
                story: "",
                visible: ""
            }
        ]
    },
    9: {
        name: "传真屋",
        id: "9",
        music: "TownTheme",
        fileName: "传送屋",
        map: "传送屋",
        events: [
            {
                id: "66",
                type: "jump",
                img: "",
                name: "传送屋到德西多",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(21, 16, 16, DOWN); }",
                move: "0",
                eventMapId: "9",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "92",
                type: "npc",
                img: "人物行走图/老爹",
                name: "德西多传真屋前老人对话",
                row: "4",
                col: "4",
                dir: "1",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "老人", msg: "这里是传真屋,可以把人带到去过的地方。"},]);
                },
                move: "0",
                eventMapId: "9",
                x: "8",
                y: "14",
                story: "",
                visible: ""
            }
        ]
    },
    14: {
        name: "宿屋",
        id: "14",
        music: "TownTheme",
        fileName: "旅馆",
        map: "旅馆",
        events: [
            {
                id: "62",
                type: "jump",
                img: "",
                name: "旅馆到德西多",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(21, 17, 7, DOWN);}",
                move: "0",
                eventMapId: "14",
                x: "10",
                y: "13",
                story: "",
                visible: ""
            },
            {
                id: "63",
                type: "jump",
                img: "",
                name: "德西多旅馆到2楼",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{gameStageInit(17, 2, 7, RIGHT);}",
                move: "0",
                eventMapId: "14",
                x: "1",
                y: "7",
                story: "",
                visible: ""
            },
            {
                id: "76",
                type: "npc",
                img: "蕾娜",
                name: "旅馆费雷塔",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.waitTalk(() => {
                        mainTeam.addHero(1, 30, '费雷塔');
                        UI.showInfo('费雷塔加入队伍');
                        npc.visible = false;
                        RPG.setSwitch('费雷塔加入', true);
                    });
                    Talk.startTalk([{name: '费雷塔', msg: "你醒了？我们出发吧"},]);
                },
                move: "0",
                eventMapId: "14",
                x: "-1",
                y: "-1",
                story: "费雷塔",
                visible: "()=>{return RPG.checkSwitch('费雷塔任务');}"
            },
            {
                id: "78",
                type: "npc",
                img: "大姐姐",
                name: "旅馆老板",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.waitTalk(() => {
                        let x = 2, y = 3;
                        player.setCoordinate(x - 1, y, DOWN);
                        Lib.setCamera(x, y);
                        RPG.nightAndDay(() => {
                            player.setCoordinate(x, y, DOWN);
                            mainTeam.fullHeal();
                            mainTeam.reduceMoney(30);
                            RPG.setSwitch('住宿', 1);
                            if (stage.storyList["费雷塔"] && RPG.checkSwitch('费雷塔任务') && !RPG.checkSwitch('费雷塔加入')) {
                                let char1 = stage.storyList["费雷塔"];
                                char1.setCoordinate(4, 7, DOWN);
                                char1.visible = true;
                                moveNpc(char1, [3, 3, 3, 1]);
                            }
                        });
                    });
                    Talk.startTalk([{
                        msg: "欢迎来到德西多旅馆！", option: [{
                            text: "住宿 30G", action: () => {
                                Talk.startTalk([{msg: "好的，请好好休息吧"},]);
                            }
                        }, {
                            text: "离开", action: () => {
                                Talk.callback = false;
                                Talk.closeTalk();
                            }
                        }]
                    },]);
                },
                move: "0",
                eventMapId: "14",
                x: "14",
                y: "5",
                story: "",
                visible: ""
            },
            {
                id: "103",
                type: "npc",
                img: "人物行走图/猎人",
                name: "德西多宿屋猎人对话",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "你看那被战火毁坏的世界！"}, {
                        img: "",
                        name: "",
                        msg: "这个世界就是以去过多远的地方，见过多少人.来衡量一个人的人生价值"
                    },]);
                },
                move: "1",
                eventMapId: "14",
                x: "9",
                y: "6",
                story: "",
                visible: ""
            },
            {
                id: "104",
                type: "npc",
                img: "人物行走图/蕾娜",
                name: "德西多宿屋路人女对话",
                row: "4",
                col: "4",
                dir: "1",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "要想成为赏金猎人，还得靠战车帮助啊！"}, {
                        img: "",
                        name: "",
                        msg: "连战车也没有谈什么作赏金猎人，只会落得老死街头"
                    }, {img: "", name: "", msg: "如果找到战车就去找些能干的同伴！"},]);
                },
                move: "1",
                eventMapId: "14",
                x: "17",
                y: "9",
                story: "",
                visible: ""
            },
            {
                id: "105",
                type: "npc",
                img: "人物行走图/重甲猎人",
                name: "德西多宿屋勇士对话",
                row: "4",
                col: "4",
                dir: "2",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "损坏的战车能被牵引走"}, {
                        img: "",
                        name: "",
                        msg: "坐在战车上，去调查一下要牵引的战车，这样就可以了！"
                    },]);
                },
                move: "0",
                eventMapId: "14",
                x: "15",
                y: "11",
                story: "",
                visible: ""
            },
            {
                id: "118",
                type: "npc",
                img: "人物行走图/重甲猎人",
                name: "德西多宿屋1F伊戈尔",
                row: "4",
                col: "4",
                dir: "1",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "嗯嘎嗯嘎."}, {img: "", name: "", msg: "嗯嘎."}, {
                        img: "",
                        name: "",
                        msg: "嗯嘎.嗯嘎。"
                    }, {img: "", name: "", msg: "嗯！"},]);
                },
                move: "0",
                eventMapId: "14",
                x: "1",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "129",
                type: "npc",
                img: "人物行走图/路人",
                name: "德西多按摩师",
                row: "4",
                col: "4",
                dir: "1",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "按摩师", msg: "治疗麻木的气功按摩要试一下吗？"}, {
                        img: "",
                        name: "按摩师",
                        msg: "按摩一次的话要10G吗？"
                    }, {
                        img: "", name: "按摩师", msg: "想试一试吗？", option: [{
                            text: "是（钱不足）", action: function () {
                                Talk.startTalk([{img: "", name: "按摩师", msg: "哎呀.钱包快没钱了‥"}, {
                                    img: "",
                                    name: "按摩师",
                                    msg: "请再来!"
                                },]);
                            }
                        }, {
                            text: "是", action: function () {
                                Talk.startTalk([{
                                    img: "",
                                    name: "按摩师",
                                    msg: "要按摩哪位呢？",
                                    option: [{
                                        text: "雷班纳", action: function () {
                                            Talk.startTalk([{img: "", name: "按摩师", msg: "您好久没来了！"}, {
                                                img: "",
                                                name: "按摩师",
                                                msg: "雷班纳轻松了许多！"
                                            },]);
                                        }
                                    }, {
                                        text: "克里夫", action: function () {
                                            Talk.startTalk([{
                                                img: "",
                                                name: "按摩师",
                                                msg: "你说要给死人按摩？",
                                                option: [{
                                                    text: "是", action: function () {
                                                        Talk.startTalk([{img: "", name: "按摩师", msg: "是吗？"}, {
                                                            img: "",
                                                            name: "按摩师",
                                                            msg: "谁让这是工作呢！"
                                                        },]);
                                                    }
                                                }, {
                                                    text: "否", action: function () {
                                                        Talk.closeTalk();
                                                    }
                                                },]
                                            },]);
                                        }
                                    }, {
                                        text: "英格利特", action: function () {
                                            Talk.startTalk([{img: "", name: "按摩师", msg: "英格利特身体的麻木消除了！"},]);
                                        }
                                    },]
                                },]);
                            }
                        }, {
                            text: "离开", action: function () {
                                Talk.startTalk([{img: "", name: "按摩师", msg: "请再来！"},]);
                            }
                        },]
                    }]);
                },
                move: "0",
                eventMapId: "14",
                x: "10",
                y: "4",
                story: "",
                visible: ""
            }
        ]
    },
    21: {
        name: "德西多镇",
        id: "21",
        music: "道具屋",
        fileName: "德西多镇",
        map: "德西多镇",
        events: [
            {
                id: "19",
                type: "auto",
                name: "新手教程",
                action: () => {
                    if (!RPG.checkSwitch("新手教程")) {
                        RPG.setSwitch("新手教程", 1);
                        Talk.startTalk([{
                            img: "face雷娜", msg: "是否进入新手教程？", option: [{
                                text: "是", action: () => {
                                    Talk.startTalk([{img: "face雷娜", name: "游戏美工04", msg: "点击地图移动"}, {
                                        img: "face雷娜",
                                        name: "游戏美工04",
                                        msg: "点击自己打开菜单"
                                    }, {img: "face雷娜", name: "游戏美工04", msg: "物品列表页长按物品使用或装备"}, {
                                        img: "face雷娜",
                                        name: "游戏美工04",
                                        msg: "状态显示页长按装备可卸下"
                                    }, {img: "face雷娜", name: "游戏美工04", msg: "多名队员，状态显示页，左右滑动可切换"}, {
                                        img: "face雷娜",
                                        name: "游戏美工04",
                                        msg: "走到NPC旁点击NPC对话"
                                    }, {img: "face雷娜", name: "游戏美工04", msg: "WARNING：遇到凶残的敌人就跑吧，你老爹可不会来救你"},]);
                                }
                            }, {
                                text: "否", action: () => {
                                    Talk.closeTalk();
                                }
                            }]
                        },])
                    }
                },
                eventMapId: "21",
                visible: ()=>{!RPG.checkSwitch('新手教程')}
            },
            {
                id: "4",
                type: "npc",
                img: "人物行走图/商人妹子",
                name: "德西多商人妹子",
                row: "4",
                col: "4",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "这里是德西多镇！"},]);
                },
                move: "1",
                eventMapId: "21",
                x: "9",
                y: "13",
                story: "",
                visible: ""
            },
            {
                id: "12",
                type: "jump",
                img: "",
                name: "德西多猎人中心",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    gameStageInit(22, 11, 13, 3);
                },
                move: "0",
                eventMapId: "21",
                x: "8",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "13",
                type: "jump",
                img: "",
                name: "德西多到战车工厂",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    gameStageInit(18, 10, 18, 3);
                },
                move: "0",
                eventMapId: "21",
                x: "4",
                y: "15",
                story: "",
                visible: ""
            },
            {
                id: "14",
                type: "jump",
                img: "",
                name: "德西多到人类商店",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    gameStageInit(26, 12, 14, 3);
                },
                move: "0",
                eventMapId: "21",
                x: "5",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "15",
                type: "jump",
                img: "",
                name: "德西多到传送屋",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(9, 7, 13, 3); }",
                move: "0",
                eventMapId: "21",
                x: "16",
                y: "15",
                story: "",
                visible: ""
            },
            {
                id: "16",
                type: "jump",
                img: "",
                name: "德西多到明奇家",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(8, 10, 15, 3); }",
                move: "0",
                eventMapId: "21",
                x: "5",
                y: "6",
                story: "",
                visible: ""
            },
            {
                id: "17",
                type: "jump",
                img: "",
                name: "德西多到酒吧",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(10, 12, 13, 3); }",
                move: "0",
                eventMapId: "21",
                x: "13",
                y: "6",
                story: "",
                visible: ""
            },
            {
                id: "18",
                type: "jump",
                img: "",
                name: "德西多到旅馆",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{gameStageInit(14, 10, 12, UP);}",
                move: "0",
                eventMapId: "21",
                x: "17",
                y: "6",
                story: "",
                visible: ""
            },
            /*{
                id: "22",
                type: "npc",
                img: "人物行走图/蕾娜",
                name: "风穆的大妹子",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.waitTalk(() => {
                        npc.speed = 5;
                        moveNpc(npc, [1, 1, 2, 2, 3, 3, 0, 0]);
                    });
                    Talk.startTalk([{
                        msg: "咦，想学秘籍么？", option: [{
                            text: "是", action: () => {
                                Talk.startTalk([{msg: "那，看好了"},]);
                            }
                        }, {
                            text: "否", action: () => {
                                Talk.closeTalk();
                            }
                        }]
                    },]);
                },
                move: "0",
                eventMapId: "21",
                x: "10",
                y: "4",
                story: "",
                visible: ""
            },*/
            /*{
                id: "26",
                type: "npc",
                img: "战车行走图/MMR/红狼战车MMR",
                name: "战斗测试3",
                row: "4",
                col: "4",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: '遭遇袭击'},]);
                    Talk.waitTalk(() => {
                        RPG.pushState(RPG.FIGHT_RESULT);
                        RPG.flickerAnimation(Fight.bossFight, [1, 2], 0);
                    });
                },
                move: "1",
                eventMapId: "21",
                x: "3",
                y: "12",
                story: "",
                visible: ""
            },
            */
            {
                id: "31",
                type: "npc",
                img: "重甲猎人",
                name: "德西多费雷塔",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.waitTalk(() => {
                        npc.speed = 5;
                        moveNpc(npc, [1], () => {
                            RPG.hideChar(npc);
                            RPG.setSwitch("费雷塔对话", true);
                        });
                    });
                    Talk.startTalk([{
                        name: "费雷塔", msg: "咦，你是赏金猎人么？", option: [{
                            text: "是", action: () => {
                                Talk.startTalk([{name: "费雷塔", msg: "我需要个帮手，讨伐多次抢劫镇子的戈麦斯匪帮！"}, {name: "费雷塔", msg: "不怕死的话，就跟来猎人中心找我吧"},]);
                            }
                        }, {
                            text: "否", action: () => {
                                Talk.callback = null;
                                Talk.startTalk([{name: "费雷塔", msg: "哦，好吧"},]);
                            }
                        }]
                    },]);
                },
                move: "0",
                eventMapId: "21",
                x: "9",
                y: "10",
                story: "",
                visible: () => {
                    return !RPG.checkSwitch("费雷塔对话");
                }
            },
            {
                id: "54",
                type: "box",
                img: "事件/箱子",
                name: "德西多箱子",
                row: "2",
                col: "1",
                action: (npc) => {
                    if (!RPG.checkSwitch("德西多_box1")) {
                        Talk.startTalk([{msg: "让我看看这里有什么"}, {msg: "获得物品！"},]);
                        Talk.waitTalk(() => {
                            npc.anime.setAction(1);
                            npc.anime.onframe();
                            mainTeam.addItem(4, 3, true);
                            RPG.setSwitch("德西多_box1", true);
                        });
                    } else {
                        Talk.startTalk([{msg: "箱子已经被你翻过了^_^"},]);
                    }
                },
                eventMapId: "21",
                x: "3",
                y: "17",
                visible: ()=>{
                    return !RPG.checkSwitch("德西多_box1");
                }
            },
            {
                id: "73",
                type: "jump",
                img: "",
                name: "德西多到帐篷",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(13, 4, 6, UP);}",
                move: "0",
                eventMapId: "21",
                x: "12",
                y: "14",
                story: "",
                visible: ""
            },
            {
                id: "57",
                type: "jump",
                name: "德西多右边界事件",
                action: "(npc)=>{ gameStageInit(0, 89, 239, DOWN);RPG.fight=true;}",
                eventMapId: "21",
                x: "999",
                y: "-1",
                visible: "()=>{return false;}"
            },
            {
                id: "75",
                type: "jump",
                img: "",
                name: "德西多上／下边界事件",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ Talk.startTalk([ {msg:'还是先在镇子里打听下情况吧'}, ]) }",
                move: "0",
                eventMapId: "21",
                x: "0",
                y: "0",
                story: "",
                visible: "()=>{return !RPG.checkSwitch('住宿');}"
            },
            {
                id: "79",
                type: "tank",
                img: "59式战车",
                name: "费雷塔战车",
                row: "4",
                col: "4",
                dir: "0",
                action: "()=>{ RPG.setSwitch('No1入手', true); }",
                move: "0",
                eventMapId: "21",
                x: "14",
                y: "8",
                story: "",
                visible: "()=>{return (RPG.checkSwitch('费雷塔加入')&& !RPG.checkSwitch('No1入手'));}"
            },
            {
                id: "107",
                type: "npc",
                img: "人物行走图/大姐姐",
                name: "德西多坐上路人女对话",
                row: "4",
                col: "4",
                dir: "1",
                action: (npc) => {
                    Talk.startTalk([{
                        msg: "见过住在那边的明奇博士吗？", option: [{
                            text: "是", action: function () {
                                Talk.startTalk([{name: "", msg: "噫！"}, {name: "", msg: "感觉如何？"},])
                            }
                        }, {
                            text: "否", action: function () {
                                Talk.startTalk([{name: "", msg: "他好象专门研究使死人复生的方法。"},])
                            }
                        },]
                    },]);
                },
                move: "0",
                eventMapId: "21",
                x: "8",
                y: "6",
                story: "",
                visible: ""
            },
            {
                id: "109",
                type: "npc",
                img: "穷猎人",
                name: "德西多守卫对话",
                row: "4",
                col: "4",
                dir: "1",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "德西多守卫", msg: "欢迎来到德西多镇！"},]);
                },
                move: "0",
                eventMapId: "21",
                x: "12",
                y: "17",
                story: "",
                visible: ""
            },
            {
                id: "110",
                type: "npc",
                img: "穷猎人",
                name: "德西多守卫2对话",
                row: "4",
                col: "4",
                dir: "2",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "德西多守卫", msg: "欢迎来到德西多镇！"},]);
                },
                move: "0",
                eventMapId: "21",
                x: "8",
                y: "17",
                story: "",
                visible: ""
            },
            {
                id: "111",
                type: "npc",
                img: "人物行走图/穷猎人",
                name: "德西多中部勇士对话",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "听说西边有军事防御阵地，靠近就会被轰成渣"}, {
                        img: "",
                        name: "",
                        msg: "装备不好的话，最好还是远离"
                    },]);
                },
                move: "1",
                eventMapId: "21",
                x: "12",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "117",
                type: "npc",
                img: "人物行走图/猎人",
                name: "德西多右下角猎人对话",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "你说什么？"}, {img: "", name: "", msg: "你见过诺亚！"}, {
                        img: "",
                        name: "",
                        msg: "算了吧."
                    }, {img: "", name: "", msg: "根本不可能。"},]);
                },
                move: "1",
                eventMapId: "21",
                x: "14",
                y: "15",
                story: "",
                visible: ""
            },
            {
                id: "141",
                type: "jump",
                img: "",
                name: "德西多镇到帐篷",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(13, 4, 6, 3); }",
                move: "0",
                eventMapId: "21",
                x: "13",
                y: "14",
                story: "",
                visible: ""
            }
        ]
    },
    19: {
        name: "主角家2楼",
        id: "19",
        music: "商队",
        fileName: "主角家2楼",
        map: "主角家2楼",
        events: [
            {
                id: "71",
                type: "jump",
                img: "",
                name: "2楼到战车工厂",
                row: "0",
                col: "0",
                dir: "0",
                action: "()=>{ gameStageInit(18, 6, 14, DOWN); }",
                move: "0",
                eventMapId: "19",
                x: "1",
                y: "7",
                story: "",
                visible: ""
            },
            {
                id: "72",
                type: "touch",
                img: "事件/empty",
                name: "妈妈",
                row: "1",
                col: "1",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "妈妈的照片"},]);
                },
                move: "0",
                eventMapId: "19",
                x: "9",
                y: "1",
                story: "",
                visible: ""
            },
            {
                id: "115",
                type: "npc",
                img: "人物行走图/姐姐",
                name: "德西多主角家2f姐姐对话",
                row: "4",
                col: "4",
                dir: "1",
                action: () => {
                    if(RPG.checkSwitch('姐姐让睡觉')){
                        Talk.startTalk([{img: "", name: "姐姐", msg: "加油！姐姐相信你，一定会成为一个出色的赏金猎人。"},
                        {img: "", name: "姐姐", msg: "记得常回来哦。"},]);
                    }else {
                        Talk.startTalk([{img: "", name: "姐姐", msg: "终于回来了！"}, {
                            img: "",
                            name: "姐姐",
                            msg: "累了吧？"
                        }, {img: "", name: "姐姐", msg: "去床上休息一下吧。"},]);
                        Talk.waitTalk( ()=>{
                            let x = player.px, y = player.py;
                            player.setCoordinate(x + 1, y, UP);
                            RPG.nightAndDay( ()=>{
                                player.setCoordinate(x, y, LEFT);
                                mainTeam.fullHeal();
                                RPG.setSwitch('姐姐让睡觉',1);
                                Talk.startTalk([{msg: "一觉醒来，精力又充沛了！"}]);
                            });
                        });
                    }
                },
                move: "0",
                eventMapId: "19",
                x: "8",
                y: "8",
                story: "姐姐",
                visible: ()=>{return 1}
            },
            {
                id: "135",
                type: "npc",
                img: "人物行走图/老爹",
                name: "老爹",
                row: "4",
                col: "4",
                dir: 1,
                story: "老爹",
                action: '',
                move: "0",
                eventMapId: "19",
                x: "6",
                y: "8",
                visible: () => {
                    return !RPG.checkSwitch("轰出家门");
                }
            },
            {
                type: "auto",
                action: (callback=false) => {
                    Talk.setTalkPos('bottom');
                    RPG.pushState(RPG.MAP_WAITING);
                    Talk.startTalk([
                        {name: "老爹", msg: "什么？你想出去冒险，成为赏金猎人？"},
                        {name: "老爹", msg: "我看你脑子热的厉害，给我去外面让冷风好好吹吹你那发昏的脑袋吧！！！"}
                    ]);
                    Talk.waitTalk(() => {
                        let sister = stage.storyList['姐姐'];
                        moveNpc(sister, [UP,LEFT,LEFT,DOWN,DOWN], () => {
                            Talk.startTalk([{name: "姐姐", msg: "爸爸你别生气..."},]);
                            Talk.waitTalk(() => {
                                let npc = stage.storyList['老爹'];
                                npc.speed = 8;
                                moveNpc(npc, [1,1,1,1,3,3]);
                                setTimeout(()=>{
                                    moveNpc(player, [1,1,1,3,3],()=>{
                                        gameStageInit(18, 7, 15, UP,()=>{
                                            RPG.nightAndDay(()=>{
                                                Talk.startTalk([{msg:'天亮了'}]);
                                                Talk.waitTalk(()=>{
                                                    RPG.setSwitch('轰出家门1f',1);
                                                });
                                            });

                                        });
                                    });
                                },200);
                            });

                        });

                    });
                },
                visible: () => {
                    return !RPG.checkSwitch("轰出家门");
                }
            }
        ]
    },
    28: {
        name: "车库",
        id: "28",
        music: "战车恰恰",
        fileName: "车库",
        map: "车库",
        events: [
            {
                id: "144",
                type: "jump",
                img: "",
                name: "车库到战车工厂",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(18, 16, 11, 0); }",
                move: "0",
                eventMapId: "28",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            }
        ]
    },
    23: {
        name: "白蚁树林入口",
        id: "23",
        music: "未知荒野",
        fileName: "白蚁树林入口",
        map: "白蚁树林入口",
        events: [
            {
                id: "58",
                type: "jump",
                img: "",
                name: "白蚁森林到德西多",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(21, 10, 18, UP);RPG.fight=false;}",
                move: "0",
                eventMapId: "23",
                x: "-1",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "121",
                type: "npc",
                img: "喽啰move",
                name: "喽啰1",
                row: "4",
                col: "4",
                dir: "2",
                action: "(npc)=>{ }",
                move: "0",
                eventMapId: "23",
                x: "9",
                y: "2",
                story: "喽啰1",
                visible: ""
            },
            {
                id: "122",
                type: "npc",
                img: "喽啰move",
                name: "喽啰2",
                row: "4",
                col: "4",
                dir: "0",
                action: "(npc)=>{ }",
                move: "0",
                eventMapId: "23",
                x: "10",
                y: "1",
                story: "喽啰2",
                visible: ""
            },
            {
                id: "123",
                type: "npc",
                img: "喽啰move",
                name: "喽啰3",
                row: "4",
                col: "4",
                dir: "1",
                action: "(npc)=>{ }",
                move: "0",
                eventMapId: "23",
                x: "11",
                y: "2",
                story: "喽啰3",
                visible: ""
            },
            {
                id: "124",
                type: "npc",
                img: "喽啰move",
                name: "喽啰4",
                row: "4",
                col: "4",
                dir: "3",
                action: "(npc)=>{ }",
                move: "0",
                eventMapId: "23",
                x: "10",
                y: "3",
                story: "喽啰4",
                visible: ""
            },
            {
                id: "125",
                type: "npc",
                img: "毁灭战车move",
                name: "戈麦斯",
                row: "4",
                col: "4",
                dir: "3",
                action: "(npc)=>{ }",
                move: "0",
                eventMapId: "23",
                x: "10",
                y: "6",
                story: "戈麦斯",
                visible: ""
            },
            {
                id: "126",
                type: "auto",
                img: "",
                name: "戈麦斯小人",
                row: "0",
                col: "0",
                dir: "3",
                action: (npc)=>{ let chara = stage.storyList['戈麦斯']; let npc1 = stage.storyList['喽啰1']; let npc2 = stage.storyList['喽啰2']; let npc3 = stage.storyList['喽啰3']; let npc4 = stage.storyList['喽啰4']; player.setCoordinate(10, 2, DOWN); chara.visible = true; Talk.startTalk([ {name:'戈麦斯',msg:'哈哈!又是来讨伐我的赏金猎人吗？小的们，上！他们的战车和钱谁抢到就是谁的！'}, {name:'费雷塔',msg:'站住！不要跑！'}, ]); npc1.visible = true; npc2.visible = true; npc3.visible = true; npc4.visible = true; moveNpc(chara,[0,0,1,1,1,1,1,1,1,1,1,1],()=>{ chara.visible = false; RPG.setSwitch('戈麦斯已跑',1); RPG.pushState(RPG.FIGHT_RESULT); RPG.flickerAnimation(Fight.normalFight,[4,4,4,4],10); npc1.visible = false; npc2.visible = false; npc3.visible = false; npc4.visible = false; Menu.waitMenu(()=>{ RPG.popState(); if(Fight.state===Fight.LOST) { Talk.startTalk([ {name:'费雷塔',msg:'尼玛，几个土匪都那么强。。。'}, ]); return; } Talk.startTalk([ {name:'费雷塔',msg:'可恶啊...让那个混蛋溜了...得赶紧追...'}, {name:'费雷塔',msg:'啊...这声音...引擎好像出了些问题，我不会修车，你下车看看吧.'}, ]); Talk.callback = ()=>{ mainTeam.downTank(); chara.setCoordinate(15, 3, LEFT); chara.visible = true; moveNpc(chara,[1,1,1,1,1,3],()=>{ Talk.startTalk([ {name:'戈麦斯',msg:'没想到吧？我还在这里呢！去死吧，肮脏的赏金猎人！'}, ]); Talk.callback = ()=>{ RPG.pushState(RPG.FIGHT_RESULT); RPG.flickerAnimation(Fight.normalFight,[7],40); Menu.waitMenu(()=>{ Talk.startTalk([ {name:'费雷塔',msg:'如何？我已经表现出我对掠夺者的忠心了，现在能让我加入掠夺者了吧？'}, {name:'戈麦斯',msg:'嗯，你对我的确很忠诚，不过...'}, ]); Talk.callback = ()=>{ gameStageInit(27,6,2,DOWN); RPG.setSwitch('第一章结束'); }; }); } }) } }); }); },
                move: "0",
                eventMapId: "23",
                x: "0",
                y: "0",
                story: "",
                visible: "()=>{return !RPG.checkSwitch('戈麦斯已跑');}"
            },
            {
                id: "130",
                type: "jump",
                img: "",
                name: "白蚁森林到商人营地",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(2, 10, 3, DOWN);RPG.fight=false;}",
                move: "0",
                eventMapId: "23",
                x: "0",
                y: "-1",
                story: "",
                visible: ""
            },
            {
                id: "134",
                type: "jump",
                img: "",
                name: "白蚁森林到库莱勒",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(0, 108, 242, LEFT);RPG.fight=false;}",
                move: "0",
                eventMapId: "23",
                x: "999",
                y: "-1",
                story: "",
                visible: ""
            }
        ]
    },
    27: {
        name: "帕布罗帐篷",
        id: "27",
        music: "TownTheme",
        fileName: "帐篷",
        map: "帐篷",
        events: [
            {
                id: "89",
                type: "npc",
                img: "猎人",
                name: "帕布罗",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    if (RPG.checkSwitch("选择1") && RPG.checkSwitch("选择2") && RPG.checkSwitch("选择3")) {
                        Talk.startTalk([{
                            name: "帕布罗",
                            msg: "我来这个营地买炮弹原料，但这里的原料已经卖完了。所以明天一早我就要动身去北边的库莱勒镇买原料。"
                        }, {
                            name: "帕布罗", msg: "你要一起走吗？", option: [{
                                text: "是", action: () => {
                                    Talk.startTalk([{name: "帕布罗", msg: "你可以先在营地里四处转转，觉得累了就回帐篷里睡觉，明天出发。"}]);
                                }
                            }, {
                                text: "否", action: () => {
                                    Talk.startTalk([{name: "帕布罗", msg: "嗯...那好吧，祝你好运。"}]);
                                }
                            }]
                        },]);
                    } else {
                        Talk.startTalk([{
                            name: "男子",
                            msg: "你醒了？我在野外发现你晕倒在了地上，就把你带回来了。",
                            option: [{
                                text: "你是谁", action: () => {
                                    Talk.startTalk([{msg: "哦，我叫帕布罗，是个艺术家。"}]);
                                    RPG.setSwitch("选择1", true);
                                }
                            }, {
                                text: "我在哪", action: () => {
                                    Talk.startTalk([{msg: "这里是旅行商人的秘密营地。"}]);
                                    RPG.setSwitch("选择2", true);
                                }
                            }, {
                                text: "你有没有见过一个开着侦察车的赏金猎人", action: () => {
                                    Talk.startTalk([{msg: "哦，前几天我好像看到他从这附近向北走了。"}]);
                                    RPG.setSwitch("选择3", true);
                                }
                            }]
                        },]);
                    }
                },
                move: "0",
                eventMapId: "27",
                x: "5",
                y: "5",
                story: "",
                visible: ""
            },
            {
                id: "132",
                type: "jump",
                img: "",
                name: "帕布罗帐篷到商人营地",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(2, 13, 10, DOWN);}",
                move: "0",
                eventMapId: "27",
                x: "-1",
                y: "999",
                story: "",
                visible: ""
            }
        ]
    },
    13: {
        name: "帐篷",
        id: "13",
        music: "TownTheme",
        fileName: "帐篷",
        map: "帐篷",
        events: [
            {
                id: "74",
                type: "jump",
                img: "",
                name: "帐篷到德西多",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(21, 12, 15, DOWN);}",
                move: "0",
                eventMapId: "13",
                x: "4",
                y: "7",
                story: "",
                visible: ""
            }
        ]
    },
    17: {
        name: "宿屋2F",
        id: "17",
        music: "道具屋",
        fileName: "旅馆二楼",
        map: "旅馆二楼",
        events: [
            {
                id: "64",
                type: "jump",
                img: "",
                name: "2楼到德西多旅馆",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{gameStageInit(14, 2, 7, RIGHT);}",
                move: "0",
                eventMapId: "17",
                x: "1",
                y: "7",
                story: "",
                visible: ""
            },
            {
                id: "101",
                type: "npc",
                img: "人物行走图/猎人",
                name: "德西多宿屋2F猎人",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "洞里好象有战车型的可怕怪物。"},]);
                },
                move: "0",
                eventMapId: "17",
                x: "4",
                y: "11",
                story: "",
                visible: ""
            },
            {
                id: "102",
                type: "npc",
                img: "人物行走图/老爹",
                name: "德西多宿屋2F老者对话",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{img: "", name: "", msg: "咦？"}, {img: "", name: "", msg: "人活着的目的？"}, {
                        img: "",
                        name: "",
                        msg: "你自己去找答案吧！"
                    },]);
                },
                move: "0",
                eventMapId: "17",
                x: "18",
                y: "3",
                story: "",
                visible: ""
            }
        ]
    },
    15: {
        name: "猎人中心",
        id: "15",
        music: "道具屋",
        fileName: "猎人中心",
        map: "猎人中心",
        events: [
            {
                id: "2",
                type: "npc",
                img: "战车行走图/MMR/红狼战车MMR",
                name: "战斗测试",
                row: "4",
                col: "4",
                dir: "0",
                action: "()=>{ Talk.startTalk([ {msg:'遭遇袭击'}, ]); Talk.waitTalk(()=>{ RPG.pushState(RPG.FIGHT_RESULT); RPG.flickerAnimation(Fight.bossFight,[1,2],10); }); }",
                move: "1",
                eventMapId: "15",
                x: "3",
                y: "12",
                story: "",
                visible: ""
            },
            {
                id: "36",
                type: "npc",
                img: "姐姐",
                name: "姐姐对话",
                row: "4",
                col: "4",
                dir: "0",
                action: "()=>{ Talk.startTalk([{msg:'测试玩玩“}]); }",
                move: "0",
                eventMapId: "15",
                x: "10",
                y: "13",
                story: "",
                visible: ""
            },
            {
                id: "48",
                type: "npc",
                img: "猎人A",
                name: "猎人中心-猎人A",
                row: "4",
                col: "4",
                dir: "3",
                action: (npc) => {
                    Talk.startTalk([{name: "猎人", msg: "这附近没有什么赏金首可以猎取啊。"}]);
                },
                move: "1",
                eventMapId: "15",
                x: "8",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "49",
                type: "npc",
                img: "办事员",
                name: "猎人中心-办事员",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{name: "赏金猎人办事处", msg: "有事吗？"}, {
                        msg: "赏金猎人办事处",
                        option: [{
                            text: "听情报", action: function () {
                                Talk.startTalk([{name: "赏金猎人办事处", msg: "这附近很太平，没有什么赏金首"},])
                            }
                        }, {
                            text: "本周委托任务", action: function () {
                                Talk.startTalk([{name: "赏金猎人办事处", msg: "最近一到夜晚，镇子周围就会冒出许多杀人虫，严重威胁到了大家的安全，你有兴趣活动活动么？"},])
                            }
                        }, {
                            text: "领赏金", action: function () {
                                Talk.startTalk([{name: "赏金猎人办事处", msg: "哈哈，就算打倒了赏金首也要有些证据吧？"},])
                            }
                        }, {
                            text: "离开", action: function () {
                                Talk.closeTalk();
                            }
                        },]
                    },]);
                },
                move: "0",
                eventMapId: "15",
                x: "7",
                y: "7",
                story: "",
                visible: ""
            },
            {
                id: "50",
                type: "npc",
                img: "蕾娜",
                name: "猎人中心-蕾娜",
                row: "4",
                col: "4",
                dir: "0",
                action: (npc) => {
                    if (RPG.checkSwitch("费雷塔task")) {
                        Talk.startTalk([{name: "蕾娜", msg: "新来的，过来一下吧"}, {name: "蕾娜", msg: "看看这个吧"}, {
                            name: "蕾娜",
                            msg: "如何？不错吧？打败他就有50000G的赏金，这些钱可够花好几个月的。"
                        }, {name: "蕾娜", msg: "我们明天讨伐的讨伐目标就是他了。你先去镇子里的旅馆休息一下吧。"}, {
                            name: "蕾娜",
                            msg: "不想休息呀？那你到处逛逛吧"
                        },], undefined, 4);
                    }
                },
                move: "0",
                eventMapId: "15",
                x: "10",
                y: "7",
                story: "",
                visible: ""
            },
            {
                id: "52",
                type: "jump",
                img: "",
                name: "跳转815",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(script.stage01, 8, 15, DOWN);}",
                move: "0",
                eventMapId: "15",
                x: "11",
                y: "15",
                story: "",
                visible: ""
            },
            {
                id: "53",
                type: "jump",
                img: "",
                name: "815跳转2",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(script.stage01, 8, 15, DOWN);}",
                move: "0",
                eventMapId: "15",
                x: "12",
                y: "15",
                story: "",
                visible: ""
            }
        ]
    },
    1: {
        name: "岔路口",
        id: "1",
        music: "未知荒野",
        fileName: "白蚁树林入口",
        map: "白蚁树林入口",
        events: [
            {
                id: "29",
                type: "npc",
                img: "大姐姐",
                name: "路人对话",
                row: "4",
                col: "4",
                dir: "0",
                action: () => {
                    Talk.startTalk([{name: "猎人", msg: "这附近没有什么赏金首可以猎取啊。"},]);
                },
                move: "1",
                eventMapId: "1",
                x: "15",
                y: "16",
                story: "",
                visible: ""
            },
            {
                id: "51",
                type: "auto",
                img: "",
                name: "猎人中心-自动触发",
                row: "0",
                col: "0",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{name: "蕾娜", msg: "新来的，过来一下吧"}, {name: "蕾娜", msg: "看看这个吧"}, {
                        name: "蕾娜",
                        msg: "如何？不错吧？打败他就有50000G的赏金，这些钱可够花好几个月的。"
                    }, {name: "蕾娜", msg: "我们明天讨伐的讨伐目标就是他了。你先去镇子里的旅馆休息一下吧。"}, {
                        name: "蕾娜",
                        msg: "不想休息呀？那你到处逛逛吧"
                    },], undefined, 0, 3);
                    RPG.setSwitch("费雷塔task", true);
                },
                move: "0",
                eventMapId: "1",
                x: "0",
                y: "0",
                story: "",
                visible: "()=>{return 0;}"
            },
        ]
    },
    2: {
        name: "盗贼团营地",
        id: "2",
        music: "消逝的过去",
        fileName: "商人营地",
        map: "商人营地",
        events: [
            {
                id: "131",
                type: "jump",
                img: "",
                name: "商人营地到帕布罗帐篷",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(27, 4, 6, UP);}",
                move: "0",
                eventMapId: "2",
                x: "13",
                y: "9",
                story: "",
                visible: ""
            },
            {
                id: "133",
                type: "jump",
                img: "",
                name: "商人营地到白蚁森林",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(23, 1, 10, RIGHT);RPG.fight=true;}",
                move: "0",
                eventMapId: "2",
                x: "-1",
                y: "0",
                story: "",
                visible: ""
            }
        ]
    },
    0: {
        name: "世界",
        id: "0",
        music: "未知荒野",
        fileName: "MMR",
        map: "MMR",
        isWorld: true,
        events: [
            //德西多21
            {
                type: "jump",
                name: "进入德西多up",
                action: "(npc)=>{ gameStageInit(21, 10, 3, DOWN);}",
                eventMapId: "0",
                x: "88",
                y: "237"
            },
            {
                type: "jump",
                name: "进入德西多up",
                action: "(npc)=>{ gameStageInit(21, 10, 3, DOWN);}",
                eventMapId: "0",
                x: "89",
                y: "237"
            },
            {
                type: "jump",
                name: "进入德西多down",
                action: "(npc)=>{ gameStageInit(21, 10, 17, UP);}",
                eventMapId: "0",
                x: "88",
                y: "238"
            },
            {
                type: "jump",
                name: "进入德西多down",
                action: "(npc)=>{ gameStageInit(21, 10, 17, UP);}",
                eventMapId: "0",
                x: "89",
                y: "238"
            },
            //白蚂蚁树林23
            {
                type: "jump",
                name: "进入德西多down",
                action: "(npc)=>{ gameStageInit(23, 10, 1, DOWN);}",
                eventMapId: "0",
                x: "109",
                y: "242"
            },
            //新手区域出口
            {
                type: "jump",
                name: "进入新手区出口",
                action: "(npc)=>{ gameStageInit(20, 9, 15, UP);}",
                eventMapId: "0",
                x: "103",
                y: "222"
            },
            {
                id: "57",
                type: "jump",
                name: "德西多边界到拉多",
                action: "(npc)=>{ gameStageInit(23, 10, 1, DOWN);}",
                eventMapId: "0",
                x: "999",
                y: "-1",
                visible: "()=>{return false;}"
            },
            {
                id: "139",
                type: "jump",
                name: "从德西多跳转到25号的河畔镇",
                action: "(npc)=>{ gameStageInit(25, 8, 11, 0); }",
                move: "0",
                eventMapId: "0",
                x: "15",
                y: "10",
            },

            {
                id: "133",
                type: "jump",
                img: "",
                name: "商人营地到白蚁森林",
                row: "0",
                col: "0",
                dir: "0",
                action: "(npc)=>{ gameStageInit(23, 1, 10, RIGHT);RPG.fight=true;}",
                move: "0",
                eventMapId: "2",
                x: "-1",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "29",
                type: "npc",
                img: "大姐姐",
                name: "路人对话",
                row: "4",
                col: "4",
                dir: "0",
                action: () => {
                    Talk.startTalk([{name: "猎人", msg: "这附近没有什么赏金首可以猎取啊。"},]);
                },
                move: "1",
                eventMapId: "1",
                x: "15",
                y: "16",
                story: "",
                visible: ""
            },
            {
                id: "51",
                type: "auto",
                img: "",
                name: "猎人中心-自动触发",
                row: "0",
                col: "0",
                dir: "0",
                action: (npc) => {
                    Talk.startTalk([{name: "蕾娜", msg: "新来的，过来一下吧"}, {name: "蕾娜", msg: "看看这个吧"}, {
                        name: "蕾娜",
                        msg: "如何？不错吧？打败他就有50000G的赏金，这些钱可够花好几个月的。"
                    }, {name: "蕾娜", msg: "我们明天讨伐的讨伐目标就是他了。你先去镇子里的旅馆休息一下吧。"}, {
                        name: "蕾娜",
                        msg: "不想休息呀？那你到处逛逛吧"
                    },], undefined, 0, 3);
                    RPG.setSwitch("费雷塔task", true);
                },
                move: "0",
                eventMapId: "1",
                x: "0",
                y: "0",
                story: "",
                visible: "()=>{return 0;}"
            },
        ]
    },
    20: {
        name: "库莱勒",
        id: "20",
        music: "道具屋",
        fileName: "库莱勒",
        map: "库莱勒",
        events: [
            {
                id: "68",
                type: "jump",
                img: "",
                name: "进入北方世界",
                action: ()=>{
                    Talk.startTalk([{msg:"北方世界建设中"}])
                    //gameStageInit(0, 103, 211, UP);
                    },
                move: "0",
                eventMapId: "26",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "68",
                type: "jump",
                img: "",
                name: "进入南世界",
                action: "()=>{ gameStageInit(21, 5, 11, DOWN); }",
                move: "0",
                eventMapId: "26",
                x: "0",
                y: "0",
                story: "",
                visible: ""
            },
            {
                id: "4",
                type: "npc",
                img: "人物行走图/商人妹子",
                name: "商人妹子",
                row: "4",
                col: "4",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "这里是未完工的库莱勒！"},{msg: "作者偷懒！"}]);
                },
                move: "1",
                eventMapId: "21",
                x: "8",
                y: "14",
                story: "",
                visible: ""
            },
            {
                id: "12",
                type: "jump",
                img: "",
                name: "猎人中心",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "修建中"}]);
                    // gameStageInit(22, 11, 13, 3);
                },
                move: "0",
                eventMapId: "21",
                x: "8",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "13",
                type: "jump",
                img: "",
                name: "德西多到战车工厂",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "修建中"}])
                    // gameStageInit(18, 10, 18, 3);
                },
                move: "0",
                eventMapId: "21",
                x: "4",
                y: "15",
                story: "",
                visible: ""
            },
            {
                id: "14",
                type: "jump",
                img: "",
                name: "德西多到人类商店",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "修建中"}]);
                },
                move: "0",
                eventMapId: "21",
                x: "5",
                y: "10",
                story: "",
                visible: ""
            },
            {
                id: "15",
                type: "jump",
                img: "",
                name: "德西多到传送屋",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "修建中"}]);
                },
                move: "0",
                eventMapId: "21",
                x: "16",
                y: "15",
                story: "",
                visible: ""
            },
            {
                id: "16",
                type: "jump",
                img: "",
                name: "德西多到明奇家",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "修建中"}]);
                },
                move: "0",
                eventMapId: "21",
                x: "5",
                y: "6",
                story: "",
                visible: ""
            },
            {
                id: "17",
                type: "jump",
                img: "",
                name: "德西多到酒吧",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "修建中"}]);
                },
                move: "0",
                eventMapId: "21",
                x: "13",
                y: "6",
                story: "",
                visible: ""
            },
            {
                id: "18",
                type: "jump",
                img: "",
                name: "德西多到旅馆",
                row: "0",
                col: "0",
                dir: "0",
                action: () => {
                    Talk.startTalk([{msg: "修建中"}]);
                },
                move: "0",
                eventMapId: "21",
                x: "17",
                y: "6",
                story: "",
                visible: ""
            },

        ]
    },

};