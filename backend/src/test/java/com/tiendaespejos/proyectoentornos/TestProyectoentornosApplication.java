package com.tiendaespejos.proyectoentornos;

import org.springframework.boot.SpringApplication;

public class TestProyectoentornosApplication {

	public static void main(String[] args) {
		SpringApplication.from(ProyectoentornosApplication::main).with(TestcontainersConfiguration.class).run(args);
	}

}
