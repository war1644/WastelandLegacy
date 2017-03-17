<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆████▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 在框架里，你应该接管一切信息
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v0.9 2017/3/9 10:49  初版
 */
//检测常量
defined('MFPATH') || define('MFPATH' , $_SERVER["DOCUMENT_ROOT"].'/../');
defined('BASE_URL') || define('BASE_URL' , 'http://c.cn/');
defined('RUN_PATH') || define('RUN_PATH' , MFPATH.'RunData/');
defined('V_PATH') || define('V_PATH' , MFPATH.'Public/V/');
defined('UP_PATH') || define('UP_PATH' , MFPATH.'Public/Upload/');
defined('KS_PATH') || define('KS_PATH' , V_PATH.'KSWechat/');
defined('V_URL') || define('V_URL' , BASE_URL.'V/');
defined('STATIC_URL') || define('STATIC_URL' , V_URL.'Static/');
defined('REDIS') || define('REDIS' , false);
defined('CONFIG_PATH') || define('CONFIG_PATH' , MFPATH.'Config/');

//引入全局方法
include MFPATH."Base/F/functions.php";

//接管系统
include MFPATH."Base/Base.php";
\Base\Base::ins();

//路由,交通指挥出场
include CONFIG_PATH."routes.php";