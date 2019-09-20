/*
	* @package LawFirm
	* @subpackage LawFirm HTML
	* 
	* Template Scripts
	* Created by Themewing
		
	1.  Fixed Header
	2.  Parallax
	3.  Parallax for Chrome
	4.	Main slideshow
	5.	Counter
	6.	Owl Carousel
	7.	Animation
	8.	Back to top
	
*/


	jQuery(function($) {
	"use strict";


	 /* ----------------------------------------------------------- */
	 /*  Fixed header
	 /* ----------------------------------------------------------- */

		$(window).on('scroll', function(){
			if ( $(window).scrollTop() > 100 ) {
				$('.header').addClass('navbar-fixed');
			} else {
				$('.header').removeClass('navbar-fixed');
			}
		});


	/* ----------------------------------------------------------- */
	/*  Parallax
	/* ----------------------------------------------------------- */
		function isScrolledIntoView(elem) {
				var docViewTop = $(window).scrollTop();
				var docViewBottom = docViewTop + $(window).height();
				var elemTop = $(elem).offset().top;
				return ((elemTop <= docViewBottom) && (elemTop >= docViewTop));
		}

		$.fn.parallax = function (options) {

				var windowHeight = $(window).height();

				// Establish default settings
				var settings = $.extend({
						speed  : 0.15,
						type   : 'background',  // background, transform,
				}, options);

				// Iterate over each object in collection
				return this.each(function () {

						// Save a reference to the element
						var $this = $(this);

						// Set up Scroll Handler
						$(window).on('scroll',function (e) {

								//e.stopImmediatePropagation();

								var scrollTop = $(window).scrollTop();
								var offset = $this.offset().top;
								var height = $this.outerHeight();

								// Check if above or below viewport
								if (offset + height <= scrollTop || offset >= scrollTop + windowHeight) {
										return;
								}

								var yBgPosition = Math.round((offset - scrollTop) * settings.speed);

								//console.log( yBgPosition );

								var transform = Math.round((scrollTop) * settings.speed);


								// Apply the Y Background Position to Set the Parallax Effect
								if (settings.type == 'background') {
										$this.css('background-position', 'center ' + -yBgPosition + 'px');
								}

								else if ((settings.type == 'transform')) {
										$this.css('-webkit-transform', 'translateY(' + transform + 'px)')
												.css('-moz-transform', 'translateY(' + transform + 'px)')
												.css('transform', 'translateY(' + transform + 'px)');
								}
						});
				});
		}


		/* ----------------------------------------------------------- */
		/*  Parallax for Chrome
		/* -----------------------------------------------------------*/

		var isChrome = navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
		if (isChrome)
		{

			var itemArr = $('.parallax');

			$(window).scroll(function()
			{
					var pos = $(window).scrollTop();
					var wh = window.innerHeight;

					$(itemArr).each(function(i, item){

							var p = $(item).position();
							var h = $(item).height();
							if (p.top + h > pos && p.top < pos+wh)
							{
									// items ir redzams
									var prc = (p.top - pos +h)/wh ;
									//console.log(prc);
									$(item).css({'background-position':'center '+prc+'%'});
							}

					});
			});

		}


	/* ----------------------------------------------------------- */
	/*  Main slideshow
	/* ----------------------------------------------------------- */

		 $('#main-slide').carousel({
				pause: true,
				interval: 100000
		 });


	 /* ----------------------------------------------------------- */
	 /*  Counter
	 /* ----------------------------------------------------------- */

		$('.counter').counterUp({
		 delay: 10,
		 time: 1000
		});

	 /* ----------------------------------------------------------- */
	 /*  Prettyphoto
	 /* ----------------------------------------------------------- */

		$("a[data-rel^='prettyPhoto']").prettyPhoto();


	/* ----------------------------------------------------------- */
	/*  Owl Carousel
	/* ----------------------------------------------------------- */

		
		$("#testimonial-carousel").owlCarousel({
 
			navigation : false, // Show next and prev buttons
			slideSpeed : 600,
			pagination:true,
			singleItem:true
 
		});


		//Attorneys
		$(".attorneys").owlCarousel({

			navigation : true, // Show next and prev buttons
			navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			slideSpeed : 800,
			pagination:false,
			items : 4,
			rewindNav: true,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3],
			stopOnHover:true

		});

		
	 	//Clients

		$("#client-carousel").owlCarousel({

			navigation : false, // Show next and prev buttons
			slideSpeed : 400,
			pagination: true,
			items : 5,
			rewindNav: true,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3],
			stopOnHover:true,
			autoPlay:false

		});

		//Attorneys
		$(".attorneys").owlCarousel({

			navigation : true, // Show next and prev buttons
			navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			slideSpeed : 800,
			pagination:false,
			items : 4,
			rewindNav: true,
			itemsDesktop : [1199,3],
			itemsDesktopSmall : [979,3],
			stopOnHover:true

		});

		//Slide
		 $("#slide-carousel").owlCarousel({

			 navigation : true, // Show next and prev buttons
			 navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"],
			 slideSpeed : 800,
			 pagination:false,
			 items : 3,
			 rewindNav: true,
			 itemsDesktop : [1199,3],
			 itemsDesktopSmall : [979,2],
			 stopOnHover:true

		 });


		 
	 /* ----------------------------------------------------------- */
	 /*  Animation
	 /* ----------------------------------------------------------- */

		//Wow
		new WOW().init();



	 /* ----------------------------------------------------------- */
	 /*  Back to top
	 /* ----------------------------------------------------------- */

			 $(window).scroll(function () {
						if ($(this).scrollTop() > 50) {
								$('#back-to-top').fadeIn();
						} else {
								$('#back-to-top').fadeOut();
						}
				});

			// scroll body to 0px on 
			$('#back-to-top').click(function () {
					$('#back-to-top').tooltip('hide');
					$('body,html').animate({
							scrollTop: 0
					}, 800);
					return false;
			});
			
			$('#back-to-top').tooltip('hide');

});