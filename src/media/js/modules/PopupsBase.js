import dom from '../utils/DOM'

class PopupsBase {
	constructor() {
		this._opened = false;

		dom.$window.on('resize orientationchange', () => {
			this.closeAll(true);
		});

		dom.$window.on('keydown', e => {
		    e.which === 27 && this.closeAll();
		});
	}

	isOpened() {
		return this._opened;
	}

	open(id) {
		if (this._opened) {
			return;
		}
		this._opened = true;

		console.log('OPEN');
		dom.$body.lock();
		const $popup = this._getPopupElement(id);
		$popup.trigger('open');
		this._animateOpen($popup);
	}

	closeAll(immediate) {
		if (!this._opened) {
			return;
		}
		this._opened = false;

		dom.$body.unlock();
		this.$popups.trigger('close');
		this._animateClose(immediate);
	}

	_animateOpen($popup) {
		TweenMax.to($popup, 0.35, {autoAlpha: 1});
	}

	_animateClose(immediate) {
		TweenMax.to(this.$popups, immediate ? 0 : 0.35, {autoAlpha: 0});
	}
}

export default PopupsBase
