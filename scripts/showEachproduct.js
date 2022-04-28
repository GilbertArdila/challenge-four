import { clientServices } from "../components/clientServices.js";
import { searcher } from "../components/searcher.js";


(()=>{




const section = document.querySelector(".main-product")
const relatedProducts = document.querySelector(".related-products__cards");

let claseProducto;
//declaramos la lista de productos
const datos = [];
let id;

//obtenemos los datos del producto a editar
const obtenerDatosProducto = async () => {
    //obtenemos el id del cliente a actualizar con el id que le pasamos al href en el template de showProducts.js
    const url = new URL(window.location);
    id = url.searchParams.get("id");
    //verificamos que el id no esté vacío
    if (id === null) {

        window.location.href = "../index.html"
    }
    try {
        const producto = await clientServices.datosProducto(id);

        claseProducto = producto.clase

        const nueva_card = crearTemplateProducto(producto.foto, producto.nombre, producto.precio, producto.descripcion, producto.clase, producto.id);
        section.appendChild(nueva_card);

    } catch (error) {
        alert("se ha generado un error " + error)
    }
}




//función para crear el template del producto seleccionado
const crearTemplateProducto = (foto, nombre, precio, descripcion, clase, id) => {
    //creamos el div contendor
    const div = document.createElement("div");
    div.classList.add("card");

    //creamos el contenido del div
    const contenido = `
  
          <div class="photo">
          <img src="${foto}" alt="${nombre}" class="card-img"></div>
            <div class="main-product__text">
                <h3 class="title">${nombre}</h3>
                <p class="price">$ ${precio}</p>
                <p class="description">${descripcion}</p>
                
            </div>
   `
    //agregamos el contenido al div
    div.innerHTML = contenido;

    return div;

}

//funcion para captar los datos de todos los productos y mostrar los relacionados con el producto elegido
clientServices.mostrarProducto().then((data) => {
    data.forEach(producto => {
        //verificamos la clase de los productos para mostrar solo los relacionados
        if (producto.clase === claseProducto) {
            //verificamos el id para no mostrar el producto en sí en la sección de relacionados
            if (id != producto.id) {
               datos.push(producto)
               
                const div = document.createElement("div");
                div.classList.add("card");
                const contenido = `
                  <img src="${producto.foto}" alt="${producto.nombre}" class="card-img">
                 <p>${producto.descripcion}</p>
                 <p>$ ${producto.precio}</p>
                 <a href="../templates/producto.html?id=${producto.id}"
                 >Ver Producto</a>
                 `
                //agregamos el contenido al div
                div.innerHTML = contenido;
                relatedProducts.appendChild(div)
            }





        }
    })


})

//llamamos la función para obtener los datos del producto
obtenerDatosProducto()
//mandamos a llamar la función para mostrar los productos buscados

searcher.busqueda(datos)

})();
