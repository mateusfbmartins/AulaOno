import {getComponent} from './component.js';
const body = document.querySelector('body');

//HEADER
const divHeader = getComponent('div', '');
divHeader.classList.add('header');
body.appendChild(divHeader);

//const ulNavigation = getComponent('ul', '');
const ulNavigation = createMenu([['Inicio', inicio], ['Sobre', sobre], ['Entre em contato', contato]]);
ulNavigation.classList.add('header-navigation');

const divLogo = getComponent('div', '');
divLogo.classList.add('header-logo');
const logo = getComponent('img', ''); 
logo.setAttribute('src', './img/logo-correio.png');
logo.onclick = inicio;
divLogo.appendChild(logo);

divHeader.appendChild(divLogo);
divHeader.appendChild(ulNavigation);

const divGhost = getComponent('div', '');
divGhost.classList.add('div-ghost');
body.appendChild(divGhost);
//FIM HEADER

//BODY FORM
const divBody = getComponent('div', '');
divBody.setAttribute('id', 'div-body');
body.appendChild(divBody);  

inicio();

//FIM BODY FORM

const divInfo = getComponent('div', '');
divInfo.setAttribute('id', 'div-info');
divInfo.classList.add('div-info');

body.appendChild(divInfo);

var isDark = false;

addImgs();

rodape();

function inicio(){
    limpaDiv();
    const divInto = getComponent('div', '');
    divInto.classList.add('container-intro');
    divInto.setAttribute('id', 'inicio');
    divBody.appendChild(divInto);  
    
    const divForm = getComponent('div', '');
    divForm.classList.add('div-form');
    const formPacote = document.createElement('form');
    formPacote.setAttribute('id', 'input-form');
    formPacote.classList.add('input-form');
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
    divEventos.setAttribute('id', 'div-eventos');
    divEventos.classList.add('div-eventos');
    
    divInto.appendChild(divForm);
    divInto.appendChild(divEventos);

    formPacote.addEventListener('submit', async(ev) => {
        ev.preventDefault();
        var inputValue = txtPacote.value.toUpperCase();
        inputValue = inputValue.replace(' ', '');

        if(inputValue != '' && inputValue.length == 13){
            while(divEventos.firstChild) {
                divEventos.removeChild(divEventos.firstChild);
            }
        
            var obj =  await request('GET', inputValue);
        
            if(obj.objetos[0].hasOwnProperty('mensagem')){
                alert(obj.objetos[0].mensagem);
            }
            else addEventosScreen(obj);
        }
        else{
            alert('Digite o código de rastreio!');
        }
    

    });
}

function sobre(){
    limpaDiv(); 

    const divInto = getComponent('div', '');
    divInto.classList.add('container-intro');
    divInto.setAttribute('id', 'inicio');
    divBody.appendChild(divInto);
    
    const msgSobre = "<h1>RASTREIO DE OBJETOS.IO</h1>"
    +"<p>Este é um site para rastremento de objetos do CORREIOS.</p>" 
    + "<br><p>Você pode usar o seguinte código NA391180648BR para o teste do sistema.</p>" 
    
    
    divInto.innerHTML = msgSobre;
    
}

function contato(){
    limpaDiv();

    const divInto = getComponent('div', '');
    divInto.classList.add('container-intro');
    divInto.setAttribute('id', 'inicio');

    const divForm = getComponent('div', '');
    divForm.classList.add('div-form');

    divBody.appendChild(divInto);

    const form = getComponent('form', '');
    form.classList.add('input-form');

    divForm.appendChild(form);
    divInto.appendChild(divForm);

    createForm();

    function createForm(){
        const itensForm = [
            ['nome', 'Digite seu Nome', 'text'],,
            ['email', 'Digite seu email', 'text'],
            ['telefone', 'Digite seu telefone', 'text'],
            ['assunto', 'Digite o assunto', 'text'],
            ['mensagem', 'Digite a mensagem', 'text'],
            ['Reclamação', 'Reclamação', 'radio'],
            ['Sugestão', 'Sugestão', 'radio'],
            ['Feedback', 'Feedback', 'radio'],
            ['Enviar Formulario', 'ENVIAR FORMULARIO', 'submit'],
        ];
        itensForm.forEach(element => {
            const inputForm = getComponent('input');
            const labelForm = getComponent('label');

            labelForm.textContent = element[0].toUpperCase();
            inputForm.setAttribute('type',  element[2]);    

            if(element[2] === 'radio'){
                inputForm.setAttribute('value', element[1]);
                inputForm.setAttribute('name',  'element[2]');   
                
                labelForm.setAttribute('id', 'label');
                form.appendChild(inputForm);
                form.appendChild(labelForm);
            }
            if(element[2] === 'submit'){
                inputForm.setAttribute('value', element[1]);
               
                inputForm.onclick = function(){
                    alert('Enviado com sucesso!');
                };


                form.appendChild(inputForm);
            }
            if(element[2] === 'text'){
                inputForm.setAttribute('text', element[1]);
                inputForm.setAttribute('placeholder', element[1]);

                form.appendChild(labelForm);
                form.appendChild(getComponent('br'));
                form.appendChild(inputForm);
                form.appendChild(getComponent('br'));
            }


/* 
            form.appendChild(labelForm);
            form.appendChild(getComponent('br'));
            form.appendChild(inputForm);
            form.appendChild(getComponent('br')); */


        }

    );

    }
}

function limpaDiv(){
    upPage();
    const divContainer = document.getElementById('inicio');
    if(divContainer != null){
        divContainer.remove();
    }
}

function changeTheme(){

    var theme = '';
    if(isDark===false){
        isDark = true;
        theme = './style/dark.css';
    }
    else{
        isDark = false;
        theme = './style/white.css';
    }

    var oldCss = document.getElementsByTagName('link').item(0);

    var newCss = getComponent('link', '');
    newCss.setAttribute('rel', 'stylesheet');
    newCss.setAttribute('type', 'text/css');
    newCss.setAttribute('href', theme);

    document.getElementsByTagName('head').item(0).replaceChild(newCss, oldCss);

}

function upPage(){
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
}

function rodape(){
    const divRodape = getComponent('div', '');
    divRodape.classList.add('div-rodape');

    body.appendChild(divRodape);

    const msgRodape = getComponent('p', '');
    msgRodape.innerHTML = '<p>&copy; 2022 Rastreio de objetos - Unisal Campinas</p>';
    divRodape.appendChild(msgRodape);

    const buttonUpPage = getComponent('button', '');
    buttonUpPage.innerHTML = '&#8593;';

    buttonUpPage.setAttribute('id', 'button-up');
    buttonUpPage.onclick = upPage;

    divRodape.appendChild(buttonUpPage);

}


//CRIA MENU
function createMenu(text){
    const div = getComponent('div', '');

    for(var a in text){

        const op = getComponent('a', text[a][0]);
        op.setAttribute('id', 'op'+a);
        op.onclick = text[a][1];
        
        div.appendChild(op);
    }

    const label = getComponent('label','');
    const buttonDarkMode = getComponent('input','');
    buttonDarkMode.setAttribute('type', 'checkbox');
    buttonDarkMode.onclick = changeTheme;
    const span = getComponent('span', '');
    span.classList.add('check');

    label.appendChild(buttonDarkMode);
    label.appendChild(span);

    div.appendChild(label);


    return div;
}

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

    const divEventos = document.getElementById('div-eventos');
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

 
    }

}

function msgError(url){
    alert('Para liberar a requisição da API, você deve acessar '.concat(url, ' e clicar em Request Tempory Access'));
    window.open(url);
}

async function request(type, url){

    var msgRecebida = "";

    var uri = "https://cors-anywhere.herokuapp.com/https://proxyapp.correios.com.br/v1/sro-rastro/" + url;
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");


    var requestOptions = {
        Method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
        Cache: 'default'
    };

   
    var request = await fetch(uri, requestOptions).catch((er)=>msgError(uri));

    if(request.status == 403){
        msgError(uri);
        return "";
    }
    else{
        msgRecebida = await request.json();
        return msgRecebida;
    }

}
