<?php
namespace Base;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 框架安全类
 * 过滤非法字段，非法请求，转义sql字符串
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v1.0 2017/1/17   增加get,post,cookie转义处理
 * v0.9 2016/12/16  初版
 */

class MFWAF{
    private $url_arr = [
        'xss'=>"\\=\\+\\/v(?:8|9|\\+|\\/)|\\%0acontent\\-(?:id|location|type|transfer\\-encoding)",
    ];

    private $args_arr = [
        'xss'=>"[\\'\\\"\\;\\*\\<\\>].*\\bon[a-zA-Z]{3,15}[\\s\\r\\n\\v\\f]*\\=|\\b(?:expression)\\(|\\<script[\\s\\\\\\/]|\\<\\!\\[cdata\\[|\\b(?:eval|alert|prompt|msgbox)\\s*\\(|url\\((?:\\#|data|javascript)",
        'sql'=>"[^\\{\\s]{1}(\\s|\\b)+(?:select\\b|update\\b|insert(?:(\\/\\*.*?\\*\\/)|(\\s)|(\\+))+into\\b).+?(?:from\\b|set\\b)|[^\\{\\s]{1}(\\s|\\b)+(?:create|delete|drop|truncate|rename|desc)(?:(\\/\\*.*?\\*\\/)|(\\s)|(\\+))+(?:table\\b|from\\b|database\\b)|into(?:(\\/\\*.*?\\*\\/)|\\s|\\+)+(?:dump|out)file\\b|\\bsleep\\([\\s]*[\\d]+[\\s]*\\)|benchmark\\(([^\\,]*)\\,([^\\,]*)\\)|(?:declare|set|select)\\b.*@|union\\b.*(?:select|all)\\b|(?:select|update|insert|create|delete|drop|grant|truncate|rename|exec|desc|from|table|database|set|where)\\b.*(charset|ascii|bin|char|uncompress|concat|concat_ws|conv|export_set|hex|instr|left|load_file|locate|mid|sub|substring|oct|reverse|right|unhex)\\(|(?:master\\.\\.sysdatabases|msysaccessobjects|msysqueries|sysmodules|mysql\\.db|sys\\.database_name|information_schema\\.|sysobjects|sp_makewebtask|xp_cmdshell|sp_oamethod|sp_addextendedproc|sp_oacreate|xp_regread|sys\\.dbms_export_extension)",
        'other'=>"\\.\\.[\\\\\\/].*\\%00([^0-9a-fA-F]|$)|%00[\\'\\\"\\.]"
    ];

    private $referer;
    private $query_string;
    private $ip;

    function __construct($method) {
        $this->ip = GetIp();
        $this->referer=empty($_SERVER['HTTP_REFERER']) ? array() : array($_SERVER['HTTP_REFERER']);
        $this->query_string=empty($_SERVER["QUERY_STRING"]) ? array() : array($_SERVER["QUERY_STRING"]);
        $this->checkData($this->query_string,$this->url_arr);
        switch ($method){
            case 'GET':
                $this->checkData($_GET,$this->args_arr);
                $_GET = $this->sqlDef($_GET);
                break;
            case 'POST':
                $this->checkData($_POST,$this->args_arr);
                $_POST = $this->sqlDef($_POST);
                break;
            default:
                die('拒绝接收非常用请求');
                break;
        }

        $this->checkData($_COOKIE,$this->args_arr);
        $_COOKIE = $this->sqlDef($_COOKIE);
        $this->checkData($this->referer,$this->args_arr);
    }

    /**
     * 递归转义数组中的字符,防止SQL注入
     * @param
     * @return bool 失败则返回false
     */
    function sqlDef($arr) {
        if (get_magic_quotes_gpc()){
            return;
        }
        foreach ($arr as $k => $v) {
            if (is_string($v)) {
                $arr[$k] = addslashes ($v);
            } elseif (is_array($v)) {
                $arr[$k] = $this->sqlDef($v);
            }
        }
        return $arr;
    }

    function checkData($arr,$v) {
        foreach($arr as $key=>$value) {
            if(!is_array($key)) {
                $this->check($key,$v);
            } else {
                $this->checkData($key,$v);
            }

            if(!is_array($value)) {
                $this->check($value,$v);
            } else {
                $this->checkData($value,$v);
            }
        }
    }

    function check($str,$v) {
        $uStr = urlencode($str);
        $len = strlen($str) > 200;
        foreach ($v as $key => $value) {
            if (preg_match("/" . $value . "/is", $str) == 1 || preg_match("/" . $value . "/is", $uStr) == 1) {
                $log = "<br>\n IP: $this->ip <br>时间: " . strftime("%Y-%m-%d %H:%M:%S") . "<br>页面:" . $_SERVER["PHP_SELF"] . "<br>提交方式: " . $_SERVER["REQUEST_METHOD"] . "<br>提交数据: " . $str;
                if (!$len) MFLog($log,'Defend');
                die($this->ip . "非法操作，已记录你的行为");
            }
        }
    }
}