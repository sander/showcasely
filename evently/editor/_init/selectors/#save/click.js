function(e) {
  $('#save').attr('disabled', 'disabled');
  $('#status').text('Saving…');

  if (!$$(this.parentNode.parentNode).originalDoc)
    return;

  var original = $$(this.parentNode.parentNode).originalDoc;
  var uploadAttachments = $$(this.parentNode.parentNode).uploadAttachments;

  var doc = JSON.parse($('#extra').data('ace').getSession().getValue());
  doc._id = original._id;
  doc._rev = original._rev;

  if (original._attachments)
    doc._attachments = original._attachments;
  else if (uploadAttachments)
    doc._attachments = {};

  if (uploadAttachments)
    $.extend(doc._attachments, uploadAttachments);

  doc.content = $('#main').data('ace').getSession().getValue();

  $$(this.parentNode.parentNode).originalDoc = doc;

  var me = this;
  db.saveDoc(doc, {success: function(response) {
    if (uploadAttachments) {
      $$(me.parentNode.parentNode).uploadAttachments = null;
      db.openDoc(doc._id, null, {success: function(doc) {
        $(me).trigger('edit', {id: doc._id});
        //$(me).trigger('saved', response);
      }});
    } else {
      $(me).trigger('saved', response);
    }
  }});
}
