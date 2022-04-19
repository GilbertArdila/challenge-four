import { clientServices } from "./clientServices.js";
//función para crear el template

const crearTemplate=(foto,nombre,precio,descripcion,clase,id)=>{

   
    //creamos el div contendor
   const div=document.createElement("div");
   div.classList.add("card");

   //creamos el contenido del div
   const contenido=`
   <img src="${foto}" alt="${nombre}" class="card-img">
   <p>${descripcion}</p>
   <p>$ ${precio}</p>
   <a href="./templates/producto.html" id=${id}>Ver Producto</a>
   `
//agregamos el contenido al div
div.innerHTML=contenido;

return div;

}
//capturamos el seccion
const seccion=document.querySelector(".cards");
//función para mostrar la lista de productos
clientServices.mostrarProducto().then((data)=>{
    data.forEach(({foto,nombre,precio,descripcion,clase,id})=>{
        const nuevaCard=crearTemplate(foto,nombre,precio,descripcion,clase,id);
        seccion.appendChild(nuevaCard)
    })
}).catch((error)=>alert("Ha ocurrido un error"))
