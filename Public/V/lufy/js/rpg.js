// 全局标记参数
var RPG = {};
// based on https://github.com/documentcloud/underscore/blob/bf657be243a075b5e72acc8a83e6f12a564d8f55/underscore.js#L767
RPG.extend = function ( obj, source ) {
	// ECMAScript5 compatibility based on: http://www.nczonline.net/blog/2012/12/11/are-your-mixins-ecmascript-5-compatible/
	if ( Object.keys ) {
		var keys = Object.keys( source );
		for (var i = 0, il = keys.length; i < il; i++) {
			var prop = keys[i];
			Object.defineProperty( obj, prop, Object.getOwnPropertyDescriptor( source, prop ) );
		}
	} else {
		var safeHasOwnProperty = {}.hasOwnProperty;
		for ( var prop in source ) {
			if ( safeHasOwnProperty.call( source, prop ) ) {
				obj[prop] = source[prop];
			}
		}
	}
	return obj;
};

// beget继承方法
RPG.beget= function(o){
	var F= function(){};
	F.prototype= o;
	var G= new F();
	if (G.init) {
		G.init();
	}
	return G;
}
// RPG基本管理参数，根据不同项目，应当调整

	//方向常量
	RPG.DOWN = 0;
	RPG.LEFT = 1;
	RPG.RIGHT = 2;
	RPG.UP = 3;
	// 地图单位
	RPG.STEP = 32;
	RPG.ctrState= 0;
	/**层变量*/
	//显示进度条所用层
	RPG.loadingLayer;
	//游戏底层
	RPG.backLayer;
	//地图层
	RPG.mapLayer;
	//人物层
	RPG.charaLayer;
	//效果层
	RPG.effectLayer;
	//对话层（及菜单，战斗）
	RPG.talkLayer;
	//子菜单层（多个菜单页）
	RPG.ctrlLayer;
	RPG.descLayer;
	// 状态控制===========================================================
	// 状态变量
	RPG.state;
	// 状态栈
	RPG.stateStack=[];
	// 单值状态值
	RPG.IN_COVER= 0;           // 封面
	RPG.COVER_MENU= 1;         // 封面载入菜单
	RPG.MAP_CONTROL= 2;        // 正常控制
	RPG.MAP_WAITING= 3;        // 等待NPC移动，不可控制
	RPG.IN_MENU= 4;            // 菜单中
	RPG.IN_FIGHTING= 5;        // 在战斗菜单中
	RPG.IN_TALKING= 6;         // 对话状态中
	RPG.IN_CHOOSING= 7;        // 选择状态中
	RPG.IN_HELP= 8;            // 在帮助窗口下
	RPG.IN_OVER= 9;            // 在结束状态下
	RPG.FIGHT_RESULT= 10;      // 检查战斗结果（防止战斗异常重入）
	// 组合状态，100以上
	RPG.UNDER_MAP= 101;        // 地图下，包括地图控制和地图等待
	RPG.UNDER_MENU= 102;       // 菜单下，包括主菜单和载入菜单
	RPG.UNDER_WINDOWS= 103;       // 各种窗口下，包括主菜单、载入菜单、战斗系统
	RPG.stateList={101:[RPG.MAP_CONTROL,RPG.MAP_WAITING], 
					102:[RPG.IN_MENU,RPG.COVER_MENU], 
					103:[RPG.IN_MENU,RPG.COVER_MENU,RPG.IN_FIGHTING]};
 	// 流程控制==============================================
 	// 内置开关量
 	RPG.SWITCH={};
 	// 敌人战斗队数据集合
	RPG.enemyTeam=[];
 	//======================================================================
 	// 按钮管理
 	RPG.currentButton= null;
	// ==========================================================
RPG.setState= function(aState){
	//PG.state= aState;
	RPG.stateStack.length= 0;
	RPG.pushState(aState);
}
RPG.pushState= function(aState){
	RPG.stateStack.push(aState);
	RPG.state= aState;
	//console.log("push", RPG.state, RPG.stateStack);
}
RPG.popState= function(){
	RPG.stateStack.pop();
	RPG.state= RPG.stateStack[RPG.stateStack.length- 1];
	//console.log("pop", RPG.state, RPG.stateStack);
}
RPG.checkState= function(aState){
	if (aState< 50) {
		if (RPG.state== aState){
			return true;
		} else {
			return false;
		}
	} else {
		var stateSet= RPG.stateList[aState];
		if (stateSet){
			for (var i= 0; i< stateSet.length; i++) {
				if (RPG.state== stateSet[i]){
					return true;
				}
			}
			return false;
		} else {
			return false;
		}

	}
}

RPG.initSwitch= function(aNum){
	RPG.SWITCH={};
}
RPG.setSwitch= function(aName, aValue){
	if (!aValue) aValue= true;
	RPG.SWITCH[aName]= aValue;
}
RPG.checkSwitch= function(aName){
	if(RPG.SWITCH[aName]) {
		return Boolean(RPG.SWITCH[aName]);
	} else {
		return false;
	}
}

RPG.layerInit= function() {
	backLayer = new LSprite();
	addChild(backLayer);
		//地图层添加
		mapLayer = new LSprite();
		backLayer.addChild(mapLayer);
		//人物层添加
		charaLayer = new LSprite();
		backLayer.addChild(charaLayer);
		//上地图层添加
		upLayer = new LSprite();
		backLayer.addChild(upLayer);
		//效果层添加
		effectLayer = new LSprite();
		backLayer.addChild(effectLayer);
		//菜单层添加
		talkLayer = new LSprite();
		backLayer.addChild(talkLayer);
}

RPG.drawWindow= function(aLayer, ax, ay, aw, ah, aPha) {
	bitmapdata = new LBitmapData(imglist["winback"]);
	bitmap = new LBitmap(bitmapdata);
	bitmap.scaleX = aw/ bitmap.width;
	bitmap.scaleY = ah/ bitmap.height;
	bitmap.x = ax;
	bitmap.y = ay;
	if (aPha) {
		bitmap.alpha = aPha;
	} else {
		bitmap.alpha = 0.7;
	}
	aLayer.addChild(bitmap);
	return bitmap;
}

RPG.drawScale= function(aLayer, aColor, ax, ay, aw, ah) {
	bitmapdata = new LBitmapData(imglist[aColor]);
	bitmap = new LBitmap(bitmapdata);
	bitmap.scaleX = aw/ bitmap.width;
	bitmap.scaleY = ah/ bitmap.height;
	bitmap.x = ax;
	bitmap.y = ay;
	bitmap.alpha = 1;
	aLayer.addChild(bitmap);
}

RPG.drawFocus= function(aLayer, ax, ay, aw, ah) {
	bitmapdata = new LBitmapData(imglist["focus"]);
	bitmap = new LBitmap(bitmapdata);
	bitmap.scaleX = aw/ bitmap.width;
	bitmap.scaleY = ah/ bitmap.height;
	bitmap.x = ax;
	bitmap.y = ay;
	bitmap.alpha = 0.5;
	aLayer.addChild(bitmap);
	return bitmap;
}

RPG.moveChar= function(aChar, aStepArray){
	aChar.moveMode= 2;
	aChar.stepArray= aStepArray;
	if (aChar.stepArray.length> 0){
		aChar.changeDir(aChar.stepArray[0]);
	}
}
RPG.hideChar= function(aChar){
	charaLayer.removeChild(aChar);
	//aChar.die();
}
RPG.waitCharPos= function (aChar, ax, ay, aCallBack){ 
	if (aChar.x/ STEP != ax || aChar.y/ STEP != ay) { 
		setTimeout(function(){RPG.waitCharPos(aChar, ax, ay, aCallBack);}, 100);
	} else {
		if (aCallBack) {
			aCallBack();
		}
	}
} 
RPG.Serialize= function (obj){
    switch(obj.constructor){     
        case Object:     
            var str = "{";     
            for(var o in obj){
            	var tmp= RPG.Serialize(obj[o]);
            	if (tmp) {
                	str += o + ":" + tmp +",";
                }
            }     
            if(str.substr(str.length-1) == ",")     
                str = str.substr(0,str.length -1);     
             return str + "}";     
             break;     
         case Array:                 
             var str = "[";     
             for(var o in obj){     
            	var tmp= RPG.Serialize(obj[o]);
            	if (tmp) {
                 	str += tmp +",";
                 }
             }     
             if(str.substr(str.length-1) == ",")     
                 str = str.substr(0,str.length -1);     
             return str + "]";     
             break;     
         case Boolean:     
             return "\"" + obj.toString() + "\"";     
             break;     
         case Date:     
             return "\"" + obj.toString() + "\"";     
             break;     
         case Function:     
             break;     
         case Number:     
             return "\"" + obj.toString() + "\"";     
             break;      
         case String:     
             return "\"" + obj.toString() + "\"";     
             break;         
     }     
 }     
RPG.jumpStage= function(aStage, ax, ay, aface){
	//console.log(aStage);
	stage = aStage;
	//开始跳转
	initScript(ax, ay, aface);
}
// 获得移动方向，返回为一个数组，可以二选一
RPG.getMoveDir= function(ax, ay) {
    var a = ax - player.x - charaLayer.x- STEP/ 2;
    var b = ay - player.y - charaLayer.y- STEP/ 2;
    var ret1= [];
    var ret2= [];
    if (a > STEP/ 2) {
    	ret1.push(RIGHT);
    } else if (a< - STEP/ 2) {
	    ret1.push(LEFT);
	}
    if (b > STEP/ 2) {
    	ret2.push(DOWN);
    } else if (b< - STEP/ 2) {
	    ret2.push(UP);
	}
	if (Math.abs(a) > Math.abs(b)) {
		return ret1.concat(ret2);
	} else {
		return ret2.concat(ret1);
	}
}

//
RPG.dealNormal= function(ax, ay){
    // 根据点击位置，判断移动方向
    if (player) {
    	var ret= RPG.getMoveDir(ax, ay);
    	if (ret.length==0) {
	        timer= setTimeout(RPG.openMenu, 500 );    		
    	} else {
	        player.changeDirAlt(ret);
    	}
	}
}

RPG.newButton= function(aw, ah, ax, ay, aText, aFunc) {
	// 这个是普通的按钮
	var bitmapDataUp = new LBitmapData(imglist["button1"]);
	var bitmapUp = new LBitmap(bitmapDataUp);
	bitmapUp.scaleX= aw/ 30;
	bitmapUp.scaleY= ah/ 30;
	var bitmapDataDown = new LBitmapData(imglist["button1_down"]);
	var bitmapDown = new LBitmap(bitmapDataDown);
	bitmapDown.scaleX= aw/ 30;
	bitmapDown.scaleY= ah/ 30;
	// 保持进度的按钮
	var button02 = new LButton(bitmapUp,null,bitmapDown);
	button02.x= ax;
	button02.y= ay;
	var text = new LTextField();
	text.size = "15";
	text.color = "#FFFFFF";
	text.text = aText;
	text.textAlign= "center";
	text.textBaseline= "middle";
	//text.x = bitmapUp.scaleX* bitmapUp.width/ 2;
	//text.y = bitmapUp.scaleY* bitmapUp.height/ 2;
	text.x = button02.getWidth()/ 2;
	text.y = button02.getHeight()/ 2;
	button02.addChild(text);
	button02.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
		RPG.currentButton= button02;
	});
	button02.addEventListener(LMouseEvent.MOUSE_UP, function () {
		if (RPG.currentButton== button02) {
			if (aFunc) aFunc();
		}
	});
	return button02;
}

RPG.newSimpleButton= function(aw, ah, ax, ay, aText, aFunc) {
	// 这个是处理多选项用的白底按钮
	var bitmapDataUp = new LBitmapData(imglist["focus"]);
	var bitmapUp = new LBitmap(bitmapDataUp);
	bitmapUp.scaleX= aw/ bitmapUp.width;
	bitmapUp.scaleY= ah/ bitmapUp.height;
	bitmapUp.alpha= 0.2;
	var bitmapDataDown = new LBitmapData(imglist["focus"]);
	var bitmapDown = new LBitmap(bitmapDataDown);
	bitmapDown.scaleX= aw/ bitmapDown.width;
	bitmapDown.scaleY= ah/ bitmapDown.height;
	bitmapDown.alpha= 0.5;
	// 保持进度的按钮
	var button02 = new LButton(bitmapUp,bitmapDown,bitmapDown);
	button02.x= ax;
	button02.y= ay;
	var text = new LTextField();
	text.size = "15";
	text.color = "#FFFFFF";
	text.text = aText;
	text.textAlign= "center";
	text.textBaseline= "middle";
	//text.x = bitmapUp.scaleX* bitmapUp.width/ 2;
	//text.y = bitmapUp.scaleY* bitmapUp.height/ 2;
	text.x = button02.getWidth()/ 2;
	text.y = button02.getHeight()/ 2;
	button02.addChild(text);
	button02.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
		RPG.currentButton= button02;
	});
	button02.addEventListener(LMouseEvent.MOUSE_UP, function () {
		if (RPG.currentButton== button02) {
			if (aFunc) aFunc();
		}
	});
	return button02;
}

RPG.newIconButton= function(aPicUp, aPicDown, aPicDis, ax, ay, aRate, aText, aFunc) {
	// 这个是图标按钮
	var bitmapDataUp = new LBitmapData(imglist["iconset"], aPicUp.x*RPG.iconStep, aPicUp.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
	var bitmapUp = new LBitmap(bitmapDataUp);
	bitmapUp.scaleX= aRate;
	bitmapUp.scaleY= aRate;
	var bitmapDataDown = new LBitmapData(imglist["iconset"], aPicDown.x*RPG.iconStep, aPicDown.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
	var bitmapDown = new LBitmap(bitmapDataDown);
	var bitmapDataDis = new LBitmapData(imglist["iconset"], aPicDis.x*RPG.iconStep, aPicDis.y*RPG.iconStep, RPG.iconStep, RPG.iconStep);
	var bitmapDis = new LBitmap(bitmapDataDis);
	bitmapDis.scaleX= aRate;
	bitmapDis.scaleY= aRate;
	bitmapDown.scaleX= aRate;
	bitmapDown.scaleY= aRate;
	// 保持进度的按钮
	var btn = new LButton(bitmapUp, null, bitmapDown, bitmapDis);
	btn.x= ax;
	btn.y= ay;
	var text = new LTextField();
	text.size = "15";
	text.color = "#FFFFFF";
	text.text = aText;
	text.textAlign= "center";
	text.textBaseline= "middle";
	text.x = btn.getWidth()/ 2;
	text.y = btn.getHeight()+ 10;
	//text.y = btn.getHeight()+ ay+ 10;
	btn.addChild(text);
	btn.addEventListener(LMouseEvent.MOUSE_DOWN, function() {
		RPG.currentButton= btn;
	});
	btn.addEventListener(LMouseEvent.MOUSE_UP, function () {
		if (RPG.currentButton== btn) {
			if (aFunc) aFunc();
		}
	});
	return btn;
}

RPG.getRandomNum= function(Min,Max){
	var Range = Max - Min;
	var Rand = Math.random();
	return(Min + Math.floor(Rand * Range));
}

// 重排动态角色，以便正确遮盖
RPG.resetChildIndex= function(aLayer){
	// 排序以脚为准
	var y1, y2, h1, h2;
	for (var i=0; i< aLayer.childList.length; i++){
		h1= charaLayer.childList[i].ph;
		if (!h1) {
			h1= charaLayer.childList[i].height+ 1;
		}
		y1= charaLayer.childList[i].y+ h1;
		//c1= charaLayer.getChildIndex(charaLayer.childList[i]);
		for (var j= i+ 1; j< aLayer.childList.length; j++){
			h2= charaLayer.childList[j].ph;
			if (!h2) {
				h2= charaLayer.childList[j].height+ STEP;
			}
			y2= charaLayer.childList[j].y+ h2;
			//c2= charaLayer.getChildIndex(charaLayer.childList[j]);
			//if ((c1> c2 && y1< y2) || (c1< c2 && y1> y2)) {
			if (y1> y2) {
				charaLayer.setChildIndex(charaLayer.childList[j], i);
				//c1= c2;
				y1= y2;
			}
		}
	}
}
