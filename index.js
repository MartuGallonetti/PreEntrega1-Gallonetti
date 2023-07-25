//DECLARAMOS UNA CLASE FRUTA CON SU CONSTRUCTOR

class Fruta {
    constructor(nombre, precio, stock, imagen, id) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
        this.imagen = imagen;
        this.id = id;
    }
}

//INSTANCIAMOS OBJETOS DE LA CLASE FRUTA
const banana = new Fruta(
    "banana",
    600,
    200,
    "../recursos/imagenDeBanana.jpg",
    1
);
const manzana = new Fruta(
    "manzana",
    500,
    50,
    "../recursos/imagenDeManzana.jpg",
    2
);
const pomelo = new Fruta(
    "pomelo",
    1000,
    0,
    "../recursos/imagenDePomelo.jpg",
    3
);
const naranja = new Fruta(
    "naranja",
    400,
    500,
    "../recursos/imagenDeNaranja.jpg",
    4
);
const mandarina = new Fruta(
    "mandarina",
    450,
    200,
    "../recursos/imagenDeMandarina.jpg",
    5
);
const pera = new Fruta("pera", 700, 10, "../recursos/imagenDePera.jpg", 6);
// creamos un array vacio
const arrayFrutas = [];

// creamos una funcion que nos ayude a agregar todas las frutas en el array directamente, sin importar la cantidad de articulos que haya.
// spread operator (operador de propagación)

const agregarFrutasAlArray = (...frutas) => {
    arrayFrutas.push(...frutas);
};
//Ejecutamos la funcion
agregarFrutasAlArray(banana, manzana, pomelo, naranja, mandarina, pera);

//DOM
//Declaramos variables que su objetivo sea crear un "div" y le asignamos las respectivas clases
const plantillaCard = document.createElement("div");
plantillaCard.setAttribute("class", "col-md-4");
const noResultados = document.createElement("div");
const divTabla = document.createElement("div");

//Funcion que se ejecuta cuando no se obtienen resultados en la busqueda.
const noResul = () => {
    noResultados.innerHTML = `
<h2> No se encontraron resultados </h2>
`;
    container.appendChild(noResultados);
};
//Creamos un carrito que obtiene el contenido del localstorage o genera un array vacio
const carrito = JSON.parse(localStorage.getItem("carrito")) || [];
//Armamos la plantilla de la card.
plantillaCard.innerHTML = `
<div class="card" style="width: 18rem">
                            <img                         
                                class="card-img-top"
                            />
                            <div class="card-body">
                                <h5 class="card-title">       </h5>
                                <p class="card-text"></p>
                                <button class="btn btn-primary btn-comprar"
                                    >Añadir al carrito</button
                                >
                            </div>
`;

//Capturamos del dom.
const container = document.getElementById("cards-container");
const inputBusqueda = document.getElementById("textoDeBusqueda");
const botonBusqueda = document.getElementById("boton-buscar");
const cuerpoTabla = document.getElementById("tabla");
const limpiarLs = document.getElementById("limpiar-ls");
const botonMostrarTodos = document.getElementById("boton-mostrar-todos");

// Funcion que crea una card vacia con cada elemento que recorre del array de frutas y
//  asigna la data correspondiente en cada card en pantalla, incluyendo el boton dinamico que ejecuta la funcion
// para agregar al carrito
const renderizar = (contenido) => {
    contenido.forEach((fruta) => {
        const card = plantillaCard.cloneNode(true);
        card.querySelector(".card-title").textContent = fruta.nombre;
        card.querySelector(".card-text").textContent = "$ " + fruta.precio;
        card.querySelector(".card-img-top").setAttribute("src", fruta.imagen);
        card.querySelector(".btn-comprar").setAttribute(
            "onclick",
            `agregarAlCarrito(${fruta.id})`
        );
        container.appendChild(card);
    });
};

//Funcion que rellena la tabla con la información del array carrito.
const mostrarTabla = (carrito) => {
    // Limpiamos la tabla antes de agregar los nuevos productos para evitar duplicados
    cuerpoTabla.innerHTML = "";
    // Recorremos el carrito para dibujar cada producto en la tabla
    carrito.forEach((producto) => {
        let filaTabla = document.createElement("tr");
        filaTabla.setAttribute("class", "carga");
        filaTabla.innerHTML = `
            <th scope="row">${producto.nombre}</th>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
        `;
        cuerpoTabla.appendChild(filaTabla);
    });
};

//Funcion que añade fruta si la encuentra al carrito
const agregarAlCarrito = (idFruta) => {
    const idEncontrado = buscarFrutaPorId(arrayFrutas, idFruta);
    const idEnCarrito = buscarFrutaPorId(carrito, idFruta);
    if (idEnCarrito.length !== 0) {
        //Si el carrito tiene algun item, le suma 1 unidad a la prop cantidad.
        idEnCarrito[0].cantidad += 1;
        limpiarTabla();
        mostrarTabla(carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito)); // guardamos la actualizacion en el LS
    } else {
        //Si ese art no está en el carrito, le añadimos la propiedad cantidad con el  valor 1 y hacemos push
        const productoNuevo = { ...idEncontrado[0], cantidad: 1 };
        carrito.push(productoNuevo);
        limpiarTabla();
        mostrarTabla(carrito);
        localStorage.setItem("carrito", JSON.stringify(carrito)); //en este caso tambien añadimos al LS
    }
};

//FUNCION QUE VACIA EL CARRITO tanto en el array como en el LS
const vaciarCarrito = () => {
    carrito.length = 0;
    localStorage.removeItem("carrito");
    limpiarTabla();
    mostrarTabla(carrito);
};

//Funcion para buscar frutas mediante el id
const buscarFrutaPorId = (array, idFruta) => {
    return array.filter((fruta) => fruta.id === Number(idFruta));
};

//Función que busca fruta por su nombre
const buscarFrutaPorNombre = (nombreFruta) => {
    return arrayFrutas.filter(
        (fruta) => fruta.nombre.toLowerCase() === nombreFruta.toLowerCase()
    );
};

//Funcion para limpiar tabla
const limpiarTabla = () => {
    divTabla.innerHTML = "";
};
//Funcion para limpiar la pantalla que limpia la zona de las cards, y vacia el input de lo buscado
//lo utilizamos en el boton volver de la funcion noResul
const limpiar = () => {
    container.innerHTML = "";
    inputBusqueda.value = "";
};
//Funcion que limpia la pantalla y vuelve a renderizar el array de frutas, para utilizar luego de un a busqueda
const mostrarTodos = () => {
    limpiar();
    renderizar(arrayFrutas);
};
//Escuchamos el evento click del boton de busqueda y si no encuentra nada, ejecuta la funcion noResul.
//Caso contrario, utiliza la funcion renderizar pero no sobre el array de frutas, sino sobre el array que devuelve
//el metodo filter que utilizamos para la busqueda.
botonBusqueda.addEventListener("click", () => {
    const busqueda = buscarFrutaPorNombre(inputBusqueda.value);
    limpiar();
    if (busqueda.length === 0) {
        noResul();
    } else {
        renderizar(busqueda);
    }
});
//Escuchamos el boton de mostrar todos que ejecuta la funcion para que muestre nuevamente todas las frutas.
botonMostrarTodos.addEventListener("click", () => {
    mostrarTodos();
});
//Escuchamos el boton de vaciar carrito, y se ejecuta la funcion de vaciarCarrito
limpiarLs.addEventListener("click", () => {
    vaciarCarrito();
});

//Ejecutamos las funciones generales que son para dibujar las cards y para mostrar la tabla que contiene
//los articulos añadidos al carrito. Puede estar vacio como tener info, segun el LS y el array carrito
renderizar(arrayFrutas);
mostrarTabla(carrito);
