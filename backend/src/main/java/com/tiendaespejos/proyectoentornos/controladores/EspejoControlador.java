package com.tiendaespejos.proyectoentornos.controladores;


import com.tiendaespejos.proyectoentornos.modelos.Espejo;
import com.tiendaespejos.proyectoentornos.repositorios.EspejoRepositorio;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping(path = "/tiendaespejos")
public class EspejoControlador {
    @Autowired
    private EspejoRepositorio espejoRepositorio;

    @PostMapping(path = "/agregar")
    public @ResponseBody String agregarNuevoEspejo (@RequestParam String nombre, @RequestParam int cantidad, @RequestParam int precio) {
        Espejo e = new Espejo();
        e.setNombre(nombre);
        e.setCantidad(cantidad);
        e.setPrecio(precio);
        espejoRepositorio.save(e);

        return "Guardado";
    }

    @GetMapping(path = "/todos")
    public @ResponseBody Iterable<Espejo> obtenerTodosLosEspejos() {
        return espejoRepositorio.findAll();
    }
}
