import ScrollMagic from 'scrollmagic'
// import 'debug.addIndicators'
import random from 'lodash/random'

import ResponsiveHelper from '../helpers/ResponsiveHelper'

class Animations {
	start() {
		this._controller = new ScrollMagic.Controller();
		this._createScenes();
	}

	_createScenes() {
		this._createIntroScene();
		this._createDescriptionScene();
		this._createScreensScene();
	}

	_createIntroScene() {
		const $section = $('.section-intro');
		const $content = $('.section-intro__content');
		const $phone = $section.find('.section-intro__phone');
		new ScrollMagic.Scene({
			triggerElement: $section[0],
			reverse: false,
		})
            // .addIndicators()
			.addTo(this._controller)
			.on('start', () => {
				TweenMax.fromTo($content, 1, { alpha: 0, y: 15 }, { alpha: 1, y: 0 });
				TweenMax.fromTo($phone, 0.3, { alpha: 0 }, { alpha: 1, delay: 0.15 });
                TweenMax.fromTo($phone, 1, { y: '100%' }, { y: '0%', delay: 0.15 });
			});
	}

	_createDescriptionScene() {
		const $section = $('.section-description');
		const $phone = $section.find('.section-description__image');
		new ScrollMagic.Scene({
			triggerHook: ResponsiveHelper.isDesktop() ? 0.5 : 0,
			offset: ResponsiveHelper.isDesktop() ? 0 : 100,
			triggerElement: $section[0],
			reverse: false,
		})
			// .addIndicators()
			.addTo(this._controller)
			.on('start', () => {
				TweenMax.fromTo(
					$phone,
					1,
					{ x: -70, y: -50, opacity: 0 },
					{ opacity: 1, x: 0, y: 0, ease: Power1.easeInOut }
				);
			});
	}

	_createScreensScene() {
		const $section = $('.screens');
		const $items = $section.find('.screens__item');
		const $mainItem = $section.find('.screens__main');
		new ScrollMagic.Scene({
			triggerHook: ResponsiveHelper.isDesktop() ? 0.5 : 0.2,
			triggerElement: $section[0],
			reverse: false,
		})
			// .addIndicators()
			.addTo(this._controller)
			.on('start', () => {
				TweenMax.fromTo($mainItem, 1, { y: 50, alpha: 0 }, { y: 0, alpha: 1, delay: 0.3 });
				TweenMax.staggerFromTo($items, 1, { y: random(50, 100), alpha: 0 }, { alpha: 1, y: 0 }, random(0.1, 0.3));
			});
	}
}

export default new Animations()
