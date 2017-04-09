<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 一切的开始
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/08  初版
 */
//报错开关
ini_set("display_errors", "On");
//报错等级 0 关闭 -1 全开
error_reporting(-1);

//设置全局常量
define('MFPATH' , str_replace('\\', '/', __DIR__).'/../');
define('BASE_URL' , 'http://e.cn');
define('API_URL' , '');

/***********************检测常量**************************/
//核心常量
defined('MFPATH') || define('MFPATH' , $_SERVER["DOCUMENT_ROOT"].'/../');
defined('BASE_URL') || define('BASE_URL' , 'http://c.cn/');
defined('RUN_PATH') || define('RUN_PATH' , MFPATH.'RunData/');
defined('V_PATH') || define('V_PATH' , MFPATH.'Public/V/');
defined('V_URL') || define('V_URL' , BASE_URL.'V/');
defined('UP_PATH') || define('UP_PATH' , RUN_PATH.'Upload/');
defined('CONFIG_PATH') || define('CONFIG_PATH' , MFPATH.'Base/Config/');
defined('STATIC_URL') || define('STATIC_URL' , V_URL.'Static/');

//功能性常量
defined('REDIS') || define('REDIS' , false);
defined('APP_PATH') || define('APP_PATH' , MFPATH.'App/');

/***********************框架需要的全局内容可以在此引入**************************/
//全局方法
include MFPATH."Base/Lib/F.php";
include MFPATH."Base/Tool/WebSocket.php";





