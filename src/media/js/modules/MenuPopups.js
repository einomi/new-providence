import dom from '../utils/DOM'
import ResponsiveHelper from '../helpers/ResponsiveHelper'
import globalData from '../../../../global-data.json'

const MENU_DESKTOP_ID = globalData.menuComplementaryId;
const MENU_MOBILE_ID = globalData.menuMobileId;

class MenuPopups {
	constructor() {
		this.$menus = $('[data-menu-popup]');
		this.$openers = $('[data-menu-popup-opener]');
		this.$closers = $('[data-menu-popup-closer]');
		this.$burger = $('[data-burger]');

		dom.$window.on('resize orientationchange', () => {
		    this.closeAll(true);
		});

		this.$burger.on('click', e => {
		    e.preventDefault();
		    ResponsiveHelper.isDesktop()
				? this.open(MENU_DESKTOP_ID)
			    : this.open(MENU_MOBILE_ID);
		});

		this.$openers.on('click', e => {
			e.preventDefault();
			const id = $(e.currentTarget).data('menu-opener');
			this.open(id);
		});

		this.$closers.on('click', e => {
			e.preventDefault();
			this.closeAll();
		});
	}

	open(id) {
		if (this._opened) {
		    return;
		}
		this._opened = true;

		const $menu = this.$menus.filter(`[data-menu-popup="${id}"]`);
		TweenMax.to($menu, 0.35, {autoAlpha: 1});
	}

	closeAll(immediate) {
		if (!this._opened) {
			return;
		}
		this._opened = false;

		TweenMax.to(this.$menus, immediate ? 0 : 0.35, {autoAlpha: 0});
	}
}

export default new MenuPopups()
