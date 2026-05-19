/**
 * Template Name: FlexStart
 * Updated: Aug 30 2023 with Bootstrap v5.3.1
 * Template URL: https://bootstrapmade.com/flexstart-bootstrap-startup-template/
 * Author: BootstrapMade.com
 * License: https://bootstrapmade.com/license/
 */
(function () {
	"use strict";

	/**
	 * Easy selector helper function
	 */
	const select = (el, all = false) => {
		el = el.trim()
		if (all) {
			return [...document.querySelectorAll(el)]
		} else {
			return document.querySelector(el)
		}
	}

	/**
	 * Easy event listener function
	 */
	const on = (type, el, listener, all = false) => {
		if (jQuery(el).length > 0) {
			if (all) {
				select(el, all).forEach(e => e.addEventListener(type, listener))
			} else {
				select(el, all).addEventListener(type, listener)
			}
		}
	}

	/**
	 * Easy on scroll event listener
	 */
	const onscroll = (el, listener) => {
		el.addEventListener('scroll', listener)
	}

	/**
	 * Navbar links active state on scroll
	 */
	let navbarlinks = select('#navbar .scrollto', true);
	if (jQuery('#navbar').length > 0) {
		const navbarlinksActive = () => {
			let position = window.scrollY + 200
			navbarlinks.forEach(navbarlink => {
				if (!navbarlink.hash) return
				let section = select(navbarlink.hash)
				if (!section) return
				if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
					navbarlink.classList.add('active')
				} else {
					navbarlink.classList.remove('active')
				}
			});
			select('#navbar').classList.remove('bi-list');
			select('#navbar').classList.remove('bi-x');

		}
		window.addEventListener('load', navbarlinksActive)
		onscroll(document, navbarlinksActive)



	}
	/**
	 * Scrolls to an element with header offset
	 */
	const scrollto = (el) => {

		let offset = 200;

		let elementPos = select(el).offsetTop;
		window.scrollTo({
			top: elementPos - offset,
			behavior: 'smooth'
		})
	}
	/**
	 * Toggle .header-scrolled class to #header when page is scrolled
	 */
// 	let selectHeader = select('#header')
// 	if (selectHeader) {
// 		const headerScrolled = () => {
// 			if (window.scrollY > 100) {
// 				selectHeader.classList.add('header-scrolled')
// 			} else {
// 				selectHeader.classList.remove('header-scrolled')
// 			}
// 		}
// 		window.addEventListener('load', headerScrolled)
// 		onscroll(document, headerScrolled)
// 	}

	/**
	 * Back to top button
	 */
	let backtotop = select('.back-to-top')
	if (backtotop) {
		const toggleBacktotop = () => {
			if (window.scrollY > 100) {
				backtotop.classList.add('active')
			} else {
				backtotop.classList.remove('active')
			}
		}
		window.addEventListener('load', toggleBacktotop)
		onscroll(document, toggleBacktotop)
	}

	/**
	 * Mobile nav toggle
	 */
	on('click', '.mobile-nav-toggle', function (e) {
		select('#navbar').classList.toggle('navbar-mobile')
		this.classList.toggle('bi-list')
		this.classList.toggle('bi-x')
	})

	/**
	 * Mobile nav dropdowns activate
	 */
	on('click', '.navbar .dropdown > a', function (e) {
		if (select('#navbar').classList.contains('navbar-mobile')) {
			e.preventDefault()
			this.nextElementSibling.classList.toggle('dropdown-active')
		}
	}, true)

	/**
	 * Scrool with ofset on links with a class name .scrollto
	 */
	on('click', '.scrollto', function (e) {

		if (select(this.hash)) {
			e.preventDefault()

			let navbar = select('#navbar')
			if (navbar.classList.contains('navbar-mobile')) {
				navbar.classList.remove('navbar-mobile')
				let navbarToggle = select('.mobile-nav-toggle')
				navbarToggle.classList.toggle('bi-list')
				navbarToggle.classList.toggle('bi-x')
			}

			scrollto(this.hash);
		} else {
			navbarToggle.classList.toggle('bi-list')
			navbarToggle.classList.toggle('bi-x')
			navbar.classList.remove('navbar-mobile');
		}

	}, true);

	/**
	 * Scroll with ofset on page load with hash links in the url
	 */
	window.addEventListener('load', () => {
		if (window.location.hash) {
			if (window.location.href.indexOf('#') !== -1) {
				scrollto(window.location.hash)
			}
		}
	});

	/**
	 * Clients Slider
	 */
	new Swiper('.clients-slider', {
		speed: 400,
		loop: true,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		slidesPerView: 'auto',
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		},
		breakpoints: {
			320: {
				slidesPerView: 2,
				spaceBetween: 40
			},
			480: {
				slidesPerView: 3,
				spaceBetween: 60
			},
			640: {
				slidesPerView: 4,
				spaceBetween: 80
			},
			992: {
				slidesPerView: 6,
				spaceBetween: 120
			}
		}
	});

	/**
	 * Porfolio isotope and filter
	 */
	window.addEventListener('load', () => {
		let portfolioContainer = select('.portfolio-container');
		if (portfolioContainer) {
			let portfolioIsotope = new Isotope(portfolioContainer, {
				itemSelector: '.portfolio-item',
				layoutMode: 'fitRows'
			});

			let portfolioFilters = select('#portfolio-flters li', true);

			on('click', '#portfolio-flters li', function (e) {
				e.preventDefault();
				portfolioFilters.forEach(function (el) {
					el.classList.remove('filter-active');
				});
				this.classList.add('filter-active');

				portfolioIsotope.arrange({
					filter: this.getAttribute('data-filter')
				});
				aos_init();
			}, true);
		}

	});

	/**
	 * Initiate portfolio lightbox
	 */
	if (jQuery('.portfokio-lightbox').length > 0) {
		const portfolioLightbox = GLightbox({
			selector: '.portfokio-lightbox'
		});
	}
	/**
	 * Portfolio details slider
	 */
	new Swiper('.portfolio-details-slider', {
		speed: 400,
		autoplay: {
			delay: 5000,
			disableOnInteraction: false
		},
		pagination: {
			el: '.swiper-pagination',
			type: 'bullets',
			clickable: true
		}
	});


	/**
	 * Animation on scroll
	 */
	function aos_init() {
		AOS.init({
			duration: 1000,
			easing: "ease-in-out",
			once: true,
			mirror: false
		});
	}
	window.addEventListener('load', () => {
		aos_init();
	});

	/**
	 * Initiate Pure Counter
	 */
	new PureCounter();

	// JavaScript to handle smooth scrolling with an offset


	document.addEventListener("DOMContentLoaded", function () {
		document.querySelectorAll('a[href^="#"]').forEach(anchor => {
			anchor.addEventListener('click', function (e) {
				if (!this.classList.contains('no-scroll')) {
					e.preventDefault();
					const targetId = this.getAttribute('href').substring(1); // Get the target element ID
					const target = document.getElementById(targetId);
					if (target) {

						const offset = 130;
						const targetOffsetTop = target.getBoundingClientRect().top + window.scrollY - offset;

						window.scrollTo({
							top: targetOffsetTop,
							behavior: 'smooth'
						});
					}
				}
			});
		});
	});

	if (jQuery('#owl-carousel-gallery').length > 0) {
		jQuery('#owl-carousel-gallery').owlCarousel({
			loop: true,
			margin: 10,
			nav: true,
			responsive: {
				0: {
					items: 1
				},
				600: {
					items: 2
				}
			}
		});
	}


})();








/* Dev Team JS Start */

jQuery(document).ready(function ($) {





	if (jQuery('#videoPopup').length > 0) {
		const videoPopup = document.getElementById('videoPopup');
		const videoPlayer = document.getElementById('videoPlayer');
		const playButtons = document.querySelectorAll('.play-video');

		// Function to open the popup and play the video
		function openVideoPopup(videoSrc) {
			videoPlayer.setAttribute("src", videoSrc);
			// videoPlayer.src = videoSrc;
			videoPopup.style.display = 'block';
		}

		// Function to close the popup
		function closeVideoPopup() {
			// videoPlayer.src = '';
			videoPlayer.setAttribute("src", "");
			videoPopup.style.display = 'none';
		}

		// Add click event listeners to all play buttons
		playButtons.forEach(button => {
			button.addEventListener('click', function (e) {
				e.preventDefault();
				const videoSrc = this.getAttribute('data-video-src');
				openVideoPopup(videoSrc);
			});
		});

		// Close the popup when the video ends
		videoPlayer.addEventListener('ended', closeVideoPopup);

		// Close the popup when clicking on the overlay
		videoPopup.addEventListener('click', closeVideoPopup);
	}

	jQuery("body").on("click", ".esc-tabs.active a.esc-next", function () {
		var $div = jQuery(this).closest('.esc-tabs.active');
		var $form = jQuery(this).closest('form');
		var valid = true;
		$form.find('.wpcf7-response-output').html('');
		var tabs = jQuery(this).attr('rel');
		$div.find('.wpcf7-form-control').each(function () {
			if (jQuery(this).hasClass('wpcf7-validates-as-required')) {
				if (jQuery(this).val() == "") {
					jQuery(this).closest('.select').addClass('invalid');
					valid = false;
				} else {
					jQuery(this).closest('.select').removeClass('invalid');
				}
			}

		});

		if (valid) {
			$form.removeClass('invalid').addClass('init');
			jQuery(".esc-tabs").removeClass('active');
			jQuery("#form-step-" + tabs).addClass('active');
		} else {
			$form.addClass('invalid');
			/* //$form.find('.wpcf7-response-output').html('One or more fields have an error. Please check and try again.'); */
		}
	});


	// custom form submission

	jQuery("body").on("click", ".esc-tabs.active a.custom-next", function () {
		var $div = jQuery(this).closest('.esc-tabs.active');
		var $form = jQuery(this).closest('form');
		var valid = true;
		$form.find('.wpcf7-response-output').html('');
		var tabs = jQuery(this).attr('rel');
		$div.find('.wpcf7-form-control').each(function () {
			if (jQuery(this).hasClass('wpcf7-validates-as-required')) {
				if (jQuery(this).val() == "") {
					jQuery(this).closest('.wpcf7-form-control-wrap').addClass('invalid');
					valid = false;
				} else {
					jQuery(this).closest('.wpcf7-form-control-wrap').removeClass('invalid');
				}
			}

		});

		if (valid) {
			$form.removeClass('invalid').addClass('init');
			jQuery(".esc-tabs").removeClass('active');
			jQuery("#form-step-" + tabs).addClass('active');
		} else {
			$form.addClass('invalid');
			/* //$form.find('.wpcf7-response-output').html('One or more fields have an error. Please check and try again.'); */
		}
	});


	jQuery("body").on("click", ".esc-tabs.active a.custom-back", function () {
		var tabs = jQuery(this).attr('rel');
		jQuery(".esc-tabs").removeClass('active');
		jQuery("#form-step-1").addClass('active');
	});


	jQuery("body").on("click", ".esc-tabs-plan.active a.custom-planer-next", function () {
		var $div = jQuery(this).closest('.esc-tabs-plan.active');
		var $form = jQuery(this).closest('form');
		var valid = true;
		$form.find('.wpcf7-response-output').html('');
		var tabs = jQuery(this).attr('rel');
		$div.find('.wpcf7-form-control').each(function () {
			if (jQuery(this).hasClass('wpcf7-validates-as-required')) {
				if (jQuery(this).val() == "") {
					jQuery(this).closest('.wpcf7-form-control-wrap').addClass('invalid');
					valid = false;
				} else {
					jQuery(this).closest('.wpcf7-form-control-wrap').removeClass('invalid');
				}
			}

		});

		if (valid) {
			$form.removeClass('invalid').addClass('init');
			jQuery(".esc-tabs-plan").removeClass('active');
			jQuery("#form-step-12").addClass('active');
		} else {
			$form.addClass('invalid');
			/* //$form.find('.wpcf7-response-output').html('One or more fields have an error. Please check and try again.'); */
		}
	});

	jQuery("body").on("click", ".esc-tabs-plan.active a.custom-planner-back", function () {
		var tabs = jQuery(this).attr('rel');
		jQuery(".esc-tabs-plan").removeClass('active');
		jQuery("#form-step-11").addClass('active');
	});



	jQuery("body").on("click", ".esc-tabs.active a.esc-back", function () {
		var tabs = jQuery(this).attr('rel');
		jQuery(".esc-tabs").removeClass('active');
		jQuery("#form-step-" + tabs).addClass('active');
	});

	/* jQuery("body").on("change", ".esc-tabs.active select", function() {
		if (jQuery(this).val() == "") {
			jQuery(this).closest('.select').addClass('invalid');
		}else{
			jQuery(this).closest('.select').removeClass('invalid');
		}
	}); */


	jQuery("body").on("click", '.sub-h-cmenu ul li a[href^="#"]', function (e) {
		e.preventDefault();
		var target = $(this.hash);
		if (target.length) {
			$('html, body').animate({
				scrollTop: target.offset().top - 180
			}, 'slow');
		}
	});


	var os = getOperatingSystem();
	var browser = getBrowser();

	// Add classes to the body tag
	$('body').addClass(os).addClass(browser);

	function getOperatingSystem() {
		var userAgent = window.navigator.userAgent;
		if (userAgent.indexOf("Win") !== -1) {

			return 'windows';
		} else if (userAgent.indexOf("Mac") !== -1) {
			return 'mac';
		} else if (userAgent.indexOf("Linux") !== -1) {
			return 'linux';
		} else {
			return 'other';
		}
	}

	function getBrowser() {

		if (window.location.href.indexOf('#') !== -1) {
			var target = '#' + window.location.href.split('#')[1];
			if ($(target).length > 0) {
				/* console.log( $(target).offset().top);
				$('html, body').animate({
					scrollTop: $(target).offset().top - 140
				}, 'slow');  */
				history.pushState({}, '', window.location.href.split('#')[0]);
			}
		}



		var userAgent = window.navigator.userAgent;
		if (userAgent.indexOf("Firefox") !== -1) {
			return 'firefox';
		} else if (userAgent.indexOf("Chrome") !== -1) {
			return 'chrome';
		} else if (userAgent.indexOf("Safari") !== -1) {
			return 'safari';
		} else if (userAgent.indexOf("Edge") !== -1) {
			return 'edge';
		} else if (userAgent.indexOf("MSIE") !== -1 || userAgent.indexOf("Trident") !== -1) {
			return 'ie';
		} else {
			return 'other';
		}


		$('.header-wrapper ul li a').each(function () {
			var menuLink = $(this).attr('href');
			if (menuLink) {
				if (menuLink.indexOf('#') !== -1) {
					var hasHref = '#' + menuLink.split('#')[1];
					if ($(hasHref).length && window.location.href == menuLink.split('#')[0]) {
						$(this).attr('href', hasHref);
					}
				}
			}
		});

	}


	if (jQuery('.tb-event-proposal').length > 0) {
		// Iterate over each select element
		$('.tb-event-proposal select').each(function () {
			// Cache the number of options
			var $this = $(this),
				numberOfOptions = $(this).children('option').length;
			// Hides the select element
			$this.addClass('s-hidden');
			// Wrap the select element in a div
			$this.wrap('<div class="select"></div>');
			// Insert a styled div to sit over the top of the hidden select element
			$this.after('<div class="styledSelect"></div>');
			// Cache the styled div
			var $styledSelect = $this.next('div.styledSelect');
			// Show the first select option in the styled div
			$styledSelect.text($this.children('option').eq(0).text());
			// Insert an unordered list after the styled div and also cache the list
			var $list = $('<ul />', {
				'class': 'options'
			}).insertAfter($styledSelect);

			// Insert a list item into the unordered list for each select option
			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val()
				}).appendTo($list);
			}
			// Cache the list items
			var $listItems = $list.children('li');
			// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
			$styledSelect.click(function (e) {
				e.stopPropagation();
				$('div.styledSelect.active').each(function () {
					$(this).removeClass('active').next('ul.options').hide();
				});
				$(this).toggleClass('active').next('ul.options').toggle();
			});
			// Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
			// Updates the select element to have the value of the equivalent option
			$listItems.click(function (e) {
				e.stopPropagation();
				$styledSelect.text($(this).text()).removeClass('active');
				$this.val($(this).attr('rel'));
				$list.hide();
				jQuery(this).closest('.select').removeClass('invalid');
				/* alert($this.val()); Uncomment this for demonstration! */
			});
			// Hides the unordered list when clicking outside of it
			$(document).click(function () {
				$styledSelect.removeClass('active');
				$list.hide();
			});
		});
	}
	$('.tb-products a').on('click', function (event) {
		var hrefValue = $(this).attr('href');

		if (hrefValue === '' || hrefValue === '#') {
			event.preventDefault(); // Prevent the default behavior (e.g., navigating to the empty href)
			$('#city-message').addClass('show');
		}
	});

	/*  jQuery("body").on("click", ".tb_product_id", function() {
		 if(jQuery(this).find('ul').hasClass('open')){
			 jQuery(this).find('ul').removeClass('open');
			 jQuery('body').removeClass('city-list-open');
		 }else{
			 jQuery(this).find('ul').addClass('open');
			 jQuery('body').addClass('city-list-open');
		 } 
	});  */


	if (jQuery('select.tb_product_id').length > 0) {
		$('select.tb_product_id').each(function () {
			var $this = $(this),
				numberOfOptions = $(this).children('option').length;
			$this.addClass('s-hidden').hide();
			$this.wrap('<ul></ul>');
			// Insert a styled div to sit over the top of the hidden select element
			$this.after('<li class="tb_product_id active"><span></span></li>');
			// Cache the styled div
			var $styledSelect = $this.next('li.tb_product_id');
			// Show the first select option in the styled div
			$styledSelect.find('span').text($this.children('option').eq(0).text());
			// Insert an unordered list after the styled div and also cache the list
			var $list = $('<ul />', {
				'class': 'options'
			}).appendTo($styledSelect);

			for (var i = 0; i < numberOfOptions; i++) {
				$('<li />', {
					text: $this.children('option').eq(i).text(),
					rel: $this.children('option').eq(i).val()
				}).appendTo($list);
			}

			var $listItems = $list.children('li');
			// Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
			$styledSelect.click(function (e) {
				e.stopPropagation();
				$(this).find('ul.options').toggle();
			});

			$listItems.click(function (e) {
				e.stopPropagation();
				$styledSelect.find('span').text($(this).text());
				$this.val($(this).attr('rel'));
				$styledSelect.closest('.tb-products').find('a').attr('href', $(this).attr('rel'));
				$list.hide();
			});
			// Hides the unordered list when clicking outside of it
			$(document).click(function () {
				$list.hide();
			});
		});
	}

	/* jQuery("body").on("click", ".tb_product_id ul li", function() {
		jQuery(this).closest('.tb_product_id').find('span').html(jQuery(this).text());
		jQuery(this).closest('.tb_product_id').find('ul').removeClass('open');
		jQuery(this).closest('.tb-products').find('a').attr('href',jQuery(this).data('url'));
		jQuery('body').removeClass('city-list-open');
	}); 
	 */




	if (jQuery('.wc-gallery-main').length > 0) {



		$('.wc-gallery-main').slick({
			slidesToShow: 1,
			slidesToScroll: 1,
			arrows: false,
			fade: true,
			dots: true,
			focusOnSelect: true,
			asNavFor: '.wc-gallery-thumbs',
			responsive: [{
				breakpoint: 991,
				settings: {
					fade: false,
				}
			}]
		});
		$('.wc-gallery-thumbs').slick({
			slidesToShow: 4,
			slidesToScroll: 1,
			vertical: true,
			asNavFor: '.wc-gallery-main',
			dots: false,
			arrows: false,
			focusOnSelect: true,
			verticalSwiping: true,
			responsive: [{
				breakpoint: 991,
				settings: {
					vertical: true,
				}
			},
			{
				breakpoint: 768,
				settings: "unslick"
			}
			]
		});

		/* var galleryThumbs = new Swiper(".wc-gallery-thumbs", {
			centeredSlides: false,
			loop:false,
			centeredSlidesBounds: false,
			slidesPerView: 4,
			spaceBetween: 15,
			watchSlidesVisibility: true,
			slidesPerViewFit : true,
			direction: 'vertical'
		});

		var galleryMain = new Swiper(".wc-gallery-main", {
			watchOverflow: true,
			loop:true,
			watchSlidesVisibility: true,
			watchSlidesProgress: true,
			preventInteractionOnTransition: true,
			effect: 'fade',
			pagination: {
				el: ".swiper-pagination",
				clickable: true,
			},
			thumbs: {
			swiper: galleryThumbs
			}
		});

		galleryMain.on('slideChangeTransitionStart', function() {
			galleryThumbs.slideTo(galleryMain.activeIndex);
		});

			galleryThumbs.on('transitionStart', function(){
			galleryMain.slideTo(galleryThumbs.activeIndex);
		}); */

	}

	if (jQuery('.related-wrapper-slide').length > 0) {
		var galleryRelated = new Swiper(".related-wrapper-slide", {
			loop: true,
			spaceBetween: 30,
			speed: 500,
			slidesPerView: 3,
			navigation: false,
			breakpoints: {
				0: {
					slidesPerView: 1.5,
					spaceBetween: 20,
					centeredSlides: false,
				},
				768: {
					slidesPerView: 2,
					spaceBetween: 20,
					centeredSlides: false,
				},
				1024: {
					slidesPerView: 3,
					spaceBetween: 30
				}
			}
		});
	}




	// Show popup on button click
	$(".single-product #reviews .write-review a").click(function () {
		$(".single-product #comments .reviews-popup-wrapper").fadeIn();
	});

	// Close popup on button click
	$(".single-product #comments .reviews-popup-wrapper .close-reviews").click(function () {
		$(".single-product #comments .reviews-popup-wrapper").fadeOut();
	});


	$(".esreadmore").on("click", function () {
		var contentGrid = $(this).closest("section");
		var content = contentGrid.find(".read-more-section");
		if (content.is(":hidden")) {
			content.slideDown();
			$(this).text("Read Less");
			content.addClass('show');
		} else {
			content.slideUp();
			$(this).text("Read More");
			content.removeClass('show');
		}
		return false;
	});

	jQuery("body").on("click", ".wc-place-order-btn", function () {
		jQuery('form.woocommerce-checkout').submit();
	});


	jQuery("#billing_email").prop("readonly", true);
	jQuery("#additional_contact").on("input", function () {
		jQuery("#billing_email").val(jQuery(this).val());
	});


	function synchBillingShipping() {
		if (jQuery("#wc_billing_same_address").is(':checked')) {

			$('.woocommerce-checkout .woocommerce-billing-fields').hide();

			if (jQuery("#shipping_first_name").val() != "") {
				jQuery("#billing_first_name").val(jQuery("#shipping_first_name").val());
			}
			if (jQuery("#shipping_last_name").val() != "") {
				jQuery("#billing_last_name").val(jQuery("#shipping_last_name").val());
			}
			if (jQuery("#shipping_address_1").val() != "") {
				jQuery("#billing_address_1").val(jQuery("#shipping_address_1").val());
			}
			if (jQuery("#shipping_address_2").val() != "") {
				jQuery("#billing_address_2").val(jQuery("#shipping_address_2").val());
			}
			if (jQuery("#shipping_city").val() != "") {
				jQuery("#billing_city").val(jQuery("#shipping_city").val());
			}
			if (jQuery("#shipping_postcode").val() != "") {
				jQuery("#billing_postcode").val(jQuery("#shipping_postcode").val());
			}
			if (jQuery("#shipping_phone").val() != "") {
				jQuery("#billing_phone").val(jQuery("#shipping_phone").val());
			}
			if (jQuery("#additional_contact").val() != "") {
				jQuery("#billing_email").val(jQuery("#additional_contact").val());
				$("#billing_email").prop("readonly", true);
			}
			if (jQuery("#shipping_state").val() != "") {
				jQuery("#billing_state").val(jQuery("#shipping_state").val());
			}
			if (jQuery("#shipping_country").val() != "") {
				jQuery("#billing_country").val(jQuery("#shipping_country").val());
				$("#billing_country").trigger("change");
			}

		} else {
			$('.woocommerce-checkout .woocommerce-billing-fields').find('input[type="text"], input[type="tel"], input[type="number"]').val('');
			$('.woocommerce-checkout .woocommerce-billing-fields').find('#billing_state').val('').trigger("change");
			$('.woocommerce-checkout .woocommerce-billing-fields').show();
		}
	}

	jQuery("body").on("change", "#wc_billing_same_address", function () {
		synchBillingShipping();
	});
	jQuery("body").on("change", ".wcselect-escapely select", function () {
		synchBillingShipping();
	});
	jQuery("body").on("blur", ".wcinput-escapely input", function () {
		synchBillingShipping();
	});
	jQuery("body").on("blur", "#additional_contact", function () {
		synchBillingShipping();
	});

	if (jQuery("body").hasClass('woocommerce-shop')) {
		jQuery("body").on('xoo_wsc_quantity_updated', function (response) {
			if (jQuery("body").hasClass('woocommerce-shop')) {
				var data = {
					action: 'escapely_check_cart',
				};
				$.post(wc_add_to_cart_params.ajax_url, data, function (response) {
					var jsonData = JSON.parse(response);

					if (jsonData.status == '200') {
						var product_ids = jsonData.product_ids;
						jQuery('ul.products.shop-columns a.add_to_cart_button.added').each(function (index) {
							var product_id = $(this).data('product_id');
							if (!product_ids.includes(product_id)) {
								$(this).removeClass('added');
							}
						});
					} else {
						jQuery("ul.products.shop-columns a.add_to_cart_button").removeClass('added');
					}
				});
			}
		});
	}
	jQuery("body").on("click", "#apply_coupon", function (e) {
		e.preventDefault();
		if ($(window).width() > 768) {
			$('html, body').animate({ scrollTop: 0 }, 'slow');
		}
		var coupon_code = $("#coupon_code").val();
		$("body #woo-coupon-message").hide();
		$('#woo-coupon-message .coup-msg-content').html("");
		jQuery.ajax({
			type: 'POST',
			url: woocommerce_params.ajax_url,
			data: {
				'action': 'esc_wc_checkout_coupon',
				'coupon_code': coupon_code
			},
			success: function (data) {
				$(document.body).trigger('update_checkout', {
					update_shipping_method: false
				});
				var response = jQuery.parseJSON(data); // Parse JSON response
				if (response.valid == '1') {
					$("body #woo-coupon-message").addClass('coupon-success').removeClass('coupon-error').show();
					$('#woo-coupon-message .coup-msg-content').html('Coupon is added successfully.');
				} else if (response.valid == '2') {
					$("body #woo-coupon-message").addClass('coupon-error').removeClass('coupon-success').show();
					$('#woo-coupon-message .coup-msg-content').html('Promo code ' + coupon_code.toUpperCase() + ' already applied.');
				} else {
					$("body #woo-coupon-message").addClass('coupon-error').removeClass('coupon-success').show();
					$('#woo-coupon-message .coup-msg-content').html('Promo code ' + coupon_code.toUpperCase() + ' does not exist.');
				}
				$('.order-total').not(':first').remove();
			}
		});
	});

	$("body #woo-coupon-message #close-coup").click(function () {
		// Close the parent div

		$("body #woo-coupon-message").hide();
	});


	$('body').on('change', '.checkout-quantity', function () {
		var $this = $(this);
		var cartItemKey = $(this).data('cart-item-key');
		var quantity = $(this).val();

		$.ajax({
			type: 'POST',
			url: woocommerce_params.ajax_url,
			data: {
				action: 'esc_update_cart_item_quantity',
				cart_item_key: cartItemKey,
				quantity: quantity
			},
			success: function (response) {
				if (response.success) {
					$('.product-name.product_' + response.data.product_id).find('.prod-price').html(response.data.product_price);
					$('.cart-subtotal.show-mobile').find('.prod-subtotal').html(response.data.cart_subtotal);
					$(document.body).trigger('update_checkout');
				} else {
					alert('Failed to update the cart.');
				}
			}
		});
	});


	console.log('Checking if any li elements are empty...');
	$('.wc-braintree-checkout-banner li').each(function () {
		console.log('Checking li:', $(this).html());
		if ($(this).is(':empty') || $.trim($(this).html()) === '') {
			console.log('Found an empty li, hiding .another-way');
			$('.another-way').hide();
			return false; // Exit the loop early if any li is empty
		}
	});

});

const hamburger = document.querySelector(".esc-hamburger");
const navLinks = document.querySelector(".navbar-esc");
const links = document.querySelectorAll(".navbar-container-esc li");
hamburger.addEventListener('click', () => {
	navLinks.classList.toggle("open");
	links.forEach(link => {
		link.classList.toggle("fade");
	});

	hamburger.classList.toggle("toggle");
});

