/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
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
    let picUrl = '/V/Static/img/movePic/'+obj.name+'.png',name = obj.properties.posX+'_'+obj.properties.posY;
    eventArr[name] = {p:{x:obj.x-12,y:obj.y-12}};
    eventArr[name].pos = [obj.properties.posX,obj.properties.posY];
    eventArr[name].gid = obj.properties.gid;
    mapPass[obj.properties.posY][obj.properties.posX]=1;

    if (obj.type === '0') {
        resources.load({name:name,path:picUrl});
        resources.onReady(function () {
            eventArr[name].sprite = new Sprite(resources.get(name),[0,obj.properties.dir*24],[24,24]);
        })
    } else {
        picUrl = '/V/Static/img/event/'+obj.name+'.png';
        resources.load({name:name,path:picUrl});
        resources.onReady(function () {
            eventArr[name].sprite = new Sprite(resources.get(name),[0,0],[24,24]);
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

function showMessage(message,script) {
    var tmp = confirm(message);
    if (tmp) {
        eventShow(script);
    } else {
        eventKey=0;
        btnState = false;
        return;
    }
    /*
    var count = 1;
    var tab = 'Array(\'' + script[0] + '\'';
    while ( count < key )
    {
        tab += ', \'\'';
        count++;
    }
    while ( script[count] )
    {
        tab += ', \'' + script[count] + '\'';
        count++;
    }
    tab += ')';

    var showFace = '<img src="images/faces/' + face[0] + '" alt="" style="float:left" />';

    var left = parseInt(document.getElementById('p' + my_user_id).style.left) - 16 + window_x;
    var top = parseInt(document.getElementById('p' + my_user_id).style.top) - 128 + window_y;
    key++;

    close_message_func = 'document.getElementById(\'message\').innerHTML=\'\';script_eval(' + key + ', ' + tab + ');';
    var close_message = '<br /><div align="center"><form action="" onsubmit="' + close_message_func + 'return false;"><input type="submit" value="' +  l_close_message + '" /></form></div>';


    document.getElementById('message').innerHTML = '<div id="message_layer" onmouseover="actual_layer=this.id" style="position:absolute;left:' + left + 'px;top:' + top + 'px;z-index:9999">' + message_box.begin + '<div class="message" align="' + align + '" style="text-align:' + align + '">' + showFace + '' + message + '' + close_message + '</div>' + message_box.end + '</div>';

    start_drag('message_layer');
*/
}
//
// function selectChoice(choices) {
//
//     var left = parseInt(document.getElementById('p' + my_user_id).style.left) - 16 + window_x;
//     var top = parseInt(document.getElementById('p' + my_user_id).style.top) - 64 + window_y;
//
//     close_message_func = 'setTimeout(\'submit_choice(\\\'' + event_status + '\\\', document.getElementById(\\\'input_choice\\\').value);document.getElementById(\\\'message\\\').innerHTML=\\\'\\\';\', 200);';
//
//     var choice_fork = '<select name="choices" id="input_choice">';
//
//     var i = 0;
//     while ( i < choices.length )
//     {
//         choice_fork += '<option value="' + i + '">' + choices[i] + '</option>';
//         i++;
//     }
//
//     choice_fork += '</select>';
//
//     var showFace = '';
//
//
//     var area_value = '<form action="" onsubmit="' + close_message_func + 'return false;">' + choice_fork;
//     var close_message = '<br /><div align="center"><input type="submit" value="' +  l_close_message + '" /></div></form>';
//
//     document.getElementById('message').innerHTML = '<div id="message_layer" onmouseover="actual_layer=this.id" style="position:absolute;left:' + left + 'px;top:' + top + 'px;z-index:9999">' + message_box.begin + '<div class="message" align="' + align + '" style="text-align:' + align + '">' + showFace + '' + area_value + '' + close_message + '</div>' + message_box.end + '</div>';
// }