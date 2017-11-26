import ResponsiveHelper from '../helpers/ResponsiveHelper'
import globalData from '../../../../global-data.json'
import PopupsBase from './PopupsBase';

const MENU_DESKTOP_ID = globalData.menuComplementaryId;
const MENU_MOBILE_ID = globalData.menuMobileId;

class MenuPopups extends PopupsBase {
	constructor(args) {
		super(args);

		this.$popups = $('[data-menu-popup]');
		this.$openers = $('[data-menu-popup-opener]');
		this.$closers = $('[data-menu-popup-closer]');
		this.$burger = $('[data-burger]');

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

	_getPopupElement(id) {
		return this.$popups.filter(`[data-menu-popup="${id}"]`);
	}
}

export default new MenuPopups()
