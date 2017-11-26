const YoutubeAPILoader = {
	_queue: [],
	_isLoaded: false,

	onLoad(callback) {
		// if the API is loaded just create the player
		if (this._isLoaded) {
			callback();
			return;
		} else {
			this._queue.push(callback);

			// load the Youtube API if this was the first component added
			if (this._queue.length === 1) {
				this._loadAPI();
			}
		}
	},

	_loadAPI() {
		// load the api however you like
		let tag = document.createElement('script');
		tag.id = 'yt-iframe-api';
		tag.src = `https://www.youtube.com/iframe_api`;
		let firstScriptTag = document.getElementsByTagName('script')[0];
		firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

		window.onYouTubeIframeAPIReady = () => {
			this._isLoaded = true;
			for (let i = this._queue.length; i--;) {
				this._queue[i]();
			}
			this._queue = [];
		};
	}
};

export default YoutubeAPILoader
