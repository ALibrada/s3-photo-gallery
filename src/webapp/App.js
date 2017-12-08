import {h, Component} from 'preact';
import hh from 'hyperscript-helpers';
import Gallery from './Gallery.js';
import Header from './Header.js';
import './App.scss';
import {getItems} from './data.js';
const {div, img, a} = hh(h);
import {throttle} from './utils.js';

const STEP = 30;

function getDistFromBottom() {
    const scrollPosition = window.pageYOffset;
    const windowSize = window.innerHeight;
    const bodyHeight = document.body.offsetHeight;
    return Math.max(bodyHeight - (scrollPosition + windowSize), 0);
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state.items = [];
        this.state.n = STEP;
    }

    getItems() {
        const {n} = this.state;
        this.setState({items: getItems(0, n)});
    }

    componentDidMount() {
        this.onScroll = throttle(() => this.loadMore());
        this.getItems(this.state.n, STEP);
        document.addEventListener('scroll', this.onScroll);
    }
    
    componentDidUnmount() {
        document.removeEventListener('scroll', this.onScroll);
    }

    loadMore() {
        const dist = getDistFromBottom();
        if (!this.state.loading && dist >= 0 && dist < 100) {
            this.setState({loading: true});
            this.setState({n: this.state.n + STEP});
            this.getItems();
            this.setState({loading: false});
        }
    }

    render({}, {items, loading}) {
        return div({},
            h(Header),
            h(Gallery, {items})
        );
    }
}

export default App;
