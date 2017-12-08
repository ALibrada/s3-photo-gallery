import {h} from 'preact';
import hh from 'hyperscript-helpers';
import {createUrl} from './utils.js';
const {div, img, a, figure, span} = hh(h);
import './Item.scss';

function Item({item, onClick, i}) {
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
                div({className: 'item__info-row'},
                    span({className: 'item__info-label'}, 'Date') ,
                    span({}, new Date(item.date).toLocaleDateString())
                ),
                item.location && div({className: 'item__info-row'},
                    span({className: 'item__info-label'}, 'Location') ,
                    span({}, item.location)
                ),
                div({className: 'item__info-row'},
                    span({className: 'item__info-label'}, 'Name') ,
                    span({}, i)
                )
            ),
            div({className: 'item__info-footer'})
        )
    );
}

export default Item;
