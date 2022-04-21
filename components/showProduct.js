import { clientServices } from "./clientServices.js";



//declaracion de constantes y variables
const datos = [];
let productos;
const buscador = document.querySelector(".header-searcher__input")
const coincidencia = document.querySelector(".coincidencia");
const textoBusqueda=document.querySelector(".show_coincidences");
//capturamos el seccion
const starWars = document.querySelector(".starWars");
const consolas = document.querySelector(".consolas_cards");
const diversos = document.querySelector(".diversos_cards");


//función para crear el template
const crearTemplate = (foto, nombre, precio, descripcion, clase, id) => {
    //creamos el div contendor
    const div = document.createElement("div");
    div.classList.add("card");

    //creamos el contenido del div
    const contenido = `
   <img src="${foto}" alt="${nombre}" class="card-img">
   <p>${descripcion}</p>
   <p>$ ${precio}</p>
   <a href="./templates/producto.html" id=${id}>Ver Producto</a>
   `
    //agregamos el contenido al div
    div.innerHTML = contenido;

    return div;

}


//función para mostrar la lista de productos
clientServices.mostrarProducto().then((data) => {
    //variables para adicionar clase oculta a las cards
    let starWars_cards = 0;
    let consolas_cards = 0;
    let varios_cards = 0;

    datos.push(data);
    productos = datos[0]


    data.forEach(({ foto, nombre, precio, descripcion, clase, id }) => {

        const nuevaCard = crearTemplate(foto, nombre, precio, descripcion, clase, id);
        if (clase === 'star_wars') {
            starWars.appendChild(nuevaCard)
            starWars_cards++;
            if (starWars_cards > 4) {
                nuevaCard.classList.add("oculta")
            }

        }
        else if (clase === 'consoles') {

            consolas.appendChild(nuevaCard)
            consolas_cards++;
            if (consolas_cards > 4) {
                nuevaCard.classList.add("oculta")
            }

        }
        else {
            diversos.appendChild(nuevaCard)
            varios_cards++
            if (varios_cards > 4) {
                nuevaCard.classList.add("oculta")
            }

        }

    })


}).catch((error) => alert("Ha ocurrido un error"))



//funcion para el buscador
 buscador.addEventListener("keyup", () => {
    
    //vaciamos el template
    coincidencia.innerHTML = "";
    const busqueda = buscador.value.toLowerCase();

    //recorremos el objeto productos
    productos.forEach(producto => {
        //capturamos las descripciones de cada producto
        let descripcion = producto.descripcion.toLowerCase();
       

        //buscamos las coincidencias
        if (descripcion.indexOf(busqueda) !== -1) {
             textoBusqueda.classList.add("show")
             
            //adicionamos las cards al section
            coincidencia.innerHTML += `
              <div class="card busqueda">
              <img src="${producto.foto}" alt="${producto.nombre}" class="card-img">
              <p>${producto.descripcion}</p>
              <p>$ ${producto.precio}</p>
              <a href="./templates/producto.html" id=${producto.id}>Ver Producto</a>
              </div>
              `
             
        }
        //si el buscador no tiene nada escrito
        if(buscador.value===""){
            textoBusqueda.classList.remove("show")
            var remover=document.querySelector(".busqueda")
            coincidencia.removeChild(remover);
           
           
        }
        //si no se halló coincidencia se quitan los resultados que se venian mostrando hasta el momento
        if(coincidencia.innerHTML===''){
            textoBusqueda.classList.remove("show")
        }
        
        
    })


})