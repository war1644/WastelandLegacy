 	// 菜单状态=============================================================
	RPG.menuWidth;
	RPG.menuHeight;
	RPG.cmdChoose;
 	// 记录
 	RPG.MouseX= 0;
 	RPG.MouseY= 0;
 	// 菜单中的分页指示
 	RPG.menuPage= 1;
 	// 物品显示参数位置
 	RPG.listLayer=null;
 	RPG.listLayer_Y= 0;           // 原始位置
 	RPG.maxScrollHeight= 0;
 	RPG.listFocus= null;            // 选中的列表项后面的高亮区
 	// 所有菜单的列表
	RPG.iconMenu= [];
	RPG.iconStep= 24;
	RPG.largeIconScale= 1.3;
	// 物品菜单的拖拽控制
	RPG.dragTimer={};
	RPG.dragingItem= {};
	RPG.nameText= null;
	RPG.chooseItem= -1;
	RPG.chooseHero= -1;
	// 存档相关
	RPG.saveSlot= 0;
	// 当前显示的主队成员
	RPG.currentHeroShow= 0;
	// 用于辅助物品使用的显示
	RPG.showItemEffectLabel= [];

RPG.menuShowState= function() {
	//对话人物名称
	var valueLength;
	var hero1= mainTeam.heroList[RPG.currentHeroShow];
	var rightPos= 110;
	var leftPos= 10;
	var topPos= 10;
	var gap= 10;
	var item1;

	if (!hero1){
		hero1= mainTeam.heroList[0];
	}
	// 姓名
	RPG.menuPage= 1;
	ctrlLayer.removeAllChild();
	var name = new LTextField();
	name.x = rightPos;
	name.y = topPos;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = hero1.getName();
	ctrlLayer.addChild(name);
	// 头像
	bitmapdata = new LBitmapData(imglist[hero1.getFace()]);
	bitmap = new LBitmap(bitmapdata);
	bitmap.x = leftPos;
	bitmap.y = topPos;
	ctrlLayer.addChild(bitmap);
	// hp
	// 血条
	valueLength= (RPG.menuWidth- rightPos)- gap;
	RPG.drawScale(ctrlLayer, "winback", rightPos, 52, valueLength, 12);
	RPG.drawScale(ctrlLayer, "hp", rightPos, 52, valueLength* hero1.getHpRate(), 12);
	// 文字
	topPos+= 20;
	var name = new LTextField();
	name.x = rightPos;
	name.y = topPos;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = "[" + "HP" + "]";
	ctrlLayer.addChild(name);
	topPos+= 20;
	var name = new LTextField();
	name.x = rightPos;
	name.y = topPos;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = hero1.Hp+ "/"+ hero1.MaxHp;
	ctrlLayer.addChild(name);
	// mp
	// 法条
	valueLength= (RPG.menuWidth- rightPos)- gap;
	RPG.drawScale(ctrlLayer, "winback", rightPos, 92, valueLength, 12);
	RPG.drawScale(ctrlLayer, "mp", rightPos, 92, valueLength* hero1.getMpRate(), 12);
	var name = new LTextField();
	name.x = rightPos;
	name.y = 70;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = "[" + "MP" + "]";
	ctrlLayer.addChild(name);
	var name = new LTextField();
	name.x = rightPos;
	name.y = 90;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = hero1.Mp+ "/"+ hero1.MaxMp;
	ctrlLayer.addChild(name);
	// 等级
	var name = new LTextField();
	name.x = leftPos;
	name.y = 110;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = "[" + "等级" + "]";
	ctrlLayer.addChild(name);
	var name = new LTextField();
	name.x = leftPos;
	name.y = 130;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = hero1.Level;
	ctrlLayer.addChild(name);
	// 经验
	// 条
	valueLength= (RPG.menuWidth- rightPos)- gap;
	RPG.drawScale(ctrlLayer, "winback", rightPos, 132, valueLength, 12);
	RPG.drawScale(ctrlLayer, "exp", rightPos, 132, valueLength* hero1.getExpRate(), 12);
	var name = new LTextField();
	name.x = rightPos;
	name.y = 110;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = "[" + "经验" + "]";
	ctrlLayer.addChild(name);
	var name = new LTextField();
	name.x = rightPos;
	name.y = 130;
	name.size = "14";
	name.color = "#FFFFFF";
	name.text = hero1.Exp;
	ctrlLayer.addChild(name);
	// 显示持有物品
	var showedItems=["weapon","armor","ornament"];
	for (var i= 0; i<= 2; i++) {
		item1= RPG.ItemList[hero1[showedItems[i]]];
		if (item1) {
			// 图片
			bitmapdata = new LBitmapData(imglist["iconset"], item1.pic.x*RPG.iconStep, item1.pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
			bitmap = new LBitmap(bitmapdata);
			bitmap.x= leftPos;
			bitmap.y= 160+ i* 40;
			ctrlLayer.addChild (bitmap);
			// 物品名称
			text = new LTextField();
			text.x = bitmap.x+ bitmap.width+ 10;
			text.y = 160+ i* 40+ 5;
			text.size = "14";
			text.color = "#FFFFFF";
			text.text = item1.name;
			ctrlLayer.addChild(text);
		}
	}
}

RPG.menuShowItems= function(aTeam) {
	RPG.menuPage= 2;
	ctrlLayer.removeAllChild();
	var i, cc=0;
	var gap= 10;
	var item1, hero, heroImg;
	var bitmapdata, bitmap, text, chara;

	var text = new LTextField();
	text.x = RPG.menuWidth/ 2;
	text.y = 10;
	text.width= 200;
	text.textAlign= "center";
	text.size = "20";
	text.color = "#FFFFFF";
	text.text = "物品";
	ctrlLayer.addChild(text);
	// 所有物品画在一张图片上
	var maskObj = new LSprite();
	var maskHeight= RPG.menuHeight- 144- 40; // 144= 物品使用及信息区域 + 底部按钮区域；40= 上方区域
    maskObj.graphics.drawRect(0, "#ff0000", [0, 40, RPG.menuWidth, maskHeight]);
    if (!RPG.listLayer) {
    	RPG.listLayer= new LSprite();
    	RPG.listLayer.x= 0;
    	RPG.listLayer.y= 40;
    } else {
    	RPG.listLayer.removeAllChild();
    }
    RPG.listLayer.mask = maskObj;
    ctrlLayer.addChild(RPG.listLayer);
    //ctrlLayer.addChild(maskObj);
    RPG.maxScrollHeight= aTeam.itemList.length* 30- maskHeight;
    if (!RPG.descLayer){
		RPG.descLayer = new LSprite();
	}
	RPG.descLayer.removeAllChild();
    RPG.descLayer.x= gap;
    //RPG.descLayer.y= maskHeight+ gap* 2+ 70;
    // 保留144的空间即够用
    RPG.descLayer.y= RPG.menuHeight- 144;
    ctrlLayer.addChild(RPG.descLayer);
    // 选择高亮条
	RPG.listFocus= RPG.drawFocus(RPG.listLayer, gap, 0, RPG.menuWidth- gap* 2, 30);
    // 物品列表
	for (i= 0; i< aTeam.itemList.length; i++){
		// 逐个显示物品
		item1= aTeam.itemList[i];
		// 图片
		bitmapdata = new LBitmapData(imglist["iconset"], RPG.ItemList[item1.index].pic.x*RPG.iconStep, RPG.ItemList[item1.index].pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
		bitmap = new LBitmap(bitmapdata);
		bitmap.x= gap* 2;
		bitmap.y= i* 30+ gap;
		RPG.listLayer.addChild (bitmap);
		// 物品名称
		text = new LTextField();
		text.x = gap* 2+ 30;
		text.y = i* 30+ gap+ 5;
		text.size = "14";
		text.color = "#FFFFFF";
		text.text = RPG.ItemList[item1.index].name;
		RPG.listLayer.addChild(text);
		// 物品数量
		text = new LTextField();
		text.x = 180;
		text.y = i* 30+ gap+ 5;
		text.size = "14";
		text.color = "#FFFFFF";
		text.text = item1.num;
		RPG.listLayer.addChild(text);
	}
	if (RPG.chooseItem>= 0) {
		RPG.menuShowOneItem(RPG.chooseItem);
	} else {
		RPG.menuShowOneItem(0);
	}
}

RPG.menuShowOneItem= function(aId) {
	var i, cc=0;
	var gap= 10;
	var item1, hero, heroImg;
	var bitmapdata, bitmap, text, chara;
	// 详细信息
	RPG.descLayer.removeAllChild();
	// 显示单一物品详细信息
	if (aId>=mainTeam.itemList.length) {
		aId= mainTeam.itemList.length- 1;
	}
	item1= mainTeam.itemList[aId];
	if (item1){
		// 图片
		// 列表中增加选中背景贴图
		RPG.listFocus.x= gap;
		RPG.listFocus.y= aId* 30+ 5;
		// 详细描述
		text = new LTextField();
		text.x = gap* 2;
		text.y = gap+ 5;
		text.size = "14";
		text.color = "#FFFFFF";
		text.text = RPG.ItemList[item1.index].desc;
		text.width= RPG.menuWidth- gap* 8;
		text.setWordWrap(true, 20)
		RPG.descLayer.addChild(text);
	}
}

// 拖动物品栏的物品
RPG.dragItemBegin= function(ax, ay, aId){
	var item1
	var iconbitmapdata, iconbitmap;
	var text, i;
	var gap= 10;
	// 详细信息
	RPG.descLayer.removeAllChild();
	// 显示单一物品详细信息
	item1= mainTeam.itemList[aId].getItemDesc();
	//
	text = new LTextField();
	text.x = gap* 2;
	text.y = 5;
	text.size = "14";
	text.color = "#FFFFFF";
	if (item1.kind==1) {
		text.text = item1.name+ "装配：";
	} else if (item1.kind==2 || item1.kind==4) {
		text.text = item1.name+ "使用：";
	} else if (item1.kind==3) {
		text.text = item1.name+ "不可使用。";
	}
	RPG.descLayer.addChild(text);
			//*
	if (item1.kind!=3) {
		// 显示姓名
		RPG.nameText = new LTextField();
		RPG.nameText.x = text.x+ text.getWidth()+ gap;
		RPG.nameText.y = 5;
		RPG.nameText.size = "14";
		RPG.nameText.color = "#FFFFFF";
		RPG.nameText.text = "";
		RPG.descLayer.addChild(RPG.nameText);
		RPG.chooseHero= -1;
					//
		var cc= (RPG.menuWidth- gap* 2)/ mainTeam.heroList.length;
		RPG.showItemEffectLabel.length= 0;
		for (i=0; i< mainTeam.heroList.length; i++){
			var hero= mainTeam.heroList[i];
			var heroImg= RPG.HeroList[hero.index].chara;
			var bitmapdata = new LBitmapData(imglist[heroImg]);
			var chara = new RPG.Fighter(bitmapdata,4,3);
			// 测试物品效果的英雄
			var hero2= RPG.beget(RPG.HeroPlayer);
			RPG.extend(hero2, hero);
			// 
			chara.x = cc* i+ cc/ 2- STEP/ 2;
			chara.y = gap* 2+ 5;
			// 根据物品的属性，增加相应属性值的显示
			// 
			if (item1.kind==1) {
				// 装配类，显示现有的装配物
				var tempItem;
				if (item1.type== 1) {
					tempItem= hero.weapon;
				} else if (item1.type== 2) {
					tempItem= hero.armor;
				} else if (item1.type== 3) {
					tempItem= hero.ornament;
				}
				if (tempItem>= 0) {
					iconbitmapdata = new LBitmapData(imglist["iconset"], RPG.ItemList[tempItem].pic.x*RPG.iconStep, RPG.ItemList[tempItem].pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
					iconbitmap = new LBitmap(iconbitmapdata);
					iconbitmap.x= chara.x+ (6);
					iconbitmap.y= chara.y+ STEP+ 5;
					RPG.descLayer.addChild (iconbitmap);
				}
			} else if (item1.kind== 2 || item1.kind== 4) {
				// 使用类，显示对应的值
				var text = new LTextField();
				text.x = chara.x+ STEP/ 2;
				text.y = chara.y+ STEP+ 5;
				text.size = "14";
				text.color = "#FFFFFF";
				text.textAlign= "center";
				if (item1.type== 1) {
					text.text = "HP="+ hero.Hp;
				} else if (item1.type== 2) {
					text.text = "MP="+ hero.Mp;					
				}
				RPG.descLayer.addChild(text);
				// 预计使用效果
				item1.effect(hero2);
				var text2 = new LTextField();
				text2.x = text.x;
				text2.y = text.y;
				text2.size = "14";
				text2.textAlign= "center";
				if (item1.type== 1) {
					text2.text = "HP="+ hero2.Hp;
				} else if (item1.type== 2) {
					text2.text = "MP="+ hero2.Mp;					
				}
				if (text2.text== text.text) {
					text2.color = "#FFFFFF";
				} else {
					text2.color = "#00FFFF";
				}
				text2.visible= false;
				RPG.descLayer.addChild(text2);
				RPG.showItemEffectLabel.push(text2);
				RPG.showItemEffectLabel.push(text);
			}
			//chara.anime.setAction(0);
			RPG.descLayer.addChild(chara);
		}
		RPG.chooseItem= aId;
	} else {
		RPG.nameText= null;
		RPG.chooseItem= -1;
	}
	//*/

	// 图标作为拖动物
	bitmapdata = new LBitmapData(imglist["iconset"], RPG.ItemList[item1.index].pic.x*RPG.iconStep, RPG.ItemList[item1.index].pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
	RPG.dragingItem = new LBitmap(bitmapdata);
	RPG.dragingItem.x= ax- RPG.descLayer.x;
	RPG.dragingItem.y= ay- RPG.descLayer.y;
	RPG.dragingItem.scaleX= 3;
	RPG.dragingItem.scaleY= 3;
	RPG.descLayer.addChild(RPG.dragingItem);
	RPG.isItemDraging= true;
}
// 显示物品使用效果
RPG.showLabel= function(aId) {
	for (var i= 0; i< RPG.showItemEffectLabel.length; i++) {
		if (Math.floor(i/2)== i/ 2){
			RPG.showItemEffectLabel[i].visible= false;
		} else {
			RPG.showItemEffectLabel[i].visible= true;
		}
	}
	if (aId>= 0 && RPG.showItemEffectLabel.length> 0) {
		RPG.showItemEffectLabel[aId* 2].visible= true;
		RPG.showItemEffectLabel[aId* 2+ 1].visible= false;
	}
}
RPG.dropItem= function(){
	RPG.descLayer.removeAllChild();
	RPG.isItemDraging= false;
	if (RPG.chooseItem>= 0){
		if (RPG.chooseHero>= 0){
			// 物品装配或使用
			mainTeam.removeItem(RPG.chooseHero, RPG.chooseItem, 1);
			RPG.menuShowItems(mainTeam);
		}
	}
}

RPG.menuShowTasks= function() {
	RPG.menuPage= 3;
	ctrlLayer.removeAllChild();
}

RPG.menuShowSave= function(aResetFocus) {
	RPG.menuPage= 4;
	var gap= 10;
	ctrlLayer.removeAllChild();
	//
	var text = new LTextField();
	text.x = RPG.menuWidth/ 2;
	text.y = 10;
	text.width= 200;
	text.textAlign= "center";
	text.size = "20";
	text.color = "#FFFFFF";
	text.text = "保存进度";
	ctrlLayer.addChild(text);
	// 可用存档槽
    if (!RPG.listLayer) {
    	RPG.listLayer= new LSprite();
    } else {
    	RPG.listLayer.removeAllChild();
    }
   	RPG.listLayer.x= 0;
   	RPG.listLayer.y= 40;
    ctrlLayer.addChild(RPG.listLayer);
    RPG.listLayer.mask = null;
    // 选择高亮条
    if (aResetFocus) {
		RPG.listFocus= RPG.drawFocus(RPG.listLayer, gap, 0, RPG.menuWidth- gap* 2, 30);
		RPG.saveSlot= 0;
	} else {
		RPG.listFocus= RPG.drawFocus(RPG.listLayer, gap, RPG.listFocus.y, RPG.menuWidth- gap* 2, 30);		
	}
    // 
	for (i= 0; i< RPG.MaxSaveSlot; i++){
		// 物品名称
		text = new LTextField();
		text.x = gap* 2;
		text.y = i* 30+ 5;
		text.size = "14";
		text.color = "#FFFFFF";
		text.text = RPG.showSaveSlot(i);
		RPG.listLayer.addChild(text);
	}
    var button01= RPG.newButton(90, 30, gap* 2, RPG.menuHeight- 85, "回到标题", function(e){
		RPG.closeMenu();
    	RPG.drawCover();
    });
    ctrlLayer.addChild(button01);
    ctrlLayer.addChild(RPG.newButton(90, 30, RPG.menuWidth- gap* 2- 90, RPG.menuHeight- 85, "保存进度", function(e){
		RPG.saveGame(RPG.saveSlot);
		RPG.menuShowSave(false);
    }));
}

RPG.menuShowLoad= function() {
	RPG.menuPage= 5;
	var gap= 10;
	ctrlLayer.removeAllChild();
	//
	var text = new LTextField();
	text.x = RPG.menuWidth/ 2;
	text.y = 10;
	text.width= 200;
	text.textAlign= "center";
	text.size = "20";
	text.color = "#FFFFFF";
	text.text = "载入进度";
	ctrlLayer.addChild(text);
	// 可用存档槽
    if (!RPG.listLayer) {
    	RPG.listLayer= new LSprite();
    } else {
    	RPG.listLayer.removeAllChild();
    }
   	RPG.listLayer.x= 0;
   	RPG.listLayer.y= 40;
    ctrlLayer.addChild(RPG.listLayer);
    RPG.listLayer.mask = null;
    // 选择高亮条
	RPG.listFocus= RPG.drawFocus(RPG.listLayer, gap, 0, RPG.menuWidth- gap* 2, 30);
	RPG.saveSlot= 0;
    // 
	for (i= 0; i< RPG.MaxSaveSlot; i++){
		// 物品名称
		text = new LTextField();
		text.x = gap* 2;
		text.y = i* 30+ 5;
		text.size = "14";
		text.color = "#FFFFFF";
		text.text = RPG.showSaveSlot(i);
		RPG.listLayer.addChild(text);
	}
	// 空白按钮图片
   var button01= RPG.newButton(90, 30, gap* 2, RPG.menuHeight- 60, "载入进度", function(e){
		RPG.closeMenu();
		RPG.loadGame(RPG.saveSlot);
    });
    ctrlLayer.addChild(button01);
	// 空白按钮图片
    ctrlLayer.addChild(RPG.newButton(90, 30, RPG.menuWidth- gap* 2- 90, RPG.menuHeight- 60, "返回", function(e){
		RPG.closeMenu();
    }));
}
// 从标题画面，打开载入进度菜单
RPG.openLoadMenu= function() {
	// 切换状态
	RPG.pushState(RPG.COVER_MENU);
	//将对话层清空
	talkLayer.removeAllChild();
	//当对话开始，且按照顺序进行对话
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
	ctrlLayer = new LSprite();
	talkLayer.addChild(ctrlLayer);
	RPG.menuShowLoad();
}

// 游戏进行中，打开主菜单
RPG.openMenu= function() {
	// 切换状态
	RPG.pushState(RPG.IN_MENU);
	//将对话层清空
	talkLayer.removeAllChild();
	//当对话开始，且按照顺序进行对话
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
	// 菜单底部功能选项
	// iconset 为24*24
	RPG.iconMenu.length= 0;
	RPG.iconMenu.push({x:9, y:8, cmd: 1});
	RPG.iconMenu.push({x:0, y:9, cmd: 2});
	//RPG.iconMenu.push({x:5, y:9, cmd: 3});
	RPG.iconMenu.push({x:14, y:9, cmd: 4});
	RPG.iconMenu.push({x:15, y:8, cmd: 0});
	iconWidth= RPG.menuWidth/ RPG.iconMenu.length;
	for (i=0; i< RPG.iconMenu.length; i++) {
		iconMenuItem= RPG.iconMenu[i];
		bitmapdata = new LBitmapData(imglist["iconset"], iconMenuItem.x*RPG.iconStep, iconMenuItem.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
		bitmap = new LBitmap(bitmapdata);
		if (i==0){
			bitmap.scaleX= RPG.largeIconScale;
			bitmap.scaleY= RPG.largeIconScale;
			bitmap.alpha= 1;
		} else {
			bitmap.alpha= 0.5;
		}
		iconMenuItem.ox= iconWidth* i+ (iconWidth)/ 2;
		iconMenuItem.oy= RPG.menuHeight- gap- RPG.iconStep;
		bitmap.x= iconMenuItem.ox- RPG.iconStep* bitmap.scaleX/ 2;
		bitmap.y= iconMenuItem.oy- RPG.iconStep* bitmap.scaleY/ 2;
		iconMenuItem.bmp= bitmap;
		//console.log(iconMenuItem);
		talkLayer.addChild(bitmap);
	}
	// 子菜单层
	ctrlLayer = new LSprite();
	talkLayer.addChild(ctrlLayer);
	RPG.currentHeroShow= 0;
	RPG.menuShowState();
}

RPG.closeMenu= function() {
	// 切换状态
	RPG.popState();
	//将对话层清空
	talkLayer.removeAllChild();
	RPG.iconMenu.length= 0;
	RPG.cmdChoose= -1;
	// 这个动作，是为了屏蔽鼠标抬起事件
	isKeyDown= false;
}

RPG.waitMenu= function (aCallBack){ 
	if (RPG.checkState(RPG.UNDER_WINDOWS)) { 
		setTimeout(function(){RPG.waitMenu(aCallBack);}, 100);
	} else {
		if (aCallBack) {
			aCallBack();
		}
	}
} 

RPG.dealMenu= function(ax, ay){
    // 根据点击位置，判断移动方向
    ax= ax- talkLayer.x;
    ay= ay- talkLayer.y;
	var	iconMenuItem;
	var checkStep= STEP/ 2;
	RPG.cmdChoose= -1;
	for (i=0; i< RPG.iconMenu.length; i++){
		iconMenuItem= RPG.iconMenu[i];
		if (ax> iconMenuItem.ox- checkStep && ax< iconMenuItem.ox+ checkStep &&
			ay> iconMenuItem.oy- checkStep && ay< iconMenuItem.oy+ checkStep) {
			RPG.cmdChoose= i;
			break;
		}
	}
	if (RPG.cmdChoose>= 0){
		for (i=0; i< RPG.iconMenu.length; i++){
			iconMenuItem= RPG.iconMenu[i];
			if (i==RPG.cmdChoose) {
				iconMenuItem.bmp.scaleX= RPG.largeIconScale;
				iconMenuItem.bmp.scaleY= RPG.largeIconScale;
				iconMenuItem.bmp.x= iconMenuItem.ox- RPG.iconStep* RPG.largeIconScale/ 2;
				iconMenuItem.bmp.y= iconMenuItem.oy- RPG.iconStep* RPG.largeIconScale/ 2;
				iconMenuItem.bmp.alpha= 1;
			} else {
				iconMenuItem.bmp.scaleX= 1.0;
				iconMenuItem.bmp.scaleY= 1.0;
				iconMenuItem.bmp.x= iconMenuItem.ox- RPG.iconStep/ 2;
				iconMenuItem.bmp.y= iconMenuItem.oy- RPG.iconStep/ 2;
 				iconMenuItem.bmp.alpha= 0.5;
			}
			//console.log(iconMenuItem.bmp);
		}		
		if (RPG.iconMenu[RPG.cmdChoose].cmd==0){
			setTimeout(RPG.closeMenu, 100);
		}else if (RPG.iconMenu[RPG.cmdChoose].cmd==1){
			RPG.menuShowState();
		}else if (RPG.iconMenu[RPG.cmdChoose].cmd==2){
			RPG.menuShowItems(mainTeam);
		}else if (RPG.iconMenu[RPG.cmdChoose].cmd==3){
			RPG.menuShowTasks();
		}else if (RPG.iconMenu[RPG.cmdChoose].cmd==4){
			RPG.menuShowSave(true);
		}
	}
	// 点击的时候记录鼠标位置
	RPG.MouseX= ax;
	RPG.MouseY= ay;
	// 分页处理
	if (RPG.menuPage==2){
		// 拉动物品条，以及长按使用物品
		//console.log(ax, ay);
		RPG.listLayer_Y= RPG.listLayer.y;
		var cc= Math.floor((ay- RPG.listLayer.y)/ 30);
		//RPG.
		//if (ax> RPG.listLayer.x && ax< RPG.listLayer.)
		//console.log(cc);
		if (cc>= 0 && cc< mainTeam.itemList.length && ay< RPG.descLayer.y) {
			RPG.menuShowOneItem(cc);
       		RPG.dragTimer= setTimeout(function(){RPG.dragItemBegin(ax- 90, ay- 90, cc);}, 500);
       	}
	} else if (RPG.menuPage==1){
		// 长按卸下装备
		RPG.dragTimer= setTimeout(function(){
			var cc= Math.floor((ay- 160)/ 40);
			var hero1= mainTeam.heroList[RPG.currentHeroShow];
			switch (cc) {
				case 0: 
					mainTeam.addItem(hero1.changeWeopen(-1), 1);
					RPG.menuShowState();
					break;
				case 1: 
					mainTeam.addItem(hero1.changeArmor(-1), 1);
					RPG.menuShowState();
					break;
				case 2: 
					mainTeam.addItem(hero1.changeOrn(-1), 1);
					RPG.menuShowState();
					break;
			}
		}, 500);
	} else if (RPG.menuPage==4 || RPG.menuPage==5){
		// 选择存档槽
		var cc= Math.floor((ay- RPG.listLayer.y)/ 30);
		//console.log(cc);
		if (cc>= 0 && cc< 8) {
			RPG.listFocus.y= cc* 30;
			RPG.saveSlot= cc;
       	}
	}
}
RPG.dealMenuMove= function(ax, ay){
	if (isKeyDown){
	    ax= ax- talkLayer.x;
    	ay= ay- talkLayer.y;
		if (RPG.menuPage==2){
			// 物品窗口
			if (RPG.isItemDraging){
				RPG.dragingItem.x= ax- RPG.descLayer.x- RPG.dragingItem.scaleX* RPG.dragingItem.width/ 2;
				RPG.dragingItem.y= ay- RPG.descLayer.y- RPG.dragingItem.scaleY* RPG.dragingItem.height/ 2;
				// 动态选择人物
				if (RPG.nameText) {
					// 可以选人的状态
					var cc= Math.floor(ax/ (RPG.menuWidth/ mainTeam.heroList.length));
					if (cc>=0 && cc<mainTeam.heroList.length && ay> RPG.descLayer.y) {
						RPG.nameText.text= RPG.HeroList[mainTeam.heroList[cc].index].name;
						RPG.chooseHero= cc;
						RPG.showLabel(cc);
						// 同时显示可能会出现的值的变化
						//console.log(RPG.nameText.text);
					} else {
						RPG.nameText.text= "";
						RPG.chooseHero= -1;	
						RPG.showLabel(-1);
					}
				}
			} else {
				var delta= ay- RPG.MouseY;
				var a = RPG.listLayer_Y+ delta;
				if (a<= 40 && RPG.maxScrollHeight> 0) {
					if (a< -RPG.maxScrollHeight+ 40) {
						RPG.listLayer.y= -RPG.maxScrollHeight+ 40;
					} else {
						RPG.listLayer.y= a;
					}
				} else {
					RPG.listLayer.y= 40;
				}
				if (delta> 5 || delta< -5) {
					clearTimeout(RPG.dragTimer);
				}
			}
		} else if (RPG.menuPage==1) {
			// 状态窗口，左右切换选人
				var delta= ax- RPG.MouseX;
				if (delta> 100) {
					RPG.currentHeroShow++;
					if (RPG.currentHeroShow>= mainTeam.heroList.length) {
						RPG.currentHeroShow= 0;
					}
					RPG.MouseX= ax;
					RPG.MouseY= ay;
					RPG.menuShowState();
					clearTimeout(RPG.dragTimer);
				} else if (delta< -100) {
					RPG.currentHeroShow--;
					if (RPG.currentHeroShow< 0) {
						RPG.currentHeroShow= mainTeam.heroList.length- 1;
					}
					RPG.MouseX= ax;
					RPG.MouseY= ay;
					RPG.menuShowState();
					clearTimeout(RPG.dragTimer);
				}
		}
	}
}
RPG.dealMenuUp= function(ax, ay){
	if (RPG.menuPage==2 || RPG.menuPage==1){
		clearTimeout(RPG.dragTimer);
		if (RPG.isItemDraging){
			RPG.dropItem();
		}
	}
}
