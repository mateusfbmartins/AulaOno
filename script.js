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

//BODY FORM
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

const divEventos = getComponent('div', '');
divEventos.classList.add('div-eventos');

divInto.appendChild(divForm);
divInto.appendChild(divEventos);

//FIM BODY FORM

const divInfo = getComponent('div', '');
divInfo.classList.add('div-info');

body.appendChild(divInfo);

addImgs();


formPacote.addEventListener('submit', async(ev) => {
    ev.preventDefault();
    const inputValue = txtPacote.value;

    while(divEventos.firstChild) {
        divEventos.removeChild(divEventos.firstChild);
    }

    var obj =  await request('GET', inputValue);
    console.log(obj);

    if(obj.objetos[0].hasOwnProperty('mensagem')){
        alert(obj.objetos[0].mensagem);
    }
    else addEventosScreen(obj);
});

function addImgs(){
    const srcImgs = [
        "https://cuponomia-a.akamaihd.net/img/stores/original/aliexpress-636994893494226000.png",
        "https://cuponomia-a.akamaihd.net/img/stores/small/droga-raia.png?v4",
        "https://cuponomia-a.akamaihd.net/img/stores/small/centauro-637527938383470256.png?v4",
        "https://cuponomia-a.akamaihd.net/img/stores/small/kabum-637721671567340182.png?v4",
        "https://cuponomia-a.akamaihd.net/img/stores/medium/amazon-637977398923958948.png?v4",
        "https://cuponomia-a.akamaihd.net/img/stores/medium/shopee-637268866674503035.png?v4",
        "https://cuponomia-a.akamaihd.net/img/stores/medium/bang-good.jpg?v4",
        "https://cuponomia-a.akamaihd.net/img/stores/medium/carrefour-636994872825696000.png?v4",
        "https://cuponomia-a.akamaihd.net/img/stores/medium/efacil-637940919473685215.png?v4"
    ];

    srcImgs.forEach(element => {
        var imgParceiros = getComponent('img', '');
        imgParceiros.setAttribute('src', element);
        imgParceiros.classList.add('imgs-parceiros');

        divInfo.appendChild(imgParceiros);

    });
}

//ADICIONA EVENTOS NA TELA.
function addEventosScreen(obj){
    var eventos = obj.objetos[0].eventos;


    for(var ev in eventos){
        var divEvento = getComponent('div', '');
        divEvento.classList.add('div-item-evento');

        var divImg = getComponent('div', '');
        divImg.classList.add('div-img-evento');
        const img = getComponent('img', '');
        img.classList.add('img-eventos');
        img.setAttribute('src', 'https://proxyapp.correios.com.br' + eventos[ev].urlIcone);
        divImg.appendChild(img);


        var divDados = getComponent('div', '');
        divDados.classList.add('div-dados');
        const descricao = getComponent('h7', eventos[ev].descricao);
        const data = getComponent('a', eventos[ev].dtHrCriado);
        const endereco = getComponent('a', eventos[ev].unidade.endereco.cidade + "/" + eventos[ev].unidade.endereco.uf);

        divDados.appendChild(descricao);
        divDados.appendChild(getComponent('br', ''));
        divDados.appendChild(data);
        divDados.appendChild(getComponent('br', ''));
        divDados.appendChild(endereco);

        divEvento.appendChild(divImg);
        divEvento.appendChild(divDados);
        divEventos.appendChild(divEvento);

        console.log(eventos[ev].unidade.endereco)
    }

}

//GET COMPONENTES HTML
function getComponent(element, text){
    var component = document.createElement(element);

    if(text !== '') component.innerText = text;

    return component;
}


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