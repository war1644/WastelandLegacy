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

MFLog(json_encode($_POST));

if ( !$user->logged_in || !$user->admin )
{
	header('Location: ' . MFPATH . $config->index . '?mod=login');
	exit;
}

$mode = ( isset($_POST['mode']) ) ? 'POST.' . trim($_POST['mode']) : (( isset($_GET['mode']) ) ? 'GET.' . trim($_GET['mode']) : '' );

if ( $mode == 'GET.synchro_pic' )
{
	// synchronisation des charsets des classes
	$result = $db->sql_query('SELECT classname, charaset FROM ' . CLASSES_TABLE . ' WHERE classname != \'\'');

	while ( $row = $db->sql_fetchrow($result) )
	{
		if ( !empty($row['charaset']) && $size = getimagesize(MFPATH . 'images/charasets/' . $row['charaset']) )
		{
			$db->sql_query('UPDATE ' . CLASSES_TABLE . ' SET pic_width = ' . $size[0] . ', pic_height = ' . $size[1] . ' WHERE classname = \'' . quotes($row['classname']) . '\'');
		}
		else
		{
			$db->sql_query('UPDATE ' . CLASSES_TABLE . ' SET pic_width = 0, pic_height = 0 WHERE classname = \'' . quotes($row['classname']) . '\'');
		}
	}

	// synchronisation des charsets des personnages
	$result = $db->sql_query('SELECT id, charaset FROM ' . USERS_TABLE . ' WHERE id > 1');

	while ( $row = $db->sql_fetchrow($result) )
	{
		if ( !empty($row['charaset']) && $size = @getimagesize(MFPATH . 'images/charasets/' . $row['charaset']) )
		{
			$db->sql_query('UPDATE ' . USERS_TABLE . ' SET pic_width = ' . $size[0] . ', pic_height = ' . $size[1] . ' WHERE id = ' . $row['id']);
		}
		else
		{
			$db->sql_query('UPDATE ' . USERS_TABLE . ' SET pic_width = 0, pic_height = 0 WHERE id = ' . $row['id']);
		}
	}

	// synchronisation des charsets des �v�nements
	$result = $db->sql_query('SELECT id, picture, dir FROM ' . EVENTS_TABLE);

	while ( $row = $db->sql_fetchrow($result) )
	{
		if ( $row['dir'] == '' && !empty($row['picture']) && $size = @getimagesize(MFPATH . 'images/sprites/' . $row['picture']) )
		{
			$db->sql_query('UPDATE ' . EVENTS_TABLE . ' SET pic_width = ' . $size[0] . ', pic_height = ' . $size[1] . ' WHERE id = ' . $row['id']);
		}
		elseif ( !empty($row['picture']) && $size = @getimagesize(MFPATH . 'images/charasets/' . $row['picture']) )
		{
			$db->sql_query('UPDATE ' . EVENTS_TABLE . ' SET pic_width = ' . $size[0] . ', pic_height = ' . $size[1] . ' WHERE id = ' . $row['id']);
		}
		else
		{
			$db->sql_query('UPDATE ' . EVENTS_TABLE . ' SET pic_width = 0, pic_height = 0 WHERE id = ' . $row['id']);
		}
	}


	$lang->load_keys('synchro_pic');

	message_die($lang->synchro_pic_title, $lang->synchro_pic_success);
}
elseif ( $mode == 'POST.save_tileset' ) // sauver tileset
{
	$refresh_id = 1;

	if ( !isset($_POST['tileset_id'], $_POST['tileset_name'], $_POST['lower_img'], $_POST['lower_value'], $_POST['upper_img'], $_POST['upper_value']) )
	{
		exit;
	}

	$tileset_id = intval($_POST['tileset_id']);
	$tileset_name = htmlspecialchars(trim($_POST['tileset_name']));
	$lower_tiles_img = explode(',', trim($_POST['lower_img']));
	$lower_tiles_value = explode(',', trim($_POST['lower_value']));
	$upper_tiles_img = explode(',', trim($_POST['upper_img']));
	$upper_tiles_value = explode(',', trim($_POST['upper_value']));

	$key = 0;
	while ( isset($lower_tiles_img[$key], $lower_tiles_value[$key]) )
	{
		if ( !isset($lower_tiles_img[$key]) || !preg_match('`^([a-z0-9\-_]+)\.(png|gif|jpeg|jpg)$`i', $lower_tiles_img[$key]) )
		{
			$lower_tiles_img[$key] = '';
		}

		$lower_tiles_value[$key] = ( isset($lower_tiles_value[$key]) ) ? intval($lower_tiles_value[$key]) : 0;
		$key++;
	}

	$key = 0;
	while ( isset($upper_tiles_img[$key], $upper_tiles_value[$key]) )
	{
		if ( !isset($upper_tiles_img[$key]) || !preg_match('`^([a-z0-9\-_]+)\.(png|gif|jpeg|jpg)$`i', $upper_tiles_img[$key]) )
		{
			$upper_tiles_img[$key] = '';
		}

		$upper_tiles_value[$key] = intval($upper_tiles_value[$key]);
		$key++;
	}
    $tmp = base64_encode(serialize(array(array($lower_tiles_img, $lower_tiles_value), array($upper_tiles_img, $upper_tiles_value))));
	$db->sql_query('UPDATE ' . TILESETS_TABLE . " SET name = '$tileset_name', tiles ='$tmp' WHERE id = $tileset_id");

	$lang->load_keys('tileset_editor');
	js_eval('alert(\'' . $lang->tileset_saved . '\');saved=true;', $refresh_id, 1);
}
elseif ( $mode == 'POST.save_event' ) // sauver �v�nement
{
	$refresh_id = 1;

	if ( !isset($_POST['event_id'], $_POST['event_layer'], $_POST['event_dir'], $_POST['event_name'], $_POST['event_picture'], $_POST['text_script']) )
	{
		exit;
	}

	$event_id = intval($_POST['event_id']);
	$event_layer = ( $_POST['event_layer'] != 0 ) ? 1 : 0;
	$event_dir = ( preg_match('`^([0-3])_([0-3])_([0-1])$`', $_POST['event_dir'], $matches) ) ? $matches[1] . ',' . $matches[2] . ',' . $matches[3] : '';
	$event_name = htmlspecialchars(trim($_POST['event_name']));
	$event_picture = trim($_POST['event_picture']);
	$text_script = trim($_POST['text_script']);

	if ( $event_dir == '' )
	{
		$picture_path = MFPATH . 'images/sprites/';
	}
	else
	{
		$picture_path = MFPATH . 'images/charasets/';
	}

	$size = @getimagesize($picture_path . $event_picture);

	if ( !is_array($size) )
	{
		$width = 0;
		$height = 0;
	}
	else
	{
		$width = intval($size[0]);
		$height = intval($size[1]);
	}

    require(INC.'functions_map.php');
	$event_script = new EventScript();

	list($compiled, $result) = $event_script->compile($text_script);
	if ( !$compiled )
	{
		die('<pre>'.$result.'</pre>');
		js_eval('alert(\'' . $result . '\');', $refresh_id, 1);
	}
    $tmp = base64_encode(serialize($result));
    $text_script = addslashes($text_script);
	$sql = 'UPDATE ' . EVENTS_TABLE . " SET dir = '$event_dir', `name` = '$event_name', picture = '$event_picture', pic_width = $width, pic_height = $height, text_script ='$text_script', script = '$tmp', layer = '$event_layer' WHERE id = $event_id";
	$db->sql_query($sql);
	//$db->sql_query('UPDATE ' . USERS_TABLE . ' SET refresh = 1 WHERE id > 1');

	$lang->load_keys('event_editor');
	js_eval('alert(\'' . $lang->event_saved . '\');', $refresh_id, 1);
}
elseif ( $mode == 'POST.default_start_position' ) // 设置初始玩家位置
{
	$refresh_id = 1;
	$lang->load_keys('map_editor');

	if (isset($_POST['map_id'], $_POST['map_left'], $_POST['map_top'], $_POST['map_dir']) )
	{
		$map_dir = intval($_POST['map_dir']);

		if ( $map_dir == 6 )
		{
			$map_dir = 0;
		}
		elseif ( $map_dir == 7 )
		{
			$map_dir = 1;
		}
		elseif ( $map_dir == 8 )
		{
			$map_dir = 2;
		}
		else
		{
			$map_dir = 3;
		}

		$map_id = intval($_POST['map_id']);
		$map_left = intval($_POST['map_left']);
		$map_top = intval($_POST['map_top']);

		$config->set('default_location', $map_id . ',' . $map_left . ',' . $map_top . ',' . $map_dir);
		$config->update_db();
		js_eval("alert('$lang->action_done');", $refresh_id, 1);
	}
	else
	{
		exit;
	}
}
elseif ( $mode == 'POST.players_position' ) // 设置已注册玩家的位置
{
	$refresh_id = 1;
	$lang->load_keys('map_editor');
	if (isset($_POST['map_id'], $_POST['map_left'], $_POST['map_top'], $_POST['map_dir']) )
	{
		$map_dir = intval($_POST['map_dir']);

		if ( $map_dir == 10 )
		{
			$map_dir = 0;
		}
		elseif ( $map_dir == 11 )
		{
			$map_dir = 1;
		}
		elseif ( $map_dir == 12 )
		{
			$map_dir = 2;
		}
		else
		{
			$map_dir = 3;
		}

		$map_id = intval($_POST['map_id']);
		$map_left = intval($_POST['map_left']);
		$map_top = intval($_POST['map_top']);

		$db->sql_query('UPDATE ' . USERS_TABLE . " SET refresh = 1, map_id = $map_id, map_left = $map_left, map_top = $map_top, map_dir = $map_dir WHERE id > 1");

		js_eval("alert('$lang->action_done'));", $refresh_id, 1);
	}
	else
	{
		exit;
	}
}
elseif ( $mode == 'POST.preset_event' ) // �v�nement pr�d�fini
{
	$refresh_id = 1;
	$lang->load_keys('map_editor');

	if ( !isset($_POST['event_type']) )
	{
		exit;
	}

	if ( $_POST['event_type'] == 'teleport' && isset($_POST['map_id'], $_POST['map_left'], $_POST['map_top'], $_POST['map_dir'], $_POST['map_name']) )
	{
		$map_dir = intval($_POST['map_dir']);

		if ( $map_dir == 2 )
		{
			$map_dir = ' down';
		}
		elseif ( $map_dir == 3 )
		{
			$map_dir = ' left';
		}
		elseif ( $map_dir == 4 )
		{
			$map_dir = ' up';
		}
		elseif ( $map_dir == 5 )
		{
			$map_dir = ' right';
		}
		else
		{
			$map_dir = '';
		}

		$map_id = intval($_POST['map_id']);
		$map_left = intval($_POST['map_left']);
		$map_top = intval($_POST['map_top']);
		$map_name = htmlspecialchars(trim(urldecode($_POST['map_name'])));
		$text_script = 'TELEPORT ' . $map_id . ',' . $map_left . ',' . $map_top . $map_dir;

		$event_name = $lang->teleport . ' : ' . $map_id . '. ' . $map_name . ' [' . $map_left . ',' . $map_left . ']';

		$size = @getimagesize(MFPATH . 'images/sprites/' . $config->preset_teleport_sprite);

		if ( !is_array($size) )
		{
			$width = 0;
			$height = 0;
		}
		else
		{
			$width = intval($size[0]);
			$height = intval($size[1]);
		}


		require(INC.'functions_map.php');

		$event_script = new EventScript();

		list($compiled, $result) = $event_script->compile($text_script);

		if ( !$compiled )
		{
			js_eval('alert(\'' . quotes($result) . '\');', $refresh_id, 1);
		}
        $tmp = base64_encode(serialize($result));
		$db->sql_query('INSERT INTO ' . EVENTS_TABLE . "(`name`, picture, pic_width, pic_height, dir, text_script, script, layer) VALUES('$event_name','$config->preset_teleport_sprite', $width,$height, '', '$text_script', '$tmp', 0)");
        $id = $db->lastId();
		$lang->load_keys('event_editor');
		js_eval('alert(\'' . quotes($lang->event_saved) . '\');remake_event_list(' . $id . ', \'' . quotes($event_name) . '\', \'' . quotes($config->preset_teleport_sprite) . '\', ' . $width . ', ' . $height . ', false);', $refresh_id, 1);
	}
	else
	{
		exit;
	}
}
elseif ( $mode == 'GET.event_editor' ) // �diteur d'�v�nement
{
	if ( empty($_GET['event_id']) )
	{
		header('Location: ' . MFPATH . $config->index . '?mod=admin.map&mode=select_event_to_edit');
		exit;
	}

	$lang->load_keys('event_editor');

	$event_id = intval($_GET['event_id']);

	$result = $db->sql_query('SELECT * FROM ' . EVENTS_TABLE . ' WHERE id = ' . $event_id);

	if ( !$event = $db->sql_fetchobject($result) )
	{
		message_die('Error !', 'Could not get event data');
	}

	$commands = array(
		0 => $lang->create_condition,
		1 => $lang->show_message,
		2 => $lang->set_message_align,
		3 => $lang->set_message_time,
		4 => $lang->set_message_face,
		5 => $lang->display_choice,
		6 => $lang->input_string,
		7 => $lang->wait,
		8 => $lang->modify_var,
		9 => $lang->teleport_character,
		10 => $lang->exec_javascript,
		11 => $lang->exec_php
    );

	foreach ( $commands as $key => $val )
	{
		$template->assign_block_vars('command_list', array(
			'ID' => $key,
			'VALUE' => $val
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->event_editor,
		'REFRESH_METHOD' => $config->refresh_method,
		'EVENT_ID' => $event->id,
		'EVENT_PICTURE' => htmlspecialchars($event->picture),
		'EVENT_PICTURE_TYPE' => (( $event->dir == '' ) ? 'sprites' : 'charasets'),
		'EVENT_NAME' => $event->name,
		'EVENT_DIR' => str_replace(',', '_', $event->dir),
		'EVENT_LAYER' => $event->layer,
		'TEXT_SCRIPT' => htmlspecialchars($event->text_script)
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.event_editor.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.select_event_to_edit' )
{
	$lang->load_keys('select_event_to_edit');

	$result = $db->sql_query('SELECT id, name FROM ' . EVENTS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('event_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->edit_event
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.select_event_to_edit.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.select_tileset_to_edit' )
{
	$lang->load_keys('select_tileset_to_edit');

	$result = $db->sql_query('SELECT id, name FROM ' . TILESETS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('tileset_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->edit_tileset
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.select_tileset_to_edit.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.select_tileset_to_export' )
{
	$lang->load_keys('select_tileset_to_export');

	$result = $db->sql_query('SELECT id, name FROM ' . TILESETS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('tileset_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->export_tileset
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.select_tileset_to_export.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'POST.export_tileset' )
{
	if ( empty($_POST['tileset_id']) )
	{
		header('Location: ' . MFPATH . $config->index . '?mod=admin.map&mode=select_tileset_to_export');
		exit;
	}

	$tileset_id = intval($_POST['tileset_id']);

	$result = $db->sql_query('SELECT tiles, `name`, cols FROM ' . TILESETS_TABLE . ' WHERE id = ' . $tileset_id);

	if ( !$row = $db->sql_fetchrow($result) )
	{
		message_die('Error !', 'Could not get tileset !');
	}

	$tiles_images = array();
	$tileset = array();
	$tileset_name = $row['name'];
	$tileset['name'] = $row['name'];
	$tileset['tiles'] = $row['tiles'];
	$tileset['cols'] = $row['cols'];

	$row['tiles'] = unserialize(base64_decode($row['tiles']));

	foreach ( $row['tiles'][0][0] as $val ) // couche inf�rieure
	{
		if ( !empty($val) )
		{
			$tiles_images[$val] = '';
		}
	}

	foreach ( $row['tiles'][1][0] as $val ) // couche sup�rieure
	{
		if ( !empty($val) )
		{
			$tiles_images[$val] = '';
		}
	}

	foreach ( $tiles_images as $key => $val )
	{
		$tiles_images[$key] = file_get_contents(MFPATH . 'images/tiles/' . $key);
	}

	$tileset['tiles_images'] = $tiles_images;
	$tileset = base64_encode(serialize($tileset));
	$tileset = gzencode($tileset, 9);
	$filename = MFPATH . $config->cache_dir . $tileset_id . '_' . preg_replace('`([^a-z0-9\-_\.])`', '_', $tileset_name) . '.tileset';

	if ( !$handle = fopen($filename, 'w') )
	{
		message_die($lang->error, 'Could not write file');
	}

	$result = fwrite($handle, $tileset);
	fclose($handle);

	header('Location: ' . $filename);
	exit;

}
elseif ( $mode == 'GET.import_tileset' )
{
	$lang->load_keys('import_tileset');

	if ( !empty($_FILES['tileset_file']) )
	{
		if ( $_FILES['tileset_file']['error'] )
		{
			message_die($lang->error, $lang->upload_error);
		}

		//$tileset = file_get_contents($_FILES['tileset_file']['tmp_name']);

		ob_start();
		readgzfile($_FILES['tileset_file']['tmp_name']);
		$tileset = unserialize(base64_decode(ob_get_contents()));
		ob_end_clean();

		if ( !isset($tileset['name'], $tileset['cols'], $tileset['tiles'], $tileset['tiles_images']) )
		{
			message_die($lang->error, $lang->invalid_file);
		}

		foreach ( $tileset['tiles_images'] as $key => $val )
		{
			if ( !is_file(MFPATH . 'images/tiles/' . $key) ) // si le fichier image n'existe pas, on le cr�e
			{
				$handle = fopen(MFPATH . 'images/tiles/' . $key, 'w');
				$result = fwrite($handle, $val);
				fclose($handle);
			}
		}

		$result = $db->sql_query('SELECT MAX(id) AS max FROM ' . TILESETS_TABLE);
		$id = $db->sql_fetchrow($result);
		$id = $id['max'] + 1;

		if ( $db->sql_query('INSERT INTO ' . TILESETS_TABLE . '(id, name, cols, tiles) VALUES(' . $id . ', \'' . quotes($tileset['name']) . '\', ' . intval($tileset['cols']) . ', \'' . quotes($tileset['tiles']) . '\')') )
		{
			redirect($lang->importation_succeeded, $lang->importation_succeeded_explain, $config->index . '?mod=admin.map&mode=import_tileset');
		}

	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->import_tileset
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.import_tileset.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');

}
elseif ( $mode == 'GET.tileset_editor' ) // 编辑瓦片集
{
	if ( empty($_GET['tileset_id']) )
	{
		header('Location: ' . BASE_URL . 'index.php?mod=admin.map&mode=select_tileset_to_edit');
		exit;
	}

	$tileset_id = intval($_GET['tileset_id']);

	$result = $db->sql_query('SELECT tiles, `name`, cols FROM ' . TILESETS_TABLE . ' WHERE id = ' . $tileset_id);

	if ( !$row = $db->sql_fetchrow($result) )
	{
		message_die('Error !', 'Could not get tileset !');
	}

	$row['tiles'] = unserialize(base64_decode($row['tiles']));

	$tileset_cols = $row['cols'];
	
	$lower_tiles_img = array();
	$lower_tiles_value = array();
	$upper_tiles_img = array();
	$upper_tiles_value = array();

	$i = 0;
	while ( isset($row['tiles'][0][0][$i], $row['tiles'][0][1][$i]) )
	{
        if (!$row['tiles'][0][0][$i]){
            $lower_tiles_img[]='\'town_0.png\'';
            $lower_tiles_value[] = 0;
        }else{
            $lower_tiles_img[] = '\'' . $row['tiles'][0][0][$i] . '\'';
            $lower_tiles_value[] = $row['tiles'][0][1][$i];
        }

		$i++;
	}

	$i = 0;
	while ( isset($row['tiles'][1][0][$i], $row['tiles'][1][1][$i]) )
	{
//		$upper_tiles_img[] = '\'' . quotes($row['tiles'][1][0][$i]) . '\'';
//		$upper_tiles_value[] = $row['tiles'][1][1][$i];
        if (!$row['tiles'][1][0][$i]){
            $upper_tiles_img[]='\'town_0.png\'';
            $upper_tiles_value[] = 0;
        }else{
            $upper_tiles_img[] = '\'' . $row['tiles'][1][0][$i] . '\'';
            $upper_tiles_value[] = $row['tiles'][1][1][$i];
        }
		$i++;
	}

	$lower_size = count($lower_tiles_value);
	$upper_size = count($upper_tiles_value);

	$lower_tiles_img = 'new Array(' . implode(',', $lower_tiles_img) . ')';
	$lower_tiles_value = 'new Array(' . implode(',', $lower_tiles_value) . ')';
	$upper_tiles_img = 'new Array(' . implode(',', $upper_tiles_img) . ')';
	$upper_tiles_value = 'new Array(' . implode(',', $upper_tiles_value) . ')';
	$tileset_name = $row['name'];

	$lang->load_keys('tileset_editor');

	$tileset_id = intval($_GET['tileset_id']);

//	require(MFPATH . 'includes/functions_map.' . $config->phpex);

	$result = $db->sql_query('SELECT id, name FROM ' . TILESETS_TABLE . ' ORDER BY id ASC');

	$scripts = array();

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('tileset_list', array(
			'ID' => $row['id'],
			'NAME' => $row['name']
			));
	}

	$fileNameArr = scandir(MFPATH . 'images/tiles/');
    sort($fileNameArr, SORT_NATURAL | SORT_FLAG_CASE);
    $count = count($fileNameArr);
    for ($i=2; $i < $count ; $i++) {
        if ( preg_match( '`([a-z0-9\-_]+)\.(png|gif|jpeg|jpg)$`i', $fileNameArr[$i] ) ) {
            $template->assign_block_vars( 'tile', ['FILENAME' => $fileNameArr[$i]] );
        }
    }

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->tileset_editor,
		'TILESET_TILES_LOWER' => $lower_size,
		'TILESET_TILES_UPPER' => $upper_size,
		'TILESET_BGCOLOR' => $config->tileset_bgcolor,
		'LOWER_TILES_IMG' => $lower_tiles_img,
		'LOWER_TILES_VALUE' => $lower_tiles_value,
		'UPPER_TILES_IMG' => $upper_tiles_img,
		'UPPER_TILES_VALUE' => $upper_tiles_value,
		'TILESET_NAME' => $tileset_name,
		'TILESET_ID' => $tileset_id,
		'TILESET_COLS' => $tileset_cols,
		'TILE_SIZE' => $config->tile_size,
		'REFRESH_METHOD' => $config->refresh_method
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.tileset_editor.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.select_map_to_edit' )
{
	$lang->load_keys('select_map_to_edit');

	$result = $db->sql_query('SELECT id, name FROM ' . MAPS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('map_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->edit_map
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.select_map_to_edit.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.resize_map' )
{
	$lang->load_keys('resize_map');

	if ( isset($_POST['map_id'], $_POST['map_width'], $_POST['map_height']) )
	{
		$map_id = $_POST['map_id'];
		$map_width = ( intval($_POST['map_width']) < 1 ) ? 1 : intval($_POST['map_width']);
		$map_height = ( intval($_POST['map_height']) < 1 ) ? 1 : intval($_POST['map_height']);

		$result = $db->sql_query('SELECT blocs FROM ' . MAPS_TABLE . ' WHERE id = ' . $map_id);

		if ( !$row = $db->sql_fetchrow($result) )
		{
			exit;
		}

		$map_old_blocs = unserialize(base64_decode($row['blocs']));
		$map_old_width = count($map_old_blocs[0][0]);
		$map_old_height = count($map_old_blocs[0]);
		$map_blocs = array(array(), array(), array());
	
		$i = 0;
		while ( $i < $map_height )
		{
			if ( $i < $map_old_height )
			{
				$map_blocs[0][$i] = $map_old_blocs[0][$i];
				$map_blocs[1][$i] = $map_old_blocs[1][$i];
				$map_blocs[2][$i] = $map_old_blocs[2][$i];

				if ( $map_old_width > $map_width )
				{
					$k = $map_width;
					while ( isset($map_blocs[0][$i][$k]) )
					{
						unset($map_blocs[0][$i][$k]);
						unset($map_blocs[1][$i][$k]);
						unset($map_blocs[2][$i][$k]);
						$k++;
					}
				}
				else
				{
					$k = $map_old_width;
					while ( $k < $map_width )
					{
						$map_blocs[0][$i][] = 0;
						$map_blocs[1][$i][] = 0;
						$map_blocs[2][$i][] = 0;
						$k++;
					}
				}
			}
			else
			{
				$map_blocs[0][$i] = array();
				$map_blocs[1][$i] = array();
				$map_blocs[2][$i] = array();

				$k = 0;
				while ( $k < $map_width )
				{
					$map_blocs[0][$i][] = 0;
					$map_blocs[1][$i][] = 0;
					$map_blocs[2][$i][] = 0;
					$k++;
				}
			}
			$i++;
		}

		$k = $map_height;
		while ( isset($map_blocs[0][$k]) )
		{
			unset($map_blocs[0][$k]);
			unset($map_blocs[1][$k]);
			unset($map_blocs[2][$k]);
			$k++;
		}
        $tmp = base64_encode(serialize($map_blocs));
		$db->sql_query('UPDATE ' . MAPS_TABLE . " SET blocs = '$tmp' WHERE id = $map_id");

		message_die($lang->resize_map, $lang->map_resized, $config->index . '?mod=admin.map&mode=resize_map');
	}

	$result = $db->sql_query('SELECT id, name FROM ' . MAPS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('map_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->resize_map
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.resize_map.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.delete_map' )
{
	$lang->load_keys('delete_map');

	if ( !empty($_POST['delete_map']) && !empty($_POST['map_id']) )
	{
		$map_id = intval($_POST['map_id']);

		$db->sql_query('DELETE FROM ' . MAPS_TABLE . ' WHERE id = ' . $map_id);

		redirect($lang->delete_map, $lang->map_deleted, $config->index . '?mod=admin.map&mode=delete_map');
	}

	$result = $db->sql_query('SELECT id, name FROM ' . MAPS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('map_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->delete_map
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.delete_map.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.delete_tileset' )
{
	$lang->load_keys('delete_tileset');

	if ( !empty($_POST['delete_tileset']) && !empty($_POST['tileset_id']) )
	{
		$tileset_id = intval($_POST['tileset_id']);

		$result = $db->sql_query('SELECT id FROM ' . TILESETS_TABLE . ' ORDER BY id ASC LIMIT 0,2');

		$id1 = $db->sql_fetchrow($result);
		$id1 = $id1['id'];

		if ( !$id2 = $db->sql_fetchrow($result) )
		{
			message_die($lang->not_delete_tileset, $lang->this_is_last_tileset);
		}
		$id2 = $id2['id'];

		if ( $id1 == $tileset_id )
		{
			$id = $id2;
		}
		else
		{
			$id = $id1;
		}

		$db->sql_query('DELETE FROM ' . TILESETS_TABLE . ' WHERE id = ' . $tileset_id);
		$db->sql_query('UPDATE ' . MAPS_TABLE . ' SET tileset = ' . $id . ' WHERE tileset = ' . $tileset_id);

		redirect($lang->delete_tileset, $lang->tileset_deleted, $config->index . '?mod=admin.map&mode=delete_tileset');
	}

	$result = $db->sql_query('SELECT id, name FROM ' . TILESETS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('tileset_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->delete_tileset
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.delete_tileset.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.delete_event' )
{
	$lang->load_keys('delete_event');

	if ( !empty($_POST['delete_event']) && !empty($_POST['event_id']) )
	{
		$event_id = intval($_POST['event_id']);

		$db->sql_query('DELETE FROM ' . EVENTS_TABLE . ' WHERE id = ' . $event_id);

		redirect($lang->delete_event, $lang->event_deleted, $config->index . '?mod=admin.map&mode=delete_event');
	}

	$result = $db->sql_query('SELECT id, name FROM ' . EVENTS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('event_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->delete_event
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.delete_event.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.create_map' )
{
	$lang->load_keys('create_map');

	if ( !empty($_POST['create_map']) && isset($_POST['map_name'], $_POST['map_tileset'], $_POST['map_width'], $_POST['map_height']) )
	{
		$map_name = htmlspecialchars(trim($_POST['map_name']));
		$map_tileset = intval($_POST['map_tileset']);
		$map_width = ( intval($_POST['map_width']) < 1 ) ? 1 : intval($_POST['map_width']);
		$map_height = ( intval($_POST['map_height']) < 1 ) ? 1 : intval($_POST['map_height']);
		$map_blocs = array(array(), array(), array());

		$i = 0;
		while ( $i < $map_height )
		{
			$v = $value = array();
			$j = 0;
			while ( $j < $map_width )
			{
				$value[] = 0;
                $v[] = '';
                $j++;
			}
			$map_blocs[0][] = $value;//down layer
			$map_blocs[1][] = $value;//up layer
			$map_blocs[2][] = $value;//event layer
			$j = 0;
			$i++;
		}
		unset($value,$v);

        $map_blocs = base64_encode(serialize($map_blocs));

		$db->sql_query('INSERT INTO ' . MAPS_TABLE . "(`name`, blocs, tileset) VALUES('$map_name', '$map_blocs', '$map_tileset')");
		$id = $db->lastId();

		header('Location:' . BASE_URL .'index.php?mod=admin.map&mode=map_editor&map_id=' . $id);
		exit;
	}

	$result = $db->sql_query('SELECT id, `name` FROM ' . TILESETS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('tileset_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->create_map
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.create_map.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.create_event' )
{
	$lang->load_keys('create_event');

	if ( !empty($_POST['create_event']) && isset($_POST['event_name']) )
	{
		$event_name = htmlspecialchars(trim($_POST['event_name']));

		$result = $db->sql_query('SELECT MAX(id) AS max FROM ' . EVENTS_TABLE);
		$id = $db->sql_fetchrow($result);
		$id = $id['max'] + 1;

		$db->sql_query('INSERT INTO ' . EVENTS_TABLE . '(id, name, picture, pic_width, pic_height, dir, text_script, script, layer) VALUES(' . $id . ', \'' . quotes($event_name) . '\', \'\', 0, 0, \'\', \'\', \'a:0:{}\', 0)');

		header('Location: ' . BASE_URL . 'index.php?mod=admin.map&mode=event_editor&event_id=' . $id);
		exit;
	}

	$result = $db->sql_query('SELECT id, name FROM ' . TILESETS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('tileset_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->create_event
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.create_event.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.create_tileset' )
{
	$lang->load_keys('create_tileset');
	if ( !empty($_POST['create_tileset']) && isset($_POST['tileset_name'], $_POST['tileset_tiles_lower'], $_POST['tileset_tiles_upper'], $_POST['tileset_cols']) )
	{
		$tileset_name = htmlspecialchars(trim($_POST['tileset_name']));
		$tileset_tiles_lower = intval($_POST['tileset_tiles_lower']);
		$tileset_tiles_upper = intval($_POST['tileset_tiles_upper']);
		$tileset_cols = intval($_POST['tileset_cols']);

		$lower_tiles_img = array();
		$lower_tiles_value = array();
		$upper_tiles_img = array();
		$upper_tiles_value = array();

		$key = 0;
		while ( $key < $config->tileset_tiles_lower || $key < $tileset_tiles_lower )
		{
			$lower_tiles_img[$key] = 'town_0.png';
			$lower_tiles_value[$key] = 0;
			$key++;
		}

		$key = 0;
		while ( $key < $config->tileset_tiles_upper || $key < $tileset_tiles_upper )
		{
			$upper_tiles_img[$key] = 'town_0.png';
			$upper_tiles_value[$key] = 0;
			$key++;
		}
        $tmp = base64_encode(serialize(array(array($lower_tiles_img, $lower_tiles_value), array($upper_tiles_img, $upper_tiles_value))));
		$db->sql_query('INSERT INTO ' . TILESETS_TABLE . "(`name`, tiles, cols) VALUES( '$tileset_name','$tmp',$tileset_cols)");
        $id = $db->lastId();
		header('Location: ' . BASE_URL. 'index.php?mod=admin.map&mode=tileset_editor&tileset_id=' . $id);
		exit;
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->create_tileset,
		'TILESET_TILES_LOWER' => $config->tileset_tiles_lower,
		'TILESET_TILES_UPPER' => $config->tileset_tiles_upper,
		'TILESET_COLS' => $config->tileset_cols
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.create_tileset.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'POST.save_map' ) // 保存地图
{
	$refresh_id = 1;
	if ( !isset($_POST['map_id'], $_POST['tileset_id'], $_POST['old_tileset_id'], $_POST['col_map'], $_POST['map_name'], $_POST['lower_map'], $_POST['upper_map'], $_POST['event_map'], $_POST['map_music']) )
	{
		exit;
	}

	$map = array(array(), array(), array());

	$map_id = intval($_POST['map_id']);
	$tileset_id = intval($_POST['tileset_id']);
	$col_map = intval($_POST['col_map']);
	$map_name = htmlspecialchars(trim($_POST['map_name']));
	$map_music = trim($_POST['map_music']);
    $lower_map = explode(',', trim($_POST['lower_map']));
    $upper_map = explode(',', trim($_POST['upper_map']));
    $event_map = explode(',', trim($_POST['event_map']));

	if ( !isset($lower_map[0], $upper_map[0]) )
	{
		exit;
	}

	$i = 0;
	while ( isset($lower_map[$i], $upper_map[$i], $event_map[$i]) )
	{
		$key = 0;
		$lower_value = array();
		$upper_value = array();
		$event_value = array();
		while ( $key < $col_map )
		{
			$lower_value[$key] = ( isset($lower_map[$i]) ) ? intval($lower_map[$i]) : 0;
			$upper_value[$key] = ( isset($upper_map[$i]) ) ? intval($upper_map[$i]) : 0;
			$event_value[$key] = ( isset($event_map[$i]) ) ? intval($event_map[$i]) : 0;

			$i++;
			$key++;
		}

		$map[0][] = $lower_value;
		$map[1][] = $upper_value;
		$map[2][] = $event_value;
	}


    $tmp = base64_encode(serialize($map));
	$db->sql_query('UPDATE ' . MAPS_TABLE . " SET name = '$map_name', tileset = '$tileset_id', blocs = '$tmp', music = '$map_music', optimized = '$config->optimize_maps' WHERE id = $map_id");
//	$db->sql_query('UPDATE ' . USERS_TABLE . ' SET refresh = 1 WHERE id > 1 AND map_id = ' . $map_id);
    if ( $config->optimize_maps == 1 )
    {
        //生成地图图片
        // get map data
        $result = $db->sql_query('SELECT tiles FROM ' .TILESETS_TABLE . " WHERE id=$tileset_id");

        if ( !$row = $db->sql_fetchrow($result) )
        {
            exit;
        }

        $map_tiles = unserialize(base64_decode($row['tiles']));
        $map_blocs = $map;
        unset($map,$tmp);
        $map_count_x = count($map_blocs[0][0]);
        $map_count_y = count($map_blocs[0]);
        $map_width = $map_count_x * $config->tile_size;
        $map_height = $map_count_y * $config->tile_size;

        // create lower picture
        $picture = imagecreate($map_width, $map_height);
        $background_type = strtolower(substr($map_tiles[0][0][0], -4));

        $size = getimagesize(MFPATH . 'images/tiles/' . $map_tiles[0][0][0]);
        $bg_width = $size[0];
        $bg_height = $size[1];

        if ( $background_type == '.png' )
        {
            $y = 0;
            while ( $y < $bg_height )
            {
                $x = 0;
                while ( $x < $bg_height )
                {
                    imagecopy($picture, imagecreatefrompng(MFPATH . 'images/tiles/' . $map_tiles[0][0][0]), $x * $bg_width, $y * $bg_height, 0, 0, $bg_width, $bg_height);

                    $x++;
                }
                $y++;
            }
        }
        elseif ( $background_type == '.gif' )
        {
            $y = 0;
            while ( $y < $bg_height )
            {
                $x = 0;
                while ( $x < $bg_height )
                {
                    imagecopy($picture, imagecreatefromgif(MFPATH . 'images/tiles/' . $map_tiles[0][0][0]), $x * $bg_width, $y * $bg_height, 0, 0, $bg_width, $bg_height);

                    $x++;
                }
                $y++;
            }
        }
        elseif ( $background_type == '.jpg' || $background_type == '.jpeg' )
        {
            $y = 0;
            while ( $y < $bg_height )
            {
                $x = 0;
                while ( $x < $bg_height )
                {
                    imagecopy($picture, imagecreatefromjpeg(MFPATH . 'images/tiles/' . $map_tiles[0][0][0]), $x * $bg_width, $y * $bg_height, 0, 0, $bg_width, $bg_height);

                    $x++;
                }
                $y++;
            }
        }

        $y = 0;
        while ( $y < $map_count_y )
        {
            $x = 0;
            while ( $x < $map_count_x )
            {
                // lower layer
                if ( $map_blocs[0][$y][$x] != 0 && strtolower(substr($map_tiles[0][0][$map_blocs[0][$y][$x]], -4)) == '.png' )
                {
                    imagecopy($picture, imagecreatefrompng(MFPATH . 'images/tiles/' . $map_tiles[0][0][$map_blocs[0][$y][$x]]), $x * $config->tile_size, $y * $config->tile_size, 0, 0, $config->tile_size, $config->tile_size);
                }
                // upper layer 1
//                if ( $map_blocs[1][$y][$x] != 0 && strtolower(substr($map_tiles[1][0][$map_blocs[1][$y][$x]], -4)) == '.png' && $map_tiles[1][1][$map_blocs[1][$y][$x]] != 2 )//
//                {
//                    $png = imagecreatefrompng(MFPATH . 'images/tiles/' . $map_tiles[1][0][$map_blocs[1][$y][$x]]);
//                    imagecopy($picture, $png, $x * $config->tile_size, $y * $config->tile_size, 0, 0, $config->tile_size, $config->tile_size);
//                }

                $x++;
            }
            $y++;
        }

        if ( is_file(MFPATH . $config->cache_dir . 'map_' . $map_id . '_0.png') )
        {
            unlink(MFPATH . $config->cache_dir . 'map_' . $map_id . '_0.png');
        }

        imagepng($picture, MFPATH . $config->cache_dir . 'map_' . $map_id . '_0.png');
        imagedestroy($picture);

        // create upper picture 1
        $picture = imagecreate($map_width, $map_height);
        $bg = imagecolorallocate($picture, 0, 0, 0);
        imagecolortransparent($picture, $bg);
        $y = 0;
        while ( $y < $map_count_y )
        {
            $x = 0;
            while ( $x < $map_count_x )
            {
                // upper layer 1
                if ( $map_blocs[1][$y][$x] != 0 && strtolower(substr($map_tiles[1][0][$map_blocs[1][$y][$x]], -4)) == '.png' && $map_tiles[1][1][$map_blocs[1][$y][$x]] != 2 )
                {
                    imagecopy($picture, imagecreatefrompng(MFPATH . 'images/tiles/' . $map_tiles[1][0][$map_blocs[1][$y][$x]]), $x * $config->tile_size, $y * $config->tile_size, 0, 0, $config->tile_size, $config->tile_size);
                }

                $x++;
            }
            $y++;
        }

        if ( is_file(MFPATH . $config->cache_dir . 'map_' . $map_id . '_2.png') )
        {
            unlink(MFPATH . $config->cache_dir . 'map_' . $map_id . '_2.png');
        }

        imagepng($picture, MFPATH . $config->cache_dir . 'map_' . $map_id . '_2.png');

        imagedestroy($picture);


        // create upper picture 2
        $picture = imagecreate($map_width, $map_height);
        $bg = imagecolorallocate($picture, 0, 0, 0);
        imagecolortransparent($picture, $bg);

        // upper layer 2（透明层）
        $y = 0;
        while ( $y < $map_count_y )
        {
            $x = 0;
            while ( $x < $map_count_x )
            {
                if ( $map_blocs[1][$y][$x] != 0 && strtolower(substr($map_tiles[1][0][$map_blocs[1][$y][$x]], -4)) == '.png' && $map_tiles[1][1][$map_blocs[1][$y][$x]] == 2 )
                {
                    imagecopy($picture, imagecreatefrompng(MFPATH . 'images/tiles/' . $map_tiles[1][0][$map_blocs[1][$y][$x]]), $x * $config->tile_size, $y * $config->tile_size, 0, 0, $config->tile_size, $config->tile_size);
                }

                $x++;
            }
            $y++;
        }

        if ( is_file(MFPATH . $config->cache_dir . 'map_' . $map_id . '_1.png') )
        {
            unlink(MFPATH . $config->cache_dir . 'map_' . $map_id . '_1.png');
        }

        imagepng($picture, MFPATH . $config->cache_dir . 'map_' . $map_id . '_1.png');
        imagedestroy($picture);
    }
	$lang->load_keys('map_editor');
	
	if ( $tileset_id != intval($_POST['old_tileset_id']) )
	{
		js_eval("alert($lang->map_saved);document.location.href='$config->index?mod=admin.map&mode=map_editor&map_id=$map_id';", $refresh_id, 1);
	}
	else
	{
		js_eval("alert('$lang->map_saved');saved=true;", $refresh_id, 1);
	}
}
elseif ( $mode == 'GET.map_editor' ) // 编辑地图
{
	if ( empty($_GET['map_id']) )
	{
		header('Location: ' . BASE_URL . $config->index . '?mod=admin.map&mode=select_map_to_edit');
		exit;
	}

	$map_id = intval($_GET['map_id']);

	$result = $db->sql_query('SELECT m.*, t.tiles, t.cols FROM ' . MAPS_TABLE . ' m, ' . TILESETS_TABLE . ' t WHERE m.id = ' . $map_id . ' AND t.id = m.tileset');

	if ( !$row = $db->sql_fetchrow($result) )
	{
		message_die('Error', 'Could not get map data');
	}

	$lang->load_keys('map_editor');

	$tileset_id = ( isset($_GET['tileset_id']) ) ? intval($_GET['tileset_id']) : 0;
	$refresh_id = 1;

	$row['tiles'] = unserialize(base64_decode($row['tiles']));
	$tileset_cols = $row['cols'];
	
	$lower_tiles_img = array();
	$lower_tiles_value = array();
	$upper_tiles_img = array();
	$upper_tiles_value = array();

	$i = 0;

	while ( isset($row['tiles'][0][0][$i], $row['tiles'][0][1][$i]) )
	{
		$lower_tiles_img[] = '\''.$row['tiles'][0][0][$i].'\'';
		$lower_tiles_value[] = $row['tiles'][0][1][$i];

		$i++;
	}

	$i = 0;

	while ( isset($row['tiles'][1][0][$i], $row['tiles'][1][1][$i]) )
	{
		$upper_tiles_img[] = '\''.$row['tiles'][1][0][$i]. '\'';
		$upper_tiles_value[] = $row['tiles'][1][1][$i];

		$i++;
	}
//	var_dump($upper_tiles_img);

	settype($map, 'object');

	$map->name = $row['name'];
	$map->id = $row['id'];
	$map->tiles = $row['tiles'];
	$map->tileset = $row['tileset'];
	$map->music = $row['music'];
	$map->blocs = unserialize(base64_decode($row['blocs']));
	$map->count_x = count($map->blocs[0][0]);
	$map->count_y = count($map->blocs[0]);
	$map->width = $map->count_x * $config->tile_size;
	$map->height = $map->count_y * $config->tile_size;

	for ( $x = 0; $x < $map->count_x; $x++ )
	{
		for ( $y = 0; $y < $map->count_y; $y++ )
		{
			$template->assign_block_vars('lower_bloc', array(
				'ID' => 'l' . $x . '-' . $y,
				'LEFT' => $x,
				'TOP' => $y,
				'BACKGROUND_IMAGE' => (( $map->blocs[0][$y][$x] == 0 ) ? '' : $map->tiles[0][0][$map->blocs[0][$y][$x]]),
				'Z_INDEX' => (( $map->tiles[0][1][$map->blocs[0][$y][$x]] == 0 ) ? 1 : 2),
				'VALUE' => $map->blocs[0][$y][$x]
				));
            if ($map->blocs[1][$y][$x]===''){
                continue;
            }
			$template->assign_block_vars('upper_bloc', array(
				'ID' => 'u' . $x . '-' . $y,
				'LEFT' => $x,
				'TOP' => $y,
				'BACKGROUND_IMAGE' => (( $map->blocs[1][$y][$x] == 0 ) ? '' : $map->tiles[1][0][$map->blocs[1][$y][$x]]),
				'Z_INDEX' => (( $map->tiles[1][1][$map->blocs[1][$y][$x]] == 0 ) ? 3 : (( $map->tiles[1][1][$map->blocs[1][$y][$x]] == 1 ) ? 6 : 9996)),
				'VALUE' => $map->blocs[1][$y][$x]
				));
		}
	}

	$event_coords = array();

	$i = 0;
	while ( $i < $map->count_x )
	{
		$j = 0;
		while ( $j < $map->count_y )
		{
			if ( $map->blocs[2][$j][$i] > 0 )
			{
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

	// 查询所有事件
	$result = $db->sql_query('SELECT id, `name`, picture, pic_width, pic_height, dir FROM ' . EVENTS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		if ( $row['dir'] != '' )
		{
			$row['pic_width'] = ceil($row['pic_width'] / 4);
			$row['pic_height'] = ceil($row['pic_height'] / 4);
		}

		$template->assign_block_vars('event_list', array(
			'ID' => $row['id'],
			'NAME' => $row['name'],
			'PICTURE' => $row['picture'],
			'DIR' => (( $row['dir'] == '' ) ? 'false' : 'new Array(' . $row['dir'] . ')'),
			'WIDTH' => $row['pic_width'],
			'HEIGHT' => $row['pic_height']
			));

		if ( isset($event_coords[$row['id']]) )
		{
			foreach ( $event_coords[$row['id']] as $val )
			{
				$template->assign_block_vars('event_bloc', array(
					'ID' => $row['id'],
					'LEFT' => $val[0],
					'TOP' => $val[1]
					));
			}
		}
	}

	$result = $db->sql_query('SELECT id, name FROM ' . TILESETS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('tileset_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->map_editor,
		'TILESET_TILES_LOWER' => $config->tileset_tiles_lower,
		'TILESET_TILES_UPPER' => $config->tileset_tiles_upper,
		'TILESET_BGCOLOR' => $config->tileset_bgcolor,
		'MAP_BACKGROUND' => 'images/tiles/' . $map->tiles[0][0][0],
		'MAP_NAME' => $map->name,
		'MAP_WIDTH' => $map->width,
		'MAP_HEIGHT' => $map->height,
		'MAP_ID' => $map->id,
		'MAP_MUSIC' => $map->music,
		'TILESET_ID' => $map->tileset,
		'LOWER_TILES_IMG' => 'new Array(' . implode(',', $lower_tiles_img) . ')',
		'UPPER_TILES_IMG' => 'new Array(' . implode(',', $upper_tiles_img) . ')',
		'TILE_SIZE' => $config->tile_size,
		'TILESET_COLS' => $tileset_cols,
		'COL_MAP' => count($map->blocs[0][0]),
		'ROW_MAP' => count($map->blocs[0]),
		'REFRESH_METHOD' => $config->refresh_method
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.map_editor.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.create_equipment' ) 
{



	if ( !empty($_POST['create_equipment']) && isset($_POST['name']) )
	{



		$result = $db->sql_query('SELECT MAX(id) AS max FROM phpore_equipment');
		$id = $db->sql_fetchrow($result);
		$id = $id['max'] + 1;
		$place = $_POST['map_id'];
		$type = $_POST['type'];
		$position = $_POST['position'];
		$name = $_POST['name'];
		$price = $_POST['price'];
		$attack = $_POST['attack'];
		$range = $_POST['range'];
		$defence = $_POST['defence'];
		$usable = $_POST['usable'];
		$effects = $_POST['effects'];
		// $sql = 'INSERT INTO phpore_equipment (id, place, type, position, name, price, attack, range, defence,usable,effects) VALUES('."$id,$place,$type,$position,$name,$price,$attack,$range,$defence,$usable,$effects ".')' ;
		$sql = 'INSERT INTO phpore_equipment VALUES('.$id.','.$place.','.$type.', \''.$position.' \',\''.$name.'\','.$price.',\''.$attack.'\',\''.$range.'\',\''.$defence.'\',\''.$usable.'\',\''.$effects.'\')';
		$a = $db->execSql($sql);

		// var_dump($a);
		if ($a) {
			echo "好了";
		}else{
			echo "哪里填错了";
		}
		exit;
	}



	$lang->load_keys('select_map_to_edit');

	$result = $db->sql_query('SELECT id, name FROM ' . MAPS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('map_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->edit_map
		));







	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.create_equipment.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}elseif ( $mode == 'GET.editor_equipment' ) 
{

	$result = $db->sql_query('SELECT * FROM phpore_equipment');

	while ( $row = $db->sql_fetchrow($result) )
	{
		// var_dump($row);
		$template->assign_block_vars('equipment_list', array(
			'PLACE' => $row['place'],
			'TYPE' => $row['type'],
			'POSITION' => $row['position'],
			'PRICE' => $row['price'],
			'NAME' => $row['name'],
			'ATTACK' => $row['attack'],
			'RANGE' => $row['range'],
			'DEFENCE' => $row['defence'],
			'USABLE' => $row['usable'],
			'EFFECTS' => $row['effects'],
			'ID' => $row['id']
			));
	}

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.editor_equipment.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');


}elseif ( $mode == 'GET.editors_equipment' ) 
{








	if ( !empty($_POST['editors_equipment']) && isset($_POST['id']) )
	{




		$id = $_POST['id'];
		$place = $_POST['map_id'];
		$type = $_POST['type'];
		$position = $_POST['position'];
		$name = $_POST['name'];
		$price = $_POST['price'];
		$attack = $_POST['attack'];
		$range = $_POST['range'];
		$defence = $_POST['defence'];
		$usable = $_POST['usable'];
		$effects = $_POST['effects'];

		//$sql = 'UPDATE phpore_equipment' . " SET place = '$place', type = '$type', position = '$position', name = '$name', price = '$price', attack ='$attack', range = '$range', defence = '$defence', usable = '$usable', effects = '$effects' WHERE id = $id";

		$sql = 'UPDATE phpore_equipment' . " SET place = '$place', type = '$type', position = '$position', name = '$name', price = '$price', attack ='$attack' ,defence = '$defence' , usable = '$usable', effects = '$effects' , `range` =  '$range'  WHERE id = $id";


		// echo $sql;
		$a = $db->execSql($sql);

		// var_dump($a);
		if ($a) {
			echo "<script>alert('好了!');location.href='/index.php?mod=admin.map&mode=editor_equipment';</script>"; 
			// sleep(2);
			// header('Location: ' . MFPATH . $config->index . '?mod=admin.map&mode=editor_equipment');

		}else{
			echo "哪里填错了";
		}
		exit;
	}







	$id = $_GET['id'];
	$row = $db->getRow('SELECT * FROM phpore_equipment WHERE id = ' . $id);

	$template->assign_vars(array(
			'PLACE' => $row['place'],
			'TYPE' => $row['type'],
			'POSITION' => $row['position'],
			'PRICE' => $row['price'],
			'ATTACK' => $row['attack'],
			'RANGE' => $row['range'],
			'DEFENCE' => $row['defence'],
			'USABLE' => $row['usable'],
			'EFFECTS' => $row['effects'],
			'NAME' => $row['name'],
			'ID' => $row['id']
		));

	$lang->load_keys('select_map_to_edit');

	$result = $db->sql_query('SELECT id, name FROM ' . MAPS_TABLE . ' ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('map_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->edit_map
		));





	// var_dump($result);
	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.editors_equipment.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');


}