function(e, response) {
  $$(this).originalDoc._rev = response.rev;
  $('#save').removeAttr('disabled');
  $('#status').text('Saved');
}
