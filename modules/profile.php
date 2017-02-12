<?php

$lang->load_keys('profile');
MFlog(json_encode($_POST));

$mode = ( isset($_POST['mode']) ) ? 'POST.' . trim($_POST['mode']) : (( isset($_GET['mode']) ) ? 'GET.' . trim($_GET['mode']) : '' );

if ( !$user->logged_in && $mode == 'POST.login' )
{
	$user->login();
}
elseif ( !$user->logged_in && ( $mode == 'GET.register' || $mode == 'POST.register' ) )
{
	if ( $mode == 'POST.register' )
	{
		$errors = array();

		$name = ( !empty($_POST['name']) ) ? substr(str_replace(array("\n", "\r"), '', trim($_POST['name'])), 0, 16) : '';
		$password = ( !empty($_POST['password']) ) ? str_replace(array("\n", "\r"), '', trim($_POST['password'])) : '';
		$password_confirm = ( !empty($_POST['password_confirm']) ) ? str_replace(array("\n", "\r"), '', trim($_POST['password_confirm'])) : '';
		$email = ( !empty($_POST['email']) ) ? trim($_POST['email']) : '';
		$classname = ( !empty($_POST['classname']) ) ? trim($_POST['classname']) : '';

		if ( $name == '' )
		{
			$errors[] = $lang->empty_name;
			$name_ok = false;
		}
		else
		{
			$name_ok = true;
		}

		if ( !preg_match('`^([a-z0-9&\-_.]+?@[\w\-]+\.([\w\-\.]+\.)?[\w]+)$`i', $email) )
		{
			$errors[] = $lang->invalid_email;
			$email_ok = false;
		}
		else
		{
			$email_ok = true;
		}

		if ( $password != $password_confirm )
		{
			$errors[] = $lang->not_equal_passwords;
		}

		if ( $name_ok && $email_ok )
		{
			$result = $db->sql_query('SELECT id FROM ' . USERS_TABLE . ' WHERE name = \'' . quotes($name) . '\' OR email = \'' . quotes($email) . '\' LIMIT 0,1');

			if ( $row = $db->sql_fetchrow($result) )
			{
				$errors[] = $lang->user_with_same_email_or_name;
			}
		}

		if ( count($errors) > 0 )
		{
			$template->assign_vars(array(
				'CHARACTER_NAME' => htmlspecialchars($name),
				'PASSWORD' => htmlspecialchars($password),
				'PASSWORD_CONFIRM' => htmlspecialchars($password_confirm),
				'EMAIL' => htmlspecialchars($email)
				));

			foreach ( $errors as $val )
			{
				$template->assign_block_vars('register_error', array(
					'ERROR' => $val
					));
			}
		}
		else
		{
			$result = $db->sql_query('SELECT classname, hp_plus, mp_plus, attack_plus, defense_plus, mind_plus, agility_plus FROM ' . CLASSES_TABLE . ' WHERE classname = \'' . quotes($classname) . '\' AND classname != \'\'');

			if ( !$class = $db->sql_fetchrow($result) )
			{
				exit;
			}

			// calcul des stats initiales, et des bonus
			$hp = $class['hp_plus'];
			$hp_max = mt_rand(0, ceil($class['hp_plus']/10));
			$hp_max = ( $hp_max < 1 ) ? 1 : $hp_max;
			$hp += $hp_max;

			$mp = $class['mp_plus'];
			$mp_max = mt_rand(0, ceil($class['mp_plus']/10));
			$mp += $mp_max;

			$attack = mt_rand(0, ceil($class['attack_plus']/10));
			$defense = mt_rand(0, ceil($class['defense_plus']/10));
			$mind = mt_rand(0, ceil($class['mind_plus']/10));
			$agility = mt_rand(0, ceil($class['agility_plus']/10));

			$result = $db->sql_query('SELECT MAX(id) AS max FROM ' . USERS_TABLE);
			$id = $db->sql_fetchrow($result);
			$id = $id['max'] + 1;
			$admin = ( $id == 2 ) ? 1 : 0;
			list($map_id, $map_left, $map_top, $map_dir) = explode(',', $config->default_location);

			$db->sql_query('INSERT INTO ' . USERS_TABLE . '(id, name, email, password, admin, last_visit, teleport, start_location, refresh, chatbox_state, points, allow_music, vars, hp, hp_max, mp, mp_max, attack, defense, mind, agility, exp, level, charaset, battler, pic_width, pic_height, classname, biography, space, event_status, event_extra, event_script, actual_mod, map_id, map_previous_id, map_left, map_top, map_dir, map_moves, map_moves_table, map_sid) VALUES (' . $id . ', \'' . quotes(htmlspecialchars($name)) . '\', \'' . quotes($email) . '\', \'' . md5($password) . '\', ' . $admin . ', ' . $config->server_time . ', 0, \'\', 0, \'0,0,0\', 0, 1, \'' . quotes(serialize(array())) . '\', ' . $hp . ', ' . $hp_max . ', ' . $mp . ', ' . $mp_max . ', ' . $attack . ', ' . $defense . ', ' . $mind . ', ' . $agility . ', 0, 1, \'\', \'\', 0, 0, \'' . quotes($class['classname']) . '\', \'\', 0, \'\', 0, \'\', \'map\', ' . $map_id . ', ' . $map_id . ', ' . $map_left . ', ' . $map_top . ', ' . $map_dir . ', 0, \'' . quotes(serialize(array())) . '\', 1)');

			redirect($lang->registration_succeeded, $lang->you_can_login, $config->index . '?mod=default');
		}
	}

	$config->navigation[] = array('mod=profile', 'nav_profile');

	$result = $db->sql_query('SELECT classname, class_title, battler, description FROM ' . CLASSES_TABLE . ' WHERE selectable = 1 and classname != \'\' ORDER BY classname ASC');

	$first = true;

	while ( $row = $db->sql_fetchrow($result) )
	{
		$template->assign_block_vars('class_list', array(
			'CLASSNAME' => $row['classname'],
			'CLASS_TITLE' => $row['class_title'],
			'BATTLER' => $row['battler'],
			'DESCRIPTION' => nl2br($row['description']),
			'CHECKED' => (( $first ) ? 'checked="checked" ' : '')
			));

		$first = false;
	}
/*
	$template->assign_vars(array(
		'PAGE_NAME' => $lang->registering
		));

	$template->set_filenames(array(
		'header' => 'page_header.tpl',
		'footer' => 'page_footer.tpl',
		'body' => 'default.tpl'
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');
	*/
}
elseif ( $user->logged_in && ( $mode == 'GET.logout' || $mode == 'POST.logout' ) )
{
	$user->logout();
}
elseif ( $user->logged_in )
{
	redirect($lang->redirection, sprintf($lang->you_are_already_logged_in, $user->name), $config->index . '?mod=' . $user->actual_mod);
}
else
{
	header('Location: ' . $config->path . $config->index . '?mod=default');
	exit;
}


