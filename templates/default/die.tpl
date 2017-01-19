<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{DIE_TITLE}</th>
 </tr>

 <tr>
  <td class="row1" align="center">
  <div style="padding:10px">{DIE_CONTENT}
  <!-- BEGIN clic_redirect -->
  <br /><br /><i><span class="gensmall"><a href="{clic_redirect.HTML_LOCATION}">{L_CLICK_TO_CONTINUE}</a></span></i>
  <!-- END clic_redirect -->
  <!-- BEGIN redirect -->
  <br /><br /><i><span class="gensmall">{L_REDIRECT_AT} <span id="redirect_timeout">{redirect.TIMEOUT}</span> s<br />
  <a href="{redirect.HTML_LOCATION}">{L_DO_NOT_WAIT}</a></span></i>
  <script type="text/javascript">
  <!--
  location_timeout({redirect.TIMEOUT});
  //-->
  </script>
  <!-- END redirect -->
  </div>
  </td>
 </tr>

</table>