/**
 * Created by 路漫漫.
 * Link: ahmerry@qq.com
 * Date: 2017/2/12 14:29
 *
 */
var eventData=[], playersInMap=[], players=[], backgroundImgUrl=[], mapPass=[];

//添加事件到地图
function addEvent(id, x, y, layer, width, height, picture, dir) {

    eventData[id] = {};

    if (layer == 1) {
        mapPass[x][y] = false;
    }
    eventData[id].p.x = x*tileSize;
    eventData[id].p.y = y*tileSize;

    if (!dir) {
        eventData[id].changedir = false;
        resources.load(picture);
        resources.onReady(function () {
            eventData[id].sprite = new Sprite(picture,[0,0],[width,height]);
        })
    } else {
        if (dir[2] == 1) {

        } else {
            eventData[id].changedir = false;
        }

        resources.load(picture);
        resources.onReady(function () {
            eventData[id].sprite = new Sprite(picture,[dir[0] ,dir[1]],[24,24]);
        })
    }
}

//添加事件到地图
function addPlayer(id, x, y, layer, width, height, picture, dir) {

    players[id] = {};

    if (layer == 1) {
        mapPass[x][y] = false;
    }
    players[id].p.x = x*tileSize;
    players[id].p.y = y*tileSize;

    resources.load(picture);
    resources.onReady(function () {
        eventData[id].sprite = new Sprite(picture,[dir[0] ,dir[1]],[24,24],10,[0,1,2,3]);
    })

}

function add_player(id, name, charaset, left, top, dir, moves, width, height) {
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
    eval('if ( content_to_refresh_' + refreshId + ' ) {  eval(content_to_refresh_' + refreshId + '); content_to_refresh_' + refreshId + ' = false; }');
}