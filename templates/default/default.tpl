<!-- BEGIN not_logged_in -->
<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_CONNECTION}</th>
 </tr>

 <tr>
  <td class="row1" align="center">
  <form action="{U_INDEX}?mod=profile" method="post">
  <input type="hidden" name="mode" value="login" />

  <div class="gensmall" style="padding:10px">{L_CONNECTION_EXPLAIN}</div>

  <table width="100%" cellpadding="2" cellspacing="0" border="0">
   <tr>
    <td align="right" width="50%">{L_CHARACTER_NAME} : </td><td align="left" width="50%"><input type="text" value="" name="name" class="post" /></td>
   </tr>

   <tr>
    <td align="right" width="50%">{L_PASSWORD} : </td><td align="left" width="50%"><input type="password" value="" name="password" class="post" /></td>
   </tr>

   <tr>
    <td align="center" colspan="2"><input type="submit" value="登录" class="post" /></td>
   </tr>
  </table>

  </form>

  <div class="gensmall" style="padding:10px">{L_IF_NO_ACCOUNT}<br /><br /><a href="{U_INDEX}?mod=profile&amp;mode=register" class="genmed"><b>{L_REGISTER_NOW}</b></a></div>
  </td>
 </tr>
</table>
<!-- END not_logged_in -->
<!-- BEGIN logged_in -->
<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_CHARACTER_STATS}</th>
 </tr>

 <tr>
  <td class="row1" align="center">

  <br />{L_CHARACTER_NAME} : <b>{USER_NAME}</b><br /><br />
  <div style="width:{CHAR_WIDTH}px;height:{CHAR_HEIGHT}px;background-image:url('images/charasets/{CHARASET}')"></div><br /><br />
  <a href="{U_INDEX}?mod=map">{L_GO_TO_MAP}</a><br /><br />
  <span class="gensmall"><a href="{U_INDEX}?mod=profile&mode=logout">{L_LOGOUT}</a></span><br /><br />

  </td>
 </tr>
</table>
<!-- END logged_in -->