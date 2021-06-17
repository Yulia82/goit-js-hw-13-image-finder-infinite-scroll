jQuery(document).ready(function() {
  var btn = $('#js-arrow-up');  
  $(window).scroll(function() {     
    if ($(window).scrollTop() > 300) {
        btn.removeClass('is-hidden');
       
     } else {
       btn.addClass('is-hidden');
     }
   });
   btn.on('click', function(e) {
     e.preventDefault();
     $('html, body').animate({scrollTop:0}, '300');
   });
});
