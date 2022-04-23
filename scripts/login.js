//capturamos los elemento del input para hacer la verificación del usuario
const formulario=document.querySelector("[data-form]");
const button=document.querySelector("[data-button]");
const email=document.querySelector("[data-email]");
const password=document.querySelector("[data-password]");

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
   

    usuarios.forEach(usuario=>{
        
        if( usuario.email===email.value && usuario.password===password.value){
            if(email.value==='admin@gmail.com'){
                window.location.href='../templates/productosAdmin.html';
            }
           
        }else{
            window.location.href='../index.html';
        }
})
});



