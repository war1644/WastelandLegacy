var script = {
	home2:{
		add:[
		     {chara:"player",img:"player",x:4,y:8},
		     {chara:"npc",img:"npc2",x:7,y:6},
		     {chara:"npc",img:"npc3",x:3,y:3}],
		talk:{
			talk1:[
		    		  {img:"m",name:"鸣人",msg:"我是木叶村的鸣人，你是谁？"},
		    		  {img:"n",name:"黑衣忍者甲",msg:"你就是鸣人？九尾还在你身体里吗？"}
		    	  ],
		    talk2:[
		    	      {img:"n",name:"黑衣忍者乙",msg:"鸣人，听说忍者大战就要开始了。"},
		    		  {img:"m",name:"鸣人",msg:"真的吗？一定要想想办法啊。"}
		    	  ]
		},
		jump:[
		      {x:6,y:5,to:"home1"}
		]
	},
	home1:{
		add:[
		     {chara:"player",img:"player",x:7,y:8},
		     {chara:"npc",img:"npc3",x:8,y:3},
		     {chara:"npc",img:"npc5",x:10,y:3}],
		talk:{
		      talk1:[
		    	        {img:"m",name:"鸣人",msg:"你们在干什么啊？"},
			    		{img:"n",name:"黑衣忍者甲",msg:"我们在喝茶。"}
		    	  ],
		      talk2:[
			    	    {img:"n",name:"黑衣忍者乙",msg:"我们在喝茶，你不要打扰我们。"},
			    		{img:"m",name:"鸣人",msg:"....."}
		    	  ]
		},
		jump:[
		      {x:4,y:8,to:"home2"}
		]
	}

};
//根据脚本，初始化游戏画面
function initScript(){
	//地图位置初始化
	mapDownLayer.x = 0;
	mapDownLayer.y = 0;
    mapUpLayer.x = 0;
    mapUpLayer.y = 0;
	charaLayer.x = 0;
	charaLayer.y = 0;

	//地图层初始化
    mapDownLayer.removeAllChild();
    mapUpLayer.removeAllChild();

    //人物层初始化
	charaLayer.removeAllChild();
	//效果层初始化
	effectLayer.removeAllChild();
	//对话层初始化
	talkLayer.removeAllChild();
	
	//地图数据获取
	// map = stage.map;
	// mapdata = stage.mapdata;
    // getMapData();
	//对话数据获取
	talkScriptList = scriptData.talk;
	
	//添加地图
	addMap(0,0);
	delMap();
	//添加人物
	addChara();
}
//游戏场景跳转测试
function checkJump(){
	var jump = scriptData.jump;
	// var jumpstage;
	// for(var i=0;i<jump.length;i++){
	// 	jumpstage = jump[0];
		if(player.x == jump.x * 32 && player.y == jump.y * 32){
			//获取该场景脚本数据
            scriptData = script[jump.to];
			//开始跳转
			initScript(scriptData);
			return;
		}
	// }
}