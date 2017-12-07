import {h} from 'preact';
import hh from 'hyperscript-helpers';
import {createUrl} from './utils.js';
const {div, img, a, figure} = hh(h);
import './Item.scss';

function Item({item, onClick}) {
    function clicked(event) {
        event.preventDefault();
        onClick(item);
    }

    return div({className: 'item'},
        figure({className: 'item__media', onClick: e => clicked(e)},
            a({href: createUrl(item.midi.src)},
                div({className: 'item__photo'},
                    img({className: 'item__thumb', src: createUrl(item.mini.src)})
                )
            )
        ),
        div({className: 'item__info'},
            div({className: 'item__info-content'},
                div({}, new Date(item.date).toLocaleDateString())
            ),
            div({className: 'item__info-footer'})
        )
    );
}

export default Item;
