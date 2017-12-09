import {h, Component} from 'preact';
import hh from 'hyperscript-helpers';
import {createUrl} from './utils.js';
const {div, img, a, figure, span, form, label, input} = hh(h);
import './Item.scss';

const properties = [
    {
        type: 'date',
        name: 'date',
        label: 'Date'
    },
    {
        type: 'text',
        name: 'location',
        label: 'Location'
    }
];

class Item extends Component {
    constructor(props) {
        super(props);
        this.state.edit = false;
        this.onChange = this.onChange.bind(this);
        this.toggle = this.toggle.bind(this);
        this.hide = this.hide.bind(this);
    }

    createInput(property) {
        const {item} = this.props;
        return div({className: 'item__info-row'},
            label({className: 'item__info-label'}, property.label),
            property.type === 'date' && input({
                type: property.type, name: property.name,
                valueAsDate: new Date(item[property.name]),
                onChange: this.onChange
            }),
            property.type !== 'date' && input({
                type: property.type, name: property.name,
                value: item[property.name],
                onChange: this.onChange
            })
        );
    }

    onChange(e) {
        const value = event.target.value;
        const name = event.target.name;
        const result = {};
        result[name] = value;
        this.props.onChange(Object.assign({}, this.state.item, result))
    }

    toggle(e) {
        e.stopPropagation();
        e.preventDefault();
        const {edit} = this.state;
        this.setState({edit: !edit})
    }

    hide(e) {
        e.stopPropagation();
        e.preventDefault();
        this.props.item.hidden = true
    }

    render({item, onClick, i, readonly = true, onChange = () => {}}, {edit}) {
        function clicked(event) {
            event.preventDefault();
            onClick(item);
        }
    
        return div({className: 'item'},
            !readonly && a({className: 'item__button', href: '#', onClick: this.toggle}, edit ? 'Cancel' : 'Edit'),
            !readonly && a({className: 'item__button', href: '#', onClick: this.hide}, 'Hide'),
            figure({className: 'item__media', onClick: e => clicked(e)},
                a({href: createUrl(item.midi.src)},
                    div({className: 'item__photo'},
                        img({className: 'item__thumb', src: createUrl(item.mini.src)})
                    )
                )
            ),
            div({className: 'item__info'},
                !edit && div({className: 'item__info-content'},
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
                edit && form({},
                    properties.map(property => this.createInput(property))
                ),
                div({className: 'item__info-footer'})
            )
        );
    }
}

export default Item;
