document.addEventListener("DOMContentLoaded", mostrarInventario);

const form = document.getElementById("formProducto");
const tabla = document.querySelector("#tablaInventario tbody");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    
    let nombre = document.getElementById("nombre").value;
    let cantidad = document.getElementById("cantidad").value;
    let precio = document.getElementById("precio").value;

    let productos = JSON.parse(localStorage.getItem("inventario")) || [];
    
    productos.push({ nombre, cantidad, precio });
    
    localStorage.setItem("inventario", JSON.stringify(productos));
    
    form.reset();
    mostrarInventario();
});

function mostrarInventario() {
    tabla.innerHTML = "";
    let productos = JSON.parse(localStorage.getItem("inventario")) || [];

    productos.forEach((producto, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>
                <button onclick="editarProducto(${index})">Editar</button>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        tabla.appendChild(fila);
    });
}

function eliminarProducto(index) {
    let productos = JSON.parse(localStorage.getItem("inventario"));
    productos.splice(index, 1);
    localStorage.setItem("inventario", JSON.stringify(productos));
    mostrarInventario();
}

function editarProducto(index) {
    let productos = JSON.parse(localStorage.getItem("inventario"));
    let producto = productos[index];

    document.getElementById("nombre").value = producto.nombre;
    document.getElementById("cantidad").value = producto.cantidad;
    document.getElementById("precio").value = producto.precio;

    productos.splice(index, 1);
    localStorage.setItem("inventario", JSON.stringify(productos));
    mostrarInventario();
}
