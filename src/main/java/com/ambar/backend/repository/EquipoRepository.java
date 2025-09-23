package com.ambar.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ambar.backend.model.Equipo;

public interface EquipoRepository extends JpaRepository<Equipo, Long> {
}