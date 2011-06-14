function(e, params) {
  $('#status').text('Loading…');

  var me = this;

  var id = params.id;

  var doc = db.openDoc(id, null, {success: function(doc) {
    $('#status').text('Loaded');

    $$(me).originalDoc = doc;

    var showDoc = $.extend({}, doc);
    delete showDoc._id;
    delete showDoc._rev;
    delete showDoc._attachments;
    delete showDoc.content;
    var value = JSON.stringify(showDoc, null, 2);

    $('#extra').data('ace').getSession().setValue(value);
    $('#main').data('ace').getSession().setValue(doc.content);

    $('#futon').attr('href',
        '/_utils/document.html?showcase/' + encodeURI(doc._id));

    $('#attachments').html('<div style="clear:both"></div>');
    if (doc._attachments) {
      for (var name in doc._attachments) {
        var data = doc._attachments[name];
        var url = '/showcase/' + doc._id + '/' + name;
        var elt = $('<a>').attr({ href: url }).prependTo('#attachments');
        if (['image/jpeg'].indexOf(data.content_type) != -1) {
          $('<img>').attr('src', url).appendTo(elt);
        } else {
        }
        $('<span class=name>').text(name).appendTo(elt);
      };
    }
  }});
}
