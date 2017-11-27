import dom from './utils/DOM'
import Preloader from './modules/Preloader'
import Animations from './modules/Animations'
import SVGSprites from './helpers/SVGSprites'
import Header from './modules/Header'
import MenuPopups from './modules/MenuPopups'
import Popups  from './modules/Popups'
import VideoPopup from './modules/VideoPopup'
import Slider from './modules/Slider'
import './utils/jqExtensions'

const App = global.App = new (function App() {
    this.helpers = {
        SVGSprites,
    };

    this.modules = {
	    Preloader,
	    Animations,
		Header,
	    MenuPopups,
	    Popups,
	    VideoPopup,
	    Slider,
    };

    $(() => {
        dom.$html.removeClass('_loading');
    });
})();
