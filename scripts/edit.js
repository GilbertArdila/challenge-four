import { clientServices } from "../components/clientServices.js";

(()=>{



//captamos los elementos del formulario
const update_form=document.querySelector("[data-update_form]");
const update_foto=document.querySelector("[data-update_foto]");
const update_nombre=document.querySelector("[data-update_nombre]");
const update_precio=document.querySelector("[data-update_precio]");
const update_clase=document.querySelector("[data-update_clase]");
const update_descripcion=document.querySelector("[data-update_descripcion]");
const button_file=document.querySelector("#imagen-container__button");
const nombreFoto=document.querySelector(".foto-name");
const imagenCargada=document.querySelector(".imagenCargada");
let fotoNueva;




/*Función para obtener los datos del producto a actualizar*/
const obtenerProducto= async()=>{
    //obtenemos los datos del id del producto
    const url=new URL(window.location);
    const id=url.searchParams.get("id");

    //verificamos que el id no esté vacío
  if(id===null){
      
    window.location.href="../index.html"
}

try{
    //llamamos la función datosProducto y le pasamos el id por parámetro
    const producto= await clientServices.datosProducto(id);
    //const nombreFoto=document.querySelector(".foto-name");
   
  
    //ponemos los datos del producto en los inputs
    imagenCargada.setAttribute("src",producto.foto)
     update_nombre.value=producto.nombre
     update_precio.value=producto.precio
     update_clase.value=producto.clase
     update_descripcion.value=producto.descripcion
    
}catch(error){
      window.location.href="../index.html"
  }
} 
obtenerProducto();

/*Función para actualizar los datos del producto*/
//ponemos el formulario a la escucha de un evento submit
update_form.addEventListener("submit",(evento)=>{
    evento.preventDefault();
    
    //obtenemos los nuevos valores de los value de cada input
     const foto=imagenCargada.getAttribute("src");
     const nombre=update_nombre.value;
     const precio=update_precio.value;
     const clase=update_clase.value;
     const descripcion=update_descripcion.value;
     const url=new URL(window.location);
     const id=url.searchParams.get('id');

     //lanzamos un alerta de confirmación
     const confirmar=confirm("Desea actualizar el producto");

     if(confirmar){
        clientServices.actualizarProducto(foto,nombre,precio,descripcion,clase,id).then(()=>{
        window.location.href="../templates/productosAdmin.html"
        })
     }
   
    })




//función para abrir el file chooser al dar click al botón selecciona imagen

button_file.addEventListener("click",(evento)=>{
    evento.preventDefault();
   
    //obtenemos el input
    const foto=document.querySelector("[data-update_foto]");
    //le asignamos la función click al input para que se abra
    foto.click();
    
})

//esta función se ejecuta cuando el formulario detecte un cambio
update_foto.addEventListener("change",(evento)=>{
    evento.preventDefault();

    //pasamos el nombre de la foto al p
    nombreFoto.innerText=evento.target.files[0].name;
    //capturamos el archivo que está en el input
    let foto=evento.target.files;

   //verificamos que el input no esté vacío
    if(foto.length>0){
        //convertimos a base64
        let fileToLoad=foto[0];
        let fileReader=new FileReader();
        fileReader.onload=function (fileLoadEvent){
            let base64=fileLoadEvent.target.result;
            //asignamos el base64 a la imagen
            fotoNueva=base64;
            //cambiamos la imagen del producto por la nueva
            imagenCargada.setAttribute("src",fotoNueva)
           
        }
        fileReader.readAsDataURL(fileToLoad)
    }

})


})();