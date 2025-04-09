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
        formData.append('id', String(id));
        formData.append('nombre', String(espejo.nombre));
        formData.append('cantidad', String(espejo.cantidad));
        formData.append('precio', String(espejo.precio));
        formData.append('alto', String(espejo.alto));
        formData.append('ancho', String(espejo.ancho));
        formData.append('idProveedor', String(espejo.idProveedor));
        formData.append('precioProveedor', String(espejo.precioProveedor));

        console.log('Datos que se envían:', formData.toString());

        const response = await fetch(`${API_BASE}/actualizarespejo`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: formData
        });

        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error HTTP ${response.status}: ${errorText}`);
        }

        return await response.text();
    },


    async eliminar(id) {
        const response = await fetch(`${API_BASE}/eliminarespejo?id=${id}`, {
            method: 'DELETE'
        });
        if (!response.ok) throw new Error('Error al eliminar');
        return true;
    }
};