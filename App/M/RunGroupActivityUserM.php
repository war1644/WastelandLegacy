<?php
namespace App\M;
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
 * v0.9 2017/01/23 初版
 */
use Base\M;
use Base\Tool\SaveToExcel;

class RunGroupActivityUserM extends M {
    function findAll(){
        $sql = "select a.id,u.nickname,a.ks_id,a.name,a.sex,a.phone,a.idNum,a.blood,a.size,urgentName,urgentPhone,signed,signtime from $this->table as a LEFT JOIN ks_user as u ON a.ks_id=u.ks_id WHERE activity_id = 235";
        $data = $this->query($sql);
        $title = ['序号','KS昵称','KS号','姓名','性别','手机号','身份证号','血型','衣服尺码','紧急联系人','联系人电话','是否签到','签到时间'];
        SaveToExcel::exportExcel($data,$title);
    }
}