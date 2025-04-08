const API_BASE = 'http://localhost:8080/tiendaespejos';

export const EspejoService = {
    async obtenerTodos() {
        const response = await fetch(`${API_BASE}/todosespejos2`);
        if (!response.ok) throw new Error('Error al cargar datos');
        return await response.json();
    },

    async crear(espejo) {
        const formData = new URLSearchParams();
        formData.append('nombre', espejo.nombre);
        formData.append('cantidad', espejo.cantidad);
        formData.append('precio', espejo.precio);
        formData.append('alto', espejo.alto);
        formData.append('ancho', espejo.ancho);
        formData.append('idProveedor', espejo.idProveedor);
        formData.append('precioProveedor', espejo.precioProveedor);

        const response = await fetch(`${API_BASE}/agregarespejo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Error al crear');
        }

        return await response.text(); // Retorna "Guardado" como string
    },

    async actualizar(id, espejo) {
        const formData = new URLSearchParams();
        formData.append('id', id);
        formData.append('nombre', espejo.nombre);
        formData.append('cantidad', espejo.cantidad || 0);
        formData.append('precio', espejo.precio || 0);
        formData.append('alto', espejo.alto || 0);
        formData.append('ancho', espejo.ancho || 0);
        formData.append('idProveedor', espejo.idProveedor || 1);
        formData.append('precioProveedor', espejo.precioProveedor || 0);

        const response = await fetch(`${API_BASE}/actualizarespejo`, {
            method: 'POST', // Cambiado a POST para coincidir con el controlador
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(errorText || 'Error al actualizar');
        }

        return await response.text(); // Retorna "Actualizado"
    },


    async eliminar(id) {
        const response = await fetch(`${API_BASE}/eliminarespejo?id=${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar');
        return true;
    }
};