package com.ambar.backend.services;

import com.ambar.backend.model.Usuario;
import com.ambar.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioService {
    private final UsuarioRepository repo;
    public UsuarioService(UsuarioRepository repo) { this.repo = repo; }

    public List<Usuario> listarTodos() { return repo.findAll(); }
    public Optional<Usuario> obtenerPorId(Long id) { return repo.findById(id); }

    public Usuario crear(Usuario u) {
        if (u.getUltimaActividad() == null) u.setUltimaActividad(LocalDateTime.now());
        return repo.save(u);
    }

    public Usuario actualizar(Long id, Usuario datos) {
        return repo.findById(id).map(existing -> {
            if (datos.getNombre() != null) existing.setNombre(datos.getNombre());
            if (datos.getCorreo() != null) existing.setCorreo(datos.getCorreo());
            if (datos.getUsername() != null) existing.setUsername(datos.getUsername());
            if (datos.getPassword() != null) existing.setPassword(datos.getPassword());
            if (datos.getEquipo() != null) existing.setEquipo(datos.getEquipo());
            if (datos.getRol() != null) existing.setRol(datos.getRol());
            if (datos.getEstado() != null) existing.setEstado(datos.getEstado());
            if (datos.getNumeroProyectos() != null) existing.setNumeroProyectos(datos.getNumeroProyectos());
            if (datos.getTiposProyectos() != null) existing.setTiposProyectos(datos.getTiposProyectos());
            // booleans y notificaciones
            if (datos.getPermisoProyectos() != null) existing.setPermisoProyectos(datos.getPermisoProyectos());
            if (datos.getPermisoClientes() != null) existing.setPermisoClientes(datos.getPermisoClientes());
            if (datos.getPermisoUsuarios() != null) existing.setPermisoUsuarios(datos.getPermisoUsuarios());
            if (datos.getPermisoNotificaciones() != null) existing.setPermisoNotificaciones(datos.getPermisoNotificaciones());
            if (datos.getPermisoTiempo() != null) existing.setPermisoTiempo(datos.getPermisoTiempo());
            if (datos.getNotifTareas() != null) existing.setNotifTareas(datos.getNotifTareas());
            if (datos.getNotifNuevaTarea() != null) existing.setNotifNuevaTarea(datos.getNotifNuevaTarea());
            if (datos.getNotifTareaActualizada() != null) existing.setNotifTareaActualizada(datos.getNotifTareaActualizada());
            if (datos.getNotifQuitarPermisos() != null) existing.setNotifQuitarPermisos(datos.getNotifQuitarPermisos());
            if (datos.getNotifAsignarProyecto() != null) existing.setNotifAsignarProyecto(datos.getNotifAsignarProyecto());
            if (datos.getNotifDesasignarProyecto() != null) existing.setNotifDesasignarProyecto(datos.getNotifDesasignarProyecto());

            existing.setUltimaActividad(LocalDateTime.now());
            return repo.save(existing);
        }).orElseGet(() -> {
            // si no existe, lo crea
            if (datos.getUltimaActividad() == null) datos.setUltimaActividad(LocalDateTime.now());
            return repo.save(datos);
        });
    }

    public void eliminar(Long id) { repo.deleteById(id); }
}
