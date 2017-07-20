// 战斗状态：0=暂停中；1=自动进行中
RPG.fightState= 0;
// 战斗队，敌方，玩家方
RPG.eTeam;
RPG.pTeam;
// 效果集合
RPG.effectList=[];
//  战斗过程控制
RPG.stopAuto= false;
RPG.afterStop= null;   /// func
RPG.quickFight= false;
RPG.finalButtonSetFunc= null;
RPG.currentFighter;  // 当前正在动作的对象
// 最大HP，用于对比显示，给一个最小的参考值，一场战斗一旦确定则不再改变
RPG.maxHpAll= 1000;
RPG.maxMpAll= 100;
// 战斗胜负标记
RPG.WIN= 1;
RPG.LOST= 2;
RPG.FIGHTING= 3;
RPG.gameState;
// 战斗结果控制
RPG.noTrophy= false;
let gameMenus = ['背包','乘降','强度','存档','任务','返回'];
let fightMenus = ['攻击','阵形','道具','防御','逃跑','总攻'];


RPG.checkFight= function(){
	let a;
	let hero1;
	// 首先检查敌人队伍人数
	a= 0;
	for (let i= 0; i< RPG.eTeam.heroList.length; i++){
		hero1= RPG.eTeam.heroList[i];
		if (hero1.alive) {
			a++;
		}
	}
	if (a=== 0) {
		RPG.gameState= RPG.WIN;
		return true;
	}
	a= 0;
	for (let i= 0; i< RPG.pTeam.heroList.length; i++){
		hero1= RPG.pTeam.heroList[i];
		if (hero1.alive) {
			a++;
		}
	}
	if (a=== 0) {
		RPG.gameState= RPG.LOST;
		return true;
	}
	return false;
};

// 计算经验值
RPG.calcExp= function(){
	// 原则，首先针对每个人的等级，分别计算各自获得的单人经验值
	// 然后2个人出场只能获得实际的80%，3人70%，4人60%，5人50%。
	let getExp=[];
	let hero1, hero2;
	let a, b1, b2;
	// 参考折扣率，目前最多支持5个人同时战斗
	let rateList= [1, 0.8, 0.7, 0.6, 0.5, 0.5];
	let rate= rateList[RPG.pTeam.heroList.length- 1];
	for (let j= 0; j< RPG.pTeam.heroList.length; j++){
		hero1= RPG.pTeam.heroList[j];
		a= 0;
		for (var i= 0; i< RPG.eTeam.heroList.length; i++){
			hero2= RPG.eTeam.heroList[i];
			// 基本经验
			b1= (hero2.Level- hero1.Level+ 3)* 2;
			if (b1> 16) {
				b1= 16;
			} else if (b1< 0) {
				b1= 0;
			}
			// 奖励经验
			if (hero2.Level> hero1.Level){
				b2= 32;
			} else {
				b2= 64/ (hero1.Level- hero2.Level+ 2);
			}
			a= a+ b1;
			if (i== 0) {
				// 第一敌人，有额外的奖励经验
				a= a+ b2;
			}
		}
		if (!hero1.alive) {
			// 战场阵亡，经验减半
			a= a/ 2;
		}
		// 根据人数打折扣
		a= a* rate;
		getExp.push(Math.floor(a));
	}
	return getExp;
};

RPG.showResult= function(){
	if (RPG.gameState===RPG.WIN) {
		// 胜利，获得经验及奖励物品
		let exp= RPG.calcExp();
		let hero1, item1;
		let text;
		let yy, xx;
		// 经验值的计算
		if (RPG.noTrophy){
			for (let j= 0; j< RPG.pTeam.heroList.length; j++){
				exp[j]= 1;
			}
		}
		// 获得经验值
		for (let j= 0; j< RPG.pTeam.heroList.length; j++){
			hero1= RPG.pTeam.heroList[j];
			// 增加经验，及判断升级
			hero1.addExp(exp[j]);
			// 人物转正面
			//if (hero1.fighter.changeDir) {
			hero1.fighter.changeDir(0);
			// 阵亡将士显示
			if (!hero1.alive) {
				hero1.fighter.visible= true;
				hero1.fighter.alpha= 0.3;
			}
			//}
			hero1.fighter.x= RPG.menuWidth/ 2- STEP/ 2;
			// 显示获得的经验值
			text = new LTextField();
			text.x = hero1.fighter.x+ 40;
			text.y = hero1.fighter.y+ 5;
			text.size = "14";
			text.color = "#FFFFFF";
			text.text = "Exp "+ exp[j]+ "↑";
			RPG.descLayer.addChild(text);
			yy= hero1.fighter.y;
		}
		yy= yy+ STEP+ 20;
		xx= RPG.menuWidth/ 2;
		// 获得物品
		if (RPG.noTrophy){
			// 无战利品
		} else {
			for (let j= 0; j< RPG.eTeam.itemList.length; j++){
				item1= RPG.eTeam.itemList[j];
				// 获得敌队的物品
				RPG.pTeam.addItem(item1.index, item1.num);
				// 图片
				let bitmapData = new LBitmapData(imglist["iconset"], RPG.ItemList[item1.index].pic.x*RPG.iconStep, RPG.ItemList[item1.index].pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
                let bitmap = new LBitmap(bitmapData);
				bitmap.x= xx- STEP;
				bitmap.y= yy+ j* 30;
				RPG.descLayer.addChild (bitmap);
				// 物品数量
				text = new LTextField();
				text.x = xx;
				text.y = yy+ j* 30+ 5;
				text.size = "14";
				text.color = "#FFF";
				text.text = item1.num;
				RPG.descLayer.addChild(text);
			}
		}
	} else {
		// 敌人占中正面
		let hero1;
		for (let j= 0; j< RPG.eTeam.heroList.length; j++){
			hero1 = RPG.eTeam.heroList[j];
			hero1.fighter.changeDir(0);
			hero1.fighter.x= RPG.menuWidth/ 2- hero1.fighter.getWidth()/ 2;
		}
	}
};
/**
 * 开始攻击动作
 * */
RPG.doNormalFight= function(aHero, aToHero, aAct, aAfterFunc){
	// 我方物理攻击
	// var gap= 10;
	let x0, x1,eff;
	eff= RPG.loadEffect(aAct);
	if (aHero.fighter.x> RPG.menuWidth/ 2) {
		x0= aHero.fighter.x;
		x1= RPG.menuWidth/ 2+ gap;
	} else {
		x0= aHero.fighter.x;
		x1= RPG.menuWidth/ 2- gap- RPG.STEP;		
	}
	// 人物前进
	LTweenLite.to(aHero.fighter,0.3,
		{scaleX:1,scaleY:1,alpha:1,x:x1,ease:Circ.easeOut,
			onComplete:function(){
				//console.log("a");
				//aHero.fighter.x= x1;
				if (aToHero) {
					eff.x= aToHero.fighter.x+ (aToHero.fighter.getWidth()- eff.getWidth())/ 2;
					eff.y= aToHero.fighter.y+ (aToHero.fighter.getHeight()- eff.getHeight())/ 2;
				} else {
					eff.x= -100;
				}
				RPG.descLayer.addChild(eff);
				eff.play(1, function(){
					// 刷新数据
					//console.log("b");
					//RPG.drawData();
					if (aToHero && !aToHero.alive) {
						aToHero.fighter.visible= false;
					}
					// 动画效果消失
					RPG.descLayer.removeChild(eff);
					LTweenLite.to(aHero.fighter,0.5,
						{scaleX:1,scaleY:1,alpha:1,x:x0,ease:Circ.easeOut,
							onComplete:function(){
								//console.log("c");
								// 然后判断胜负
								if (RPG.checkFight()) {
									// 无论输赢，都不再继续
									RPG.showResult();
									RPG.finalButtonSetFunc();
									//RPG.closeMenu();
									return;
								}
								// 下一个
								if (aAfterFunc) {
									aAfterFunc();
								}
							}
						}
					)
				});
			}
		}
	)
};
// 快速战斗
RPG.doQuickFight= function(aHero, aToHero, aAct, aAfterFunc){
	// 只进行胜负检查
	if (RPG.checkFight()) {
		// 无论输赢，都不再继续
		RPG.drawFighters();
		RPG.drawData();
		RPG.showResult();
		RPG.finalButtonSetFunc();
		//RPG.closeMenu();
		return;
	}
	// 下一个
	if (aAfterFunc) {
		aAfterFunc();
	}
};

//绘制攻击中的特效动画
RPG.autoFight = function(heroId){
	// 简单的顺序，我方依次先动，敌方依次再动
	let hero1, hero2;
	let a, b;
	let eff;
	if (heroId >= (RPG.pTeam.heroList.length + RPG.eTeam.heroList.length)){
		if (RPG.stopAuto){
			if (RPG.afterStop){
				RPG.afterStop();
			}
			return;
		} else {
			heroId= 0;
		}		
	}
	RPG.currentFighter = heroId;
	b = RPG.getRandomNum(1, RPG.eTeam.heroList.length);
	// b= 1;
	if (heroId< RPG.pTeam.heroList.length) {
		hero1= RPG.pTeam.heroList[heroId];
		if (!hero1.alive){
			RPG.autoFight(heroId+ 1);
			return;
		}
		switch (b) {
			case 1:	
				a= RPG.getRandomNum(0, RPG.eTeam.heroList.length);
				a= 10;
				hero2= RPG.eTeam.getAliveHero(a);
				trace(hero1.getName()+'攻击'+hero2.getName())
				eff= "pSword";
				// 计算攻击效果
				let ret= RPG.physicalAttack(hero1, hero2);
				hero2.beHit(ret);
				trace(hero2.getName()+'损伤'+ret)
				break;
			case 2:	
				a= RPG.getRandomNum(0, RPG.eTeam.heroList.length);
				hero2= RPG.eTeam.getAliveHero(a);
				eff= "mAttack";
				break;
			case 3:	
				a= RPG.getRandomNum(0, RPG.pTeam.heroList.length);
				hero2= RPG.eTeam.getAliveHero(a);
				eff= "heal1";
				break;
		}
	} else if (heroId< RPG.pTeam.heroList.length+ RPG.eTeam.heroList.length) {
		hero1= RPG.eTeam.heroList[heroId- RPG.pTeam.heroList.length];
		if (!hero1.alive){
			RPG.autoFight(heroId+ 1);
			return;
		}
		switch (b) {
			case 1:	
				a= RPG.getRandomNum(0, RPG.pTeam.heroList.length);
				hero2= RPG.pTeam.getAliveHero(a);
				trace(hero1.getName()+'攻击'+hero2.getName())
				eff= "pAttack";
				if (hero2) {
					let ret= RPG.physicalAttack(hero1, hero2);
					hero2.beHit(ret);
				}
				trace(hero2.getName()+'损伤'+ret)
				break;
			case 2:	
				a= RPG.getRandomNum(0, RPG.pTeam.heroList.length);
				hero2= RPG.pTeam.getAliveHero(a);
				eff= "mAttack";
				break;
			case 3:	
				a= RPG.getRandomNum(0, RPG.pTeam.heroList.length);
				hero2= RPG.pTeam.getAliveHero(a);
				eff= "heal1";
				break;
		}
	}
	if (hero1){
		if (RPG.quickFight) {
			//console.log("Do quick", heroId);
			RPG.doQuickFight(hero1, hero2, eff, function(){RPG.autoFight(heroId+ 1);});
		} else {
			console.log("Do normal", heroId);
			// 获得正确的动画显示效果
			// let item1= hero1.getWeapon();
			// if (item1) {
			// 	eff= item1.atkEff;
			// } else {
				eff= hero1.getPerson().atkEff;
			// }
			if (!eff) {
				// 最后的默认值
				eff= "pSword";
			}
			RPG.doNormalFight(hero1, hero2, eff, function(){RPG.autoFight(heroId+ 1);});
		}
	}
};

RPG.calcMaxValue= function(){
	let hero1;
	// 最大HP，用于对比显示，给一个最小的参考值
	for (let i= 0; i < RPG.eTeam.heroList.length; i++){
		hero1= RPG.eTeam.heroList[i];
		if (hero1.Hp> RPG.maxHpAll) {
			RPG.maxHpAll= hero1.Hp;
		}
		if (hero1.Mp> RPG.maxMpAll) {
			RPG.maxMpAll= hero1.Mp;
		}
	}
	for (let i= 0; i< RPG.pTeam.heroList.length; i++){
		hero1= RPG.pTeam.heroList[i];
		if (hero1.Hp> RPG.maxHpAll) {
			RPG.maxHpAll= hero1.Hp;
		}
		if (hero1.Mp> RPG.maxMpAll) {
			RPG.maxMpAll= hero1.Mp;
		}
	}
};
RPG.drawData= function(){
	// 战斗窗口基本站位
	let hero1, chara, bitmapdata;
	let gap= 10;
	let space= 50;
	let yy, yBase,col;
	// let maxShowHp= RPG.menuWidth/ 2- gap* 2;
	RPG.ctrlLayer.removeAllChild();
	yy= gap* 2;
	for (let i= 0; i< RPG.eTeam.heroList.length; i++){
		hero1= RPG.eTeam.heroList[i];
		bitmapdata = new LBitmapData(imglist[RPG.HeroList[hero1.index].chara]);
		if (hero1.getPerson().col) {
			col= hero1.getPerson().col;
		} else {
			col= 4;
		}
		chara = new RPG.Fighter(bitmapdata, 4, col);
		if (!hero1.alive){
			yy= yy+ chara.getHeight()+ 15;
			continue;
		}
		yBase= yy+ chara.getHeight();
		// enemy HP
		// RPG.drawScale(RPG.ctrlLayer,"#f11", gap, yBase+ 2, hero1.Hp/ RPG.maxHpAll* maxShowHp,5);
        let text = new LTextField();
        text.text = hero1.Hp;
        text.size = '12px';
        text.color = '#fff';
        text.textAlign= "center";
        text.width = 30;
        text.x = gap*2;
        text.y = yBase;
        RPG.ctrlLayer.addChild(text);
		yy= yy+ chara.getHeight()+ 15;
	}
	for (let i= 0; i< RPG.pTeam.heroList.length; i++){
		hero1= RPG.pTeam.heroList[i];
		if (!hero1.alive){
			continue;
		}
		// HP
		// let x0= RPG.menuWidth- gap;
        // let w2= hero1.Hp/ RPG.maxHpAll* maxShowHp;
		let tmpY = gap* 2+ space* i+ STEP+ 2;
        // RPG.drawScale(RPG.ctrlLayer,"#f11", x0- w2,tmpY , w2,5);
        let text = new LTextField();
        text.text = hero1.Hp;
        text.size = '12px';
        text.color = '#fff';
        text.textAlign= "center";
        text.width = 30;
        text.x = WIDTH-text.width-gap;
        text.y = tmpY;
        RPG.ctrlLayer.addChild(text);
	}
};

/**
 * 绘制战场
 **/
RPG.drawFighters= function(){
	// 战斗窗口基本站位
	let hero1, chara, bitmapData,space= 50,col,x,y,team,hpText;
	//
	// let maxShowHp= RPG.menuWidth/ 2- gap* 2;
	RPG.descLayer.removeAllChild();
    let text = new LTextField();
    text.size = '12px';
    text.color = '#fff';
    text.textAlign= "center";
    text.width = 40;
	//绘制敌我两队到战场
    for (let j = 0; j < 2; j++) {
        team = j ? RPG.pTeam.heroList : RPG.eTeam.heroList;
        dir = j ? RPG.LEFT : RPG.RIGHT;
        x = j ? RPG.menuWidth - STEP - gap : gap;
        y = gap * 2;
        for (let i= 0; i< team.length; i++){
            hero1 = team[i];
            bitmapData = new LBitmapData(imglist[RPG.HeroList[hero1.index].chara]);
            col = hero1.getPerson().col || 4;
            chara = new RPG.Fighter(bitmapData, 4, col);
            if (!hero1.alive){
                y = y + chara.getHeight() + 30;
                continue;
            }
            chara.changeDir(dir);
            chara.x = x;
            chara.y = y;
            RPG.descLayer.addChild(chara);

            hero1.fighter = chara;
            y = y + chara.getHeight() + 30;

            hpText = text.clone();
            hpText.text = hero1.Hp;
            hpText.x = x;
            hpText.y = y-20;
            RPG.descLayer.addChild(hpText);
        }

    }

	// for (let i= 0; i< RPG.pTeam.heroList.length; i++){
	// 	hero1= RPG.pTeam.heroList[i];
	// 	if (!hero1.alive){
	// 		continue;
	// 	}
	// 	bitmapData = new LBitmapData(imglist[RPG.HeroList[hero1.index].chara]);
     //    col = hero1.getPerson().col || 4;
	// 	chara = new RPG.Fighter(bitmapData, 4, col);
	// 	chara.changeDir(RPG.LEFT);
	// 	chara.x = RPG.menuWidth- STEP- gap;
	// 	chara.y = gap* 2+ space* i;
	// 	RPG.descLayer.addChild(chara);
	// 	hero1.fighter= chara;
	// }
};

/**
 * 绘制战场菜单
 *
 **/
RPG.drawActButton= function(canLeave){
	// 控制按钮
	let attackButton= null;
	let exitButton= null;
	let x0, y0;
	let useWidth= RPG.menuWidth- gap* 2;
	x0= useWidth/ 8- RPG.iconStep* 1.5/ 2+ gap;
	y0= HEIGHT- 100;
    RPG.finalButtonSetFunc= function() {
        attackButton.setState(LButton.STATE_DISABLE);
        exitButton.setState(LButton.STATE_ENABLE);
    };
	attackButton = fightBtn(x0,y0,"攻击",function(e){
			RPG.stopAuto= true;
        	exitButton.setState(LButton.STATE_DISABLE);
			RPG.fightState = 1;
			RPG.autoFight(0);
			// 首先等待自动战斗结束后，才能开启其他按钮
			attackButton.setState(LButton.STATE_DISABLE);
			RPG.afterStop = function() {
				attackButton.setState(LButton.STATE_ENABLE);
				exitButton.setState(LButton.STATE_ENABLE);
				RPG.fightState= 0;
			}
	});
	talkLayer.addChild(attackButton);
	x0= x0+ useWidth/ 4;
	exitButton= fightBtn(x0,y0,"逃跑",function(e){
		// 直接获胜
		RPG.closeMenu();
	});
	talkLayer.addChild(exitButton);
};


RPG.startFight = function(enemyTeam, playerTeam, canLeave, aNoTrophy){
	//	设置控制状态
	RPG.pushState(RPG.IN_FIGHTING);
	// 设置战斗状态
	RPG.gameState= RPG.FIGHTING;
	if (aNoTrophy) {
		RPG.noTrophy= true;
	} else {
		RPG.noTrophy= false;		
	}
	//将对话层清空
	talkLayer.removeAllChild();
	// 进入即不可再开菜单了
	clearTimeout(timer);
	//当对话开始，且按照顺序进行对话
	isKeyDown= false;
	
	let gap= 10;
	RPG.menuWidth= WIDTH- gap* 2;
	RPG.menuHeight= HEIGHT- gap* 2;
	//对话背景
	talkLayer.x = 10;
	talkLayer.y = 10;
	RPG.drawWindow(talkLayer, 0, 0, RPG.menuWidth, RPG.menuHeight);
	// 子菜单层
	if (!RPG.descLayer) {
		RPG.descLayer = new LSprite();
	}
	RPG.descLayer.removeAllChild();
    RPG.descLayer.x= 0;
    RPG.descLayer.y= 0;
	talkLayer.addChild(RPG.descLayer);
	RPG.ctrlLayer = new LSprite();
	talkLayer.addChild(RPG.ctrlLayer);
	// 敌人队全满参战
	enemyTeam.fullHeal();
	RPG.quickFight= false;
	RPG.fightState= 0;
	RPG.eTeam= enemyTeam;
	RPG.pTeam= playerTeam;
	RPG.calcMaxValue();
	RPG.drawFighters();
	// RPG.drawData();
	RPG.drawActButton(canLeave);
	//RPG.menuShowLoad();
};

// 普通战斗
RPG.simpleFight= function(teamId, npc={}){
	let enemyHero= RPG.beget(RPG.HeroPlayer);
	let playerHero= RPG.beget(RPG.HeroPlayer);
	RPG.extend(enemyHero, RPG.enemyTeam[teamId].getHero(0));
	RPG.extend(playerHero, mainTeam.getHero(0));
	// 敌方满血
	enemyHero.fullHeal();
    // 被攻击预算
    let a1= RPG.physicalAttack(enemyHero, playerHero);
	let r1= a1/ playerHero.Hp;
    // 攻击预算
	let a2 = RPG.physicalAttack(playerHero, enemyHero);
	let r2 = a2 / enemyHero.Hp;
	// 攻击力超过敌人血量，秒杀并无意义
	if (r2 > 1) r2 = 1;
	if ((playerHero.Level-enemyHero.Level) >= 3 && r2/r1> 3) {
		// 级别差三级以上，同时首击效果相差太大，则开始逃散
		let choice1={ img: "", msg: "敌人四散奔逃，是否追击？",
	    	        choise:[
	    	        	{text:"追击（经验少且无战利品）",action: function(){
				     		RPG.closeTalk();
							RPG.pushState(RPG.FIGHT_RESULT);
							RPG.startFight(RPG.enemyTeam[teamId], mainTeam, true, true);
							RPG.waitMenu(function(){
								if (RPG.gameState===RPG.WIN) {
									// npc.visible= false;
									RPG.popState();
								} else if (RPG.gameState=== RPG.LOST){
									RPG.drawGameOver();
								} else {
									// 不胜不败
									// npc.visible= false;
									RPG.popState();
								}
							});	
		     			}},
		     			{text:"不追击",action: function(){
				     		RPG.closeTalk();
							// npc.visible= false;
		     			}}]
		    	  };
     	RPG.makeChoise(choice1);
	} else {
		RPG.pushState(RPG.FIGHT_RESULT);
		RPG.startFight(RPG.enemyTeam[teamId], mainTeam, false);
		RPG.waitMenu(function(){
			if (RPG.gameState===RPG.WIN) {
				// npc.visible= false;
				RPG.popState();
			} else if (RPG.gameState=== RPG.LOST){
				RPG.drawGameOver();
			} else {
				// 不胜不败
				RPG.popState();
			}
		});			
	}
};
// 巢穴战斗
RPG.denFight= function(aTeamId, aSwitch){
	RPG.pushState(RPG.FIGHT_RESULT);
	RPG.startFight(RPG.enemyTeam[aTeamId], mainTeam, true);
	RPG.waitMenu(function(){
		if (RPG.gameState===RPG.WIN) {
			RPG.setSwitch(aSwitch, true);
			RPG.popState();
		} else if (RPG.gameState=== RPG.LOST){
			// 巢穴战斗失败，仍然导致结束游戏
			RPG.drawGameOver();
			// 攻击巢穴失败，不结束游戏
			// RPG.popState();
		} else {
			// 不胜不败
			RPG.popState();
		}
	});		
};
// 特定的战斗
RPG.gate1Fight= function(){
 	RPG.pushState(RPG.FIGHT_RESULT);
	RPG.startFight(RPG.enemyTeam[5], mainTeam, false);
	RPG.waitMenu(function(){
		if (RPG.gameState==RPG.WIN) {
			RPG.popState();
			RPG.setSwitch("gate1win");
   			let char1= stage.charaList["boss"];
   			char1.visible= false;
		} else if (RPG.gameState== RPG.LOST){
			// 结束游戏
			RPG.drawGameOver();
		} else {
			// 不胜不败，并不可能
			RPG.popState();
		}
	});		
};