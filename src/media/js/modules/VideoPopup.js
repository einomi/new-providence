import YoutubeAPILoader from '../helpers/YoutubeAPILoader'

class VideoPopup {
	constructor() {
		this.$popup = $('[data-popup="video"]');
		this.$player = this.$popup.find('[data-video]');
		this._queue = [];

		this.$popup.on('open', () => {
			this._onPlayerReady(() => this._player.playVideo());
		});

		this.$popup.on('close', () => {
			this._player.stopVideo();
		});

		YoutubeAPILoader.onLoad(() => this._createPlayer());
	}

	_onPlayerReady(callback) {
		if (this._isReady) {
		    callback();
		    return;
		}
		this._queue.push(callback);
	}

	_createPlayer() {
		const videoId = this.$player.data('video');
		this._player = new YT.Player(this.$player[0], {
			videoId,
			events: {
				'onReady': () => {
					this._isReady = true;
					for (let i = this._queue.length; i--;) {
						this._queue[i]();
					}
					this._queue = [];
				},
			}
		});
	}
}

export default new VideoPopup()
