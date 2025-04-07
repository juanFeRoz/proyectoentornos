package com.tiendaespejos.proyectoentornos.repositorios;


import com.tiendaespejos.proyectoentornos.modelos.Espejo;
import org.springframework.data.repository.CrudRepository;

// El repositorio sera implementado automaticamente por Spring en una Bean
// El repositorio de espejos guarda las instancias de espejo creadas en la base de datos
public interface EspejoRepositorio extends CrudRepository<Espejo, Integer>{
}
