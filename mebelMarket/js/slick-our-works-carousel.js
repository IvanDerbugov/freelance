$(".multiple-items").slick({
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
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false,
          dots: true
        }
      }
    ]
  });


let zoomTimer;
window.addEventListener('wheel', function(e) {
    // Проверяем, что это изменение масштаба (Ctrl + колесо мыши)
    if (e.ctrlKey) {
        clearTimeout(zoomTimer);
        zoomTimer = setTimeout(function() {
            // При изменении масштаба перестраиваем карусель
            $(".multiple-items").slick('slickNext');
            setTimeout(function() {
                $(".multiple-items").slick('slickGoTo', 0);
                
                setTimeout(function() {
                    $(".multiple-items").slick('slickPrev');
                }, 50);
            }, 50);
        }, 300); // Задержка для завершения изменения масштаба
    }
});

// Добавляем слушатель изменения viewport (видимой ширины контента)
let viewportTimer;
let lastViewportWidth = window.innerWidth;

// Функция для проверки изменения viewport
function checkViewportChange() {
    const currentViewportWidth = window.innerWidth;
    
    // Если ширина viewport изменилась, перестраиваем карусель
    if (currentViewportWidth !== lastViewportWidth) {
        lastViewportWidth = currentViewportWidth;
        
        clearTimeout(viewportTimer);
        viewportTimer = setTimeout(function() {
            // При изменении viewport перестраиваем карусель
            $(".multiple-items").slick('slickNext');
            setTimeout(function() {
                $(".multiple-items").slick('slickGoTo', 0);
                
                setTimeout(function() {
                    $(".multiple-items").slick('slickPrev');
                }, 50);
            }, 50);
        }, 200);
    }
}

