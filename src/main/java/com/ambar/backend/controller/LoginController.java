package com.ambar.backend.controller;

import com.ambar.backend.model.Registro;
import com.ambar.backend.repository.RegistroRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginController {

    private final RegistroRepository registroRepository;

    public LoginController(RegistroRepository registroRepository) {
        this.registroRepository = registroRepository;
    }

    // ✅ Endpoint para realizar login
    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> login(@RequestBody LoginRequest loginRequest) {
        // Log para depuración
        System.out.println("Usuario recibido: " + loginRequest.getUsername());
        System.out.println("Contraseña recibida: " + loginRequest.getPassword());

        Optional<Registro> registro = registroRepository.findByUsername(loginRequest.getUsername());
        Map<String, Object> response = new HashMap<>();

        if (registro.isPresent()) {
            if (registro.get().getPassword().equals(loginRequest.getPassword())) {
                // ✅ Construimos respuesta en JSON
                response.put("mensaje", "Login exitoso");
                response.put("username", registro.get().getUsername());
                response.put("nombre", registro.get().getNombre());
                response.put("correo", registro.get().getCorreo());

                return ResponseEntity.ok(response);
            } else {
                response.put("mensaje", "Contraseña incorrecta");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } else {
            response.put("mensaje", "Usuario no encontrado");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }

    // ✅ Clase interna para manejar la solicitud de login
    public static class LoginRequest {
        private String username;
        private String password;

        public String getUsername() {
            return username;
        }

        public void setUsername(String username) {
            this.username = username;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}
