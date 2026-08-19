package com.billing_Application.Billing_webApplication;

import com.billing_Application.Billing_webApplication.Entity.UserEntity;
import com.billing_Application.Billing_webApplication.Repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.List;
import java.util.UUID;

@Configuration
public class DataLoader {

    @Bean
    public CommandLineRunner initDatabase(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            // Check if admin user already exists
            if (userRepository.getByEmail("admin@gmail.com").isEmpty()) {
                UserEntity admin = new UserEntity();
                admin.setUserid(UUID.randomUUID().toString());
                admin.setName("Admin User");
                admin.setEmail("admin@gmail.com");
                admin.setPassword(passwordEncoder.encode("admin123")); // Default password
                admin.setRoles(List.of("ROLE_USER", "ROLE_ADMIN"));
                
                userRepository.save(admin);
                System.out.println("Default admin user created: admin@gmail.com / admin123");
            }
        };
    }
}
