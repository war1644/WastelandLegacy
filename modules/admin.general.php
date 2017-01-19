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

if ( !$user->logged_in || !$user->admin )
{
	header('Location: ' . $config->path . $config->index . '?mod=login');
	exit;
}

$mode = ( isset($_POST['mode']) ) ? 'POST.' . trim($_POST['mode']) : (( isset($_GET['mode']) ) ? 'GET.' . trim($_GET['mode']) : '' );

if ( $mode == 'GET.config' ) // modifier config
{
	$lang->load_keys('general_config');

	$default_location = explode(',', $config->default_location);

	if  ( $default_location[3] == 0 )
	{
		$default_location[3] = 'down';
	}
	elseif ( $default_location[3] == 1 )
	{
		$default_location[3] = 'left';
	}
	elseif  ( $default_location[3] == 2 )
	{
		$default_location[3] = 'up';
	}
	elseif  ( $default_location[3] == 3 )
	{
		$default_location[3] = 'right';
	}

	$default_location = $default_location[0] . ',' . $default_location[1] . ',' . $default_location[2] . ' ' . $default_location[3];

	$config_vars = '';
	foreach ( $config->vars as $key => $val )
	{
		$config_vars .= '$' . str_replace(array("\n", "\r"), '', htmlspecialchars($key)) . ' = ' . str_replace(array("\n", "\r"), '', htmlspecialchars($val)) . "\n";
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->general_config,
		'CONFIG_CACHE_DIR' => htmlspecialchars($config->cache_dir),
		'CONFIG_LANGUAGE' => htmlspecialchars($config->language),
		'CONFIG_SITE_DESC' => htmlspecialchars($config->site_desc),
		'CONFIG_SITE_NAME' => htmlspecialchars($config->site_name),
		'CONFIG_TEMPLATE' => htmlspecialchars($config->template),
		'CONFIG_TIME_ZONE' => $config->time_zone,
		'CONFIG_USE_CACHE' => $config->use_cache,
		'CONFIG_USE_CACHE_0' => $config->use_cache == 0 ? ' selected="selected"' : '',
		'CONFIG_USE_CACHE_1' => $config->use_cache == 1 ? ' selected="selected"' : '',
		'CONFIG_TILE_SIZE' => $config->tile_size,
		'CONFIG_TILESET_TILES_LOWER' => $config->tileset_tiles_lower,
		'CONFIG_TILESET_TILES_UPPER' => $config->tileset_tiles_upper,
		'CONFIG_TILESET_COLS' => $config->tileset_cols,
		'CONFIG_TILESET_BGCOLOR' => $config->tileset_bgcolor,
		'CONFIG_USE_GZIP' => $config->use_gzip,
		'CONFIG_USE_GZIP_0' => $config->use_gzip == 0 ? ' selected="selected"' : '',
		'CONFIG_USE_GZIP_1' => $config->use_gzip == 1 ? ' selected="selected"' : '',
		'CONFIG_USE_OPTIMIZE_MAPS_0' => $config->optimize_maps == 0 ? ' selected="selected"' : '',
		'CONFIG_USE_OPTIMIZE_MAPS_1' => $config->optimize_maps == 1 ? ' selected="selected"' : '',
		'CONFIG_REFRESH_METHOD' => $config->refresh_method,
		'CONFIG_REFRESH_METHOD_0' => $config->refresh_method == 0 ? ' selected="selected"' : '',
		'CONFIG_REFRESH_METHOD_1' => $config->refresh_method == 1 ? ' selected="selected"' : '',
		'CONFIG_OPTIMIZE_MAPS' => $config->optimize_maps,
		'CONFIG_CHAT_HISTORY' => $config->chat_history,
		'CONFIG_CHAT_HISTORY_TIME' => $config->chat_history_time,
		'CONFIG_DEFAULT_LOCATION' => $default_location,
		'CONFIG_VARS' => $config_vars,
		'CONFIG_PRESET_TELEPORT_SPRITE' => $config->preset_teleport_sprite
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.general_config.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'POST.save_config' ) // sauver config
{
	if ( !empty($_POST['cache_dir']) && is_dir($config->path . $_POST['cache_dir']) )
	{
		$config->set('cache_dir', $_POST['cache_dir']);
	}

	if ( !empty($_POST['language']) && is_file($config->path . 'language/' . $_POST['language'] . '/main.php') )
	{
		$config->set('language', $_POST['language']);
	}

	if ( !empty($_POST['template']) && is_file($config->path . 'templates/' . $_POST['template'] . '/default.tpl') )
	{
		$config->set('template', $_POST['template']);
	}

	if ( isset($_POST['site_name']) )
	{
		$config->set('site_name', trim($_POST['site_name']));
	}

	if ( isset($_POST['site_desc']) )
	{
		$config->set('site_desc', trim($_POST['site_desc']));
	}

	if ( isset($_POST['time_zone']) )
	{
		$config->set('time_zone', doubleval($_POST['time_zone']));
	}

	if ( isset($_POST['use_cache']) )
	{
		$config->set('use_cache', (( $_POST['use_cache'] == 1 ) ? 1 : 0));
	}

	if ( isset($_POST['use_gzip']) )
	{
		$config->set('use_gzip', (( $_POST['use_gzip'] == 1 ) ? 1 : 0));
	}

	if ( isset($_POST['refresh_method']) )
	{
		$config->set('refresh_method', (( $_POST['refresh_method'] == 1 ) ? 1 : 0));
	}

	if ( isset($_POST['optimize_maps']) )
	{
		$config->set('optimize_maps', (( $_POST['optimize_maps'] == 1 ) ? 1 : 0));
	}

	if ( !empty($_POST['tile_size']) && intval($_POST['tile_size']) > 0 && intval($_POST['tile_size']) < 100 )
	{
		$config->set('tile_size', intval($_POST['tile_size']));
	}

	if ( !empty($_POST['tileset_tiles_lower']) && intval($_POST['tileset_tiles_lower']) > 0 )
	{
		$config->set('tileset_tiles_lower', intval($_POST['tileset_tiles_lower']));
	}

	if ( !empty($_POST['tileset_tiles_upper']) && intval($_POST['tileset_tiles_upper']) > 0 )
	{
		$config->set('tileset_tiles_upper', intval($_POST['tileset_tiles_upper']));
	}

	if ( !empty($_POST['tileset_cols']) && intval($_POST['tileset_cols']) > 0 && intval($_POST['tileset_cols']) < 100 )
	{
		$config->set('tileset_cols', intval($_POST['tileset_cols']));
	}

	if ( !empty($_POST['tileset_bgcolor']) && ( preg_match('`^#([0-9a-f]{6})$`i', $_POST['tileset_bgcolor']) || preg_match('`^([a-z]+)$`i', $_POST['tileset_bgcolor']) ) )
	{
		$config->set('tileset_bgcolor', $_POST['tileset_bgcolor']);
	}

	if ( isset($_POST['chat_history']) && intval($_POST['chat_history']) >= 0 )
	{
		$config->set('chat_history', intval($_POST['chat_history']));
	}

	if ( isset($_POST['chat_history_time']) && intval($_POST['chat_history_time']) >= 0 )
	{
		$config->set('chat_history_time', intval($_POST['chat_history_time']));
	}

	if ( !empty($_POST['default_location']) && preg_match('`^([0-9]+) *, *([0-9]+) *, *([0-9]+) *(down|left|up|right)$`', trim($_POST['default_location']), $matches) )
	{
		if  ( $matches[4] == 'down' )
		{
			$matches[4] = 0;
		}
		elseif ( $matches[4] == 'left' )
		{
			$matches[4] = 1;
		}
		elseif  ( $matches[4] == 'up' )
		{
			$matches[4] = 2;
		}
		elseif  ( $matches[4] == 'right' )
		{
			$matches[4] = 3;
		}

		$config->set('default_location', $matches[1] . ',' . $matches[2] . ',' . $matches[3] . ',' . $matches[4]);
	}
	
	if ( isset($_POST['vars']) )
	{
		$_POST['vars'] = explode("\n", str_replace("\r", '', $_POST['vars']));
		$vars = array();

		foreach ( $_POST['vars'] as $val )
		{
			if ( preg_match('`^\$([A-Za-z0-9_]+) *= *(.*?)$`', trim($val), $matches) )
			{
				$vars[$matches[1]] = $matches[2];
				$config->set('vars_' . $matches[1], $matches[2]);
			}
		}

		foreach ( $config->vars as $key => $val )
		{
			if ( !isset($vars[$key]) )
			{
				$db->sql_query('ALTER TABLE ' . CONFIG_TABLE . ' DROP vars_' .  $key);
			}
		}
	}

	if ( !empty($_POST['preset_teleport_sprite']) && is_file($config->path . 'images/sprites/' . $_POST['preset_teleport_sprite']) )
	{
		$config->set('preset_teleport_sprite', $_POST['preset_teleport_sprite']);
	}

	$lang->load_keys('general_config');

	redirect($lang->config_updated, $lang->config_updated_explain, $config->index . '?mod=admin.general&mode=config');
}
elseif ( $mode == 'GET.select_class_to_edit' ) // choisir personnage � �diter
{
	$lang->load_keys('select_class_to_edit');

	$result = $db->sql_query('SELECT classname, class_title FROM ' . CLASSES_TABLE . ' WHERE classname != \'\' ORDER BY classname ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('class_list', array(
			'NAME' => $row['classname'],
			'TITLE' => $row['class_title']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->edit_class
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.select_class_to_edit.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.create_class' )
{
	$lang->load_keys('create_class');

	if ( !empty($_POST['classname']) && isset($_POST['class_title']) )
	{
		$classname = preg_replace('`([^a-z0-9\-_])`', '_', trim($_POST['classname']));
		$class_title = trim($_POST['class_title']);

		$db->sql_query('INSERT INTO ' . CLASSES_TABLE . ' (classname, class_title, selectable, description, charaset, battler, pic_width, pic_height, hp_plus, mp_plus, attack_plus, defense_plus, mind_plus, agility_plus, exp_curve, hp_curve, mp_curve, attack_curve, defense_curve, mind_curve, agility_curve) VALUES(\'' . quotes($classname) . '\', \'' . quotes($class_title) . '\', 0, \'\', \'\', \'\', 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)');

		header('Location: ' . $config->path . $config->index . '?mod=admin.general&mode=class_editor&classname=' . $classname);
		exit;
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->create_class
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.create_class.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.class_curve' && isset($_GET['function']) ) // modifier une classe
{
	if ( !function_exists('imagecreate') )
	{
		die('Required : GD library');
	}

	$function = trim($_GET['function']);
	$level = 1;
	$curve = array();

	$type = ( !empty($_GET['type']) ) ? trim($_GET['type']) : '';

	while ( $level < 100 )
	{
		eval('$curve[$level] = ceil(' . str_replace('X', $level, $function) . ');');

		$level++;
	}

	//$moy = ceil(array_sum($curve) / count($curve));

	$max = max($curve);

	eval('$level_1 = ceil(' . str_replace('X', 1, $function) . ');');
	eval('$level_99 = ceil(' . str_replace('X', 99, $function) . ');');

	$divide = 1;
	while ( ($max / $divide) + 1 > 399 )
	{
		$divide++;
	}

	$width = 520;
	$height = 500;
	$max = 400;

	$picture = imagecreate($width, $height);
	$white = imagecolorallocate($picture, 255, 255, 255); // background
	$black = imagecolorallocate($picture, 0, 0, 0);
	$gray = imagecolorallocate($picture, 128, 128, 128);

	if ( $type == 'hp' || $type == 'attack' || $type == 'defense' )
	{
		$color = imagecolorallocate($picture, 255, 0, 0);
		imagestring($picture, 5, 25, 25, $type, $color);
	}
	else if ( $type == 'exp' )
	{
		$color = imagecolorallocate($picture, 0, 180, 0);
		imagestring($picture, 5, 25, 25, $type, $color);
	}
	else if ( $type == 'mp' || $type == 'mind' || $type == 'agility' )
	{
		$color = imagecolorallocate($picture, 0, 0, 255);
		imagestring($picture, 5, 25, 25, $type, $color);
	}
	else
	{
		$color = $gray;
	}

	foreach ( $curve as $key => $val )
	{
		$val = ceil($val / $divide) + 1;
		imagerectangle($picture, $key * 5 + 5, $max - $val, $key * 5 + 8, $max, $color);
		imagerectangle($picture, $key * 5 + 6, $max - $val + 1, $key * 5 + 7, $max - 1, $color);
	}

	imagestring($picture, 5, 25, $max + 15, $level_1 . ' -> ' . $level_99, $black);
	imagestring($picture, 5, 25, $max + 30, $function, $gray);

	header('Content-type: image/png');
	imagepng($picture);
	imagedestroy($picture);
}
elseif ( $mode == 'GET.class_editor' ) // modifier une classe
{
	if ( empty($_GET['classname']) )
	{
		header('Location: ' . $config->path . $config->index . '?mod=admin.general&mode=select_class_to_edit');
		exit;
	}

	$result = $db->sql_query('SELECT * FROM ' . CLASSES_TABLE . ' WHERE classname = \'' . quotes($_GET['classname']) . '\' LIMIT 0,1');

	if ( !$class = $db->sql_fetchrow($result) )
	{
		exit;
	}

	$lang->load_keys('class_editor');

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->class_editor,
		'CLASSNAME' => $class['classname'],
		'CLASS_TITLE' => htmlspecialchars($class['class_title']),
		'CLASS_SELECTABLE' => $class['selectable'],
		'CLASS_DESCRIPTION' => htmlspecialchars($class['description']),
		'CLASS_CHARASET' => $class['charaset'],
		'CLASS_BATTLER' => $class['battler'],
		'CLASS_HP_PLUS' => $class['hp_plus'],
		'CLASS_MP_PLUS' => $class['mp_plus'],
		'CLASS_ATTACK_PLUS' => $class['attack_plus'],
		'CLASS_DEFENSE_PLUS' => $class['defense_plus'],
		'CLASS_MIND_PLUS' => $class['mind_plus'],
		'CLASS_AGILITY_PLUS' => $class['agility_plus'],
		'CLASS_EXP_CURVE' => htmlspecialchars($class['exp_curve']),
		'CLASS_HP_CURVE' => htmlspecialchars($class['hp_curve']),
		'CLASS_MP_CURVE' => htmlspecialchars($class['mp_curve']),
		'CLASS_ATTACK_CURVE' => htmlspecialchars($class['attack_curve']),
		'CLASS_DEFENSE_CURVE' => htmlspecialchars($class['defense_curve']),
		'CLASS_MIND_CURVE' => htmlspecialchars($class['mind_curve']),
		'CLASS_AGILITY_CURVE' => htmlspecialchars($class['agility_curve'])
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.class_editor.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'POST.save_class' ) // sauver classe
{
	if ( empty($_POST['old_classname']) )
	{
		exit;
	}

	$classname = trim($_POST['old_classname']);
	$new_classname = $classname;

	$updates = array();

	if ( !empty($_POST['classname']) && $_POST['classname'] != $_POST['old_classname'] && preg_match('`([a-z0-9\-_]+)`', $_POST['classname']) )
	{
		$new_classname = trim($_POST['classname']);
		$updates[] = 'classname = \'' . trim($_POST['classname']) . '\'';
	}

	if ( !empty($_POST['class_title']) )
	{
		$updates[] = 'class_title = \'' . quotes(trim($_POST['class_title'])) . '\'';
	}

	if ( isset($_POST['selectable']) )
	{
		$updates[] = 'selectable = ' . (( $_POST['selectable'] == 1 ) ? 1 : 0);
	}

	if ( isset($_POST['description']) )
	{
		$updates[] = 'description = \'' . quotes(trim($_POST['description'])) . '\'';
	}

	if ( isset($_POST['charaset']) && is_file($config->path . 'images/charasets/' . $_POST['charaset']) )
	{
		$updates[] = 'charaset = \'' . quotes($_POST['charaset']) . '\'';
		$size = getimagesize($config->path . 'images/charasets/' . $_POST['charaset']);
		$updates[] = 'pic_width = ' . $size[0];
		$updates[] = 'pic_height = ' . $size[1];
	}

	if ( isset($_POST['battler']) && is_file($config->path . 'images/battlers/' . $_POST['battler']) )
	{
		$updates[] = 'battler = \'' . quotes($_POST['battler']) . '\'';
	}

	if ( isset($_POST['hp_plus']) && intval($_POST['hp_plus']) >= 0 )
	{
		$updates[] = 'hp_plus = ' . intval($_POST['hp_plus']);
	}

	if ( isset($_POST['mp_plus']) && intval($_POST['mp_plus']) >= 0 )
	{
		$updates[] = 'mp_plus = ' . intval($_POST['mp_plus']);
	}

	if ( isset($_POST['attack_plus']) && intval($_POST['attack_plus']) >= 0 )
	{
		$updates[] = 'attack_plus = ' . intval($_POST['attack_plus']);
	}

	if ( isset($_POST['defense_plus']) && intval($_POST['defense_plus']) >= 0 )
	{
		$updates[] = 'defense_plus = ' . intval($_POST['defense_plus']);
	}

	if ( isset($_POST['mind_plus']) && intval($_POST['mind_plus']) >= 0 )
	{
		$updates[] = 'mind_plus = ' . intval($_POST['mind_plus']);
	}

	if ( isset($_POST['agility_plus']) && intval($_POST['agility_plus']) >= 0 )
	{
		$updates[] = 'agility_plus = ' . intval($_POST['agility_plus']);
	}

	if ( isset($_POST['exp_curve']) )
	{
		$updates[] = 'exp_curve = \'' . quotes(trim($_POST['exp_curve'])) . '\'';
	}

	if ( isset($_POST['hp_curve']) )
	{
		$updates[] = 'hp_curve = \'' . quotes(trim($_POST['hp_curve'])) . '\'';
	}

	if ( isset($_POST['mp_curve']) )
	{
		$updates[] = 'mp_curve = \'' . quotes(trim($_POST['mp_curve'])) . '\'';
	}

	if ( isset($_POST['attack_curve']) )
	{
		$updates[] = 'attack_curve = \'' . quotes(trim($_POST['attack_curve'])) . '\'';
	}

	if ( isset($_POST['defense_curve']) )
	{
		$updates[] = 'defense_curve = \'' . quotes(trim($_POST['defense_curve'])) . '\'';
	}

	if ( isset($_POST['mind_curve']) )
	{
		$updates[] = 'mind_curve = \'' . quotes(trim($_POST['mind_curve'])) . '\'';
	}

	if ( isset($_POST['agility_curve']) )
	{
		$updates[] = 'agility_curve = \'' . quotes(trim($_POST['agility_curve'])) . '\'';
	}

	if ( count($updates) > 0 )
	{
		$db->sql_query('UPDATE ' . CLASSES_TABLE . ' SET ' . implode(', ', $updates) . ' WHERE classname = \'' . $classname . '\'');
	}

	if ( $new_classname != $classname )
	{
		$db->sql_query('UPDATE ' . USERS_TABLE . ' SET classname = \'' . $new_classname . '\' WHERE classname = \'' . $classname . '\'');
	}

	$lang->load_keys('class_editor');

	redirect($lang->class_updated, $lang->class_updated_explain, $config->index . '?mod=admin.general&mode=class_editor&classname=' . $new_classname);
}
elseif ( $mode == 'GET.delete_class' )
{
	$lang->load_keys('delete_class');

	if ( !empty($_POST['delete_class']) && !empty($_POST['classname']) )
	{
		$classname = trim($_POST['classname']);

		$result = $db->sql_query('SELECT classname FROM ' . CLASSES_TABLE . ' WHERE classname != \'\' ORDER BY classname ASC LIMIT 0,2');

		$classname1 = $db->sql_fetchrow($result);
		$classname1 = $classname1['classname'];

		if ( !$classname2 = $db->sql_fetchrow($result) )
		{
			message_die($lang->not_delete_class, $lang->this_is_last_class);
		}
		$classname2 = $classname2['classname'];

		if ( $classname1 == $classname )
		{
			$classname1 = $classname2;
		}

		$db->sql_query('DELETE FROM ' . CLASSES_TABLE . ' WHERE classname = \'' . $classname . '\'');
		$db->sql_query('UPDATE ' . USERS_TABLE . ' SET classname = \'' . $classname1 . '\' WHERE classname = \'' . $classname . '\'');

		redirect($lang->delete_class, $lang->class_deleted, $config->index . '?mod=admin.general&mode=delete_class');
	}

	$result = $db->sql_query('SELECT classname, class_title FROM ' . CLASSES_TABLE . ' WHERE classname != \'\' ORDER BY classname ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('class_list', array(
			'NAME' => $row['classname'],
			'TITLE' => $row['class_title']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->delete_class
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.delete_class.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.select_user_to_edit' ) // choisir personnage � �diter
{
	$lang->load_keys('select_user_to_edit');

	$result = $db->sql_query('SELECT id, name FROM ' . USERS_TABLE . ' WHERE id > 1 ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('user_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->edit_user
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.select_user_to_edit.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'GET.user_editor' ) // modifier un personnage
{
	if ( empty($_GET['user_id']) )
	{
		header('Location: ' . $config->path . $config->index . '?mod=admin.general&mode=select_user_to_edit');
		exit;
	}

	$character = new User('u.id = ' . intval($_GET['user_id']));

	if ( $character->guest )
	{
		exit;
	}

	$lang->load_keys('user_editor');

	$result = $db->sql_query('SELECT classname, class_title, hp_plus, mp_plus FROM ' . CLASSES_TABLE . ' WHERE classname != \'\' ORDER BY class_title ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('class_list', array(
			'NAME' => $row['classname'],
			'TITLE' => $row['class_title'],
			'HP_PLUS' => $row['hp_plus'],
			'MP_PLUS' => $row['mp_plus']
			));
	}

	if ( !empty($character->start_location) )
	{
		$start_location = explode(',', $character->start_location);

		if  ( $start_location[3] == 0 )
		{
			$start_location[3] = 'down';
		}
		elseif ( $start_location[3] == 1 )
		{
			$start_location[3] = 'left';
		}
		elseif  ( $start_location[3] == 2 )
		{
			$start_location[3] = 'up';
		}
		elseif  ( $start_location[3] == 3 )
		{
			$start_location[3] = 'right';
		}

		$start_location = $start_location[0] . ',' . $start_location[1] . ',' . $start_location[2] . ' ' . $start_location[3];
	}
	else
	{
		$start_location = '';
	}

	$character_vars = '';
	foreach ( $character->vars as $key => $val )
	{
		$character_vars .= '$' . str_replace(array("\n", "\r"), '', htmlspecialchars($key)) . ' = ' . str_replace(array("\n", "\r"), '', htmlspecialchars($val)) . "\n";
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->user_editor,
		'CHARACTER_ID' => $character->id,
		'CHARACTER_NAME' => $character->name,
		'CHARACTER_EMAIL' => $character->email,
		'CHARACTER_ADMIN' => (( $character->admin ) ? 1 : 0),
		'CHARACTER_START_LOCATION' => $start_location,
		'CHARACTER_POINTS' => $character->points,
		'CHARACTER_VARS' => $character_vars,
		'CHARACTER_HP' => $character->hp,
		'CHARACTER_HP_MAX' => ($character->hp_max - $character->hp_plus),
		'CHARACTER_HP_PLUS' => $character->hp_plus,
		'CHARACTER_HP_MAX_TOTAL' => $character->hp_max,
		'CHARACTER_MP' => $character->mp,
		'CHARACTER_MP_MAX' => ($character->mp_max - $character->mp_plus),
		'CHARACTER_MP_PLUS' => $character->mp_plus,
		'CHARACTER_MP_MAX_TOTAL' => $character->mp_max,
		'CHARACTER_ATTACK' => $character->attack,
		'CHARACTER_DEFENSE' => $character->defense,
		'CHARACTER_MIND' => $character->mind,
		'CHARACTER_AGILITY' => $character->agility,
		'CHARACTER_EXP' => $character->exp,
		'CHARACTER_LEVEL' => $character->level,
		'CHARACTER_CHARASET' => $character->user_charaset,
		'CHARACTER_BATTLER' => $character->user_battler,
		'CHARACTER_CHARASET_PIC' => ( $character->user_charaset == '' ) ? '../spacer.gif' : $character->user_charaset,
		'CHARACTER_BATTLER_PIC' => ( $character->user_battler == '' ) ? '../spacer.gif' : $character->user_battler,
		'CHARACTER_CLASSNAME' => $character->classname,
		'CHARACTER_BIOGRAPHY' => $character->biography,
		'CHARACTER_SPACE' => $character->space,
		'CHARACTER_MAP_ID' => $character->map_id,
		'CHARACTER_MAP_LEFT' => $character->map_left,
		'CHARACTER_MAP_TOP' => $character->map_top,
		'CHARACTER_MAP_DIR' => $character->map_dir
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.user_editor.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}
elseif ( $mode == 'POST.save_user' ) // sauver personnage
{
	if ( empty($_POST['id']) )
	{
		exit;
	}

	$character = new User('u.id = ' . intval($_POST['id']));

	if ( $character->guest )
	{
		exit;
	}

	if ( !empty($_POST['name']) )
	{
		$character->set('name', htmlspecialchars(substr(str_replace(array("\n", "\r"), '', trim($_POST['name'])), 0, 16)));
	}

	if ( !empty($_POST['password']) )
	{
		$character->set('password', md5(str_replace(array("\n", "\r"), '', trim($_POST['password']))));
	}

	if ( !empty($_POST['email']) && preg_match('`^([a-z0-9&\-_.]+?@[\w\-]+\.([\w\-\.]+\.)?[\w]+)$`i', $_POST['email']) )
	{
		$character->set('email', $_POST['email']);
	}

	if ( isset($_POST['admin']) )
	{
		$character->set('admin', (( $_POST['admin'] == 1 ) ? 1 : 0));
	}

	if ( isset($_POST['points']) && intval($_POST['points']) >= 0 )
	{
		$character->set('points', intval($_POST['points']));
	}

	if ( isset($_POST['hp']) && intval($_POST['hp']) >= 0 )
	{
		$character->set('hp', intval($_POST['hp']));
	}

	if ( isset($_POST['hp_max']) && intval($_POST['hp_max']) >= 0 )
	{
		$character->set('hp_max', intval($_POST['hp_max']));
	}

	if ( isset($_POST['mp']) && intval($_POST['mp']) >= 0 )
	{
		$character->set('mp', intval($_POST['mp']));
	}

	if ( isset($_POST['mp_max']) && intval($_POST['mp_max']) >= 0 )
	{
		$character->set('mp_max', intval($_POST['mp_max']));
	}

	if ( isset($_POST['attack']) && intval($_POST['attack']) >= 0 )
	{
		$character->set('attack', intval($_POST['attack']));
	}

	if ( isset($_POST['defense']) && intval($_POST['defense']) >= 0 )
	{
		$character->set('defense', intval($_POST['defense']));
	}

	if ( isset($_POST['mind']) && intval($_POST['mind']) >= 0 )
	{
		$character->set('mind', intval($_POST['mind']));
	}

	if ( isset($_POST['agility']) && intval($_POST['agility']) >= 0 )
	{
		$character->set('agility', intval($_POST['agility']));
	}

	if ( isset($_POST['exp']) && intval($_POST['exp']) >= 0 )
	{
		$character->set('exp', intval($_POST['exp']));
	}

	if ( isset($_POST['level']) && intval($_POST['level']) >= 0 )
	{
		$character->set('level', intval($_POST['level']));
	}

	if ( isset($_POST['space']) && intval($_POST['space']) >= 0 )
	{
		$character->set('space', intval($_POST['space']));
	}

	if ( isset($_POST['charaset']) && ( $_POST['charaset'] == '' || is_file($config->path . 'images/charasets/' . $_POST['charaset']) ) )
	{
		$character->set('charaset', $_POST['charaset']);
		$size = ( $_POST['charaset'] == '' ) ? array(0, 0) : getimagesize($config->path . 'images/charasets/' . $_POST['charaset']);
		$character->set('pic_width', $size[0]);
		$character->set('pic_height', $size[1]);
	}

	if ( isset($_POST['battler']) && ( $_POST['battler'] == '' || is_file($config->path . 'images/battlers/' . $_POST['battler']) ) )
	{
		$character->set('battler', $_POST['battler']);
	}

	if ( !empty($_POST['classname']) )
	{
		$character->set('classname', $_POST['classname']);
	}

	if ( isset($_POST['vars']) )
	{
		$_POST['vars'] = explode("\n", str_replace("\r", '', $_POST['vars']));
		$vars = array();

		foreach ( $_POST['vars'] as $val )
		{
			if ( preg_match('`^\$([A-Za-z0-9_]+) *= *(.*?)$`', trim($val), $matches) )
			{
				$vars[$matches[1]] = $matches[2];
			}
		}

		$character->set('vars', $vars);
	}

	if ( isset($_POST['biography']) )
	{
		$character->set('biography', htmlspecialchars(trim($_POST['biography'])));
	}
	
	if ( !empty($_POST['start_location']) && preg_match('`^([0-9]+) *, *([0-9]+) *, *([0-9]+) *(down|left|up|right)$`', trim($_POST['start_location']), $matches) )
	{
		if  ( $matches[4] == 'down' )
		{
			$matches[4] = 0;
		}
		elseif ( $matches[4] == 'left' )
		{
			$matches[4] = 1;
		}
		elseif  ( $matches[4] == 'up' )
		{
			$matches[4] = 2;
		}
		elseif  ( $matches[4] == 'right' )
		{
			$matches[4] = 3;
		}

		$character->set('start_location', $matches[1] . ',' . $matches[2] . ',' . $matches[3] . ',' . $matches[4]);
	}

	if ( !empty($_POST['modify_location']) )
	{
		if ( isset($_POST['map_id']) && intval($_POST['map_id']) >= 0 )
		{
			$character->set('map_id', intval($_POST['map_id']));
		}

		if ( isset($_POST['map_left']) && intval($_POST['map_left']) >= 0 )
		{
			$character->set('map_left', intval($_POST['map_left']));
		}

		if ( isset($_POST['map_top']) && intval($_POST['map_top']) >= 0 )
		{
			$character->set('map_top', intval($_POST['map_top']));
		}

		if ( isset($_POST['map_dir']) && intval($_POST['map_dir']) >= 0 && intval($_POST['map_dir']) < 4 )
		{
			$character->set('map_dir', intval($_POST['map_dir']));
		}
	}

	$character->update_db();

	$lang->load_keys('user_editor');

	redirect($lang->user_updated, $lang->user_updated_explain, $config->index . '?mod=admin.general&mode=user_editor&user_id=' . $character->id);
}
elseif ( $mode == 'GET.delete_user' )
{
	$lang->load_keys('delete_user');

	if ( !empty($_POST['delete_user']) && !empty($_POST['user_id']) )
	{
		$user_id = intval($_POST['user_id']);

		$db->sql_query('DELETE FROM ' . USERS_TABLE . ' WHERE id = ' . $user_id);

		redirect($lang->delete_user, $lang->user_deleted, $config->index . '?mod=admin.general&mode=delete_user');
	}

	$result = $db->sql_query('SELECT id, name FROM ' . USERS_TABLE . ' WHERE id > 1 ORDER BY id ASC');

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('user_list', array(
			'NAME' => $row['name'],
			'ID' => $row['id']
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $lang->delete_user
		));

	$template->set_filenames(array(
		'header' => 'admin_header.tpl',
		'footer' => 'admin_footer.tpl',
		'body' => 'admin.delete_user.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
}

?>