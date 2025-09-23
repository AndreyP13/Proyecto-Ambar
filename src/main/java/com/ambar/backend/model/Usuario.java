package com.ambar.backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "users")
public class Usuario {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;              // antes era int; mejor Long para JPA

    private String nombre;        // tu campo existente (nombre completo)
    private String correo;        // antes 'correo'
    private String username;
    private String password;

    

    // Nuevos campos
    private String equipo;
    private String rol;
    private String estado;

    private Integer numeroProyectos;
    private String tiposProyectos;

    // Permisos
    private Boolean permisoProyectos;
    private Boolean permisoClientes;
    private Boolean permisoUsuarios;
    private Boolean permisoNotificaciones;
    private Boolean permisoTiempo;

    // Notificaciones
    private Boolean notifTareas;
    private Boolean notifNuevaTarea;
    private Boolean notifTareaActualizada;
    private Boolean notifQuitarPermisos;
    private Boolean notifAsignarProyecto;
    private Boolean notifDesasignarProyecto;

    @Column(name = "ultima_actividad")
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime ultimaActividad;

    // Getters y setters (generados)
    // -- Autogenera en tu IDE o copia/pega los que necesites --
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getNombre() { return nombre; }
    public void setNombre(String nombre) { this.nombre = nombre; }

    public String getCorreo() { return correo; }
    public void setCorreo(String correo) { this.correo = correo; }

    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }

    public String getEquipo() { return equipo; }
    public void setEquipo(String equipo) { this.equipo = equipo; }

    public String getRol() { return rol; }
    public void setRol(String rol) { this.rol = rol; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }

    public Integer getNumeroProyectos() { return numeroProyectos; }
    public void setNumeroProyectos(Integer numeroProyectos) { this.numeroProyectos = numeroProyectos; }

    public String getTiposProyectos() { return tiposProyectos; }
    public void setTiposProyectos(String tiposProyectos) { this.tiposProyectos = tiposProyectos; }

    public Boolean getPermisoProyectos() { return permisoProyectos; }
    public void setPermisoProyectos(Boolean permisoProyectos) { this.permisoProyectos = permisoProyectos; }

    public Boolean getPermisoClientes() { return permisoClientes; }
    public void setPermisoClientes(Boolean permisoClientes) { this.permisoClientes = permisoClientes; }

    public Boolean getPermisoUsuarios() { return permisoUsuarios; }
    public void setPermisoUsuarios(Boolean permisoUsuarios) { this.permisoUsuarios = permisoUsuarios; }

    public Boolean getPermisoNotificaciones() { return permisoNotificaciones; }
    public void setPermisoNotificaciones(Boolean permisoNotificaciones) { this.permisoNotificaciones = permisoNotificaciones; }

    public Boolean getPermisoTiempo() { return permisoTiempo; }
    public void setPermisoTiempo(Boolean permisoTiempo) { this.permisoTiempo = permisoTiempo; }

    public Boolean getNotifTareas() { return notifTareas; }
    public void setNotifTareas(Boolean notifTareas) { this.notifTareas = notifTareas; }

    public Boolean getNotifNuevaTarea() { return notifNuevaTarea; }
    public void setNotifNuevaTarea(Boolean notifNuevaTarea) { this.notifNuevaTarea = notifNuevaTarea; }

    public Boolean getNotifTareaActualizada() { return notifTareaActualizada; }
    public void setNotifTareaActualizada(Boolean notifTareaActualizada) { this.notifTareaActualizada = notifTareaActualizada; }

    public Boolean getNotifQuitarPermisos() { return notifQuitarPermisos; }
    public void setNotifQuitarPermisos(Boolean notifQuitarPermisos) { this.notifQuitarPermisos = notifQuitarPermisos; }

    public Boolean getNotifAsignarProyecto() { return notifAsignarProyecto; }
    public void setNotifAsignarProyecto(Boolean notifAsignarProyecto) { this.notifAsignarProyecto = notifAsignarProyecto; }

    public Boolean getNotifDesasignarProyecto() { return notifDesasignarProyecto; }
    public void setNotifDesasignarProyecto(Boolean notifDesasignarProyecto) { this.notifDesasignarProyecto = notifDesasignarProyecto; }

    public LocalDateTime getUltimaActividad() { return ultimaActividad; }
    public void setUltimaActividad(LocalDateTime ultimaActividad) { this.ultimaActividad = ultimaActividad; }
}
