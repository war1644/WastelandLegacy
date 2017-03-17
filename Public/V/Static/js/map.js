/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 客户端地图相关处理
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v1.0     2017/02/17      初版
 */
var Map = function () {
    //玩家
    this.player = {};
    //其他玩家
    this.netPlayers = [];
    //事件及NPC
    this.events = [];

    Map.prototype = {

        //添加事件到地图
        addEvent: function (id, x, y, layer, width, height, picture, dir) {

            eventData[id] = {p: {x: 0, y: 0}};

            if (layer == 1) {
                mapPass[y][x] = false;
            }
            eventData[id].p.x = x * tileSize;
            eventData[id].p.y = y * tileSize;
            var picUrl;
            if (!dir) {
                eventData[id].changedir = false;
                picUrl = 'images/sprites/' + picture;
                resources.load(picUrl);
                resources.onReady(function () {
                    eventData[id].sprite = new Sprite(picUrl, [0, 0], [width, height]);
                })
            } else {
                if (dir[2] == 1) {

                } else {
                    eventData[id].changedir = false;
                }
                picUrl = 'images/charasets/' + picture;
                resources.load(picUrl);
                resources.onReady(function () {
                    eventData[id].sprite = new Sprite(picUrl, [dir[0], dir[1]], [24, 24]);
                })
            }
        },

        //添加事件到地图
        addPlayer: function (id, x, y, layer, picture, dir) {

            netPlayers[id] = {p: {x: 0, y: 0}};

            if (layer == 1) {
                mapPass[x][y] = false;
            }
            netPlayers[id].p.x = x * tileSize;
            netPlayers[id].p.y = y * tileSize;

            picUrl = 'images/charasets/' + picture;
            resources.load(picUrl);
            resources.onReady(function () {
                eventData[id].sprite = new Sprite(picture, [dir[0], dir[1]], [24, 24], 10, [0, 1, 2, 3]);
            })
        },

        addNetPlayers: function (id, name, charaset, left, top, dir, moves, width, height) {
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

            if (id == my_user_id) {
                player[id].moving = player_moving;
            }
            else {
                player[id].moving = false;
            }

            left = left * tile_size - player[id].left_gain;
            top = top * tile_size - player[id].top_gain;

            var playerImg = "'images/charasets/" + charaset + "'";

        },

        //刷新时执行后台返回code
        refreshLoop: function (refreshId) {

        }
    }
};