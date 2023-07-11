//DECLARAMOS UNA CLASE FRUTA CON SU CONSTRUCTOR Y METODO

class Fruta {
    constructor(nombre, precio, stock) {
        this.nombre = nombre;
        this.precio = precio;
        this.stock = stock;
    }
}

//INSTANCIAMOS OBJETOS DE LA CLASE FRUTA
const banana = new Fruta("banana", 600, 200);
const manzana = new Fruta("manzana", 500, 50);
const pomelo = new Fruta("pomelo", 1000, 0);
const naranja = new Fruta("naranja", 400, 500);
const mandarina = new Fruta("mandarina", 450, 200);
const pera = new Fruta("pera", 700, 10);

// creamos un array vacio
const arrayFrutas = [];

// creamos una funcion que nos ayude a agregar todas las frutas en el array directamente, sin importar la cantidad de articulos que haya.
// spread operator (operador de propagación)

const agregarFrutasAlArray = (...frutas) => {
    arrayFrutas.push(...frutas);
};
agregarFrutasAlArray(banana, manzana, pomelo, naranja, mandarina, pera);
console.log(arrayFrutas);

//Función que busca fruta por su nombre
const buscarFrutaPorNombre = (nombreFruta) => {
    return arrayFrutas.find(
        (fruta) => fruta.nombre.toLowerCase() === nombreFruta.toLowerCase()
    );
};

//Hacemos una función principal donde se ejecutan las otras funciones dentro.
const comprarFrutas = () => {
    const nombreFruta = prompt("Ingrese el nombre de la fruta:");
    const fruta = buscarFrutaPorNombre(nombreFruta);
    //busca la fruta, y si hay, pregunta la cantidad.
    if (fruta) {
        const cantidad = Number(
            prompt(`Ingrese la cantidad de ${nombreFruta}`)
        );
        //Si la cantidad solicitada es menor o igual al stock disponible, calculamos el precio total y actualizamos el stock
        if (fruta.stock >= cantidad) {
            const precioTotal = calcularPrecioTotal(fruta, cantidad);
            console.log(
                `Ha comprado ${cantidad} ${fruta.nombre} por un total de $${precioTotal}.`
            );
            actualizarStock(fruta, cantidad);
        } else {
            console.log(`No hay suficiente stock de ${fruta.nombre}.`);
        }
    } else {
        console.log(`No se encontró la fruta con el nombre ${nombreFruta}.`);
    }
    //Al finalizar el proceso, preguntamos si quiere seguir comprando y si es positivo, ejecutamos la funcion de nuevo
    const seguirComprando = prompt(
        "Quiere comprar otro producto?\n Ingrese 'si' o 'no' para salir"
    );
    if (seguirComprando.toLowerCase() === "si") {
        comprarFrutas();
    }
};

//Funcion que calcula el precio de cada artículo comprado
const calcularPrecioTotal = (fruta, cantidad) => {
    return fruta.precio * cantidad;
};

//Función que actualiza el Stock cada vez que compran
const actualizarStock = (fruta, cantidad) => {
    fruta.stock -= cantidad;
};

const calcularTotalCompra = (fruta) => {
    return fruta.precio;
};

//Ejecutamos la función principal
comprarFrutas();

//Filtramos únicamente las frutas disponibles luego de la compra y actualizar el stock.
const frutasDisponibles = arrayFrutas.filter((fruta) => fruta.stock > 0);

console.log("LUEGO DE SU COMPRA, TENEMOS DISPONIBLE:\n");
console.log(frutasDisponibles);
