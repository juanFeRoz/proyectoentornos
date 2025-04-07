document.addEventListener("DOMContentLoaded", async () => {
    try {
        const response = await fetch('http://localhost:8080/tiendaespejos/todosespejos2');
        const espejos = await response.json();

        const tableBody = document.getElementById("inventory-body");

        espejos.forEach(espejo => {
            const row = document.createElement("tr");

            // Datos a mostrar (ajusta según tu modelo `Espejo`)
            const rowData = [
                espejo.id,
                espejo.nombre || "N/A",
                espejo.cantidad || "0",
                espejo.precio || "0",
                espejo.alto || "0",
                espejo.ancho || "0",
                espejo.proveedor?.id || "N/A", // Asume que Proveedor tiene un campo 'nombre'
                espejo.precioProveedor || "0"
            ];

            rowData.forEach(data => {
                const cell = document.createElement("td");
                cell.textContent = data;
                row.appendChild(cell);
            });

            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error al cargar los espejos:", error);
        alert("No se pudieron cargar los datos. Revisa la consola.");
    }
});