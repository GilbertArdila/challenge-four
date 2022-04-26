import { searcher } from "./searcher.js";
import { clientServices } from "./clientServices.js";

const url=' http://localhost:3000/producto';

//guardamos el valor del sessionStora en una variable para saber que imagenes debemos mostrar
const idLink=sessionStorage.getItem("id");

//capturamos el section para mostrar los datos
const section=document.querySelector(".todos-cards")


//lista para guardar los productos que nos trae el llamado a mostrarProducto
const datos = [];




  
 //función para mostrar la lista de productos
 clientServices.mostrarProducto().then((data) => {
    //para el titulo que se muestra
    let tituloClase="";
    const titulo=document.querySelector(".todos-title")

    //verificamos la clase de los productos a mostrar
    if(data[0].clase==='star_wars'){
        tituloClase="Star Wars"
    }
    else if(data[0].clase==="consoles"){
        tituloClase ='Consolas'
    }else{
        tituloClase='otros'
    }
   
   
   //recorremos los datos que nos trae la suncion mostrarProducto

   data.forEach(producto => {
    //verificamos la clase de los productos para mostrar solo los relacionados
    if (producto.clase === idLink) {
           
           //ponemos los productos dentro la variable para el buscador
           datos.push(producto)
           
           //creamos el div contenedor
            const div = document.createElement("div");
            div.classList.add("card");

            //creamos el contenido del div
            const contenido = `
              <img src="${producto.foto}" alt="${producto.nombre}" class="card-img">
             <p>${producto.descripcion}</p>
             <p>$ ${producto.precio}</p>
             <a href="../templates/producto.html?id=${producto.id}"
             >Ver Producto</a>
             `
            //agregamos el contenido al div
            div.innerHTML = contenido;
            //agregamos el dic a la sección
            section.appendChild(div)
        





    }
})
   
  
  

}).catch((error) => alert("Ha ocurrido un error"))

    //llamamos la función para mostrar los resultados de la busqueda
   searcher.busqueda(datos);
       

    
    


