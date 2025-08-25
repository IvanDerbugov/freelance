$(".multiple-items-saleMonth").slick({
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,

    responsive: [
        {
            breakpoint: 1220,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 700,
            settings: {
                slidesToShow: 1,
            }
        }
    ]
})