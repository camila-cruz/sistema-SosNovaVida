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
});/*.on("click", "span", function () {
    var anchor = $(this).siblings('a');
    $(anchor.attr('href')).remove();
    $(this).parent().remove();
    $(".nav-tabs li").children('a').first().click();
});*/

$('.add-resp').click(function(e) {
    e.preventDefault();
    var id = $(".nav-tabs").children().length; //think about it ;)
    $(this).closest('li').before('<li><a href="#contact_'+id+'" target="_self">New Tab</a><span>x</span></li>');         
    $('.tab-content').append('<div class="tab-pane" id="contact_'+id+'">Contact Form: New Contact '+id+'</div>');
    $('.nav-tabs li:nth-child(' + id + ') a').click();
});





var geradorDePdf = function() {
    let cache_width = $('#renderPDF').width();
    let aux_width = cache_width;
    let aux_height = $('#renderPDF').height();
    console.log("Width: " + cache_width + "\nHeight: " + aux_height);
    
    let a4_width = 595.28;
    let a4_height = 841.89;
    let a4 = [a4_width,  a4_height];

    $('#renderPDF').width((a4[0]*1.33333)-80).css('max-width', 'none');

    /*
    var pedacos = [];
    for (let i = 0; i < aux_height/a4_height; i++) {
        pedaco[i] = pedaço da imagem
    }*/

    html2canvas($('#renderPDF'), {
        onrendered: function(canvas) {

            let doc = new jsPDF({
                unit: 'px',
                format: 'a4'
            });
            let page_height = doc.internal.pageSize.height;

            var i = 0;

            while(aux_height > a4_height) {
                let img = canvas.toDataURL("image/png", 1.0);
                
                if (i > 0) {
                    doc.addPage(); // Adiciona uma página bonita
                    //doc.addPage(a4_width, a4_height);
                }

                doc.addImage(img, 'PNG', 20, 20);
                doc.setPage(i+1);

                aux_height -= a4_height;
                i++;

                /*
                //! now we add content to that page!
                pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));*/
            }
            doc.save('sos-nova-vida1.pdf');

            $('#renderPDF').width(cache_width);
            console.log("Funcionou o pdf");
        }
    });
};

var geradorSemCanvas = function() {
    let doc = new jsPDF('portrait', 'pt', 'a4');
    doc.addHTML($('#renderPDF'), function() {
        doc.save('teste.pdf');
    });
};

var geradorOtimo = function() {
    let doc = new jsPDF();
    let source = $('#renderPDF');
    doc.fromHTML(
        source,
        15,
        15,
        {
            'width': 180
        }
    );
    doc.output("datauri");
    /*
    let string = doc.output("datauristring");
    let iframe = "<iframe width='100%' height='100%' src='" + string + "'></iframe>";
    let x = window.open();
    x.document.open();
    x.document.write(iframe);
    x.document.close();

    */
};

var codigoDeOutrora = function() {
    
    var quotes = document.getElementById('renderPDF');

    let cache_width = $('#renderPDF').width();

    let a4 = [595.28, 841.89];

    //$('#renderPDF').width((a4[0]*1.33333)-80).css('max-width', 'none');
    $('#renderPDF').width((a4[0]*1.33333)-60).css('max-width', 'none');

    html2canvas(quotes, {
        onrendered: function(canvas) {

            //! MAKE YOUR PDF
            var pdf = new jsPDF('p', 'pt', 'letter');

            for (var i = 0; i <= quotes.clientHeight/980; i++) {
                //! This is all just html2canvas stuff
                var srcImg  = canvas;
                var sX      = 0;
                var sY      = 980*i; // start 980 pixels down for every new page
                var sWidth  = 900;
                var sHeight = 980;
                var dX      = 0;
                var dY      = 0;
                var dWidth  = 900;
                var dHeight = 980;

                window.onePageCanvas = document.createElement("canvas");
                onePageCanvas.setAttribute('width', 900);
                onePageCanvas.setAttribute('height', 980);
                var ctx = onePageCanvas.getContext('2d');
                // details on this usage of this function: 
                // https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial/Using_images#Slicing
                ctx.drawImage(srcImg,sX,sY,sWidth,sHeight,dX,dY,dWidth,dHeight);

                // document.body.appendChild(canvas);
                var canvasDataURL = onePageCanvas.toDataURL("image/png", 1.0);

                var width         = onePageCanvas.width;
                var height        = onePageCanvas.clientHeight;

                //! If we're on anything other than the first page,
                // add another page
                if (i > 0) {
                    //pdf.addPage(612, 791); //8.5" x 11" in pts (in*72)
                    pdf.addPage();
                }
                //! now we declare that we're working on that page
                pdf.setPage(i+1);
                //! now we add content to that page!
                //pdf.addImage(canvasDataURL, 'PNG', 20, 40, (width*.62), (height*.62));
                pdf.addImage(canvasDataURL, 'PNG', 30, 15);

            }
            //! after the for loop is finished running, we save the pdf.
            pdf.save('Test.pdf');
            $('#renderPDF').width(cache_width);
        }
    });
}