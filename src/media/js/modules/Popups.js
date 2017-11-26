import PopupsBase from './PopupsBase';

class Popups extends PopupsBase {
	constructor(args) {
		super(args);
		this.$popupPortal = $('[data-popup-portal]');
		this.$popups = $('[data-popup]');
		this.$openers = $('[data-popup-opener]');
		this.$closers = $('[data-popup-closer]');

		this.$openers.on('click', e => {
			e.preventDefault();
			const id = $(e.currentTarget).data('popup-opener');
			this.open(id);
		});

		this.$closers.on('click', e => {
		    e.preventDefault();
		    this.closeAll();
		});
	}

	open(id) {
		super.open(id);
		TweenMax.to(this.$popupPortal, 0.35, {autoAlpha: 1});
	}

	closeAll(immediate) {
		super.closeAll(immediate);
		TweenMax.to(this.$popupPortal, 0.35, {autoAlpha: 0});
	}

	_getPopupElement(id) {
		return this.$popups.filter(`[data-popup="${id}"]`);
	}
}

export default new Popups()
