package com.iovision.stile;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@EnableJpaRepositories(basePackages = { "com.iovision.stile.repositories" })
@SpringBootApplication
@ComponentScan(basePackages = { "com.iovision.stile" })

public class StileApplication {

	public static void main(String[] args) {
		SpringApplication.run(StileApplication.class, args);
	}

}
