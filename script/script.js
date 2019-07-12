var APP = {};
APP.$document = $(document);
APP.slider = $('.slider-container');
APP.scrollUp = $('.scroll-up');
APP.modal = $('.modal');
APP.closeModal = $('.modal-close');
APP.modalBtn = $('.modal-btn');
APP.articleBtn = $('.articles-item');
APP.articleOpen = $('.articles-open');
APP.articleClose = $('.articles-open__back');
APP.articlesSlider = $('.articles-slider');
APP.contactsInput = $('.contacts__input');
APP.hamburger = $('.hamburger');
APP.aboutMore = $('.about__more');
APP.navItem = $('.nav__item');
APP.video = $('.events__video');
APP.videoSlider = $('.events-slider');
APP.videoPreview = $('.events-item');


function closeModal(){
  APP.modal.removeClass('active');
  $('.modal__subtitle').removeClass('show')
  $('html').removeClass('overflow');
};

function doAnimation(){
    var windowScroll = $(window).height() + APP.$document.scrollTop(),
        element = APP.$document.find('.js-animation:not(.animate)')[0];

  $('.js-animation:not(.animate)').each(function(key, item){
    var itemOffset = $(item).offset().top + 100,
        tableParent = $(item).parents('.palette-table');

    if($(this).hasClass('price')){
      itemOffset = $(item).offset().top + 500
    }
    if(windowScroll >= itemOffset){
        $(item).addClass('animate');
    }
  });
};

APP.$document.ready(function() {

	APP.videoPreview.on('click', function(){
		var id = $(this).data('id'),
				idCurrent = player.b.b.videoId;

		if($(this).parents('.events-container').find('iframe').data('id')){
			idCurrent = $(this).parents('.events-container').find('iframe').data('id');
		}

		$(this).parents('.events-container').find('iframe').data('id', id);

		var img = 'https://img.youtube.com/vi/' + idCurrent + '/0.jpg';

		$(this).find('img').attr('src', img);
		$(this).data('id', idCurrent);
		player.loadVideoById({videoId:id}).stopVideo();
	})

	doAnimation ();
  APP.$document.on('scroll', function(event){
    doAnimation ();
  });

	APP.navItem.on('click', function(){
		var section = $(this).data('scroll'),
				scrollTo = $(section).offset().top;

		$('html').removeClass('overflow').animate({ scrollTop: scrollTo }, 500);
		$('body').removeClass('menu');
		APP.hamburger.removeClass('active');
	});

	APP.aboutMore.on('click', function(){
		$(this).parents('.about-text').find('.about__description').addClass('show');
		$(this).hide();
	});

	APP.hamburger.on('click', function(){
    $(this).toggleClass('active');
    $('body').toggleClass('menu');
    $('html').toggleClass('overflow');
  });
  
	APP.modal.on('click', function(event){
		if($(event.target).hasClass('modal')){
			closeModal();
		}
	});

	APP.contactsInput.on('keyup', function() {
		var value = $(this).val();
		if (value == "") {
			$(this).removeAttr('value');
		} else {
			$(this).attr('value', value);
		}
	});

	APP.articleClose.on('click', function(){
		APP.articleOpen.removeClass('opened');
		APP.articlesSlider.removeClass('hide');
	});

	APP.articleBtn.on('click', function(){
		var photo = $(this).find('.articles-photo').attr('style'),
				title = $(this).find('.articles__subtitle').text(),
				text = $(this).find('.articles-text p').html(),
				date = $(this).find('.articles__date').text();

		APP.articleOpen.find('.articles-open__photo').attr('style', photo);
		APP.articleOpen.find('.articles__subtitle').text(title);
		APP.articleOpen.find('p').html(text);
		APP.articleOpen.find('.articles__date').text(date);
		APP.articlesSlider.addClass('hide');
		APP.articleOpen.addClass('opened');

	});

  APP.closeModal.on('click', function() {
    closeModal();
  });

  APP.modalBtn.on('click', function(event) {
    var attr = $(this).attr('data-target'),
        modal = $('.modal[data-target="' + attr + '"]');

    if($(event.target).hasClass('price__btn')){
    	let size = $(this).parents('.price-item').find('.price__size').text();
    	$('.modal__subtitle').addClass('show').text('(' + size + ')');
    };

    modal.addClass('active');
    $('html').addClass('overflow'); 
  });

	APP.$document.on('scroll', function(){
		if($(this).scrollTop() >= 1000) {
			APP.scrollUp.addClass('show');
		} else {
			APP.scrollUp.removeClass('show');
		}
	});

	APP.scrollUp.on('click', function(){
		$('html, body').animate({ scrollTop: 0 }, 500);
    // $(document).scrollTop(0);
	});

	APP.slider.each(function(key, item) {
    var options = {
      infinite: true,
      variableWidth: attr('variable')? attr('variable') : false,
      vertical: attr('vertical')? attr('vertical') : false,
      slidesToShow: attr('show'),
      slidesToScroll: attr('scroll')? attr('show') : 1,
      arrows: true,
      rtl: attr('rtl')? attr('rtl') : false,
      nextArrow: '<button class="slick-next slick-arrow flex-c-c"><i class="icon-slick-next"></i></button>',
      prevArrow: '<button class="slick-prev slick-arrow flex-c-c"><i class="icon-slick-prev"></i></button>',
      responsive: [{
        breakpoint: 1400,
        settings: {
          slidesToShow: attr('show-small'),
          centerMode: false
        },
      },
      {
        breakpoint: 1140,
        settings: {
          slidesToShow: attr('show-tablet'),
          centerMode: false
        },
      },
      {
        breakpoint: 720,
        settings: {
          slidesToShow: attr('show-mobile'),
          vertical: attr('vertical-mobile'),
          centerMode: false
        },
      }]
    };

    function attr (value) {
      return $(item).data(value);
    };

    $(item).slick(options);
  });
});

// document ready