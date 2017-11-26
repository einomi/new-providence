import 'slick-carousel'

import { ACTIVE_CLASS } from '../utils/constants';

class Slider {
	constructor() {
		this.$container = $('[data-slider]');
		this.$photos = this.$container.find('[data-slider-photos]').children();
		this.$itemsContainer = this.$container.find('[data-slider-items]');
		this.$itemsLine = this.$itemsContainer.children();
		this.$items = this.$itemsLine.children();
		this.$prev = this.$container.find('[data-slider-prev]');
		this.$next = this.$container.find('[data-slider-next]');

		this.$photos.on('click', e => {
		    const $photo = $(e.currentTarget);
		    this.$itemsContainer.slick('slickGoTo', $photo.index());
		});

		this.$prev.on('click', e => {
			e.preventDefault();
			this.$itemsContainer.slick('slickPrev');
		});
		this.$next.on('click', e => {
			e.preventDefault();
			this.$itemsContainer.slick('slickNext');
		});

		this._initCarousel();

		// Устанавливаем второй слайд при первом открытии страницы
		this.$itemsContainer.slick('slickGoTo', 1);
	}

	_initCarousel() {
		this.$itemsContainer.on('beforeChange', (e, slick, currentSlide, nextSlide) => {
			if (currentSlide === nextSlide) {
				return;
			}
			this.$photos.removeClass(ACTIVE_CLASS);
			this.$photos.eq(nextSlide).addClass(ACTIVE_CLASS);
		});
		this.$itemsContainer.on('init', () => {
			this.$itemsContainer.addClass('_inited');
		});
		this.$itemsContainer.slick({
			arrows: false,
			dots: false,
			slidesToShow: 1,
			slidesToScroll: 1,
			autoplay: true,
			autoplaySpeed: 2000,
		});

	}

}

export default new Slider()
