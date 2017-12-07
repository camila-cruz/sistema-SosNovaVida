// Adiciona uma animação para baixo quando o dropdown se expande
$('.dropdown').on('show.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideDown();
});

// Adiciona uma animação para cima quando o dropdown se retrai
$('.dropdown').on('hide.bs.dropdown', function() {
    $(this).find('.dropdown-menu').first().stop(true, true).slideUp();
});

$(".nav-tabs").on("click", "a", function(e){
    e.preventDefault();
    if (!$(this).hasClass('add-resp')) {
        $(this).tab('show');
    }
}).on("click", "span", function () {
    var anchor = $(this).siblings('a');
    $(anchor.attr('href')).remove();
    $(this).parent().remove();
    $(".nav-tabs li").children('a').first().click();
});

$('.add-resp').click(function(e) {
    e.preventDefault();
    var id = $(".nav-tabs").children().length;
    $(this).closest('li').before('<li><a href="#resp'+id+'" target="_self">New Tab</a><span>x</span></li>');         
    $('.tab-content').append('<div class="tab-pane" id="resp'+id+'">Contact Form: New Contact '+id+'</div>');
    $('.nav-tabs li:nth-child(' + id + ') a').click();
});