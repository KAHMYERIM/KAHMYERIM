/*
	Hyperspace by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function ($) {

	var $window = $(window),
		$body = $('body'),
		$sidebar = $('#sidebar');

	// Breakpoints.
	breakpoints({
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: [null, '480px']
	});

	// Hack: Enable IE flexbox workarounds.
	if (browser.name == 'ie')
		$body.addClass('is-ie');

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Forms.

	// Hack: Activate non-input submits.
	$('form').on('click', '.submit', function (event) {

		// Stop propagation, default.
		event.stopPropagation();
		event.preventDefault();

		// Submit form.
		$(this).parents('form').submit();

	});

	// Sidebar.
	if ($sidebar.length > 0) {

		var $sidebar_a = $sidebar.find('a');

		$sidebar_a
			.addClass('scrolly')
			.on('click', function () {

				var $this = $(this);

				// External link? Bail.
				if ($this.attr('href').charAt(0) != '#')
					return;

				// Deactivate all links.
				$sidebar_a.removeClass('active');

				// Activate link *and* lock it (so Scrollex doesn't try to activate other links as we're scrolling to this one's section).
				$this
					.addClass('active')
					.addClass('active-locked');

			})
			.each(function () {

				var $this = $(this),
					id = $this.attr('href'),
					$section = $(id);

				// No section for this link? Bail.
				if ($section.length < 1)
					return;

				// Scrollex.
				$section.scrollex({
					mode: 'middle',
					top: '-20vh',
					bottom: '-20vh',
					initialize: function () {

						// Deactivate section.
						$section.addClass('inactive');

					},
					enter: function () {

						// Activate section.
						$section.removeClass('inactive');

						// No locked links? Deactivate all links and activate this section's one.
						if ($sidebar_a.filter('.active-locked').length == 0) {

							$sidebar_a.removeClass('active');
							$this.addClass('active');

						}

						// Otherwise, if this section's link is the one that's locked, unlock it.
						else if ($this.hasClass('active-locked'))
							$this.removeClass('active-locked');

					}
				});

			});

	}

	// Scrolly.
	$('.scrolly').scrolly({
		speed: 1000,
		offset: function () {

			// If <=large, >small, and sidebar is present, use its height as the offset.
			if (breakpoints.active('<=large')
				&& !breakpoints.active('<=small')
				&& $sidebar.length > 0)
				return $sidebar.height();

			return 0;

		}
	});

	// Spotlights.
	$('.spotlights > section')
		.scrollex({
			mode: 'middle',
			top: '-10vh',
			bottom: '-10vh',
			initialize: function () {

				// Deactivate section.
				$(this).addClass('inactive');

			},
			enter: function () {

				// Activate section.
				$(this).removeClass('inactive');

			}
		})
		.each(function () {

			var $this = $(this),
				$image = $this.find('.image'),
				$img = $image.find('img'),
				x;

			// Assign image.
			$image.css('background-image', 'url(' + $img.attr('src') + ')');

			// Set background position.
			if (x = $img.data('position'))
				$image.css('background-position', x);

			// Hide <img>.
			$img.hide();

		});

	// Features.
	$('.features')
		.scrollex({
			mode: 'middle',
			top: '-20vh',
			bottom: '-20vh',
			initialize: function () {

				// Deactivate section.
				$(this).addClass('inactive');

			},
			enter: function () {

				// Activate section.
				$(this).removeClass('inactive');

			}
		});

	// popup
	$('.art1').click(function () {
		$('.pop1').fadeIn();
	});
	$('.art2').click(function () {
		$('.pop2').fadeIn();
	});
	$('.art3').click(function () {
		$('.pop3').fadeIn();
	});

	$('.popup p').click(function () {
		$('.popup').fadeOut();
	});

	var swiper = new Swiper('.popup_slide ', {
		speed: 1000,//버튼을 슬라이드가 넘어가는 시간
		navigation: {//화살표 버튼
			nextEl: '.popup .swiper-button-next',
			prevEl: '.popup .swiper-button-prev',
		},
		pagination: {//블릿 버튼
			el: '.popup .swiper-pagination',
			clickable: true,
		},
	});


	// Skill
	var executed1 = false;

    $('.features').waypoint(function () {
        var targetNumber = $('.animate').attr('data-rate');
        if (!executed1) {
            var percent_number_step = $.animateNumber.numberStepFactories.append('%')
            $('.animate').animateNumber({
                number: targetNumber,
                numberStep: percent_number_step
            }, 1500);
            executed1 = true;
        }
    },
        {
            offset: '80%'
        }
    );

})(jQuery);

// 마우스 따라다니는 도형 효과
const cursor = document.querySelector('#cursor');
const cursorCircle = cursor.querySelector('.cursor__circle');

const mouse = { x: -100, y: -100 }; // mouse pointer's coordinates
const pos = { x: 0, y: 0 }; // cursor's coordinates
const speed = 0.1; // between 0 and 1

const updateCoordinates = e => {
  mouse.x = e.clientX;
  mouse.y = e.clientY;
}

window.addEventListener('mousemove', updateCoordinates);


function getAngle(diffX, diffY) {
  return Math.atan2(diffY, diffX) * 180 / Math.PI;
}

function getSqueeze(diffX, diffY) {
  const distance = Math.sqrt(
    Math.pow(diffX, 2) + Math.pow(diffY, 2)
  );
  const maxSqueeze = 0.15;
  const accelerator = 1500;
  return Math.min(distance / accelerator, maxSqueeze);
}


const updateCursor = () => {
  const diffX = Math.round(mouse.x - pos.x);
  const diffY = Math.round(mouse.y - pos.y);
  
  pos.x += diffX * speed;
  pos.y += diffY * speed;
  
  const angle = getAngle(diffX, diffY);
  const squeeze = getSqueeze(diffX, diffY);
  
  const scale = 'scale(' + (1 + squeeze) + ', ' + (1 - squeeze) +')';
  const rotate = 'rotate(' + angle +'deg)';
  const translate = 'translate3d(' + pos.x + 'px ,' + pos.y + 'px, 0)';

  cursor.style.transform = translate;
  cursorCircle.style.transform = rotate + scale;
};

function loop() {
  updateCursor();
  requestAnimationFrame(loop);
}

requestAnimationFrame(loop);



const cursorModifiers = document.querySelectorAll('[cursor-class]');

cursorModifiers.forEach(curosrModifier => {
  curosrModifier.addEventListener('mouseenter', function() {
    const className = this.getAttribute('cursor-class');
    cursor.classList.add(className);
  });
  
  curosrModifier.addEventListener('mouseleave', function() {
    const className = this.getAttribute('cursor-class');
    cursor.classList.remove(className);
  });
});