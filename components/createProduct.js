import { clientServices } from "./clientServices.js"

//capturamos el formulario
const formulario=document.querySelector("[data-form]");


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
    picture=
     btoa(verificarFoto(dragFile,selectedFile,picture));
   
    //mandamos a llamar el método para crear el producto
    clientServices.crearProducto(picture,nombre,precio,clase,descripcion).then(respuesta=>{
        alert("El producto se ha creado satisfactoriamente");
    }).catch(error=>alert("Se ha producido un error"+error));
   
   
}
);


const verificarFoto=(dragFile,selectedFile,picture)=>{
    if(selectedFile==="" && dragFile!=""){
        picture=dragFile;
        
    }
    if(selectedFile!="" && dragFile===""){
        picture=selectedFile
        
    }
    if(selectedFile==="" && dragFile===""){
       alert("Por favor ingrese la fotografia en uno de los dos campos habilitados");
       picture=""
      
   }
   if(selectedFile!="" && dragFile!=""){
        alert("Por favor ingrese la fotografia en uno de los dos campos habilitados, no en los dos");
        //limpiamos los dos campos de la imagen
        const selectedFile=document.querySelector("[data-selected]").value="";
        document.querySelector("[data-drop]").value="";
        picture=""
    }
    
    return picture; 
       
}