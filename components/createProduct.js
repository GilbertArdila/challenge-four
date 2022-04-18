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
    picture =btoa(verificarFoto(dragFile, selectedFile, picture))
      console.log( picture );
    if (verificarCampos(nombre, precio, clase) === true &&
    picture!="") {
        //mandamos a llamar el método para crear el producto
        clientServices.crearProducto(picture, nombre, precio, clase, descripcion).then(respuesta => {
            alert("El producto se ha creado satisfactoriamente");
        }).catch(error => alert("Se ha producido un error" + error));
    }
}
);

const verificarCampos=(nombre,precio)=>{
    let verificar=true;
       if(nombre===""){
          let mensaje=document.getElementById("error-nombre");
           mensaje.innerText="Por favor rellene el campo con el nombre del producto"
           verificar= false;
       }else{
        let mensaje=document.getElementById("error-nombre");
        mensaje.innerText=""
        
       }
       if(precio===""){
        let mensaje=document.getElementById("error-precio");
         mensaje.innerText="El campo precio no puede estar vacío"
         verificar= false;
        }else{
            let mensaje=document.getElementById("error-precio");
            mensaje.innerText="";
            
   
        }
     if(document.querySelector("[data-descripcion]").value===""){
        let mensaje=document.getElementById("error-descripcion");
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
        
    }
    if(selectedFile!="" && dragFile===""){
        picture=selectedFile
        let mensaje=document.getElementById("error-foto");
        mensaje.innerText=""
        
    }
    if(selectedFile==="" && dragFile===""){
        let mensaje=document.getElementById("error-foto");
        mensaje.innerText="Por favor ingrese la foto del producto"
        
        picture=""
      
   }
   if(selectedFile!="" && dragFile!=""){
    let mensaje=document.getElementById("error-foto");
    mensaje.innerText="Por ingrese la foto en uno solo de los dos campos, no en los dos"
        //limpiamos los dos campos de la imagen
        const selectedFile=document.querySelector("[data-selected]").value="";
        document.querySelector("[data-drop]").value="";
        picture=""
    }
    
    return picture; 
       
}