<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_CREATE_EVENT}</th>
 </tr>

 <tr>
  <td class="row1">
  <form action="{U_INDEX}?mod=admin.map&amp;mode=create_equipmentr" method="POST">

    <input type="hidden" name="create_equipmentr" value="1" />
  <table width="100%" cellpadding="7" cellspacing="0" border="0">
   <tr>

  <td align="right" width="50%">贩卖地 :
    <select name="map_id" id="map_id">
    <option value="0"> - </option>
  <!-- BEGIN map_list -->
    <option value="{map_list.ID}">{map_list.ID}. {map_list.NAME}</option>
  <!-- END map_list -->
    </select>
  </td>



   </tr>
   <tr>
    <td align="right" width="50%">物品类型 :</td><td align="left" width="50%"><input type="text" name="type" value="" /></td>
   <tr>
    <td align="right" width="50%">装备位置:</td><td align="left" width="50%"><input type="text" name="position" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">物品名称 :</td><td align="left" width="50%"><input type="text" name="name" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">物品价格:</td><td align="left" width="50%"><input type="text" name="price" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">攻击力:</td><td align="left" width="50%"><input type="text" name="attack" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">攻击范围 :</td><td align="left" width="50%"><input type="text" name="range" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">防御力 :</td><td align="left" width="50%"><input type="text" name="defence" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">可装备 :</td><td align="left" width="50%"><input type="text" name="usable" value="" /></td>
   </tr>
   <tr>
    <td align="right" width="50%">特效 :</td><td align="left" width="50%"><input type="text" name="effects" value="" /></td>
   </tr>

    <td align="center" colspan="2"><input type="submit" value="{L_VALIDATE}" class="button" /></td>
   </tr>
  </table>

  </form>
  </td>
 </tr>
</table>