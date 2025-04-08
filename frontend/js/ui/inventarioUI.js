import { EspejoService } from '../api/espejoService.js';

export class InventarioUI {
    constructor() {
        // 1. Inicializar elementos del DOM
        this.elementos = {
            btnAgregar: document.getElementById('btnAgregar'),
            btnRefrescar: document.getElementById('btnRefrescar'),
            btnGuardar: document.getElementById('btnGuardar'),
            btnCancelar: document.getElementById('btnCancelar'),
            modal: document.getElementById('formulario-modal'),
            form: document.getElementById('form-espejo'),
            cuerpoTabla: document.getElementById('inventory-body'),
            modalTitulo: document.getElementById('modal-titulo'),
            inputs: {
                nombre: document.getElementById('input-nombre'),
                cantidad: document.getElementById('input-cantidad'),
                precio: document.getElementById('input-precio'),
                alto: document.getElementById('input-alto'),
                ancho: document.getElementById('input-ancho'),
                idProveedor: document.getElementById('input-idProveedor'),
                precioProveedor: document.getElementById('input-precioProveedor')
            }
        };

        // 2. Validar que existen los elementos críticos
        if (!this.elementos.btnAgregar || !this.elementos.btnRefrescar || !this.elementos.modal || !this.elementos.form) {
            console.error("Elementos críticos no encontrados");
            return;
        }

        // 3. Configurar eventos
        this.configurarEventos();

        // 4. Inicializar estado
        this.espejoEditando = null;
        this.cargarDatos();
    }

    async configurarEventos() {
        // Evento para abrir modal (Agregar)
        this.elementos.btnAgregar.addEventListener('click', () => {
            this.espejoEditando = null;
            this.mostrarModal();
        });

        // Evento para refrescar datos
        this.elementos.btnRefrescar.addEventListener('click', async () => {
            await this.cargarDatos();
        });

        // Evento para cancelar
        this.elementos.btnCancelar.addEventListener('click', () => {
            this.ocultarModal();
        });

        // Evento para enviar formulario (Guardar)
        this.elementos.form.addEventListener('submit', async (e) => {
            e.preventDefault();
            await this.guardarEspejo();
        });

        // Delegación de eventos para botones dinámicos
        this.elementos.cuerpoTabla.addEventListener('click', async (e) => {
            const fila = e.target.closest('tr');
            if (!fila) return;

            if (e.target.classList.contains('btn-editar')) {
                this.editarEspejo(fila);
            } else if (e.target.classList.contains('btn-eliminar')) {
                await this.eliminarEspejo(fila);
            }
        });
    }

    async guardarEspejo() {
        // Validación mejorada según el modelo
        if (!this.elementos.inputs.nombre.value.trim()) {
            alert('El nombre del producto es obligatorio');
            return;
        }

        const precio = parseInt(this.elementos.inputs.precio.value);
        if (isNaN(precio)) {
            alert('El precio debe ser un número entero válido');
            return;
        }

        try {
            let response;

            if (this.espejoEditando) {
                // Preparación de datos exactamente como el modelo los espera
                const datosActualizacion = {
                    id: this.espejoEditando.id,
                    nombre: this.elementos.inputs.nombre.value.trim(),
                    cantidad: parseInt(this.elementos.inputs.cantidad.value) || 0,
                    precio: precio, // Asegurar que es entero
                    alto: parseInt(this.elementos.inputs.alto.value) || 0,
                    ancho: parseInt(this.elementos.inputs.ancho.value) || 0,
                    precioProveedor: parseInt(this.elementos.inputs.precioProveedor.value) || 0,
                    proveedor: {
                        id: parseInt(this.elementos.inputs.idProveedor.value) || 1
                    }
                };

                console.log("Datos para actualización:", datosActualizacion);

                response = await fetch('http://localhost:8080/tiendaespejos/actualizarespejo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(datosActualizacion)
                });

                if (!response.ok) {
                    const errorData = await response.json().catch(() => null);
                    console.error("Error del backend:", errorData);
                    throw new Error(errorData?.message || `Error HTTP ${response.status}`);
                }
            } else {
                // Lógica para creación (ajustada al modelo)
                const formData = new URLSearchParams();
                formData.append('nombre', this.elementos.inputs.nombre.value.trim());
                formData.append('cantidad', this.elementos.inputs.cantidad.value || 0);
                formData.append('precio', precio.toString());
                formData.append('alto', this.elementos.inputs.alto.value || 0);
                formData.append('ancho', this.elementos.inputs.ancho.value || 0);
                formData.append('precioProveedor', this.elementos.inputs.precioProveedor.value || 0);
                formData.append('idProveedor', this.elementos.inputs.idProveedor.value || 1);

                response = await fetch('http://localhost:8080/tiendaespejos/agregarespejo', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    body: formData
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText || 'Error al crear producto');
                }
            }

            alert('Operación exitosa!');
            this.ocultarModal();
            await this.cargarDatos();
        } catch (error) {
            console.error('Error completo:', error);
            alert(`Error: ${error.message}\n\nVer detalles en consola (F12)`);
        }
    }

    async cargarDatos() {
        try {
            this.elementos.cuerpoTabla.innerHTML = '<tr><td colspan="9">Cargando...</td></tr>';
            const espejos = await EspejoService.obtenerTodos();
            this.renderizarTabla(espejos);
        } catch (error) {
            console.error('Error:', error);
            this.elementos.cuerpoTabla.innerHTML = `<tr><td colspan="9">Error al cargar: ${error.message}</td></tr>`;
        }
    }

    renderizarTabla(espejos) {
        this.elementos.cuerpoTabla.innerHTML = espejos.map(espejo => `
            <tr data-id="${espejo.id}">
                <td>${espejo.id}</td>
                <td>${espejo.nombre || 'N/A'}</td>
                <td>${espejo.precio ? `$${espejo.precio.toFixed(2)}` : 'N/A'}</td>
                <td>${espejo.cantidad || '0'}</td>
                <td>${espejo.alto ? `${espejo.alto} cm` : 'N/A'}</td>
                <td>${espejo.ancho ? `${espejo.ancho} cm` : 'N/A'}</td>
                <td>${espejo.proveedor?.nombre || 'N/A'}</td>
                <td>${espejo.precioProveedor ? `$${espejo.precioProveedor.toFixed(2)}` : 'N/A'}</td>
                <td class="acciones-fila">
                    <button class="btn-editar">✏️</button>
                    <button class="btn-eliminar">🗑️</button>
                </td>
            </tr>
        `).join('');
    }

    mostrarModal(espejo = null) {
        this.espejoEditando = espejo;
        this.elementos.modalTitulo.textContent = espejo ? 'Editar Producto' : 'Nuevo Producto';

        if (espejo) {
            this.elementos.inputs.nombre.value = espejo.nombre;
            this.elementos.inputs.precio.value = espejo.precio;
            this.elementos.inputs.cantidad.value = espejo.cantidad;
            this.elementos.inputs.alto.value = espejo.alto;
            this.elementos.inputs.ancho.value = espejo.ancho;
            this.elementos.inputs.idProveedor.value = espejo.proveedor?.id || '';
            this.elementos.inputs.precioProveedor.value = espejo.precioProveedor;
        } else {
            this.elementos.form.reset();
        }

        this.elementos.modal.style.display = 'block';
    }

    ocultarModal() {
        this.elementos.modal.style.display = 'none';
        this.espejoEditando = null;
    }

    editarEspejo(fila) {
        const datosFila = {
            id: parseInt(fila.cells[0].textContent.trim()),
            nombre: fila.cells[1].textContent.trim(),
            precio: parseFloat(fila.cells[2].textContent.replace('$', '').replace(',', '')) || 0,
            cantidad: parseInt(fila.cells[3].textContent) || 0,
            alto: parseInt(fila.cells[4].textContent.replace(' cm', '')) || 0,
            ancho: parseInt(fila.cells[5].textContent.replace(' cm', '')) || 0,
            proveedor: { id: parseInt(this.elementos.inputs.idProveedor.value) || 1 },
            precioProveedor: parseFloat(fila.cells[7].textContent.replace('$', '').replace(',', '')) || 0
        };

        console.log("Datos para edición:", datosFila);
        this.mostrarModal(datosFila);
    }

    async eliminarEspejo(fila) {
        if (!confirm('¿Estás seguro de eliminar este producto?')) return;

        try {
            await EspejoService.eliminar(fila.dataset.id);
            await this.cargarDatos();
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert(`Error: ${error.message}`);
        }
    }
}

// Inicialización cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    new InventarioUI();
});