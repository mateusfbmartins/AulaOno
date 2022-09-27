//GET COMPONENTES HTML


export function getComponent(element, text){
    var component = document.createElement(element);

    if(text !== '') component.innerText = text;

    return component;
};
/* 
export function getComponent(element){
    var component = document.createElement(element);

    return component;
};

 */