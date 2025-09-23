package com.ambar.backend.repository;

import com.ambar.backend.model.TiempoGlobal;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface TiempoGlobalRepository extends JpaRepository<TiempoGlobal, Long> {

    List<TiempoGlobal> findByFechaBetween(LocalDate inicio, LocalDate fin);
}
