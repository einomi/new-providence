import dom from './utils/DOM'
import SVGSprites from './helpers/SVGSprites'
import Header from './modules/Header'
import MenuPopups from './modules/MenuPopups'
import Popups  from './modules/Popups'
import VideoPopup from './modules/VideoPopup'
import './utils/jqExtensions'

const App = global.App = new (function App() {
    this.helpers = {
        SVGSprites,
    };

    this.modules = {
		Header,
	    MenuPopups,
	    Popups,
	    VideoPopup,
    };

    $(() => {
        dom.$html.removeClass('_loading');
    });
})();
