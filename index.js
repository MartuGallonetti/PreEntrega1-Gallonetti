//DECLARAMOS LAS FUNCIONES

const comprarFruta = (fruta) => {
    fruta.cantidad += Number(
        prompt(
            `el kilo de ${fruta.nombre} sale $${fruta.precio}  cuantos kilos de ${fruta.nombre} agrega?`
        )
    );
    respuesta = prompt(
        `Ingresa la letra b para banana, la letra m para manzana y la letra p para pomelo. Ingresa la letra x para salir`
    );
};

const conIva = () => {
    return total() * 1.21;
};

const total = () => {
    return banana.precioTotal() + manzana.precioTotal() + pomelo.precioTotal();
};

const compra = () => {
    alert(`El precio total por la compra de ${
        banana.cantidad
    } kilos de bananas es: $${banana.precioTotal()}\n
El precio total por la compra de ${
        manzana.cantidad
    } kilos de manzanas es: $${manzana.precioTotal()}\n
El precio total por la compra de ${
        pomelo.cantidad
    } kilos de de pomelos es: $${pomelo.precioTotal()}\n
El Precio total sin IVA es: $${total()}\n    
    `);
};

const compraConIva = () => {
    alert(`El precio total por la compra de ${
        banana.cantidad
    } kilos de bananas es: $${banana.precioTotal()}\n
El precio total por la compra de ${
        manzana.cantidad
    } kilos de manzanas es: $${manzana.precioTotal()}\n
El precio total por la compra de ${
        pomelo.cantidad
    } kilos de de pomelos es: $${pomelo.precioTotal()}\n
El Precio total sin IVA es: $${total()}\n
El precio Final IVA incluído es: $${conIva()}
    `);
};

//DECLARAMOS UNA CLASE FRUTA CON SU CONSTRUCTOR Y METODO

class Fruta {
    constructor(nombre, precio, cantidad) {
        this.nombre = nombre;
        this.precio = precio;
        this.cantidad = cantidad;
    }
    precioTotal() {
        return this.precio * this.cantidad;
    }
}

//INSTANCIAMOS OBJETOS DE LA CLASE FRUTA
const banana = new Fruta("banana", 600, 0);
const manzana = new Fruta("manzana", 500, 0);
const pomelo = new Fruta("pomelo", 1000, 0);

let respuesta = prompt(
    `Ingresa la letra b para banana, la letra m para manzana y la letra p para pomelo. Ingresa la letra x para salir`
);
//MIENTRAS EL CLIENTE NO ESCRIBA LA LETRA x PODRÁ COMPRAR FRUTAS
while (respuesta != "x") {
    if (respuesta == "b") {
        comprarFruta(banana);
    } else if (respuesta == "m") {
        comprarFruta(manzana);
    } else if (respuesta == "p") {
        comprarFruta(pomelo);
    } else {
        respuesta = prompt(
            `Ingresa la letra b para banana, la letra m para manzana y la letra p para pomelo. Ingresa la letra x para salir`
        );
    }
}
//EJECUTAMOS LA FUNCION QUE CALCULA EL TOTAL
total();

let factura = prompt(`Necesitas factura? Si queres, escribi si sino no`);
//SI EL CLIENTE QUIERE FACTURA LLAMAMOS A LA FUNCION QUE CALCULA LA COMPRA CON IVA, O SINO LA COMPRA SIN IVA
if (factura == "si") {
    compraConIva();
} else {
    compra();
}
