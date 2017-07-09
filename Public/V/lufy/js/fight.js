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

RPG.checkFight= function(){
	var a;
	var hero1;
	// 首先检查敌人队伍人数
	a= 0;
	for (var i= 0; i< RPG.eTeam.heroList.length; i++){
		hero1= RPG.eTeam.heroList[i];
		if (hero1.alive) {
			a++;
		}
	}
	if (a== 0) {
		RPG.gameState= RPG.WIN;
		return true;
	}
	a= 0;
	for (var i= 0; i< RPG.pTeam.heroList.length; i++){
		hero1= RPG.pTeam.heroList[i];
		if (hero1.alive) {
			a++;
		}
	}
	if (a== 0) {
		RPG.gameState= RPG.LOST;
		return true;
	}
	return false;
}

// 计算经验值
RPG.calcExp= function(){
	// 原则，首先针对每个人的等级，分别计算各自获得的单人经验值
	// 然后2个人出场只能获得实际的80%，3人70%，4人60%，5人50%。
	var getExp=[];
	var hero1, hero2;
	var a, b1, b2;
	// 参考折扣率，目前最多支持5个人同时战斗
	var rateList= [1, 0.8, 0.7, 0.6, 0.5, 0.5];
	var rate= rateList[RPG.pTeam.heroList.length- 1];
	for (var j= 0; j< RPG.pTeam.heroList.length; j++){
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
}

RPG.showResult= function(){
	if (RPG.gameState==RPG.WIN) {
		// 胜利，获得经验及奖励物品
		var exp= RPG.calcExp();
		var hero1, item1;
		var text;
		var yy, xx;
		// 经验值的计算
		if (RPG.noTrophy){
			for (var j= 0; j< RPG.pTeam.heroList.length; j++){
				exp[j]= 1;
			}
		}
		// 获得经验值
		for (var j= 0; j< RPG.pTeam.heroList.length; j++){
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
			for (var j= 0; j< RPG.eTeam.itemList.length; j++){
				item1= RPG.eTeam.itemList[j];
				// 获得敌队的物品
				RPG.pTeam.addItem(item1.index, item1.num);
				// 图片
				bitmapdata = new LBitmapData(imglist["iconset"], RPG.ItemList[item1.index].pic.x*RPG.iconStep, RPG.ItemList[item1.index].pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
				bitmap = new LBitmap(bitmapdata);
				bitmap.x= xx- STEP;
				bitmap.y= yy+ j* 30;
				RPG.descLayer.addChild (bitmap);
				// 物品数量
				text = new LTextField();
				text.x = xx;
				text.y = yy+ j* 30+ 5;
				text.size = "14";
				text.color = "#FFFFFF";
				text.text = item1.num;
				RPG.descLayer.addChild(text);
			}
		}
	} else {
		// 敌人占中正面
		var hero1;
		for (var j= 0; j< RPG.eTeam.heroList.length; j++){
			hero1= RPG.eTeam.heroList[j];
			hero1.fighter.changeDir(0);
			hero1.fighter.x= RPG.menuWidth/ 2- hero1.fighter.getWidth()/ 2;
		}
	}
}

RPG.doNormalFight= function(aHero, aToHero, aAct, aAfterFunc){
	// 我方物理攻击
	var gap= 10;
	var x0, x1;
	var eff;
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
					RPG.drawData();
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
}
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
}

RPG.autoFight= function(aId){
	// 简单的顺序，我方依次先动，敌方依次再动
	var hero1, hero2;
	var a, b;
	var eff;
	if (aId>= RPG.pTeam.heroList.length+ RPG.eTeam.heroList.length){
		if (RPG.stopAuto){
			if (RPG.afterStop){
				RPG.afterStop();
			}
			return;
		} else {
			aId= 0;
		}		
	}
	RPG.currentFighter= aId;
	b= RPG.getRandomNum(1, 4);
	b= 1;
	if (aId< RPG.pTeam.heroList.length) {
		hero1= RPG.pTeam.heroList[aId];
		if (!hero1.alive){
			RPG.autoFight(aId+ 1);
			return;
		}
		switch (b) {
			case 1:	
				a= RPG.getRandomNum(0, RPG.eTeam.heroList.length);
				a= 10;
				hero2= RPG.eTeam.getAliveHero(a);
				eff= "pSword";
				// 计算攻击效果
				var ret= RPG.physicalAttack(hero1, hero2);
				hero2.beHit(ret);
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
	} else if (aId< RPG.pTeam.heroList.length+ RPG.eTeam.heroList.length) {
		hero1= RPG.eTeam.heroList[aId- RPG.pTeam.heroList.length];
		if (!hero1.alive){
			RPG.autoFight(aId+ 1);
			return;
		}
		switch (b) {
			case 1:	
				a= RPG.getRandomNum(0, RPG.pTeam.heroList.length);
				hero2= RPG.pTeam.getAliveHero(a);
				eff= "pAttack";
				if (hero2) {
					var ret= RPG.physicalAttack(hero1, hero2);
					hero2.beHit(ret);
				}
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
			//console.log("Do quick", aId);
			RPG.doQuickFight(hero1, hero2, eff, function(){RPG.autoFight(aId+ 1);});
		} else {
			//console.log("Do normal", aId);
			// 获得正确的动画显示效果
			var item1= hero1.getWeapon();
			if (item1) {
				eff= item1.atkEff;
			} else {
				eff= hero1.getPerson().atkEff;
			}
			if (!eff) {
				// 最后的默认值
				eff= "pSword";
			}
			RPG.doNormalFight(hero1, hero2, eff, function(){RPG.autoFight(aId+ 1);});
		}
	}
}

RPG.calcMaxValue= function(){
	var hero1;
	// 最大HP，用于对比显示，给一个最小的参考值
	for (var i= 0; i< RPG.eTeam.heroList.length; i++){
		hero1= RPG.eTeam.heroList[i];
		if (hero1.Hp> RPG.maxHpAll) {
			RPG.maxHpAll= hero1.Hp;
		}
		if (hero1.Mp> RPG.maxMpAll) {
			RPG.maxMpAll= hero1.Mp;
		}
	}
	for (var i= 0; i< RPG.pTeam.heroList.length; i++){
		hero1= RPG.pTeam.heroList[i];
		if (hero1.Hp> RPG.maxHpAll) {
			RPG.maxHpAll= hero1.Hp;
		}
		if (hero1.Mp> RPG.maxMpAll) {
			RPG.maxMpAll= hero1.Mp;
		}
	}
}
RPG.drawData= function(){
	// 战斗窗口基本站位
	var hero1, chara, bitmapdata;
	var gap= 10;
	var space= 50;
	var yy, yBase;
	//
	var maxShowHp= RPG.menuWidth/ 2- gap* 2;
	RPG.ctrlLayer.removeAllChild();
	yy= gap* 2;
	for (var i= 0; i< RPG.eTeam.heroList.length; i++){
		hero1= RPG.eTeam.heroList[i];
		bitmapdata = new LBitmapData(imglist[RPG.HeroList[hero1.index].chara]);
		if (hero1.getPerson().col) {
			col= hero1.getPerson().col;
		} else {
			col= 3;
		}
		chara = new RPG.Fighter(bitmapdata, 4, col);
		if (!hero1.alive){
			yy= yy+ chara.getHeight()+ 15;
			continue;
		}
		yBase= yy+ chara.getHeight();
		// HP，MP
		RPG.drawScale(RPG.ctrlLayer,"winback", gap, yBase+ 2, hero1.MaxHp/ RPG.maxHpAll* maxShowHp,5);
		RPG.drawScale(RPG.ctrlLayer,"hp", gap, yBase+ 2, hero1.Hp/ RPG.maxHpAll* maxShowHp,5);
		RPG.drawScale(RPG.ctrlLayer,"winback", gap, yBase+ 10, hero1.MaxMp/ RPG.maxMpAll* maxShowHp,5);
		RPG.drawScale(RPG.ctrlLayer,"mp", gap, yBase+ 10, hero1.Mp/ RPG.maxMpAll* maxShowHp,5);
		yy= yy+ chara.getHeight()+ 15;
	}
	for (var i= 0; i< RPG.pTeam.heroList.length; i++){
		hero1= RPG.pTeam.heroList[i];
		if (!hero1.alive){
			continue;
		}
		// HP，MP
		var x0= RPG.menuWidth- gap;
		var w1= hero1.MaxHp/ RPG.maxHpAll* maxShowHp;
		var w2= hero1.Hp/ RPG.maxHpAll* maxShowHp;
		var w3= hero1.MaxMp/ RPG.maxMpAll* maxShowHp;
		var w4= hero1.Mp/ RPG.maxMpAll* maxShowHp;
		RPG.drawScale(RPG.ctrlLayer,"winback", x0- w1, gap* 2+ space* i+ STEP+ 2, w1,5);
		RPG.drawScale(RPG.ctrlLayer,"hp", x0- w2, gap* 2+ space* i+ STEP+ 2, w2,5);
		RPG.drawScale(RPG.ctrlLayer,"winback", x0- w3, gap* 2+ space* i+ STEP+ 10, w3,5);
		RPG.drawScale(RPG.ctrlLayer,"mp", x0- w4, gap* 2+ space* i+ STEP+ 10, w4,5);
	}
}
RPG.drawFighters= function(){
	// 战斗窗口基本站位
	var hero1, chara, bitmapdata;
	var gap= 10;
	var space= 50;
	var col, row;
	var yy;
	//
	var maxShowHp= RPG.menuWidth/ 2- gap* 2;
	RPG.descLayer.removeAllChild();
	yy= gap* 2;
	for (var i= 0; i< RPG.eTeam.heroList.length; i++){
		hero1= RPG.eTeam.heroList[i];
		bitmapdata = new LBitmapData(imglist[RPG.HeroList[hero1.index].chara]);
		if (hero1.getPerson().col) {
			col= hero1.getPerson().col;
		} else {
			col= 3;
		}
		chara = new RPG.Fighter(bitmapdata, 4, col);
		if (!hero1.alive){
			yy= yy+ chara.getHeight()+ 15;
			continue;
		}
		chara.changeDir(RPG.RIGHT);
		chara.x = gap;
		chara.y = yy;
		RPG.descLayer.addChild(chara);
		hero1.fighter= chara;
		yy= yy+ chara.getHeight()+ 15;
	}
	for (var i= 0; i< RPG.pTeam.heroList.length; i++){
		hero1= RPG.pTeam.heroList[i];
		if (!hero1.alive){
			continue;
		}
		bitmapdata = new LBitmapData(imglist[RPG.HeroList[hero1.index].chara]);
		if (hero1.getPerson().col) {
			col= hero1.getPerson().col;
		} else {
			col= 3;
		}
		chara = new RPG.Fighter(bitmapdata, 4, col);
		chara.changeDir(RPG.LEFT);
		chara.x = RPG.menuWidth- STEP- gap;
		chara.y = gap* 2+ space* i;
		RPG.descLayer.addChild(chara);
		hero1.fighter= chara;
	}
}


RPG.drawActButton= function(canLeave){
	// 控制按钮
	var button01= null;
	var button02= null;
	var button03= null;
	var button04= null;
	var x0, y0;
	var gap= 10;
	var useWidth= RPG.menuWidth- gap* 2;
	x0= useWidth/ 8- RPG.iconStep* 1.5/ 2+ gap;
	y0= HEIGHT- 100;
	button01= RPG.newIconButton({x:3,y:6},{x:0,y:6},{x:1,y:6},x0,y0,1.5,"战斗",function(e){
			RPG.stopAuto= true;
			button02.setState(LButton.STATE_DISABLE);
			//button03.setState(LButton.STATE_DISABLE);
			if (!canLeave) button03.setState(LButton.STATE_DISABLE);			
			button04.setState(LButton.STATE_DISABLE);			
			RPG.fightState= 1;
			RPG.autoFight(0);
			// 首先等待自动战斗结束后，才能开启其他按钮
			button01.setState(LButton.STATE_DISABLE);
			RPG.afterStop= function() {
				button01.setState(LButton.STATE_ENABLE);
				button04.setState(LButton.STATE_ENABLE);
				button02.setState(LButton.STATE_ENABLE);
				//button03.setState(LButton.STATE_DISABLE);			
				if (!canLeave) {
					button03.setState(LButton.STATE_DISABLE);
				} else {
					button03.setState(LButton.STATE_ENABLE);
				}
				RPG.fightState= 0;
			}
	});
	talkLayer.addChild(button01);
	//
	x0= x0+ useWidth/ 4;
	button04= RPG.newIconButton({x:7,y:6},{x:0,y:6},{x:1,y:6},x0,y0,1.5,"总攻",function(e){
		// 直接完成战斗，作用在于节约时间
		RPG.quickFight= true;
		RPG.stopAuto= false;
		button01.setState(LButton.STATE_DISABLE);
		button02.setState(LButton.STATE_DISABLE);
		button03.setState(LButton.STATE_ENABLE);
		button04.setState(LButton.STATE_DISABLE);			
		RPG.fightState= 1;
		RPG.autoFight(0);
	});
	talkLayer.addChild(button04);

	RPG.finalButtonSetFunc= function() {
		button01.setState(LButton.STATE_DISABLE);
		button04.setState(LButton.STATE_DISABLE);
		button02.setState(LButton.STATE_DISABLE);
		button03.setState(LButton.STATE_ENABLE);		
	}
	//
	x0= x0+ useWidth/ 4;
	button02= RPG.newIconButton({x:4,y:6},{x:0,y:6},{x:1,y:6},x0,y0,1.5,"指挥",function(e){
		// 重新整队
		if (RPG.fightSet) {
			RPG.fightSet= false;
			button01.setState(LButton.STATE_ENABLE);
			button04.setState(LButton.STATE_ENABLE);
			button02.setState(LButton.STATE_ENABLE);
				if (!canLeave) {
					button03.setState(LButton.STATE_DISABLE);
				} else {
					button03.setState(LButton.STATE_ENABLE);
				}
			RPG.closeFormation();
		} else {
			RPG.fightSet= true;
			button01.setState(LButton.STATE_DISABLE);
			button04.setState(LButton.STATE_DISABLE);
			button02.setState(LButton.STATE_ENABLE);
			button03.setState(LButton.STATE_DISABLE);		
			RPG.setFormation();
		}
	});
	talkLayer.addChild(button02);
	//
	x0= x0+ useWidth/ 4;
	button03= RPG.newIconButton({x:6,y:6},{x:0,y:6},{x:1,y:6},x0,y0,1.5,"离开",function(e){
		// 直接获胜
		RPG.closeMenu();
	});
	//
	talkLayer.addChild(button03);
	if (!canLeave) button03.setState(LButton.STATE_DISABLE);			
}
RPG.startFight= function(eTeam, pTeam, canLeave, aNoTrophy){
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
	
	var gap= 10;
	var i;
	RPG.menuWidth= WIDTH- gap* 2;
	RPG.menuHeight= HEIGHT- gap* 2;
	var iconMenuItem;
	var iconWidth;
	var bitmapdata, bitmap;
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
	eTeam.fullHeal();
	//
	RPG.quickFight= false;
	RPG.fightState= 0;
	RPG.eTeam= eTeam;
	RPG.pTeam= pTeam;
	RPG.calcMaxValue();
	RPG.drawFighters();
	RPG.drawData();
	RPG.drawActButton(canLeave);
	//RPG.menuShowLoad();
}

// 普通战斗
RPG.simpleFight= function(aTeamId, aChar){
	var hero1= RPG.beget(RPG.HeroPlayer);
	var hero2= RPG.beget(RPG.HeroPlayer);
	RPG.extend(hero1, RPG.enemyTeam[aTeamId].getHero(0));
	RPG.extend(hero2, mainTeam.getHero(0));
	// 敌方满血
	hero1.fullHeal();
	// 攻击效果
	var a1= RPG.physicalAttack(hero1, hero2);
	var r1= a1/ hero2.Hp;
	// 被攻击效果
	var a2= RPG.physicalAttack(hero2, hero1);
	var r2= a2/ hero1.Hp;
	// 攻击力超过1倍，并无意义
	if (r2> 1) r2= 1; 
	if (hero1.Level<= hero2.Level- 3 && r2/ r1> 3) {
		// 级别差三级以上，同时首击效果相差太大，则开始逃散
		var choice1={ img: "", msg: "敌人四散奔逃，是否追击？",
	    	        choise:[
	    	        	{text:"追击（经验少且无战利品）",action: function(){
				     		RPG.closeTalk();
							RPG.pushState(RPG.FIGHT_RESULT);
							RPG.startFight(RPG.enemyTeam[aTeamId], mainTeam, true, true);
							RPG.waitMenu(function(){
								if (RPG.gameState==RPG.WIN) {
									aChar.visible= false;
									RPG.popState();
								} else if (RPG.gameState== RPG.LOST){
									RPG.drawGameOver();
								} else {
									// 不胜不败
									aChar.visible= false;
									RPG.popState();
								}
							});	
		     			}},
		     			{text:"不追击",action: function(){
				     		RPG.closeTalk();
							aChar.visible= false;
		     			}}]
		    	  };
     	RPG.makeChoise(choice1);
	} else {
		RPG.pushState(RPG.FIGHT_RESULT);
		RPG.startFight(RPG.enemyTeam[aTeamId], mainTeam, false);
		RPG.waitMenu(function(){
			if (RPG.gameState==RPG.WIN) {
				aChar.visible= false;
				RPG.popState();
			} else if (RPG.gameState== RPG.LOST){
				RPG.drawGameOver();
			} else {
				// 不胜不败
				RPG.popState();
			}
		});			
	}
}
// 巢穴战斗
RPG.denFight= function(aTeamId, aSwitch){
	RPG.pushState(RPG.FIGHT_RESULT);
	RPG.startFight(RPG.enemyTeam[aTeamId], mainTeam, true);
	RPG.waitMenu(function(){
		if (RPG.gameState==RPG.WIN) {
			RPG.setSwitch(aSwitch, true);
			RPG.popState();
		} else if (RPG.gameState== RPG.LOST){
			// 巢穴战斗失败，仍然导致结束游戏
			RPG.drawGameOver();
			// 攻击巢穴失败，不结束游戏
			// RPG.popState();
		} else {
			// 不胜不败
			RPG.popState();
		}
	});		
}
// 特定的战斗
RPG.gate1Fight= function(){
 	RPG.pushState(RPG.FIGHT_RESULT);
	RPG.startFight(RPG.enemyTeam[5], mainTeam, false);
	RPG.waitMenu(function(){
		if (RPG.gameState==RPG.WIN) {
			RPG.popState();
			RPG.setSwitch("gate1win");
   			var char1= stage.charaList["boss"];
   			char1.visible= false;
		} else if (RPG.gameState== RPG.LOST){
			// 结束游戏
			RPG.drawGameOver();
		} else {
			// 不胜不败，并不可能
			RPG.popState();
		}
	});		
}