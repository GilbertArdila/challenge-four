const contactForm=document.querySelector(".contac-us");
const nombre=document.querySelector(".name");
const mensaje=document.querySelector("#mensaje");
const formButon=document.querySelector(".btn");
const avisoNombre=document.querySelector(".avisoNombre");
const avisoMensaje=document.querySelector(".avisoMensaje");
const mail=document.querySelector("#email");
const avisoMail=document.querySelector(".avisoMail")


/*Función para validar los campos del contactForm*/

const formValidation=()=>{
   
   if(nombre.value===""){
       avisoNombre.style.color="red"
       avisoNombre.innerText="Ingresa tu nombre por favor"
   }else{
    avisoNombre.innerText=""
   }
   if(mensaje.value==="" || mensaje.value===undefined){
       avisoMensaje.style.color="red";
       avisoMensaje.innerText="Debes ingresar un mensaje a enviar"
   }else{
    avisoMensaje.innerText="";
   }
   if(mail.value===""){
       avisoMail.style.color="red";
       avisoMail.innerText="Ingresa tu mail por favor"
   }else{
    avisoMail.innerText="";
   }
   if(nombre.value!="" && mail.value!="" &&(mensaje.value!="" || mensaje.value!=undefined)){
       mostrarMensajes("Exito!","Tu mensaje se ha enviado correctamente","#");
       contactForm.reset()
   }

}
formButon.addEventListener("click",formValidation);

/* función para mostrar mensaje de enviado */


 const mostrarMensajes=(titulo,body,pageAdress)=>{
    const container=document.createElement("div");
    container.classList.add("messages-container");

    const mensaje=`
       <h2 class="messages-container__title">${titulo}</h2>
       <p class="messages-container__body">${body}</p>
       <button class="messages-container__buton">Cerrar</button> 
    
    `
    container.innerHTML=mensaje;
    const section=document.querySelector(".contacto");
    section.appendChild(container)

    const botonMensaje=document.querySelector(".messages-container__buton")
     botonMensaje.addEventListener("click",function(){
        section.removeChild(container)
        window.location.href=pageAdress;
     })
}


export const mensajes={
    mostrarMensajes,
}