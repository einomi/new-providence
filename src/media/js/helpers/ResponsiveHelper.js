import throttle from 'lodash/throttle'

import { BREAKPOINTS } from '../utils/constants';
import dom from '../utils/DOM'

class ResponsiveHelper {
	constructor() {
		this._update();
		dom.$window.on('resize orientationchange', throttle(() => {
		    this._update();
		}, 60));
	}

	_update() {
		this._isMobile = dom.$window.width() <= BREAKPOINTS.MD;
	}

	isMobile() {
		return this._isMobile;
	}

	isDesktop() {
		return !this.isMobile();
	}
}

export default new ResponsiveHelper()
