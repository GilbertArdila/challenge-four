import { mensajes } from "../components/contact.js";

(()=>{




//regex
const regex_password=new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@$#*])(?!.*[ +-/_=]).{6,12}$/)

const regex_email=new RegExp(/^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/)

//capturamos los elemento del input para hacer la verificación del usuario
const formulario=document.querySelector("[data-form]");
const button=document.querySelector("[data-button]");
const email=document.querySelector("[data-email]");
const password=document.querySelector("[data-password]");
const mensajeMail=document.querySelector(".mail");
const mensajePassword=document.querySelector(".password");

//creamos un objeto con los usuarios permitidos
const usuarios=[
   {
       'email':'admin@gmail.com',
       'password':'@Dmin123',
       'id':1
   }
   
];

//al hacer click en el botón verificamos si el usuario es permitido o no y lo redirigimos
button.addEventListener("click",(event)=>{
    event.preventDefault();

    verificar()
    if(mensajeMail.innerText==="" && mensajePassword.innerText===""){
        usuarios.forEach(usuario=>{
        
            if( usuario.email===email.value && usuario.password===password.value){
                if(email.value==='admin@gmail.com'){
                    window.location.href='../templates/productosAdmin.html';
                }
               
            }else{
                mensajes.mostrarMensajes("Usuario incorrecto","Parece que has introducido mal tus datos de ingreso, por favor verifica","../index.html")
            }
    })
    }

   
});
//función para verificar los campos del formulario

function verificar(){
    if(email.value==="" ){
        mensajeMail.style.color="red"
        mensajeMail.innerText=("Por favor ingrese su correo electronico")
       
    }else if(regex_email.test(email.value)===false){
        mensajeMail.style.color="red"
        mensajeMail.innerText=("Por favor ingrese una dirección de  correo valida")
        
    }else{
        mensajeMail.innerText="";
        return true
    }
    if( password.value===""){
        mensajePassword.style.color="red"
        mensajePassword.innerText=("Ingrese su password por favor")
        
    }else if(regex_password.test(password.value)===false){
        mensajePassword.style.color="red"
        mensajePassword.innerText=("Contraseña invalida")
        
    }else{
        mensajePassword.innerText=""
        
    }
    
}


})();