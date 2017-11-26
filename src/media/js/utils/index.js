export const getScrollTop = () => {
	const scrollTop = window.pageYOffset;
	return scrollTop < 0 ? 0 : scrollTop;
};
