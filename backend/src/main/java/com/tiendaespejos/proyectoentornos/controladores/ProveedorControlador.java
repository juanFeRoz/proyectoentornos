package com.tiendaespejos.proyectoentornos.controladores;

import com.tiendaespejos.proyectoentornos.modelos.Espejo;
import com.tiendaespejos.proyectoentornos.modelos.Proveedor;
import com.tiendaespejos.proyectoentornos.repositorios.EspejoRepositorio;

import com.tiendaespejos.proyectoentornos.repositorios.ProveedorRepositorio;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/tiendaespejos")
public class ProveedorControlador {
    @Autowired
    private ProveedorRepositorio proveedorRepositorio;

    @PostMapping(path = "/agregarproveedor")
    private @ResponseBody String agregarNuevoProveedor(@RequestParam String nombre, @RequestParam String direccion, @RequestParam String telefono) {
        Proveedor p = new Proveedor();
        p.setTelefono(telefono);
        p.setDireccion(direccion);
        p.setNombre(nombre);

        proveedorRepositorio.save(p);

        return "Guardado";
    }

    @GetMapping(path = "/todosproveedores")
    private @ResponseBody Iterable<Proveedor> obtenerTodosLosProveedores() {
        return proveedorRepositorio.findAll();
    }

    @GetMapping(path = "/obtenerproveedor")
    private @ResponseBody Proveedor obtenerProveedorPorId(@RequestParam int id) {
        return proveedorRepositorio.findById(id).get();
    }
}
