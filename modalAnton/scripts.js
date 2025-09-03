//Выбрать в избраное
const js__lkpopupClick = document.querySelectorAll('.js__lkpopup-click');



for (let i = 0; i < js__lkpopupClick.length; i++) {
  if (js__lkpopupClick[i]) {
    js__lkpopupClick[i].addEventListener('click', () => {
      js__lkpopupClick[i].classList.toggle('open');
    })
  }
}







//cохранить изменить всплывашка в корзине
const js__cardsSaveclick = document.querySelectorAll('.js__cards-saveclick');
const js__cardsChangeclick = document.querySelectorAll('.js__cards-changeclick');
const js__itogoSave = document.querySelectorAll('.js__cards-itogosave');
const js__itogoChange = document.querySelectorAll('.js__cards-itogochange');



for (let i = 0; i < js__cardsSaveclick.length; i++) {
  const width = js__itogoSave[i].clientWidth + 20;


  if (js__cardsSaveclick[i]) {
    js__cardsSaveclick[i].addEventListener('click', (e) => {
      e.preventDefault();
      js__itogoSave[i].style.transform = `translate(${-width}px, 0px)`;
      js__itogoSave[i].style.height = '0px';
      js__itogoChange[i].style.transform = `translate(${-width + 20}px, 0px)`;
      js__itogoChange[i].style.marginLeft = `0px`;
    });

    js__cardsChangeclick[i].addEventListener('click', (e) => {
      e.preventDefault();
      js__itogoSave[i].style.transform = `translate(0px, 0px)`;
      js__itogoSave[i].style.height = 'auto';
      js__itogoChange[i].style.transform = `translate(0px, 0px)`;
      js__itogoChange[i].style.marginLeft = `20px`;
    });

  };

}






//checkbox true false input disabled true false
const js__checked = document.querySelector('.js__checked');
const js__checkedlabel = document.querySelector('.js__checked-label');
const js__checkedDisabled = document.querySelectorAll('.js__checked-disabled');




for (let i = 0; i < js__checkedDisabled.length; i++) {
  Disabled(false);

  if (js__checkedlabel) {
    js__checkedlabel.addEventListener('click', (e) => {
      if (js__checked.checked) {
        Disabled(false);
        remove(js__checkedDisabled[i]);
      } else {
        Disabled(true);
        add(js__checkedDisabled[i]);
      }
    });
  };



  function Disabled(disabledNew) {
    js__checkedDisabled[i].disabled = disabledNew;
  }
};







//Склад
const js__warehouseClick = document.querySelectorAll('.js__warehouse-click');
const warehouse__content = document.querySelector('.warehouse__content');
const warehouse__head = document.querySelector('.warehouse__head');




for (let i = 0; i < js__warehouseClick.length; i++) {
  if (js__warehouseClick[i]) {
    js__warehouseClick[i].addEventListener('click', () => {
      if (warehouse__content.querySelector('.active') && warehouse__content.querySelector('.active').classList.contains('active')) {
        warehouse__content.querySelector('.active').classList.remove('active');
        warehouse__head.querySelector('.active').classList.remove('active');
        console.log('true');

      } else {
        console.log('false');
      }


      warehouse__head.querySelector('.open').classList.remove('open');
      warehouse__head.querySelectorAll('.warehouse__tr')[i].classList.add('open');

      warehouse__content.querySelector('.open').classList.remove('open');
      warehouse__content.querySelectorAll('.js__warehouse-open')[i].classList.add('open');






    })
  }


  const js__warehouseClose = document.querySelectorAll('.js__warehouse-close');

  console.log(js__warehouseClose);

  for (let i = 0; i < js__warehouseClose.length; i++) {
    if (js__warehouseClose[i]) {
      js__warehouseClose[i].addEventListener('click', () => {


        warehouse__content.querySelectorAll('.js__warehouse-open')[i].classList.add('active');
        warehouse__head.querySelectorAll('.warehouse__tr')[i].classList.add('active');



      })
    }
  }
}






// Селекты
function select() {
  var time = 100,
    trigger = false;
  $('.select__trigger').click('click', function (e) {


    var drop = $(this).siblings('.select__drop');
    trigger = $(this);
    trigger.toggleClass('active');
    drop.fadeToggle(time);
    $(document).mouseup(function (e) {
      if (!trigger.is(e.target)
        && trigger.has(e.target).length === 0
        && !drop.is(e.target)
        && drop.has(e.target).length === 0) {
        trigger.removeClass('active');

        drop.fadeOut(time);
      }
    });
    $('body').on('change', '.select__drop input', function () {
      if ($(this).is(':checked')) {
        /* trigger.find('span').text($(this).siblings('label').text()); */

        trigger.find('input').val($(this).siblings('label').text());

      }
      trigger.removeClass('active');
      drop.fadeOut(time);

    });
  })
}
select();


const select__drop = document.querySelectorAll('.select__drop');


for (let i = 0; i < select__drop.length; i++) {
  if (select__drop[i]) {
    select__drop[i].addEventListener('click', (e) => {
      e.stopPropagation();
    })
  }
}

const selectli = document.querySelectorAll('.zalupa');




for (let i = 0; i < selectli.length; i++) {
  if (selectli[i]) {
    selectli[i].addEventListener('click', (e) => {
      if (e.target.classList.contains('status1')) {
        e.target.parentElement.classList.add('active')
        document.querySelector('.status2').parentElement.classList.remove('active')
      }
      if (e.target.classList.contains('status2')) {
        e.target.parentElement.classList.add('active')
        document.querySelector('.status1').parentElement.classList.remove('active')
      }
    })
  }
}



//charts slider
const chart__swiper = document.querySelector('.charts__swiper-container');

if (chart__swiper) {
  const charts__swiper = new Swiper('.charts__swiper-container', {
    // Optional parameters
    slidesPerView: 6,
    spaceBetween: 9,


    // Navigation arrows
    navigation: {
      nextEl: '.charts__swiper-button-next',
      prevEl: '.charts__swiper-button-prev',
    }
  });
}






const autotova__swiper = document.querySelector('.autotovar__swiper-container');

if (autotova__swiper) {
  //autotovar slider
  const autotovar__swiper = new Swiper('.autotovar__swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

  });

  const autotovarmini__swiper = new Swiper('.autotovarmini__swiper-container', {
    // Optional parameters
    slidesPerView: 2,
    spaceBetween: 6,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 6,
      },

      501: {
        slidesPerView: 2,
        direction: 'vertical',
      },



    }
  });


  //Управление slider
  autotovar__swiper.controller.control = autotovarmini__swiper;
  autotovarmini__swiper.controller.control = autotovar__swiper;

}





const popup__swipe = document.querySelector('.popup__swiper-container');

if (popup__swipe) {
  //popup slider
  const popup__swiper = new Swiper('.popup__swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    effect: 'fade',
    fadeEffect: {
      crossFade: true
    },

    // Navigation arrows
    navigation: {
      nextEl: '.popup__swiper-button-next',
      prevEl: '.popup__swiper-button-prev',
    }

  });


  const popupmini__swiper = new Swiper('.popupmini__swiper-container', {
    // Optional parameters
    slidesPerView: 6,
    spaceBetween: 30,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 4,
        spaceBetween: 15,
      },

      501: {
        slidesPerView: 6,
      },



      665: {
        spaceBetween: 30,
      },


    }

  });


  //Управление slider
  popup__swiper.controller.control = popupmini__swiper;
  popupmini__swiper.controller.control = popup__swiper;
}







//popup
const js__popupClick = document.querySelectorAll('.popup__click');
const html = document.querySelector('html');
const header = document.querySelector('header');

const lockPaddingValue = window.innerWidth - html.offsetWidth + 'px'; //Получили ширину scrolla


header.style.transition = '0s';


for (let i = 0; i < js__popupClick.length; i++) {
  js__popupClick[i].addEventListener('click', (e) => {
    e.stopPropagation();
    const popup__name = js__popupClick[i].dataset.modal;

    const popupCurent = document.querySelector(`[data-popup="${popup__name}"]`);
    const popupContent = popupCurent.querySelector('.js__popup-content');
    const popup__close = popupCurent.querySelector('.popup__close');


    add(popupCurent, html);



    popupCurent.addEventListener('click', (e) => {
      e.stopPropagation();
      remove(popupCurent);

      setTimeout(() => {
        remove(popupCurent, html);
        html.style.paddingRight = '0px';
        header.style.paddingRight = '0px';

      }, 400);
    });

    popup__close.addEventListener('click', () => {
      remove(popupCurent);

      setTimeout(() => {
        remove(popupCurent, html);
        html.style.paddingRight = '0px';
        header.style.paddingRight = '0px';

      }, 400);
    });


    if (popupContent) {
      popupContent.addEventListener('click', (e) => {
        e.stopPropagation();
      })
    }

    html.style.paddingRight = lockPaddingValue;
    header.style.paddingRight = lockPaddingValue


  })


}



function add(...js__popupAdd) {
  for (let i = 0; i < js__popupAdd.length; i++) {
    js__popupAdd[i].classList.add('open');
  }
}

function remove(...js__popupRemove) {
  for (let i = 0; i < js__popupRemove.length; i++) {
    js__popupRemove[i].classList.remove('open');
  }
}










//  Ivan Eremeev - 2021
//  Skype: ivan.eremeev_1
//  Telegram: IvanMessage
//  Email: ivan.frontcoder@gmail.com

$(document).ready(function () {

  // Брэйкпоинты js
  var breakXl = 1400,
    breakLg = 1200,
    breakMd = 991,
    breakSm = 767,
    breakXs = 500;

  // Запрет перехода по ссылкам с хэшем
  $('a[href="#"]').click(function (e) {
    e.preventDefault();
  });



  // Scroll to ID // Плавный скролл к элементу при нажатии на ссылку.
  function menuScroll(menuItem) {
    menuItem.find('a[href^="#"]').click(function () {
      var scroll_el = $(this).attr('href'),
        time = 500;
      if ($(scroll_el).length != 0) {
        $('html, body').animate({ scrollTop: $(scroll_el).offset().top - 70 }, time);
        $(this).addClass('active');
      }
      return false;
    });
  };
  menuScroll($('.js-scroll'));


  // Табы
  function tabs() {
    $('.js-tabs').each(function () {
      var tabs = $(this),
        trigger = tabs.find('.js-tabs-trigger'),
        content = tabs.find('.js-tabs-content');

      trigger.on('click', function () {
        var $this = $(this),
          $thisContent = $('[data-trigger="' + $this.data('content') + '"]');




        if (!$this.hasClass('active')) {
          trigger.removeClass('active');
          content.removeClass('open');

          $this.addClass('active');
          $thisContent.addClass('open');
          /* swiperTariffs.update();
         swiperTariffs.slideTo(0);
         swiperTariffs.slideTo(1); */
        } else {
          return false;
        }
      })
    })
  }

    function newTabs() {
        const tabs = document.querySelectorAll(".js-tabs");

        tabs.forEach(tab => {
            const triggers = tab.querySelectorAll(".js-tabs-trigger");
            const contents = tab.querySelectorAll("[data-trigger]");

            triggers.forEach((trigger, i) => {
                trigger.addEventListener("click", () => {
                    triggers.forEach(item => item.classList.remove("active"));
                    trigger.classList.add("active");

                    contents.forEach(content => {
                        content.classList.remove("open");
                        if (content.dataset.trigger === trigger.dataset.content) {
                            content.classList.add("open");
                        }
                    });
                });
            });
        });
    }

    newTabs();






  //Стирает innerText в input
  const analys__selectclicksvg = document.querySelectorAll('.analys__select-clicksvg');
  const analys__valueResetJs = document.querySelectorAll('.analys__value-resetjs');



  for (let i = 0; i < analys__selectclicksvg.length; i++) {
    if (analys__selectclicksvg[i]) {
      analys__selectclicksvg[i].addEventListener('click', (e) => {
        e.stopPropagation();



        analys__valueResetJs[i].value = null;
      })
    }
  }


  // открыть окно по клику закрыть окно по клику
  function openOkno() {
    var time = 300,
      trigger = null;
    $('body').on('click', '.mygoods__clickjs', function () {
      const find = $(this).find('.mygoods__openjs');
      const siblings = $(this).siblings('.mygoods__openjs');

      console.log('click');

      if (find.is(find)) {
        var drop = find;
      } else {
        var drop = siblings;
      }

      trigger = $(this);
      trigger.toggleClass('active');
      drop.toggleClass('open');

      //Закрывает окно
      $(document).mouseup(function (e) {
        if (!trigger.is(e.target)
          && trigger.has(e.target).length === 0
          && !drop.is(e.target)
          && drop.has(e.target).length === 0) {
          trigger.removeClass('active');
          drop.removeClass('open');
        }
      });
    })
  }
  openOkno();





  //Изменить цену по click и по крестику закрыть форму
  const js__deleteJs = document.querySelectorAll('.js__delete-js');
  const js__bottomYes = document.querySelectorAll('.js__bottom-yes');
  const input = document.querySelectorAll('.cena__js-input');
  const cena__jsValue = document.querySelectorAll('.cena__js-value');
  const cena__jsOpen = document.querySelectorAll('.cena__js-open');



  for (let i = 0; i < cena__jsValue.length; i++) {
    if (js__bottomYes[i]) {
      js__bottomYes[i].addEventListener('click', () => {
        cena__jsOpen[i].classList.remove('open');
        if (input[i].value <= 0) {
          cena__jsValue[i].innerHTML = '0 ₽';




        } else {
          cena__jsValue[i].innerText = input[i].value + " " + '₽';
        }
      })
    };


    if (js__deleteJs[i]) {
      js__deleteJs[i].addEventListener('click', () => {
        cena__jsOpen[i].classList.remove('open');
      })
    }

    if (cena__jsOpen[i]) {
      cena__jsOpen[i].addEventListener('click', (e) => {
        e.stopPropagation();
      })
    }
  };






  //slider

  document.querySelectorAll('.auto__inner').forEach(function (auto__inner) {
    const auto__swipercontainer = auto__inner.querySelector('.auto__swiper-container');
    const automini__swipercontainer = auto__inner.querySelector('.automini__swiper-container');






    //swiper auto
    const auto__swiper = new Swiper(auto__swipercontainer, {
      // Optional parameters
      slidesPerView: 1,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },

    });


    const automini__swiper = new Swiper(automini__swipercontainer, {
      // Optional parameters
      slidesPerView: 4,
      spaceBetween: 4,

      // Navigation arrows
      navigation: {
        nextEl: '.produkt__swiper-button-next',
        prevEl: '.produkt__swiper-button-prev',
      },

      breakpoints: {
        // when window width is >= 320px
        320: {
          slidesPerView: 6,
        },

        768: {
          slidesPerView: 4,
        },
      }

    });


    //Управление slider
    auto__swiper.controller.control = automini__swiper;
    automini__swiper.controller.control = auto__swiper;

  });








  //ставим курсор в поле input текст проподает script
  const js__cursorClick = document.querySelector('.js__cursor-click');


  if (js__cursorClick) {
    js__cursorClick.addEventListener('focus', () => {
      js__cursorClick.placeholder = '';
    })
  }




  //всплывашка автомобиль сохранен по клику
  const js__savedClick = document.querySelectorAll('.js__saved-click');
  const js__savedOpen = document.querySelectorAll('.js__saved-open');





  for (let i = 0; i < js__savedClick.length; i++) {
    if (js__savedClick[i]) {
      js__savedClick[i].addEventListener('click', () => {
        js__savedOpen[i].classList.add('open');
        setTimeout(() => {
          js__savedOpen[i].classList.remove('open');
        }, 1000);

      })
    }
  }




  //всплывашка товар сохранен по клику, отмена сохранения
  const js__savedClicktovar1 = document.querySelectorAll('.js__saved-clicktovar1');
  const js__savedOpentovar = document.querySelector('.js__saved-opentovar');




  for (let i = 0; i < js__savedClicktovar1.length; i++) {
    if (js__savedClicktovar1[i]) {
      js__savedClicktovar1[i].addEventListener('click', (e) => {
        e.preventDefault();
        js__savedOpentovar.classList.add('open');
        setTimeout(() => {
          js__savedOpentovar.classList.remove('open');
        }, 1000);
      })
    }
  }




  document.querySelectorAll('.analys__span-second').forEach(function (dropDownWrapper1) {
    const js__savedClicktovar = dropDownWrapper1.querySelectorAll('.js__saved-clicktovar');
    const js__green = dropDownWrapper1.querySelector('.js__green');
    const analys__updateblog = dropDownWrapper1.querySelectorAll('.analys__update-blog');
    const js__seconds = dropDownWrapper1.querySelector('.js__seconds');

    let clear;


    for (let i = 0; i < js__savedClicktovar.length; i++) {
      if (js__savedClicktovar[i]) {
        js__savedClicktovar[i].addEventListener('click', () => {
          js__green.classList.add('open');

          js__savedClicktovar[i].style.display = 'none'
          analys__updateblog[i].style.display = 'block'

          clear = setInterval(() => {
            if (parseInt(js__seconds.innerText) > 1) {
              console.log(parseInt(js__seconds.innerText--));
            } else {
              noSave();
              openSave();
            }
          }, 1000);






        })
      };


      analys__updateblog[i].addEventListener('click', () => {
        noSave();
      });

      function noSave() {
        js__savedClicktovar[i].style.display = 'inline'
        analys__updateblog[i].style.display = 'none'
        js__green.classList.remove('open');
        clearInterval(clear);
        parseInt(js__seconds.innerText = 5)
      }
    };


    function openSave() {
      js__savedOpentovar.classList.add('open');
      setTimeout(() => {
        js__savedOpentovar.classList.remove('open');
      }, 1000);
    }




  });














  //Добавляем звезды по клику
  document.querySelectorAll('.simple_rating').forEach(function (dropDownWrapper) {


    //Добавляем звезды по клику
    const simple_ratinglabel = dropDownWrapper.querySelectorAll('.simple_rating-label');
    const simple_ratingitems = dropDownWrapper.querySelector('.simple_rating-items');



    for (let i = 0; i < simple_ratinglabel.length; i++) {
      if (simple_ratinglabel[i]) {
        simple_ratinglabel[i].addEventListener('click', () => {
          simple_ratingitems.querySelector('.open').classList.remove('open');
          simple_ratingitems.querySelectorAll('.simple_rating-item')[i].classList.add('open');
        })

        simple_ratinglabel[i].addEventListener('mousemove', () => {
          simple_ratingitems.querySelector('.open').classList.remove('open');
          simple_ratingitems.querySelectorAll('.simple_rating-item')[i].classList.add('open');
        })
      }


    };




    //raiting по клику  низкий
    const js__simpleShort = dropDownWrapper.querySelectorAll('.js__simple-short');
    const js__shortText = dropDownWrapper.querySelector('.js__short-text');

    if (js__shortText) {
      js__shortText.innerText = 'Б/У низкое';

      for (let i = 0; i < js__simpleShort.length; i++) {
        if (js__simpleShort[i]) {
          js__simpleShort[i].addEventListener('click', function () {
            js__shortText.innerText = 'Б/У низкое';

          })
        }
      }


      //raiting по наведению  низкий
      for (let i = 0; i < js__simpleShort.length; i++) {
        if (js__simpleShort[i]) {
          js__simpleShort[i].addEventListener('mousemove', function (e) {
            e.stopPropagation();
            js__shortText.innerText = 'Б/У низкое';
          })
        }
      }


      //raiting по клику  средний
      const js__simpleAverage = dropDownWrapper.querySelectorAll('.js__simple-average');



      for (let i = 0; i < js__simpleAverage.length; i++) {
        if (js__simpleAverage[i]) {
          js__simpleAverage[i].addEventListener('click', () => {
            js__shortText.innerText = 'Б/У среднее';
          })

          js__simpleAverage[i].addEventListener('mousemove', (e) => {
            e.stopPropagation();
            js__shortText.innerText = 'Б/У среднее';
          })
        }
      }

      //raiting по клику  новое
      const js__simpleNew = dropDownWrapper.querySelectorAll('.js__simple-new');


      for (let i = 0; i < js__simpleNew.length; i++) {
        if (js__simpleNew[i]) {
          js__simpleNew[i].addEventListener('click', () => {
            js__shortText.innerText = 'Новое';
          })

          js__simpleNew[i].addEventListener('mousemove', (e) => {
            e.stopPropagation();
            js__shortText.innerText = 'Новое';
          })
        }
      }
    }



  });

  document.querySelectorAll('.stars__rating').forEach(function (dropDownWrapper) {


    //Добавляем звезды по клику
    const simple_ratinglabel = dropDownWrapper.querySelectorAll('.stars__rating-label');
    const simple_ratingitems = dropDownWrapper.querySelector('.stars__rating-items');



    for (let i = 0; i < simple_ratinglabel.length; i++) {
      if (simple_ratinglabel[i]) {
        simple_ratinglabel[i].addEventListener('click', () => {
          simple_ratingitems.querySelector('.open').classList.remove('open');
          simple_ratingitems.querySelectorAll('.stars__rating-item')[i].classList.add('open');
        })

        simple_ratinglabel[i].addEventListener('mousemove', () => {
          simple_ratingitems.querySelector('.open').classList.remove('open');
          simple_ratingitems.querySelectorAll('.stars__rating-item')[i].classList.add('open');
        })
      }


    };




    //raiting по клику  низкий
    const js__simpleShort = dropDownWrapper.querySelectorAll('.js__simple-short');
    const js__shortText = dropDownWrapper.querySelector('.js__short-text');

    if (js__shortText) {
      js__shortText.innerText = 'Б/У низкое';

      for (let i = 0; i < js__simpleShort.length; i++) {
        if (js__simpleShort[i]) {
          js__simpleShort[i].addEventListener('click', function () {
            js__shortText.innerText = 'Б/У низкое';

          })
        }
      }


      //raiting по наведению  низкий
      for (let i = 0; i < js__simpleShort.length; i++) {
        if (js__simpleShort[i]) {
          js__simpleShort[i].addEventListener('mousemove', function (e) {
            e.stopPropagation();
            js__shortText.innerText = 'Б/У низкое';
          })
        }
      }


      //raiting по клику  средний
      const js__simpleAverage = dropDownWrapper.querySelectorAll('.js__simple-average');



      for (let i = 0; i < js__simpleAverage.length; i++) {
        if (js__simpleAverage[i]) {
          js__simpleAverage[i].addEventListener('click', () => {
            js__shortText.innerText = 'Б/У среднее';
          })

          js__simpleAverage[i].addEventListener('mousemove', (e) => {
            e.stopPropagation();
            js__shortText.innerText = 'Б/У среднее';
          })
        }
      }

      //raiting по клику  новое
      const js__simpleNew = dropDownWrapper.querySelectorAll('.js__simple-new');


      for (let i = 0; i < js__simpleNew.length; i++) {
        if (js__simpleNew[i]) {
          js__simpleNew[i].addEventListener('click', () => {
            js__shortText.innerText = 'Новое';
          })

          js__simpleNew[i].addEventListener('mousemove', (e) => {
            e.stopPropagation();
            js__shortText.innerText = 'Новое';
          })
        }
      }
    }



  });



  //стирает поля у input с помощью клавиатуры
  const js__clickKeydown = document.querySelectorAll('.js__click-keydown');


  for (let i = 0; i < js__clickKeydown.length; i++) {
    if (js__clickKeydown[i]) {
      js__clickKeydown[i].addEventListener('keydown', (e) => {

        if (e.key === 'Shift' || e.key === 'Enter' || e.key === 'Tab' || e.key === 'Escape') {
          js__clickKeydown[i].placeholder = '';
        }
      })
    }
  }


  //По клику добавляет значение в input
  const js__clickInput = document.querySelectorAll('.js__click-input');
  const js__value = document.querySelectorAll('.js__value');




  for (let i = 0; i < js__clickInput.length; i++) {
    if (js__clickInput[i]) {
      js__clickInput[i].addEventListener('click', () => {
        js__value[i].placeholder = js__clickInput[i].innerText;
      })
    }
  }



  //loader
  const js__clickloader = document.querySelector('.js__click-loader');
  const pagepreloader = document.querySelector('#page-preloader');
  const js__none = document.querySelector('.js__none');
  const js__noneanalys = document.querySelector('.js__none-analys');





  if (js__clickloader) {
    js__clickloader.addEventListener('click', () => {
      pagepreloader.style.display = 'flex'

      setTimeout(() => {
        pagepreloader.style.display = 'none'
        js__none.style.display = 'none'
        js__noneanalys.style.display = 'block'
      }, 2000);

    })
  }



















  // Аккордеон
  function accordion() {
    if ($('.accordion').length) {
      $('.accordion').each(function () {
        var accordion = $(this),
          trigger = accordion.find('.accordion__trigger'),
          time = 300;
        trigger.on('click', function () {
          var $thisTrigger = $(this),
            data = $thisTrigger.data('trigger');
          if (!$thisTrigger.hasClass('active')) {
            $thisTrigger.addClass('active');
            accordion.find('#' + data).stop().slideDown(
              time,
              function () {
                $(this).addClass('open')
              }
            );
          } else {
            $thisTrigger.removeClass('active');
            accordion.find('#' + data).stop().slideUp(
              time,
              function () {
                $(this).removeClass('open')
              }
            );
          }
        })
      })
    }
  }
  accordion();

  // Модальное окно
  function modal(modal) {
    $('.modal-trigger').on('click', function () {
      var $this = $(this),
        data = $this.data('modal'),
        thisModal = $(data);
      modalShow(thisModal);
    });
  };
  // Открытие модального окна
  function modalShow(thisModal) {
    var modalClose = thisModal.find($('.js-modal_close'));
    thisModal.show(0, function () {
      setTimeout(thisModal.addClass('open'), 500);
    });
    modalClose.on('click', function () {
      modalHide(thisModal);
    });
    thisModal.on('click', function (e) {
      if (thisModal.has(e.target).length === 0) {
        modalHide(thisModal);
      }
    });
  };
  // Закрытие модального окна
  function modalHide(thisModal) {
    thisModal.removeClass('open');
    thisModal.hide();
  };
  modal();

  // Появление блоков при активном switch
  function switchShowBlock() {
    $('body').on('click', '.js-switch', function () {
      var $this = $(this),
        time = 200;
      if ($this.find('input').prop('checked')) {
        $($this.data('block')).fadeIn(time);
      }
      else {
        $($this.data('block')).fadeOut(time);
      }

      console.log('Привет');

    })
  }
  switchShowBlock();



  // Выпадайки при клике по кнопке
  // Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
  // Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
  function dropBlock(btn, windowClick) {
    var $this = undefined,
      drop = undefined,
      close = $('.js-drop-close');
    btn.on('click', function () {
      $this = $(this);
      drop = $('#' + $this.data('drop'));
      $this.toggleClass('is-active');
      drop.toggleClass('open');
      if (!windowClick) {
        $(document).mouseup(function (e) {
          if (!$this.is(e.target)
            && $this.has(e.target).length === 0
            && !drop.is(e.target)
            && drop.has(e.target).length === 0) {
            $this.removeClass('is-active');
            drop.removeClass('open');
          }
        });
      }
    })
    close.on('click', function () {
      $('[data-drop="' + $(this).data('drop') + '"]').removeClass('is-active');
      $('#' + $(this).data('drop')).removeClass('open');
    })
  }
  dropBlock($('.js-drop-btn'));

  // Выпадайки при клике по кнопке через JQuery
  // Задать блокам выпадайкам айдишник совпадающий с data-drop="" в кнопке для этого блока
  // Задать кнопкам .js-drop-btn и data-drop="" с айдишником блока выпадайки
  function dropBlockJQuery(btn, windowClick) {
    var $this = undefined,
      drop = undefined,
      close = $('.js-drop-close'),
      time = 100;
    btn.on('click', function () {
      $this = $(this);
      drop = $('#' + $this.data('drop'));
      $this.toggleClass('is-active');
      drop.fadeToggle(time);
      if (!windowClick) {
        $(document).mouseup(function (e) {
          if (!$this.is(e.target)
            && $this.has(e.target).length === 0
            && !drop.is(e.target)
            && drop.has(e.target).length === 0) {
            $this.toggleClass('is-active');
            drop.fadeOut(time);
          }
        });
      }
    })
    close.on('click', function () {
      $('[data-drop="' + $(this).data('drop') + '"]').removeClass('is-active');
      $('#' + $(this).data('drop')).fadeOut(time);
    })
  }
  dropBlockJQuery($('.js-drop-btn-fade'), true);

  // Выпадайка textarea
  function dropTextarea(btn) {
    btn.on('click', function () {
      var $this = $(this),
        drop = $('#' + $this.data('drop'));
      if (drop.find('textarea').val() == '') {
        $this.toggleClass('is-active');
        drop.toggleClass('open');
      } else {
        return false;
      }
    })
  }
  dropTextarea($('.js-drop-btn-comment'));

  // Inputmask
  if ($('.mask-tel').length) {
    $('.mask-tel').inputmask('+7 (999)999 99 99');
  }

  // Tooltipster
  if ($('.tooltipster').length) {
    $('.tooltipster').tooltipster({
      theme: 'tooltipster-noir',
      contentCloning: true,
      side: 'bottom'
    });
  }

  // JQuery Scrollbar
  if ($('.scrollbar-inner').length) {
    $('.scrollbar-inner').scrollbar();
  }



  // Вставка текста в input из выпадающего списка
  function inputEntenText() {
    $('.input-search').each(function () {
      var inputBlock = $(this),
        input = inputBlock.find('input'),
        li = inputBlock.find('.input__list li');
      li.on('click', function () {
        console.log(li);
        input.val($(this).text());
      })
    })
  }
  inputEntenText();

  // Скопировать текст в буфер при клике
  function copyText() {
    var successBlock = $('<div class="success">Скопировано</div>');
    $('body').prepend(successBlock);

    $('.copy-text').click('click', function () {
      navigator.clipboard.writeText($(this).text());

      successBlock.addClass('open');
      setTimeout(function () {
        successBlock.removeClass('open');
      }, 1000)
    })
  }
  copyText();

  // Swiper
  const swiperTariff = document.querySelector('.tariffs__swiper');

  if (swiperTariff) {
    const swiperTariffs = new Swiper('.tariffs__swiper', {
      slidesPerView: 'auto',
      centeredSlides: true,
      spaceBetween: 10,
      initialSlide: 1,
      scrollbar: {
        el: '.swiper-scrollbar',
        draggable: true,
      },
      breakpoints: {
        1200: {
          slidesPerView: 3,
          centeredSlides: false,
        },
      },
    });
    $(window).resize(function () {
      swiperTariffs.slideTo(1);
    })
  }


  // Изменение при нажатии кнопки в таблице попапа
  function schemeTable() {
    $('.scheme__table').each(function () {
      var table = $(this),
        btn = table.find('button');
      btn.on('click', function () {
        $(this).attr('disabled', '').text('Добавлено');
        $(this).closest('tr').addClass('active');
      })
    })
  }
  schemeTable();

  // Выбор тарифа
  function selectTariff() {
    var tariff = $('.tariffs__item'),
      btn = tariff.find('.new-btn');
    btn.on('click', function (e) {
      e.preventDefault();
      if (!$(this).hasClass('new-btn--green')) {
        btn.addClass('new-btn--gradient').removeClass('new-btn--green').find('span').text('Выбрать тариф');
        $(this).removeClass('new-btn--gradient').addClass('new-btn--green').find('span').text('Оплатить');
        tariff.removeClass('tariffs__item--active');
        $(this).closest('.tariffs__item').addClass('tariffs__item--active');
      } else {
        return false;
      }
    })
  }
  selectTariff();

  // Добавить копию блока при нажатии на кнопку
  function addBlock() {
    $('body').on('click', '.js-addbtn', function () {
      $('.scrollbar-inner').scrollbar('destroy');
      var block = $(this).parent().prev('.js-addblock'),
        clone = block.clone();
      clone.find('.select__drop').attr('style', 'display: none;');
      clone.find('.select__trigger span').text('');
      clone.find('input[type=text]').val('');
      clone.css({
        'display': 'none',
        'margin-top': '0'
      });
      clone.insertAfter(block).fadeIn(200);
      $('.scrollbar-inner').scrollbar();
      $('.js-addblock').each(function (i) {
        var $this = $(this);
        $this.find('.switch').attr('data-block', '#switchBlock' + i);
        $this.find('.switch input').attr('id', 'switch' + i);
        $this.find('.switch label').attr('for', 'switch' + i);
        $this.find('.addstockroom__swicth-block').attr('id', 'switchBlock' + i);
      })
    })
  }
  addBlock();
});




const cardContactBtnLogin = document.getElementById('cards__sposob-dostavka-contant_btn-in');
const cardContactBtnEdit = document.getElementById('cards__sposob-dostavka-contant_btn-edit');

const cardContactContent = document.querySelector('.cards__sposob-dostavka-contant_not-logined');
const cardContactContentLogined = document.querySelector('.cards__sposob-dostavka-contant_logined');


if (cardContactBtnLogin) {
  cardContactBtnLogin.addEventListener('click', () => {
    cardContactContent.classList.remove('active');
    cardContactContentLogined.classList.add('active');
  })
};

if (cardContactBtnEdit) {
  cardContactBtnEdit.addEventListener('click', () => {
    cardContactContentLogined.classList.remove('active');
    cardContactContent.classList.add('active');
  })
};



const cardCodeBtn = document.querySelector('.submit-code');
const cardCodeField = document.querySelector('.cards__sposob-box_code-sms');


if (cardCodeBtn) {
  cardCodeBtn.addEventListener('click', () => {
    cardCodeField.classList.add('active');
  })
}

const orderStatus = document.querySelectorAll('.order__status_select .select__list');

console.log(orderStatus);
for (let i = 0; i < orderStatus.length; i++) {
  if (orderStatus[i]) {
    for (let index = 0; index < orderStatus[i].children.length; index++) {
      let ev = orderStatus[i].children[index].querySelector('label');
      ev.addEventListener('click', () => {
        let item = orderStatus[i].parentNode.parentNode;
        let parentItem = item.parentNode.parentNode.parentNode.parentNode;
        let status = index + 1;
        if (status == 1) {
          item.className = "select order__status_select status1";
          parentItem.classList.remove('canceled');
        }
        else if (status == 2) {
          item.className = "select order__status_select status2";
          parentItem.classList.remove('canceled');
        }
        else if (status == 3) {
          item.className = "select order__status_select status3";
          parentItem.classList.remove('canceled');
        }
        else if (status == 4) {
          item.className = "select order__status_select status4";
          parentItem.classList.remove('canceled');
        }
        else if (status == 5) {
          item.className = "select order__status_select status5";
          parentItem.classList.add('canceled');
        }
        else if (status == 5) {
            item.className = "select order__status_select status5";
            parentItem.classList.add('canceled');
        }
        else if (status == 6) {
            item.className = "select order__status_select status6";
            parentItem.classList.add('canceled');
        }
        else if (status == 7) {
            item.className = "select order__status_select status7";
            parentItem.classList.add('canceled');
        }
        else if (status == 8) {
            item.className = "select order__status_select status8";
            parentItem.classList.add('canceled');
        }
        else if (status == 9) {
            item.className = "select order__status_select status9";
            parentItem.classList.add('canceled');
        }
        else if (status == 10) {
            item.className = "select order__status_select status10";
            parentItem.classList.add('canceled');
        }
        else if (status == 11) {
            item.className = "select order__status_select status11";
            parentItem.classList.add('canceled');
        }
      })
    }

  }
}



const orderMoreBtn = document.querySelectorAll('.order__more_btn');
const orderMoreMenu = document.querySelectorAll('.order__more_menu');
for (let i = 0; i < orderMoreBtn.length; i++) {
  if (orderMoreBtn[i]) {
    orderMoreBtn[i].addEventListener('click', e => {
      for (let a = 0; a < orderMoreMenu.length; a++) {
        orderMoreMenu[a].classList.remove('active');
      }
      e.target.querySelector('.order__more_menu').classList.add('active');
    })
  }
}

const orderMoreMenuLink = document.querySelectorAll('.order__more_menu>a');
for (let i = 0; i < orderMoreMenuLink.length; i++) {
  if (orderMoreMenuLink[i]) {
    orderMoreMenuLink[i].addEventListener('click', () => {
      orderMoreMenuLink[i].parentNode.classList.remove('active');
    })
  }
}



for (let i = 0; i < orderMoreMenu.length; i++) {
  window.addEventListener('click', e => {
    const target = e.target
    if (!target.closest('.order__more_btn')) {
      orderMoreMenu[i].classList.remove('active');
    }
  })
}






const modalBackCheckbox = document.querySelectorAll('.modal-back__checkbox>input');
const modalBackField = document.querySelectorAll('.modal-back__field ');
console.log(modalBackField);

for (let i = 0; i < modalBackCheckbox.length; i++) {
  if (modalBackCheckbox[i]) {
    modalBackCheckbox[i].addEventListener('click', e => {
      for (let n = 0; n < modalBackField.length; n++) {
        modalBackField[n].classList.remove('active');
        if (i == n) {
          modalBackField[n].classList.add('active');
        }
      }
    })
  }
}

const myOrdersFilter = document.querySelector('.my-orders__tab-title .analys__value-resetjs');
if (myOrdersFilter) {
  if (screen.width < 768) {
    myOrdersFilter.placeholder = 'Поиск заказа';
  }
}

const backModalBtn = document.getElementById('back-btn');
const backBtn = document.querySelectorAll('a[data-modal="#modalBack"]');
for (let i = 0; i < backBtn.length; i++) {
  backBtn[i].addEventListener('click', () => {
    let returnableOrder = backBtn[i].closest('.order__item');
    console.log(returnableOrder);
    backModalBtn.addEventListener('click', () => {
      returnableOrder.querySelector('.order__status_select').className = "select order__status_select status10";
      returnableOrder.querySelector('.order__status_select input').value = "На возврате";
      returnableOrder.querySelector('.order__auto').classList.remove('auto-active');
      returnableOrder.classList.remove('canceled');
    })
  })
}

const recyclingModalBtn = document.getElementById('recycling-btn');
const recyclingBtn = document.querySelectorAll('a[data-modal="#modalRecycling"]');
for (let i = 0; i < recyclingBtn.length; i++) {
  recyclingBtn[i].addEventListener('click', () => {
    let recyclingOrder = recyclingBtn[i].closest('.order__item');
    recyclingModalBtn.addEventListener('click', () => {
      recyclingOrder.querySelector('.order__status_select').className = "select order__status_select status7";
      recyclingOrder.querySelector('.order__status_select input').value = "Утилизирован";
      recyclingOrder.querySelector('.order__auto').classList.remove('auto-active');
      recyclingOrder.classList.remove('canceled');
    })
  })
}

const shipmentCompanyItem = document.querySelectorAll('.modal-shipment__select .select__list li label');
const shipmentCompany = document.querySelector('.modal-shipment__select .select__trigger .modal-shipment_logo');
console.log(shipmentCompany);
for (let i = 0; i < shipmentCompanyItem.length; i++) {
  shipmentCompanyItem[i].addEventListener('click', e => {
    let shipmentCompanyLogo = shipmentCompanyItem[i].closest('li').querySelector('.modal-shipment__tk-img img').src;
    console.log(shipmentCompanyLogo);
    shipmentCompany.innerHTML = '<div class="modal-shipment__tk-img"><img src="' + shipmentCompanyLogo + '" alt="icon"></div>';
  })
}

const shipmentModalBtn = document.getElementById('shipment-btn');
const shipmentBtn = document.querySelectorAll('.order__sklad_shipment');
for (let i = 0; i < shipmentBtn.length; i++) {
  shipmentBtn[i].addEventListener('click', () => {
    shipmentModalBtn.addEventListener('click', () => {
      shipmentBtn[i].classList.add('active');
      shipmentCompany.innerHTML = "";
      console.log(shipmentCompany.parentNode.querySelector('input'))
      shipmentCompany.parentNode.querySelector('input').value = "Выберите ТК";
    })
  })
}

//Модальное окно заметок

$(function () {
  const dialog = document.querySelector('#dialog');
  if (dialog) {
    $("#dialog").dialog({
      autoOpen: false,
      width: 277,
      height: 333,
      minWidth: 277,
      minHeight: 333,
      closeText: "hide",
      position: { my: "right-5 top+48", at: "right-5 top+48", of: window },
      show: {
        duration: 400
      },
      hide: {
        duration: 400
      }
    });

    $(".notes-btn").on("click", function () {
      var isOpen = $("#dialog").dialog("isOpen");
      if (isOpen) {
        $("#dialog").dialog("close");
      } else {
        $("#dialog").dialog("open");
      }
    });
  }

});

function cookies() {
  if (document.querySelector(".cookies-alert__btn")) {
    document.querySelector(".cookies-alert__btn").onclick = function () {
      document.querySelector(".cookies-alert").remove()
    }
  }
}

cookies();


function plusMinusValue() {
  const js__cardsMinus = document.querySelectorAll('.js__lkpopup-minus');
  const js__cardsValue = document.querySelectorAll('.js__lkpopup-value');
  const js__cardsPlus = document.querySelectorAll('.js__lkpopup-plus');


  for (let i = 0; i < js__cardsPlus.length; i++) {
    js__cardsPlus[i].addEventListener('click', () => {
      js__cardsValue[i].value++;
    })

    js__cardsMinus[i].addEventListener('click', () => {
      if (js__cardsValue[i].value > 1) {
        js__cardsValue[i].value--;
      }
    })
  }
}

plusMinusValue();



function popup() {
  const js__popupLink = document.querySelectorAll('.js__popup-link');
  const js__popupClose = document.querySelectorAll('.js__popup-close');
  const body = document.querySelector('html');




  const timeout = 400;




  for (let i = 0; i < js__popupLink.length; i++) {
    js__popupLink[i].addEventListener('click', (event) => {
      const popup__name = js__popupLink[i].dataset.modal;
      const popupCurent = document.querySelector(`[data-popup="${popup__name}"]`);
      popupOpen(popupCurent);
      event.preventDefault();
    });
  };


  for (let i = 0; i < js__popupClose.length; i++) {
    js__popupClose[i].addEventListener('click', (event) => {
      const popup = js__popupClose[i].closest('.js__popup-open');
      if (popup) {
        popupClose(popup);
      }
      event.preventDefault();
      event.stopPropagation(); // Предотвращаем всплытие события
    });
  };



  function popupOpen(popupCurent) {
    if (popupCurent) {
      const popupActive = document.querySelector('.js__popup-open.open');


      // if (popupActive) {

      // } else {
      //   bodylock();
      // }


      // Добавляем класс анимации появления
      popupCurent.classList.add('animate__backInUp');
      popupCurent.classList.add('open');
      
      // Запускаем анимацию загрузки
      if (typeof showLoadingAnimation === 'function') {
        showLoadingAnimation();
      }
      
      // Добавляем обработчик для закрытия по клику вне окна
      popupCurent.addEventListener('click', (event) => {
        // Проверяем, что клик был именно по фону попапа, а не по содержимому
        if (event.target === popupCurent || event.target.classList.contains('popup__body')) {
          popupClose(popupCurent);
        }
      });
      
      // Добавляем обработчик для клавиши Escape
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          popupClose(popupCurent);
        }
      });
    };
  }


  function popupClose(popupActive) {
    // Сбрасываем состояние анимации загрузки
    if (typeof hideLoadingAnimation === 'function') {
      hideLoadingAnimation();
    }
    
    // Добавляем анимацию исчезновения
    popupActive.classList.remove('animate__backInUp');
    popupActive.classList.add('animate__backOutDown');
    
    // Ждем окончания анимации, затем закрываем
    setTimeout(() => {
      popupActive.classList.remove('open');
      popupActive.classList.remove('animate__backOutDown');
    }, 1000); // animate.css анимация backOutDown длится 1 секунду
    
    const popups = document.querySelectorAll('.js__popup-open');
    let placed = false;
    for (const popup of popups) {
      switch (popup.classList.contains('open')) {
        case true:
          placed = true;
          break;
        default:
          break;
      }

    }


    if (!placed) {
      // bodyUnlock(); // Убираем разблокировку скролла
    }
  };


  function bodylock() {
    const lockPaddingValue = window.innerWidth - document.querySelector('html').offsetWidth + 'px'; //Получили ширину scrolla

    body.style.paddingRight = lockPaddingValue;
    body.classList.add('lock');

  };


  function bodyUnlock() {
    setTimeout(function () {
      body.style.paddingRight = '0px';
      body.classList.remove('lock');
    }, timeout)
  };
}

popup();


function sliderPopupCards() {
  const popupcardsmini__swiper = new Swiper('.popupcardsmini__swiper-container', {
    // Optional parameters
    slidesPerView: 4,
    spaceBetween: 20,


    // Navigation arrows
    navigation: {
      nextEl: '.popupcards__swiper-button-next',
      prevEl: '.popupcards__swiper-button-prev',
    },
    grabCursor: true,

    breakpoints: {
      // when window width is >= 320px
      320: {
        slidesPerView: 3,
      },

      501: {
        slidesPerView: 4,
      },
      769: {
        direction: 'vertical',
        spaceBetween: 10,
      },
    },
  });


  const popupcards__swiper = new Swiper('.popupcards__swiper-container', {
    // Optional parameters
    slidesPerView: 1,
    thumbs: { // указываем на превью слайдер
      swiper: popupcardsmini__swiper // указываем имя превью слайдера
    },
    grabCursor: true,
  });
}

sliderPopupCards();



function Close() {
  const js__openClose = document.querySelectorAll('.js__open-close');
  const js__popupcardsClose = document.querySelectorAll('.js__popupcards-close');



  for (let i = 0; i < js__popupcardsClose.length; i++) {
    if (js__popupcardsClose[i]) {
      js__popupcardsClose[i].addEventListener('click', () => {
        js__openClose[i].classList.remove('open');
      })
      js__openClose[i].addEventListener('click', (e) => {
        e.stopPropagation();
      })
    }
  }

}

Close();


function zoomCards() {
  const popupcards__zoomJs = document.querySelectorAll('.popupcards__zoom-js')




  class Mouse {
    x = null;
    y = null;

    left = false


    constructor(element) {
      const under = (e) => {
        this.x = e.offsetX;
        this.y = e.offsetY;
      }

      element.addEventListener('mousemove', (e) => {
        under(e);
      });

      element.addEventListener('mouseenter', (e) => {
        under(e);
        this.left = true
      });


      element.addEventListener('mouseleave', (e) => {
        under(e);
        this.left = false
      });




    }
  }


  for (let i = 0; i < popupcards__zoomJs.length; i++) {
    const rootRect = popupcards__zoomJs[i].getBoundingClientRect()
    const mouse = new Mouse(popupcards__zoomJs[i]);

    requestAnimationFrame(tick)
    function tick() {
      update();

      requestAnimationFrame(tick)
    }

    function update() {
      const x = mouse.x
      const y = mouse.y


      xPercent = Math.round(100 / (rootRect.width / x)),
        yPercent = Math.round(100 / (rootRect.height / y));


      if (mouse.left) {
        position(xPercent, yPercent);
      } else {
        popupcards__zoomJs[i].style.opacity = '0';
      }



    }

    function position(x, y) {
      popupcards__zoomJs[i].style.opacity = '1';
      popupcards__zoomJs[i].style.backgroundPosition = `${x}% ${y}%`;
    }
  }



}

zoomCards();


function deleteImg() {
  const addingaproduct__jsClose = document.querySelectorAll('.addingaproduct__js-close');
  const addingaproduct__jsNone = document.querySelectorAll('.addingaproduct__js-none');

  for (let i = 0; i < addingaproduct__jsClose.length; i++) {
    if (addingaproduct__jsClose[i]) {
      addingaproduct__jsClose[i].addEventListener('click', (e) => {
        e.stopPropagation();
        addingaproduct__jsNone[i].classList.add('active')
      })
    }
  }

}

deleteImg();



function getData() {
  const addingaproduct__jsGetData = document.querySelectorAll('.addingaproduct__js-getdata');
  const addingaproduct__jsDataStore = document.querySelectorAll('.addingaproduct__js-datastore');

  for (let i = 0; i < addingaproduct__jsGetData.length; i++) {
    if (addingaproduct__jsGetData[i]) {
      addingaproduct__jsGetData[i].addEventListener('input', () => {
        const dataStore = addingaproduct__jsGetData[i].value;

        switch (i) {
          case 0:
            addingaproduct__jsDataStore[1].innerHTML = dataStore;
            return;
          case 1:
            addingaproduct__jsDataStore[2].innerHTML = dataStore;
            return;
          default:
            addingaproduct__jsDataStore[0].innerHTML = dataStore;
            return;
        }
      })
    }
  }
}

getData();

function hint() {
  const addingaproduct__jsHint = document.querySelectorAll('.addingaproduct__js-hint');
  const addingaproduct__shearchJs = document.querySelectorAll('.addingaproduct__shearch-js');





  for (let i = 0; i < addingaproduct__jsHint.length; i++) {
    if (addingaproduct__jsHint[i]) {
      addingaproduct__jsHint[i].addEventListener('input', () => {
        const dataStore = addingaproduct__jsHint[i].value;
        addingaproduct__shearchJs[i].classList.add('open');
        if (dataStore === '') {
          addingaproduct__shearchJs[i].classList.remove('open');
        }

        addingaproduct__shearchJs[i].addEventListener('click', () => {
          addingaproduct__shearchJs[i].classList.remove('open');
        })
      })
    }
  }
}

hint();


function addForm() {
  const addingaproduct__jsEnginClick = document.querySelectorAll('.addingaproduct__js-enginclick');
  const addingaproduct__selectJsOpen = document.querySelectorAll('.addingaproduct__select-jsopen');


  for (let i = 0; i < addingaproduct__jsEnginClick.length; i++) {
    if (addingaproduct__jsEnginClick[i]) {
      addingaproduct__jsEnginClick[i].addEventListener('click', () => {
        addingaproduct__selectJsOpen[i].classList.add('open');
      })
    }
  }

}

addForm();



// Мои скрипты

let copyCounter = 1;

function copy(copyTriggerSelector, copyDestinationSelector, copyMaterialSelector, callback) {
    const copyTrigger = document.querySelector(copyTriggerSelector);
    const copyDestination = document.querySelector(copyDestinationSelector);
    const copyMaterial = document.querySelector(copyMaterialSelector);

    copyTrigger.addEventListener("click", handleClick);

    function handleClick() {
        let copy = copyMaterial.cloneNode(true);

        if (callback) {
            var [newCopy, copyClass] = callback(copy);
        } else {
            var newCopy = copy;
        }

        // copyDestination.innerHTML += copyMaterial.outerHTML;
        copyDestination.append(newCopy);

        document.querySelector(`.${copyClass} select.new-select`).nextElementSibling.outerHTML = "";
        NiceSelect.bind(document.querySelector(`.${copyClass} select.new-select`));
        hideCellsControl(`.${copyClass} .switch`, `.${copyClass} .cells-containers__wrapper`);
        copyCells(`.${copyClass} .cells-containers__add`, `.${copyClass} .cells-containers__content`, `.${copyClass} .cells-containers__content`);
    }
}

function copyCells(copyTriggerSelector, copyDestinationSelector, copyMaterialSelector) {
    const copyTrigger = document.querySelector(copyTriggerSelector);
    const copyDestination = document.querySelector(copyDestinationSelector);
    const copyMaterial = document.querySelector(copyMaterialSelector);

    copyTrigger.addEventListener("click", handleClick);

    function handleClick() {
        let copy = copyMaterial.cloneNode(true);
        const allInputs = copy.querySelectorAll("input");
    
        allInputs.forEach((item, i) => {
            if (item.hasAttribute("id")) {
                let newValue = item.id + (i + copyCounter);
                item.setAttribute("id", newValue);

                if (item.nextElementSibling) {
                    item.nextElementSibling.setAttribute("for", newValue);
                }
            }
        });
        let copyClass = `cells-containers__content--${copyCounter}`;
    
        copyCounter += 1;


        copy.classList.add(copyClass);
        copy.querySelector(`select.new-select`).nextElementSibling.outerHTML = "";
        copyDestination.after(copy);
        NiceSelect.bind(document.querySelector(`.${copyClass} select.new-select`));
    }
}


try {
    copyCells(".cells-containers__add", ".cells-containers__content", ".cells-containers__content");

    copy(".addstockroom__add .add-stack", ".addstockroom__wrapper", ".addstockroom__content", function (copy) {
        const newCopy = copy;
        let copyClass = `addstockroom__content--${copyCounter}`;
    
        copyCounter += 1;
    
        console.log(newCopy);
    
        const allCells = newCopy.querySelectorAll(".cells-containers__content");
        const toggler = newCopy.querySelector(".switch");
        const content = newCopy.querySelector(".cells-containers__wrapper");
    
        allCells.forEach((cell, i) => {
            if (i !== 0) {
                cell.outerHTML = "";
            }
        });
    
        if (toggler.classList.contains("input--checked")) {
            toggler.classList.remove("input--checked")
            toggler.querySelector("input").checked = false;
        }
    
        if (!content.classList.contains("cells-containers__hide")) {
            content.classList.add("cells-containers__hide")
        }
    
        newCopy.classList.add(copyClass);
    
        return [newCopy, copyClass];
    });

    hideCellsControl(".cells-containers__header .switch", ".cells-containers__wrapper");
} catch(err) {
    console.log(err);
}


function hideCellsControl(togglerSelector, contentSelector) {
    const toggler = document.querySelector(togglerSelector);
    const content = document.querySelector(contentSelector);

    console.log(toggler, content);

    toggler.addEventListener("change", () => {
        if (toggler.classList.contains("input--checked")) {
            toggler.classList.remove("input--checked");
            content.classList.add("cells-containers__hide");
        } else {
            toggler.classList.add("input--checked");
            content.classList.remove("cells-containers__hide");
        }
    });
}

const newSelects = document.querySelectorAll(".new-select");


try {
    newSelects.forEach(item => {
        NiceSelect.bind(item);
    });
} catch(err) {

}


function myrole() {
    const addRoleTriggers = document.querySelectorAll("[data-add-role]");
    const addRoleModal = document.querySelector(".my-roles-modal");
    const addRoleForm = addRoleModal.querySelector("form");
    const firstLayer = document.querySelector(".my-roles-initial");
    const secondLayer = document.querySelector(".my-roles-list")
    const thirdLayer = document.querySelector(".my-roles-lk");


    const roleData = [
        {
            "role": "manager",
            "roleRu": "Менеджер",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "0001"
        },
        {
            "role": "storekeeper",
            "roleRu": "Кладовщик",
            "first-name": "Игорь",
            "last-name": "Иванов",
            "patronymic": "Андреевич",
            "phone": "+79068975577",
            "id": "0002"
        },
        {
            "role": "accountant",
            "roleRu": "Бухгалтер",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "0003"
        },
        {
            "role": "senior-manager",
            "roleRu": "Старший менеджер",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "0004"
        },
        {
            "role": "manager",
            "roleRu": "Менеджер",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "0005"
        },
        {
            "role": "manager",
            "roleRu": "Кладовщик",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "0006"
        },
        {
            "role": "manager",
            "roleRu": "Менеджер",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "0007"
        },
        {
            "role": "manager",
            "roleRu": "Кладовщик",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "0008"
        },
        {
            "role": "storekeeper",
            "roleRu": "Кладовщик",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "0009"
        },
        {
            "role": "accountant",
            "roleRu": "Бухгалтер",
            "first-name": "Андрей",
            "last-name": "Воронов",
            "patronymic": "Федорович",
            "phone": "+79068975577",
            "id": "00010"
        },
    ];

    let roleId = roleData.length;

    addRoleTriggers.forEach(item => {
        item.addEventListener("click", () => {
            addRoleModal.classList.add("my-roles-modal--active");
        });
    });

    addRoleForm.addEventListener("submit", addToRoles);

    function addToRoles(e) {
        e.preventDefault();
        roleId++;

        const form = e.target;
        const select = form.querySelector("select");
        const data = {
            "role": "",
            "roleRu": "",
            "first-name": "",
            "last-name": "",
            "patronymic": "",
            "phone": "",
            "id": "",
        };

        data.role = select.options[select.options.selectedIndex].value;
        data.roleRu = select.options[select.options.selectedIndex].textContent.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim();
        data.patronymic = form.elements.patronymic.value;
        data["first-name"] = form.elements["first-name"].value;
        data["last-name"] = form.elements["last-name"].value;
        data["phone"] = form.elements["phone"].value;
        data.id = roleId;


        roleData.push(data);

        updateRoles();

        // Функционал по закртию первого экрана

        if (!firstLayer.classList.contains("my-roles__hide")) {
            firstLayer.classList.add("my-roles__hide");
            secondLayer.classList.remove("my-roles__hide");
        }

        addRoleModal.classList.remove("my-roles-modal--active");
    }

    function initializeRoles() {
        const roleList = document.querySelector(".my-roles-list__rosters");
        const roleAdd = roleList.querySelector(".my-roles-list__roster--add");

        roleData.forEach(item => {
            const roleTemplate = `
            <li class="my-roles-list__roster">
                <a class="my-roles-cart" href="#" data-role-id="${item.id}">
                    <div class="my-roles-cart__header">
                        <div class="my-roles-cart__img">
                            <img src="./img/role-lk-profile-small.png" alt="">
                        </div>
                        <div class="my-roles-cart__text-content">
                            <span class="my-roles-cart__post">${item.roleRu}</span>
                            <span class="my-roles-cart__phone">${item.phone}</span>
                        </div>
                    </div>
                    <div class="my-roles-cart__content">
                        <span>${item['last-name']}</span> 
                        <span>${item['first-name']}</span>
                        <span>${item.patronymic}</span>
                    </div>
                    <div class="my-roles-cart__settings">
                        <img src="./img/role-lk-settings.png" alt="">
                    </div>
                </a>
            </li>
            `;

            roleAdd.insertAdjacentHTML("afterend", roleTemplate);
        });
    }

    function updateRoles() {
        const roleList = document.querySelector(".my-roles-list__rosters");
        const roleAdd = roleList.querySelector(".my-roles-list__roster--add");

        const addedRole = roleData[(roleData.length - 1)];


        const roleTemplate = `
        <li class="my-roles-list__roster">
            <a class="my-roles-cart" href="#" data-role-id="${addedRole.id}">
                <div class="my-roles-cart__header">
                    <div class="my-roles-cart__img">
                        <img src="./img/role-lk-profile-small.png" alt="">
                    </div>
                    <div class="my-roles-cart__text-content">
                        <span class="my-roles-cart__post">${addedRole.roleRu}</span>
                        <span class="my-roles-cart__phone">${addedRole.phone}</span>
                    </div>
                </div>
                <div class="my-roles-cart__content">
                    <span>${addedRole['last-name']}</span> 
                    <span>${addedRole['first-name']}</span>
                    <span>${addedRole.patronymic}</span>
                </div>
                <div class="my-roles-cart__settings">
                    <img src="./img/role-lk-settings.png" alt="">
                </div>
            </a>
        </li>
        `;

        roleAdd.insertAdjacentHTML("afterend", roleTemplate);

        document.querySelector(`[data-role-id='${addedRole.id}']`).addEventListener("click", inspectRole);
    }

    function inspectRole(e) {
        e.preventDefault();

        const lkPost = document.querySelector(".my-roles-lk__career");
        const lkBio = document.querySelector(".my-roles-lk__text--bio");
        const lkPhone = document.querySelector(".my-roles-lk__text--phone");

        console.log(e.currentTarget.dataset.roleId);
        const roleDataItem = roleData.filter(item => {
            if (item.id == e.currentTarget.dataset.roleId) {
                return item;
            } else {
                return false;
            }
        });


        console.log(roleDataItem);

        lkPost.textContent = roleDataItem[0].roleRu;
        lkBio.textContent = `${roleDataItem[0]["last-name"]} ${roleDataItem[0]["first-name"]} ${roleDataItem[0].patronymic}`;
        lkPhone.textContent = roleDataItem[0].phone;


        if (secondLayer.classList.contains("my-roles__hide")) {
            secondLayer.classList.remove("my-roles__hide");
            thirdLayer.classList.add("my-roles__hide");
        } else {
            secondLayer.classList.add("my-roles__hide");
            thirdLayer.classList.remove("my-roles__hide");
        }
    }

    setTimeout(() => {
        const roleItems = document.querySelectorAll(".my-roles-cart");

        roleItems.forEach(item => {
            item.addEventListener("click", inspectRole);
        });
    })

    // back to 2 layer
    document.querySelector(".my-roles-lk__back-to-list").addEventListener("click", () => {
        thirdLayer.classList.add("my-roles__hide");
        secondLayer.classList.remove("my-roles__hide");
    });


    // close modal window if clicked on cross or overlay
    addRoleModal.addEventListener("click", (e) => {
        if (!e.target.closest(".my-roles-modal__window")) {
            addRoleModal.classList.remove("my-roles-modal--active");
        } else if(e.target.closest(".my-roles-modal__close")) {
            addRoleModal.classList.remove("my-roles-modal--active");
        }
    });

    initializeRoles();


}

try {
    myrole();
} catch(err) {
    console.log(err);
}

function generalSettings() {
    // image preview
    const loadInput = document.querySelector("[data-load-logo]");
    const logoPlaceholder = document.querySelector("#img_url");
    const logoPreview = document.querySelector(".general-setting__preview");
    const deletePreview = document.querySelector(".general-setting__preview span");

    loadInput.addEventListener("change", (e) => {
        img_pathUrl(e.currentTarget);
        logoPreview.classList.add("general-setting__preview--active");
    });

    function img_pathUrl(input){
        logoPlaceholder.src = (window.URL ? URL : webkitURL).createObjectURL(input.files[0]);
    }

    deletePreview.addEventListener("click", () => {
        logoPreview.classList.remove("general-setting__preview--active");
    });



    // Working schedule

    const allInputs = document.querySelectorAll(".general-setting-date__input");
    const addData = document.querySelector("[data-add-trigger]");
    const dateList = document.querySelector(".general-setting-date");
    const dates = ["Ср", "Чт", "Пт", "Сб", "Вс"];
    const itemRemovers = document.querySelectorAll("[data-delete-trigger]");
    let dataCount = 3;

    allInputs.forEach(item => {
        item.addEventListener("input", (e) => {
            item.value = item.value.replace(/\D/g, "");
        });
    });

    addData.addEventListener("click", () => {

        if (dates.length === 0) {
            return;
        }

        let newClass = `general-setting-date__row--${dataCount}`;

        const dateRowTemplate = `
        <div class="general-setting-date__row ${newClass}">
            <span class="general-setting-date__day">${dates[0]}:</span>
            <input class="general-setting-date__input" type="text" name="${dataCount}-begin" maxlength="2">
            <span class="general-setting-date__colon">:</span>
            <input class="general-setting-date__input" type="text" name="${dataCount}-end" maxlength="2">
            <a class="general-setting__link general-setting__link--small" href="#" data-delete-trigger>
                Удалить
            </a>
        </div>
        `;

        dates.shift();
        dataCount++;

        dateList.insertAdjacentHTML("beforeend", dateRowTemplate)

        document.querySelector(`.${newClass} .general-setting__link`).addEventListener("click", removeItem);
    });

    function removeItem(e) {
        e.preventDefault();

        e.currentTarget.parentElement.outerHTML = "";
    }

    itemRemovers.forEach(item => {
        item.addEventListener("click", removeItem);
    });

    const copyPhoneStroke = document.querySelector(".general-setting__copy");
    const copyWrapper = document.querySelector(".general-setting__field--wrapper");

    copyPhoneStroke.addEventListener("click", (e) => {
        e.preventDefault();
        
        const newStroke = e.target.closest(".general-setting__field--phone");
        copyWrapper.insertAdjacentHTML("beforeend", newStroke.outerHTML);
    });
}

try {
    generalSettings();
} catch(err) {
    console.log(err);
}

function lkFuncs() {
    const firstModalTrigger = document.querySelector(".lk-input__img");
    const modals = document.querySelectorAll("[data-transcript-vin]");
    let cancelCall = false;


    firstModalTrigger.addEventListener("click", () => {
        cancelCall = false;
        
        modals[0].classList.add("transcript-vin--active");
        const toLoader = modals[0].querySelector(".transcript-vin__btn:first-of-type")
        const buffer = modals[0].querySelector(".transcript-vin__btn:last-of-type");

        toLoader.addEventListener("click", () => {
            modals[0].classList.remove("transcript-vin--active");
            modals[2].classList.add("transcript-vin--active");

            setTimeout(() => {
                if (!cancelCall) {
                    modals[2].classList.remove("transcript-vin--active");
                    modals[4].classList.add("transcript-vin--active");
                }

            }, 3000)
        });

        buffer.addEventListener("click", () => {
            modals[0].classList.remove("transcript-vin--active");
            modals[1].classList.add("transcript-vin--active");

            setTimeout(() => {
                if (!cancelCall) {
                    modals[1].classList.remove("transcript-vin--active");
                    modals[3].classList.add("transcript-vin--active");
                }
            }, 4000)
        });
    });

    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {

            if (!e.target.closest(".transcript-vin__window")) {
                cancelCall = true;
                modal.classList.remove("transcript-vin--active");
            } else if(e.target.closest(".transcript-vin__close")) {
                cancelCall = true;
                modal.classList.remove("transcript-vin--active");
            }
        });
    });
}


try {
    lkFuncs();
} catch(err) {
    console.log(err);
}

function synchronizedScroll() {
    const headerScroll = document.querySelector(".goods-table__header");
    const contentScroll = document.querySelector(".goods-table__content");

    headerScroll.addEventListener("scroll", (e) => {
        contentScroll.scrollLeft = headerScroll.scrollLeft;
    });

    contentScroll.addEventListener("scroll", () => {
        headerScroll.scrollLeft = contentScroll.scrollLeft;
    });
}

try {
    synchronizedScroll();
} catch(err) {
    console.log(err);
}

function myOrders() {
    const modals = document.querySelectorAll(".order-modal");

    const firstModal = document.querySelector("#modalShipment");
    const firstModalTrigger = firstModal.querySelector(".small-modal__blue-btn");

    const movementModal = document.querySelector(".order-modal--good-movement");
    const movementTrigger = movementModal.querySelector(".goods-movement__edit");

    const errorModal = document.querySelector(".order-modal--good-error");
    const errorTrigger = errorModal.querySelector(".goods-movement__edit");
    const invoiceModal = document.querySelector(".order-modal--invoice");


    firstModalTrigger.addEventListener("click", () => {
        firstModal.classList.remove("open");
        movementModal.classList.add("order-modal--active");
    });

    movementTrigger.addEventListener("click", () => {
        movementModal.classList.remove("order-modal--active");
        errorModal.classList.add("order-modal--active");
    });

    errorTrigger.addEventListener("click", () => {
        errorModal.classList.remove("order-modal--active");
        invoiceModal.classList.add("order-modal--active");
    });

    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {

            if (!e.target.closest(".order-modal__body")) {
                cancelCall = true;
                modal.classList.remove("order-modal--active");
            } else if(e.target.closest(".order-modal__close")) {
                cancelCall = true;
                modal.classList.remove("order-modal--active");
            }
        });
    });

    const callBalances = document.querySelectorAll(".order__title_balance");
    const callClients = document.querySelectorAll(".order__title_name");
    const callClients2 = document.querySelectorAll(".order__title_tel");

    const callModal = document.querySelector(".client-profile__overlay");

    callBalances.forEach(callBalance => {
        callBalance.addEventListener("click", () => {
            const tabHeaders = callModal.querySelectorAll("[data-content]");
            const tabTitles = callModal.querySelectorAll(".tabs__title [data-trigger]");
            const tabContents = callModal.querySelectorAll(".tabs__contents [data-trigger]");

            tabContents.forEach((item, i) => {
                item.classList.remove("open");

                if (item.dataset.trigger === "tab_1") {
                    item.classList.add("open");
                }
            });

            tabTitles.forEach((item, i) => {
                item.classList.remove("open");

                if (item.dataset.trigger === "tab_1") {
                    item.classList.add("open");
                }
            });

            tabHeaders.forEach((item, i) => {
                item.classList.remove("active");
                item.classList.remove("open");

                if (item.dataset.content === "tab_1") {
                    item.classList.add("active");
                    item.classList.add("open");
                }
            });

            console.log(tabHeaders, tabTitles, tabContents);

            callModal.classList.add("client-profile__overlay--active");
        });
    });

    callClients.forEach(item => {
        item.addEventListener("click", () => {
            const tabHeaders = callModal.querySelectorAll("[data-content]");
            const tabTitles = callModal.querySelectorAll(".tabs__title [data-trigger]");
            const tabContents = callModal.querySelectorAll(".tabs__contents [data-trigger]");
    
            tabContents.forEach((item, i) => {
                item.classList.remove("open");
    
                if (item.dataset.trigger === "tab_2") {
                    item.classList.add("open");
                }
            });
    
            tabTitles.forEach((item, i) => {
                item.classList.remove("open");
    
                if (item.dataset.trigger === "tab_2") {
                    item.classList.add("open");
                }
            });
    
            tabHeaders.forEach((item, i) => {
                item.classList.remove("active");
                item.classList.remove("open");
    
                if (item.dataset.content === "tab_2") {
                    item.classList.add("active");
                    item.classList.add("open");
                }
            });
    
            console.log(tabHeaders, tabTitles, tabContents);
    
            callModal.classList.add("client-profile__overlay--active");
        });
    });

    callClients2.forEach(item => {
        item.addEventListener("click", () => {
            const tabHeaders = callModal.querySelectorAll("[data-content]");
            const tabTitles = callModal.querySelectorAll(".tabs__title [data-trigger]");
            const tabContents = callModal.querySelectorAll(".tabs__contents [data-trigger]");
    
            tabContents.forEach((item, i) => {
                item.classList.remove("open");
    
                if (item.dataset.trigger === "tab_2") {
                    item.classList.add("open");
                }
            });
    
            tabTitles.forEach((item, i) => {
                item.classList.remove("open");
    
                if (item.dataset.trigger === "tab_2") {
                    item.classList.add("open");
                }
            });
    
            tabHeaders.forEach((item, i) => {
                item.classList.remove("active");
                item.classList.remove("open");
    
                if (item.dataset.content === "tab_2") {
                    item.classList.add("active");
                    item.classList.add("open");
                }
            });
    
            console.log(tabHeaders, tabTitles, tabContents);
    
            callModal.classList.add("client-profile__overlay--active");
        });
    });

    callModal.addEventListener("click", (e) => {
        if (!e.target.closest(".client-profile--modal")) {
            callModal.classList.remove("client-profile__overlay--active");
        } else if(e.target.closest(".client-profile__close")) {
            callModal.classList.remove("client-profile__overlay--active");
        }
    });
}

try {
    myOrders();
} catch(err) {
    console.log(err);
}

function myClients() {
    const elem = document.getElementById('data-picker');
    const rangepicker = new DateRangePicker(elem, {
        language: "ru",
        container: ".my-pouch-modal__content"
    });

    const deleteStrokeTriggers = document.querySelectorAll(".pouch__delete-role");
    const deleteOperation = document.querySelector(".client-modal--delete-operation");
    const deleteCancel = deleteOperation.querySelector(".client-modal__btn");
    const deleteForSure = deleteOperation.querySelector(".client-modal__btn--remove");

    deleteStrokeTriggers.forEach(item => {
        item.addEventListener("click", (e) => {
            deleteOperation.classList.add("client-modal--open");

            deleteForSure.addEventListener("click", () => {
                const removeableItem = e.target.closest(".my-pouch__item"); 

                removeableItem.outerHTML = "";
                deleteOperation.classList.remove("client-modal--open");
            });
        });
    });

    deleteCancel.addEventListener("click", () => {
        deleteOperation.classList.remove("client-modal--open");
    });



    const moreContainer = document.querySelector(".my-pouch__items");
    const watchMore = document.querySelector(".my-pouch__show-more");

    watchMore.addEventListener("click", () => {
        const hiddenItems = moreContainer.querySelectorAll(".my-pouch__item--hide");
        
        hiddenItems.forEach(item => {
            item.classList.remove("my-pouch__item--hide");
        });
        watchMore.classList.add("my-pouch__show-more--hide")
    });


    const profileTriggers = document.querySelectorAll(".my-clients__name");
    const clientModal = document.querySelector(".client-profile__overlay");

    profileTriggers.forEach(item => {
        item.addEventListener("click", () => {
            clientModal.classList.add("client-profile__overlay--active");
        });
    });

    clientModal.addEventListener("click", (e) => {
        if(e.target.closest(".client-profile__close")) {
            clientModal.classList.remove("client-profile__overlay--active");
        }
    });

    const callendar = document.querySelector(".my-pouch-modal");
    const calendarTrigger = document.querySelector(".my-pouch__phase");
    const calendarCloses = document.querySelectorAll(".my-pouch-modal__btn");

    calendarTrigger.addEventListener("click", () => {
        callendar.classList.add("my-pouch-modal--active");
    });

    calendarCloses.forEach(item => {
        item.addEventListener("click", () => {
            callendar.classList.remove("my-pouch-modal--active"); 
        });
    });

    
    document.addEventListener("click", (e) => {
        if (callendar && callendar.classList.contains("my-pouch-modal--active")) {
            if (!e.target.closest(".my-pouch-modal")) {
                callendar.classList.remove("my-pouch-modal--active");
            }
        }
    }, {
        capture: true
    });

    const deleteRoles = document.querySelectorAll(".client-profile .my-roles-lk__delete-role");
    const deleteRoleModal = document.querySelector(".client-modal--delete-user");
    const modals = document.querySelectorAll(".client-modal");

    deleteRoles.forEach(item => {
        item.addEventListener("click", () => {
            deleteRoleModal.classList.add("client-modal--open");
        });
    });


    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (modal.classList.contains("my-roles-modal")) {
                if (!e.target.closest(".my-roles-modal__window")) {
                    modal.classList.remove("client-modal--open");
                } else if(e.target.closest(".my-roles-modal__close")) {
                    modal.classList.remove("client-modal--open");
                }
            } else {
                if (!e.target.closest(".client-modal__window")) {
                    modal.classList.remove("client-modal--open");
                } else if(e.target.closest(".client-modal__close")) {
                    modal.classList.remove("client-modal--open");
                }
            }
        });
    });

    const addUser = document.querySelector(".my-clients__add");
    const addUserModal = document.querySelector(".client-modal--add-user");

    addUser.addEventListener("click", () => {
        addUserModal.classList.add("client-modal--open");
    });

    const editUsers = document.querySelectorAll(".my-roles-lk__edit-profile");
    const editUserModal = document.querySelector(".client-modal--edit-user");

    editUsers.forEach(editUser => {
        editUser.addEventListener("click", () => {
            editUserModal.classList.add("client-modal--open");
        });
    });

    editUser.addEventListener("click", () => {
        editUserModal.classList.add("client-modal--open");
    });
    
    const firstControl = document.querySelector(".client-pay-method__control:first-of-type");
    const secondControl = document.querySelector(".client-pay-method__control--link");
    const items = document.querySelectorAll(".client-pay-method__item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            if (item.previousElementSibling.value == "link") {
                firstControl.classList.add("client-pay-method__control--hide");
                secondControl.classList.remove("client-pay-method__control--hide");
            } else {
                firstControl.classList.remove("client-pay-method__control--hide");
                secondControl.classList.add("client-pay-method__control--hide");
            }
        });
    });
}

try {
    document.addEventListener("DOMContentLoaded", () => {
        myClients();
    });
} catch(err) {
    console.log(err);
}


function myClients2() {
    
    const callMapTriggers = document.querySelectorAll(".my-roles-modal__map-icon");
    const callMapModal = document.querySelector('[data-popup="#popup3"]');

    callMapTriggers.forEach(item => {
        item.addEventListener("click", () => {
            console.log("clicl");
            callMapModal.classList.add("open");
        });
    });

    if (callMapTriggers) {
        callMapModal.addEventListener("click", (e) => {
            if (!e.target.closest(".popup__content")) {
                callMapModal.classList.remove("open");
            } else if(e.target.closest(".popup__close")) {
                callMapModal.classList.remove("open");
            }
        });
    }



    const callendar = document.querySelector(".my-pouch-modal");
    const calendarTrigger = document.querySelector(".my-pouch__phase");
    const calendarCloses = document.querySelectorAll(".my-pouch-modal__btn");

    calendarTrigger.addEventListener("click", () => {
        callendar.classList.add("my-pouch-modal--active");
    });

    calendarCloses.forEach(item => {
        item.addEventListener("click", () => {
            callendar.classList.remove("my-pouch-modal--active"); 
        });
    });

    document.addEventListener("click", (e) => {
        if (callendar && callendar.classList.contains("my-pouch-modal--active")) {
            if (!e.target.closest(".my-pouch-modal")) {
                callendar.classList.remove("my-pouch-modal--active");
            }
        }
    }, {
        capture: true
    });

    const deleteRoles = document.querySelectorAll(".client-profile .my-roles-lk__delete-role");
    const deleteRoleModal = document.querySelector(".client-modal--delete-user");
    const modals = document.querySelectorAll(".client-modal");

    deleteRoles.forEach(item => {
        item.addEventListener("click", () => {
            deleteRoleModal.classList.add("client-modal--open");
        });
    });


    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (modal.classList.contains("my-roles-modal")) {
                if (!e.target.closest(".my-roles-modal__window")) {
                    modal.classList.remove("client-modal--open");
                } else if(e.target.closest(".my-roles-modal__close")) {
                    modal.classList.remove("client-modal--open");
                }
            } else {
                if (!e.target.closest(".client-modal__window")) {
                    modal.classList.remove("client-modal--open");
                } else if(e.target.closest(".client-modal__close")) {
                    modal.classList.remove("client-modal--open");
                }
            }
        });
    });

    const editUsers = document.querySelectorAll(".my-roles-lk__edit-profile");
    const editUserModal = document.querySelector(".client-modal--edit-user");

    editUsers.forEach(editUser => {
        editUser.addEventListener("click", () => {
            editUserModal.classList.add("client-modal--open");
        });
    });



    const firstControl = document.querySelector(".client-pay-method__control:first-of-type");
    const secondControl = document.querySelector(".client-pay-method__control--link");
    const items = document.querySelectorAll(".client-pay-method__item");

    items.forEach(item => {
        item.addEventListener("click", () => {
            if (item.previousElementSibling.value == "link") {
                firstControl.classList.add("client-pay-method__control--hide");
                secondControl.classList.remove("client-pay-method__control--hide");
            } else {
                firstControl.classList.remove("client-pay-method__control--hide");
                secondControl.classList.add("client-pay-method__control--hide");
            }
        });
    });
}

try {
    document.addEventListener("DOMContentLoaded", () => {
        myClients2();
    });
} catch(err) {
    console.log(err);
}

function workbench() {
    const items = document.querySelectorAll(".workbench-item");
    const completBtn = document.querySelector(".workbench__completed");

    function checkIfActive() {
        const items = document.querySelectorAll(".workbench-active__content .workbench-item");
        let flag = false;

        items.forEach(item => {
            if (item.classList.contains("workbench-item--active")) {
                flag = true;
            }
        });

        if (flag) {
            completBtn.classList.add("workbench__completed--active")
        } else {
            completBtn.classList.remove("workbench__completed--active")
        }
    }

    function modalInit(item) {
        item.addEventListener("click", (e) => {
            const modal = document.querySelector(`.${item.dataset.callsModal}`);
            const modalWindow = modal.querySelector("div");
            const windowFirstClass = modalWindow.className.split(" ")[0];
            const modalClose = modal.querySelector(`.${modal.dataset.clsClass}`);

            modal.classList.add(`${modal.dataset.actCalss}`);

            modalClose.addEventListener("click", () => {
                modal.classList.remove(`${modal.dataset.actCalss}`);
            });

            modal.addEventListener("click", (e) => {
                if (!e.target.closest(`.${windowFirstClass}`)) {
                    modal.classList.remove(`${modal.dataset.actCalss}`);
                }
            });

            if (item.classList.contains("workbench__add-item")) {
                if (e.target.closest(".workbench-done")) {
                    modalWindow.dataset.typeOfAdding = "done";
                } else if (e.target.closest(".workbench-active")){
                    modalWindow.dataset.typeOfAdding = "active";
                }
            }
        });
    }

    function togglableItem(item) {
        item.addEventListener("click", () => {
            if (!item.classList.contains("workbench-done__item")) {
                item.classList.toggle("workbench-item--active");
                checkIfActive();
            }
        }, {
            capture: true
        });
    }

    // function deleteItem(item) {
    //     item.addEventListener("click", (e) => {
    //         console.log("click");
    //         const item = e.target.closest(".workbench-item");
    //         item.classList.add("workbench-item--hide");
    //     });
    // }

    items.forEach(item => {
        togglableItem(item);
    });

    function initializeModals() {
        const modalTriggers = document.querySelectorAll("[data-calls-modal]");

        modalTriggers.forEach(item => {
            modalInit(item);
        });
    }

    function removeString() {
        const allStrings = document.querySelectorAll(".workbench__deletable-item");

        allStrings.forEach(item => {
            item.addEventListener("click", (e) => {
                if (e.target.closest(".workbench__delete-that-string")) {
                    item.outerHTML = "";
                }
            });
        });
    }

    // function deleteDone() {
    //     const allDeletable = document.querySelectorAll(".workbench-item__return");

    //     allDeletable.forEach(item => {
    //         deleteItem(item);
    //     });
    // }

    function addAssignment() {
        const data = {
            sender: "",
            text: "",
            urgent: false,
            active: "active"
        }

        const proffession = {
            own: "От Себя",
            driver: "От Водителя",
            storekeeper: "От Кладовщика",
            "manager-andrey": "От Менеджера",
            "manager-ivan": "От Менеджера",
            director: "От Руководителя",
        };
        const overlayModal = document.querySelector(".workbench-modal");
        
        let modal = document.querySelector(".assignment-modal__window"),
            modalForm = modal.querySelector("form"),
            wrapper;


        modalForm.addEventListener("submit", (e) => {
            e.preventDefault();

            data.active = modal.dataset.typeOfAdding


            if (data.active == "active") {
                console.log("active");
                wrapper = document.querySelector(".workbench-active__content");
            } else {
                console.log("done");
                wrapper = document.querySelector(".workbench-done__content");
            }

            data.sender = modalForm.querySelector("select").value;
            data.text = modalForm.querySelector(".assignment-modal__message").value;
            data.urgent = modalForm.querySelector(".assignment-modal__checkbox input").checked;

            overlayModal.classList.remove("workbench-modal--active");

            const template = `
            <div class="workbench-item workbench-item--assignment ${data.urgent ? "workbench-item--urgent" : ""} ${data.active == "active" ? "" : "workbench-done__item"}">
                <div class="workbench-item__header">
                    <div class="workbench-item__left">
                        <div class="workbench-item__type">
                            <img src="./img/list-with-items.png" alt="">
                        </div>
                        <h3 class="workbench-item__name">Поручение</h3>
                        <div class="workbench-item__subtitle">
                            <p class="workbench__secondary-text workbench-item__secondary-text">${proffession[`${data.sender}`]}</p>
                        </div>
                    </div>
                </div>
                <div class="workbench-item__content">
                    <p class="workbench-item__text" data-calls-modal="other-modal">
                        ${data.text}
                    </p>
                </div>
                <div class="workbench-item__footer">
                
                </div>
                <div class="workbench-item__checkmark">
                    <img src="./img/checkmark.png" alt="">
                </div>
                ${data.urgent ? `
                    <div class="workbench-item__status">
                        Срочно
                    </div>
                `: ""}
                <button class="workbench-item__return">
                    <img src="./img/return.png" alt="">
                </button>
            </div>
            `;

            const before = wrapper.querySelector(".workbench__add-item");
            before.insertAdjacentHTML("beforebegin", template);

            const items = wrapper.querySelectorAll(".workbench-item");
            const lastItem = items[items.length - 1];

            const modalTrigger = lastItem.querySelector("[data-calls-modal]");

            modalInit(modalTrigger);
            togglableItem(lastItem);

            const allDeletable = lastItem.querySelector(".workbench-item__return");
            transfer(true, allDeletable);
        });
    }

    function transfer(init, trigger) {
        let activeContainer = document.querySelector(".workbench-active__content");
        let activeAnchor = activeContainer.querySelector(".workbench__add-item")
        let doneContainer = document.querySelector(".workbench-done__content");
        let doneAnchor = doneContainer.querySelector(".workbench__add-item")

        function fromActive() {
            completBtn.addEventListener("click", () => {
                const items = document.querySelectorAll(".workbench-active__content .workbench-item");

                const activeItems = Array.from(items).filter(item => {
                    if (item.classList.contains("workbench-item--active")) {
                        return true;
                    }
                });

                activeItems.forEach(item => {
                    item.classList.remove("workbench-item--active");
                    item.classList.add("workbench-done__item");
                    doneAnchor.before(item);
                });

                completBtn.classList.remove("workbench__completed--active");
            });
        }


        function fromDone(trigger) {
            trigger.addEventListener("click", (e) => {
                const item = e.target.closest(".workbench-item");
                item.classList.remove("workbench-item--active");
                item.classList.remove("workbench-done__item");
                activeAnchor.before(item);
            });
        }

        if (init) {
            fromDone(trigger);
            return;
        }

        fromActive();

        const allDeletable = document.querySelectorAll(".workbench-item__return");
        allDeletable.forEach(trigger => {
            fromDone(trigger);
        });
    }

    transfer();

    addAssignment();

    // deleteDone();

    removeString();

    initializeModals();
    
    checkIfActive();
}


try {
    workbench();
} catch(err) {
    console.log(err);
}


function ordersDelivery() {
    function altSelect() {
        const altSelects = document.querySelectorAll(".alt-select");

        altSelects.forEach(item => {
            const altTrigger = item.querySelector(".alt-select__trigger");
            const altDrop = item.querySelector(".alt-select__drop");
            const altTrigImg = item.querySelector(".alt-select__input > span > img");
            const altTrigText = item.querySelector(".alt-select__input span:last-of-type");
            const altInput = altTrigger.querySelector("input");
            const allOptions = item.querySelectorAll(".alt-select__item");
    
            altTrigger.addEventListener("click", () => {
                altTrigger.classList.add("alt-select__trigger--open");
                altDrop.classList.add("alt-select__drop--open");
            });
    
            allOptions.forEach((item, i) => {
                item.addEventListener("click", (e) => {
                    const changeImg = item.querySelector("img");
                    const changeText = item.querySelector("span");
    
                    altTrigger.style = `background: ${item.dataset.altSctColor}`;
                    altTrigImg.setAttribute("src", changeImg.dataset.trigIcon);
                    altTrigText.textContent = changeText.textContent;
                    altInput.setAttribute("value",  changeText.textContent);
    
                    altDrop.classList.remove("alt-select__drop--open");
                    altTrigger.classList.remove("alt-select__trigger--open");

                    // Открытие модального окна доставки
                    if (i == 2) {
                        if (e.target.closest(".orders-delivery-item--deliv")  && e.isTrusted) {
                            const modal = document.querySelector("[data-is-modal='delivery']");

                            modal.classList.add("is-modal--open");
                        }
                    }

                    if (i == 1) {
                        if (e.target.closest(".orders-delivery-item") && e.isTrusted) {
                            const modal = document.querySelector("[data-is-modal='photos']");

                            modal.classList.add("is-modal--open");
                        }
                    }


                    if (i == 0) {
                        if (e.target.closest(".orders-return__item") && e.isTrusted) {
                            const item = e.target.closest(".orders-return__item");
                            item.className = "orders-return__item orders-return__item--send-back";
                        }
                    }

                    if (i == 2) {
                        if (e.target.closest(".orders-return__item") && e.isTrusted) {
                            const item = e.target.closest(".orders-return__item");
                            item.className = "orders-return__item orders-return__item--payed";
                        }
                    }

                    if (i == 1) {
                        if (e.target.closest(".orders-return__item") && e.isTrusted) {
                            const modal = document.querySelector("[data-is-modal='return-back']");
                            const item = e.target.closest(".orders-return__item");
                            item.className = "orders-return__item";
                    
                            modal.classList.add("is-modal--open");
                        }
                    }

                    if (i == 0) {
                        if (e.target.closest(".orders-acceptance-item") && e.isTrusted) {
                            const item = e.target.closest(".orders-acceptance-item__stroke");
                            item.className = "orders-acceptance-item__stroke";
                        }
                    }
                    
                    if (i == 1) {
                        if (e.target.closest(".orders-acceptance-item") && e.isTrusted) {
                            const item = e.target.closest(".orders-acceptance-item__stroke");
                            item.className = "orders-acceptance-item__stroke orders-acceptance-item__stroke--office";
                        }
                    }

                    if (i == 2) {
                        if (e.target.closest(".orders-acceptance-item") && e.isTrusted) {
                            const modal = document.querySelector("[data-is-modal='agreement']");
                            const item = e.target.closest(".orders-acceptance-item__stroke");
                            item.className = "orders-acceptance-item__stroke orders-acceptance-item__stroke--agreed";
                    
                            modal.classList.add("is-modal--open");
                        }
                    }

                    if (i == 3) {
                        if (e.target.closest(".orders-acceptance-item") && e.isTrusted) {
                            const item = e.target.closest(".orders-acceptance-item__stroke");
                            item.className = "orders-acceptance-item__stroke";
                        }
                    }
                });
            });
    
            function initiate() {
                const index = item.dataset.altSelectInit;
                let event = new Event("click");
    
                allOptions.forEach((item, i) => {
                    if (index == (i + 1)) {
                        item.dispatchEvent(event);
                    }
                });
            }
    
            initiate();
        });

        document.addEventListener("click", (e) => {
            let isActive = false;
            if (altSelects.length !== 0) {
                if (!e.target.closest(".alt-select")) {
                    altSelects.forEach(select => {
                        const trigger = select.querySelector(".alt-select__trigger");
    
                        if (trigger.classList.contains("alt-select__trigger--open")) {
                            isActive = true;
                        }
                    });
    
                    if (isActive = true) {
                        altSelects.forEach(select => {
                            const trigger = select.querySelector(".alt-select__trigger");
                            const drop = select.querySelector(".alt-select__drop");
                            trigger.classList.remove("alt-select__trigger--open");
                            drop.classList.remove("alt-select__drop--open");
                        });
                    }
                }
            }
        });
    }

    const deliveryItems = document.querySelectorAll(".orders-delivery-item");
    let checkIfSomeAct = false;
    let count = 0;
    let activeIndex;

    deliveryItems.forEach(item => {
        const trigger = item.querySelector(".orders-delivery-item__inner");

        trigger.addEventListener("click", () => {
            if (!item.classList.contains("orders-delivery-item--blured")) {
                item.classList.toggle("orders-delivery-item--open");
                checkIfSomeAct = false;
                count++;
    
                deliveryItems.forEach((item, i) => {
                    if (item.classList.contains("orders-delivery-item--open")) {
                        if (checkIfSomeAct) {
                            item.classList.add("orders-delivery-item--blured");
                            item.classList.remove("orders-delivery-item--open");
                        }
                        checkIfSomeAct = true;
                        activeIndex = i;
                    }
                });
    
                if (checkIfSomeAct) {
                    if (activeIndex > 2 || count > 1) {
                        deliveryItems.forEach((item, i) => {
                            if ((i > activeIndex || count > 1) && activeIndex !== i) {
                                item.classList.add("orders-delivery-item--blured");
                            }
                        });
                    }
                }
    
                if (!checkIfSomeAct) {
                    deliveryItems.forEach((item, i) => {
                        item.classList.remove("orders-delivery-item--blured");
                    });
                }
            }
        });

        const choseAll = item.querySelector(".orders-delivery-item__divider .orders-delivery-item__checkbox input");
        const otherInputs = item.querySelectorAll(".orders-delivery-item__content .orders-delivery-item__stroke .orders-delivery-item__input")

        choseAll.addEventListener("change", () => {
            otherInputs.forEach(item => {
                if (choseAll.checked) {
                    item.checked =  true;
                    item.setAttribute("checked", true);
                } else {
                    item.checked =  false;
                }
            })
        });
    });

    const modals = document.querySelectorAll("[data-is-modal]");
    
    modals.forEach(modal => {
        modal.addEventListener("click", (e) => {
            if (!e.target.closest("[data-is-window]")) {
                modal.classList.remove("is-modal--open");
            } else if(e.target.closest("[data-is-cancel]")) {
                modal.classList.remove("is-modal--open");
            }
        });
    });

    const delivery = document.querySelector(".orders-delivery");

    if (delivery) {
        document.addEventListener("click", (e) => {
            if (e.target.tagName == "A") {
                e.preventDefault();
            }
            
            if (e.target.closest(".orders-delivery-item--blured")) {
                const warining = document.querySelector("[data-is-modal='warning']");

                warining.classList.add("is-modal--open");
            }
        })
    }


    const callModal = document.querySelectorAll("[data-is-call-modal]");

    callModal.forEach(item => {
        item.addEventListener("click", () => {
            const modalType = item.dataset.isCallModal;
            const modal = document.querySelector(`[data-is-modal="${modalType}"]`);

            if (modal.classList.contains("showcase-login")) {
                const profile = document.querySelector(".showcase-header__profile-wrapper .showcase-profile");

                if (!profile.classList.contains("showcase-profile--active")) {
                    modal.classList.add("is-modal--open");
                }
            } else {
                modal.classList.add("is-modal--open");
            }
        });
    });

    altSelect();
}

try {
    ordersDelivery();
} catch(err) {
    console.log(err);
}

function ordersReturn() {
    const callModalMovements = document.querySelectorAll(".orders-return__sending");
    const movementModal = document.querySelector(".order-modal--good-movement");

    callModalMovements.forEach(item => {
        item.addEventListener("click", () => {
            movementModal.classList.add("order-modal--active");
        });
    });
}


try {
    ordersReturn();
} catch(err) {
    console.log(err);
}


function ordersAcceptance() {
    const triggerStoreChoses = document.querySelectorAll(".orders-acceptance-item__chose-store");
    const acceptance = document.querySelector(".orders-acceptance");

    triggerStoreChoses.forEach(item => {
        const modal = item.querySelector(".store-modal");
        const formElems = modal.querySelector("form").elements;
        const firstStep = item.querySelector(".chose-store__step--first");
        const secondStep = item.querySelector(".chose-store__step--second");
        const thirdStep = item.querySelector(".chose-store__step--third");
        const cancelModal = modal.querySelector(".store-modal__control--cancel");
        const submit = modal.querySelector(".store-modal__control:first-of-type");

        item.addEventListener("click", () => {
            modal.classList.add("open");
            console.log(cancelModal);
        }, {
            capture: true
        });
        
        cancelModal.addEventListener("click", () => {
            modal.classList.remove("open");
        });

        submit.addEventListener("click", () => {
            if (!thirdStep.classList.contains("chose-store__step--hide")) {
                thirdStep.classList.add("chose-store__step--hide")
            }

            firstStep.classList.add("chose-store__step--hide");
            secondStep.classList.remove("chose-store__step--hide");
            thirdStep.children[1].textContent = formElems[0].value + formElems[1].value + formElems[2].value;
            modal.classList.remove("open");

            setTimeout(() => {
                secondStep.classList.add("chose-store__step--hide");
                thirdStep.classList.remove("chose-store__step--hide");
            }, 3000);
        });
    });


    if (acceptance) {
        document.addEventListener("click", (e) => {
            const modals = document.querySelectorAll(".store-modal");
            let anyOpen = false;

            modals.forEach(item => {
                if (item.classList.contains("open")) {
                    anyOpen = true;
                }
            });

            if (anyOpen && !e.target.closest(".store-modal")) {
                modals.forEach(item => {
                    if (item.classList.contains("open")) {
                        item.classList.remove("open");
                    }
                });
            }
        }, {
            capture: true
        });
    }

    const callModalMovements = document.querySelectorAll(".orders-acceptance-item__company");
    const movementModal = document.querySelector(".order-modal--good-movement");

    callModalMovements.forEach(item => {
        item.addEventListener("click", () => {
            movementModal.classList.add("order-modal--active");
        });
    });
}


try {
    ordersAcceptance();
} catch(err) {
    console.log(err);
}

function deliveryMethod() {
    const allInputs = document.querySelectorAll(".delivery-basket__field input");
    const bottom = document.querySelector(".delivery-basket__bottom");

    if (bottom) {
        allInputs.forEach(item => {
            item.addEventListener("change", (e) => {
                const wrapper = e.target.closest(".delivery-basket__field")
                if (item.checked) {
                    wrapper.after(bottom);
                    bottom.classList.remove("delivery-basket__bottom--hidden");
                }
            });
        });
    }
}

try {
    deliveryMethod();
} catch(err) {
    console.log(err);
}

function returnEnhancement() {
    const returnFirstModal = document.querySelector("#modalBack .enter__content");
    const mainModal = document.querySelector(".return-second");
    const modalTriggers = document.querySelectorAll(".return-second__chose-cell");
    const submit = mainModal.querySelector(".return-second__save");

    submit.addEventListener("click", (e) => {
        mainModal.classList.remove("is-modal--open");
    }); 

    modalTriggers.forEach(item => {
        item.addEventListener("click", (e) => {
            const wrapper = e.target.closest(".return-second__wrapper");
            const modal = wrapper.querySelector(".return-second__cell-modal");
            const cancel = modal.querySelector(".store-modal__control--cancel");
            const submit = modal.querySelector(".store-modal__control:first-of-type");
            const form = modal.querySelector("form");
            const toSupBrand = wrapper.querySelector(".return-second__cell--name");
            const toStockBrand = wrapper.querySelector(".return-second__cell--name");
            const toStockRow = wrapper.querySelector(".return-second__cell--row");
            const toStockCell = wrapper.querySelector(".return-second__cell--cell");
            modal.classList.add("open");


            cancel.addEventListener("click", () => {
                modal.classList.remove("open");
            });

            submit.addEventListener("click", () => {
                if (item.classList.contains("return-second__chose-cell--to-stock")) {
                    toStockBrand.textContent = form.elements["brand"].value;
                    toStockRow.textContent = form.elements["row"].value;
                    toStockCell.textContent = form.elements["cell"].value;
                } else if (item.classList.contains("return-second__chose-cell--to-supp")) {
                    toSupBrand.textContent = form.elements["brand"].value;
                }

                modal.classList.remove("open");
            });
        });
    });

    function toggleRadio() {
        const allRadio = document.querySelectorAll('.return-second__field input');
        const allWrappers = document.querySelectorAll(".return-second__wrapper");

        allRadio.forEach(item => {
            item.addEventListener("change", (e) => {
                const wrapper = e.target.closest(".return-second__wrapper");
                allWrappers.forEach(item => {
                    item.classList.remove("return-second__wrapper--active")
                });

                if (wrapper) {
                    wrapper.classList.add("return-second__wrapper--active")
                }
            });
        });
    }

    toggleRadio();

    returnFirstModal.addEventListener("click", (e) => {
        console.log("smth");
        mainModal.classList.add("is-modal--open");
    });
}

try {
    returnEnhancement();
} catch(err) {
    console.log(err);
}

function searchEnhacement() {
    const searchSelect = document.querySelector(".orders-acceptance__select--search");

    if (searchSelect) {
        const innerInput = searchSelect.querySelector(".select__trigger input");
        innerInput.removeAttribute("disabled");

        innerInput.addEventListener("focus", () => {
            innerInput.value = "";
        });
    }
}

try {
    searchEnhacement();
} catch(err) {
    console.log(err);
}

function showcasePopup() {
    const popupTriggers = document.querySelectorAll("[data-is-call-popup]");
    const allPopups = document.querySelectorAll("[data-is-popup]");

    popupTriggers.forEach(trigger => {
        const popupId = trigger.dataset.isCallPopup;
        const popup = document.querySelector(`[data-is-popup="${popupId}"]`);

        trigger.addEventListener("click", () => {
            allPopups.forEach(item => {
                item.classList.remove("open");
            });
            popup.classList.add("open");
        });
    });

    allPopups.forEach(popup => {
        const cancel = popup.querySelector("[data-is-cancel]");

        cancel.addEventListener("click", () => {
            popup.classList.remove("open");
        });
    });

    if (allPopups.length !== 0) {
        document.addEventListener("click", (e) => {
            if (!e.target.closest("[data-is-popup]") && !e.target.closest("[data-is-call-popup]")) {
                allPopups.forEach(popup => popup.classList.remove("open"));
            }
        }, {
            capture: true,
        });
    }
}

try {
    showcasePopup();
} catch(err) {
    console.log(err);
}

function showcaseMain() {
    function callbackResponse() {
        const trigger = document.querySelector(".showcase-callback__form");
        const callModal = document.querySelector('[data-is-popup="callback"]');
        const modal =  document.querySelector('[data-is-popup="callback-response"]');

        trigger.addEventListener("submit", (e) => {
            e.preventDefault();
            console.log("smth");
            callModal.classList.remove("open");

            setTimeout(() => {
                modal.classList.add("open");
            }, 300);

            setTimeout(() => {
                modal.classList.remove("open");
            }, 7000);
        });
    }

    function login() {
        const header = document.querySelector(".showcase-header");
        const profileWrapper = document.querySelector(".showcase-header__profile-wrapper");
        const profile = document.querySelector(".showcase-profile");

        profile.addEventListener("click", () => {
            if (!profile.classList.contains("showcase-profile--active")) {
                profileWrapper.classList.add("showcase-header__profile-wrapper--active");
                profile.classList.add("showcase-profile--active");
                header.classList.add("showcase-header--login");
            }
        });
    }

    function requst() {
        const initialModal = document.querySelector('[data-is-modal="request"]');
        const finalModal = document.querySelector('[data-is-modal="request-response"]');
        const trigger = initialModal.querySelector(".showcase-request__content");

        trigger.addEventListener("submit", (e) => {
            e.preventDefault();
            initialModal.classList.remove("is-modal--open");
            finalModal.classList.add("is-modal--open");

            setTimeout(() => {
                if (finalModal.classList.contains("is-modal--open")) {
                    finalModal.classList.remove("is-modal--open");
                }
            }, 5000);
        });
    }

    function manualAdding() {
        function watchModal(formSelector, itemsSelectors, inputSelector, modalSelector) {
            const modal = document.querySelector(modalSelector);
            const modalFrom = document.querySelector(formSelector);
            const modalItems = document.querySelectorAll(itemsSelectors);
            const input = document.querySelector(inputSelector);

                
            modalFrom.addEventListener("submit", (e) => {
                e.preventDefault();
                let chosenValue;

                modalItems.forEach(item => {
                    if (item.checked) {
                        chosenValue = item.value;
                        console.log(item);
                    }
                });

                input.value = chosenValue;

                modal.classList.remove("is-modal--open");
            });
        }

        watchModal(
            ".manual-modal--mark .manual-modal__form",
            ".manual-modal--mark input[name='car-mark']",
            "input[name='car-mark']",
            `[data-is-modal="chose-mark"]`
        );

        watchModal(
            ".manual-modal--model .manual-modal__form",
            ".manual-modal--model input[name='car-model']",
            "input[name='car-model']",
            `[data-is-modal="chose-model"]`
        );
    }

    function curtain() {
        const hamburger = document.querySelector(".showcase-header__hamburger--mobile");
        const curtain = document.querySelector(".showcase-header__mobile-curtain");

        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("open");
            curtain.classList.toggle("open");
        });
    }

    callbackResponse();
    login();
    requst();
    manualAdding();
    curtain();
}

try {
    showcaseMain();
} catch(err) {
    console.log(err);
}


function scrollBlock() {
    const scrollableBlocks = document.querySelectorAll("[data-is-scrollable]");

    scrollableBlocks.forEach((item, i, array) => {
        const newClass = `showcase-scrollable-${i}`;
        item.classList.add(newClass);
        new Swiper("." + newClass, {
            direction: "horizontal",
            slidesPerView: 'auto', 
            speed: 700,
            spaceBetween: 40,
            loop: false,
            autoplay: {
                pauseOnMouseEnter: true,
                disableOnInteraction: false,
                delay: 5000,
            },
            mousewheel: true
        });
    })
}

scrollBlock();


function showcaseCategory() {
    function collapse() {
        const triggers = document.querySelectorAll(".showcase-collapse__header");

        if (triggers.length !== 0) {
            triggers.forEach(item => {
                item.addEventListener("click", (e) => {
                    const wrapper = e.target.closest(".showcase-collapse");

                    if (wrapper.classList.contains("open")) {
                        wrapper.classList.remove("open");
                    } else {
                        wrapper.classList.add("open");
                    }
                });
            });
        }
    }

    collapse();
}

try {
    showcaseCategory();
} catch(err) {
    console.log(err);
}

function showcaseGoods() {
    function changeLayout() {
        const wrapper = document.querySelector(".showcase-chose-goods__wrapper");
        const triggerGrid = document.querySelector(".showcase-chose-goods__control--grid");
        const triggerList = document.querySelector(".showcase-chose-goods__control--list");
        let list = false

        triggerList.addEventListener("click", () => {
            console.log("clci");
            if (!list) {
                list = true;
                wrapper.classList.add("showcase-chose-goods__wrapper--list");
            }
        });

        triggerGrid.addEventListener("click", () => {
            if (list) {
                list = false;
                wrapper.classList.remove("showcase-chose-goods__wrapper--list");
            }
        });
    }

    function addToCart() {
        const triggers = document.querySelectorAll(".showcase-chose-item__add-to-cart");
        const wrapper = document.querySelector(".showcase-chose-goods__right");
        const cart = document.querySelector(".showcase-header-cart");
        const cartCount = document.querySelector(".showcase-header-cart .showcase-header-cart__count");
        let counter = 0;

        triggers.forEach(trigger => {
            trigger.addEventListener("click", (e) => {
                const item = e.target.closest(".showcase-chose-item");
                const itemCoords = item.getBoundingClientRect();

                if (item.classList.contains("showcase-chose-item--in-cart")) {
                    return;
                }

                const copy = item.cloneNode(true);
                const copyClass = `showcase-chose-item--animated-copy--${counter}`;
                const coordinates = trigger.getBoundingClientRect();

                copy.classList.add("showcase-chose-item--animated-copy");
                copy.classList.add(copyClass);

                counter++;

                copy.style = `top: ${coordinates.top - 40}px; left: ${coordinates.left + 40}px`;
                
                if (trigger.classList.contains("showcase-chose-item__list-cart")) {
                    copy.style = `top: ${coordinates.top - 40}px; left: ${coordinates.left - (itemCoords.width * 0.4) + 40}px`;
                }

                wrapper.append(copy);

                item.classList.add("showcase-chose-item--in-cart");

                setTimeout(() => {
                    const actualCopy = document.querySelector("." + copyClass);
                    const cartCoords = cart.getBoundingClientRect();
                    const copyCoords = actualCopy.getBoundingClientRect();
                    const toTop = copyCoords.y + copyCoords.height;
                    const toRight =  cartCoords.right - copyCoords.right;
                    
                    actualCopy.addEventListener("transitionend", () => {
                        if (actualCopy) {
                            actualCopy.remove();
                            cartCount.textContent = 2 + counter;
                        }
                    });

                    if (trigger.classList.contains("showcase-chose-item__list-cart")) {
                        actualCopy.style = `
                            top: ${coordinates.top - 40}px;
                            left: ${coordinates.left - (itemCoords.width * 0.4) + 40}px;
                            transform: translateY(-${toTop}px) translateX(${toRight}px) scale(0.4);
                            opacity: 0;
                        `;
                    } else {
                        actualCopy.style = `
                            top: ${coordinates.top - 40}px;
                            left: ${coordinates.left + 40}px;
                            transform: translateY(-${toTop}px) translateX(${toRight}px) scale(0.4);
                            opacity: 0;
                        `;
                    }

                }, 700);
            });
        });
    }

    changeLayout();
    addToCart();
}

try {
    showcaseGoods();
} catch(err) {
    console.log(err);
}

function showcaseItemsSlider() {
    const scrollableBlocks = document.querySelectorAll(".showcase-chose-item__slider-wrapper");

    scrollableBlocks.forEach((item, i, array) => {
        const newClass = `showcase-scrollable-${i}`;
        item.classList.add(newClass);
        const newSlider = new Swiper("." + newClass, {
            slidesPerView: 1,
            loop: true,
            pagination: {
                clickable: true,
                el: `.${newClass} ~ .showcase-chose-item__pagination`
            },
        });

        $(`.${newClass} ~ .showcase-chose-item__pagination .swiper-pagination-bullet`).on('mouseover', function() {
            newSlider.slideTo($(this).index() + 1);
        })
    })
}

try {
    showcaseItemsSlider();
} catch(err) {
    console.log(err);
}


function showcaseCart() {
    function help() {
        const check = document.querySelector(".showcase-cart-help__left input[type=checkbox]");
        const hiddenInput = document.querySelector(".showcase-cart-help__input-wrapper");
        const hiddenBlock = document.querySelector(".showcase-cart-help__right");


        check.addEventListener("change", () => {
            if (check.checked) {
                hiddenInput.classList.remove("showcase-cart__hidden");
                hiddenBlock.classList.remove("showcase-cart__hidden");
            } else {
                hiddenInput.classList.add("showcase-cart__hidden");
                hiddenBlock.classList.add("showcase-cart__hidden");
            }
        });
    }

    function choseCar() {
        const trigger = document.querySelector(".showcase-cart-help__item");
        const block = document.querySelector(".showcase-cart-help__chosable-blocks");
        const items = document.querySelectorAll(".showcase-cart-help__chose-item input");

        trigger.addEventListener("click", () => {
            trigger.classList.toggle("showcase-cart-help__item--active");
            block.classList.toggle("showcase-cart-help__chosable-blocks--active");
        });

        items.forEach(item => {
            item.addEventListener("change", () => {
                trigger.classList.toggle("showcase-cart-help__item--active");
                block.classList.toggle("showcase-cart-help__chosable-blocks--active");
            });
        });
    }

    function ifPaymentChosen() {
        const items = document.querySelectorAll(".showcase-cart__main-right .cards__checkbox1 input");
        const blocks = document.querySelectorAll(".showcase-cart__design");

        items.forEach(item => {
            item.addEventListener("change", (e) => {
                if (item.checked) {
                    blocks.forEach(item => item.classList.remove("showcase-cart__hidden"));
                }
            });
        });

        // mobile 

        const mobitems = document.querySelectorAll(".showcase-cart__main-left .cards__checkbox1 input");
        const mobblock = document.querySelector(".showcase-cart__design");

        mobitems.forEach(item => {
            item.addEventListener("change", (e) => {
                if (item.checked) {
                    mobblock.classList.remove("showcase-cart__hidden")
                }
            });
        });
    }

    function changeDeliveryMethod() {
        const modal = document.querySelector(".showcase-cart__delivery-change-modal");
        const items = modal.querySelectorAll(".delivery-basket__field .delivery-basket__radio");

        const infoItems = document.querySelectorAll(".showcase-cart__delivery");

        items.forEach(item => {
            item.addEventListener("change", () => {
                if (item.value == "town-delivery") {
                    infoItems.forEach(item => {
                        item.classList.add("showcase-cart__hidden");

                        if (item.classList.contains("showcase-cart__delivery--town")) {
                            item.classList.remove("showcase-cart__hidden");
                        }
                    });
                } else if (item.value == "taxi-delivery") {
                    infoItems.forEach(item => {
                        item.classList.add("showcase-cart__hidden");

                        if (item.classList.contains("showcase-cart__delivery--taxi")) {
                            item.classList.remove("showcase-cart__hidden");
                        }
                    });
                }
            });
        });
    }

    help();
    choseCar();
    ifPaymentChosen();
    changeDeliveryMethod();
}

try {
    showcaseCart();
} catch(err) {
    console.log(err);
}

function showcaseResult() {
    function inputNumber() {
        const items = document.querySelectorAll(".showcase-result-item__count input[type='number']");
        const itemWrappers = document.querySelectorAll(".showcase-result-item__count");

        items.forEach(item => {
            item.addEventListener("change", (e) => {
                const parentEl = e.target.closest(".showcase-result-item__control");
                const cart = parentEl.querySelector(".showcase-header-cart__count");

                if (item.value < 0) {
                    item.value = 0;
                }

                if (item.value == 0) {
                    cart.classList.add("showcase-header-cart__count--hidden");
                }

                if (item.value > 0) {
                    cart.classList.remove("showcase-header-cart__count--hidden");
                }

                cart.textContent = item.value;
            });
        });

        itemWrappers.forEach(wrapper => {
            const arrowTop = wrapper.querySelector(".showcase-result__arrows svg:first-of-type");
            const arrowBottom = wrapper.querySelector(".showcase-result__arrows svg:last-of-type");
            const input = wrapper.querySelector("input[type='number']");

            arrowTop.addEventListener("click", () => {
                input.value = ++input.value;
                let event = new Event("change");
                input.dispatchEvent(event);
            });


            arrowBottom.addEventListener("click", () => {
                input.value = --input.value;
                let event = new Event("change");
                input.dispatchEvent(event);
            });
        });
    }

    inputNumber();
}

try {
    showcaseResult();
} catch(err) {
    console.log(err);
}

function showcaseAutos() {
    const modal = document.querySelector(".showcase-request--auto");
    const form = modal.querySelector(".showcase-request__content");
    const wrapper = document.querySelector(".showcase-autos__content");
    const ifChosen = document.querySelector(".showcase-autos__info");
    let counter = 0;

    function removeItem(trigger, item) {
        trigger.addEventListener("click", () => {
            const radio = item.querySelector("input");

            if (radio.checked) {
                ifChosen.classList.add("showcase-autos__info--hidden");
            }

            item.remove();
        });
    }

    function followItem(trigger) {
        trigger.addEventListener("change", () => {
            ifChosen.classList.remove("showcase-autos__info--hidden");
        });
    }

    function addNew() {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const data = form.elements;
            let newClass = `showcase-autos__item--${counter}`;

            const template = `
                <label class="showcase-autos__item ${newClass}">
                    <input type="radio" name="item" value="${data["vin-number"].value}">
                    <div class="showcase-autos__inner">
                        <div class="showcase-autos__img-wrapper">
                            <img src="./img/showcase/autos_1.png" alt="">
                        </div>
                        <div class="showcase-autos__text-content">
                            <h3 class="showcase-autos__title">
                                ${data["car-mark"].value} <br>
                                ${data["car-model"].value}
                            </h3>
                            <span class="showcase-autos__secondary showcase-autos__secondary--years">${data["year"].value}</span>
                            <span class="showcase-autos__secondary showcase-autos__secondary--index">${data["modification"].value}</span>
                        </div>
                        <button class="showcase-autos__remove">
                            <img src="./img/showcase/trash.svg" alt="">
                        </button>
                        <span class="showcase-autos__checked">
                            <img src="./img/showcase/blue-checked.svg" alt="">
                        </span>
                    </div>
                </label>
            `;

            counter++;
            
            wrapper.insertAdjacentHTML("beforeend", template);
            const item = document.querySelector("." + newClass);
            const trigger = item.querySelector(".showcase-autos__remove");
            const input = item.querySelector("input[type='radio']");
            removeItem(trigger, item);
            followItem(input);
            modal.classList.remove("is-modal--open");
        });
    }

    function initiate() {
        const items = document.querySelectorAll(".showcase-autos__item");

        items.forEach(item => {
            const trigger = item.querySelector(".showcase-autos__remove");
            const input = item.querySelector("input[type='radio']");

            removeItem(trigger, item);
            followItem(input);
        });
    }

    function choseMark() {
        const modal = document.querySelector("[data-is-modal='chose-mark']");
        const items = modal.querySelectorAll(".manual-modal__item input[type='radio']");
        const field = document.querySelector(".showcase-request__field-wrapper--mark .showcase-request__field");
        const btn = modal.querySelector(".manual-modal__btn");

        btn.addEventListener("click", () => {
            items.forEach(item => {
                if (item.checked) {
                    field.value = item.value;
                }
            });
        });
    }

    function choseModel() {
        const modal = document.querySelector("[data-is-modal='chose-model']");
        const items = modal.querySelectorAll(".manual-modal__item input[type='radio']");
        const field = document.querySelector(".showcase-request__field-wrapper--model .showcase-request__field");
        const btn = modal.querySelector(".manual-modal__btn");

        btn.addEventListener("click", () => {
            items.forEach(item => {
                if (item.checked) {
                    field.value = item.value;
                }
            });
        });
    }

    addNew();
    initiate();
    choseMark();
    choseModel();
}

try {
    showcaseAutos();
} catch(err) {
    console.log(err);
}

function showcaseLogin() {
    const restorePassTrigger = document.querySelectorAll(".showcase-login__foreget-pass");
    const registrTriggers = document.querySelectorAll(".showcase-login__registration");
    const loginTriggers = document.querySelectorAll(".showcase-login__login-to-lk");
    const loginModal = document.querySelector(`[data-is-modal="login"]`)
    const restoreModal = document.querySelector(`[data-is-modal="login-restore-pass"]`);
    const registrModal = document.querySelector(`[data-is-modal="login-registr"]`);

    restorePassTrigger.forEach(item => {
        console.log(item);
        item.addEventListener("click", () => {
            loginModal.classList.remove("is-modal--open");
            restoreModal.classList.add("is-modal--open");
        });
    });

    registrTriggers.forEach(item => {
        item.addEventListener("click", () => {
            loginModal.classList.remove("is-modal--open");
            registrModal.classList.add("is-modal--open");
        });
    });

    loginTriggers.forEach(item => {
        item.addEventListener("click", () => {
            restoreModal.classList.remove("is-modal--open");
            registrModal.classList.remove("is-modal--open");
    
            loginModal.classList.add("is-modal--open");
        });
    });

    const hiddenBeneathBtns = document.querySelectorAll(".showcase-login__hidden-beneath");

    hiddenBeneathBtns.forEach(item => {
        item.addEventListener("click", (e) => {
            const parent = e.target.closest(".enter__form");

            if (parent && item.classList.contains("showcase-login__hidden-beneath")) {
                const items = parent.querySelectorAll(".showcase-login__hidden");

                items.forEach(item => item.classList.remove("showcase-login__hidden"));
                item.classList.remove("showcase-login__hidden-beneath");
                item.classList.add("showcase-login__hidden");
            }
        });
    });
}

try {
    showcaseLogin();
} catch(err) {
    console.log(err);
}

function showcasesCart() {
    const wrapper = document.querySelector(".showcase-cart");
    const mainContent = document.querySelector(".showcase-cart__global-wrapper");
    const processed = document.querySelector(".showcase-order-processed");
    const designTriggers = document.querySelectorAll(".showcase-cart__design a");

    if (wrapper) {
        designTriggers.forEach(designTrigger => {
            designTrigger.addEventListener("click", (e) => {
                e.preventDefault();
                mainContent.style.display = "none";
                window.scrollTo(0, 0);
                processed.classList.remove("showcase-order-processed--hidden");
                
                setTimeout(function(){
                    window.location.href = "showcase-orders.html";
                }, 3000);
            });
        });
    }
}

try {
    showcasesCart();
} catch(err) {
    console.log(err);
}