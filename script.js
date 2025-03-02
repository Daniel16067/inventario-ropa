// Clase base (Abstracción)
class Producto {
    constructor(nombre, cantidad, precio) {
        if (this.constructor === Producto) {
            throw new Error("No se puede instanciar una clase abstracta.");
        }
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precio = precio;
    }

    mostrar() {
        throw new Error("Método abstracto, debe ser implementado en la subclase.");
    }
}

// Clase que hereda de Producto (Herencia)
class ProductoInventario extends Producto {
    constructor(nombre, cantidad, precio) {
        super(nombre, cantidad, precio);
    }

    // Polimorfismo: Implementación del método mostrar()
    mostrar() {
        return `
            <td>${this.nombre}</td>
            <td>${this.cantidad}</td>
            <td>${this.precio}</td>
        `;
    }
}

// Clase para manejar el inventario (Encapsulamiento)
class Inventario {
    constructor() {
        this.productos = this.obtenerInventario();
        this.editIndex = -1;
        this.tabla = document.querySelector("#tablaInventario tbody");
        this.form = document.getElementById("formProducto");
        this.submitBtn = this.form.querySelector("button");

        // Eventos
        document.addEventListener("DOMContentLoaded", () => this.mostrarInventario());
        this.form.addEventListener("submit", (event) => this.guardarProducto(event));
    }

    // Obtener datos del localStorage
    obtenerInventario() {
        const data = localStorage.getItem("inventario");
        return data ? JSON.parse(data).map(obj => new ProductoInventario(obj.nombre, obj.cantidad, obj.precio)) : [];
    }

    // Guardar datos en localStorage
    guardarInventario() {
        localStorage.setItem("inventario", JSON.stringify(this.productos));
    }

    // Guardar o actualizar producto
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

        this.guardarInventario();
        this.form.reset();
        this.mostrarInventario();
    }

    // Mostrar los productos en la tabla
    mostrarInventario() {
        this.tabla.innerHTML = "";
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

    // Eliminar producto
    eliminarProducto(index) {
        this.productos.splice(index, 1);
        this.guardarInventario();
        this.mostrarInventario();
    }

    // Editar producto
    editarProducto(index) {
        let producto = this.productos[index];

        document.getElementById("nombre").value = producto.nombre;
        document.getElementById("cantidad").value = producto.cantidad;
        document.getElementById("precio").value = producto.precio;

        this.editIndex = index;
        this.submitBtn.innerText = "Actualizar Producto";
    }
}

// Instancia global del inventario
const inventario = new Inventario();
