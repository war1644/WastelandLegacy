 	// 菜单状态=============================================================
    // menuWidth = WIDTH - gap* 2;
    // menuHeight = HEIGHT - gap* 2;
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
	RPG.iconMenu= [
        {cmd: 1,name:'状态'},
        {cmd: 2,name:'物品'},
        {cmd: 3,name:'任务'},
        {cmd: 4,name:'存档'},
        {cmd: 0,name:'退出'}
	];
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
	let valueLength,
		hero1 = mainTeam.heroList[RPG.currentHeroShow],
		rightPos = 110,
		leftPos = 10,
		topPos = 10,
		gap = 10,
		item1,
        textObj,numObj;

	if (!hero1) hero1= mainTeam.heroList[0];
	RPG.menuPage= 1;
	ctrlLayer.removeAllChild();
	textObj = new LTextField();
    textObj.size = "14";
    textObj.color = "#FFF";
	let item = [
        	{text:'NAME',obj:textObj.clone()},
			{text:'FACE',obj:textObj.clone()},
			{text:'HP',obj:textObj.clone()},
			{text:'SP',obj:textObj.clone()},
			{text:'LV',obj:textObj.clone()},
			{text:'EXP',obj:textObj.clone()}
        ];
    for (let i = 0; i < item.length; i++) {
        let obj = item[i];
        switch (obj.text){
            case 'NAME':
                obj.obj.x = rightPos;
                obj.obj.y = topPos;
                obj.obj.text = hero1.nickName;
                break;
			case 'FACE':
                // 头像
                let imgData = new LBitmapData(imglist[hero1.getFace()]);
                let bitmap = new LBitmap(imgData);
                bitmap.x = leftPos;
                bitmap.y = topPos;
                ctrlLayer.addChild(bitmap);
                break;
            case 'HP':
                // hp血条
                valueLength= (menuWidth- rightPos)- gap;
                // RPG.drawScale(ctrlLayer, "winback", rightPos, 52, valueLength, 12);
                // RPG.drawScale(ctrlLayer, "#ff565c", rightPos, 50, valueLength* hero1.getHpRate(), 15);
                topPos+= 20;
                obj.obj.x = rightPos;
                obj.obj.y = topPos;
                obj.obj.text = obj.text;
                numObj = textObj.clone();
                numObj.x = rightPos;
                numObj.y = topPos+20;
                numObj.text = hero1.Hp+ " / "+ hero1.MaxHp;
                ctrlLayer.addChild(numObj);
                break;
            /*case 'SP':
                // 战车血条
                valueLength= (menuWidth- rightPos)- gap;
                // RPG.drawScale(ctrlLayer, "winback", rightPos, 92, valueLength, 12);
                RPG.drawScale(ctrlLayer, "#2b92ff", rightPos, 92, valueLength* hero1.getMpRate(), 12);
                obj.obj.x = rightPos;
                obj.obj.y = 70;
                obj.obj.text = obj.text;
                numObj = textObj.clone();
                numObj.x = rightPos;
                numObj.y = 90;
                numObj.text = hero1.Mp+ "/"+ hero1.MaxMp;
                ctrlLayer.addChild(numObj);
                break;
			 */
            case 'LV':
                obj.obj.x = leftPos;
                obj.obj.y = 110;
                obj.obj.text = obj.text;
                numObj = textObj.clone();
                numObj.x = leftPos;
                numObj.y = 130;
                numObj.text = hero1.Level;
                ctrlLayer.addChild(numObj);
                break;
            case 'EXP':
                // 经验条
                valueLength= (menuWidth- rightPos)- gap;
                // RPG.drawScale(ctrlLayer, "winback", rightPos, 132, valueLength, 12);
                // RPG.drawScale(ctrlLayer, "#28ff4e", rightPos, 130, valueLength* hero1.getExpRate(), 15);
                obj.obj.x = rightPos;
                obj.obj.y = 110;
                obj.obj.text = obj.text;
                numObj = textObj.clone();
                numObj.x = rightPos;
                numObj.y = 130;
                numObj.text = hero1.Exp+' / '+hero1.maxExp;
                ctrlLayer.addChild(numObj);
                break;
		}
        ctrlLayer.addChild(obj.obj);
    }

	// 显示持有物品 武器 防具 饰物
	let showedItems=["weapon","armor","ornament"];
	for (let i= 0; i<= 2; i++) {
		item1= RPG.ItemList[hero1[showedItems[i]]];
		if (item1) {
			// 图片
			let imgData = new LBitmapData(imglist["iconset"], item1.pic.x*RPG.iconStep, item1.pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
            let bitmap = new LBitmap(imgData);
			bitmap.x= leftPos;
			bitmap.y= 160+ i* 30;
			ctrlLayer.addChild (bitmap);
			// 物品名称
            let text = textObj.clone();
			text.x = bitmap.x + bitmap.width + 10;
			text.y = 160+ i* 30+ 5;
			text.text = item1.name;
			ctrlLayer.addChild(text);
		}
	}
};

RPG.menuShowItems = function(team) {
	RPG.menuPage= 2;
	ctrlLayer.removeAllChild();
	let i, cc=0,
	item1, hero, heroImg,
	bitmapData, bitmap, text, chara;

	text = UI.text("物品",menuWidth / 2,10,'20');
	// text.width = 200;
	// text.textAlign = "center";
	ctrlLayer.addChild(text);
	// 所有物品画在一张图片上
	let maskObj = new LSprite();
	let maskHeight = menuHeight- 144- 40; // 144= 物品使用及信息区域 + 底部按钮区域；40= 上方区域
    maskObj.graphics.drawRect(0, "#ff0000", [0, 40, menuWidth, maskHeight]);
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
    RPG.maxScrollHeight= team.itemList.length* 30- maskHeight;
    RPG.descLayer.removeAllChild();
    RPG.descLayer.x = gap;
    //RPG.descLayer.y= maskHeight+ gap* 2+ 70;
    // 保留144的空间即够用
    RPG.descLayer.y = menuHeight - 144;
    ctrlLayer.addChild(RPG.descLayer);
    // 选择高亮条
	RPG.listFocus= RPG.drawFocus(RPG.listLayer, gap, 0, menuWidth - gap* 2, 30);
    // 物品列表
	for (i= 0; i< team.itemList.length; i++){
		// 逐个显示物品
		item1= team.itemList[i];
        // 图片
		// bitmapData = new LBitmapData(imglist["iconset"], RPG.ItemList[item1.index].pic.x*RPG.iconStep, RPG.ItemList[item1.index].pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
		// bitmap = new LBitmap(bitmapData);
		// bitmap.x= gap* 2;
		// bitmap.y= i* 30+ gap;
		// RPG.listLayer.addChild (bitmap);
		// 物品名称
		text = UI.text(RPG.ItemList[item1.index].name,gap* 2+ 30,i* 30+ gap+ 5);
		RPG.listLayer.addChild(text);

        let num = text.clone();
		// 物品数量
		num.x = 180;
		num.text = item1.num;
		RPG.listLayer.addChild(num);
	}
	if (RPG.chooseItem>= 0) {
		RPG.menuShowOneItem(RPG.chooseItem);
	} else {
		RPG.menuShowOneItem(0);
	}
};

RPG.menuShowOneItem= function(id) {
	 let gap= 10,item1, text;
	// 详细信息
	RPG.descLayer.removeAllChild();
	// 显示单一物品详细信息
	if (id>=mainTeam.itemList.length) {
		id= mainTeam.itemList.length- 1;
	}
	item1= mainTeam.itemList[id];
	if (item1){
		// 图片
		// 列表中增加选中背景贴图
		RPG.listFocus.x = gap;
		RPG.listFocus.y = id* 30+ 5;
		// 详细描述
		text = UI.text(RPG.ItemList[item1.index].description,gap* 2,gap+ 5);
		// text.width= menuWidth- gap* 8;
		text.setWordWrap(true, 20);
		RPG.descLayer.addChild(text);
	}
};

// 拖动物品栏的物品
RPG.dragItemBegin= function(ax, ay, aId){
	let item1,
		iconbitmapdata, iconbitmap,
		text, i;

    // 详细信息
	RPG.descLayer.removeAllChild();
	// 显示单一物品详细信息
	item1= mainTeam.itemList[aId].getItemDesc();
	//
	text = UI.text(''.description,gap* 2,5);
	switch (item1.kind){
		case 1:
            text.text = item1.name+ "装配：";
            break;
        case 2:
            text.text = item1.name+ "使用：";
            break;
        case 3:
            text.text = item1.name+ "不可使用。";
            break;
	}
	RPG.descLayer.addChild(text);
	if (item1.kind!==3) {
		// 显示姓名
		RPG.nameText = text.clone();
		RPG.nameText.x = text.x+ text.getWidth()+ gap;
		RPG.nameText.text = "";
		RPG.descLayer.addChild(RPG.nameText);
		RPG.chooseHero= -1;
		let cc= (menuWidth- gap* 2)/ mainTeam.heroList.length;
		RPG.showItemEffectLabel.length= 0;
		for (i=0; i< mainTeam.heroList.length; i++){
			let hero= mainTeam.heroList[i];
			let heroImg= HeroList[hero.index].img;
			let bitmapData = new LBitmapData(imglist[heroImg]);
			let chara = new Fighter(bitmapData,4,4);
			// 测试物品效果的英雄
			let hero2= RPG.beget(HeroPlayer);
			RPG.extend(hero2, hero);
			// 
			chara.x = cc* i+ cc/ 2- STEP/ 2;
			chara.y = gap* 2+ 5;
			// 根据物品的属性，增加相应属性值的显示
			// 
			if (item1.kind===1) {
				// 装备类，显示现有的装配物
				let tempItem;
                switch (item1.type){
                    case 1:
                        tempItem= hero.weapon;
                        break;
                    case 2:
                        tempItem= hero.armor;
                        break;
                    case 3:
                        tempItem= hero.ornament;
                        break;
                }

			} else if (item1.kind=== 2 || item1.kind=== 4) {
				// 使用类，显示对应的值
				let text1 = text.clone();
				text1.x = chara.x+ STEP/ 2;
				text1.y = chara.y+ STEP+ 5;
				text1.textAlign= "center";
				if (item1.type=== 1) {
					text1.text = "HP="+ hero.Hp;
				} else if (item1.type=== 2) {
					text1.text = "MP="+ hero.Mp;
				}
				RPG.descLayer.addChild(text1);
				// 预计使用效果
				item1.effect(hero2);
				let text2 = text1.clone();
				if (item1.type=== 1) {
					text2.text = "HP="+ hero2.Hp;
				} else if (item1.type=== 2) {
					text2.text = "MP="+ hero2.Mp;					
				}
				if (text2.text=== text.text) {
					text2.color = "#FFFFFF";
				} else {
					text2.color = "#00FFFF";
				}
				text2.visible= false;
				RPG.descLayer.addChild(text2);
				RPG.showItemEffectLabel.push(text2);
				RPG.showItemEffectLabel.push(text);
			}
			RPG.descLayer.addChild(chara);
		}
		RPG.chooseItem= aId;
	} else {
		RPG.nameText= null;
		RPG.chooseItem= -1;
	}

	// 图标作为拖动物
	// let bitmapData = new LBitmapData(imglist["iconset"], RPG.ItemList[item1.index].pic.x*RPG.iconStep, RPG.ItemList[item1.index].pic.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
	// RPG.dragingItem = new LBitmap(bitmapData);
    RPG.dragingItem = text.clone();
    RPG.dragingItem.text = item1.name;
	RPG.dragingItem.x= ax- RPG.descLayer.x;
	RPG.dragingItem.y= ay- RPG.descLayer.y;
	RPG.dragingItem.scaleX= 2;
	RPG.dragingItem.scaleY= 2;
	RPG.descLayer.addChild(RPG.dragingItem);
	RPG.isItemDraging= true;
};
// 显示物品使用效果
RPG.showLabel= function(aId) {
	for (let i= 0; i< RPG.showItemEffectLabel.length; i++) {
		if(((i/2)<<0) === i/2){
			RPG.showItemEffectLabel[i].visible= false;
		} else {
			RPG.showItemEffectLabel[i].visible= true;
		}
	}
    if (aId>= 0 && RPG.showItemEffectLabel.length> 0) {
		RPG.showItemEffectLabel[aId* 2].visible = true;
		RPG.showItemEffectLabel[aId* 2 + 1].visible = false;
    }
};
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
};

RPG.menuShowTasks= function() {
	RPG.menuPage= 3;
	ctrlLayer.removeAllChild();
};

RPG.menuShowSave= function(aResetFocus) {
	RPG.menuPage= 4;
	ctrlLayer.removeAllChild();
    let text = UI.text("保存进度",menuWidth/ 2,10,'20');
    // text.width= 200;
    // text.textAlign= "center";
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
		RPG.listFocus= RPG.drawFocus(RPG.listLayer, gap, 0, menuWidth- gap* 2, 30);
		RPG.saveSlot= 0;
	} else {
		RPG.listFocus= RPG.drawFocus(RPG.listLayer, gap, RPG.listFocus.y, menuWidth- gap* 2, 30);
	}

	for (let i= 0; i< RPG.MaxSaveSlot; i++){
		// 物品名称
		text = UI.text(RPG.showSaveSlot(i),gap* 2,i* 30+ 5);
		RPG.listLayer.addChild(text);
	}
    let button01= RPG.newButton(90, 30, gap* 2, menuHeight- 85, "回到标题", function(e){
		Menu.closeMenu();
    	RPG.drawCover();
    });
    ctrlLayer.addChild(button01);
    ctrlLayer.addChild(RPG.newButton(90, 30, menuWidth- gap* 2- 90, menuHeight- 85, "保存进度", function(e){
		RPG.saveGame(RPG.saveSlot);
		RPG.menuShowSave(false);
    }));
};

RPG.menuShowLoad= function() {
	RPG.menuPage= 5;
	ctrlLayer.removeAllChild();
	let text = UI.text("载入进度",menuWidth/ 2,10,'20');
	// text.width= 200;
	// text.textAlign= "center";
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
	RPG.listFocus= RPG.drawFocus(RPG.listLayer, gap, 0, menuWidth- gap* 2, 30);
	RPG.saveSlot= 0;
    // 
	for (let i= 0; i< RPG.MaxSaveSlot; i++){
		// 物品名称
		text = UI.text(RPG.showSaveSlot(i),gap* 2,i* 30+ 5);
		RPG.listLayer.addChild(text);
	}
	// 空白按钮图片
   let button01= RPG.newButton(90, 30, gap* 2, menuHeight- 60, "载入进度", function(e){
		Menu.closeMenu();
		RPG.loadGame(RPG.saveSlot);
    });
    ctrlLayer.addChild(button01);
	// 空白按钮图片
    ctrlLayer.addChild(RPG.newButton(90, 30, menuWidth- gap* 2- 90, menuHeight- 60, "返回", function(e){
		Menu.closeMenu();
    }));
};
// 从标题画面，打开载入进度菜单
RPG.openLoadMenu= function() {
	// 切换状态
	RPG.pushState(RPG.COVER_MENU);
	//将对话层清空
	talkLayer.removeAllChild();
	//当对话开始，且按照顺序进行对话
	//对话背景
	talkLayer.x = 10;
	talkLayer.y = 10;
	UI.drawBorderWindow(talkLayer, 0, 0, menuWidth, menuHeight);
	// 子菜单层
	ctrlLayer = new LSprite();
	talkLayer.addChild(ctrlLayer);
	RPG.menuShowLoad();
};

// 游戏进行中，打开主菜单
RPG.openMenu= function() {
	//切换状态
	RPG.pushState(RPG.IN_MENU);
	//将对话层清空
	talkLayer.removeAllChild();
	let menusDown=40;
	let tmpMenuWidth = menuWidth / RPG.iconMenu.length;
	//对话背景
	talkLayer.x = 10;
	talkLayer.y = 10;
	UI.drawBorderWindow(talkLayer, 0, 0, menuWidth, menuHeight);

	for (let i=0; i< RPG.iconMenu.length; i++) {
		let obj = RPG.iconMenu[i];
        let text = new LTextField();
        obj.x = text.x = (tmpMenuWidth*i + menusDown/2 - gap)<<0 ;
        obj.y = text.y = (menuHeight - gap - menusDown)<<0;
        text.text = obj.name;
        text.color = '#fff';
        obj.textObj = text;
        talkLayer.addChild(text);
        //默认选中状态页
        if (i===0){
            //绘制选中
            obj.borderObj = RPG.drawBorder(talkLayer,text.x,text.y,text.getWidth()+5,text.getHeight()+5);
		}
	}
	// 子菜单层
	ctrlLayer = new LSprite();
	talkLayer.addChild(ctrlLayer);
	RPG.currentHeroShow= 0;
	RPG.menuShowState();
};


let Menu = {
    waitMenu:(callback)=>{
        if (RPG.checkState(RPG.UNDER_WINDOWS)) {
            setTimeout(function(){Menu.waitMenu(callback)}, 500);
        } else {
            if (callback)  callback();
        }
    },

    closeMenu:()=>{
        // 切换状态
        RPG.popState();
        //将对话层清空
        talkLayer.removeAllChild();
        RPG.cmdChoose = -1;
        // 这个动作，是为了屏蔽鼠标抬起事件
        isKeyDown= false;
    },
};



RPG.dealMenu= function(ax, ay){
    // 根据点击位置，判断移动方向
    ax = ax- talkLayer.x;
    ay = ay- talkLayer.y;

    let	iconMenuItem;
	RPG.cmdChoose= -1;
    let len = RPG.iconMenu.length;
	for (let i=0; i < len; i++){
		iconMenuItem = RPG.iconMenu[i];
        if(ax > iconMenuItem.x &&
			ax < iconMenuItem.x + STEP &&
			ay > iconMenuItem.y &&
			ay < iconMenuItem.y + STEP){
        	if(RPG.cmdChoose === i) return;
			RPG.cmdChoose = i;
			break;
		}
	}

    if (RPG.cmdChoose >= 0){
    	let index = RPG.iconMenu[RPG.cmdChoose];
		for (let i=0; i < len; i++){
			iconMenuItem = RPG.iconMenu[i];
			if (i===RPG.cmdChoose) {
                //绘制选中
                iconMenuItem.borderObj = RPG.drawBorder(talkLayer,index.x,index.y,index.textObj.getWidth()+5,index.textObj.getHeight()+5);
			} else {
                if(iconMenuItem.borderObj) talkLayer.removeChild(iconMenuItem.borderObj);
			}
		}
		switch (index.cmd){
			case 0:
                Menu.closeMenu();
                break;
            case 1:
                RPG.menuShowState();
                break;
            case 2:
                RPG.menuShowItems(mainTeam);
                break;
            case 3:
                RPG.menuShowTasks();
                break;
            case 4:
                RPG.menuShowSave(true);
                break;
		}
	}
	// 点击的时候记录鼠标位置
	RPG.MouseX= ax;
	RPG.MouseY= ay;
	let cc,hero1;
	// 分页处理
	switch (RPG.menuPage){
        case 1:
            // 长按卸下装备
            RPG.dragTimer= setTimeout(function(){
                cc= ((ay- 160)/ 40)<<0;
                hero1 = mainTeam.heroList[RPG.currentHeroShow];
                switch (cc) {
                    case 0:
                        mainTeam.addItem(hero1.changeWeapon(-1), 1);
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
            break;
		case 2:
            // 拉动物品条，以及长按使用物品
            RPG.listLayer_Y= RPG.listLayer.y;
            cc = ((ay- RPG.listLayer.y)/ 30)<<0;
            if (cc>= 0 && cc< mainTeam.itemList.length && ay< RPG.descLayer.y) {
                RPG.menuShowOneItem(cc);
                RPG.dragTimer= setTimeout(function(){RPG.dragItemBegin(ax- 20, ay- 20, cc);}, 500);
            }
			break;
        case 4:
        case 5:
            // 选择存档槽
            cc = ((ay- RPG.listLayer.y)/30)<<0;
            //console.log(cc);
            if (cc>= 0 && cc< 8) {
                RPG.listFocus.y= cc* 30;
                RPG.saveSlot= cc;
            }
            break;
	}
};
RPG.dealMenuMove= function(ax, ay){
	if (isKeyDown){
	    ax= ax- talkLayer.x-20;
    	ay= ay- talkLayer.y-20;
        if (RPG.menuPage===2){
			// 物品窗口
			if (RPG.isItemDraging){
                RPG.dragingItem.x = ax - RPG.descLayer.x;
                RPG.dragingItem.y = ay - RPG.descLayer.y;
				// 动态选择人物
				if (RPG.nameText) {
					// 可以选人的状态
					let cc= (ax/ (menuWidth/ mainTeam.heroList.length))<<0;
					if (cc>=0 && cc<mainTeam.heroList.length && ay> RPG.descLayer.y) {
						RPG.nameText.text= HeroList[mainTeam.heroList[cc].index].name;
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
				let delta= ay- RPG.MouseY;
				let a = RPG.listLayer_Y+ delta;
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
		} else if (RPG.menuPage===1) {
			// 状态窗口，左右切换选人
			let delta= ax- RPG.MouseX;
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
};
RPG.dealMenuUp= function(ax, ay){
	if (RPG.menuPage===2 || RPG.menuPage===1){
		clearTimeout(RPG.dragTimer);
		if (RPG.isItemDraging){
			RPG.dropItem();
		}
	}
};
