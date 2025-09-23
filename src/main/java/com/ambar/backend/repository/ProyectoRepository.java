package com.ambar.backend.repository;

import com.ambar.backend.model.Proyecto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProyectoRepository extends JpaRepository<Proyecto, Long> {
    // Aquí puedes agregar métodos de búsqueda personalizados si necesitas
}
