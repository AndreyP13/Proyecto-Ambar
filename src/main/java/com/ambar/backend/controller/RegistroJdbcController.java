package com.ambar.backend.controller;

import com.ambar.backend.dao.RegistroDAO;
import com.ambar.backend.model.Registro;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/jdbc/registros")
@CrossOrigin(origins = "*")
public class RegistroJdbcController {

    private final RegistroDAO registroDAO = new RegistroDAO();

    @PostMapping
    public String crear(@RequestBody Registro registro) {
        return registroDAO.insertar(registro) ? "Registro exitoso" : "Error al registrar";
    }

    @GetMapping
    public List<Registro> listar() {
        return registroDAO.obtenerTodos();
    }

    @PutMapping("/{id}")
    public String actualizar(@PathVariable Long id, @RequestBody Registro registro) {
        registro.setId(id);
        return registroDAO.actualizar(registro) ? "Registro actualizado" : "Error al actualizar";
    }

    @DeleteMapping("/{id}")
    public String eliminar(@PathVariable Long id) {
        return registroDAO.eliminar(id) ? "Registro eliminado" : "Error al eliminar";
    }
}