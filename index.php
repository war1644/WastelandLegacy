<?php
/**
 *
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version V1.0
 * @since
 * <p>v0.9 2017/1/2 13:52  初版</p>
 */

ini_set("display_errors", "On");
ini_set('memory_limit', '256M');
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
include INC.'common.php';
include INC.'MFDB.php';

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
// 连接数据库
$db = MFDB::Ins();
$config->load_db();
//缓存清理
$actual_day_number = floor(time() / 86400);
if ( $config->day_number < $actual_day_number ){
    include INC . 'cron_day.php';
}

//载入语言
include MFPATH . 'language/'. $config->language.'.php';
$lang->load_keys('common');

//模版实例化
$template = new Template();

$user = new User();

if ( $user->logged_in ) {
	$template->assign_block_vars('logged_in', array());
} else {
	$template->assign_block_vars('not_logged_in', array());
}

$template->assign_vars([
	'SITE_NAME' => $config->site_name,
	'SITE_DESC' => $config->site_desc,
	'TEMPLATE_PATH' => 'templates/' . $config->template . '/',
	'SITE_DESC' => $config->site_desc,
	'U_INDEX' => 'index.php',
	'PATH' => MFPATH,
	'USER_ID' => $user->id,
	'USER_NAME' => $user->name,
	'COPYRIGHT' => '<h3 style="margin:0"><a href="'.BASE_URL.'"><strong>废土战记Team </strong> @2016-2099 </a></h3>',
	'DIRECTION' => $lang->screenDirection,
	'ENCODING' => $lang->encoding
]);

if ( $user->admin ) {
	$template->assign_block_vars('admin_panel', array());
}

if ( $config->use_gzip == 1 ) {
    //GZIP压缩
	ob_start('ob_gzhandler');
	$config->use_gzip = true;
} else {
	$config->use_gzip = false;
}

//ob_start('execution_time');


if ( !empty($_GET['mod']) && ( ( preg_match('`^([a-z0-9\-_]+)$`', $_GET['mod']) && is_file($config->path . 'modules/' . $_GET['mod'] . '.' . $config->phpex) ) || ( preg_match('`^(admin\.[a-z0-9\-_]+)$`', $_GET['mod']) && $user->admin && is_file($config->path . 'modules/' . $_GET['mod'] . '.' . $config->phpex) ) ) )
{
	if ( $user->in_battle && substr($_GET['mod'], 0, 6) != 'admin.' && $_GET['mod'] != 'default' && $_GET['mod'] != 'map' && $_GET['mod'] != 'profile' )
	{
			$user->set('actual_mod', 'battle');

			if ( $_GET['mod'] == 'battle' )
			{
				require(MFPATH . 'modules/battle.php');
			}
//			else
//			{
//				header('Location: ' . $config->path . $config->index . '?mod=battle');
//				exit;
//			}
	} else {
		if ( substr($_GET['mod'], 0, 6) != 'admin.' ) {
			$user->set('actual_mod', $_GET['mod']);
		}
//		if ( $user->logged_in && !$user->in_battle ) create_battle(1, $user->id, '047-Mine01.jpg', '022-Field05.mid');

		require(MFPATH . 'modules/' . $_GET['mod'] . '.php');
	}
} elseif ( !empty($user->actual_mod) ) {
	header('Location: ' . $config->path . $config->index . '?mod=' . $user->actual_mod);
	exit;
} else {
	$user->set('actual_mod', 'default');
	header('Location: ' . $config->path . $config->index . '?mod=default');
	exit;
}

//更新数据库
$user->update_db();
$config->update_db();

while ( @ob_end_flush() );
exit;

