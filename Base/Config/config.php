<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED█WOLF☆████▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 框架配置
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/02/15  初版
 */

return [
    'db' => [
        'host'=>'localhost',
        'user'=>'root',
        'password'=>'root',
        'dbname'=>'wl',
        'charset'=>'utf8',
        'prefix'=>'wl_'
    ],
    'redis' => [
        'host' => '127.0.0.1',
        'port' => 6379,
        'prefix'=>''
    ],
    'smtp' => [
        'host' => "ssl://smtp.qq.com",//SMTP服务器
        'port' => 465,//SMTP服务器端口
        'user' => "",//SMTP服务器的发送邮箱帐号
        'pass' => ""//SMTP服务器的发送邮箱密码
    ],
    'wx' => [
        'token' =>'', //填写你设定的token
        'encodingaeskey'=>'oCe5bLmXoIAgnjYD8dzRl5L18QFBnYscUqmaUCgItIN', //填写加密用的EncodingAESKey
        //测试号
        'appid' =>'', //填写高级调用功能的app id
        'appsecret'=>'',//填写高级调用功能的密钥
        'debug'=>true,
        'cacheDir'=>RUN_PATH.'Wechat/',//缓存目录
        'logcallback'=>'PublicC::wxDebug'//微信回调方法；需要注意，方法如果在类里，需要写类名"class::method"
    ],
    'cookie' => [
        'prefix'    =>  '', // cookie 名称前缀
        'expire'    =>  '', // cookie 保存时间
        'path'      =>  '', // cookie 保存路径
        'domain'    =>  '', // cookie 有效域名
        'secure'    =>  '', //  cookie 启用安全传输
        'httponly'  =>  '', // httponly设置
    ],
    'session' => [
        'SESSION_PREFIX'    =>  '', // cookie 名称前缀
        'VAR_SESSION_ID'    =>  '', // cookie 保存时间
        'SESSION_TYPE'      =>  '', // cookie 保存路径
        'SESSION_AUTO_START'    =>  '', // cookie 有效域名
    ]
];



