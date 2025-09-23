package com.ambar.backend.controller;

import com.ambar.backend.model.Registro;
import com.ambar.backend.repository.RegistroRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/registros")
public class RegistroController {

    private final RegistroRepository registroRepository;

    public RegistroController(RegistroRepository registroRepository) {
        this.registroRepository = registroRepository;
    }

    // Obtener todos los registros
    @GetMapping
    public List<Registro> getAllRegistros() {
        return registroRepository.findAll();
    }

    // Obtener un registro por ID
    @GetMapping("/{id}")
    public Optional<Registro> getRegistroById(@PathVariable Long id) {
        return registroRepository.findById(id);
    }

    // Crear un nuevo registro
    @PostMapping
    public Registro createRegistro(@RequestBody Registro registro) {
        return registroRepository.save(registro);
    }

    // Actualizar un registro existente
    @PutMapping("/{id}")
    public Registro updateRegistro(@PathVariable Long id, @RequestBody Registro registroDetails) {
        return registroRepository.findById(id).map(registro -> {
            registro.setNombre(registroDetails.getNombre());
            return registroRepository.save(registro);
        }).orElseThrow(() -> new RuntimeException("Registro no encontrado con id " + id));
    }

    // Eliminar un registro
    @DeleteMapping("/{id}")
    public String deleteRegistro(@PathVariable Long id) {
        registroRepository.deleteById(id);
        return "Registro eliminado con id " + id;
    }
}