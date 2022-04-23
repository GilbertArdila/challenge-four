
const url=' http://localhost:3000/producto';
//guardamos el valor del sessionStora en una variable para saber que imagenes debemos mostrar
const idLink=sessionStorage.getItem("id");
//capturamos el section para mostrar los datos
const section=document.querySelector(".todos-cards")

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

    
        

    
    



