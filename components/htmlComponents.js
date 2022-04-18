class   Header extends HTMLElement{
    constructor(){
        super();
    };

    connectedCallback(){
        this.innerHTML = `
        <section class="header-up-section">
          <img src="../img/Logo.png" alt="logo aluraGeek" class="header-logo">
          <a href="../index.html" class="header-button">Inicio</a>
          <img src="../img/find.png" alt="buscador" class="header-searcher__logo" id="header-searcher__logo">
          <input class="header-searcher__input" id="header-searcher__input" placeholder="¿Qué deseas buscar?"></input>
       
        </section>
        `;
    }
}
customElements.define('header-component',Header);

class Contacto extends HTMLElement{
    constructor(){
        super();
    };

    connectedCallback(){
        this.innerHTML=`
    <section class="contacto">
        <div class=" politica-img">
            <img src="../img/Logo.png" alt="logo alura-geek">
        </div>
        <section class="politicas">
            <a href="#">Quienes somos</a>
            <a href="#">Politicas de seguridad</a>
            <a href="#">Programa de fidelidad</a>
            <a href="#">Nuestras tiendas</a>
            <a href="#">Quiero una franquicia</a>
            <a href="#">Anuncia aqu&iacute;</a>
        </section>
        <section class="formulario">
            <h3 class="titulo">Cont&aacute;ctanos</h3>
            <form action="#" class="contac-us">
                <input type="text" name="nombre" id="nombre" placeholder="Nombre">
                <textarea  id="mensaje"placeholder="Escribe tu mensaje"></textarea>
                <button type="button" class="form-button">Enviar mensaje</button>
            </form>
        </section>
    </section>        
        `
    }
}
customElements.define('contacto-component',Contacto);

class Footer extends HTMLElement{
    constructor(){
        super();
    };

    connectedCallback(){
        this.innerHTML=`
    <footer>
        <p>Desarrollado por Gilbert Ardila</p>
        <p>2022</p>
    </footer>     
        `
    }
}
customElements.define('footer-component',Footer);