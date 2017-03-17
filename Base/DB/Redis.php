<?php
namespace Base\DB;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * Redis数据库
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v0.9 2016/12/18 9:58  初版
 */

class Redis {
    const CONFIG_FILE = 'Config/redis.php';
    protected static $redis;
    protected static $auth;
    protected static $prefix;

    /**
     * @param string $config['host'] Redis域名
     * @param int $config['port'] Redis端口,默认为6379
     * @param string $config['prefix'] Redis key prefix
     * @param string $config['auth'] Redis 密码
     */
    public static function init() {
        $config = Config('redis');
        self::$redis = new \Redis();
        self::$redis->pconnect($config['host'], $config['port'], 300);
        self::$prefix = isset($config['prefix']) ? $config['prefix'] : '';
        self::$auth = isset($config['auth']) ? $config['auth'] : '';

        if(self::$auth != ''){
            self::$redis->auth(self::$auth);
        }
    }

    /**
     * 将value 的值赋值给key,生存时间为expire秒
     */
    public static function set($key, $value, $expire = 300){
        return self::$redis->setex(self::formatKey($key), $expire, self::formatValue($value));
    }
    /**
     * 设置永久
     */
    public static function setev($key, $value){
        return self::$redis->set(self::formatKey($key), self::formatValue($value));
    }

    public static function get($key) {
        $value = self::$redis->get(self::formatKey($key));
        return $value !== FALSE ? self::unformatValue($value) : NULL;
    }
    public static function ttl($key) {
        return self::$redis->ttl(self::formatKey($key));
    }

    public static function delete($key) {
        return self::$redis->del(self::formatKey($key));
    }

    /**
     * 检测是否存在key,若不存在则赋值value
     */
    public static function setnx($key, $value){
        return self::$redis->setnx(self::formatKey($key), self::formatValue($value));
    }

    public static function lPush($key, $value) {
        return self::$redis->lPush(self::formatKey($key), self::formatValue($value));
    }

    public static function rPush($key, $value) {
        return self::$redis->rPush(self::formatKey($key), self::formatValue($value));
    }

    public static function lPop($key) {
        $value = self::$redis->lPop(self::formatKey($key));
        return $value !== FALSE ? self::unformatValue($value) : NULL;
    }

    public static function rPop($key) {
        $value = self::$redis->rPop(self::formatKey($key));
        return $value !== FALSE ? self::unformatValue($value) : NULL;
    }

    protected static function formatKey($key) {
        return self::$prefix . $key;
    }

    protected static function formatValue($value) {
        return @serialize($value);
    }

    protected static function unformatValue($value) {
        return @unserialize($value);
    }

    //往集合key中增加元素
    public static function sadd($key,$value) {
        return self::$redis->sadd(self::formatKey($key), $value);
    }

    //value是否在key集合中
    public static function sismember($key,$value) {
        return self::$redis->sismember(self::formatKey($key), $value);
    }

    //移除$source集合中的$destination加到$member集合
    public static function smove($source,$destination,$member) {
        return self::$redis->smove(self::formatKey($source), self::formatKey($destination), $member);
    }

    //是否存在
    public static function exists($key) {
        return self::$redis->exists(self::formatKey($key));
    }


}