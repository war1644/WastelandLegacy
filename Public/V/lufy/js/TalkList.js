let talkList = {
        售卖员:[
            {msg: "欢迎来到废土商店！贵干？"},
            {msg: "欢迎来到废土商店！贵干？",option:[
                {text: "买", action:()=>{
                    Talk.closeTalk();
                    Menu.trade = 'buy';
                    Menu.menuShowItems();
                }},
                {text: "卖",action:()=>{
                    Talk.closeTalk();
                    Menu.trade = 'sell';
                    Menu.menuShowItems();
                }}
            ]},
        ],
        box: [
            {img: "", name: "", msg: "让我看看这里有什么" },
            {img: "", name: "", msg: "呵呵，收获不小啊" },
            {img: "", name: "", msg: "不要乱翻别人东西哦，小心被暴揍哦^_^" },
        ],
    	费雷塔:[
			{name: "费雷塔", msg: "新来的，过来一下吧"},
            {name: "费雷塔", msg: "看看这个吧"},
            {name: "费雷塔", msg: "如何？不错吧？打败他就有50000G的赏金，这些钱可够花好几个月的。"},
            {name: "费雷塔", msg: "我们明天讨伐的讨伐目标就是他了。你先去镇子里的旅馆休息一下吧。"},
    	],
        雷娜:[{img: "face雷娜", name: "", msg: "咦，你是赏金猎人么？",option:[
                {text: "是", action:()=>{
                    Talk.startTalk([
                        {img: "face雷娜", name: "", msg: "卧槽，来了一个生力军"},
                        {img: "face雷娜", name: "", msg: "赶紧来猎人中心吧，再见啦"},
                    ]);
                }},
                {text: "否",action:()=>{
                    Talk.callback = null;
                    Talk.startTalk([
                        {img: "face雷娜", name: "", msg: "哎，来了一个废物"},
                    ]);
                }}
            ]},
        ],
		gameAbout:[
            {index:0,img: "face雷娜", name: "游戏美工04", msg: ""},
            {index:1,img: "face雷娜", name: "游戏美工04", msg: ""},
        ],
        gameExplainTalk: {img: "face雷娜", msg: "是否进入新手教程？",option:[
                {text: "是", action:()=>{
                    Talk.startTalk([
                        {img: "face雷娜", name: "游戏美工04", msg: "点击地图移动"},
                        {img: "face雷娜", name: "游戏美工04", msg: "点击自己打开菜单"},
                        {img: "face雷娜", name: "游戏美工04", msg: "物品列表页长按物品使用或装备"},
                        {img: "face雷娜", name: "游戏美工04", msg: "状态显示页长按装备可卸下"},
                        {img: "face雷娜", name: "游戏美工04", msg: "多名队员，状态显示页，左右滑动可切换"},
                        {img: "face雷娜", name: "游戏美工04", msg: "走到NPC旁点击NPC对话"},
                        {img: "face雷娜", name: "游戏美工04", msg: "WARNING：遇到凶残的敌人就跑吧，不然没人救你哦"},
                    ]);
                    // infoLayer.removeAllChild();
                }},
                {text: "否",action:()=>{
                    Talk.startTalk([
                        {img: "face雷娜", name: "游戏美工04", msg: "那么，开始你的废土捡破烂生活吧"},
                    ]);
                    // infoLayer.removeAllChild();
                }}
            ]},
        fight:[
            {msg: "实力悬殊，敌人四散奔逃，是否追击？"},
            {msg: "是否追击？",option: [
                    {text: "追击", action: function () {
                        Fight.option = 0;
                        Talk.closeTalk(1);
                    }},
                    {text: "不追击", action: function(){
                        Fight.option = 1;
                        Talk.closeTalk()
                    }},
                ]
            },

        ],
        npc1: [
            {img: "", name: "", msg: "赏金猎人们通过击杀赏金首领取悬赏金以获取金钱。"},
            {img: "", name: "", msg: "但是赏金猎人们也经常会丢掉小命"},
            {img: "", name: "", msg: "所以尽量和队友一起迎战敌人"},
        ],
        npc2: [
            {img: "", name: "", msg: "欢迎来到源初镇!"},
            {img: "", name: "", msg: "在野外时最好准备一些回复道具以备不时之需。"},
            {img: "", name: "", msg: "西边的山贼团经常来源初镇来掠夺村民的钱财，而赏金猎人们又嫌赏金太少而不愿意去讨伐他们。唉，我们旅行商生意都没有办法做了"},
            {img: "", name: "", msg: "西边的山贼们的头领有一辆很不错的战车。"},
        ],
        npc3: [
            {img: "", name: "", msg: "这里禁止通行!"},
            {img: "", name: "", msg: "获得了阿比西尼亚猫轻型战车!"},
            {img: "", name: "", msg: "这里是修理店。要修车吗？然而战车系统都没有做好修个毛线。"},
            {img: "", name: "", msg: "我会改造战车的底盘。然而战车系统还没做好，什么也改不了。"},
            {img: "", name: "", msg: "不知道为什么，许多曾经被打倒的赏金首现在又重新出现了。"},
            {img: "", name: "", msg: "据说沙蛟出没在东面的沙漠里，获得自己的战车前还是不要靠近的好"},
            {img: "", name: "", msg: "在山贼营地附近猎杀怪物的时候，发现了山贼的围栏上有个洞。果然山贼也会资金不足啊。"},
            {img: "", name: "", msg: "明奇：我就是伟大的天才科学家明奇博士!"},
            {img: "", name: "", msg: "找我有什么事吗?"},
            {img: "", name: "", msg: "你好，需要灭蚊灵吗？"},
            {img: "", name: "", msg: "呜呜...儿子啊，为什么你要一个人去讨伐山贼们呢"},
            {img: "", name: "", msg: "这位勇士，求求你，救救我的儿子吧"},
            {img: "", name: "", msg: "抱歉，现在还不开放住宿"},
            {img: "", name: "", msg: "这里蚊子好多，要是有灭蚊灵之类的就好了"},
            {img: "", name: "", msg: "治疗麻痹的气功按摩要试一下吗？"},
            {img: "", name: "", msg: "BOSS系统还没做好，所以没有任何情报。"},
            {img: "", name: "", msg: "与其买火箭烟花之类的攻击道具，不如不如换上更好的装备"},
            {img: "", name: "", msg: "前些时候在东面的沙漠里发现了一个洞穴。到底是什么生物居住的洞穴呢？"},
            {img: "", name: "", msg: "这里禁止通行!"},
            {img: "", name: "", msg: "这里禁止通行!"},
            {img: "", name: "", msg: "这里禁止通行!"},
        ],


    };
let choiceList = {
    choice1 : {img: "", msg: "这位勇士，求求你，救救我的儿子吧",
        choice:[
            {text: "是", action:()=>{
                Talk.startTalk([
                    {img: "", name: "", msg: "真是太感谢了，我一定会报答你的" },
                ])
            }},
            {text: "否",action:()=>{Talk.closeTalk();}}
        ]
    },
    choice2 : {img: "", msg: "喝水吗？",
        choice:[
            {text: "是", action:()=>{
                Talk.startTalk([
                    {img: "", name: "", msg: "你喝了一口水，清凉的水里微微带着一丝甜意!" },
                    {img: "", name: "", msg: "你的口不渴了" },
                ])
			}},
            {text: "否",action:()=>{Talk.closeTalk();}}
        ]
    }
};
