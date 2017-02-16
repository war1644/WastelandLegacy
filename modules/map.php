<?php

/*

Program: phpore
Author: Jeremy Faivre
Contact: http://www.jeremyfaivre.com/about
Year: 2005

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

*/

if ( !defined('IN_PHPORE') )
{
	exit;
}

if ( !$user->logged_in )
{
	header('Location: ' . $config->path . $config->index . '?mod=default');
	exit;
}

$mode = ( isset($_GET['mode']) ) ? 'GET.' . trim($_GET['mode']) : '';

if ( $mode == 'GET.stop' )
{
	message_die($lang->session_stop, $lang->session_stop_explain);
}

elseif ( $mode == 'GET.disp' )
{
    require($config->path . 'includes/functions_map.' . $config->phpex);

	$serialized_script = serialize(array());

	$event_script = new EventScript($serialized_script);

	$text = '';
	$script = '';
	
	while ( $data = $event_script->script(false, false) )
	{
		$i = $event_script->condition_id + 1;

		if ( isset($data[2]) && $data[2] == 1 )
		{
			$tab = array('<ul style="list-style-type:none">', '');
		}
		elseif ( isset($data[2]) && $data[2] == 2 )
		{
			$tab = array('', '</ul>');
		}
		elseif ( isset($data[2]) && $data[2] == 3 )
		{
			$tab = array('<ul style="list-style-type:none">', '</ul>');
		}
		else
		{
			$tab = array('', '');
		}

		$text .= '[ ' . $data[0] . ' ]<br />';
		$script .= $tab[1] . '<li><code title="' . $data[0] . '">' . $data[1] . '</code></li>' . $tab[0];
	}

	echo 'database : <br />' , $serialized_script , '<br /><br />';
	echo 'commands : <br />' , $text , '<br /><br />';
	echo 'script :<ul style="list-style-type:none">' , $script , '</ul>';
}
elseif ( $mode == 'GET.submit' )
{
    require(INC.'functions_map.php');

	$refresh_id = 2;

	$map_sid = ( isset($_GET['map_sid']) ) ? intval($_GET['map_sid']) : 0;
	if ( $map_sid < $user->map_sid )
	{
		js_eval('map_session_stop();', $refresh_id);
	}
	if ( $user->refresh == 1 || $user->in_battle )
	{
		js_eval('map_session_restart();', $refresh_id);
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
		js_eval('alert(\'Error !\');map_session_restart();', $refresh_id);
	}

	while ( $data = $event_script->script(true, false) )
	{
		// javascript instruction
		$script[] = '\'' . quotes($data) . '\'';
	}

	$javascript .= 'script_eval(' . $event_key . ', new Array(' . implode(', ', $script) . '));';

    js_eval($javascript, $refresh_id);
}
elseif ( $mode == 'GET.refresh' || $mode == 'GET.event')
{
	require(INC . 'functions_map.php');

	$result = $db->sql_query('SELECT m.id, m.name, m.blocs, t.tiles FROM ' . MAPS_TABLE . ' m, ' . TILESETS_TABLE . ' t WHERE m.id = ' . $user->map_id . ' AND m.tileset = t.id');

	if ( !$map = $db->sql_fetchobject($result) )
	{
		die('Could not get map data');
	}

	if ( $user->in_battle )
	{
		js_eval('map_session_restart();', $refresh_id);
	}

	if ( $mode == 'GET.refresh' )
	{
		$refresh_id = 1;
	}
	else
	{
		$refresh_id = 2;
	}

	$map->tiles = unserialize(base64_decode($map->tiles));
	$map->blocs = unserialize(base64_decode($map->blocs));
	$map->count_x = count($map->blocs[0][0]);
	$map->count_y = count($map->blocs[0]);
	$map->width = $map->count_x * $config->tile_size;
	$map->height = $map->count_y * $config->tile_size;

	// if the character is not in the limits of map
	if ( $user->map_left < 0 || $user->map_left >= $map->count_x ||  $user->map_top < 0 || $user->map_top >= $map->count_y )
	{
		if ( $user->start_location != '' )
		{
			list($user->map_id, $user->map_left, $user->map_top, $user->map_dir) = explode(',', $user->start_location);
		}
		else
		{
			list($user->map_id, $user->map_left, $user->map_top, $user->map_dir) = explode(',', $config->default_location);
		}

		$user->map_id = intval($user->map_id);
		$user->map_left = intval($user->map_left);
		$user->map_top = intval($user->map_top);
		$user->map_dir = intval($user->map_dir);

		$user->set('map_id', $user->map_id);
		$user->set('map_left', $user->map_left);
		$user->set('map_top', $user->map_top);
		$user->set('map_dir', $user->map_dir);
	}

	if ( ( $mode == 'GET.refresh' && ( !isset($_GET['table'], $_GET['move_id'], $_GET['map_sid'], $_GET['players']) || !is_numeric($_GET['map_sid']) || !preg_match('`^a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)$`', $_GET['table'], $table) || !preg_match('`^([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)$`', $_GET['move_id'], $move_id) || !preg_match('`^(p[0-9]+-[0-9]+)+$`', $_GET['players']) ) ) || ( $mode == 'GET.event' && ( !isset($_GET['table'], $_GET['move_id'], $_GET['map_sid'], $_GET['layer'], $_GET['event_pos']) || !is_numeric($_GET['map_sid']) || ( $_GET['layer'] != 0 && $_GET['layer'] != 1 ) || !preg_match('`^a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)_a([0-9]+)-([0-9]+)$`', $_GET['table'], $table) || !preg_match('`^([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)_([0-9]+)$`', $_GET['move_id'], $move_id) || !preg_match('`^([0-9]+-[0-9]+)$`', $_GET['event_pos'], $event_pos) ) ) )
	{
		js_eval('alert(\'Error\');map_session_restart();', $refresh_id);
	}

	if ( isset($_GET['chat_pos']) && preg_match('`^([0-9]+)-([0-9]+)-([0-9]+)$`', $_GET['chat_pos'], $matches) )
	{
		$user->set('chatbox_state', implode(',', array($matches[1], $matches[2], $matches[3])));
	}
	
	$user->set('map_last_visit', $config->server_time);

	$map_sid = ( isset($_GET['map_sid']) ) ? intval($_GET['map_sid']) : 0;
	if ( $map_sid < $user->map_sid )
	{
		js_eval('map_session_stop();', $refresh_id);
	}
	if ( $user->refresh == 1 )
	{
		js_eval('map_session_restart();', $refresh_id);
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
                $db->sql_query('INSERT INTO ' . CHATBOX_TABLE . '(cat_id, user_id, time, message) VALUES(\'m' . $user->map_id . '\', ' . $user->id . ', ' . $config->server_time . ', \'' . addslashes(htmlspecialchars(stripslashes(trim($chatbox_content[$i])))) . '\')');
			}
			$i++;
		}
	}

	$chat_last_id = ( isset($_GET['chat_last']) ) ? intval($_GET['chat_last']) : -1; // get chatbox messages

	if ( $chat_last_id > -1 )
	{
		$result = $db->sql_query('SELECT u.name, c.message, c.id FROM ' . USERS_TABLE . ' u, ' . CHATBOX_TABLE . ' c WHERE u.id = c.user_id AND u.id != ' . $user->id . ' AND c.cat_id = \'m' . $user->map_id . '\' AND c.id > ' . $chat_last_id . ' ORDER BY c.id ASC');

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

	// update player moves
	$last_moves = array();

	$i = 1;
	while ( $i < 17 )
	{
		if ( $move_id[$i] > 0 )
		{
			$last_moves[$move_id[$i]] = array('left' => $table[2*$i-1], 'top' => $table[2*$i], 'bloc_id' => 'a' . $table[2*$i-1] . '-' . $table[2*$i]);
		}
		$i++;
	}

	ksort($last_moves);
	//print_r($last_moves);

	// events in map

	$events = array();
	$bloc_events = array();
	$event_script_data = array();

	$event_ids = array();
	$event_coords = array();

	$i = 0;
	while ( $i < $map->count_x )
	{
		$j = 0;
		while ( $j < $map->count_y )
		{
			if ( $map->blocs[2][$j][$i] > 0 )
			{
				$event_ids[] = $map->blocs[2][$j][$i];
				if ( !isset($event_coords[$map->blocs[2][$j][$i]]) )
				{
					$event_coords[$map->blocs[2][$j][$i]] = array();
				}
				$event_coords[$map->blocs[2][$j][$i]][] = array($i, $j);
			}
			$j++;
		}
		$i++;
	}

	if ( count($event_ids) > 0 )
	{
		// events in map
		$result = $db->sql_query('SELECT * FROM ' . EVENTS_TABLE . ' WHERE id = ' . implode(' OR id = ', $event_ids));

		while ( $row = $db->sql_fetchrow($result) )
		{
			foreach ( $event_coords[$row['id']] as $val ) 
			{
				$events['i' . $val[0] . '-' . $val[1]] = true;
				$event_script_data['i' . $val[0] . '-' . $val[1]] = $row['script'];
				if ( $row['layer'] == 1 )
				{
					$bloc_events['i' . $val[0] . '-' . $val[1]] = true;
				}
			}
		}
	}

	//$n_moves = $user->map_moves;
	$user->map_moves_table = unserialize($user->map_moves_table);

	foreach ( $last_moves as $key => $val )
	{
		if ( $key > $user->map_moves )
		{
			if ( $user->map_left < $val['left'] )
			{
				// move right
				if ( isset($map->blocs[0][$user->map_top][$user->map_left+1]) && $map->tiles[0][1][$map->blocs[0][$user->map_top][$user->map_left+1]] != 1 && $map->tiles[1][1][$map->blocs[1][$user->map_top][$user->map_left+1]] != 1 && !isset($bloc_events['i' . ($user->map_left+1) . '-' . $user->map_top]) )
				{
					$user->map_left++;
				}

				$user->map_dir = 3;
			}
			elseif ( $user->map_left > $val['left'] )
			{
				// move left
				if ( isset($map->blocs[0][$user->map_top][$user->map_left-1]) && $map->tiles[0][1][$map->blocs[0][$user->map_top][$user->map_left-1]] != 1 && $map->tiles[1][1][$map->blocs[1][$user->map_top][$user->map_left-1]] != 1 && !isset($bloc_events['i' . ($user->map_left-1) . '-' . $user->map_top]) )
				{
					$user->map_left--;
				}

				$user->map_dir = 1;
			}
			elseif ( $user->map_top < $val['top'] )
			{
				// move down
				if ( isset($map->blocs[0][$user->map_top+1][$user->map_left]) && $map->tiles[0][1][$map->blocs[0][$user->map_top+1][$user->map_left]] != 1 && $map->tiles[1][1][$map->blocs[1][$user->map_top+1][$user->map_left]] != 1 && !isset($bloc_events['i' . $user->map_left . '-' . ($user->map_top+1)]) )
				{
					$user->map_top++;
				}

				$user->map_dir = 0;
			}
			elseif ( $user->map_top > $val['top'] )
			{
				// move top
				if ( isset($map->blocs[0][$user->map_top-1][$user->map_left]) && $map->tiles[0][1][$map->blocs[0][$user->map_top-1][$user->map_left]] != 1 && $map->tiles[1][1][$map->blocs[1][$user->map_top-1][$user->map_left]] != 1 && !isset($bloc_events['i' . $user->map_left . '-' . ($user->map_top-1)]) )
				{
					$user->map_top--;
				}

				$user->map_dir = 2;
			}

			$user->map_moves = $key;
			$user->map_moves_table[$user->map_moves] = $val['bloc_id'];
			unset($user->map_moves_table[$user->map_moves-17]);
		}
	}

	$user->map_moves_table = serialize($user->map_moves_table);

	//$db->sql_query('UPDATE ' . USERS_TABLE . ' SET map_moves = ' . $user->map_moves . ', map_moves_table = \'' . quotes($user->map_moves_table) . '\', map_dir = ' . $user->map_dir . ', map_left = ' . $user->map_left . ', map_top = ' . $user->map_top . ' WHERE id = ' . $user->id);

	$user->set('map_moves', $user->map_moves);
	$user->set('map_moves_table', $user->map_moves_table);
	$user->set('map_dir', $user->map_dir);
	$user->set('map_left', $user->map_left);
	$user->set('map_top', $user->map_top);

	// if client and server player position are different, we must refresh the page to fix this problem
	if ( !isset($_GET['x'], $_GET['y'], $_GET['map_id']) || ( $user->teleport != 1 && ( $_GET['x'] != $user->map_left || $_GET['y'] != $user->map_top || $_GET['map_id'] != $user->map_id ) ) )
	{
		//js_eval('alert(\'invalid position : ' . $_GET['x'] . ';' . $_GET['y'] . ' => ' . $user->map_left . ';' . $user->map_top . '\');map_session_restart();', $refresh_id); // debug
		js_eval('map_session_restart();', $refresh_id);
	}

	if ( $mode == 'GET.refresh' ) // refresh map events, players
	{
		// get other players data

		$map_players = $_GET['players'];
		$players = array();

		while ( preg_match('`p([0-9]+)-([0-9]+)`', $map_players, $matches) )
		{
			$players[$matches[1]] = $matches[2];
			$map_players = str_replace($matches[0], '', $map_players);
		}

		unset($players[$user->id]);

		//js_eval('alert(\'' . serialize($players) . '\');');

		$players_sql = array();
		foreach ( $players as $key => $val )
		{
			$players_sql[] = $key;
		}

		if ( count($players_sql) > 0 )
		{
			$players_sql = ' OR ( ( map_previous_id = ' . $user->map_id . ' OR map_id = ' . $user->map_id . ' ) AND ( id = ' . implode(' OR id = ', $players_sql) . ' ) )';
		}
		else
		{
			$players_sql = '';
		}
$time = time()-30;
        $sql = 'SELECT * FROM '. USERS_TABLE ." WHERE id != $user->id and (map_last_visit > ($config->server_time - 30) and map_id = $user->map_id AND teleport = 0) $players_sql";
        $rs = $db->sql_query($sql,1);
        $rows = $db->sql_fetchrows($rs);



        foreach ($rows as $row)
		{
			// this is a new player, add it
			if ( !isset($players[$row['id']]) )
			{

				$javascript .= 'add_player(' . $row['id'] . ', \'' . quotes($row['name']) . '\', \'' . quotes($row['charaset']) . '\', ' . $row['map_left'] . ', ' . $row['map_top'] . ', ' . $row['map_dir'] . ', ' . $row['map_moves'] . ', ' . ceil($row['pic_width'] / 4) . ', ' . ceil($row['pic_height'] / 4) . ');';
				$javascript .= 'setTimeout(\'' . quotes('chat_add(player[' . $row['id'] . '].name, \'' . quotes($lang->join_map) . '\', true);') . '\', 1000);';
			}
			else // the player exists, check if he has moved
			{
				if ( $row['map_last_visit'] < ($config->server_time - 30) )
				{
					$javascript .= 'chat_add(player[' . $row['id'] . '].name, \'' . quotes($lang->quit_map) . '\', true);';
					$javascript .= 'remove_player(' . $row['id'] . ');';
				}

				$row['map_moves_table'] = unserialize($row['map_moves_table']);

				if ( $players[$row['id']] + 15 < $row['map_moves'] )
				{
					js_eval('alert(\'to many moves !\');map_session_restart();', $refresh_id);
				}

				$javascript .= 'battle(' . $row['id'] . ', ' . $row['battle_id'] . ', ' . $row['battle_state'] . ');';

				while ( $players[$row['id']] < $row['map_moves'] )
				{
					$players[$row['id']]++;

					$javascript .= 'move_map_player(\'' . $row['map_moves_table'][$players[$row['id']]] . '\', ' . $players[$row['id']] . ', ' . $row['id'] . ', 1);';
				}
				
				unset($players[$row['id']]);
			}
		}

		/*while ( list($key, ) = each($players) ) // now these players are not in this map
		{
			$javascript .= 'remove_player(' . $key . ');';
		}*/

		// update map
		$javascript = 'map_session_refresh();' . $javascript;
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
    if ( $user->in_battle ) {
		header('Location: ' . $config->path . $config->index . '?mod=battle');
		exit();
	}

	if ( $user->refresh == 1 ) {
        $user->set('refresh', 0);
    }

	if ( $user->teleport == 1 ) {
        $user->set('teleport', 0);
    }

	// get map data
	$result = $db->sql_query('SELECT m.id, m.name, m.blocs, m.music, m.optimized, t.tiles FROM ' . MAPS_TABLE . ' m, ' . TILESETS_TABLE . ' t WHERE m.id = ' . $user->map_id . ' AND m.tileset = t.id');

	if ( !$map = $db->sql_fetchobject($result) ) {
	    //设置玩家在地图的位置
        if ($user->start_location != '') {
            list($user->map_id, $user->map_left, $user->map_top, $user->map_dir) = explode(',', $user->start_location);
        } else {
            list($user->map_id, $user->map_left, $user->map_top, $user->map_dir) = explode(',', $config->default_location);
        }

        $user->map_id = intval($user->map_id);
        $user->map_left = intval($user->map_left);
        $user->map_top = intval($user->map_top);
        $user->map_dir = intval($user->map_dir);

        $user->set('map_id', $user->map_id);
        $user->set('map_left', $user->map_left);
        $user->set('map_top', $user->map_top);
        $user->set('map_dir', $user->map_dir);

        $user->update_db();
        $config->update_db();

        if (!isset($_GET['redirect_header'])) {
            header('Location: ' . $config->path . $config->index . '?mod=map&redirect_header=1');
        }
        exit;
    }
	$map->tiles = unserialize(base64_decode($map->tiles));
	$map->blocs = unserialize(base64_decode($map->blocs));
	$map->count_x = count($map->blocs[0][0]);
	$map->count_y = count($map->blocs[0]);
	$map->width = $map->count_x * $config->tile_size;
	$map->height = $map->count_y * $config->tile_size;
	$map->optimized = ( $config->optimize_maps == 1 && $map->optimized == 1 && is_file($config->path . $config->cache_dir . 'map_' . $map->id . '_0.png') && is_file($config->path . $config->cache_dir . 'map_' . $map->id . '_1.png') ) ? true : false;

	$user->set('map_sid', $user->map_sid + 1);

	if ( $map->optimized ) {
        $template->assign_block_vars('map_image', array(
            'PICTURE' => $config->cache_dir . 'map_' . $map->id . '_0.png',
            'Z_INDEX' => 1
        ));
        $template->assign_block_vars('map_image', array(
            'PICTURE' => $config->cache_dir . 'map_' . $map->id . '_2.png',
            'Z_INDEX' => 2
        ));

        $template->assign_block_vars('map_image', array(
            'PICTURE' => $config->cache_dir . 'map_' . $map->id . '_1.png',
            'Z_INDEX' => 9995
        ));
    }

    $event_ids = array();
    $event_coords = array();
	for ( $x = 0; $x < $map->count_x; $x++ ) {
        for ($y = 0; $y < $map->count_y; $y++) {
            if ( $map->blocs[2][$y][$x] > 0 ) {
                $event_ids[] = $map->blocs[2][$y][$x];
                if ( !isset( $event_coords[$map->blocs[2][$y][$x]] ) ) {
                    $event_coords[$map->blocs[2][$y][$x]] = [];
                }
                $event_coords[$map->blocs[2][$y][$x]][] = [$x, $y];
            }
            // 地图下图层
            $template->assign_block_vars('lower_bloc', array(
                'ID' => 'l' . $x . '-' . $y,
                'LEFT' => $x,
                'TOP' => $y,
                'Z_INDEX' => (($map->tiles[0][1][$map->blocs[0][$y][$x]] == 0) ? 1 : 2)
            ));
            // 地图上图层
            $template->assign_block_vars('upper_bloc', array(
                'ID' => 'u' . $x . '-' . $y,
                'LEFT' => $x,
                'TOP' => $y,
                'Z_INDEX' => (($map->tiles[1][1][$map->blocs[1][$y][$x]] == 0) ? 3 : (($map->tiles[1][1][$map->blocs[1][$y][$x]] == 1) ? 6 : 9995))
            ));
        }
    }

	$template->assign_block_vars('add_player_bloc', array(
		'ID' => $user->id,
		'BATTLE_ID' => $user->battle_id,
		'BATTLE_STATE' => $user->battle_state,
		'NAME' => $user->name,
		'CHARASET' => $user->charaset,
		'LEFT' => $user->map_left,
		'TOP' => $user->map_top,
		'DIR' => $user->map_dir,
		'MOVES' => $user->map_moves,
		'WIDTH' => ceil($user->pic_width / 4),
		'HEIGHT' => ceil($user->pic_height / 4)
		));

	// 地图里的精灵图
    $time = time();
    $sql = 'SELECT `name`, id, map_left, map_top, map_dir, map_moves, charaset, pic_width, pic_height, battle_id, battle_state FROM '. USERS_TABLE ." WHERE id != $user->id and map_id = $user->map_id and battle_id>0 and map_last_visit > ($config->server_time - 30)";
    $rs = $db->sql_query($sql,1);
    $rows = $db->sql_fetchrows($rs);
    foreach ($rows as $row){
        $template->assign_block_vars('add_player_bloc', array(
            'ID' => $row['id'],
            'BATTLE_ID' => $row['battle_id'],
            'BATTLE_STATE' => $row['battle_state'],
            'NAME' => $row['name'],
            'CHARASET' => $row['charaset'],
            'LEFT' => $row['map_left'],
            'TOP' => $row['map_top'],
            'DIR' => $row['map_dir'],
            'MOVES' => $row['map_moves'],
            'WIDTH' => ceil($row['pic_width'] / 4),
            'HEIGHT' => ceil($row['pic_height'] / 4)
        ));
    }



	if ( count($event_ids) > 0 ) {
        // events in map
        $result = $db->sql_query('SELECT * FROM ' . EVENTS_TABLE . ' WHERE id = ' . implode(' OR id = ', $event_ids));

        while ($row = $db->sql_fetchrow($result)) {
            if ($row['dir'] != '') {
                $row['pic_width'] = ceil($row['pic_width'] / 4);
                $row['pic_height'] = ceil($row['pic_height'] / 4);
            }

            foreach ($event_coords[$row['id']] as $val) {
                $template->assign_block_vars('event_bloc', array(
                    'ID' => 'i' . $val[0] . '-' . $val[1],
//                    'ID' => $row['id'],
                    'LEFT' => $val[0],
                    'TOP' => $val[1],
                    'PICTURE' => $row['picture'],
                    'DIR' => (($row['dir'] == '') ? 'false' : '[' . $row['dir'] . ']'),
                    'LAYER' => $row['layer'],
                    'WIDTH' => $row['pic_width'],
                    'HEIGHT' => $row['pic_height']
                ));
            }
        }
    }

	if ( $config->chat_history == 0 ) // no chat history
    {
        $result = $db->sql_query('SELECT MAX(id) AS last_id FROM ' . CHATBOX_TABLE . ' WHERE cat_id = \'m' . $user->map_id . '\'');

        if ($last_id = $db->sql_fetchrow($result)) {
            $last_id = $last_id['last_id'];
        }

        if (empty($last_id)) {
            $last_id = 0;
        }
    }
	else // chat history
    {
        $result = $db->sql_query('SELECT u.name, c.message, c.id FROM ' . USERS_TABLE . ' u, ' . CHATBOX_TABLE . ' c WHERE u.id = c.user_id AND c.cat_id = \'m' . $user->map_id . '\' ORDER BY c.id DESC LIMIT 0, ' . $config->chat_history);

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
            $result = $db->sql_query('SELECT MAX(id) AS last_id FROM ' . CHATBOX_TABLE . ' WHERE cat_id = \'m' . $user->map_id . '\'');

            if ($last_id = $db->sql_fetchrow($result)) {
                $last_id = $last_id['last_id'];
            }

            if (empty($last_id)) {
                $last_id = 0;
            }
        }
    }

	/*$template->assign_block_vars('player_bloc', array(
		'ID' => 'p' . $user->id,
		'NAME' => $user->name,
		'LEFT' => 'left:' . ( $user->map_left * $config->tile_size - 8 ) . 'px;',
		'TOP' => 'top:' . ( $user->map_top * $config->tile_size - $config->tile_size ) . 'px;',
		'CHARASET' => $user->charaset,
		'BACKGROUND_IMAGE' => 'background-image:url(classes/images/' . (( $user->map_dir == 0 ) ? $user->charaset . '_01.png' : (( $user->map_dir == 1 ) ? $user->charaset . '_05.png' : (( $user->map_dir == 2 ) ? $user->charaset . '_13.png' : $user->charaset . '_09.png' ))) . ');',
		'Z_INDEX' => 'z-index:' . (8 + $user->map_top) . ';'
		));*/

	$lang->load_keys('map');

	if ( !empty($_GET['event_status']) && preg_match('`^([0-9a-f]{32})$`', $_GET['event_status']) && $_GET['event_status'] == $user->event_status )
	{
		$event_status = true;
	}
	else
	{
		$event_status = false;
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->page_map . ' : ' . $map->name,
		'MAP_BACKGROUND' => (( $map->optimized ) ? '' : 'background-image:url(images/tiles/' . $map->tiles[0][0][0] . ');'),
		'MAP_NAME' => $map->name,
		'MAP_WIDTH' => $map->width,
		'MAP_HEIGHT' => $map->height,
		'TILE_SIZE' => $config->tile_size,
		'REFRESH_METHOD' => $config->refresh_method,
		'CHARASET' => $user->charaset,
		'MAP_MOVES' => $user->map_moves,
		'MAP_SID' => $user->map_sid,
		'MAP_ID' => $user->map_id,
		'EVENT_STATUS' => (( $event_status ) ? $_GET['event_status'] : ''),
		'LAST_CHAT_ID' => $last_id,
		'PLAYER_X' => $user->map_left,
		'PLAYER_Y' => $user->map_top,
		'PLAYER_MOVING' => (( $event_status ) ? 'true' : 'false'),
		'CHATBOX_STATE' => $user->chatbox_state,
    ));

	if ( !empty($map->music) && $user->allow_music ) {
        if (strpos($_SERVER['HTTP_USER_AGENT'], 'MSIE')) {
            $template->assign_block_vars('bgsound_ie', array(
                'MUSIC' => $map->music
            ));
        } else {
            $template->assign_block_vars('bgsound_ns', array(
                'MUSIC' => $map->music
            ));
        }
    }

	$config->navigation[] = array('mod=map', 'nav_map');

	$template->set_filenames(array(
		'header' => 'page_header.tpl',
		'footer' => 'page_footer.tpl',
		'body' => 'map.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
