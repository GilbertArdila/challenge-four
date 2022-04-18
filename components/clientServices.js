//creamos los métodos para el http request
const url=' http://localhost:3000/producto';

//POST Crear producto
const crearProducto=(foto,nombre,precio,descripcion,clase)=>{
      return fetch(url,{
          method:'POST',
          headers:{
              'Content-type':'application/json'
          },
          //convertimos los datos que recibimos por párametro en string y creamos el id automaticamente
          body:JSON.stringify({foto,nombre,precio,descripcion,clase,id:uuid.v4})
      })
}



export const clientServices={
    crearProducto,
}