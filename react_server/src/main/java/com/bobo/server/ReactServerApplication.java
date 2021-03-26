package com.bobo.server;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableScheduling
@ComponentScan({"com.bobo.server.controller","com.bobo.server.service"})
@MapperScan("com.bobo.server.dao")
public class ReactServerApplication {

    public static void main(String[] args) {
        SpringApplication.run(ReactServerApplication.class, args);
    }

}
