let script = {
	/*stage01:{
		name: "河畔镇外郊",
		id: "stage01",
		map: map_home1,
		mapdata: {},
		events:[
			 // 获胜离开点
		     {chara:"touch", img:"right", x:19,  y:18, row:1, col:3, visible: function(){return (RPG.checkSwitch("gate1win"));},action: ()=>{
		     	RPG.startTalk(stage.talk.talk5);
		     	RPG.waitTalk(()=>{
		     		RPG.winGame();
		     	});
		     }},
	     	 // 启动第一轮对话
		     {chara:"npc", img:"npc17", x:12,  y:16,col:4, visible: ()=>{return (!RPG.checkSwitch("firstTalk"));},action: (npc)=>{
		     	RPG.pushState(RPG.MAP_WAITING);
		     	RPG.startTalk(stage.talk.talk1);
		     	RPG.waitTalk(()=>{
		     		npc.speed=2;
		     		RPG.moveNpc(npc, [0,0,2,2,2,2,3,3,3]);
		     		RPG.waitCharPos(npc, 16, 17, ()=>{
				     	RPG.popState();
			     		RPG.hideChar(npc);
			     		RPG.setSwitch("firstTalk", true);
		     		});
		     	});
		     }},
		     {chara:"npc", img:"",     x:9,   y:13, action: function(){
		     	// 进入山洞
		     	if (RPG.checkSwitch("accept")) {
		     		// 切换场景
		     		RPG.jumpStage(script.stage02, 4, 2, 0);
		     	}else{
		     		RPG.startTalk(stage.talk.talk3);
		     	}
		     }},
		     /!*{chara:"auto", img:"", x:-2, y:-2, visible: function(){return (!RPG.checkSwitch("autoTalk"));}, action: function(){
		     	// 自动发言
		     	RPG.setTalkPos("middle");
		     	RPG.startTalk(stage.talk.talk4);
		     	RPG.setSwitch("autoTalk", true);
		     	// RPG.waitTalk(function(){
			     // 	RPG.makeChoise(stage.choice.choice1);
		     	// });
		     }},*!/
		     {chara:"npc", img:"",     x:2,   y:1, action: function(){
		     	// 获得浆果
		     	RPG.getBerry(1,1,stage.talk.talk8);
		     }},
		     {chara:"npc", img:"",     x:5,   y:2, action: function(){
		     	// 获得浆果
		     	RPG.getBerry(2,1,stage.talk.talk8);
		     }},
		     {chara:"npc", img:"",     x:10,   y:1, action: function(){
		     	// 获得浆果
		     	RPG.getBerry(3,1,stage.talk.talk8);
		     }},
		     {chara:"npc", img:"",     x:9,   y:4, action: function(){
		     	// 从谷底回到山洞
	     		RPG.jumpStage(script.stage02, 17, 5, RPG.UP);
		     }},
		     {chara:"npc", img:"",     x:1,   y:4, action: function(){
		     	// 从山顶回到山洞
	     		RPG.jumpStage(script.stage02, 12, 16, RPG.DOWN);
		     }},
		     {chara:"npc",x:16,y:16,action:()=>{
		     	// 进入帐篷
		     	if (RPG.checkSwitch("firstTalk")) {
		     		// 切换场景
		     		RPG.jumpStage(script.stage03, 5, 8, 3);
		     	}else{
		     		RPG.startTalk(stage.talk.talk2);
		     	}
		     }}
		     ],
		talk: talklist1,
		choice: {
			choice1:{ img: "face2", msg: "操作教程",
	    	        choise:[
	    	        	{text:"看",action: ()=>{
				     		RPG.closeTalk();
				     		RPG.startTalk(stage.talk.talk6);
					     	RPG.waitTalk(()=>{
					     		RPG.startTalk(stage.talk.talk7);
						     	RPG.waitTalk(()=>{
			    			 		RPG.setTalkPos("bottom");
			    			 	});
		    			 	});
		     			}},
		     			{text:"不看",action: ()=>{
				     		RPG.closeTalk();
				     		RPG.startTalk(stage.talk.talk7);
					     	RPG.waitTalk(()=>{
		    			 		RPG.setTalkPos("bottom");
		    			 	});
		     			}}]
		    	  }
		}
	},
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
		     			RPG.startTalk(stage.talk.talk6);
			     		RPG.waitTalk(function(){
					     	RPG.makeChoise(stage.choice.choice1);
		     			});
		     		} else {
			     		// 未得到宝物直接离洞
		     			RPG.jumpStage(script.stage01, 9, 14, 0);
		     		}
		     	} else {
		     		// 胜利后直接离洞
	     			RPG.jumpStage(script.stage01, 9, 14, 0);
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
		     		RPG.startTalk(stage.talk.talk1);
			     	RPG.waitTalk(function(){
			     		RPG.denFight(3, "BatDenTaken");
			     	});
		     	} else {
		     		RPG.startTalk(stage.talk.talk3);
		     	}
		     }},
		     {chara:"npc", img:"empty",     x:17,   y:13, action: function(){
		     	// 蝎子巢穴
		     	if (!RPG.checkSwitch("HookDenTaken")){
		     		RPG.startTalk(stage.talk.talk2);
			     	RPG.waitTalk(function(){
			     		RPG.denFight(2, "HookDenTaken");
			     	});
		     	} else {
		     		RPG.startTalk(stage.talk.talk4);
		     	}
		     }},
		     {chara:"npc", img:"",     x:17,   y:6, action: function(){
		     	// 回到大地图：进入谷底
	     		RPG.jumpStage(script.stage01, 8, 4, 1);
		     }},
		     {chara:"npc", img:"",     x:12,   y:15, action: function(){
		     	// 回到大地图：上山
	     		RPG.jumpStage(script.stage01, 1, 5, 0);
		     }},
		     {chara:"npc", img:"",     x:19,   y:17, action: function(){
		     	// 进入深洞
	     		RPG.jumpStage(script.stage04, 1, 5, RIGHT);
		     }},
		     {chara:"npc", img:"",     x:19,   y:18, action: function(){
		     	// 进入深洞
	     		RPG.jumpStage(script.stage04, 1, 6, RIGHT);
		     }}
		     ],
		talk: talklist2,
		choice: {
			choice1:{ img: "face7", msg: "是否把副炮交给他？",
	    	        choise:[
	    	        	{text:"给",action: function(){
				     		RPG.closeTalk();
				     		mainTeam.takeItem(0);
				     		RPG.enemyTeam[5].getHero(0).weapon= 0;
				     		RPG.enemyTeam[5].addItem(0, 1);
				     		RPG.startTalk(stage.talk.talk7);
					     	RPG.waitTalk(function(){
				     			RPG.gate1Fight();
				     		});
		     			}},
		     			{text:"不给",action: function(){
				     		RPG.closeTalk();
				     		RPG.enemyTeam[5].getHero(0).weapon= -1;
				     		RPG.enemyTeam[5].itemList=[];
				     		RPG.startTalk(stage.talk.talk8);
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
		     		RPG.startTalk(stage.talk.talk4);
		     	} else if (RPG.checkSwitch("secondTalk")) {
			     	RPG.makeChoise(stage.choice.choice1);
		     	} else {
		     		RPG.startTalk(stage.talk.talk1);
		     		RPG.setSwitch("secondTalk", true);
			     	RPG.waitTalk(function(){
				     	RPG.makeChoise(stage.choice.choice1);
				    });
		     	}
		     }},
		     {chara:"npc", img:"empty", x:4,  y:2, action: function(){
		     	// 隐藏的食物
		     	if (RPG.checkSwitch("gate1win")) {
		     		if (!RPG.checkSwitch("breadTake")){
			     		RPG.startTalk(stage.talk.talk7);
				     	RPG.waitTalk(function(){
				     		mainTeam.addItem(12, 3, true);
				     		RPG.setSwitch("breadTake", true);
				     	});
				     }
		     	} else {
		     		RPG.startTalk(stage.talk.talk6);		     		
		     	}
		     }},
		     {chara:"npc", img:"", x:5,  y:9, action: function(){
		     	// 回到大地图
	     		RPG.jumpStage(script.stage01, 16, 17, 0);
		     }},
		     {chara:"npc", img:"empty", x:9,  y:5, row:1, col:1, action: function(){
		     	// 休息一夜
		     	if (RPG.checkSwitch("gate1win")) {
		     		RPG.startTalk(stage.talk.talk8);
		     	} else if (RPG.checkSwitch("accept")) {
			     	RPG.pushState(RPG.MAP_WAITING);
		     		RPG.startTalk(stage.talk.talk5);
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
				     		RPG.closeTalk();
 							RPG.startTalk(stage.talk.talk2);
				     		RPG.setSwitch("accept", true);
					     	RPG.waitTalk(function(){
					     		mainTeam.addItem(1, 5, true);
					     	});
		     			}},
		     			{text:"不去",action: function(){
				     		RPG.closeTalk();
 							RPG.startTalk(stage.talk.talk3);
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
				RPG.startTalk(stage.talk.talk2);
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
	     		RPG.jumpStage(script.stage02, 18, 17, RPG.LEFT);
	     		if (!RPG.checkSwitch("firstSigh")){
	     			if (mainTeam.haveItem(0)){
	     				RPG.setSwitch("firstSigh");
						RPG.startTalk(stage.talk.talk5);
	     			}
	     		}
		     }},
		     {chara:"npc", img:"",     x:0,   y:6, action: function(){
		     	// 回到大洞
	     		RPG.jumpStage(script.stage02, 18, 18, RPG.LEFT);
	     		if (!RPG.checkSwitch("firstSigh")){
	     			if (mainTeam.haveItem(0)){
	     				RPG.setSwitch("firstSigh");
						RPG.startTalk(stage.talk.talk5);
	     			}
	     		}
		     }},
		     ],
		talk: talklist4,
	},*/
    stage05:{
        name: "战车工厂",
        id: "stage05",
        map: map_home1,
        imgName:['home1_0','home1_1'],
        mapdata: {},
        events: [
        {
                type: "npc", img: "empty", x: 12, y: 9, row: 1, col: 1, action: function () {
                // 休息一夜
                if(RPG.setSwitch("accept")){
                    RPG.startTalk(stage.talk.talk8);
                }else {
                    RPG.pushState(RPG.MAP_WAITING);
                    RPG.startTalk(stage.talk.talk5);
                    RPG.waitTalk(function () {
                        player.setCoordinate(12, 9, 0);
                        RPG.resetChildIndex(charaLayer);
                        RPG.nightAndDay(function () {
                            player.setCoordinate(12, 10, 0);
                            mainTeam.fullHeal();
                            RPG.popState();
                        });
                    });
                }

            }
            },
            {type: "npc", img: "npc1", x: 13, y: 15,
				action: function (npc) {
					// 第二轮说话
					if (RPG.checkSwitch("accept")) {
						RPG.startTalk(stage.talk.talk4);
					} else if (RPG.checkSwitch("secondTalk")) {
						RPG.makeChoise(stage.choice.choice1);
					} else {
						RPG.startTalk(stage.talk.talk1);
						RPG.setSwitch("secondTalk", true);
						RPG.waitTalk(function () {
							RPG.makeChoise(stage.choice.choice1);
						});
					}
				}
            },
            {
                type: "npc", img: "npc1", x: 13, y: 15, action: function (npc) {
                    // 第二轮说话
                    if (RPG.checkSwitch("accept")) {
                        RPG.startTalk(stage.talk.talk4);
                    } else if (RPG.checkSwitch("secondTalk")) {
                        RPG.makeChoise(stage.choice.choice1);
                    } else {
                        RPG.startTalk(stage.talk.talk1);
                        RPG.setSwitch("secondTalk", true);
                        RPG.waitTalk(function () {
                            RPG.makeChoise(stage.choice.choice1);
                        });
                    }
                }
            },
            {chara:"npc", img:"box",col:1,row:2, x:6,  y:11, action: function(npc){
                // 隐藏的食物
                if (!RPG.checkSwitch("breadTake1")){
                    RPG.startTalk(stage.talk.talk7);
                    RPG.waitTalk(function(){
                        npc.anime.setAction(1);
                        mainTeam.addItem(12, 3, true);
                        RPG.setSwitch("breadTake1", true);
                    });
                }else {
                    RPG.startTalk(stage.talk.talk6);
                }
            }},
            {chara:"npc", img:"box",col:1,row:2, x:6,  y:12, action: function(npc){
                // 隐藏的食物
				if (!RPG.checkSwitch("breadTake2")){
					RPG.startTalk(stage.talk.talk7);
					RPG.waitTalk(function(){
                        npc.anime.setAction(1);
                        mainTeam.addItem(12, 3, true);
						RPG.setSwitch("breadTake2", true);
					});
				}else {
                    RPG.startTalk(stage.talk.talk6);
                }
            }},
            // 山洞战斗者
            {chara:"touch", img:"npc5", x:6,  y:5, move:1, visible: function(){return (!RPG.checkSwitch("BatDenTaken"));}, action: function(aChar){RPG.simpleFight(1, aChar);}},
            {
                type: "npc", img: "", x: 6, y: 13, action: function () {
                    // 回到大地图
                    RPG.jumpStage(script.stage06, 1, 7, 0);
                }
            }

        ],
        talk: talklist3,
        choice: {
            choice1:{ img: "face7", msg: "是否同意去？",
                choise:[
                    {text:"去",action: function(){
                        RPG.closeTalk();
                        RPG.startTalk(stage.talk.talk2);
                        RPG.setSwitch("accept", true);
                        RPG.waitTalk(function(){
                            mainTeam.addItem(1, 5, true);
                        });
                    }},
                    {text:"不去",action: function(){
                        RPG.closeTalk();
                        RPG.startTalk(stage.talk.talk3);
                    }}]
            }
        }
    },
    stage06:{
        name: "猎人家",
        id: "stage06",
        map: map_home2,
        imgName:['home2_0','home2_1'],
        mapdata: {},
        events: [
            {
                type: "npc", img: "npc1", x: 13, y: 15, action: function (npc) {
                // 第二轮说话
					if (RPG.checkSwitch("accept")) {
						RPG.startTalk(stage.talk.talk4);
					} else if (RPG.checkSwitch("secondTalk")) {
						RPG.makeChoise(stage.choice.choice1);
					} else {
						RPG.startTalk(stage.talk.talk1);
						RPG.setSwitch("secondTalk", true);
						RPG.waitTalk(function () {
							RPG.makeChoise(stage.choice.choice1);
						});
					}
            	}
            },
            {chara:"npc", img:"box",col:1,row:2, x:6,  y:11, action: function(npc){
                // 隐藏的食物
                if (!RPG.checkSwitch("breadTake1")){
                    RPG.startTalk(stage.talk.talk7);
                    RPG.waitTalk(function(){
                        npc.anime.setAction(1);
                        mainTeam.addItem(12, 3, true);
                        RPG.setSwitch("breadTake1", true);
                    });
                }else {
                    RPG.startTalk(stage.talk.talk6);
                }
            }},
            {chara:"npc", img:"box",col:1,row:2, x:6,  y:12, action: function(npc){
                // 隐藏的食物
                if (!RPG.checkSwitch("breadTake2")){
                    RPG.startTalk(stage.talk.talk7);
                    RPG.waitTalk(function(){
                        npc.anime.setAction(1);
                        mainTeam.addItem(12, 3, true);
                        RPG.setSwitch("breadTake2", true);
                    });
                }else {
                    RPG.startTalk(stage.talk.talk6);
                }
            }},
            {
                type: "npc", img: "", x: 6, y: 13, action: function () {
                // 回到大地图
                RPG.jumpStage(script.stage05, 16, 17, 0);
            }
            },
            {
                type: "npc", img: "empty", x: 12, y: 9, row: 1, col: 1, action: function () {
                // 休息一夜
                if(!RPG.setSwitch("accept")){
                    RPG.startTalk(stage.talk.talk8);
                }else {
                    RPG.pushState(RPG.MAP_WAITING);
                    RPG.startTalk(stage.talk.talk5);
                    RPG.waitTalk(function () {
                        player.setCoordinate(9, 5, 0);
                        RPG.resetChildIndex(charaLayer);
                        RPG.nightAndDay(function () {
                            player.setCoordinate(8, 5, 0);
                            mainTeam.fullHeal();
                            RPG.popState();
                        });
                    });
                }

            }
            }
        ],
        talk: talklist3,
        choice: {
            choice1:{ img: "face7", msg: "是否同意去？",
                choise:[
                    {text:"去",action: function(){
                        RPG.closeTalk();
                        RPG.startTalk(stage.talk.talk2);
                        RPG.setSwitch("accept", true);
                        RPG.waitTalk(function(){
                            mainTeam.addItem(1, 5, true);
                        });
                    }},
                    {text:"不去",action: function(){
                        RPG.closeTalk();
                        RPG.startTalk(stage.talk.talk3);
                    }}]
            }
        }
    },
};


