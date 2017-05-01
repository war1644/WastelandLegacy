<?php
/**
 * 超简洁SMTP类，支持附件，支持验证
 * @author chenall
 * @link http://chenall.net/post/cs_smtp/
 * @since
 *  2017-01-24  <路漫漫 ahmerry@qq.com>
 *      重写为单例模式
 *      用SMTP::Ins()获取实例
 *  2017-01-23  <路漫漫 ahmerry@qq.com>
 *      简化调用操作，只需new SMTP()就完事。(注意填写配置文件)
 *      支持中文附件名。
 *      另外注意SSL的一定要加'host' => 'ssl://smtp.qq.com'
 *   2012-12-08
 *      添加AddURL函数，可以直接从某个网址上下载文件并作为附件发送。
 *      修正由于发送人和接收人邮件地址没有使用"<>"126邮箱SMTP无法使用的问题。
 *   2012-12-06
 *      添加reset函数，重置连接，这样可以发送多个邮件。
 *   2012-12-05
 *      发送附件的代码整合到send函数中，减少变量的使用，快速输出，节省内存占用;
 *   2012-12-04
 *      第一个版本
 *
 * @example
 *  1. 初始化：连接到服务器
 *      $mail = SMTP::Ins()
 *      if ($mail->errstr) //如果连接出错
 *          die($mail->errstr);
 *      $mail->AddFile($file,$name) //服务器上的文件，可以指定文件名;
 *  2. 发送邮件
 *     $mail->send($to,$subject,$body)
 *     $to 收件人，多个使用','分隔
 *     $subject 邮件主题，可选。
 *     $body  邮件主体内容，可选
 *
 */

namespace Base\Tool;

class SMTP {
    private $CRLF = "\r\n";
    private $from;
    private $smtp = null;
    private static $obj = null;
    //附件
    private $attach = array();
    public $debug = false;
    public $errstr = '';

    private function __construct() {
        $cfg = Config('smtp');
        if (empty($cfg['host']))
            die('SMTP服务器未指定!');
        $this->smtp = fsockopen($cfg['host'],$cfg['port'],$errno,$errstr,5);
        if (empty($this->smtp))
        {
            $this->errstr = '错误'.$errno.':'.$errstr;
            return;
        }
        $this->smtp_log(fread($this->smtp, 515));
        if (intval($this->smtp_cmd('EHLO '.$cfg['host'])) != 250 && intval($this->smtp_cmd('HELO '.$cfg['host'])))
            return $this->errstr = '服务器不支持！';
        $this->errstr = '';

        if (!$this->login($cfg['user'],$cfg['pass']))
            die($this->errstr);
    }

    //关闭clone
    private function __clone() {}

    public static function Ins(){
        if (self::$obj===null){
            self::$obj = new self();
        }
        return self::$obj;
    }

    private function AttachURL($url,$name)
    {
        $info = parse_url($url);
        isset($info['port']) || $info['port'] = 80;
        isset($info['path']) || $info['path'] = '/';
        isset($info['query']) || $info['query'] = '';
        $down = fsockopen($info['host'],$info['port'],$errno,$errstr,5);
        if (!$down)
            return false;
        $out = "GET ".$info['path'].'?'.$info['query']." HTTP/1.1\r\n";
        $out .="Host: ".$info['host']."\r\n";
        $out .= "Connection: Close\r\n\r\n";
        fwrite($down, $out);
        $filesize = 0;
        while (!feof($down)) {
            $a = fgets($down,515);
            if ($a == "\r\n")
                break;
            $a = explode(':',$a);
            if (strcasecmp($a[0],'Content-Length') == 0)
                $filesize = intval($a[1]);
        }
        $sendsize = 0;
        echo "TotalSize: ".$filesize."\r\n";
        $i = 0;
        while (!feof($down)) {
            $data = fread($down,0x2000);
            $sendsize += strlen($data);
            if ($filesize)
            {
                echo "$i Send:".$sendsize."\r";
                ob_flush();
                flush();
            }
            ++$i;
            fwrite($this->smtp,chunk_split(base64_encode($data)));
        }
        echo "\r\n";
        fclose($down);
        return ($filesize>0)?$filesize==$sendsize:true;
    }

    function __destruct() {
        if ($this->smtp)
            $this->smtp_cmd('QUIT');//发送退出命令
    }

    //即时输出调试使用
    private function smtp_log($msg) {
        if ($this->debug == false)
            return;
        echo $msg."\r\n";
        ob_flush();
        flush();
    }

    function reset() {
        $this->attach = null;
        $this->smtp_cmd('RSET');
    }

    //SMTP命令发送和收收
    function smtp_cmd($msg) {
        fputs($this->smtp,$msg.$this->CRLF);
        $this->smtp_log('SEND:'. substr($msg,0,80));
        $res = fread($this->smtp, 515);
        $this->smtp_log($res);
        $this->errstr = $res;
        return $res;
    }

    function AddURL($url,$name) {
        $this->attach[$name] = $url;
    }

    //添加文件附件
    function AddFile($file,$name = '') {
        if (file_exists($file)) {
            if (!empty($name))
                return $this->attach[$name] = $file;
            $fn = pathinfo($file);
            return $this->attach[$fn['basename']] = $file;
        }
        return false;
    }

    function send($to,$subject='',$body = '') {
        $this->smtp_cmd("MAIL FROM: <".$this->from.'>');
        $mailto = explode(',',$to);
        foreach($mailto as $email_to)
            $this->smtp_cmd("RCPT TO: <".$email_to.">");
        if (intval($this->smtp_cmd("DATA")) != 354)//正确的返回必须是354
            return false;
        fwrite($this->smtp,"To:$to\nFrom: ".$this->from."\nSubject: $subject\n");

        $boundary = uniqid("--BY_路漫漫_",true);

        $headers = "MIME-Version: 1.0".$this->CRLF;
        $headers .= "From: <".$this->from.">".$this->CRLF;
        $headers .= "Content-type: multipart/mixed; boundary= $boundary\n\n".$this->CRLF;//headers结束要至少两个换行
        fwrite($this->smtp,$headers);

//        $msg = "--$boundary\nContent-Type: text/html;charset=\"ISO-8859-1\"\nContent-Transfer-Encoding: base64\n\n";
        $msg = "--$boundary\nContent-Type: text/html;charset=\"UTF-8\"\nContent-Transfer-Encoding: base64\n\n";

        $msg .= chunk_split(base64_encode($body));
        fwrite($this->smtp,$msg);
        $files = '';
        $errinfo = '';
        foreach($this->attach as $name=>$file)
        {
            $files .= $name;
            $msg = "--$boundary\n--$boundary\n";
            $msg .= "Content-Type: application/octet-stream; name=\"".iconv("UTF-8", "GB2312",$name)."\"\n";
            $msg .= "Content-Disposition: attachment; filename=\"".iconv("UTF-8", "GB2312",$name)."\"\n";
            $msg .= "Content-transfer-encoding: base64\n\n";
            fwrite($this->smtp,$msg);
            //URL like http:///file://
            if (substr($file,4,1) == ':') {
                if (!$this->AttachURL($file,$name))
                    $errinfo .= '文件下载错误:'.$name.",文件可能是错误的\r\n$file";
            }else{
                //使用BASE64编码，再用chunk_split大卸八块（每行76个字符）
                fwrite($this->smtp,chunk_split(base64_encode(file_get_contents($file))));
            }
        }
        if (!empty($errinfo))
        {
            $msg = "--$boundary\n--$boundary\n";
            $msg .= "Content-Type: application/octet-stream; name=Error.log\n";
            $msg .= "Content-Disposition: attachment; filename=Error.log\n";
            $msg .= "Content-transfer-encoding: base64\n\n";
            fwrite($this->smtp,$msg);
            fwrite($this->smtp,chunk_split(base64_encode($errinfo)));
        }
        //结束DATA发送，服务器会返回执行结果，如果代码不是250则出错。
        return intval($this->smtp_cmd("--$boundary--\n\r\n.")) == 250;
    }

    function login($su,$sp) {
        if (empty($this->smtp))
            return false;
        $res = $this->smtp_cmd("AUTH LOGIN");
        if (intval($res)>400)
            return !$this->errstr = $res;
        $res = $this->smtp_cmd(base64_encode($su));
        if (intval($res)>400)
            return !$this->errstr = $res;
        $res = $this->smtp_cmd(base64_encode($sp));
        if (intval($res)>400)
            return !$this->errstr = $res;
        $this->from = $su;
        return true;
    }
}