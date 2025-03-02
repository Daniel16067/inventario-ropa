// Clase base (Abstracción)
class Producto {
    constructor(nombre, cantidad, precio) {
        if (this.constructor === Producto) {
            throw new Error("No se puede instanciar una clase abstracta.");
        }
        this._nombre = nombre;
        this._cantidad = cantidad;
        this._precio = precio;
    }

    // Métodos Getters y Setters (Encapsulamiento)
    get nombre() { return this._nombre; }
    set nombre(nombre) { this._nombre = nombre; }

    get cantidad() { return this._cantidad; }
    set cantidad(cantidad) { this._cantidad = cantidad; }

    get precio() { return this._precio; }
    set precio(precio) { this._precio = precio; }

    // Método abstracto
    mostrar() {
        throw new Error("Método abstracto, debe ser implementado en la subclase.");
    }
}

// Clase que hereda de Producto
class ProductoInventario extends Producto {
    constructor(nombre, cantidad, precio) {
        super(nombre, cantidad, precio);
    }

    // Implementación del método mostrar (Polimorfismo)
    mostrar() {
        return `
            <td>${this.nombre}</td>
            <td>${this.cantidad}</td>
            <td>${this.precio}</td>
        `;
    }
}

// Clase para manejar el inventario
class Inventario {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem("inventario")) || [];
        this.editIndex = -1;
        this.tabla = document.querySelector("#tablaInventario tbody");
        this.form = document.getElementById("formProducto");
        this.submitBtn = this.form.querySelector("button");

        // Eventos
        document.addEventListener("DOMContentLoaded", () => this.mostrarInventario());
        this.form.addEventListener("submit", (event) => this.guardarProducto(event));
    }

    guardarProducto(event) {
        event.preventDefault();
        
        let nombre = document.getElementById("nombre").value.trim();
        let cantidad = document.getElementById("cantidad").value.trim();
        let precio = document.getElementById("precio").value.trim();

        if (!nombre || !cantidad || !precio) {
            alert("Por favor, complete todos los campos.");
            return;
        }

        let nuevoProducto = new ProductoInventario(nombre, cantidad, precio);

        if (this.editIndex === -1) {
            this.productos.push(nuevoProducto);
        } else {
            this.productos[this.editIndex] = nuevoProducto;
            this.editIndex = -1;
            this.submitBtn.innerText = "Agregar Producto";
        }

        localStorage.setItem("inventario", JSON.stringify(this.productos));
        this.form.reset();
        this.mostrarInventario();
    }

    mostrarInventario() {
        this.tabla.innerHTML = "";
        this.productos = JSON.parse(localStorage.getItem("inventario")) || [];

        this.productos.forEach((producto, index) => {
            let fila = document.createElement("tr");
            fila.innerHTML = producto.mostrar() + `
                <td>
                    <button onclick="inventario.editarProducto(${index})">Editar</button>
                    <button onclick="inventario.eliminarProducto(${index})">Eliminar</button>
                </td>
            `;
            this.tabla.appendChild(fila);
        });
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
        localStorage.setItem("inventario", JSON.stringify(this.productos));
        this.mostrarInventario();
    }

    editarProducto(index) {
        let producto = this.productos[index];

        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("cantidad").value = producto.cantidad;
        document.getElementById("precio").value = producto.precio;

        this.editIndex = index;
        this.submitBtn.innerText = "Actualizar Producto";
    }
}

// Instancia del inventario
const inventario = new Inventario();
