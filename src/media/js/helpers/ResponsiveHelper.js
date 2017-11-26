import { BREAKPOINTS } from '../utils/constants';
import dom from '../utils/DOM'

class ResponsiveHelper {
	isMobile() {
		return dom.$window.width() <= BREAKPOINTS.MD;
	}

	isDesktop() {
		return !this.isMobile();
	}
}

export default new ResponsiveHelper()
