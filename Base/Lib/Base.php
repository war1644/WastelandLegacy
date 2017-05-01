<?php
namespace Base\Lib;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 在框架里面，你应该接管一切信息
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v2017/04/12      重写错误和异常接管逻辑，与视图分离，增加通用性
 * v2017/03/14      删除composer,采用autoload方式加载文件
 * v2016/12/15      初版
 */
class Base {
    protected static $obj = null;
    private function __construct() {
        $this->initSystemHandlers();
        //autoload自动载入
        $this->init();
    }

    //关闭clone
    private function __clone() {}

    public static function ins(){
        if (self::$obj===null){
            self::$obj = new self();
        }
        return self::$obj;
    }

    /**
     * 接管系统错误、异常
     */
    protected function initSystemHandlers() {
        set_error_handler([$this , 'handlerError']);
        set_exception_handler([$this , 'handlerException']);
    }

    /**
     * 处理错误
     */
    public function handlerError($errno , $errstr , $file , $line) {
        //检查报错设置,没设置的就交给PHP系统去处理
        if (!(error_reporting() & $errno))  return false;

        //自己来处理错误
        switch ($errno) {
            //这个必须得干
            case E_USER_ERROR:
                //记录再说
                $err = "Level : FATAL ERROR \nFile : $file \nLine : $line \n $errstr\n";
                MFLog($err,'Error');
//                echo "<b>YOUR ERROR</b> [$errno] $errstr<br />";
//                echo "  Fatal error on line $line in file $file";
//                echo ", PHP " . PHP_VERSION . " (" . PHP_OS . ")<br />";
//                echo "神兽也救不了你的BUG，GO DIE<br />";
//                die();
//                break;

            case E_USER_WARNING:
                //记录再说
                $err = "Level : WARNING \nFile : $file \nLine : $line \n $errstr\n";
                MFLog($err,'Error');
//                echo "<b>My WARNING</b> [$errno] $errstr<br />";
//                break;

            case E_USER_NOTICE:
//                echo "<b>My NOTICE</b> [$errno] $errstr<br />";
                break;

            default:
//                echo "Unknown error type: [$errno] $errstr<br />";
                break;
        }

        //这里只记录，最后还是交给 PHP 内部错误处理程序
        return false;
        //这里不再交给 PHP 内部错误处理程序
//        return true;
    }

    public function handlerException($exception) {
        $this->handler($exception);
    }

    /**
     * 处理异常
     */
    protected function handler($exception) {
        $msg = $exception->getMessage();
        $file = $exception->getFile();
        $line = $exception->getline();
        $code = $exception->getCode();

        //写入日志
        $err = "Level : Exception \nCode : $code \nFile : $file \nLine : $line\n $msg\n";
        MFLog($err,'Exception');
        $traces = $exception->getTrace();
        if($exception instanceof \ErrorException) {
            array_shift($traces);
        }
        echo "<b>Your Exception $code</b><br />$msg<br />";
        Dump($traces);
        echo "神兽也救不了你的BUG，GO DIE<br />";
        die();
//        $c = new \Base\Lib\C();
//        if (isset($code) && $code==404){
//            $c->view('Base/404.php',['err'=>$err]);
//        }else{
//            $c->view('Base/error.php',['err'=>$err,'traces'=>$traces]);
//
//        }
    }

    /**
     * 自动加载对应文件
     *
     * @param string $class
     * @return bool
     */
    protected static function autoLoad($class) {
        $file = str_replace('\\', DIRECTORY_SEPARATOR, $class) . '.php';
        clearstatcache();
        $path = MFPATH . $file;
        if (is_file($path)) {
            include $path;
            if (class_exists($class, false)) {
                return true;
            }
        }
        return false;
    }

    /**
     * 初始化
     *
     * @return object
     */
    protected function init() {
        spl_autoload_register([$this, 'autoLoad']);
        return $this;
    }
}
//自调用
Base::ins();