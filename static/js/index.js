(function (doc, win) {
	var docEl = doc.documentElement,
		resizeEvt = "orientationchange" in window ? "orientationchange" : "resize",
		recalc = function () {
			function getScrollbarWidth() {
				var odiv = document.createElement('div'),
					styles = {
						width: '100px',
						height: '100px',
						overflowY: 'scroll'
					},
					i, scrollbarWidth;
				for (i in styles) odiv.style[i] = styles[i];
				document.body.appendChild(odiv);
				scrollbarWidth = odiv.offsetWidth - odiv.clientWidth;
				odivParent = odiv.parentNode;
				odivParent.removeChild(odiv);
				return scrollbarWidth;
			};
			var result = window.matchMedia('(min-width:1480px)');
			var resultWAP = window.matchMedia('(max-width:768px)');

			var scrollbarWidth = getScrollbarWidth();
			var clientWidth = docEl.clientWidth - scrollbarWidth;
			if (!clientWidth) return;

			if (result.matches) {
				docEl.style.fontSize = "100px";
			} else if (resultWAP.matches) {
				docEl.style.fontSize = 100 * (clientWidth / (750 - scrollbarWidth)) + "px";
			} else {
				docEl.style.fontSize = 100 * (clientWidth / (1480 - scrollbarWidth)) + "px";
			}
		};
	if (!doc.addEventListener) return;
	win.addEventListener(resizeEvt, recalc, false);
	doc.addEventListener('DOMContentLoaded', recalc, false);
})(document, window);


$(function () {
	var resultWAP = window.matchMedia('(max-width:768px)');
	/* header */
	$(".header .menu").click(function () {
		$(".nav").stop(true, false).slideToggle();
	});
	function headerFun() {
		$(".nav .item").each(function (i, el) {
			$(el).unbind();
			if (resultWAP.matches) {
				$(".nav").hide();
				$(el).click(function () {
					$(this).find(".sub-nav").stop(true, false).slideToggle();
				});
				$(".nav").click(function () {
					$(".nav").slideUp();
				});
				$(".nav .item").click(function () {
					event.stopPropagation();
				});
			} else {
				$(".nav").show().css("overflow", "inherit");
				$(".nav").find(".sub-nav").hide().removeAttr("style");
				$(el).hover(function () {
					$(this).find(".sub-nav").stop(true, false).slideToggle();
				});
			}
		});
	}
	headerFun();
	$(window).resize(function () {
		headerFun();
	});


	/* banner */
	if ($(".banner").length > 0) {
		$(".banner .swiper-slide").each(function (ind, el) {
			var img = $(el).find("img").eq(0);
			img.hide();
			$(el).css({
				backgroundImage: "url('" + img.attr("src") + "')"
			});
		});
		var hBanner = new Swiper('.swiper-container.banner', {
			autoplay: {
				delay: 3000,
				stopOnLastSlide: false,
				disableOnInteraction: false,
			},
			speed: 700,
			navigation: {
				nextEl: '.swiper-button-next.b-next',
				prevEl: '.swiper-button-prev.b-prev',
			},
			pagination: {
				el: '.swiper-pagination',
				clickable: true
			},
			loop: true
		});
	}
	/* in-banner */
	if ($(".in-banner").length > 0) {
		$(".in-banner .swiper-slide").each(function (ind, el) {
			var img = $(el).find("img").eq(0);
			img.hide();
			$(el).css({
				backgroundImage: "url('" + img.attr("src") + "')"
			});
		});
	}

	/* recommend */
	var recSwiper;

	function recFun() {
		if ($(".recommend").length > 0) {
			if (recSwiper) {
				recSwiper.destroy();
			}
			if (resultWAP.matches) {
				recSwiper = new Swiper('.rec-pic', {
					loop: true,
					loopedSlides: 8,
					effect: 'fade',
					navigation: {
						nextEl: '.swiper-button-next',
					},
					thumbs: {
						swiper: {
							el: '.rec-nav',
							slidesPerView: 4,
							watchSlidesVisibility: true,
							loopedSlides: 8,
							observer: true,
							observeParents: true,
						},
					},
				});
			} else {
				recSwiper = new Swiper('.rec-pic', {
					loop: true,
					loopedSlides: 8,
					effect: 'fade',
					navigation: {
						nextEl: '.swiper-button-next',
					},
					thumbs: {
						swiper: {
							el: '.rec-nav',
							slidesPerView: 6,
							direction: 'vertical',
							watchSlidesVisibility: true,
							loopedSlides: 8,
						},
					},
				});
			}

			$(".rec-pic .item").each(function (i, el) {
				var itemSwiper = new Swiper($(el).find(".swiper-container"), {
					pagination: {
						el: '.swiper-pagination',
						clickable: true
					},
					autoplay: true,
					loop: true,
					speed: 700,
					nested: true,
				});
			});
		}
	}
	recFun();

	/* case */
	var caseSwiper;

	function caseFun() {
		if ($(".case").length > 0) {
			if (caseSwiper) {
				caseSwiper.destroy();
			}
			if (resultWAP.matches) {
				caseSwiper = new Swiper('.case-focus .swiper-container', {
					pagination: {
						el: '.case-btn',
						clickable: true
					},
					loop: true,
					navigation: {
						nextEl: '.case-next',
						prevEl: '.case-prev',
					},
					slidesPerView: 1,
					observer: true,
					observeParents: true,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
				});
			} else {
				caseSwiper = new Swiper('.case-focus .swiper-container', {
					pagination: {
						el: '.case-btn',
						clickable: true
					},
					loop: true,
					navigation: {
						nextEl: '.case-next',
						prevEl: '.case-prev',
					},
					slidesPerView: 3,
					spaceBetween: '1.39%',
					observer: true,
					observeParents: true,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
				});
			}
		}
	}
	caseFun();

	/* news */
	var newsSwiper;

	function newsFun() {
		if ($(".news").length > 0) {
			if (newsSwiper) {
				newsSwiper.destroy();
			}
			if (resultWAP.matches) {
				newsSwiper = new Swiper('.h-news.swiper-container', {
					navigation: {
						nextEl: '.news-next',
						prevEl: '.news-prev',
					},
					slidesPerView: 1,
					spaceBetween: 0,
					observer: true,
					observeParents: true,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					loop: true,
				});
			} else {
				newsSwiper = new Swiper('.h-news.swiper-container', {
					navigation: {
						nextEl: '.news-next',
						prevEl: '.news-prev',
					},
					slidesPerView: 3,
					spaceBetween: '1.39%',
					observer: true,
					observeParents: true,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					loop: true,
				});
			}
		}
	}

	newsFun();

	/* link-focus */
	var linkSwiper;

	function linkFun() {
		if ($(".link-focus").length > 0) {
			if (resultWAP.matches) {
				if (linkSwiper) {
					linkSwiper.destroy();
				}
				linkSwiper = new Swiper('.link-focus .swiper-container', {
					navigation: {
						nextEl: '.link-next',
						prevEl: '.link-prev',
					},
					observer: true,
					observeParents: true,
					observeSlideChildren: true,
					slidesPerView: 2,
					slidesPerColumn: 2,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					speed: 700,
					loop: false
				});
			} else {
				if (linkSwiper) {
					linkSwiper.destroy();
				}
				linkSwiper = new Swiper('.link-focus .swiper-container', {
					slidesPerView: 4,
					navigation: {
						nextEl: '.link-next',
						prevEl: '.link-prev',
					},
					observer: true,
					observeParents: true,
					autoplay: {
						delay: 3000,
						stopOnLastSlide: false,
						disableOnInteraction: false,
					},
					observeSlideChildren: true,
					loop: true,
					speed: 700,
				});
			}
		}
	}
	linkFun();

	/* resize */
	$(window).resize(function () {
		newsFun();
		caseFun();
		linkFun();
		recFun();
	});
	/* in-nav-focus */
	if ($(".in-nav-focus").length > 0) {
		var mNavSwiper = new Swiper('.in-nav-focus', {
			slidesPerView: 'auto',
			observer: true,
			observeParents: true,
			observeSlideChildren: true
		});
		var itemW = 0,
			allW;
		var defW = $(".in-nav-focus .swiper-wrapper").width();
		$(".in-nav-focus").each(function (i, el) {
			$(el).find(".swiper-slide").each(function (ind, ele) {
				if ($(ele).outerWidth() > itemW) {
					itemW = $(ele).outerWidth();
				}
				allW = (itemW / 2) * ind
				if (allW > defW) {
					$(el).find(".swiper-wrapper").css({
						"justify-content": "left"
					});
				} else {
					$(el).find(".swiper-wrapper").css({
						"justify-content": "center"
					});
				}
			});
		});
	}

	/* jqthumb */
	if ($(".jqthumb").length > 0) {
		$(".jqthumb img").each(function (i, el) {
			$(el).jqthumb({
				width: "100%",
				height: "100%"
			});
		});
	};

	/* m-news */
	if ($(".m-news").length > 0) {
		var mNewsSwiper = new Swiper('.news-focus .swiper-container', {
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			observer: true,
			observeParents: true,
			observeSlideChildren: true
		});
	}
	/* m-pro-detail */
	if ($(".m-pro-detail").length > 0) {

		var timer = null,
			cloneItem;
		timer = setInterval(function () {
			if ($(".d-big.jqthumb .jqthumb").length > 0) {
				cloneItem = $(".d-big .swiper-wrapper").clone(true);
				$(".d-small").append(cloneItem);
				var proSwiper = new Swiper('.d-big', {
					thumbs: {
						swiper: {
							el: '.d-small',
							spaceBetween: '5.73%',
							slidesPerView: 3,
							watchSlidesVisibility: true,
							navigation: {
								nextEl: '.swiper-button-next',
								prevEl: '.swiper-button-prev',
							},
						},
					}
				});
				clearInterval(timer);
			} else {
				return false;
			}
		}, 100);
	}
});

$(window).scroll(function () {
	var clientS = $(window).scrollTop(),
		headerS = $(".header").height();
	if (clientS > headerS) {
		$(".header").addClass("fix");
	} else {
		$(".header").removeClass("fix");
	}
});