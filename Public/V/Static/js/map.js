/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆███▄▄▃▂
 *  ███████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 游戏客户端资源载入库
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/23 初版
 */
//添加事件到地图
function addEvent(obj) {
    var picUrl = '/V/Static/img/movePic/'+obj.name+'.png',name = obj.properties.posX+'_'+obj.properties.posY;
    eventArr[name] = {p:{x:obj.x-12,y:obj.y-12}};
    eventArr[name].pos = [obj.properties.posX,obj.properties.posY];
    eventArr[name].log = obj.properties.log;
    mapPass[obj.properties.posY][obj.properties.posX]=1;

    if (obj.type === '0') {
        resources.load(picUrl);
        resources.onReady(function () {
            eventArr[name].sprite = new Sprite(picUrl,[0,obj.properties.dir*24],[24,24]);
        })
    } else {
        picUrl = '/V/Static/img/event/'+obj.name+'.png';
        resources.load(picUrl);
        resources.onReady(function () {
            eventArr[name].sprite = new Sprite(picUrl,[0,0],[24,24]);
        })
    }
}

//添加事件到地图
function addPlayer(id, x, y, layer, picture, dir) {

    netPlayers[id] = {p:{x:0,y:0}};

    if (layer == 1) {
        mapPass[x][y] = false;
    }
    netPlayers[id].p.x = x*tileSize;
    netPlayers[id].p.y = y*tileSize;

    picUrl = 'images/charasets/'+picture;
    resources.load(picUrl);
    resources.onReady(function () {
        eventData[id].sprite = new Sprite(picture,[dir[0] ,dir[1]],[24,24],10,[0,1,2,3]);
    })

}

function addNetPlayers(id, name, charaset, left, top, dir, moves, width, height) {
    //add_charaset(charaset);
    players_in_map[id] = 'p' + id + '-' + moves;
    player[id] = new Object();
    player[id].charaset = charaset;
    player[id].moves = moves;
    player[id].left_gain = Math.ceil((width - tile_size) / 2);
    player[id].top_gain = height - tile_size;
    player[id].width = width;
    player[id].height = height;
    player[id].name = name;
    player[id].battle_id = 0;
    player[id].battle_state = 0;

    if ( id == my_user_id )
    {
        player[id].moving = player_moving;
    }
    else
    {
        player[id].moving = false;
    }

    left = left * tile_size - player[id].left_gain;
    top = top * tile_size - player[id].top_gain;

    var playerImg = "'images/charasets/" + charaset + "'";

}

//刷新时执行后台返回code
function refreshLoop(refreshId) {

}