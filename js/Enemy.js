/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆██▄▄▃▂
 *  ████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏敌人数据
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2018/1/24 13:15 初版
 */
let EnemyList = [
    {name:'巨蚁',type:'仿生',hp:5,active:1,attack:15,defend:15,armor:0,speed:5,hit:1,miss:1,exp:1,item:[21]},
    {name:'杀人虫',type:'仿生',hp:12,active:1,attack:18,defend:15,armor:0,speed:8,hit:1,miss:1,item:[21]},
    {name:'火焰枪',type:'电子',hp:8,active:1,attack:20,defend:20,armor:0,speed:15,hit:1,miss:2,item:[22]},
    {name:'生物炮',type:'仿生',hp:15,active:2,attack:24,defend:24,armor:0,speed:10,hit:4,miss:2,item:[21]},
    {name:'加农炮',type:'电子',hp:28,active:1,attack:35,defend:30,armor:0,speed:33,hit:6,miss:10,item:[22]},
    {name:'彷生蜗牛',type:'仿生',hp:7,active:1,attack:17,defend:40,armor:0,speed:12,hit:5,miss:3,item:[21]},
    {name:'流氓',type:'仿生',hp:100,active:1,attack:32,defend:93,armor:40,speed:50,hit:8,miss:10,item:[21]},
    //BOSS
    {name:'戈斯战车',type:'战车',hp:175,active:3,attack:675,defend:420,armor:0,speed:150,hit:81,miss:50,item:[23]},
];