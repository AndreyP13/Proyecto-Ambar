package com.ambar.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import com.ambar.backend.model.Equipo;
import com.ambar.backend.repository.EquipoRepository;

@RestController
@RequestMapping("/api/equipos")
public class EquipoController {

    private final EquipoRepository equipoRepository;

    // ✅ Inyección por constructor
    public EquipoController(EquipoRepository equipoRepository) {
        this.equipoRepository = equipoRepository;
    }

    // Obtener todos los equipos
    @GetMapping
    public List<Equipo> listar() {
        return equipoRepository.findAll();
    }

    // Obtener un equipo por id
    @GetMapping("/{id}")
    public ResponseEntity<Equipo> obtener(@PathVariable Long id) {
        return equipoRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Crear equipo
    @PostMapping
    public Equipo crear(@RequestBody Equipo equipo) {
        return equipoRepository.save(equipo);
    }

    // Editar equipo
    @PutMapping("/{id}")
    public ResponseEntity<Equipo> editar(@PathVariable Long id, @RequestBody Equipo equipo) {
        return equipoRepository.findById(id).map(existente -> {
            existente.setNombre(equipo.getNombre());
            existente.setProyectosEquipo(equipo.getProyectosEquipo());
            existente.setProyectosPersonales(equipo.getProyectosPersonales());
            existente.setOcupacion(equipo.getOcupacion());
            return ResponseEntity.ok(equipoRepository.save(existente));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Eliminar equipo
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        if (!equipoRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        equipoRepository.deleteById(id);
        return ResponseEntity.noContent().build();
    }
}
