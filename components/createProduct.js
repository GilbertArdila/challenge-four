import { clientServices } from "./clientServices.js"
import { verificarFoto } from "./dragZone.js";


let fotoFile="";

//capturamos el formulario
const formulario=document.querySelector("[data-form]");
//capturamos el botón dentro del input data-selected
const drop_button=document.getElementById("drop_button");
//capturamos el botón dentro del input data-drop
const mobile_button=document.getElementById("boton-mobile");
//capturamos el area del div para solatar la imagen
const areaImagen=document.getElementById("dropArea");

let picture;

//ponemos el formulario a la escucha de un evento imput
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    //capturamos los campos del formulario con su valor
    const nombre=document.querySelector("[data-nombre]").value;
    const precio=document.querySelector("[data-precio]").value;
    const clase=document.querySelector("[data-clase]").value;
    const descripcion=document.querySelector("[data-descripcion]").value;
   
  //verificamos los campos nombre, precio y clase
    if (verificarCampos(nombre, precio, clase) === true &&
    picture!="") {
        //mandamos a llamar el método para crear el producto
        clientServices.crearProducto(fotoFile, nombre, precio,  descripcion,clase,).then(respuesta => {
            alert("El producto se ha creado satisfactoriamente");
        }).catch(error => alert("Se ha producido un error" + error));
    }
});
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

const selectedFileInput=document.querySelector("[data-selected]");
const dragFileInput=document.querySelector("[data-drop]")



//ponemos los inputs a la escucha para convertir la imagen a base64
selectedFileInput.addEventListener("change",()=>{
      //verificamos el contenido de los campos para cargar la foto
    picture =verificarFoto( picture)
    
    let foto=picture;
    /* Función para convertir a base64 las imagenes*/ 
    if(foto.length>0){
        let fileToLoad=foto[0];
        let fileReader=new FileReader();
        fileReader.onload=function (fileLoadEvent){
            let base64=fileLoadEvent.target.result;
            fotoFile=base64;
            console.log(fotoFile);
        }
        fileReader.readAsDataURL(fileToLoad)
    }
   
 
})
dragFileInput.addEventListener("change",()=>{
    //verificamos el contenido de los campos para cargar la foto
    picture =verificarFoto( picture)
    let foto=picture;
    /* Función para convertir a base64 las imagenes*/ 
    if(foto.length>0){
        let fileToLoad=foto[0];
        let fileReader=new FileReader();
        fileReader.onload=function (fileLoadEvent){
            let base64=fileLoadEvent.target.result;
            fotoFile=base64;
            console.log(fotoFile);
        }
        fileReader.readAsDataURL(fileToLoad)
    }
    
 
})
 

 




