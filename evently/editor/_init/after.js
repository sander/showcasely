function() {
  // TODO JSON mode
  var JavaScriptMode = require('ace/mode/javascript').Mode;
  var HtmlMode = require('ace/mode/html').Mode;

  var main = ace.edit('main');
  main.getSession().setMode(new HtmlMode());
  main.getSession().setUseWrapMode(true);
  $('#main').data('ace', main);

  var extra = ace.edit('extra');
  extra.getSession().setMode(new JavaScriptMode());
  extra.getSession().setUseWorker(false);
  $('#extra').data('ace', extra);

  $$(this).originalDoc = null;
  $$(this).uploadAttachments = null;

  $('#attachments').bind('dragover', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });
  var me = this;
  $('#attachments').bind('drop', function(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.originalEvent.dataTransfer.files;
    var numberOfFiles = 0;
    var addToAttachments = {};
    for (var i = 0, f; f = files[i]; i++) {
      var reader = new FileReader();

      reader.onload = (function(theFile) {
        return function(e) {
          var result = e.target.result;
          var base64 = result.substring(result.indexOf(',') + 1);
          addToAttachments[theFile.name] = {
            content_type: theFile.type,
            data: base64
          };

          var n = 0; for (var i in addToAttachments) n++;
          if (n == numberOfFiles) {
            $$(me).uploadAttachments = addToAttachments;
            $('#save').click();
          }
        };
      })(f);

      reader.readAsDataURL(f);

      numberOfFiles++;
    }
  });
}
