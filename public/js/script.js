$(document).ready(function(){
    $('nav ul a').on('click',function(){
        $('nav ul a.current').removeClass('current');
        $(this).addClass('current');

        $('h1#heading').text($(this).text());

        var category = $(this).text().toLowerCase().replace(" ","-");

        // Remove hidden class if all-projects is selected

        if (category == 'all-projects'){
            $('ul#gallery li:hidden ').fadeIn('slow').removeClass('hidden');
        } else{
            $('ul#gallery li').each(function(){
                if (!$(this).hasClass(category)){
                    $(this).hide().addClass('hidden');
                }else{
                    $(this).fadeIn('slow').removeClass('hidden');
                }
            })
        }
        return true;
    });

    $('ul#gallery li').on('mouseenter',function(){
        var title = $(this).children().data('title');
        var desc = $(this).children().data('desc');
        if (desc==null){
            desc = 'Click to Enlarge';
        }

        if(title == null){
            title = '';
        }

        $(this).append('<div class="overlay" ></div>');

        var overlay = $(this).children('.overlay');
        overlay.html('<h3>'+title+'</h3><p>'+desc+'</p>');
        overlay.fadeIn(300);
    })

    $('ul#gallery li').on('mouseleave',function(){
        $(this).append('<div class="overlay" ></div>');
        var overlay = $(this).children('.overlay');
        overlay.fadeOut(500);
    })

    $('#listHinhNguoiDung li').on('click',function(){
        var a = $(this).find('img').attr('src');
        console.log(a)
        $('#frame_main #pic').attr('src',a); 
        $('#listHinhNguoiDung li.currentHinhNguoiDung').removeClass('currentHinhNguoiDung');
        $(this).fadeIn().addClass('currentHinhNguoiDung');
    })

    $('.dathang_item').on('click',function(){
        var a = $(this).find('img').attr('src');
        
        a = a.replace('thumb_','').replace('jpg','png');
        console.log(a);

        $('#frame_main #frame').attr('src',a);

        $('.dathang_current').removeClass('dathang_current');
        $(this).addClass('dathang_current');
    })

    $('.hinhthucgiaohang').on('click',function(){
        $('.activehinhthucgiaohang').removeClass('activehinhthucgiaohang')
        $(this).addClass('activehinhthucgiaohang')
    })

    $('.tbSoluong').on('change',function(){
        var t = $(this).val();
        if (!Number.isInteger(t))
            $(this).val('0')
    });
    $('.btnInc').on('click',function(){
        var snum = $(this).parent().find(".tbSoluong").val();
        var inum = parseInt(snum);
        inum +=1;
        $(this).parent().find(".tbSoluong").val(inum+'');

    })

    $('.btnDec').on('click',function(){
        var snum = $(this).parent().find(".tbSoluong").val();
        var inum = parseInt(snum);
        inum -=1;
        if (inum<0) inum = 0;
        $(this).parent().find(".tbSoluong").val(inum+'');
    })
    
    $('.mathanglist .card').on('click',function(){
        window.location.href = "./DatHang.html";
      
    })
    $('#btnDatHang').on('click',function(){
        $( "#icon" ).show( 'slide', options, 500);
        return false;
    })

    function callback() {
        setTimeout(function() {
          $( "#effect:visible" ).removeAttr( "style" ).fadeOut();
        }, 1000 );
      };
    $(function () {
        setInterval(function () {
            
        }, 5000);
    });
});

$(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > $(window).height()*0.8) {
    $('#DatHangTrucTuyen').show("slide", { direction: "left" }, 2000);
  
    } else {
    // $('#DatHangTrucTuyen').hide("fade", 2000);
    }
  });
