import { clientServices } from "./clientServices.js"

//capturamos el formulario
const formulario=document.querySelector("[data-form]");
//capturamos el botón dentro del input data-selected
const drop_button=document.getElementById("drop_button");
//capturamos el botón dentro del input data-drop
const mobile_button=document.getElementById("boton-mobile");
//capturamos el area del div para solatar la imagen
const areaImagen=document.getElementById("dropArea");

//ponemos el formulario a la escucha de un evento imput
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    //capturamos los campos del formulario con su valor

    const selectedFile=document.querySelector("[data-selected]").value;
    const dragFile=document.querySelector("[data-drop]").value;
    const nombre=document.querySelector("[data-nombre]").value;
    const precio=document.querySelector("[data-precio]").value;
    const clase=document.querySelector("[data-clase]").value;
    const descripcion=document.querySelector("[data-descripcion]").value;
    let picture;
    //verificamos el contenido de los campos para cargar la foto
    picture =btoa(verificarFoto(dragFile, selectedFile, picture))
     
    if (verificarCampos(nombre, precio, clase) === true &&
    picture!="") {
        //mandamos a llamar el método para crear el producto
        clientServices.crearProducto(picture, nombre, precio, clase, descripcion).then(respuesta => {
            alert("El producto se ha creado satisfactoriamente");
        }).catch(error => alert("Se ha producido un error" + error));
    }
}
);
//función para verificar los campos del input
const verificarCampos=(nombre,precio)=>{
    let verificar=true;
       if(nombre===""){
          let mensaje=document.getElementById("error-nombre");
          mensaje.style.color="red";
           mensaje.innerText="Por favor rellene el campo con el nombre del producto"
           verificar= false;
       }else{
        let mensaje=document.getElementById("error-nombre");
        mensaje.innerText=""
        
       }
       if(precio===""){
        let mensaje=document.getElementById("error-precio");
        mensaje.style.color="red";
         mensaje.innerText="El campo precio no puede estar vacío"
         verificar= false;
        }else{
            let mensaje=document.getElementById("error-precio");
            mensaje.innerText="";
            
   
        }
     if(document.querySelector("[data-descripcion]").value===""){
        let mensaje=document.getElementById("error-descripcion");
        mensaje.style.color="red";
        mensaje.innerText="Debe poner una descripción al producto";
        verificar= false;

        
     }else{
        let mensaje=document.getElementById("error-descripcion");
        mensaje.innerText="";
        
       

     }
     
     return verificar;
}

const verificarFoto=(dragFile,selectedFile,picture)=>{
    if(selectedFile==="" && dragFile!=""){
        picture=dragFile;
        let mensaje=document.getElementById("error-foto");
        mensaje.innerText=""
        console.log(picture)
        
    }
    if(selectedFile!="" && dragFile===""){
        picture=selectedFile
        let mensaje=document.getElementById("error-foto");
       
        
        mensaje.innerText=""
        
    }
    if(selectedFile==="" && dragFile===""){
        let mensaje=document.getElementById("error-foto");
        mensaje.style.color="red";
        mensaje.innerText="Por favor ingrese la foto del producto"
        
        picture=""
      
   }
   if(selectedFile!="" && dragFile!=""){
    let mensaje=document.getElementById("error-foto");
    mensaje.style.color="red";
    mensaje.innerText="Por ingrese la foto en uno solo de los dos campos, no en los dos"
        //limpiamos los dos campos de la imagen
        const selectedFile=document.querySelector("[data-selected]").value="";
        document.querySelector("[data-drop]").value="";
        picture=""
    }
    
    return picture; 
       
}

//funcion para abrir el input de las vistas grandes a traves del botón
drop_button.addEventListener("click",(evento)=>{
    const selectedFile=document.querySelector("[data-selected]");
     //le asignamos la función click al input para que se abra el buscador de archivos
    selectedFile.click();
  
})
//función para abrir el input de la vista mobile a traves del botón

mobile_button.addEventListener("click",(evento)=>{
    const dropFile=document.querySelector("[data-drop]");
   //le asignamos la función click al input para que se abra el buscador de archivos
    dropFile.click();
   
})
//funciónes de grag para el area de draging
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
//al soltar en el area de draging
areaImagen.addEventListener("drop",(evento)=>{
    evento.preventDefault();
    evento.stopPropagation();
    //capturamos el file
    const dragFile=document.querySelector("[data-drop]");
    //pasamos el archivo al input
    dragFile.files=evento.dataTransfer.files;
       //capturamos el span para mostrar mensaje
    let mensaje=document.getElementById("error-foto");
    //asignamos el archivo a una variable
    let archivo=evento.dataTransfer.files;
    //damos color al mensaje y le pasamos el nombre del archivo cargado
    mensaje.style.color="blue";
    mensaje.innerText="Usted ha cargado "+archivo[0].name

    const texto=document.getElementById("dragText");
    texto.innerText="Imagen cargada"

    areaImagen.classList.remove("agregarImagen_over");
    areaImagen.classList.add("agregarImagen_droped");
   
})

const selectedFile=document.querySelector("[data-selected]");
const dragFile=document.querySelector("[data-drop]");

//funciones para mostrar el nombre del archivo cargado
selectedFile.addEventListener("change",(evento)=>{
    evento.preventDefault()
    console.log(selectedFile.files[0].name)
    let mensaje=document.getElementById("error-foto");
    mensaje.style.color='blue';
    mensaje.innerText='se ha cargado '+selectedFile.files[0].name
    
})
dragFile.addEventListener("change",(evento)=>{
    console.log("cambio")
    let mensaje=document.getElementById("error-foto");
    mensaje.style.color='blue';
    mensaje.innerText='se ha cargado '+dragFile.files[0].name
    
})

