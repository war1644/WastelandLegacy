<?php

if ( !defined('IN_PHPORE') )
{
	exit;
}

$_register_error_count = (isset($this->tpldata['register_error'])) ? count($this->tpldata['register_error']) : 0;for ($_register_error_i = 0; $_register_error_i < $_register_error_count; $_register_error_i++){
echo '<br /><span style="color:red">' , ((isset($this->tpldata['register_error'][$_register_error_i]['ERROR'])) ? $this->tpldata['register_error'][$_register_error_i]['ERROR'] : '') , '</span>
';

} // END register_error
echo '
';

echo '
';

$_not_logged_in_count = (isset($this->tpldata['not_logged_in'])) ? count($this->tpldata['not_logged_in']) : 0;for ($_not_logged_in_i = 0; $_not_logged_in_i < $_not_logged_in_count; $_not_logged_in_i++){
echo '<!--动态背景图-->
';

echo '<div class="slideshow">
';

echo '  <div class="slideshow-image" style="background-image: url(\'' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'images/bgimg/01.jpg\')"></div>
';

echo '  <div class="slideshow-image" style="background-image: url(\'' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'images/bgimg/02.jpg\')"></div>
';

echo '  <div class="slideshow-image" style="background-image: url(\'' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'images/bgimg/03.jpg\')"></div>
';

echo '  <div class="slideshow-image" style="background-image: url(\'' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'images/bgimg/04.jpg\')"></div>
';

echo '</div>
';

echo '<script>
';

echo '  $("#bacBody").css("background-image","\'\'");
';

echo '</script>
';

echo '<div class="cont_centrar">
';

echo '  <div class="cont_login">
';

echo '    <div class="cont_info_log_sign_up">
';

echo '      <div class="col_md_login">
';

echo '        <div class="cont_ba_opcitiy">
';

echo '          <h2>登录</h2>
';

echo '          <p>已有账号，请登录</p>
';

echo '          <button class="btn_login" onclick="cambiar_login()">登录</button>
';

echo '        </div>
';

echo '      </div>
';

echo '      <div class="col_md_sign_up">
';

echo '        <div class="cont_ba_opcitiy">
';

echo '          <h2>注册</h2>
';

echo '          <p>没有账号，请注册</p>
';

echo '          <button class="btn_sign_up" onclick="cambiar_sign_up()">注册</button>
';

echo '        </div>
';

echo '      </div>
';

echo '    </div>
';

echo '    <div class="cont_back_info">
';

echo '      <div class="cont_img_back_grey"> <img src="' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'images/bgimg/伦敦.png" alt=""> </div>
';

echo '    </div>
';

echo '
';

echo '    <div class="cont_forms">
';

echo '      <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=profile" method="post">
';

echo '        <div class="cont_img_back_"> <img src="' , ((isset($this->tpldata['.'][0]['TEMPLATE_PATH'])) ? $this->tpldata['.'][0]['TEMPLATE_PATH'] : '') , 'images/bgimg/伦敦.png" alt=""></div>
';

echo '        <div class="cont_form_login" style="opacity: 0; display: none;">
';

echo '          <a style="text-decoration: none" href="#" onclick="ocultar_login_sign_up()"><b class="close">x</b></a>
';

echo '          <h2>登录</h2>
';

echo '
';

echo '          <input type="text" name="name" placeholder="用户名">
';

echo '          <input type="hidden" name="mode" value="login" placeholder="用户名">
';

echo '          <input type="password" name="password" placeholder="密码">
';

echo '          <button type="submit" class="btn_login">登录</button>
';

echo '        </div>
';

echo '      </form>
';

echo '
';

echo '      <form action="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=profile" method="post">
';

echo '        <input type="hidden" name="mode" value="register" />
';

echo '        <div class="cont_form_sign_up" style="display: none; opacity: 0;">
';

echo '          <a style="text-decoration: none" href="#" onclick="ocultar_login_sign_up()"><b class="close">x</b></a>
';

echo '          <h2>注册</h2>
';

echo '          <input type="text" name="email" placeholder="邮箱">
';

echo '          <input type="text" name="name" placeholder="用户名">
';

echo '          <input type="password" name="password" placeholder="密码">
';

echo '          <input type="password" name="password_confirm" placeholder="确认密码">
';

echo '          <br id="cpass"/>
';

echo '
';

echo '          <button class="btn_sign_up">注册</button>
';

echo '        </div>
';

echo '      </form>
';

echo '    </div>
';

echo '  </div>
';

echo '</div>
';

} // END not_logged_in
echo '
';

$_logged_in_count = (isset($this->tpldata['logged_in'])) ? count($this->tpldata['logged_in']) : 0;for ($_logged_in_i = 0; $_logged_in_i < $_logged_in_count; $_logged_in_i++){
echo ' <div class="come_map">
';

echo '    <h3>' , ((isset($this->tpldata['.'][0]['L_CHARACTER_STATS'])) ? $this->tpldata['.'][0]['L_CHARACTER_STATS'] : ((isset($lang->character_stats)) ? $lang->character_stats : '')) , '</h3>
';

echo '
';

echo '    <div class="row1" align="center">
';

echo '
';

echo '      ' , ((isset($this->tpldata['.'][0]['L_CHARACTER_NAME'])) ? $this->tpldata['.'][0]['L_CHARACTER_NAME'] : ((isset($lang->character_name)) ? $lang->character_name : '')) , ' : <b>' , ((isset($this->tpldata['.'][0]['USER_NAME'])) ? $this->tpldata['.'][0]['USER_NAME'] : '') , '</b><br /><br />
';

echo '      <div style="width:' , ((isset($this->tpldata['.'][0]['CHAR_WIDTH'])) ? $this->tpldata['.'][0]['CHAR_WIDTH'] : '') , 'px;height:' , ((isset($this->tpldata['.'][0]['CHAR_HEIGHT'])) ? $this->tpldata['.'][0]['CHAR_HEIGHT'] : '') , 'px;background-image:url(\'images/charasets/' , ((isset($this->tpldata['.'][0]['CHARASET'])) ? $this->tpldata['.'][0]['CHARASET'] : '') , '\')"></div><br />
';

echo '      <a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=map">' , ((isset($this->tpldata['.'][0]['L_GO_TO_MAP'])) ? $this->tpldata['.'][0]['L_GO_TO_MAP'] : ((isset($lang->go_to_map)) ? $lang->go_to_map : '')) , '</a><br /><br />
';

echo '      <span class="gensmall"><a href="' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=profile&mode=logout">' , ((isset($this->tpldata['.'][0]['L_LOGOUT'])) ? $this->tpldata['.'][0]['L_LOGOUT'] : ((isset($lang->logout)) ? $lang->logout : '')) , '</a></span><br /><br />
';

echo '    </div>
';

echo ' </div>
';

} // END logged_in
echo '<script>
';

echo '    function cambiar_login() {
';

echo '        document.querySelector("#backMp3").src = "music/Startup.mp3";
';

echo '        document.querySelector(\'.cont_forms\').className = "cont_forms cont_forms_active_login cont_forms_ch";
';

echo '        document.querySelector(\'.cont_form_login\').style.display = "block";
';

echo '        document.querySelector(\'.cont_form_sign_up\').style.opacity = "0";
';

echo '
';

echo '        setTimeout(function(){  document.querySelector(\'.cont_form_login\').style.opacity = "1"; },400);
';

echo '
';

echo '        setTimeout(function(){
';

echo '            document.querySelector(\'.cont_form_sign_up\').style.display = "none";
';

echo '        },200);
';

echo '    }
';

echo '
';

echo '    function cambiar_sign_up(at) {
';

echo '        $.get(\'' , ((isset($this->tpldata['.'][0]['U_INDEX'])) ? $this->tpldata['.'][0]['U_INDEX'] : '') , '?mod=profile&mode=register\',\'\',function (res) {
';

echo '            if (res) {
';

echo '                var classList = JSON.parse(res);
';

echo '                for (var i in classList) {
';

echo '                    var obj = classList[i];
';

echo '                    var classnode = \'<input class="typeradio" type="radio" name="classname" value="\'+obj.CLASSNAME+\'"\'+ obj.CHECKED +\'/><img src="images/battlers/\'+obj.BATTLER+\'" alt=""><b>\'+obj.CLASS_TITLE+\'</b><i>\'+obj.DESCRIPTION+\'</i>\';
';

echo '                    $("#cpass").after(classnode);
';

echo '                }
';

echo '            }
';

echo '
';

echo '        });
';

echo '        document.querySelector("#backMp3").src = "music/NameSetting.mp3";
';

echo '
';

echo '        document.querySelector(\'.cont_forms\').className = "cont_forms cont_forms_active_sign_up cont_forms_change";
';

echo '        document.querySelector(\'.cont_form_sign_up\').style.display = "block";
';

echo '        document.querySelector(\'.cont_form_login\').style.opacity = "0";
';

echo '
';

echo '        setTimeout(function(){  document.querySelector(\'.cont_form_sign_up\').style.opacity = "1";
';

echo '        },100);
';

echo '
';

echo '        setTimeout(function(){   document.querySelector(\'.cont_form_login\').style.display = "none";
';

echo '        },400);
';

echo '    }
';

echo '    function ocultar_login_sign_up() {
';

echo '
';

echo '        document.querySelector(\'.cont_forms\').className = "cont_forms";
';

echo '        document.querySelector(\'.cont_form_sign_up\').style.opacity = "0";
';

echo '        document.querySelector(\'.cont_form_login\').style.opacity = "0";
';

echo '
';

echo '        setTimeout(function(){
';

echo '            document.querySelector(\'.cont_form_sign_up\').style.display = "none";
';

echo '            document.querySelector(\'.cont_form_login\').style.display = "none";
';

echo '        },500);
';

echo '
';

echo '    }
';

echo '
';

echo '</script>
';

echo '
';

echo '
';

echo '
';

echo '
';

echo '
';

echo '
';

echo '
';


