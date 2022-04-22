import { clientServices } from "./clientServices.js";




//función para el template de todos.html
const templateTodos=(foto, nombre,precio,descripcion,clase,id)=>{


  //creamos el div contenedor de la card 
  const div = document.createElement("div");
  div.classList.add("todos-cards__card");

  //creamos el contenido del div contenedor
  const contenido=`
  <div class="product-img one">
  <img src="${foto}" alt="${nombre}" class="card-img">
  </div>
  <h3 class="title">${descripcion}</h3>
  <p class="price">$${precio}</p>
  <a href="../templates/producto.html" id=${id}>Ver Producto</a>
  `
 //agregamos el contenido al div
 div.innerHTML=contenido;
 
 return div
}

 


const obtenerDatosProductos=async(idLink)=>{
    //obtenemos el id del link para saber que productos mostrar
   
    const id=idLink

    //verificamos que el id no esté vacío
    if(id===null){
        window.location.href="../index.html";
    }
   
 

    try{
        //llamamos la funcion para mostrar los productos
        const productos= await clientServices.mostrarProducto();
        
       
        
        productos.forEach(producto=>{
            if(producto.clase===id){
                console.log(producto.descripcion)
               const nuevo_card= templateTodos(producto.foto,producto.nombre,producto.precio,producto.descripcion,producto.clase,producto.id);
               console.log(nuevo_card)

                
               // window.location.href="../templates/todos.html"
                
                
                
            }
        })

    }catch(error){
        alert("error en todos"+error)
        // window.location.href="../index.html"
    }
    
}

function pintarProductos(){

}


export const obtener={
    obtenerDatosProductos
}