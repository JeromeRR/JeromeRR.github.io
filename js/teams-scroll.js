setTimeout(function () {
  $('#scroll-wrap').perfectScrollbar({
    suppressScrollX: true
  });
}, 300);

$(window).on('resize', function () {
  $('#scroll-wrap').perfectScrollbar('update');
});