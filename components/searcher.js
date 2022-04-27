const buscador = document.querySelector(".header-searcher__input");
const coincidencia = document.querySelector(".coincidencia");
const textoBusqueda = document.querySelector(".show_coincidences");


const busqueda=(productos)=>{
      buscador.addEventListener("keyup",()=>{
  //vaciamos el section
  coincidencia.innerHTML = "";
  //asignamos la busqueda a la variable en minúscula
  const busqueda = buscador.value.toLowerCase();

  //recorremos el objeto productos
  productos.forEach(producto => {
    //capturamos las descripciones de cada producto en minúscula
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


});

      })
};
/*busqueda en editar*/ 
const busquedaEditar=(productos)=>{
    buscador.addEventListener("keyup",()=>{
//vaciamos el section
coincidencia.innerHTML = "";
//asignamos la busqueda a la variable en minúscula
const busqueda = buscador.value.toLowerCase();

//recorremos el objeto productos
productos.forEach(producto => {
  //capturamos las descripciones de cada producto en minúscula
  let descripcion = producto.descripcion.toLowerCase();


  //buscamos las coincidencias
  if (descripcion.indexOf(busqueda) !== -1) {
      textoBusqueda.classList.add("show")

      //adicionamos las cards al section
      coincidencia.innerHTML += `
      <div class="card busqueda">
      <div class="product-img one">
      <img src="${producto.foto}" alt="" class="card-img">
      <a class="delete" href="#" id="${producto.id}"></a>
      <a class="edit" href="../templates/edit.html?id=${producto.id}"></a>
      </div>
      <h3 class="title">${producto.nombre}</h3>
      <p class="price">$${producto.precio}</p>
      <p class="id">#${producto.id}</p>
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


});

    })
};
export const searcher={
    busqueda,
    busquedaEditar
}