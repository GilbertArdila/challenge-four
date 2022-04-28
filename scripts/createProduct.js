import { clientServices } from "../components/clientServices.js"
import { verificarFoto } from "../components/dragZone.js"

(()=>{




//variable para poner la imagen en base64
let fotoFile;
//variable para verificar que la imagen se cargue corectamente el el input
let picture;

//capturamos el formulario
const formulario=document.querySelector("[data-form]");
//capturamos el area del div para solatar la imagen
const areaImagen=document.getElementById("dropArea");

const selectedFileInput=document.querySelector("[data-selected]");
const dragFileInput=document.querySelector("[data-drop]")

//ponemos el formulario a la escucha de un evento imput
formulario.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    //capturamos los campos del formulario con su valor
    const nombre=document.querySelector("[data-nombre]").value;
    const precio=document.querySelector("[data-precio]").value;
    const clase=document.querySelector("[data-clase]").value;
    const descripcion=document.querySelector("[data-descripcion]").value;
     //capturamos los input
     const selectedFile=document.querySelector("[data-selected]").value;
     const dragFile=document.querySelector("[data-drop]").value;
   
    //verificamos si los dos inpputs están vacios
     if(selectedFile==="" && dragFile===""){
       
        //capturamos el elemento p 
        let mensaje=document.getElementById("error-foto");
        mensaje.style.color="red";
        mensaje.innerText="Por favor ingrese la foto del producto"
        picture=""
      
   }
  //verificamos los campos nombre, precio y clase
    if (verificarCampos(nombre, precio, clase) === true &&
    picture!="") {
       const confirmar=confirm("¿Desea crear el producto?");
        if(confirmar){
            //mandamos a llamar el método para crear el producto
        clientServices.crearProducto(fotoFile, nombre, precio,  descripcion,clase,).then(respuesta => {
           window.location.href="../templates/productosAdmin.html"
           
        }).catch(error => alert("Se ha producido un error" + error));

        }
        
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
            
        }
        fileReader.readAsDataURL(fileToLoad)
    }
    
 
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
            
        }
        fileReader.readAsDataURL(fileToLoad)
    }

    
   
})



})();