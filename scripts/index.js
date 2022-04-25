
const buscador=document.getElementById("header-searcher__logo");
const inputBuscador=document.getElementById("header-searcher__input");
const estadoInput=inputBuscador.style;
const linkTodos=document.getElementsByClassName("link")

//función para que el buscador aparezca en la vista mobile

    buscador.addEventListener("click", function(){
        if(estadoInput.display==="" || estadoInput.display==="none" ){
            inputBuscador.style.display="block"
        }else{
            inputBuscador.style.display="none" 
        }
    });

//función para el link a cada sección
function clicked(id){
    let idLink=id
    //guardamos el id del link que hace el llamado y lo pasamos en sessionStorage
    sessionStorage.setItem("id",idLink)
}