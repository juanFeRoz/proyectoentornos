package com.tiendaespejos.proyectoentornos.controladores;


import com.tiendaespejos.proyectoentornos.modelos.Espejo;
import com.tiendaespejos.proyectoentornos.modelos.Proveedor;
import com.tiendaespejos.proyectoentornos.repositorios.EspejoRepositorio;

import com.tiendaespejos.proyectoentornos.repositorios.ProveedorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/tiendaespejos")
public class EspejoControlador {
    @Autowired
    private EspejoRepositorio espejoRepositorio;

    @Autowired
    private ProveedorRepositorio proveedorRepositorio;

    @PostMapping(path = "/agregarespejo")
    public @ResponseBody String agregarNuevoEspejo(
            @RequestParam String nombre,
            @RequestParam int cantidad,
            @RequestParam int precio,
            @RequestParam int alto,
            @RequestParam int ancho,
            @RequestParam int idProveedor,
            @RequestParam int precioProveedor) {
        Espejo e = new Espejo();
        e.setNombre(nombre);
        e.setCantidad(cantidad);
        e.setPrecio(precio);
        e.setProveedor(proveedorRepositorio.findById(idProveedor).get());
        e.setAlto(alto);
        e.setAncho(ancho);
        e.setPrecioProveedor(precioProveedor);
        espejoRepositorio.save(e);

        return "Guardado";
    }


    @GetMapping(path = "/todosespejos")
    public @ResponseBody Iterable<Espejo> obtenerTodosLosEspejos() {
        return espejoRepositorio.findAll();
    }

    @PostMapping(path = "/actualizarespejo")
    public @ResponseBody String actualizarEspejo(
            @RequestParam int id,
            @RequestParam String nombre,
            @RequestParam int cantidad,
            @RequestParam int precio,
            @RequestParam int alto,
            @RequestParam int ancho,
            @RequestParam int idProveedor,
            @RequestParam int precioProveedor) {
        if (espejoRepositorio.existsById(id)) {
            Espejo e = espejoRepositorio.findById(id).get();
            e.setNombre(nombre);
            e.setCantidad(cantidad);
            e.setPrecio(precio);
            e.setAlto(alto);
            e.setAncho(ancho);
            e.setPrecioProveedor(precioProveedor);
            e.setProveedor(proveedorRepositorio.findById(idProveedor).orElse(null)); // Ensure provider exists
            espejoRepositorio.save(e);
            return "Actualizado";
        } else {
            return "Espejo no encontrado";
        }
    }

    @GetMapping(path = "/obtenerespejo")
    public @ResponseBody Espejo obtenerEspejoPorId(@RequestParam int id) {
        return espejoRepositorio.findById(id).get();
    }

    @DeleteMapping(path = "/eliminarespejo")
    public @ResponseBody String eliminarEspejo(@RequestParam int id) {
        if (espejoRepositorio.existsById(id)) {
            espejoRepositorio.deleteById(id);
            return "Eliminado";
        } else {
            return "Espejo no encontrado";
        }
    }

}
