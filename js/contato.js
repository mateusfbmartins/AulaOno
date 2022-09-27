import {getComponent} from './component.js';
const body = document.querySelector('body');

const divInto = getComponent('div', '');
divInto.classList.add('container-intro');
divInto.setAttribute('id', 'inicio');

const divForm = getComponent('div', '');
divForm.classList.add('div-form');

body.appendChild(divInto);

const form = getComponent('form', '');
form.classList.add('input-form');

divForm.appendChild(form);
divInto.appendChild(divForm);

createForm();

function createForm(){
    const itensForm = [
        ['nome', 'Digite seu Nome'],,
        ['email', 'Digite seu email'],
        ['telefone', 'Digite seu telefone'],
        ['assunto', 'Digite o assunto'],
        ['mensagem', 'Digite a mensagem']
    ];
    itensForm.forEach(element => {
        console.log(itensForm);
        const inputForm = getComponent('input');
        const labelForm = getComponent('label');

        labelForm.textContent = element[0];

        inputForm.setAttribute('text', element[1]);
        inputForm.setAttribute('type', 'text');

        form.appendChild(labelForm);
        form.appendChild(getComponent('br'));
        form.appendChild(inputForm);
        form.appendChild(getComponent('br'));

   });

}