<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

$lang->load_keys('battle');
$mode = ( isset($_GET['mode']) ) ? 'GET.' . trim($_GET['mode']) : '';
if ( !$user->logged_in ) {

    $template->assign_vars( ['PAGE_NAME' => $lang->reception] );

}
if ( $mode == 'GET.stop' )
{
    message_die($lang->session_stop, $lang->session_stop_explain);
}
if ( $mode == 'GET.action' ) {
    //执行战斗动作
    $refresh_id = 2;
    switch ($_GET['type']){
        case 'basic' :
            //敌人ID
            $id = $_GET['op_id'];
//            json_decode(session('enemy'),true);
            break;
        case 'tank' :
            break;
        case 'flee' :
            $users = explode(',',$_GET['allies']);
            $users = implode(' OR id = ', $users);
            $db->sql_query('UPDATE ' . USERS_TABLE . " SET battle_id = 0,battle_state = 0 WHERE id = $users");
            $user->set('in_battle',false);
            $user->update_db();
            js_eval('battle_session_restart();', $refresh_id);
            break;
    }


}elseif ( $mode == 'GET.submit' ) {

    $refresh_id = 2;

    if ( $user->refresh == 1 || !$user->in_battle )
    {
        js_eval('battle_session_restart();', $refresh_id);
    }

    $javascript = '';

    $event_script = new EventScript(false, true);

    $event_key = $event_script->event_key;
    $script = array();

    for ( $i = $event_key - 1; $i >= 0; $i-- )
    {
        $script[] = '\'\'';
    }

    if ( !$event_script->script(false, true) )
    {
        js_eval('alert(\'Error !\');battle_session_refresh();', $refresh_id);
    }

    while ( $data = $event_script->script(true, false) )
    {
        // javascript instruction
        $script[] = '\'' . quotes($data) . '\'';
    }

    $javascript .= 'script_eval(' . $event_key . ', new Array(' . implode(', ', $script) . '));';

    js_eval($javascript, $refresh_id);
} elseif ( $mode == 'GET.refresh' || $mode == 'GET.event') {


    if ( $mode == 'GET.refresh' )
    {
        $refresh_id = 1;
    }
    else
    {
        $refresh_id = 2;
    }

    $user->set('map_last_visit', time());

    if ( isset($_GET['chat_pos']) && preg_match('`^([0-9]+)-([0-9]+)-([0-9]+)$`', $_GET['chat_pos'], $matches) )
    {
        $user->set('chatbox_state', implode(',', array($matches[1], $matches[2], $matches[3])));
    }


    if ( $user->refresh == 1 )
    {
        js_eval('battle_session_refresh();', $refresh_id);
    }

    $javascript = '';

    if ( isset($_GET['chatbox']) && trim($_GET['chatbox']) != '' ) // 聊天信息
    {
        $chatbox_content = explode(',', trim($_GET['chatbox']));
        $lang->load_keys('chat');

        $i = 0;
        while ( isset($chatbox_content[$i]) )
        {
            // Who is slash command [Nuladion]
            if ( substr($chatbox_content[$i], 0, 5) == '/who ' )
            {
                $whois = new User('u.name = \'' . quotes(htmlspecialchars(substr($chatbox_content[$i], 5))) . '\'');

                if ( $whois->guest ) {
                    $javascript .= 'chat_add(\'' . quotes(htmlspecialchars(substr($chatbox_content[$i], 5))) . '\', \'' . quotes($lang->whois_char_not_found) . '\', true);';
                }
                else
                {
                    $javascript .= 'chat_add(\'' . quotes($whois->name) . '\', \'' . quotes($lang->level . ' : ' . $whois->level . '<br />' . $lang->class . ' : ' . $whois->class_title) . '\', true);';
                }
            }
            elseif ( trim($chatbox_content[$i]) != '' )
            {
                $tmp = addslashes(htmlspecialchars(stripslashes(trim($chatbox_content[$i]))));
                $db->sql_query('INSERT INTO ' . CHATBOX_TABLE . "(cat_id, user_id, `time`, message) VALUES('b$user->battle_id', '$user->id', '$config->server_time','$tmp')");
            }
            $i++;
        }
    }

    $chat_last_id = ( isset($_GET['chat_last']) ) ? intval($_GET['chat_last']) : -1; // get chatbox messages

    if ( $chat_last_id > -1 )
    {
        $result = $db->sql_query('SELECT u.name, c.message, c.id FROM ' . USERS_TABLE . ' u, ' . CHATBOX_TABLE . ' c WHERE u.id = c.user_id AND u.id != ' . $user->id . " AND c.cat_id = 'b$user->battle_id'  AND c.id > $chat_last_id ORDER BY c.id ASC");

        while ( $row = $db->sql_fetchrow($result) )
        {
            $javascript .= 'chat_add(\'' . quotes($row['name']) . '\', \'' . quotes($row['message']) . '\');';
            $last_id = $row['id'];
        }

        if ( isset($last_id) && $last_id > $chat_last_id )
        {
            $javascript .= 'chat_last_id = ' . $last_id . ';';
        }
    }

    // 同步客户端玩家之间的位置(刷新页后)
//    if ( !isset($_GET['x'], $_GET['y'], $_GET['map_id']) || ( $user->teleport != 1 && ( $_GET['x'] != $user->map_left || $_GET['y'] != $user->map_top || $_GET['map_id'] != $user->map_id ) ) )
//    {
//        //js_eval('alert(\'invalid position : ' . $_GET['x'] . ';' . $_GET['y'] . ' => ' . $user->map_left . ';' . $user->map_top . '\');map_session_restart();', $refresh_id); // debug
//        js_eval('battle_session_refresh();', $refresh_id);
//    }

    if ( $mode == 'GET.refresh' ) // refresh map events, players
    {
        // get other players data


        if ( $_GET['allies'] )
        {

            explode(',',$_GET['allies']);
            $rs = $db->sql_query('SELECT * FROM '. USERS_TABLE ." WHERE id not in ($_GET[allies]) AND battle_id =$user->battle_id AND teleport = 0");
            $rows = $db->sql_fetchrows($rs);
            if (count($rows)>0){
                foreach ($rows as $row){
                    $javascript .= "setTimeout(chat_add($.$lang->join_battle.', true);), 1000);";
                }
            }

            // update battle scene
            $javascript = 'battle_session_refresh();' . $javascript;

        }
        var_dump($refresh_id);
        js_eval($javascript, $refresh_id);


    }
    else //执行事件
    {
        $layer = $_GET['layer'];
        $event_pos = $event_pos[1];

        if ( ( $layer == 1 && isset($events['i' . $event_pos]) && ( $event_pos == $user->map_left . '-' . ($user->map_top + 1) || $event_pos == ($user->map_left - 1) . '-' . $user->map_top || $event_pos == $user->map_left . '-' . ($user->map_top - 1) || $event_pos == ($user->map_left + 1) . '-' . $user->map_top ) ) || ( $layer == 0 && isset($events['i' . $event_pos]) && $event_pos == $user->map_left . '-' . $user->map_top ) )
        {
            $event_script = new EventScript($event_script_data['i' . $event_pos]);
            $script = array();

            while ( $data = $event_script->script(true, false) )
            {
                // javascript instruction
                $script[] = '\'' . quotes($data) . '\'';
            }

            $javascript .= 'script_eval(0, new Array(' . implode(', ', $script) . '));';
        }

        js_eval($javascript, $refresh_id);
    }

} else {
    if ( $user->refresh == 1 ) {
        $user->set('refresh', 0);
    }

    if ( $user->teleport == 1 ) {
        $user->set('teleport', 0);
    }

    if ( $config->chat_history == 0 ) // no chat history
    {
        $result = $db->sql_query('SELECT MAX(id) AS last_id FROM ' . CHATBOX_TABLE . " WHERE cat_id ='b$user->battle_id'");

        if ($last_id = $db->sql_fetchrow($result)) {
            $last_id = $last_id['last_id'];
        }

        if (empty($last_id)) {
            $last_id = 0;
        }
    }
    else // chat history
    {
        $result = $db->sql_query('SELECT u.name, c.message, c.id FROM ' . USERS_TABLE . ' u, ' . CHATBOX_TABLE . " c WHERE u.id = c.user_id AND c.cat_id = 'b$user->battle_id' ORDER BY c.id DESC LIMIT 0,$config->chat_history");

        $row = array();
        while ($value = $db->sql_fetchrow($result)) {
            $row[] = $value;
        }

        while ($value = array_pop($row)) {
            $template->assign_block_vars('add_chat', array(
                'NAME' => $value['name'],
                'MESSAGE' => $value['message']
            ));
            $last_id = $value['id'];
        }

        if (!isset($last_id)) {
            $result = $db->sql_query('SELECT MAX(id) AS last_id FROM ' . CHATBOX_TABLE . " WHERE cat_id ='b$user->battle_id'");

            if ($last_id = $db->sql_fetchrow($result)) {
                $last_id = $last_id['last_id'];
            }

            if (empty($last_id)) {
                $last_id = 0;
            }
        }
    }

    $rs = $db->sql_query("select * from ".BATTLES_TABLE." WHERE  id = $user->battle_id");
    $rs = $db->sql_fetchrow($rs);
    $template->assign_vars(array(
        'L_POST_MESSAGE' => $lang->post_message,
        'L_BATTLE' => $lang->battle,
        'L_ALLIES' => $lang->allies,
        'L_OPPONENTS' => $lang->opponents,
        'L_BATTLE_MENU' => $lang->battle_menu,
        'USER_ID' => $user->id,
        'REFRESH_METHOD' => $config->refresh_method,
        'L_CHATBOX' => $lang->chatbox,
        'CHATBOX_STATE' => $user->chatbox_state,
        'LAST_CHAT_ID' => $last_id,
        'BATTLE_BACKGROUND' => $rs['background'],
        'USER_SPEED' => 0,
        'L_BASIC_ACTION' => $lang->basic_action,
        'L_ACT_ATTACK' => $lang->act_attack,
        'L_ACT_DEFEND' => $lang->act_defend,
        'L_ACT_FLEE' => $lang->act_flee,
        'L_TANK_ACTION' => $lang->tank_action,
        'L_TANK_SHELLS' => $lang->tankShells,
        'L_TANK_MAIN_CANNON' => $lang->tankMainCannon,
        'L_TANK_SUBCANNON' => $lang->tankSubCannon,
        'L_TANK_SE' => $lang->tankSE,
        'L_WAIT_TURN' => $lang->wait_turn,
        'L_CLICK_TO_ATTACK' => $lang->click_to_attack,
        'L_CLICK_OPPONENT' => $lang->click_opponent,
        'L_FLOOD_ALERT' => $lang->flood_alert
    ));

    if ( !empty($rs['music']) && $user->allow_music ) {
        if (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE')) {
            $template->assign_block_vars('bgsound_ie', array(
                'MUSIC' => $rs['music']
            ));
        } else {
            $template->assign_block_vars('bgsound_ns', array(
                'MUSIC' => $rs['music']
            ));
        }
    }

    // 人物精灵图
    $rs = $db->sql_query('SELECT id,`name`,battler FROM '. USERS_TABLE ." WHERE battle_id = $user->battle_id ");
    $rows = $db->sql_fetchrows($rs);
    foreach ($rows as $row){
        $template->assign_block_vars('ally', array(
            'ID' => $row['id'],
            'NAME' => $row['name'],
            'PICTURE' => $row['battler']
        ));
    }

    //敌人精灵图
    $rs = $db->sql_query('SELECT * FROM '. OPPONENTS_TABLE ." WHERE battle_id = $user->battle_id");
    $rows = $db->sql_fetchrows($rs);

    foreach ($rows as $row){
        $enemy[$row['id']] = $row;
        $template->assign_block_vars('opponent', array(
            'ID' => $row['id'],
            'NAME' => $row['name'],
            'PICTURE' => $row['picture']
        ));
    }
    unset($rows);
    if (isset($enemy)){
        Session('enemy',json_encode($enemy));
    }

    $template->set_filenames(array(
        'header' => 'page_header.tpl',
        'footer' => 'page_footer.tpl',
        'body' => 'battle.tpl'
    ));

    $template->pparse('header');
    $template->pparse('body');
    $template->pparse('footer');


}

