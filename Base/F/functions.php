<?php
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 全局方法，采用首字母大写驼峰命名（以标识这是框架的全局方法）
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v1.0 2017/02/25   扩充了一些方法
 * v0.9 2016/12/08   初版
 */

/**
 * 写入日志到文件
 * @param $log 日志内容
 * @param $name 日志文件名
 * @param $path 日志路径
 */
function MFLog($log, $name='', $path='') {
    if (!$path){
        $path = RUN_PATH . 'Logs/'.date('Y/');
    }else{
        $path = RUN_PATH . $path;
    }
    if (!$name) $name = date( 'm-d' );
    CheckDir($path);
    $file = $path.$name.'.log';
    if (is_array($log)){
        $log = json_encode($log);
    }
    $content = "\n\nTime : ".date('Y-m-d H:i:s')."\n".$log;
    error_log($content,3,$file);
}

/**
 * 全局配置参数读写
 * @param $key 参数
 */
function Config($key='') {
    if (!defined('CONFIG')){
        echo '引入了config';
        //载入配置并供全局调用
        $C = include CONFIG_PATH.'config.php';
        define('CONFIG',json_encode($C));
    }else{
        $C = json_decode(CONFIG,true);
    }

    if ($key === '') return $C;
    return $C[$key];
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

/**
 * 设置session
 */
function Session($name='',$value=''){
    if(!isset($_SESSION)) session_start();
    if ($name && $value===''){
        if (isset($_SESSION[$name])){
            return $_SESSION[$name];
        }
        return false;
    }elseif (is_null($value)){
        unset($_SESSION[$name]);
        return true;
    }else if($value){
        $_SESSION[$name] = $value;
        return true;
    }else if($name === '' && $value === ''){
        return $_SESSION;
    }
}

/**
 * 获取IP
 * @return string $ip
 */
function GetIp() {
    static $ip = null;
    if ($ip !==null) {
        return $ip;
    }
    //判断是否为代理/别名/常规
    if (getenv('HTTP_X_FORWARDED_FOR')) {

        $ip = getenv('HTTP_X_FORWARDED_FOR');

    } elseif (getenv('HTTP_CLIENT_IP')) {

        $ip = getenv('HTTP_CLIENT_IP');

    } else {
        $ip = getenv('REMOTE_ADDR');
    }
    return $ip;
}

/**
 * 递归转义数组中的字符,防止SQL注入
 * @param
 * @return bool 失败则返回false
 */
function SqlDef($arr) {
    foreach ($arr as $k => $v) {
        if (is_string($v)) {
            $arr[$k] = addslashes ($v);
        } elseif (is_array($v)) {
            $arr[$k] = sqlDef($v);
        }
    }
    return $arr;
}

/**
 * GET 请求
 * @param string $url
 */
function HttpGet($url){
    $oCurl = curl_init();
    if(stripos($url,"https://")!==FALSE){
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, FALSE);
        curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
    }
    curl_setopt($oCurl, CURLOPT_URL, $url);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
    $sContent = curl_exec($oCurl);
    $aStatus = curl_getinfo($oCurl);
    curl_close($oCurl);
    if(intval($aStatus["http_code"])==200){
        return $sContent;
    }else{
        return false;
    }
}

/**
 * POST 请求
 * @param string $url
 * @param array $param
 * @param boolean $post_file 是否文件上传
 * @return string content
 */
function HttpPost($url,$param,$post_file=false){
    $oCurl = curl_init();
    if(stripos($url,"https://")!==FALSE){
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($oCurl, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($oCurl, CURLOPT_SSLVERSION, 1); //CURL_SSLVERSION_TLSv1
    }
    if (PHP_VERSION_ID >= 50500 && class_exists('\CURLFile')) {
        $is_curlFile = true;
    } else {
        $is_curlFile = false;
        if (defined('CURLOPT_SAFE_UPLOAD')) {
            curl_setopt($oCurl, CURLOPT_SAFE_UPLOAD, false);
        }
    }
    if (is_string($param)) {
        $strPOST = $param;
    }elseif($post_file) {
        if($is_curlFile) {
            foreach ($param as $key => $val) {
                if (substr($val, 0, 1) == '@') {
                    $param[$key] = new \CURLFile(realpath(substr($val,1)));
                }
            }
        }
        $strPOST = $param;
    } else {
        $aPOST = array();
        foreach($param as $key=>$val){
            $aPOST[] = $key."=".urlencode($val);
        }
        $strPOST =  join("&", $aPOST);
    }
    curl_setopt($oCurl, CURLOPT_URL, $url);
    curl_setopt($oCurl, CURLOPT_RETURNTRANSFER, 1 );
    curl_setopt($oCurl, CURLOPT_POST,true);
    curl_setopt($oCurl, CURLOPT_POSTFIELDS,$strPOST);
    $sContent = curl_exec($oCurl);
    $aStatus = curl_getinfo($oCurl);
    curl_close($oCurl);
    if(intval($aStatus["http_code"])==200){
        return $sContent;
    }else{
        return false;
    }
}

function PostMan($url,$data) {

    $curl = curl_init();

    curl_setopt_array($curl, [
        CURLOPT_URL => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLINFO_HEADER_OUT=> true,
        CURLOPT_ENCODING => "",
        CURLOPT_MAXREDIRS => 10,
        CURLOPT_TIMEOUT => 10,
        CURLOPT_HTTP_VERSION => CURL_HTTP_VERSION_1_1,
        CURLOPT_CUSTOMREQUEST => "POST",
        CURLOPT_POSTFIELDS => $data,
        CURLOPT_HTTPHEADER => [
            "cache-control: no-cache",
            "content-type: application/json",
        ]
    ]);
    $response = curl_exec($curl);
    $err = curl_error($curl);
    curl_close($curl);
    if ($err) {
        MFLog("cURL Error #:" . $err);
        return false;
    } else {
        return $response;
    }
}


/**
 * 生成等比例缩略图
 * @param $pic filename
 * @param $w,$h 缩略后的宽高
 * @return string 缩略图路径,失败则返回false
 */
function ScalePic($pic,$w=200,$h=200) {
    $path =MFPATH.'Upload/'.date('m-H-i-s').'.png';
    //获取图片信息
    list($bw,$bh,$type) = getimagesize($pic);
    //创建大小画布
    //1 = GIF，2 = JPG，3 = PNG，4 = SWF，5 = PSD，6 = BMP
    $img = [
        1=>'imagecreatefromgif',
        2=>'imagecreatefromjpeg',
        3=>'imagecreatefrompng',
        6=>'imagecreatefromwbmp'
    ];
    $big = $img[$type]($pic);//动态调用
    $small = imagecreatetruecolor($w, $h);//缩率图放置框
    //造色,填充
    $white = imagecolorallocate($small, 255, 255, 255);
    imagefill($small, 0, 0, $white);

    //计算缩略比
    $balance = min($w/$bw,$h/$bh);
    $new_bw=$balance*$bw;
    $new_bh=$balance*$bh;
    //缩略
    imagecopyresampled($small, $big, ($w-$new_bw)/2, ($h-$new_bh)/2, 0, 0,$new_bw, $new_bh, $bw, $bh);
    //输出,关闭画布
    imagepng($small,$path);
    imagedestroy($big);
    imagedestroy($small);
    return $path;
}


/**
 * 加水印
 * @param $pic filename
 * @param $stamp 水印文件
 * @return string 水印图路径,失败则返回false
 */
function AddStampPic($pic,$stamp) {
    $path =MFPATH.'Upload/'.'stamp'.date('m-H-i-s').'.png';
    //获取图片信息
    list($bw,$bh,$btype) = getimagesize($pic);
    list($sw,$sh,$stype) = getimagesize($stamp);

    //创建大小画布
    //1 = GIF，2 = JPG，3 = PNG，4 = SWF，5 = PSD，6 = BMP
    $img = [
        1=>'imagecreatefromgif',
        2=>'imagecreatefromjpeg',
        3=>'imagecreatefrompng',
        6=>'imagecreatefromwbmp'
    ];
    $big = $img[$btype]($pic);//动态调用
    $small =  $img[$stype]($stamp);

    //水印贴大画布上
    imagecopymerge($big, $small, $bw-$sw, $bh-$sh, 0, 0, $sw, $sh, 60);
    //保存,关闭
    imagepng($big,$path);
    imagedestroy($big);
    imagedestroy($small);
    return $path;
}

/**
 * 浏览器友好的变量输出
 * @param mixed $var 变量
 * @param boolean $echo 是否输出 默认为True 如果为false 则返回输出字符串
 * @param string $label 标签 默认为空
 * @param boolean $strict 是否严谨 默认为true
 * @return void|string
 */
function Dump($var, $echo=true, $label=null, $strict=true) {
    $label = ($label === null) ? '' : rtrim($label) . ' ';
    if (!$strict) {
        if (ini_get('html_errors')) {
            $output = print_r($var, true);
            $output = '<pre>' . $label . htmlspecialchars($output, ENT_QUOTES) . '</pre>';
        } else {
            $output = $label . print_r($var, true);
        }
    } else {
        ob_start();
        var_dump($var);
        $output = ob_get_clean();
        if (!extension_loaded('xdebug')) {
            $output = preg_replace('/\]\=\>\n(\s+)/m', '] => ', $output);
            $output = '<pre>' . $label . htmlspecialchars($output, ENT_QUOTES) . '</pre>';
        }
    }
    if ($echo) {
        echo($output);
        return null;
    }else {
        return $output;
    }
}



/**
 * Cookie 设置、获取、删除
 * @param string $name cookie名称
 * @param mixed $value cookie值
 * @param mixed $option cookie参数
 * @return mixed
 */
function cookie($name='', $value='', $option=null) {
    // 默认设置
    $config = include CONFIG_PATH.'config.php';
    $config = $config['cookie'];
    // 参数设置(会覆盖默认认设置)
    if (!is_null($option)) {
        if (is_numeric($option))
            $option = array('expire' => $option);
        elseif (is_string($option))
            parse_str($option, $option);
        $config     = array_merge($config, array_change_key_case($option));
    }
    if(!empty($config['httponly'])){
        ini_set("session.cookie_httponly", 1);
    }
    // 清除指定前缀的所有cookie
    if (is_null($name)) {
        if (empty($_COOKIE))
            return null;
        // 要删除的cookie前缀，不指定则删除config设置的指定前缀
        $prefix = empty($value) ? $config['prefix'] : $value;
        if (!empty($prefix)) {// 如果前缀为空字符串将不作处理直接返回
            foreach ($_COOKIE as $key => $val) {
                if (0 === stripos($key, $prefix)) {
                    setcookie($key, '', time() - 3600, $config['path'], $config['domain'],$config['secure'],$config['httponly']);
                    unset($_COOKIE[$key]);
                }
            }
        }
        return null;
    }elseif('' === $name){
        // 获取全部的cookie
        return $_COOKIE;
    }
    $name = $config['prefix'] . str_replace('.', '_', $name);
    if ('' === $value) {
        if(isset($_COOKIE[$name])){
            $value =    $_COOKIE[$name];
            if(0===strpos($value,'mf:')){
                $value  =   substr($value,6);
                return array_map('urldecode',json_decode($value,true));
            }else{
                return $value;
            }
        }else{
            return null;
        }
    } else {
        if (is_null($value)) {
            setcookie($name, '', time() - 3600, $config['path'], $config['domain'],$config['secure'],$config['httponly']);
            unset($_COOKIE[$name]); // 删除指定cookie
        } else {
            // 设置cookie
            if(is_array($value)){
                $value  = 'mf:'.json_encode(array_map('urlencode',$value));
            }
            $expire = !empty($config['expire']) ? time() + intval($config['expire']) : 0;
            setcookie($name, $value, $expire, $config['path'], $config['domain'],$config['secure'],$config['httponly']);
            $_COOKIE[$name] = $value;
        }
    }
    return null;
}