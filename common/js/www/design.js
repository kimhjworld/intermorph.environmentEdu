jQuery(function($){
	//AOS.init();
	//gnb
	(function(){
		var header = $('#header');
		var wrap = $('#header .frm');
		var gnb = wrap.find('#gnb');
		var gnb_li = gnb.find('>li');
		var gnb_sub = gnb_li.find('>ul');
		function menu_On(){
			var t = $(this);
			if (!t.hasClass('on')){
				gnb_li.removeClass('on');
				t.addClass('on');
				header.addClass('active');
			}
			wrap.stop().animate({'height':'380'},200);
		};
		function menu_Off(){
			gnb_li.removeClass('on');
			header.removeClass('active');
			wrap.stop().animate({'height':'90'},200);
		};
		gnb_li.mouseenter(menu_On).focusin(menu_On);
		wrap.mouseleave(menu_Off).focusout(menu_Off);
	}());

	header_scroll();
	function header_scroll(){
		if ($(this).scrollTop() > 0) {
			$('#header').addClass('fixed');
		} else {
			$('#header').removeClass('fixed');
		}
	};
	$(window).scroll(function() {
		header_scroll();
	});

	//mobile nav
	$.fn.nav = function(){
		return this.each(function(){
			var $menu = $(this),
			$list = $menu.find('>li');
			$submenu = $menu.find('>li>ul');
			$menu.find('>li').each(function(){
				var $sub = $(this).find('> ul');
				if ($sub.length > 0) {
					$(this).find('> a').addClass('opener');
				}
				if ($(this).hasClass('on')) {
					$(this).find('>ul').css('display', 'block');
				};
			});
			var $menu_openers = $menu.find('.opener');
			$menu_openers.on('click', function(e){
				e.preventDefault();
				var $Layer = $(this).next('ul');
				if ($Layer.is(':hidden')){
					$submenu.css('display', 'none');
					$list.removeClass('on');
					$(this).parent('li').addClass('on');
					$Layer.css('display', 'block');
				} else {
					$(this).parent('li').removeClass('on');
					$Layer.css('display', 'none');
				}
			});
		});
	};
	$('#sidr .nav').nav();
	$('.nav_toggle').click(function(e){
		e.preventDefault();
		$(this).toggleClass('on');
		$('#sidr').toggleClass('open');
	});
	$('#sidr .tog').click(function(e){
		e.preventDefault();
		$('#sidr').removeClass('open');
	});

	//메인 배너 이미지맵
	if($('.m_sd').length > 0){
		$('.m_sd img[usemap]').rwdImageMaps();
	}
	//jquery ui datepicker
	$.datepicker.setDefaults({
		//dateFormat: 'yy-mm-dd',
		prevText: '이전 달',
		nextText: '다음 달',
		monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
		dayNames: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
		dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
		showMonthAfterYear: true,
		yearSuffix: '년'
	});

	//main slide
	$.fn.main_slide = function(){
		return this.each(function(){
			var total = $(this).find('.slick-slide').length;
			var total_slide_item = $(this).find('.slide_item').length;
			if (total < 2) {
				$(this).addClass('one');
			}
			$(this).slick({
				dots:true,
				fade:true,
				appendArrows: $(this).parents('.m_sd').find('.control'),
				customPaging: function(slider, i) {
					return '<button class="tab">' +
								'<div class="line_fill"><span></span></div>' +
								'<div class="indicator">' +
									'<span class="num">' + (i+1) +'/'+total_slide_item+'</span>' +
									' <span class="lab">' + $(slider.$slides[i]).find('.slide_item').attr('data-dot-title') +'</span>' +
								'</div>' +
							'</button>';
				},
			});
			$('.control .pause').click(function(){
				var $sliderWrap = $(this).parents('.m_sd');
				if ( $sliderWrap.attr('data-slick-autoplay-status') == 'Y' ){
					$sliderWrap.attr('data-slick-autoplay-status', 'N');
					$(this).attr('title','슬라이드 재생');
					$(this).addClass('off');
				}
				else if ( $sliderWrap.attr('data-slick-autoplay-status') == 'N' ){
					$sliderWrap.attr('data-slick-autoplay-status', 'Y');
					$(this).attr('title','슬라이드 정지');
					$(this).removeClass('off');
				}
			});

			setInterval(function(){
				$('.m_sd > .viewer').each(function(index, node){
					var $slider = $(node);
					if ($slider.parent().attr('data-slick-autoplay-status') !== 'N') {
						var width = $slider.find('.slick-dots .slick-active > button > .line_fill span').css('width');
						var buttonWidth = $slider.find('.slick-dots .slick-active > button').css('width');
						if (width == buttonWidth) {
							$slider.slick('slickNext');
						}
					}
				});
			}, 500);
		});
	};
	$('.m_sd .viewer').main_slide();

	//edu slide
	$.fn.edu_slide = function(){
		return this.each(function(){
			var $slider = $(this);
			var $sliderWrap = $slider.parents('.edu_sd');
			$(this).slick({
				dots: false,
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 4,
				appendArrows:$(this).parents('.edu_sd').find('.arrows'),
				responsive: [
					{
						breakpoint: 769,
						settings: {
							slidesToShow: 2,
							slidesToScroll: 2
						}
					},
					{
						breakpoint: 577,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
			var total = $slider.find('.slick-slide').length;
			var play = $sliderWrap.find('.play');
			if (total < 5) {
				play.hide();
			}
			play.on('click', function(){
				if ($sliderWrap.attr('data-slick-autoplay-status') == 'N') {
					$sliderWrap.attr('data-slick-autoplay-status', 'Y');
					$slider.slick('slickPlay');
					$(this).attr('title','슬라이드 정지').addClass('on');
				}
				else if ($sliderWrap.attr('data-slick-autoplay-status') == 'Y') {
					$sliderWrap.attr('data-slick-autoplay-status', 'N');
					$slider.slick('slickPause');
					$(this).attr('title','슬라이드 재생').removeClass('on');
				}
			});
		});
	};
	$('.edu_li.sd').edu_slide();

	//exam_slide
	$.fn.exam_slide = function(){
		return this.each(function(){
			var $slider = $(this);
			var $sliderWrap = $slider.parents('.card_exam');
			$(this).slick({
				dots: false,
				infinite: true,
				//fade:true,
				slidesToShow: 1,
				slidesToScroll: 1,
				appendArrows:$(this).parents('.card_exam').find('.control')
			});
			var total = $slider.find('.slick-slide').length;
			var play = $sliderWrap.find('.pause');
			if (total < 2) {
				play.hide();
			}
			$slider.slick('slickPlay');
			play.on('click', function(){
				if ($sliderWrap.attr('data-slick-autoplay-status') == 'N') {
					$sliderWrap.attr('data-slick-autoplay-status', 'Y');
					$slider.slick('slickPlay');
					$(this).attr('title','슬라이드 정지').removeClass('off');
				}
				else if ($sliderWrap.attr('data-slick-autoplay-status') == 'Y') {
					$sliderWrap.attr('data-slick-autoplay-status', 'N');
					$slider.slick('slickPause');
					$(this).attr('title','슬라이드 재생').addClass('off');
				}
			});
		});
	};
	$('.exam_sd').exam_slide();

	//popup banner
	$.fn.pop_slide = function(){
		return this.each(function(){
			var $slider = $(this),
				$sliderWrap = $slider.parents('.pop_ban'),
				$slider_title = $sliderWrap.find('.title');
			$slider.slick({
				arrows: false,
				dots: true,
				infinite: true,
				slidesToShow: 1,
				slidesToScroll: 1
			});
			$slider.on('afterChange', function(){
				$slider_text = $slider.find('.slick-active .ban_item').attr('data-pop-title');
				$slider_title.text($slider_text);
			});
			$sliderWrap.find('.head button').on('click', function(){
				$sliderWrap.hide();
			});
		});
	};
	$('.pop_sd .viewer').pop_slide();

	//ct_link
	$(".ct_link a").click(function(event){
		event.preventDefault();
		var blank;
		var top_pos;
		if($(window).width() > 1023){
			blank = 95;
		} else {
			blank = 70;
		}
		top_pos = $(this.hash).offset().top - blank;
		$('html, body').animate({scrollTop:top_pos}, 500);
	});
	//center popup
	$('.ct_dialog .p_close').on('click', function(e){
		e.preventDefault();
		var popup = $(this).parents('.ct_dialog');
		if(popup.length > 0){
			popup.fadeOut();
			$('body').css('overflow', 'auto');
		}
	});
	//faq_menu
	$(document).on('click', '.faq_menu dt > a', function (){
		var tDL = $(this).parents('dl');
		var tDD = $(this).parent('dt').next();
		if (tDD.is(':hidden')) {
			tDL.addClass('on').find('dd').slideDown();
		} else {
			tDL.removeClass('on').find('dd').slideUp();
		}
		return false;
	});
	//tab
	$.fn.tabContainer = function(){
		return this.each(function(){
			if ($(this).hasClass('nojs')){
				return false;
			}
			var tab_name = this.classList; //메인 교육과정
			var tabAnchor = $(this).find('> li');
			tabAnchor.each(function(){
				var menu = $(this);
				var target = $('#' + menu.find('>a').attr('href').split('#')[1]);
				var link = menu.find('>a');
				target.css('display', 'none');
				if (menu.hasClass('on')) {
					target.css('display', 'block');
				};
				link.click(function(){
					if (!$(this).parents('li').hasClass('on')) {
						tabAnchor.removeClass('on');
						tabAnchor.each(function(){
							$('#' + $(this).find('>a').attr('href').split('#')[1]).css('display', 'none');
						});
					menu.addClass('on');
					target.css('display', 'block');
					};
					if(tab_name == 'cs_tab'){
						$(".course .edu_li.sd").slick('refresh');
					}
					return false;
				});
			});
			//tabAnchor.eq(0).trigger('click');
		});
	};
	$('.cs_head .cs_tab, .nav_tabs').tabContainer();
	//top button
	$(".btn_top").click(function(e){
		e.preventDefault();
		$('html, body').animate({scrollTop:0});
	});
	//role_pop
	$("[href='#role_pop']").click(function(e){
		e.preventDefault();
		$(this).toggleClass('active').find('.role_pop').toggle();
	});
	//cr_manage
	$(".cr_manage .role .alert").click(function(e){
		e.preventDefault();
		$(this).toggleClass("active");
		$(".cr_manage .head .noti").toggle();
	});
});
