
(function($, mzFrontend){
	"use strict";
	
	
	
	var	pageNumber = 1;
	var	mzKey = 1;
	var	mzKey2 = 1;
	var Magazinify = {
		
		init: function() {

			var widgets = {
				'magazinify-mag-tiles.default' : Magazinify.tripleHoverSimpleHover,
				'magazinify-mag-list.default' : Magazinify.magListsFunction,
				'magazinify-mag-tickers.default' : Magazinify.tickerFunction,
			};

			$.each( widgets, function( widget, callback ) {
				mzFrontend.hooks.addAction( 'frontend/element_ready/' + widget, callback );
			});
			
		},
		
		
		allDataBgImg: function(){
			
			var div = $('.magazinify_wrapper *[data-bg-img]');
			
			div.each(function(){
				var element = $(this);
				var attrBg	= element.attr('data-bg-img');
				var bgImg	= element.data('bg-img');
				if(typeof(attrBg) !== 'undefined'){
					element.css({backgroundImage:'url('+bgImg+')'});
				}
			});
		},
		
		imgToSvg: function(){
			jQuery('img.mz_svg').each(function(){
		
				var $img 		= jQuery(this);
				var imgClass	= $img.attr('class');
				var imgURL		= $img.attr('src');
				jQuery.get(imgURL, function(data) {
					var $svg = jQuery(data).find('svg');
					if(typeof imgClass !== 'undefined') {
						$svg = $svg.attr('class', imgClass+' replaced-svg');
					}
					$svg = $svg.removeAttr('xmlns:a');
					$img.replaceWith($svg);
				}, 'xml');

			});
		},
		
		tripleHoverSimpleHover: function(){
			jQuery('.mz_triple_hover.simple').each(function(){
				var element = jQuery(this);
				var items	= element.find('.item');
				items.on('mouseenter',function(){
					var el	= jQuery(this);
					if(el.hasClass('active')){
						// do nothing
					}else{
						element.find('.item.active').removeClass('active');
						el.addClass('active');
					}
				});
			});
			Magazinify.allDataBgImg();
			Magazinify.imgToSvg();
			Magazinify.tripleHoverSliderHover();
			Magazinify.tripleHoverSliderOwl();
			Magazinify.tripleSliderOwl();
			Magazinify.dotdotdotforTile();
			Magazinify.quadrupleAlphaSliderOwl();
			Magazinify.quadrupleBetaSliderOwl();
			Magazinify.quadrupleGammaSliderOwl();
			Magazinify.singleSliderOwl();
			Magazinify.singleTiledCarouselOwl();
			Magazinify.quintupleAlphaSliderOwl();
			Magazinify.quintupleBetaSliderOwl();
			Magazinify.quintupleGammaSliderOwl();
			Magazinify.sixfoldAlphaSliderOwl();
			Magazinify.septupleAlphaSliderOwl();
			Magazinify.octupleAlphaSliderOwl();
			Magazinify.tooltipsterFunction();
			Magazinify.addClassToBodyForMagazinify();
		},
		tripleHoverSliderHover: function(){
			
			jQuery('.mz_triple_hover.slider').each(function(){
				var element = jQuery(this);
				var itemH	= element.find('.item_holder');
				itemH.each(function(){
					var ell 	= jQuery(this);
					var items	= ell.find('.item');
					items.on('mouseenter',function(){
						var el	= jQuery(this);
						if(el.hasClass('active')){
							// do nothing
						}else{
							ell.find('.item.active').removeClass('active');
							el.addClass('active');
						}
					});
				});
			});
			
		},
		
		tripleHoverSliderOwl: function(){
			jQuery('.mz_triple_hover.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.th_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.tripleHoverSliderHover();
				Magazinify.dotdotdotforTile();
			});
		},
		
		tripleSliderOwl: function(){
			jQuery('.mz_triple.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.t_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		dotdotdotforTile: function(){
			jQuery('.mz_quadruple_a.simple[data-title-bg="enable"] .title h3,.mz_quadruple_b[data-title-bg="enable"] .first_item.item .title h3,.mz_quintuple_a[data-title-bg="enable"] .first_item .title h3,.mz_quintuple_b[data-title-bg="enable"] .first_items .title h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 80
				});	
			});
			jQuery('.mz_quadruple_a.simple[data-title-bg="enable"] .second_item.item .title h3, .mz_quadruple_a.simple[data-title-bg="enable"] .third_items .item .title h3,.mz_quadruple_a.slider[data-title-bg="enable"] .second_item.item .title h3, .mz_quadruple_a.slider[data-title-bg="enable"] .third_items .item .title h3, .mz_triple.simple[data-title-bg="disable"] .right_item .item .title h3,.mz_quadruple_b[data-title-bg="enable"] .second_items .title h3,.mz_quintuple_b[data-title-bg="enable"] .second_items .title h3,.mz_sixfold_a[data-title-bg="enable"] .second_items .title h3,.mz_septuple_a[data-title-bg="disable"] .first_items .title h3,.mz_octuple_a[data-title-bg="disable"] .first_items .title h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 56
				});	
			});
			jQuery('.mz_quadruple_a.simple[data-title-bg="disable"] .title h3,.mz_quadruple_a.slider[data-title-bg="disable"] .title h3,.mz_quadruple_b[data-title-bg="disable"] .first_item.item .title h3,.mz_quadruple_g[data-title-bg="enable"] .title h3,.mz_quintuple_a[data-title-bg="disable"] .title h3,.mz_quintuple_b[data-title-bg="disable"] .first_items .title h3,.mz_quintuple_g[data-title-bg="disable"] .second_items .title h3,.mz_sixfold_a[data-title-bg="disable"] .first_items .title h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 60
				});	
			});
			jQuery('.mz_quadruple_a.simple[data-title-bg="disable"] .second_item.item .title h3, .mz_quadruple_a.simple[data-title-bg="disable"] .third_items .item .title h3,.mz_quadruple_a.slider[data-title-bg="disable"] .second_item.item .title h3, .mz_quadruple_a.slider[data-title-bg="disable"] .third_items .item .title h3,.mz_quadruple_b[data-title-bg="disable"] .second_items .title h3,.mz_quadruple_g[data-title-bg="disable"] .title h3,.mz_quintuple_a[data-title-bg="disable"] .second_items .title h3,.mz_quintuple_b[data-title-bg="disable"] .second_items .title h3,.mz_quintuple_g[data-title-bg="disable"] .third_items .title h3, .mz_quintuple_g[data-title-bg="disable"] .first_items .title h3,.mz_sixfold_a[data-title-bg="disable"] .second_items .title h3,.mz_septuple_a[data-title-bg="disable"] .second_items .title h3,.mz_octuple_a[data-title-bg="disable"] .second_items .title h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 40
				});	
			});
			jQuery('.mz_triple.simple[data-title-bg="enable"] .title h3,.mz_triple.slider[data-title-bg="enable"] .title h3,.mz_triple_hover.simple[data-title-bg="enable"] .title h3,.mz_triple_hover.slider[data-title-bg="enable"] .title h3,.mz_single_t[data-title-bg="enable"] .title h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 100
				});	
			});
			jQuery('.mz_triple.simple[data-title-bg="disable"] .title h3, .mz_triple.slider[data-title-bg="disable"] .title h3,.mz_triple_hover.simple[data-title-bg="disable"] .title h3,.mz_triple_hover.slider[data-title-bg="disable"] .title h3,.mz_single_t[data-title-bg="disable"] .title h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 66
				});	
			});
			jQuery('.mz_triple.simple[data-title-bg="enable"] .right_item .item .title h3,.mz_triple.slider[data-title-bg="enable"] .right_item .item .title h3,.mz_single_t.tiled_carousel .mini_title h3,.mz_quintuple_g[data-title-bg="enable"] .second_items .title h3,.mz_sixfold_a[data-title-bg="enable"] .first_items .title h3,.mz_septuple_a[data-title-bg="enable"] .first_items .title h3,.mz_octuple_a[data-title-bg="enable"] .first_items .title h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 71
				});	
			});
			jQuery('.mz_triple.simple[data-title-bg="disable"] .right_item .item .title h3, .mz_triple.slider[data-title-bg="disable"] .right_item .item .title h3,.mz_quintuple_a[data-title-bg="enable"] .second_items .title h3,.mz_quintuple_g[data-title-bg="enable"] .third_items .title h3, .mz_quintuple_g[data-title-bg="enable"] .first_items .title h3,.mz_septuple_a[data-title-bg="enable"] .second_items .title h3,.mz_octuple_a[data-title-bg="enable"] .second_items .title h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 55
				});	
			});
			jQuery('.mz_single_t.tiled .tiled_holder h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 26
				});	
			});
		},
		dotdotdotforLists: function(){
			
			jQuery('.mz_list_a_content .mini_item h3,.mz_list_b_content .mini_item h3,.mz_list_g_content .mini_item h3,.mz_list_d_content .mini_item h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 45
				});	
			});
			jQuery('.mz_list_a_content .first_item h3,.mz_list_b_content .first_item h3,.mz_list_g_content .first_items h3,.mz_list_d_content .first_item h3,.mz_list_e_content .first_item h3,.mz_list_h_content .first_item h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 53
				});	
			});
			jQuery('.mz_list_z_content .first_item h3').each(function(){
				jQuery(this).dotdotdot({
					wrap: 'word',
					watch: true,
					height: 66
				});	
			});
		},
		quadrupleAlphaSliderOwl: function(){
			jQuery('.mz_quadruple_a.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.qa_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		quadrupleBetaSliderOwl: function(){
			jQuery('.mz_quadruple_b.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.qb_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		quadrupleGammaSliderOwl: function(){
			jQuery('.mz_quadruple_g.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.qg_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		singleSliderOwl: function(){
			jQuery('.mz_single_t.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.st_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		singleTiledCarouselOwl: function(){
			jQuery('.mz_single_t.tiled_carousel').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.st_tiled_carousel');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					autoWidth: true,
					items: 2,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		quintupleAlphaSliderOwl: function(){
			jQuery('.mz_quintuple_a.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.qfa_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		quintupleBetaSliderOwl: function(){
			jQuery('.mz_quintuple_b.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.qfb_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		quintupleGammaSliderOwl: function(){
			jQuery('.mz_quintuple_g.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.qfg_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		sixfoldAlphaSliderOwl: function(){
			jQuery('.mz_sixfold_a.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.sfa_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		septupleAlphaSliderOwl: function(){
			jQuery('.mz_septuple_a.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.spa_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		octupleAlphaSliderOwl: function(){
			jQuery('.mz_octuple_a.slider').each(function(){
				var el = jQuery(this).find('.owl-carousel');
				var slider = jQuery(this).find('.oca_slider');
				var autoplay = slider.data('autoplay');
				var autoplayTime = slider.data('autoplay-time');
				el.owlCarousel({
					loop:true,
					margin:0,
					autoplay: autoplay,
					autoplayTimeout: autoplayTime,
					nav:true,
					items: 1,
					dots: false,
					navText: ['<span></span>', '<span></span>']
				});
				Magazinify.imgToSvg();
				Magazinify.allDataBgImg();
				Magazinify.dotdotdotforTile();
			});
		},
		tooltipsterFunction: function(){
			$('.magazinify_wrapper .mz_tooltip').tooltipster({
				trigger: 'custom',
				triggerOpen: {
					mouseenter: true,
				},
				triggerClose: {
					mouseleave: true,
				},
				functionInit: function(instance, helper){

					var $origin = $(helper.origin),
						dataOptions = $origin.attr('data-tooltipster');

					if(dataOptions){

						dataOptions = JSON.parse(dataOptions);

						$.each(dataOptions, function(name, option){
							instance.option(name, option);
						});
					}
				}
			});
		},
		maglist: function(){
			jQuery('.mz_list_top_bar').each(function(){
				var el 				= jQuery(this);
				var layout			= el.data('layout');
				if(layout === 'subcats'){
					var leftPart 		= el.find('.leftpart');
					var rightPart 		= el.find('.rightpart');
					var moreDiv 		= el.find('.mz_more_list');
					var MDWidth 		= el.find('span.forwidth').width()+90;
					var elWidth 		= el.width();
					var LPWidth 		= leftPart.outerWidth(true,true);
					var asd 			= (elWidth-LPWidth-MDWidth);
					var subCatsList 	= rightPart.find('.mz_subcats_list');
					var li2 			= el.find('.mz_more_list li');
					var li 				= subCatsList.find('li');
					var key				= li.length;
					var liW = 0;
					var s = -1;
					for(var i = 0;i<key;i++){
						if(asd > liW){
							liW += jQuery(li[i]).outerWidth();
						}else{
							s++;
						}
						if(s !== -1){
							jQuery(li[key-1-i]).removeClass('needlesly');
							jQuery(li2[key-2-i]).removeClass('need');
						}
					}
					if(asd < liW){
						s++;
					}
					if(s === 0){
						jQuery(li[key-1]).addClass('needlesly');	
						jQuery(li2[key-2]).addClass('need');	
					}
					if(s>0){
						for(var a=0;a<s;a++){
							jQuery(li[key-1-a]).addClass('needlesly');
							jQuery(li2[key-2-a]).addClass('need');
						}
					}else{
						li.removeClass('needlesly');
						li2.removeClass('need');
					}

					if(jQuery(rightPart.find('.mz_subcats_list li.needlesly')).length > 0){
						moreDiv.removeClass('needlesly').css({display:'block'}).addClass('more');
					}else{
						moreDiv.addClass('needlesly').css({display:'none'}).removeClass('more');
					}
				}
					
			});
		},
		mainWidthCalc: function(){
			jQuery('.magazinify_wrapper').each(function(){
				var el = jQuery(this);
				var width = el.width();
				if(width >= 1440){
					el.attr('data-width','mz_4k');
				}else if((width >= 1200) && (width < 1440)){
					el.attr('data-width','mz_laptop_l');
				}else if((width >= 1040) && (width < 1200)){
					el.attr('data-width','mz_laptop_m');
				}else if((width >= 768) && (width < 1040)){
					el.attr('data-width','mz_tablet');
				}else if((width >= 480) && (width < 768)){
					el.attr('data-width','mz_mobile_l');
				}else{
					el.attr('data-width','mz_mobile');
				}
			});
		},
		magListsFunction: function(){
			Magazinify.maglist();
			Magazinify.mainWidthCalc();
			Magazinify.allDataBgImg();
			Magazinify.imgToSvg();
			Magazinify.dotdotdotforLists();
			Magazinify.animate();
			Magazinify.addClassToBodyForMagazinify();
			mzKey++;
			if(!(window.elementor)){
				if(mzKey === 2){
					Magazinify.portfolioFilter();
				}
			}else{
				Magazinify.portfolioFilter();
			}
		},
		animate: function(){
			var alertt = jQuery('.mz_all_ajax_lists');
			
			alertt.each(function(){
				var el	 		= jQuery(this);
				var animation 	= el.data('animation-type');
				var delay	 	= el.data('animation-delay');
				var div			= el.find('.mz_animate');
				if(animation !== "none"){
					div.each(function(){
						var alert = jQuery(this);
						alert.waypoint({
							handler: function(){
										setTimeout(function(){
											alert.removeClass('hideforanimation').addClass(animation);
										}, delay);
									},
							offset: '90%'
						});
					});
				}
					
			});
				
		},
		portfolioFilter: function(){
			
			var magListss = jQuery('.magazinify_wrapper.mag_lists');
			var id2 	= '';
			magListss.each(function(){
				var el 		= $(this);
				var topbar	= el.find('.mz_list_top_bar');
				var drDown	= el.find('.mz_more_list');
				var btns	= topbar.find('a');
				var layout	= topbar.data('mz-layout');
				var catlayout	= topbar.data('layout');
				var pag		= el.find('.magazinify_ajax_pagination');
				var id 		= pag.data('id');
				var post_count = topbar.data('post-count');
				var excerpt = topbar.data('post-excerpt');
				btns.on('click',function(){
					var element = jQuery(this);
					if(catlayout !== 'view_more'){
						id2 = element.data('ajax-catid');
						id 	= id2;
						btns.removeClass('active');
						drDown.removeClass('active');
						element.addClass('active');
						if(element.parent().parent().parent().parent().hasClass('mz_more_list')){
							drDown.addClass('active');
						}
						var parent = topbar.parent();
						Magazinify.doAjaxCall(layout, id2, 1, parent, post_count, excerpt);
						pag.attr('data-id',id2);
						pageNumber = 1;
						return false;
					}
				});
				var el2 = el.find('.magazinify_ajax_pagination');
				var layout2 = el2.data('layout');
				var wrapper = el2.parent();
				var pageNumber = 1;
				el2.find('a.next').on('click', function(){
					if(jQuery(this).hasClass('inactive')) {return false;}
					wrapper.find('.mz_loading_spinner').removeClass('ready');
					pageNumber++;
					Magazinify.doAjaxCall(layout2, id, pageNumber, wrapper, post_count, excerpt);
					return false;
				});
				el2.find('a.prev').on('click', function(){
					if(jQuery(this).hasClass('inactive')) {return false;}
					wrapper.find('.mz_loading_spinner').removeClass('ready');
					pageNumber--;
					Magazinify.doAjaxCall(layout2, id, pageNumber, wrapper, post_count, excerpt);
					return false;
				});
			});
			
			
		},

		// AJAX CALL
		doAjaxCall: function(layout, currentCategory, page, wrapper, post_count, excerpt){


			var requestData = {
				action: 'magazinify_fn_ajax_service_list',
				magazinify_fn_layout: layout,
				magazinify_fn_post_excerpt: excerpt,
				magazinify_fn_post_count: post_count,
				magazinify_fn_cat: currentCategory,
				magazinify_fn_page: page
			};
			jQuery.ajax({
				type: 'POST',
				url: mz_ajax_object.mz_ajax_url,
				cache: true,
				data: requestData,
				success: function(data, textStatus, XMLHttpRequest) {
					Magazinify.frenifyAjaxProcess(data,wrapper);
				},
				error: function(MLHttpRequest, textStatus, errorThrown) {
					console.log('Error');
				}
			});	
		},
		frenifyAjaxProcess: function(data, wrapper){
			console.log(data);
			var fnQueriedObj = jQuery.parseJSON(data); //get the data object
			wrapper.find('.mz_ajax_place').html(fnQueriedObj.magazinify_fn_data);
			wrapper.find('.mz_loading_spinner').addClass('ready');
			//hide or show prev
			if ( true === fnQueriedObj.magazinify_fn_hide_prev ) {
				wrapper.find('.magazinify_ajax_pagination a.prev').addClass('inactive');
			} else {
				wrapper.find('.magazinify_ajax_pagination a.prev').removeClass('inactive');
			}
			
			//hide or show next
			if ( true === fnQueriedObj.magazinify_fn_hide_next ) {
				wrapper.find('.magazinify_ajax_pagination a.next').addClass('inactive');
			} else {
				wrapper.find('.magazinify_ajax_pagination a.next').removeClass('inactive');
			}
			
			Magazinify.animate();
			Magazinify.allDataBgImg();
			Magazinify.imgToSvg();
			Magazinify.dotdotdotforLists();
		},
		tickerFunction: function(){
			mzKey2++;
			if(!(window.elementor)){
				if(mzKey2 === 2){
					Magazinify.tickerOwlFunction();
					$(".TickerNews .marquee").each(function(){
						jQuery(this).marquee({
							duplicated: true,
							duration: 14000,
							delayBeforeStart: 0,
							direction: 'left',
						});
					});
				}
			}else{
				Magazinify.tickerOwlFunction();
			}
			Magazinify.mainWidthCalc();
			Magazinify.addClassToBodyForMagazinify();
		},
		tickerOwlFunction: function(){
			var owl = jQuery('.mz_ticker_widget');
			owl.each(function(){
				var el 			= jQuery(this);
				var time 		= el.data('autoplay-time');
				var carousel	= el.find('.mz_text_fade .owl-carousel');
				var play		= el.find('.mz_text_fade .owl__play');
				var aOut		= 'fadeOutUp'; //fadeOutUp
				var aIn			= 'slideInUp'; //slideInUp
				carousel.owlCarousel({
					loop:true,
					margin:30,
					autoplay: true,
					autoplayTimeout: time,
					nav:true,
					smartSpeed:1000,
					items: 1,
					dots: false,
					animateOut: aOut,
    				animateIn: aIn,
					mouseDrag: false,
					navText: ['<span></span>', '<span></span>']
				});
				play.on('click',function(){
					if(play.hasClass('play')){
						play.removeClass('play');
						carousel.trigger('play.owl.autoplay',[1000]);
					}else{
						play.addClass('play');
						carousel.trigger('stop.owl.autoplay');
					}
					
				});
				carousel.find('.owl-prev').on('click',function(){
					play.removeClass('play');
					carousel.trigger('play.owl.autoplay',[1000]);
				});
				carousel.find('.owl-next').on('click',function(){
					play.removeClass('play');
					carousel.trigger('play.owl.autoplay',[1000]);
				});
			});
			
		},
		addClassToBodyForMagazinify: function(){
			if(jQuery('.magazinify_wrapper').length > 0){
				jQuery('body').addClass('magazinify_plugin_is_activated');
			}
		}
		
		
		
	};
	
	$( window ).on( 'elementor/frontend/init', Magazinify.init );
	$( window ).on('resize',function(){
		Magazinify.maglist();
		Magazinify.mainWidthCalc();
	});
	
})(jQuery, window.elementorFrontend);