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


//if( get_magic_quotes_gpc() )
//{
//	if( is_array($_GET) )
//	{
//		foreach( $_GET as $k => $v )
//		{
//			if( is_array($_GET[$k]) )
//			{
//				foreach( $_GET[$k] as $k2 => $v2 )
//				{
//					$_GET[$k][$k2] = stripslashes($v2);
//				}
//			}
//			else
//			{
//				$_GET[$k] = stripslashes($v);
//			}
//		}
//	}
//
//	if( is_array($_POST) )
//	{
//		foreach( $_POST as $k => $v )
//		{
//			if( is_array($_POST[$k]) )
//			{
//				foreach( $_POST[$k] as $k2 => $v2 )
//				{
//					$_POST[$k][$k2] = stripslashes($v2);
//				}
//			}
//			else
//			{
//				$_POST[$k] = stripslashes($v);
//			}
//		}
//	}
//
//	if( is_array($_COOKIE) )
//	{
//		foreach( $_COOKIE as $k => $v )
//		{
//			if( is_array($_COOKIE[$k]) )
//			{
//				foreach( $_COOKIE[$k] as $k2 => $v2 )
//				{
//					$_COOKIE[$k][$k2] = stripslashes($v2);
//				}
//			}
//			else
//			{
//				$_COOKIE[$k] = stripslashes($v);
//			}
//		}
//	}
//}

//
// constantes
//


//
// fonctions
//

/**
 * Created by 路漫漫.
 * Link: ahmerry@qq.com
 * Date: 2016/12/12 17:27
 * 一些方法
 */

/**
 * 写入日志到文件
 * @param $log 日志内容
 * @param $name 日志文件名
 * @param $path 日志路径
 */
function MFLog($log, $name='', $path='') {
    if (!$path){
        $path = RUN_PATH . 'Logs/';
    }else{
        $path = RUN_PATH . $path;
    }
    CheckDir( $path );
    if (!$name) $name = date( 'm-d' );

    file_put_contents(
        $path.$name.'.log',
        "\n\nTime : ".date('Y-m-d H:i:s')."\n".$log,
        FILE_APPEND
    );
}

/**
 * 检测是否是有该文件夹，没有则生成
 */
function CheckDir($dir, $mode=0777) {
    if (!$dir)  return false;
    if(!is_dir($dir)) {
        if (!file_exists($dir) && @mkdir($dir, $mode, true))
            return true;
        return false;
    }
    return true;
}

function Session($name,$value=''){
    @session_start();
    if ($value === null){
        unset($_SESSION[$name]);
    }else if($value){
        $_SESSION[$name] = $value;
        return true;
    }else{
        return $_SESSION[$name];
    }
}

// met en cache une variable
function create_cache($var_name)
{
	global $$var_name, $config;

    /*$file = '<?php' . "\n\n" . 'if ( !defined(\'IN_PHPORE\') )' . "\n" . '{' . "\n\t" . 'exit;' . "\n" . '}' . "\n\n" . '$' . $var_name . ' = unserialize(\'' . quotes(serialize($$var_name)) . '\');' . "\n\n" . '?>';*/
    $file = "<?php\n\nif ( !defined('IN_PHPORE') ){exit;}\n\n '$'$var_name = unserialize('".serialize($$var_name). "');\n\n?>";
	
	$handle = fopen($config->path . $config->cache_dir . 'data_' . md5($var_name) . '.' . $config->phpex, 'w');
	$result = fwrite($handle, $file);
	fclose($handle);

	return $result;
}

// r�cup�re une variable mise en cache
function get_cache($var_name)
{
	global $$var_name, $config;
	
	if ( is_file($config->path . $config->cache_dir . 'data_' . $var_name . '.' . $config->phpex) )
	{
		include($config->path . $config->cache_dir . 'data_' . $var_name . '.' . $config->phpex);
		return true;
	}
	else
	{
		return false;
	}
}

// 表情符号的功能
function smileys($text) {
    $smileys_replacement = [
        '8)' => '<img src="images/smileys/cool.gif" alt="8)" />',
        '8|' => '<img src="images/smileys/what.gif" alt="8|" />',
        ':(' => '<img src="images/smileys/sad.gif" alt=":(" />',
        ':)' => '<img src="images/smileys/smile.gif" alt=":)" />',
        ':biggrin:' => '<img src="images/smileys/biggrin.gif" alt=":biggrin:" />',
        ':bleble:' => '<img src="images/smileys/bleble.gif" alt=":bleble:" />',
        ':blink:' => '<img src="images/smileys/blink.gif" alt=":blink:" />',
        ':blush:' => '<img src="images/smileys/blush.gif" alt=":blush:" />',
        ':cheesy:' => '<img src="images/smileys/cheesy.gif" alt=":cheesy:" />',
        ':clap:' => '<img src="images/smileys/clap.gif" alt=":clap:" />',
        ':cool:' => '<img src="images/smileys/cool.gif" alt=":cool:" />',
        ':crazy:' => '<img src="images/smileys/crazy.gif" alt=":crazy:" />',
        ':cry:' => '<img src="images/smileys/cry.gif" alt=":cry:" />',
        ':D' => '<img src="images/smileys/biggrin.gif" alt=":D" />',
        ':downeyes:' => '<img src="images/smileys/downeyes.gif" alt=":downeyes:" />',
        ':dry:' => '<img src="images/smileys/dry.gif" alt=":dry:" />',
        ':happy:' => '<img src="images/smileys/happy.gif" alt=":happy:" />',
        ':huh:' => '<img src="images/smileys/huh.gif" alt=":huh:" />',
        ':laugh:' => '<img src="images/smileys/laugh.gif" alt=":laugh:" />',
        ':lol:' => '<img src="images/smileys/laugh.gif" alt=":lol:" />',
        ':love:' => '<img src="images/smileys/love.gif" alt=":love:" />',
        ':mad:' => '<img src="images/smileys/mad.gif" alt=":mad:" />',
        ':mellow:' => '<img src="images/smileys/mellow.gif" alt=":mellow:" />',
        ':o' => '<img src="images/smileys/ooh.gif" alt=":o" />',
        ':ooh:' => '<img src="images/smileys/ooh.gif" alt=":ooh:" />',
        ':p' => '<img src="images/smileys/tongue.gif" alt=":p" />',
        ':sad:' => '<img src="images/smileys/sad.gif" alt=":sad:" />',
        ':sleep:' => '<img src="images/smileys/sleep.gif" alt=":sleep:" />',
        ':smile:' => '<img src="images/smileys/smile.gif" alt=":smile:" />',
        ':tongue:' => '<img src="images/smileys/tongue.gif" alt=":tongue:" />',
        ':unsure:' => '<img src="images/smileys/unsure.gif" alt=":unsure:" />',
        ':what:' => '<img src="images/smileys/what.gif" alt=":what:" />',
        ':wink:' => '<img src="images/smileys/wink.gif" alt=":wink:" />',
        ':zzz:' => '<img src="images/smileys/sleep.gif" alt=":zzz:" />',
        ':|' => '<img src="images/smileys/mellow.gif" alt=":|" />',
        ';)' => '<img src="images/smileys/blink.gif" alt=";)" />',
        'B)' => '<img src="images/smileys/cool.gif" alt="B)" />',
        'x(' => '<img src="images/smileys/mad.gif" alt="x(" />',
        'X(' => '<img src="images/smileys/mad.gif" alt="X(" />',
        '^^' => '<img src="images/smileys/happy.gif" alt="^^" />',
        ':b' => '<img src="images/smileys/focu.gif" alt=":b" />',
        ':focu:' => '<img src="images/smileys/focu.gif" alt=":focu:" />'
    ];
    return strtr( $text, $smileys_replacement );
}

// 替换 " ' " , " \' ", " \ " , " \\ " 比如: 'ma chaine : \'ma chaine\''
function quotes($text)
{
	return str_replace(array('\\', '\'', "\0"), array('\\\\', '\\\'', '\\0'), $text);
}

// 在刷新过程中返回的 javascript 代码
function js_eval($content, $id, $type = 0)
{
	global $config, $user;

	$user->update_db();
	$config->update_db();

	header('Expires: Mon, 26 Jul 1997 05:00:00 GMT');
	header('Last-Modified: ' . gmdate('D, d M Y H:i:s') . ' GMT');
	header('Cache-Control: no-cache, must-revalidate');
	header('Pragma: no-cache');

	$refresh_forcing = ( !empty($_GET['method_forcing']) ) ? true : false;

	if ( $type == 1 )
	{
		// rafraichissement par fen�tre dans panneau d'admin
		die('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><title></title></head><body><script type="text/javascript">window.opener.parent.main.content_to_re1fresh_' . $id . ' = \'' . quotes($content) . '\';window.close();</script></body></html>');
	}
	elseif ( $type == 2 )
	{
		die('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><title></title></head><body><script type="text/javascript">' . $content . '</script></body></html>');
	}
	else
	{
		if ( $config->refresh_method == 0 || $refresh_forcing )
		{
			// rafraichissement par iframe
			die('<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"><title></title></head><body><script type="text/javascript">parent.content_to_refresh_' . $id . ' = \'' . quotes($content) . '\';</script></body></html>');
		}
		else
		{
			// rafraichissement par XMLHttpRequest
//			die(utf8_encode($content));
			die($content);

        }
	}
}

//可以快速创建一个通知或错误消息显示在页面
function message_die($title, $content)
{
	global $template, $user, $config;

	if ( isset($_GET['mod']) && substr($_GET['mod'], 0, 6) == 'admin.' )
	{
		$template->set_filenames(array(
			'header' => 'admin_header.tpl',
			'footer' => 'admin_footer.tpl',
			'body' => 'die.tpl'
			));
	}
	else
	{
		$template->set_filenames(array(
			'header' => 'page_header.tpl',
			'footer' => 'page_footer.tpl',
			'body' => 'die.tpl'
			));
	}

	$template->assign_vars(array(
		'PAGE_NAME' => $title,
		'DIE_TITLE' => $title,
		'DIE_CONTENT' => $content
		));

	$template->pparse('header');
	$template->pparse('body');
	$template->pparse('footer');

	$user->update_db();
	$config->update_db();

	exit;
}

function redirect($title, $content, $location, $time = 5)
{
	global $template;

	if ( $time > 0 )
	{
		$template->assign_block_vars('redirect', array(
			'LOCATION' => $location,
			'HTML_LOCATION' => htmlspecialchars($location),
			'TIMEOUT' => $time
			));
	}
	else
	{
		$template->assign_block_vars('clic_redirect', array(
			'LOCATION' => $location,
			'HTML_LOCATION' => htmlspecialchars($location)
			));
	}

	message_die($title, $content);
}

function create_battle($monsters, $users, $background = '', $music = '')
{
	global $user, $db;

	if ( !is_array($monsters) )
	{
		$monsters = array($monsters);
	}

	if ( !is_array($users) )
	{
		$users = array($users);
	}

	foreach ( $users as $key => $id )
	{
		if ( $id < 2 )
		{
			unset($users[$key]);
		}
	}

	if ( count($users) == 0 )
	{
		die('warning : 创建战斗所需的一个有效的用户 id');
	}

    $u = join(',',$users);
	$db->sql_query("INSERT INTO ".BATTLES_TABLE." (users,music,background) VALUES ('$u','$music','$background')");

	$battle_id = $db->lastId();
    $user->set('battle_id',$battle_id);


    $users = implode(' OR id = ', $users);

    $db->sql_query('UPDATE ' . USERS_TABLE . " SET battle_id = $battle_id,battle_state = 1 WHERE id = $users");

	if ( count($monsters) > 0 )
	{
		// 敌人
        $monsters = implode(' OR id = ', $monsters);
		$result = $db->sql_query("SELECT * FROM " . MONSTERS_TABLE . " WHERE id =  $monsters");
        $rows = $db->sql_fetchrows($result);
		if ($rows){
            foreach ( $rows as $row )
            {
                // 添加敌人
                $sql = 'INSERT INTO ' . OPPONENTS_TABLE . " VALUES (null,'$row[id]', '$battle_id', '$row[hp]', '$row[mp]', '$row[attack]', '$row[defense]', '$row[mind]', '$row[agility]', '$row[points]','$row[name]','$row[picture]','$row[skills]')";
//                MFLog($sql);
                $db->sql_query($sql);
            }
        }
	}
    header('Location: ' . BASE_URL . 'index.php?mod=battle');
}





// 获取物品商人的物品 传入 类型type 值 1.人类装备；2.人类道具；3.坦克装备；4.坦克道具


function equipment_query($type='')
{
	global $user, $db;
	$map_id = $user->map_id;
	// $result = $db->getAll("SELECT * FROM phpore_equipment WHERE type =  $type and  place =  2 ");//测试
	$result = $db->getAll("SELECT * FROM phpore_equipment WHERE type =  $type and  place =  $map_id ");
	return $result;
}





// 人物物品的添加    $equipment_id 物品id  $num 数量   。。。 以后加上个减少 


function user_equipment_add($equipment_id,$num)
{
	global $user, $db;
	$id = $user->id;

	$result = $db->getRow("SELECT equipment FROM phpore_users WHERE id =  $id ");

	$equipment = json_decode($result['equipment'], true);

// return $equipment;exit();


	if (array_key_exists($equipment_id,$equipment)){

		$equipment[$equipment_id] = $equipment[$equipment_id]+$num;

	}
	else{
	  
	    $equipment[$equipment_id] = $num;

	}

	$equipment = json_encode($equipment);

    return $db->execSql("UPDATE phpore_users SET equipment = '$equipment' WHERE id = $id");
	// return $result;

}




//获取用户物品  '物品名'=> 数量
function user_equipment_list()
{
	global $user, $db;
	$id = $user->id;

	$result = $db->getRow("SELECT equipment FROM phpore_users WHERE id =  $id ");

	if (!$result) {
		return false ;
	}
	$equipment = json_decode($result['equipment'], true);


	$result = $db -> getall('SELECT * FROM phpore_equipment');

	foreach ($equipment as $key => $value) {
		$key = $result[$key]['name'];
		$array[$key] =  $value; 
	}
	return $array ;


	
}




//
// configuration
//
class Config
{
    function __construct($config) {
        $config = get_object_vars($config);

        foreach ( $config as $key => $val )
        {
            $this->$key = $val;
        }

        $this->index = 'index.' . $this->phpex;
        $this->server_time = time();
        $this->vars = array();
        $this->old_vars = array();
        $this->updates = array();
        $this->navigation = array();
        $this->navigation[] = array('mod=default', 'nav_reception');
    }


	// chargement de la table _config
	function load_db() {
        global $db;
        $result = $db->sql_query( 'SELECT * FROM ' . CONFIG_TABLE . ' LIMIT 0,1' );
        if ( !$row = $db->sql_fetchrow( $result ) ) {
            die( 'Could not get config' );
        }
        // ajout des donn�es de configuration
        foreach ( $row as $key => $val ) {
            if ( substr( $key, 0, 5 ) == 'vars_' ) {
                $this->vars[substr( $key, 5 )] = $val;
            } else {
                $this->$key = $val;
            }
        }
        $this->old_vars = $this->vars;
    }

	function set($key, $val)
	{
		global $db;

		if ( substr($key, 0, 5) == 'vars_' )
		{
			$this->set_var(substr($key, 5), $val);
			return;
		}

		if ( $this->$key != $val )
		{
			$this->$key = $val;
		}

		if ( is_numeric($val) )
		{
			$this->updates[$key] = $key . ' = ' . $val;
		}
		elseif ( is_array($val) || is_object($val) )
		{
			$this->updates[$key] = $key . ' = \'' . quotes(serialize($val)) . '\'';
		}
		else
		{
			$this->updates[$key] = $key . ' = \'' . quotes($val) . '\'';
		}
	}

	function set_var($key, $val)
	{
		global $db;
		
		if ( !isset($this->old_vars[$key]) )
		{
			if ( !$result = $db->sql_query('ALTER TABLE ' . CONFIG_TABLE . ' ADD vars_' . $key . ' VARCHAR(255) NOT NULL', false) && sql_errno() != 1064 )
			{
				sql_error(true, 'ALTER TABLE ' . CONFIG_TABLE . ' ADD vars_' . $key . ' VARCHAR(255) NOT NULL');
			}
		}

		if ( !isset($this->vars[$key]) || $this->vars[$key] != $val )
		{
			$this->vars[$key] = $val;
		}
		
		$this->old_vars[$key] = $val;

		if ( is_numeric($val) )
		{
			$this->updates['vars_' . $key] = 'vars_' . $key . ' = ' . $val;
		}
		elseif ( is_array($val) || is_object($val) )
		{
			$this->updates['vars_' . $key] = 'vars_' . $key . ' = \'' . quotes(serialize($val)) . '\'';
		}
		else
		{
			$this->updates['vars_' . $key] = 'vars_' . $key . ' = \'' . quotes($val) . '\'';
		}
	}

	function update_db()
	{
		global $db;

		if ( count($this->updates) > 0 )
		{
			$db->sql_query('UPDATE ' . CONFIG_TABLE . ' SET ' . implode(', ', $this->updates));
		}

		$this->updates = array();
	}
}

//
// utilisateur
//
class User
{
	// constructeur
    function __construct($where = false, $row = false)
    {
        global $db, $lang, $config;

        //
        // 会话角色
        //
        if ( !$where ) {
            @session_start();

            //是否为访客
            if ( empty($_SESSION['user_id']) ) {
                $_SESSION['user_id'] = 1;
            }else{
                $result = $db->sql_query('SELECT u.*, c.classname, c.charaset AS class_charaset, c.battler AS class_battler, c.pic_width AS class_pic_width, c.pic_height AS class_pic_height, c.class_title, c.hp_plus, c.mp_plus, c.attack_plus, c.defense_plus, c.mind_plus, c.agility_plus, c.exp_curve, c.hp_curve, c.mp_curve, c.attack_curve, c.defense_curve, c.mind_curve, c.agility_curve, g.id AS guild_id, g.title AS guild_title FROM ' . USERS_TABLE . ' u, ' . CLASSES_TABLE . ' c, ' . GUILDS_TABLE . ' g WHERE (( u.id = ' . intval($_SESSION['user_id']) . ' AND c.classname = u.classname ) OR ( u.id = 1 AND c.classname = \'\' )) AND u.guild = g.id ORDER BY id DESC LIMIT 0,1');
                $this->updates = array();

                if ( !$row = $db->sql_fetchrow($result) )
                {
                    die('获取数据失败');
                }

                foreach ( $row as $key => $val )
                {
                    $this->$key = $val;
                }

                $_SESSION['user_id'] = $this->id;
            }

            //不是访客
            if ( $this->id > 1 )
            {
                $this->logged_in = true;
                $this->guest = false;
                $this->is_user = true;
                $this->dynamic = true;
                $this->admin = ( $this->admin == 1 ) ? true : false;
                $this->vars = unserialize($this->vars);
                $this->in_battle = ( $this->battle_id != 0 && $this->battle_state < 3 ) ? true : false;
                $this->hp_max += $this->hp_plus;
                $this->mp_max += $this->mp_plus;
                $this->attack += $this->attack_plus;
                $this->defense += $this->defense_plus;
                $this->mind += $this->mind_plus;
                $this->agility += $this->agility_plus;
                $this->user_charaset = $this->charaset;
                $this->user_battler = $this->battler;

                //数据修正

                //没有精灵图或战斗图时，取职业默认精灵图和战斗图
                if ( empty($this->charaset) || empty($this->battler) ) {
                    $this->charaset = $this->class_charaset;
                    $this->battler = $this->class_battler;
                    $this->pic_width = $this->class_pic_width;
                    $this->pic_height = $this->class_pic_height;
                }

                if ( $this->hp < 0 ) {
                    $this->set('hp', 0);
                }

                if ( $this->hp > $this->hp_max ) {
                    $this->set('hp', $this->hp_max);
                }

                if ( $this->mp > $this->mp_max )
                {
                    $this->set('mp', $this->mp_max);
                }

                //更新访问时间
                $this->set('last_visit', $config->server_time);

            } else {
                $this->logged_in = false;
                $this->guest = true;
                $this->admin = false;
                $this->name = $lang->guest;
                $this->in_battle = false;
                $this->actual_mod = 'default';
                $this->dynamic = false;
            }
        }else { //无用户会话
            if ( !$row ) {
                $result = $db->sql_query('SELECT u.*, c.classname, c.charaset AS class_charaset, c.battler AS class_battler, c.pic_width AS class_pic_width, c.pic_height AS class_pic_height, c.class_title, c.hp_plus, c.mp_plus, c.attack_plus, c.defense_plus, c.mind_plus, c.agility_plus, c.exp_curve, c.hp_curve, c.mp_curve, c.attack_curve, c.defense_curve, c.mind_curve, c.agility_curve, g.id AS guild_id, g.title AS guild_title FROM ' . USERS_TABLE . ' u, ' . CLASSES_TABLE . ' c, ' . GUILDS_TABLE . ' g WHERE (( ' . $where . ' AND c.classname = u.classname ) OR ( u.id = 1 AND c.classname = \'\' )) AND u.guild = g.id ORDER BY id DESC LIMIT 0,1');

                if (!$row = $db->sql_fetchrow($result)) {
                    die('获取数据失败');
                }
            }

            foreach ( $row as $key => $val )
            {
                $this->$key = $val;
            }

            $this->updates = array();

            // l'utilisateur n'est pas un invit�, on d�finit alors toutes les propri�t�s qui lui sont n�cessaire
            if ( $this->id > 1 )
            {
                $this->admin = ( $this->admin == 1 ) ? true : false;
                $this->guest = false;
                $this->is_user = true;
                $this->vars = unserialize($this->vars);
                $this->in_battle = ( $this->battle_id != 0 && $this->battle_state < 3 ) ? true : false;
                $this->hp_max += $this->hp_plus;
                $this->mp_max += $this->mp_plus;
                $this->attack += $this->attack_plus;
                $this->defense += $this->defense_plus;
                $this->mind += $this->mind_plus;
                $this->agility += $this->agility_plus;
                $this->user_charaset = $this->charaset;
                $this->user_battler = $this->battler;

                if ( empty($this->charaset) || empty($this->battler) )
                {
                    $this->charaset = $this->class_charaset;
                    $this->battler = $this->class_battler;
                    $this->pic_width = $this->class_pic_width;
                    $this->pic_height = $this->class_pic_height;
                }

                if ( $this->hp < 0 )
                {
                    $this->set('hp', 0);
                }

                if ( $this->hp > $this->hp_max )
                {
                    $this->set('hp', $this->hp_max);
                }

                if ( $this->mp > $this->mp_max )
                {
                    $this->set('mp', $this->mp_max);
                }
            }
            else
            {
                $this->guest = true;
            }

            $this->dynamic = $this->id > 1;
        }
    }

	// fonction pour assigner une valeur � une propri�t� de l'utilisateur
	function set($key, $val)
	{
		if ( !$this->dynamic )
		{
			return;
		}

		if ( $this->$key != $val )
		{
			$this->$key = $val;
		}

		if ( is_numeric($val) )
		{
			$this->updates[$key] = $key . ' = ' . $val;
		}
		elseif ( is_array($val) || is_object($val) )
		{
			$this->updates[$key] = $key . ' = \'' . quotes(serialize($val)) . '\'';
		}
		else
		{
			$this->updates[$key] = $key . ' = \'' . quotes($val) . '\'';
		}
	}

	function set_var($key, $val)
	{
		if ( !$this->dynamic )
		{
			return;
		}

		$this->vars[$key] = $val;
		$this->updates['vars'] = true;
	}

	function update_db()
	{
		if ( !$this->dynamic )
		{
			return;
		}

		global $db;

		if ( count($this->updates) > 0 )
		{
			if ( !empty($this->updates['vars']) )
			{
				$this->updates['vars'] = 'vars = \'' . quotes(serialize($this->vars)) . '\'';
			}

			$db->sql_query('UPDATE ' . USERS_TABLE . ' SET ' . implode(', ', $this->updates) . ' WHERE id = ' . $this->id);
		}

		$this->updates = array();
	}

	// met � jour le gain d'exp�rience, et le niveau de l'utilisateur si besoin
	function check_exp($gain_exp)
	{
		if ( !$this->dynamic )
		{
			return;
		}

		global $db;

		$this->exp += $gain_exp;
		$level = $this->level + 1;

		eval('$exp_next_level = ' . str_replace('X', $level, $this->exp_curve) . ';');

		$gain_hp = 0;
		$gain_mp = 0;
		$gain_attack = 0;
		$gain_defense = 0;
		$gain_mind = 0;
		$gain_agility = 0;

		// v�rifie si le personnage peut augmenter de niveau
		while ( $this->exp >= $exp_next_level )
		{
			// niveau suppl�mentaire, on augmente les stats

			eval('$gain_hp += ceil((' . str_replace('X', $level, $this->hp_curve) . ') - (' . str_replace('X', ($level-1), $this->hp_curve) . '));');

			eval('$gain_mp += ceil((' . str_replace('X', $level, $this->mp_curve) . ') - (' . str_replace('X', ($level-1), $this->mp_curve) . '));');

			eval('$gain_attack += ceil((' . str_replace('X', $level, $this->attack_curve) . ') - (' . str_replace('X', ($level-1), $this->attack_curve) . '));');

			eval('$gain_defense += ceil((' . str_replace('X', $level, $this->defense_curve) . ') - (' . str_replace('X', ($level-1), $this->defense_curve) . '));');

			eval('$gain_mind += ceil((' . str_replace('X', $level, $this->mind_curve) . ') - (' . str_replace('X', ($level-1), $this->mind_curve) . '));');

			eval('$gain_agility += ceil((' . str_replace('X', $level, $this->agility_curve) . ') - (' . str_replace('X', ($level-1), $this->agility_curve) . '));');

			$level++;
			eval('$exp_next_level = ceil(' . str_replace('X', $level, $this->exp_curve) . ');');
		}

		$gain_level = $level - $this->level - 1;

		if ( $gain_level > 0 ) // niveau suppl�mentaire
		{
			$this->set('hp', $this->hp + $gain_hp);
			$this->set('mp', $this->mp + $gain_mp);
			$this->set('attack', $this->attack + $gain_attack);
			$this->set('defense', $this->defense + $gain_defense);
			$this->set('mind', $this->mind + $gain_mind);
			$this->set('agility', $this->agility + $gain_hp);
			$this->set('level', $this->level + $gain_level);
			$this->set('exp', $this->exp + $gain_exp);
			
			return $gain_level;
		}
		else // pas de niveau suppl�mentaire
		{
			$this->set('exp', $this->exp + $gain_exp);

			return 0;
		}
	}

	function logout()
	{
		global $lang, $config;

		$_SESSION['user_id'] = 1;
		redirect($lang->logout_succeeded, $lang->you_are_logged_out, $config->index . '?mod=default');
	}

	function login()
	{
		global $lang, $config, $db;

		if ( !empty($_POST['name']) && isset($_POST['password']) )
		{
			$result = $db->sql_query('SELECT id FROM ' . USERS_TABLE . ' WHERE name = \'' . quotes(htmlspecialchars(trim($_POST['name']))) . '\' AND password = \'' . md5(trim($_POST['password'])) . '\' AND id > 1 LIMIT 0,1');

			if ( $row = $db->sql_fetchrow($result) ) // successful
			{
				$_SESSION['user_id'] = $row['id'];

				redirect($lang->login_succeeded, sprintf($lang->you_are_now_logged_in, htmlspecialchars(trim($_POST['name']))), $config->index . '?mod=default');
			}
		}

		// failed
		redirect($lang->login_failed, $lang->invalid_name_or_password, $config->index . '?mod=default');
	}
}

//
// template
//
class Template {

	// constructeur
    function __construct() {
        global $db, $config;

        $this->tpldata = array();
        $this->files = array();
        $this->compiled_code = array();
        $this->uncompiled_code = array();
        $this->root = $config->path . 'templates/' . $config->template . '/';
        $this->parsing_started = false;
    }


	// d�finit le/les noms de fichier de template
	function set_filenames($filename_array)
	{
		if ( !is_array($filename_array) )
		{
			return false;
		}

		$template_names = '';
		foreach ( $filename_array as $handle => $filename )
		{
			$this->filename[$handle] = $filename;

			if ( substr($filename, 0, 1) != '/' )
			{
				$filename = $this->root . $filename;
			}

			if ( !file_exists($filename) )
			{
				die('Error - File ' . $filename . ' does not exist');
			}

			$this->files[$handle] = $filename;
		}

		return true;
	}

	// affiche le r�sultat, apr�s compilation ou chargement du cache d�j� compil�
	function pparse($handle)
	{
		global $config, $lang;

		error_reporting(E_ALL ^ E_NOTICE); // hide notice of undefined variables

		if ( !$this->parsing_started )
		{
			if ( isset($_GET['mod']) && substr($_GET['mod'], 0, 6) == 'admin.' )
			{
				$navigation = array();

				foreach ( $config->navigation as $val )
				{
					$val[1] = str_replace('admin.', 'admin_', $val[1]);
					if ( $val[0] == 'mod=admin.panel' || substr($val[0], 0, 10) != 'mod=admin.' )
					{
						$target = ' target="_parent"';
					}
					else
					{
						$target = '';
					}

					$navigation[] = '<a href="' . $config->index . '?' . $val[0] . '"' . $target . '>' . $lang->$val[1] . '</a>';
				}

				$navigation = implode(' &raquo; ', $navigation);

				$this->assign_vars(array(
					'NAVIGATION' => $navigation
					));
			}
			else
			{
				$navigation = array();

				foreach ( $config->navigation as $val )
				{
					$navigation[] = '<a href="' . $config->index . '?' . $val[0] . '">' . $lang->$val[1] . '</a>';
				}

				$navigation = implode(' &raquo; ', $navigation);

				$this->assign_vars(array(
					'NAVIGATION' => $navigation
					));
			}

			$this->parsing_started = true;
		}
		if ( !empty($config->use_cache) )
		{
            CheckDir($config->path . $config->cache_dir);

            $cache_file = $config->path . $config->cache_dir . $config->template . '_' . $this->filename[$handle] . '.' . $config->phpex;

			if ( @filemtime($cache_file) == @filemtime($this->files[$handle]) )
			{
				$_str = '';
				include($cache_file);

				if ( $_str != '' )
				{
					echo $_str;
				}
			}
			else 
			{
				if ( !$this->loadfile($handle) )
				{
					die('Error - Couldn\'t load template file for handle ' . $handle);
				}

				// compilation du code
				$this->compiled_code[$handle] = $this->compile($this->uncompiled_code[$handle]);

//				$fp = fopen($cache_file, 'w+');
//				fwrite ($fp, '<?php' . "\n\n" . 'if ( !defined(\'IN_PHPORE\') )' . "\n" . '{' . "\n\t" . 'exit;' . "\n" . '}' . "\n\n" . $this->compiled_code[$handle] . "\n\n");
                $data = '<?php' . "\n\n" . 'if ( !defined(\'IN_PHPORE\') )' . "\n" . '{' . "\n\t" . 'exit;' . "\n" . '}' . "\n\n" . $this->compiled_code[$handle] . "\n\n";

//				fclose($fp);

                file_put_contents($cache_file,$data);
                touch($cache_file, filemtime($this->files[$handle]));
                //				@chmod($cache_file, 0777);

				// ex�cution du code compil�
//                var_dump($this->compiled_code[$handle]);
				eval($this->compiled_code[$handle]);
			}
		}
		else
		{
			if ( !$this->loadfile($handle))
			{
				die('Error - Couldn\'t load template file for handle ' . $handle);
			}

			if ( !isset($this->compiled_code[$handle]) || empty($this->compiled_code[$handle]))
			{
				// compilation du code
				$this->compiled_code[$handle] = $this->compile($this->uncompiled_code[$handle]);
			}

			// // ex�cution du code compil�
			eval($this->compiled_code[$handle]);
		}

		error_reporting(E_ALL);

		return true;
	}

	// 输出变量到模版
	function assign_block_vars($blockname, $vararray)
	{
		if ( strstr($blockname, '.') )
		{
			$blocks = explode('.', $blockname);
			$blockcount = count($blocks) - 1;

			$str = &$this->tpldata; 
			for ($i = 0; $i < $blockcount; $i++) 
			{
				$str = &$str[$blocks[$i]]; 
				$str = &$str[count($str) - 1]; 
			}

			$str[$blocks[$blockcount]][] = $vararray;
		}
		else
		{
			$this->tpldata[$blockname][] = $vararray;
		}

		return true;
	}

    // 输出变量到模版
	function assign_vars($vararray)
	{
		reset($vararray);
		foreach ( $vararray as $key => $val )
		{
			$this->tpldata['.'][0][$key] = $val;
		}

		return true;
	}

	function loadfile($handle)
	{
		if ( !empty($this->uncompiled_code[$handle]) )
		{
			return true;
		}

		if ( !isset($this->files[$handle]) )
		{
			die('Error - No file specified for handle ' . $handle);
		}

		$filename = $this->files[$handle];

		$str = file_get_contents($filename);
		if ( empty($str))
		{
			die('Error - File ' . $filename . ' for handle ' . $handle . ' is empty');
		}

		$this->uncompiled_code[$handle] = $str;

		return true;
	}

	// 编译代码
	function compile($code, $do_not_echo = false, $retvar = '')
	{
		$concat = ( !$do_not_echo ) ? ',' : '.';
		$code = quotes($code);

		// passage de variables de template vers des variables php


		// avec quotes()
		$varrefs = array();
		preg_match_all('#\[(([a-zA-Z0-9\-_]+?\.)+?)([A-Z0-9\-_]+?)\]#s', $code, $varrefs);
		$varcount = count($varrefs[1]);
		for ($i = 0; $i < $varcount; $i++)
		{
			$namespace = $varrefs[1][$i];
			$varname = $varrefs[3][$i];
			if ( !is_numeric($varname) )
			{
				$new = $this->generate_block_varref($namespace, $varname, $concat, true);
				$code = str_replace($varrefs[0][$i], $new, $code);
			}
		}

		// sans quotes()
		$varrefs = array();
		preg_match_all('#\{(([a-zA-Z0-9\-_]+?\.)+?)([A-Z0-9\-_]+?)\}#s', $code, $varrefs);
		$varcount = count($varrefs[1]);
		for ($i = 0; $i < $varcount; $i++)
		{
			$namespace = $varrefs[1][$i];
			$varname = $varrefs[3][$i];
			if ( !is_numeric($varname) )
			{
				$new = $this->generate_block_varref($namespace, $varname, $concat);
				$code = str_replace($varrefs[0][$i], $new, $code);
			}
		}

		// avec quotes()
		$varrefs = array();
		preg_match_all('#\[([A-Z0-9\-_]+?)\]#s', $code, $varrefs);
		$varcount = count($varrefs[1]);
		for ($i = 0; $i < $varcount; $i++)
		{
			$varname = $varrefs[1][$i];
			if ( substr($varname, 0, 2) == 'L_' )
			{
				$code = str_replace($varrefs[0][$i], '\' ' . $concat . ' ((isset($this->tpldata[\'.\'][0][\'' . $varname . '\'])) ? quotes($this->tpldata[\'.\'][0][\'' . $varname . '\']) : ((isset($lang->' . strtolower(substr($varname, 2)) . ')) ? quotes($lang->' . strtolower(substr($varname, 2)) . ') : \'\')) ' . $concat . ' \'', $code);
			}
			elseif ( !is_numeric($varname) )
			{
				$code = str_replace($varrefs[0][$i], '\' ' . $concat . ' ((isset($this->tpldata[\'.\'][0][\'' . $varname . '\'])) ? quotes($this->tpldata[\'.\'][0][\'' . $varname . '\']) : \'\') ' . $concat . ' \'', $code);
			}
		}

		// sans quotes()
		$varrefs = array();
		preg_match_all('#\{([A-Z0-9\-_]+?)\}#s', $code, $varrefs);
		$varcount = count($varrefs[1]);
		for ($i = 0; $i < $varcount; $i++)
		{
			$varname = $varrefs[1][$i];
			if ( substr($varname, 0, 2) == 'L_' )
			{
				$code = str_replace($varrefs[0][$i], '\' ' . $concat . ' ((isset($this->tpldata[\'.\'][0][\'' . $varname . '\'])) ? $this->tpldata[\'.\'][0][\'' . $varname . '\'] : ((isset($lang->' . strtolower(substr($varname, 2)) . ')) ? $lang->' . strtolower(substr($varname, 2)) . ' : \'\')) ' . $concat . ' \'', $code);
			}
			elseif ( !is_numeric($varname) )
			{
				$code = str_replace($varrefs[0][$i], '\' ' . $concat . ' ((isset($this->tpldata[\'.\'][0][\'' . $varname . '\'])) ? $this->tpldata[\'.\'][0][\'' . $varname . '\'] : \'\') ' . $concat . ' \'', $code);
			}
		}

		$code_lines = explode("\n", $code);
		$block_nesting_level = 0;
		$block_names = array();
		$block_names[0] = '.';

		$line_count = count($code_lines);
		for ( $i = 0; $i < $line_count; $i++ )
		{
			$code_lines[$i] = chop($code_lines[$i]);
			if ( preg_match('#<!-- BEGIN (.*?) -->#', $code_lines[$i], $m) )
			{
				$n[0] = $m[0];
				$n[1] = $m[1];

				if ( preg_match('#<!-- END (.*?) -->#', $code_lines[$i], $n) )
				{
					$block_nesting_level++;
					$block_names[$block_nesting_level] = $m[1];
					if ( $block_nesting_level < 2)
					{
						$code_lines[$i] = '$_' . $a[1] . '_count = (isset($this->tpldata[\'' . $n[1] . '\'])) ?  count($this->tpldata[\'' . $n[1] . '\']) : 0;';
						$code_lines[$i] .= 'for ($_' . $n[1] . '_i = 0; $_' . $n[1] . '_i < $_' . $n[1] . '_count; $_' . $n[1] . '_i++)';
						$code_lines[$i] .= '{';
					}
					else
					{
						$namespace = substr(implode('.', $block_names), 0, -1);
						$namespace = substr($namespace, 2);
						$varref = $this->generate_block_data_ref($namespace, false);
						$code_lines[$i] = '$_' . $a[1] . '_count = (isset(' . $varref . ')) ? count(' . $varref . ') : 0;';
						$code_lines[$i] .= 'for ($_' . $n[1] . '_i = 0; $_' . $n[1] . '_i < $_' . $n[1] . '_count; $_' . $n[1] . '_i++)';
						$code_lines[$i] .= '{';
					}

					// fin de bloc
					unset($block_names[$block_nesting_level]);
					$block_nesting_level--;
					$code_lines[$i] .= '} // END ' . $n[1];
					$m[0] = $n[0];
					$m[1] = $n[1];
				}
				else
				{
					// d�but de bloc
					$block_nesting_level++;
					$block_names[$block_nesting_level] = $m[1];
					if ( $block_nesting_level < 2)
					{
						$code_lines[$i] = '$_' . $m[1] . '_count = (isset($this->tpldata[\'' . $m[1] . '\'])) ? count($this->tpldata[\'' . $m[1] . '\']) : 0;';
						$code_lines[$i] .= 'for ($_' . $m[1] . '_i = 0; $_' . $m[1] . '_i < $_' . $m[1] . '_count; $_' . $m[1] . '_i++)';
						$code_lines[$i] .= '{';
					}
					else
					{
						$namespace = implode('.', $block_names);
						$namespace = substr($namespace, 2);
						$varref = $this->generate_block_data_ref($namespace, false);
						$code_lines[$i] = '$_' . $m[1] . '_count = (isset(' . $varref . ')) ? count(' . $varref . ') : 0;';
						$code_lines[$i] .= 'for ($_' . $m[1] . '_i = 0; $_' . $m[1] . '_i < $_' . $m[1] . '_count; $_' . $m[1] . '_i++)';
						$code_lines[$i] .= '{';
					}
				}
			}
			else if ( preg_match('#<!-- END (.*?) -->#', $code_lines[$i], $m))
			{
				// fin de bloc
				unset($block_names[$block_nesting_level]);
				$block_nesting_level--;
				$code_lines[$i] = '} // END ' . $m[1];
			}
			else
			{
				// d�but de bloc
				if ( !$do_not_echo)
				{
					$code_lines[$i] = "echo '" . $code_lines[$i] . "\n';\n";
				}
				else
				{
					$code_lines[$i] = '$' . $retvar . ".= '" . $code_lines[$i] . "\n';\n"; 
				}
			}
		}

		$code = implode("\n", $code_lines);
		return $code;
	}

	function generate_block_varref($namespace, $varname, $concat, $quotes = false)
	{
		$namespace = substr($namespace, 0, strlen($namespace) - 1);
		$varref = $this->generate_block_data_ref($namespace, true);
		$varref .= '[\'' . $varname . '\']';
		if ( $quotes )
		{
			$varref = '\' '. $concat . ' ((isset(' . $varref . ')) ? quotes(' . $varref . ') : \'\') ' . $concat . ' \'';
		}
		else
		{
			$varref = '\' '. $concat . ' ((isset(' . $varref . ')) ? ' . $varref . ' : \'\') ' . $concat . ' \'';
		}

		return $varref;
	}

	function generate_block_data_ref($blockname, $include_last_iterator)
	{
		$blocks = explode('.', $blockname);
		$blockcount = count($blocks) - 1;
		$varref = '$this->tpldata';

		for ($i = 0; $i < $blockcount; $i++)
		{
			$varref .= "['" . $blocks[$i] . "'][\$_" . $blocks[$i] . '_i]';
		}

		$varref .= "['" . $blocks[$blockcount] . "']";

		if ( $include_last_iterator)
		{
			$varref .= '[$_' . $blocks[$blockcount] . '_i]';
		}

		return $varref;
	}
}


class DB {
    // constructeur
    function __construct($sqlserver, $sqluser, $sqlpassword, $database, $persistency = false) {
        $this->row = [];
        $this->rowset = [];
        $this->num_queries = 0;
        $this->in_transaction = 0;
        $this->persistency = $persistency;
        $this->user = $sqluser;
        $this->password = $sqlpassword;
        $this->server = $sqlserver;
        $this->dbname = $database;

        $this->db_connect_id = new mysqli( $this->server, $this->user, $this->password, $this->dbname );
    }

    // m�thodes des autres bases
    function sql_close() {

    }

    function sql_query($query = '', $die_error = true, $transaction = false) {
        // supprime tout ancien r�sultat de requ�te
        unset( $this->query_result );
        if ( $query != '' ) {
            $this->num_queries++;
            if ( $transaction == 1 && !$this->in_transaction ) {
                $result = mysql_query( 'BEGIN', $this->db_connect_id );
                if ( !$result ) {
                    if ( !$die_error ) {
                        message_die( 'MySQL Error : ' . mysql_errno() . mysql_error() . '<br /><br /><i>' . $query . '</i>' );
                    } else {
                        return false;
                    }
                }
                $this->in_transaction = true;
            }
            $this->query_result = mysql_query( $query, $this->db_connect_id );
        } else {
            if ( $transaction == 2 && $this->in_transaction ) {
                $result = mysql_query( 'COMMIT', $this->db_connect_id );
            }
        }
        if ( $this->query_result ) {
            unset( $this->row[$this->query_result] );
            unset( $this->rowset[$this->query_result] );
            if ( $transaction == 2 && $this->in_transaction ) {
                $this->in_transaction = false;
                if ( !mysql_query( 'COMMIT', $this->db_connect_id ) ) {
                    if ( !$die_error ) {
                        message_die( 'MySQL Error : ' . mysql_errno() . mysql_error() . '<br /><br /><i>' . $query . '</i>' );
                    } else {
                        return false;
                    }
                }
            }
            return $this->query_result;
        } else {
            if ( !$die_error ) {
                message_die( 'MySQL Error : ' . mysql_errno() . mysql_error() . '<br /><br /><i>' . $query . '</i>' );
            } else {
                return false;
            }
        }
    }

    // autres m�thodes
    function sql_numrows($query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        return ($query_id) ? mysql_num_rows( $query_id ) : false;
    }

    function sql_affectedrows() {
        return ($this->db_connect_id) ? mysql_affected_rows( $this->db_connect_id ) : false;
    }

    function sql_numfields($query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        return ($query_id) ? mysql_num_fields( $query_id ) : false;
    }

    function sql_fieldname($offset, $query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        return ($query_id) ? mysql_field_name( $query_id, $offset ) : false;
    }

    function sql_fieldtype($offset, $query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        return ($query_id) ? mysql_field_type( $query_id, $offset ) : false;
    }

    function sql_fetchrow($query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        if ( $query_id ) {
            $this->row[$query_id] = mysql_fetch_array( $query_id, MYSQL_ASSOC );
            return $this->row[$query_id];
        } else {
            return false;
        }
    }

    function sql_fetchobject($query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        if ( $query_id ) {
            $this->row[$query_id] = mysql_fetch_object( $query_id );
            return $this->row[$query_id];
        } else {
            return false;
        }
    }

    function sql_fetchrowset($query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        if ( $query_id ) {
            unset( $this->rowset[$query_id] );
            unset( $this->row[$query_id] );
            $result = [];
            while ( $this->rowset[$query_id] = mysql_fetch_array( $query_id, MYSQL_ASSOC ) ) {
                $result[] = $this->rowset[$query_id];
            }
            return $result;
        } else {
            return false;
        }
    }

    function sql_fetchfield($field, $rownum = -1, $query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        if ( $query_id ) {
            if ( $rownum > -1 ) {
                $result = mysql_result( $query_id, $rownum, $field );
            } else {
                if ( empty( $this->row[$query_id] ) && empty( $this->rowset[$query_id] ) ) {
                    if ( $this->sql_fetchrow() ) {
                        $result = $this->row[$query_id][$field];
                    }
                } else {
                    if ( $this->rowset[$query_id] ) {
                        $result = $this->rowset[$query_id][$field];
                    } else if ( $this->row[$query_id] ) {
                        $result = $this->row[$query_id][$field];
                    }
                }
            }
            return $result;
        } else {
            return false;
        }
    }

    function sql_rowseek($rownum, $query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        return ($query_id) ? mysql_data_seek( $query_id, $rownum ) : false;
    }

    function sql_nextid() {
        return ($this->db_connect_id) ? mysql_insert_id( $this->db_connect_id ) : false;
    }

    function sql_freeresult($query_id = 0) {
        if ( !$query_id ) {
            $query_id = $this->query_result;
        }
        if ( $query_id ) {
            unset( $this->row[$query_id] );
            unset( $this->rowset[$query_id] );
            mysql_free_result( $query_id );
            return true;
        } else {
            return false;
        }
    }

    function sql_errno() {
        return mysql_errno();
    }

    function sql_error($disp = false, $query) {
        if ( !$disp ) {
            return mysql_error();
        } else {
            message_die( 'MySQL Error : ' . mysql_errno() . mysql_error() . ((!empty( $query )) ? '<br /><br /><i>' . $query . '</i>' : '') );
        }
    }
}

?>