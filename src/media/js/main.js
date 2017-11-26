import SVGSprites from './helpers/SVGSprites'
import Header from './modules/Header'
import MenuPopups from './modules/MenuPopups'
import dom from './utils/DOM'

const App = global.App = new (function App() {
    this.helpers = {
        SVGSprites,
    };

    this.modules = {
		Header,
	    MenuPopups,
    };

    $(() => {
        dom.$html.removeClass('_loading');
    });
})();
