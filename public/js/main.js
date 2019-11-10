window.onscroll = function () {
    myFunction()
};

var header = document.getElementById("myHeader");

var sticky = header.offsetTop;

function myFunction() {
    if (window.pageYOffset > sticky) {
        header.classList.add("sticky");
    } else {
        header.classList.remove("sticky");
    }
}

//LocalStorage
var count = localStorage.getItem('count');
if (count >= 10) {
    localStorage.clear();
    localStorage.setItem('count', 1)
} else if (count !== null) {
    localStorage.setItem('count', ++count);
}
else {
    localStorage.setItem('count', 1)
}

jQuery(document).ready(function () {

    var $opts = {
        infinite: true,
        autoplay: true,
        pauseOnHover: true,
        pauseOnDotsHover: true,
        touchThreshold: 100,
        dots: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
                breakpoint: 899.98,
                settings: {
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
    };
    $('.multiple-items').slick($opts);

    $('#slideform').on('submit', function (e) {
        e.preventDefault();

        $.ajax({
            type: 'POST',
            data: $('#slideform').serialize(),
            url: '/store',
            success: function (response) {
                var data = JSON.parse(response);

                var html = '<div class="item text-center border border-light" data-id="' + data.id + '">' +
                    '<h3>' + data.text + '</h3>' +
                    '<span>' + data.count + '</span>' +
                    '</div>';

                $('.multiple-items').slick('slickAdd', html);
            }
        });
    });

    $('.multiple-items').on('afterChange', function (event, slick, currentSlide) {
        var elSlide = $(slick.$slides[currentSlide]);
        var id = elSlide.data('id');
        $.ajax({
            type: 'POST',
            data: {id: id},
            headers: {'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')},
            url: '/update',
            success: function (response) {
                var data = JSON.parse(response);
                $('[data-id="' + data.id + '"]').find('span').text(data.count);
            }
        });
    });
});