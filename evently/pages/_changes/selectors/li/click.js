function() {
  $('#pages li').toggleClass('active', false);
  $(this).addClass('active');

  var id = $(this).find('.id').text();

  location.hash = '/edit/' + encodeURI(id);
  //$(this).trigger('edit', {id: id});
}
