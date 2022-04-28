import { searcher } from "../components/searcher.js";
import { clientServices } from "../components/clientServices.js";


(()=>{




const url=' http://localhost:3000/producto';
//obtenemos los elementos del html
const section=document.querySelector(".crud-cards");

//declaramos la lista de productos
const datos = [];
let productos;

//funcion para crear el template de los cards
 const crudTemplate=(foto, nombre, precio, descripcion, clase, id)=>{

    //creamos el div contenedor
    const div=document.createElement("div");
    div.classList.add("crud-cards__card");

    //creamos el contenido del div
    const contenido=`
    <div class="product-img one">
    <img src="${foto}" alt="">
    <a class="delete" href="#" id="${id}"></a>
    <a class="edit" href="../templates/edit.html?id=${id}"></a>
    </div>
    <h3 class="title">${nombre}</h3>
    <p class="price">$${precio}</p>
    <p class="id">#${id}</p>
    `
    //agregamos el contenido al div
    div.innerHTML=contenido;

    //capturamos el a para la función eliminar
    const eliminar=div.querySelector(".delete");
    eliminar.addEventListener("click",()=>{
       const id=eliminar.id;
       let respuesta=confirm("¿Desea eliminar el producto?")
       if(respuesta){
         
         clientServices.eliminarProducto(id).then(respuesta=>{
             alert("El producto se ha eliminado")
         }).catch(error=>alert("Ha habido un error al tratar de eliminar el producto"));
       }
       
    })

    return div

 }

 //llamamos la función mostrarProducto
clientServices.mostrarProducto().then((data) => {
   //llenamos la lista con los productos para mostrarlos con el buscador
    datos.push(data);
    productos = datos[0]
    //llamamos la función para el buscador pasandole como parámetro la lista de productos
    searcher.busquedaEditar(productos)

    //recorremos la respuesta para pintar cada card
    data.forEach(({ foto, nombre, precio, descripcion, clase, id }) => {
            //llamamos la función para crear el template
       const nuevaCard = crudTemplate(foto, nombre, precio, descripcion, clase, id);
       
           section.appendChild(nuevaCard)
       
       
       
   
   })
     
   
   }).catch((error) => alert("Ha ocurrido un error en el crud"))
})();
