document.addEventListener("DOMContentLoaded", mostrarInventario);

const form = document.getElementById("formProducto");
const tabla = document.querySelector("#tablaInventario tbody");
const totalInventario = document.getElementById("totalInventario");
const submitBtn = document.getElementById("submitBtn");

let editIndex = -1;

form.addEventListener("submit", function (event) {
    event.preventDefault();

    let nombre = document.getElementById("nombre").value.trim();
    let cantidad = parseInt(document.getElementById("cantidad").value.trim(), 10);
    let precio = parseFloat(document.getElementById("precio").value.trim());

    if (!nombre || isNaN(cantidad) || isNaN(precio) || cantidad < 1 || precio < 0) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    let productos = JSON.parse(localStorage.getItem("inventario")) || [];

    if (editIndex === -1) {
        productos.push({ nombre, cantidad, precio });
    } else {
        productos[editIndex] = { nombre, cantidad, precio };
        editIndex = -1;
        submitBtn.innerText = "Agregar Producto";
    }

    localStorage.setItem("inventario", JSON.stringify(productos));

    form.reset();
    mostrarInventario();
});

function mostrarInventario() {
    tabla.innerHTML = "";
    let productos = JSON.parse(localStorage.getItem("inventario")) || [];
    let total = 0; // Variable para almacenar el total del inventario

    productos.forEach((producto, index) => {
        let valorTotal = producto.cantidad * producto.precio;
        total += valorTotal; // Sumar el valor total del producto al total del inventario

        let fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>$${producto.precio.toFixed(2)}</td>
            <td>$${valorTotal.toFixed(2)}</td>
            <td>
                <button class="editar" data-index="${index}" aria-label="Editar ${producto.nombre}">✏️</button>
                <button class="eliminar" data-index="${index}" aria-label="Eliminar ${producto.nombre}">🗑️</button>
            </td>
        `;
        tabla.appendChild(fila);
    });

    // Mostrar el total del inventario
    totalInventario.innerHTML = `<strong>Total del Inventario:</strong> $${total.toFixed(2)}`;

    // Delegación de eventos para botones de edición y eliminación
    document.querySelectorAll(".editar").forEach(btn =>
        btn.addEventListener("click", () => editarProducto(btn.dataset.index))
    );
    document.querySelectorAll(".eliminar").forEach(btn =>
        btn.addEventListener("click", () => eliminarProducto(btn.dataset.index))
    );
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

    editIndex = index;
    submitBtn.innerText = "Actualizar Producto";
}
