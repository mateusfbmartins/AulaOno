const body = document.querySelector('body');

//HEADER
const divHeader = getComponent('div', '');
divHeader.classList.add('header');
body.appendChild(divHeader);

//const ulNavigation = getComponent('ul', '');
const ulNavigation = createList(['Inicio', 'Sobre nós', 'Entre em contato']);
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


const divInto = getComponent('div', '');
divInto.classList.add('container-intro');
divInto.setAttribute('id', 'inicio');
body.appendChild(divInto);  

const divForm = getComponent('div', '');
divForm.classList.add('div-form');
const formPacote = document.createElement('form');
formPacote.setAttribute('id', 'input-form');
divForm.appendChild(formPacote);

const txtPacote = document.createElement('input');
txtPacote.setAttribute('type', 'text');
txtPacote.setAttribute('id', 'input-text');
txtPacote.setAttribute('placeholder', 'Código de Rastreio');
formPacote.appendChild(txtPacote);

const pesquisarPacote = document.createElement('input');
pesquisarPacote.setAttribute('type', 'submit');
pesquisarPacote.setAttribute('value','PESQUISAR PACOTE');
formPacote.appendChild(pesquisarPacote);

const divEventos = getComponent('div');
divEventos.classList.add('div-eventos');

divInto.appendChild(divForm);
divInto.appendChild(divEventos);


formPacote.addEventListener('submit', async(ev) => {
    ev.preventDefault();
    const inputValue = txtPacote.value;
    var a =  await request('GET', 'NA391180648BR');
    console.log(a);
    addEventosScreen(a);
});


function addEventosScreen(obj){

    var eventos = obj.objetos[0].eventos;
    console.log(eventos);

    const divEvento = getComponent('div');
    for(var ev in eventos){
        divEvento.appendChild(getComponent('a', eventos[ev].codigo))
        console.log(eventos[ev].codigo);
        divEventos.appendChild(divEvento);

    }
}

//GET COMPONENTES HTML
function getComponent(element, text){
    var component = document.createElement(element);

    if(text !== '') component.innerText = text;

    return component;
}

//CRIA MENU
function createList(text){
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

async function request(type, url){

    var msgRecebida = "";

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "text/plain");
    myHeaders.append("User-Agent", "any-name");

    var requestOptions = {
        method: type,
        headers: myHeaders,
        redirect: 'follow'
    };

    var request = await fetch("https://cors-anywhere.herokuapp.com/https://proxyapp.correios.com.br/v1/sro-rastro/" + url, requestOptions);

   // console.log(request.json());
/*     .then(response => response.text())
    .then(result => msgRecebida = result)
    .catch(error => console.log('error', error));
     */
    msgRecebida = await request.json();
    return msgRecebida;

}