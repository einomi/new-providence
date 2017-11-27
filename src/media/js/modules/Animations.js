import ScrollMagic from 'scrollmagic'
// import 'debug.addIndicators'
import random from 'lodash/random'

class Animations {
	constructor() {
		this._controller = new ScrollMagic.Controller();
		this._createScenes();
	}

	start() {
		const $section = $('.section-intro');
		const $phone = $section.find('.section-intro__phone');
		TweenMax.fromTo($phone, 0.35, { y: '100%' }, { y: '0%' });
	}

	_createScenes() {
		this._createDescriptionScene();
		this._createScreensScene();
	}

	_createDescriptionScene() {
		const $section = $('.section-description');
		const $phone = $section.find('.section-description__image');
		new ScrollMagic.Scene({
			triggerHook: 0.15,
			triggerElement: $section[0],
			reverse: false,
		})
			// .addIndicators()
			.addTo(this._controller)
			.on('enter', () => {
				TweenMax.fromTo($phone, 0.5, { x: -50, y: -50 }, { opacity: 1, x: 0, y: 0 });
			});
	}

	_createScreensScene() {
		const $section = $('.screens');
		const $items = $section.find('.screens__item');
		const $mainItem = $section.find('.screens__main');
		new ScrollMagic.Scene({
			triggerHook: 0.5,
			triggerElement: $section[0],
			reverse: false,
		})
			// .addIndicators()
			.addTo(this._controller)
			.on('enter', () => {
				TweenMax.fromTo($mainItem, 0.5, { y: 50 }, { y: 0, alpha: 1, delay: 0.3 });
				TweenMax.staggerFromTo($items, 0.5, { y: random(50, 100) }, { opacity: 1, y: 0 }, random(0.1, 0.3));
			});
	}
}

export default new Animations()
