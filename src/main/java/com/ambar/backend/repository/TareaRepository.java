package com.ambar.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.ambar.backend.model.Tarea;
import java.util.List;

public interface TareaRepository extends JpaRepository<Tarea, Long> {
    List<Tarea> findByEstado(String estado);
}
