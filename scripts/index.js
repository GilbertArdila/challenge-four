
const buscador=document.getElementById("header-searcher__logo");
const inputBuscador=document.getElementById("header-searcher__input");
const estadoInput=inputBuscador.style;


    buscador.addEventListener("click", function(){
        if(estadoInput.display==="" || estadoInput.display==="none" ){
            inputBuscador.style.display="block"
        }else{
            inputBuscador.style.display="none" 
        }
    });

