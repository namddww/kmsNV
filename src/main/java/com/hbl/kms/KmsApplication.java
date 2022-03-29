package com.hbl.kms;

import com.hbl.kms.app.common.model.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.builder.SpringApplicationBuilder;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

import javax.servlet.Servlet;
import javax.servlet.ServletContainerInitializer;

@SpringBootApplication
@EnableConfigurationProperties({ FileStorageProperties.class })
public class KmsApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(KmsApplication.class, args);
    }

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(KmsApplication.class);
    }
}
