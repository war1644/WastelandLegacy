<!-- BEGIN register_error -->
<br /><span style="color:red">{register_error.ERROR}</span>
<!-- END register_error -->


<!-- BEGIN not_logged_in -->
<div class="cont_centrar">
    <div class="cont_login">
      <div class="cont_info_log_sign_up">
        <div class="col_md_login">
          <div class="cont_ba_opcitiy">
            <h2>登录</h2>
            <p>已有账号，请登录</p>
            <button class="btn_login" onclick="cambiar_login()">登录</button>
          </div>
        </div>
        <div class="col_md_sign_up">
          <div class="cont_ba_opcitiy">
            <h2>注册</h2>
            <p>没有账号，请注册</p>
            <button class="btn_sign_up" onclick="cambiar_sign_up()">注册</button>
          </div>
        </div>
      </div>
      <div class="cont_back_info">
        <div class="cont_img_back_grey"> <img src="{TEMPLATE_PATH}images/bgimg/伦敦.png" alt=""> </div>
      </div>

      <div class="cont_forms">
          <form action="{U_INDEX}?mod=profile" method="post">
            <div class="cont_img_back_"> <img src="{TEMPLATE_PATH}images/bgimg/伦敦.png" alt=""></div>
            <div class="cont_form_login" style="opacity: 0; display: none;">
              <a style="text-decoration: none" href="#" onclick="ocultar_login_sign_up()"><b class="close">x</b></a>
              <h2>登录</h2>

                <input type="text" name="name" placeholder="用户名">
              <input type="hidden" name="mode" value="login" placeholder="用户名">
                <input type="password" name="password" placeholder="密码">
                <button type="submit" class="btn_login">登录</button>
            </div>
          </form>

          <form action="{U_INDEX}?mod=profile" method="post">
            <input type="hidden" name="mode" value="register" />
            <div class="cont_form_sign_up" style="display: none; opacity: 0;">
              <a style="text-decoration: none" href="#" onclick="ocultar_login_sign_up()"><b class="close">x</b></a>
              <h2>注册</h2>
              <input type="text" name="email" placeholder="邮箱">
              <input type="text" name="name" placeholder="用户名">
              <input type="password" name="password" placeholder="密码">
              <input type="password" name="password_confirm" placeholder="确认密码">
              <br id="cpass"/>

              <button class="btn_sign_up">注册</button>
            </div>
          </form>
      </div>
    </div>
</div>
<!-- END not_logged_in -->
<!-- BEGIN logged_in -->
<h3>{L_CHARACTER_STATS}</h3>

  <div class="row1" align="center">

    <br />{L_CHARACTER_NAME} : <b>{USER_NAME}</b><br /><br />
    <div style="width:{CHAR_WIDTH}px;height:{CHAR_HEIGHT}px;background-image:url('images/charasets/{CHARASET}')"></div><br /><br />
    <a href="{U_INDEX}?mod=map">{L_GO_TO_MAP}</a><br /><br />
    <span class="gensmall"><a href="{U_INDEX}?mod=profile&mode=logout">{L_LOGOUT}</a></span><br /><br />
  </div>
<!-- END logged_in -->
<script>

    function cambiar_login() {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_login cont_forms_ch";
        document.querySelector('.cont_form_login').style.display = "block";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";

        setTimeout(function(){  document.querySelector('.cont_form_login').style.opacity = "1"; },400);

        setTimeout(function(){
            document.querySelector('.cont_form_sign_up').style.display = "none";
        },200);
    }

    function cambiar_sign_up(at) {
        document.querySelector('.cont_forms').className = "cont_forms cont_forms_active_sign_up cont_forms_change";
        document.querySelector('.cont_form_sign_up').style.display = "block";
        document.querySelector('.cont_form_login').style.opacity = "0";

        setTimeout(function(){  document.querySelector('.cont_form_sign_up').style.opacity = "1";
        },100);

        setTimeout(function(){   document.querySelector('.cont_form_login').style.display = "none";
        },400);


    }



    function ocultar_login_sign_up() {

        document.querySelector('.cont_forms').className = "cont_forms";
        document.querySelector('.cont_form_sign_up').style.opacity = "0";
        document.querySelector('.cont_form_login').style.opacity = "0";

        setTimeout(function(){
            document.querySelector('.cont_form_sign_up').style.display = "none";
            document.querySelector('.cont_form_login').style.display = "none";
        },500);

    }



    $.get('{U_INDEX}?mod=profile&mode=register','',function (res) {
        if (res) {
            var classList = JSON.parse(res);
            for (var i in classList) {
                var obj = classList[i];
                var classnode = '<input class="typeradio" type="radio" name="classname" value="'+obj.CLASSNAME+'"'+ obj.CHECKED +'/><img src="images/battlers/'+obj.BATTLER+'" alt=""><b>'+obj.CLASS_TITLE+'</b><i>'+obj.DESCRIPTION+'</i>';
                $("#cpass").after(classnode);
            }
        }

    });
</script>


</div>






