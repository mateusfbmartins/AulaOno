//GET COMPONENTES HTML


export function getComponent(element, text){
    var component = document.createElement(element);

    if(text !== '') component.innerText = text;

    return component;
};
