// $(document).ready(function() {
//     console.log('Slick Our Works Carousel: Document ready');
    
//     // Проверяем, есть ли элемент
//     var sliderElement = $(".our-works-slider");
//     console.log('Slider element found:', sliderElement.length);
    
//     if (sliderElement.length > 0) {
//         console.log('Initializing Slick slider...');
        
//         sliderElement.slick({
//             dots: true,
//             infinite: true,
//             speed: 500,
//             slidesToShow: 4,
//             slidesToScroll: 1,
//             autoplay: false,
//             autoplaySpeed: 3000,
//             responsive: [
//                 {
//                     breakpoint: 1200,
//                     settings: {
//                         slidesToShow: 3,
//                         slidesToScroll: 1
//                     }
//                 },
//                 {
//                     breakpoint: 900,
//                     settings: {
//                         slidesToShow: 2,
//                         slidesToScroll: 1
//                     }
//                 },
//                 {
//                     breakpoint: 600,
//                     settings: {
//                         slidesToShow: 1,
//                         slidesToScroll: 1
//                     }
//                 }
//             ]
//         });
        
//         console.log('Slick slider initialized successfully');
        
//         // Добавляем обработчик события инициализации
//         sliderElement.on('init', function(event, slick) {
//             console.log('Slick initialized:', slick);
//             $('.our-works-carousel-wrapper').addClass('slick-initialized');
//         });
        
//         // Добавляем обработчик события после изменения слайда
//         sliderElement.on('afterChange', function(event, slick, currentSlide) {
//             console.log('Slide changed to:', currentSlide);
//         });
        
//     } else {
//         console.error('Slider element not found!');
//     }
// });
  

$(".multiple-items").slick({
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    
    responsive: [
      {
        breakpoint: 1350,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      }
    ]
  });