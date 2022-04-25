const url=' http://localhost:3000/producto';
//guardamos el valor del sessionStora en una variable para saber que imagenes debemos mostrar
const idLink=sessionStorage.getItem("id");
//capturamos el section para mostrar los datos
const section=document.querySelector(".todos-cards")
const buscador = document.querySelector(".header-searcher__input")
const coincidencia = document.querySelector(".coincidencia");
const textoBusqueda = document.querySelector(".show_coincidences");


const datos = [];
let productos;

   //función para crear el template
    const crearTemplateTodos = (foto, nombre, precio, descripcion, clase, id) => {
       //creamos el div contendor
       const div = document.createElement("div");
       div.classList.add("todos-cards__card");
   
       //creamos el contenido del div
       const contenido = `
       <div class="product-img">
      <img src="${foto}" alt="${nombre}">
      </div>
      <h3 class="title">${descripcion}</h3>
      <p class="price">$${precio}</p>
      <a href="../templates/producto.html" id=${id} >Ver Producto</a>
      
      `
       //agregamos el contenido al div
       div.innerHTML = contenido;
   
       return div;
   
   }



   const mostrarProductoPorClase=async ()=>{
    const respuesta = await fetch(url);
    return await respuesta.json();
   
}
  
 //función para mostrar la lista de productos
mostrarProductoPorClase().then((data) => {
    //para el titulo que se muestra
    let tituloClase="";
    const titulo=document.querySelector(".todos-title")
    if(data[0].clase==='star_wars'){
        tituloClase="Star Wars"
    }
    else if(data[0].clase==="consoles"){
        tituloClase ='Consolas'
    }else{
        tituloClase='otros'
    }
   
   
   

 data.forEach(({ foto, nombre, precio, descripcion, clase, id }) => {
    const nuevaCard = crearTemplateTodos(foto, nombre, precio, descripcion, clase, id);
    if (clase ===idLink ) {
        datos.push(data);
        productos = datos[0]
     
        section.appendChild(nuevaCard)
        if(idLink==='star_wars'){
            tituloClase="Star Wars"
        }
        else if(idLink==="consoles"){
            tituloClase ='Consolas'
        }else{
            tituloClase='Diversos'
        }
    }
    titulo.innerText="Estas viendo productos de la clase "+tituloClase
    
    

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
            
            //corroboramos que sean de la misma clase para mostrar las coincidencias del buscador
            if(producto.clase===idLink){
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
