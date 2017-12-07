import {h, Component} from 'preact';
import hh from 'hyperscript-helpers';
import './Header.scss';
const {div, header} = hh(h);

class Header extends Component {
    render() {
        return header({className: 'header'},
            div({className: 'header__menu'}, 'Menu'),
            div({className: 'header__title'}, '')
        );
    }
}

export default Header;
