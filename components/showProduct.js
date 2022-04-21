import { clientServices } from "./clientServices.js";
//función para crear el template

const crearTemplate=(foto,nombre,precio,descripcion,clase,id)=>{

   
    //creamos el div contendor
   const div=document.createElement("div");
   div.classList.add("card");

   //creamos el contenido del div
   const contenido=`
   <img src="${foto}" alt="${nombre}" class="card-img">
   <p>${descripcion}</p>
   <p>$ ${precio}</p>
   <a href="./templates/producto.html" id=${id}>Ver Producto</a>
   `
//agregamos el contenido al div
div.innerHTML=contenido;

return div;

}
//capturamos el seccion
const starWars=document.querySelector(".starWars");
const consolas=document.querySelector(".consolas_cards");
const diversos=document.querySelector(".diversos_cards");

//función para mostrar la lista de productos
clientServices.mostrarProducto().then((data)=>{
    //variables para adicionar clase oculta a las cards
  let starWars_cards=0;
  let consolas_cards=0;
  let varios_cards=0;
  
    data.forEach(({foto,nombre,precio,descripcion,clase,id})=>{

        const nuevaCard=crearTemplate(foto,nombre,precio,descripcion,clase,id);
        if(clase==='star_wars'){
            starWars.appendChild(nuevaCard)
            starWars_cards++;
            if(starWars_cards>4){
                nuevaCard.classList.add("oculta")
            }
            
        }
        else if(clase==='consoles'){
            
           consolas.appendChild(nuevaCard)
           consolas_cards++;
            if(consolas_cards>4){
                nuevaCard.classList.add("oculta")
            }
           
        }
        else{
            diversos.appendChild(nuevaCard)
            varios_cards++
            if(varios_cards>4){
              nuevaCard.classList.add("oculta")
            }
          
        }
        
    })
}).catch((error)=>alert("Ha ocurrido un error"))
