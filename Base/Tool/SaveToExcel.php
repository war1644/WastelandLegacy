<?php
namespace Base\Tool;
/**
 * 导出数据为excel
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @since
 * <p>v0.9 2017/1/23 9:10  初版</p>
 * <p>v1.0 2017/1/23 11:55  增强对特殊字符的支持</p>
 */

class SaveToExcel {

    /**
     * 导出数据为excel表格
     * @param array $data    一个二维数组,结构如同从数据库查出来的数组
     * @param array $title   excel第一行的标题
     * @param string $filename 文件名
     */
    public static function exportExcel($data=array(),$title=array()){
        //导出xls 开始
        $file = RUN_PATH.'macList.xls';
        $head = <<<head
<html xmlns:o="urn:schemas-microsoft-com:office:office"
xmlns:x="urn:schemas-microsoft-com:office:excel"
xmlns="http://www.w3.org/TR/REC-html40">
<head>
<meta http-equiv="expires" content="Mon, 06 Jan 1999 00:00:01 GMT">
<meta http-equiv=Content-Type content="text/html; charset=gb2312">
<!--[if gte mso 9]><xml>
<x:ExcelWorkbook>
<x:ExcelWorksheets>
<x:ExcelWorksheet>
<x:Name></x:Name>
<x:WorksheetOptions>
<x:DisplayGridlines/>
</x:WorksheetOptions>
</x:ExcelWorksheet>
</x:ExcelWorksheets>
</x:ExcelWorkbook>
</xml><![endif]-->
</head>
<table>
head;
        file_put_contents($file,"$head");
        if (!empty($title)){
            foreach ($title as $k => $v) {
                $title[$k]=iconv("UTF-8", "GB2312","<td><strong>$v</strong></td>");
            }
            $title = implode("\t ", $title);
            file_put_contents($file,"<tr>$title</tr>",FILE_APPEND);
        }
        if (!empty($data)){
            foreach($data as $key=>$val){
                foreach ($val as $ck => $cv) {

                        $data[$key][$ck]=mb_convert_encoding("<td>$cv</td>","GB2312","UTF-8");

                }
                $data[$key]='<tr>'.implode("\t ", $data[$key]).'</tr>';
            }

            file_put_contents($file,implode("\n",$data).'</table>',FILE_APPEND);


        }


    }

}