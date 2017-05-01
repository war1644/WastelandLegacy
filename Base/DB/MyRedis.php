<?php
/**
 *          ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version V0.9
 * @since
 * v2017/5/1  初版
 */

namespace Base\DB;

class MyRedis {
    /**
     * Redis的超时时间
     *
     * @var int
     */
    const REDISTIMEOUT = 0;

    /**
     * Redis的DBname
     *
     * @var int
     */
    const REDISDBNAME = 0;

    /**
     * 类单例
     *
     * @var object
     */
    private static $obj;

    /**
     * Redis的连接句柄
     *
     * @var object
     */
    private $redis;

    /**
     * 私有化构造函数，防止类外实例化
     *
     * @param unknown_type $dbnumber
     */
    private function __construct () {
        $config = Config('redis');
        $this->redis = new \Redis();
        //pconnect让redis保持在php-fpm进程，脚本结束也不断开，避免重复建立连接
        $this->redis->pconnect($config['host'], $config['port'], 300);
        self::$prefix = isset($config['prefix']) ? $config['prefix'] : '';
        self::$auth = isset($config['auth']) ? $config['auth'] : '';

        if(self::$auth != ''){
            $this->redis->auth(self::$auth);
        }
    }

    /**
     * 私有化克隆函数，防止类外克隆对象
     */
    private function __clone(){}

    /**
     * 类的唯一公开静态方法，获取类单例的唯一入口
     *
     * @return object
     */
    public static function Ins(){
        if (self::$obj===null){
            self::$obj = new self();
        }
        return self::$obj;
    }

    /**
     * 获取redis的连接实例
     *
     * @return Redis
     */
    public function getRedis () {
        return $this->redis;
    }

    /**
     * 需要在单例切换的时候做清理工作
     * pconnect方式，不需要断开
     */
//    public function __destruct () {
//        self::$obj->redis->close();
//        self::$obj = NULL;
//    }
}
