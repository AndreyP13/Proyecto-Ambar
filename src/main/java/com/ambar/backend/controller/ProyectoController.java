package com.ambar.backend.controller;

import com.ambar.backend.model.Proyecto;
import com.ambar.backend.services.ProyectoService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/proyectos")
@CrossOrigin(origins = "http://localhost:8080") // Cambia por el puerto de tu frontend
public class ProyectoController {

    private final ProyectoService proyectoService;

    public ProyectoController(ProyectoService proyectoService) {
        this.proyectoService = proyectoService;
    }

    //GET → Listar todos
    @GetMapping
    public List<Proyecto> listarTodos() {
        return proyectoService.listarTodos();
    }

    // GET → Buscar por ID
    @GetMapping("/{id}")
    public Optional<Proyecto> buscarPorId(@PathVariable Long id) {
        return proyectoService.buscarPorId(id);
    }

    // POST → Crear
    @PostMapping
    public Proyecto crear(@RequestBody Proyecto proyecto) {
        return proyectoService.guardar(proyecto);
    }

    // PUT → Editar
    @PutMapping("/{id}")
    public Proyecto actualizar(@PathVariable Long id, @RequestBody Proyecto proyecto) {
        proyecto.setId(id);
        return proyectoService.guardar(proyecto);
    }

    @PatchMapping("/{id}/agregar-horas")
    public Proyecto agregarHoras(@PathVariable Long id, @RequestParam Integer horas) {
    Proyecto proyecto = proyectoService.buscarPorId(id)
            .orElseThrow(() -> new RuntimeException("Proyecto no encontrado"));

    // Si horasProyecto es null, lo tratamos como 0
    Integer actuales = proyecto.getHorasProyecto() != null ? proyecto.getHorasProyecto() : 0;

    // Sumamos las nuevas horas
    proyecto.setHorasProyecto(actuales + horas);

    return proyectoService.guardar(proyecto);
}

    // DELETE → Eliminar
    @DeleteMapping("/{id}")
    public void eliminar(@PathVariable Long id) {
        proyectoService.eliminar(id);
    }
}
