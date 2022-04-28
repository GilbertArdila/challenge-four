import { clientServices } from "../components/clientServices.js"; 
import { searcher } from "../components/searcher.js";


(()=>{



//lista para guardar los productos que nos trae el llamado a mostrarProducto
const datos = [];


//capturamos cada seccion 
const starWars = document.querySelector(".starWars");
const consolas = document.querySelector(".consolas_cards");
const diversos = document.querySelector(".diversos_cards");




//función para mostrar la lista de productos en index.html
clientServices.mostrarProducto().then((data) => {
    //variables para adicionar clase oculta a las cards
    let starWars_cards = 0;
    let consolas_cards = 0;
    let varios_cards = 0;
     

    //para mostrar el resultado de la busqueda
    datos.push(data);
    let productos = datos[0]
   

   //recorremos la data que traemos del .json
    data.forEach(({ foto, nombre, precio, descripcion, clase, id }) => {
         //creamos el div contendor
        const div = document.createElement("div");
        div.classList.add("card");
       //creamos el contenido del div
        const contenido = `
       <img src="${foto}" alt="${nombre}" class="card-img">
       <p>${descripcion}</p>
       <p>$ ${precio}</p>
       <a href="./templates/producto.html?id=${id}"
       >Ver Producto</a>
       `
       //agregamos el contenido al div
       div.innerHTML = contenido;
       //verificamos la clase de cada producto para agregarlo al lugar correspondiente

       
        if (clase === 'star_wars') {
            starWars.appendChild(div)
            starWars_cards++;
            //verificamos el número de cards para mostrar solo 4 en tablets y mobiles
            if (starWars_cards > 4) {
                div.classList.add("oculta")
            }

        }
        else if (clase === 'consoles') {

            consolas.appendChild(div)
            consolas_cards++;
            if (consolas_cards > 4) {
                div.classList.add("oculta")
            }

        }
        else {
            diversos.appendChild(div)
            varios_cards++
            if (varios_cards > 4) {
                div.classList.add("oculta")
            }

        }

         //llamamos la función para buscar los productos pasandole la lista de productos como parámetro 
          searcher.busqueda(productos)

    })


}).catch((error) => alert("Ha ocurrido un error !!!"))


})();









