package com.thienday.postmanagementui;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

@SpringBootApplication
@ComponentScan("com.thienday.postmanagementui")
public class PostManagementUiApplication {

	public static void main(String[] args) {
		SpringApplication.run(PostManagementUiApplication.class, args);
	}

}
