$(".reviews-carousel-wrapper").slick({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    responsive: [
        {
            breakpoint: 1400,
            settings: {
                slidesToShow: 3,
            }
        },
        {
            breakpoint: 1300,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnHover: true,
                pauseOnFocus: true,
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnHover: true,
                pauseOnFocus: true,
            }
        },
        {
            breakpoint: 500,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 1,
                infinite: true,
                arrows: false,
                autoplay: true,
                autoplaySpeed: 2000,
                pauseOnHover: true,
                pauseOnFocus: true,
            }
        }
    ]
})