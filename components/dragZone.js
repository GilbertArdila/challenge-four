//capturamos el botón dentro del input data-selected
const drop_button=document.getElementById("drop_button");
//capturamos el botón dentro del input data-drop
const mobile_button=document.getElementById("boton-mobile");
//capturamos el area del div para solatar la imagen
const areaImagen=document.getElementById("dropArea");




//funcion para verificar en cual input se depositó la foto y evitar que esten vacios o los dos tengan archivos
export const verificarFoto=(picture)=>{
    //capturamos los input
    const selectedFile=document.querySelector("[data-selected]").value;
    const dragFile=document.querySelector("[data-drop]").value;
  
   // si el archivo está en la zona drag and drop
    if(selectedFile==="" && dragFile!=""){
        
        //capturamos los files del input
        const filesInput=document.querySelector("[data-drop]").files;

        picture=filesInput;

        //mostramos el nombre del archivo cargado en el input drag and drop
        let mensaje=document.getElementById("error-foto");
        let nombrearchivo=dragFile.split('\\')[2];
        mensaje.style.color="blue";
        mensaje.innerText="se ha seleccionado "+nombrearchivo
    }

    //si el archivo está en el input de selección
   else if(selectedFile!="" && dragFile===""){
   
         //capturamos los files del input
        const filesInput=document.querySelector("[data-selected]").files;

        picture=filesInput
       
        
    }
      
   //si los dos inputs tienen archivos
  else if(selectedFile!="" && dragFile!=""){
   
         //capturamos el elemento p 
    let mensaje=document.getElementById("error-foto");
    mensaje.style.color="red";
    mensaje.innerText="Por ingrese la foto en uno solo de los dos campos, no en los dos"

        //limpiamos los dos campos de la imagen
        const selectedFileinput=document.querySelector("[data-selected]");
        selectedFileinput.value=""
        const dragedFileInput=document.querySelector("[data-drop]");
        areaImagen.classList.remove("agregarImagen_droped");
        
        //retornamos el drag zone a su estado inicial
        const texto=document.getElementById("dragText");
        texto.innerText="Arrastra la imagen acá"
        dragedFileInput.value="";

        //retornamos el input de seleccion a su estado inicial
        let area=document.querySelector(".drop-image");
        area.classList.remove("droped-image")
        
        picture=""
     }
     
       
    return picture; 
       
}

//funcion para abrir el input de las vistas grandes a traves del botón
drop_button.addEventListener("click",(evento)=>{
    evento.preventDefault();
    //obtenemos el input
    const selectedFile=document.querySelector("[data-selected]");
     //le asignamos la función click al input para que se abra el buscador de archivos
    selectedFile.click();
  
})
//función para abrir el input de la vista mobile a traves del botón

mobile_button.addEventListener("click",(evento)=>{
    evento.preventDefault();
    //obtenemos el input
    const dropFile=document.querySelector("[data-drop]");
   //le asignamos la función click al input para que se abra el buscador de archivos
    dropFile.click();
   
   
})
//funciónes de grag para el area de draging, la función drop se encuentra en el archivo createProduct.js

//al entrar en el area de draging
areaImagen.addEventListener("dragover",(evento)=>{
    evento.preventDefault();
    areaImagen.classList.add("agregarImagen_over");
    const texto=document.getElementById("dragText");
    texto.innerText="Suelta la imagen acá"
})

//al salir del area de draging
areaImagen.addEventListener("dragleave",(evento)=>{
    evento.preventDefault();
    areaImagen.classList.remove("agregarImagen_over");
    const texto=document.getElementById("dragText");
    texto.innerText="Arrastra la imagen acá"
})



const selectedFile=document.querySelector("[data-selected]");

//funcion para mostrar el nombre del archivo cargado los input de selección
selectedFile.addEventListener("change",(evento)=>{
    evento.preventDefault()
    
    let mensaje=document.getElementById("error-foto");
    mensaje.style.color='blue';
    mensaje.innerText='se ha cargado '+selectedFile.files[0].name
   //cambiamos de color el borde del area como indicador
    let area=document.querySelector(".drop-image");
    area.classList.add("droped-image")

    
    
})


