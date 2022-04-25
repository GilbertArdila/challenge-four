const buscador = document.querySelector(".header-searcher__input")
const coincidencia = document.querySelector(".coincidencia");
const textoBusqueda = document.querySelector(".show_coincidences");

function buscar(productos){


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
}
export const funcionBuscador={
    buscar
}