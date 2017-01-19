<table width="100%" cellpadding="0" cellspacing="1" border="0" class="portaline">
 <tr>
  <th>{L_SELECT_EVENT_TO_DELETE}</th>
 </tr>

 <tr>
  <td class="row1" align="center" style="padding:20px">
  <form action="{U_INDEX}?mod=admin.map&amp;mode=delete_event" method="post" onsubmit="if(document.getElementById('event_id').value==0||!confirm('[L_ARE_YOU_SURE_TO_DELETE_EVENT]')){return false;}">
  <input type="hidden" name="delete_event" value="1" />
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