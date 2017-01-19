<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">

 <tr>
  <th>{L_SELECT_EVENT_TO_EDIT}</th>
 </tr>

 <tr>
  <td class="row1" align="center" style="padding:20px">
  <form action="{U_INDEX}" method="GET" onsubmit="if(document.getElementById('event_id').value==0){return false;}">
  <input type="hidden" name="mod" value="admin.map" />
  <input type="hidden" name="mode" value="event_editor" />
  <select name="event_id" id="event_id">
  <option value="0"> - </option>
<!-- BEGIN event_list -->
  <option value="{event_list.ID}">{event_list.ID}. {event_list.NAME}</option>
<!-- END event_list -->
  </select>
  <input type="submit" value="{L_VALIDATE}" class="button" />
  </form>
  </td>
 </tr>
</table>