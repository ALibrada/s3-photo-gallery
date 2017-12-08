import {h, Component} from 'preact';
import hh from 'hyperscript-helpers';
import 'photoswipe/dist/photoswipe.css';
import 'photoswipe/dist/default-skin/default-skin.css';
import PhotoSwipe from 'photoswipe/dist/photoswipe';
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default';
import Item from './Item.js';
import {createUrl} from './utils.js';
import './Gallery.scss';
const {div} = hh(h);

class Gallery extends Component {

    onThumbClick(item) {
        const pswpElement = document.querySelector('.pswp');
        const index = this.props.items.findIndex(i => i === item);
        const options = { index };
        const elements = this.props.items.map(item => ({src: createUrl(item.midi.src), h: item.midi.height, w: item.midi.width}));
        const gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, elements, options);
        gallery.init();
    }

    render({items}) {
        const onClick = this.onThumbClick.bind(this);
        return div({className: 'gallery'}, items.map((item, i) => Item({item, onClick, i})));
    }
}

export default Gallery;
