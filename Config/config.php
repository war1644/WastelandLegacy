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
 * v0.9 2017/02/15  初版
 */

return [
    'db' => [
        'host'=>'localhost',
        'user'=>'root',
        'password'=>'root',
        'dbname'=>'kingsmith',
        'charset'=>'utf8',
        'prefix'=>'ks_'
    ],
    'redis' => [
        'host' => '127.0.0.1',
        'port' => 6379,
        'prefix'=>''
    ],
    'smtp' => [
        'host' => "ssl://smtp.qq.com",//SMTP服务器
        'port' => 465,//SMTP服务器端口
        'user' => "ahmerry@qq.com",//SMTP服务器的发送邮箱帐号
        'pass' => "ejizbgbhcvcocacd"//SMTP服务器的发送邮箱密码
    ],
    'wx' => [
        'token' =>'kingsmith', //填写你设定的token
        'encodingaeskey'=>'oCe5bLmXoIAgnjYD8dzRl5L18QFBnYscUqmaUCgItIN', //填写加密用的EncodingAESKey
        //正式号
//    'appid' =>'wx91e7b6ade546e6a4', //填写高级调用功能的app id
//    'appsecret'=>'0a9ccbe77f6c41db9d57d7c51d1dec60',//填写高级调用功能的密钥
        //测试号
        'appid' =>'wx6834f279296c34e2', //填写高级调用功能的app id
        'appsecret'=>'d4624c36b6795d1d99dcf0547af5443d',//填写高级调用功能的密钥
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



