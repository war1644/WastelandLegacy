<?php
/**
 *
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version V0.9
 * @since
 * <p>v0.9 2017/2/12 17:04  初版</p>
 */
ini_set("display_errors", "On");
error_reporting(-1);
//设置全局常量
define('MFPATH' , str_replace('\\', '/', __DIR__).'/');
define('BASE_URL' , 'http://e.cn/');
define('IN_PHPORE', true);
define('INC', MFPATH.'includes/');
define('CONFIG_PATH', MFPATH.'Config/');
defined('RUN_PATH') ? : define('RUN_PATH' , MFPATH.'RunData/');


settype($config, 'object');
$config->phpex = 'php';
$config->path = './';
//引入全局方法
require_once INC.'common.php';
require_once INC.'MFDB.php';

$config->table_prefix = 'phpore_';

$config = new Config($config);
define('BATTLES_TABLE', $config->table_prefix . 'battles');
define('BATTLES_VARS_TABLE', $config->table_prefix . 'battles_vars');
define('CLASSES_TABLE', $config->table_prefix . 'classes');
define('CHATBOX_TABLE', $config->table_prefix . 'chatbox');
define('CONFIG_TABLE', $config->table_prefix . 'config');
define('EVENTS_TABLE', $config->table_prefix . 'events');
define('GUILDS_TABLE', $config->table_prefix . 'guilds');
define('MAPS_TABLE', $config->table_prefix . 'maps');
define('MONSTERS_TABLE', $config->table_prefix . 'monsters');
define('OPPONENTS_TABLE', $config->table_prefix . 'opponents');
define('SKILLS_TABLE', $config->table_prefix . 'skills');
define('TILESETS_TABLE', $config->table_prefix . 'tilesets');
define('USERS_TABLE', $config->table_prefix . 'users');
define('VARS_TABLE', $config->table_prefix . 'vars');
$db = MFDB::Ins();
$config->load_db();
Session('user_id',2);
//载入语言
include MFPATH . 'language/'. $config->language.'.php';
$lang->load_keys('common');
$user = new User();


        $result = $db->sql_query( 'SELECT m.id, m.name, m.blocs, m.music, m.optimized, t.tiles FROM ' . MAPS_TABLE . ' m, ' . TILESETS_TABLE . ' t WHERE m.id = ' . $user->map_id . ' AND m.tileset = t.id' );
        if ( !$map = $db->sql_fetchobject( $result ) ) {
            //设置玩家在地图的位置
            if ( $user->start_location != '' ) {
                list( $user->map_id, $user->map_left, $user->map_top, $user->map_dir ) = explode( ',', $user->start_location );
            } else {
                list( $user->map_id, $user->map_left, $user->map_top, $user->map_dir ) = explode( ',', $config->default_location );
            }
            $user->map_id = intval( $user->map_id );
            $user->map_left = intval( $user->map_left );
            $user->map_top = intval( $user->map_top );
            $user->map_dir = intval( $user->map_dir );
            $user->set( 'map_id', $user->map_id );
            $user->set( 'map_left', $user->map_left );
            $user->set( 'map_top', $user->map_top );
            $user->set( 'map_dir', $user->map_dir );
            $user->update_db();
            $config->update_db();

        }
        $map->tiles = unserialize( base64_decode( $map->tiles ) );
        $map->blocs = unserialize( base64_decode( $map->blocs ) );
        $map->count_x = count( $map->blocs[0][0] );
        $map->count_y = count( $map->blocs[0] );
        $map->width = $map->count_x * $config->tile_size;
        $map->height = $map->count_y * $config->tile_size;
        $map->optimized = ($config->optimize_maps == 1 && $map->optimized == 1 && is_file( $config->path . $config->cache_dir . 'map_' . $map->id . '_0.png' ) && is_file( $config->path . $config->cache_dir . 'map_' . $map->id . '_1.png' )) ? true : false;
        $user->set( 'map_sid', $user->map_sid + 1 );

        if ( $map->optimized ) {
            $data['mapImg'][] = $config->cache_dir . 'map_' . $map->id . '_0.png';
            $data['mapImg'][] = $config->cache_dir . 'map_' . $map->id . '_1.png';
            $data['mapImg'][] = $config->cache_dir . 'map_' . $map->id . '_2.png';
        }
        $event_ids = [];
        $event_coords = [];
        for ( $x = 0; $x < $map->count_x; $x++ ) {
            for ( $y = 0; $y < $map->count_y; $y++ ) {
                if ( $map->blocs[2][$y][$x] > 0 ) {
                    $event_ids[] = $map->blocs[2][$y][$x];
                    if ( !isset( $event_coords[$map->blocs[2][$y][$x]] ) ) {
                        $event_coords[$map->blocs[2][$y][$x]] = [];
                    }
                    $event_coords[$map->blocs[2][$y][$x]][] = [$x, $y];
                }
                // 地图下图层
                $data['downMapPass'][] = ['x' => $x, 'y' => $y, 'pass' => (($map->tiles[0][1][$map->blocs[0][$y][$x]] == 0) ? 1 : 0)];

                // 地图上图层
                $data['upMapPass'][] = ['x' => $x, 'y' => $y, 'pass' => (($map->tiles[1][1][$map->blocs[1][$y][$x]] == 0) ? 3 : (($map->tiles[1][1][$map->blocs[1][$y][$x]] == 1) ? 0 : 1))];
            }
        }

        $time = time();
        $sql = 'SELECT `name`, id, map_left, map_top, map_dir, map_moves, charaset, pic_width, pic_height, battle_id, battle_state FROM ' . USERS_TABLE . " WHERE id != $user->id and map_id = $user->map_id and battle_id>0 and map_last_visit > ($config->server_time - 30)";
        $rs = $db->sql_query( $sql, 1 );
        $rows = $db->sql_fetchrows( $rs );

        foreach ( $rows as $row ) {

            $data['players'][] = [
                'id' => $row['id'],
                'battleId' => $row['battle_id'],
                'battleState' => $row['battle_state'],
                'name' => $row['name'],
                'charaset' => $row['charaset'],
                'x' => $row['map_left'],
                'y' => $row['map_top'],
                'dir' => $row['map_dir'],
                'moves' => $row['map_moves'],
                'width' => ceil( $row['pic_width'] / 4 ),
                'height' => ceil( $row['pic_height'] / 4 )
            ];
        }

        if ( count( $event_ids ) > 0 ) {
            // events in map
            $result = $db->sql_query( 'SELECT * FROM ' . EVENTS_TABLE . ' WHERE id = ' . implode( ' OR id = ', $event_ids ) );
            while ( $row = $db->sql_fetchrow( $result ) ) {
                if ( $row['dir'] != '' ) {
                    $row['pic_width'] = ceil( $row['pic_width'] / 4 );
                    $row['pic_height'] = ceil( $row['pic_height'] / 4 );
                }
                foreach ( $event_coords[$row['id']] as $val ) {
                    $data['eventData'][] = [
                        'id' => $row['id'],
                        'x' => $val[0],
                        'y' => $val[1],
                        'picUrl' => $row['picture'],
                        'dir' => (($row['dir'] == '') ? 'false' : '[' . $row['dir'] . ']'),
                        'layer' => $row['layer'],
                        'width' => $row['pic_width'],
                        'height' => $row['pic_height']
                    ];
                }
            }
        }
        if ( $config->chat_history == 0 ) {// no chat history
            $result = $db->sql_query( 'SELECT MAX(id) AS last_id FROM ' . CHATBOX_TABLE . ' WHERE cat_id = \'m' . $user->map_id . '\'' );
            if ( $last_id = $db->sql_fetchrow( $result ) ) {
                $last_id = $last_id['last_id'];
            }
            if ( empty( $last_id ) ) {
                $last_id = 0;
            }
        } else { // chat history
            $result = $db->sql_query( 'SELECT u.name, c.message, c.id FROM ' . USERS_TABLE . ' u, ' . CHATBOX_TABLE . ' c WHERE u.id = c.user_id AND c.cat_id = \'m' . $user->map_id . '\' ORDER BY c.id DESC LIMIT 0, ' . $config->chat_history );
            $row = [];
            while ( $value = $db->sql_fetchrow( $result ) ) {
                $row[] = $value;
            }
            while ( $value = array_pop( $row ) ) {
                $data['addChat'] = ['NAME' => $value['name'], 'MESSAGE' => $value['message']];
                $last_id = $value['id'];
            }
            if ( !isset( $last_id ) ) {
                $result = $db->sql_query( 'SELECT MAX(id) AS last_id FROM ' . CHATBOX_TABLE . ' WHERE cat_id = \'m' . $user->map_id . '\'' );
                if ( $last_id = $db->sql_fetchrow( $result ) ) {
                    $last_id = $last_id['last_id'];
                }
                if ( empty( $last_id ) ) {
                    $last_id = 0;
                }
            }
        }

        $lang->load_keys( 'map' );
        if ( !empty( $_GET['event_status'] ) && preg_match( '`^([0-9a-f]{32})$`', $_GET['event_status'] ) && $_GET['event_status'] == $user->event_status ) {
            $event_status = true;
        } else {
            $event_status = false;
        }
        $data['pageVar'] = [
            'PAGE_NAME' => $lang->page_map . ' : ' . $map->name,
            'MAP_NAME' => $map->name,
            'MAP_WIDTH' => $map->width,
            'MAP_HEIGHT' => $map->height,
            'TILE_SIZE' => $config->tile_size,
            'REFRESH_METHOD' => $config->refresh_method,
            'CHARASET' => $user->charaset,
            'MAP_MOVES' => $user->map_moves,
            'MAP_SID' => $user->map_sid,
            'MAP_ID' => $user->map_id,
            'EVENT_STATUS' => (($event_status) ? $_GET['event_status'] : ''),
            'LAST_CHAT_ID' => $last_id,
            'PLAYER_X' => $user->map_left,
            'PLAYER_Y' => $user->map_top,
            'PLAYER_MOVING' => (($event_status) ? 'true' : 'false'),
            'CHATBOX_STATE' => $user->chatbox_state
        ];

        if ( !empty( $map->music ) && $user->allow_music ) {
            $data['music'] = $map->music;
        }


        include "test.html.php";