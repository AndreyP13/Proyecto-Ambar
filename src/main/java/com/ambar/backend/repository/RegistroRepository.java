package com.ambar.backend.repository;

import com.ambar.backend.model.Registro;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface RegistroRepository extends JpaRepository<Registro, Long> {
    // Agregar el método para buscar por username
    Optional<Registro> findByUsername(String username);
}
