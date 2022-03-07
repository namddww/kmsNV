package com.hbl.kms;

import com.hbl.kms.app.common.model.FileStorageProperties;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;

@SpringBootApplication
@EnableConfigurationProperties({ FileStorageProperties.class })
public class KmsApplication {

    public static void main(String[] args) {
        SpringApplication.run(KmsApplication.class, args);
    }

}
