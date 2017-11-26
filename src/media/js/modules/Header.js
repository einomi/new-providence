import throttle from 'lodash/throttle'

import dom from '../utils/DOM'
import { BREAKPOINTS } from '../utils/constants'
import { getScrollTop } from '../utils/';

const FIXED_CLASS = '_fixed';

class Header {
	constructor() {
		this.$element = $('.site-header');

		this._scrollTop = 0;
		this._scrolled = false;
		this._visible = false;
		this._inited = false;

		this._throttledScrollHandler = throttle(this._scrollHandler.bind(this), 60);

		dom.$window.on('resize orientationchange', () => {
			this._update();
		});
		this._update();

	}

	_update() {
		dom.$window.width() > BREAKPOINTS.MD ? this._init() : this._uninit();
	}

	_init() {
		if (this._inited) {
			return;
		}
		this._inited = true;

		dom.$window.on('scroll', this._throttledScrollHandler);
		this._throttledScrollHandler();
	}

	_scrollHandler() {
		this._scrollTop = getScrollTop();

		if (this._scrollTop > 0) {
			if (this._scrolled !== true) {
				this._scrolled = true;
				this.$element.addClass(FIXED_CLASS);
			}
		} else {
			if (this._scrolled) {
				this._scrolled = false;
				this.$element.removeClass(FIXED_CLASS);
			}
		}
	}

	_uninit() {
		if (!this._inited) {
			return;
		}
		this._inited = false;

		dom.$window.off('scroll', '', this._throttledScrollHandler);
	}
}

export default new Header();
