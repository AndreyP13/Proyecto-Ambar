package com.ambar.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "tiempo_global")
public class TiempoGlobal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "usuario_id", nullable = false)
    private Usuario usuario;

    private LocalDate fecha;

    private Double horas;

    private String estado; // EN_PROGRESO, APROBADO, RECHAZADO

    // Getters y Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Usuario getUsuario() { return usuario; }
    public void setUsuario(Usuario usuario) { this.usuario = usuario; }

    public LocalDate getFecha() { return fecha; }
    public void setFecha(LocalDate fecha) { this.fecha = fecha; }

    public Double getHoras() { return horas; }
    public void setHoras(Double horas) { this.horas = horas; }

    public String getEstado() { return estado; }
    public void setEstado(String estado) { this.estado = estado; }
}