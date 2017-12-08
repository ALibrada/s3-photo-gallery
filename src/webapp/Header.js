import {h, Component} from 'preact';
import hh from 'hyperscript-helpers';
import './Header.scss';
import {name} from '../../db.json';
const {div, header} = hh(h);

function Header() {
    window.document.title = name;
    return header({className: 'header'},
        div({className: 'header__menu'}, 'Menu'),
        div({className: 'header__title'}, name)
    );
}

export default Header;
