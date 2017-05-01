<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 加密     :enToken($str,$expriy);
 * 解密     :deToken(加密后的字符串);
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/4/10 初版
 */

namespace Base\Tool;


class Token {
    private static $key=0;
    /**
     * 生成签名
     * @param $str 签名str
     * @param $expiry 有效期，单位秒
     **/
    public static function enToken($str,$expiry=3600){
        if (!is_string($str)) $str = strval($str);
        for($i=0;$i<strlen($str);$i++){
            $str[$i]=chr(ord($str[$i]) + self::$key);
        }
        $ctime = time() + $expiry;
        return 'W'.urlencode(base64_encode(urlencode(base64_encode($str).'.'.base64_encode($ctime))));
    }

    /**
     * 解密签名
     * @param string $str 签名对象
     */
    public static function deToken($sign){
        if (!is_string($sign)) $sign = strval($sign);

        $sign = substr($sign,1,-1);
        $sign=urldecode(base64_decode(urldecode($sign)));
        $arr = explode('.',$sign);
        $str = base64_decode($arr[0]);
        $time = base64_decode($arr[1]);
        if ($time < time()) return false;
        for($i=0;$i<strlen($str);$i++){
            $str[$i]=chr(ord($str[$i]) - self::$key);
        }
        return $str;
    }





}