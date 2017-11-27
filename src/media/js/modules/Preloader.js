import imagesLoaded from 'imagesloaded'

import dom from '../utils/DOM'
import Animations from './Animations'

class Preloader {
	constructor() {
		this.$container = $('[data-preloader]');
		this.$progress = this.$container.find('[data-preloader-progress]');
		this.$progressValue = this.$container.find('[data-preloader-progress-value]');
		this._preloaderWidth = this.$progress.width();

		this.minDuration = 1500;

		const time1 = new Date().getTime();

		const onComplete = () => {
			TweenMax.to(this.$progressValue, 15, { width: this._preloaderWidth });
		};
		TweenMax.to(this.$progressValue, 5, {width: this._preloaderWidth - 50, onComplete});

		imagesLoaded(document.body, () => {
			const time2 = new Date().getTime();
			const delta = this.minDuration - (time2 - time1);
			const onComplete = () => {
				this.hide();
			};
			let duration = delta > 0 ? delta / 1000 : 0.1;
			TweenMax.to(this.$progressValue, duration, { width: this._preloaderWidth, onComplete });
		});
	}

	hide() {
		dom.$body.unlock();
		TweenMax.to(this.$container, 0.35, { autoAlpha: 0, onComplete: () => {
			Animations.start();
		}});
	}
}

export default new Preloader()
