const url=' http://localhost:3000/producto';
//obtenemos los elementos del html
const section=document.querySelector(".crud-cards");
const buscador = document.querySelector(".header-searcher__input")
const coincidencia = document.querySelector(".coincidencia");
const textoBusqueda = document.querySelector(".show_coincidences");
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
    <a class="delete" href="#"></a>
    <a class="edit" href="../templates/edit.html"></a>
    </div>
    <h3 class="title">${nombre}</h3>
    <p class="price">$${precio}</p>
    <p class="id">#${id}</p>
    `
    //agregamos el contenido al div
    div.innerHTML=contenido;
    return div

 }
//funcion para mostrar los productos
const mostrarProductosCrud=async ()=>{
    const respuesta = await fetch(url);
    return await respuesta.json();
   
}
 //llamamos la función y le pasamos los datos
 mostrarProductosCrud().then((data) => {
   //llenamos la lista con los productos para mostrarlos con el buscador
    datos.push(data);
    productos = datos[0]
    //recorremos la respuesta para pintar cada card
    data.forEach(({ foto, nombre, precio, descripcion, clase, id }) => {
            //llamamos la función para crear el template
       const nuevaCard = crudTemplate(foto, nombre, precio, descripcion, clase, id);
       
           section.appendChild(nuevaCard)
       
       
       
   
   })
     
   
   }).catch((error) => alert("Ha ocurrido un error en el crud"))
  

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
              <div class="product-img one">
              <img src="${producto.foto}" alt="${producto.nombre}" class="card-img">
              <a class="delete" href="#"></a>
              <a class="edit" href="#"></a>
              </div>
              <h3 class="title">${producto.nombre}</h3>
              <p class="price">$${producto.precio}</p>
              <p class="id">#${producto.id}</p>
            
              `
             
        }
        //si el buscador no tiene nada escrito
        if (buscador.value === "") {
            textoBusqueda.classList.remove("show")
            var remover = document.querySelector(".busqueda")
            coincidencia.removeChild(remover);


        }
        //si no se halló coincidencia se quitan los resultados que se venian mostrando hasta el momento
        if (coincidencia.innerHTML === '') {
            textoBusqueda.classList.remove("show")
        }


    })


})