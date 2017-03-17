<?php
namespace App\C\Home;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * demo 示例
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @version
 * v1.0 2017/02/26 邮件SMTP及表格导出测试
 * v0.9 2016/12/8 初版
 */
use Base\C;
use Base\Tool\SMTP;

class HomeC extends C{

    public function home(){
        for ($i=9;$i<=19;$i++){

            $mac = dechex($i);
            if (strlen($mac)==1){
                $mac = "0$mac";
            }
            Dump($mac);

            $name = strtoupper($mac);
            $log[$i] = "14580f0000$mac";
        }
        MFLog($log);
    }

    public function fuck(){
        $acticity = new RunGroupActivityUserM();
        $file = UP_PATH.'export.xls';
        $acticity->findAll();
        file_put_contents($file,ob_get_contents(),LOCK_EX);

        $subject = "测试邮件系统";//邮件主题
        $body = "<h1> 测试邮件系统----路漫漫 </h1>";//邮件内容
        $mail = SMTP::Ins();
        //加附件先加再发送，如果不指定name自动从指定的文件中取文件名
        $mail->AddFile($file,'跑团活动.xls');
        //发送邮件，多个使用','分隔
        $mail->send('ahmerry@qq.com',$subject,$body);
    }

    public function test(){
        $this->view('Base/chat.php');
    }
}