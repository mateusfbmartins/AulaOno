import {getComponent} from './component.js';

const body = document.querySelector('body');

//HEADER
const divHeader = getComponent('div', '');
divHeader.classList.add('header');
body.appendChild(divHeader);

//const ulNavigation = getComponent('ul', '');
const ulNavigation = createMenu(['Inicio', 'Sobre nós', 'Entre em contato']);
ulNavigation.classList.add('header-navigation');

const divLogo = getComponent('div', '');
divLogo.classList.add('header-logo');
const logo = getComponent('img', ''); 
logo.setAttribute('src', './img/logo-correio.png');
divLogo.appendChild(logo);

divHeader.appendChild(divLogo);
divHeader.appendChild(ulNavigation);

const divGhost = getComponent('div', '');
divGhost.classList.add('div-ghost');
body.appendChild(divGhost);
//FIM HEADER


//CRIA MENU
function createMenu(text){
    const div = getComponent('div', '');
 /*    const ul = getComponent('ul', '');
    ul.setAttribute('id', 'list-menu'); */

    for(var a in text){
/*         const li = getComponent('li', '');
        li.appendChild(getComponent('a', text[a]));
        ul.appendChild(li);
 */
        div.appendChild(getComponent('a', text[a]));
    }

 //   div.appendChild(ul);

    return div;

}