
    if (editIndex === -1) {
        // Agregar nuevo producto
        productos.push({ nombre, cantidad, precio });
    } else {
        // Editar producto existente
        productos[editIndex] = { nombre, cantidad, precio };
        editIndex = -1; // Reiniciar índice de edición
        document.getElementById("submitBtn").innerText = "Agregar";
    }

    localStorage.setItem("inventario", JSON.stringify(productos));
    
    form.reset();
    mostrarInventario();
});

function mostrarInventario() {
    tabla.innerHTML = "";
    let productos = JSON.parse(localStorage.getItem("inventario")) || [];

    productos.forEach((producto, index) => {
        let fila = document.createElement("tr");
        fila.innerHTML = 
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td>${producto.precio}</td>
            <td>
                <button onclick="editarProducto(${index})">Editar</button>
                <button onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        ;
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

    editIndex = index; // Guardar el índice para la edición
    document.getElementById("submitBtn").innerText = "Actualizar";
}
