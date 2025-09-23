package com.ambar.backend.model;

import jakarta.persistence.*;
import java.time.LocalDate;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "proyectos")
public class Proyecto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ===== DATOS BÁSICOS =====
    private String nombre;
    private String identificador;
    private String descripcion;
    private String tipoProyecto;
    private String cliente;
    private String equipoAsignado;
    private String oportunidad;
    @Enumerated(EnumType.STRING)
    private Estadoproyecto estado;


    // ===== FECHAS =====
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaInicioEstimada;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaFinEstimada;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaInicioReal;

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate fechaFinReal;

    // ===== AVANCE =====
    private String justificacionRetraso;
    private Integer horasProyecto;
    private Integer porcentajeAvance;

    // ===== INDICADORES =====
    private String indicadorActual;
    private String indicadorEsperado;
    private String indicadorFinal;

    // ====== GETTERS & SETTERS ======

    public Long getId() {
        return id;
    }
    public void setId(Long id) {
        this.id = id;
    }

    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }

    public String getIdentificador() {
        return identificador;
    }
    public void setIdentificador(String identificador) {
        this.identificador = identificador;
    }

    public String getDescripcion() {
        return descripcion;
    }
    public void setDescripcion(String descripcion) {
        this.descripcion = descripcion;
    }

    public Estadoproyecto getEstado() {
    return estado;
    }

    public void setEstado(Estadoproyecto estado) {
    this.estado = estado;
    }

    public String getTipoProyecto() {
        return tipoProyecto;
    }
    public void setTipoProyecto(String tipoProyecto) {
        this.tipoProyecto = tipoProyecto;
    }

    public String getCliente() {
        return cliente;
    }
    public void setCliente(String cliente) {
        this.cliente = cliente;
    }

    public String getEquipoAsignado() {
        return equipoAsignado;
    }
    public void setEquipoAsignado(String equipoAsignado) {
        this.equipoAsignado = equipoAsignado;
    }

    public String getOportunidad() {
        return oportunidad;
    }
    public void setOportunidad(String oportunidad) {
        this.oportunidad = oportunidad;
    }

    public LocalDate getFechaInicioEstimada() {
        return fechaInicioEstimada;
    }
    public void setFechaInicioEstimada(LocalDate fechaInicioEstimada) {
        this.fechaInicioEstimada = fechaInicioEstimada;
    }

    public LocalDate getFechaFinEstimada() {
        return fechaFinEstimada;
    }
    public void setFechaFinEstimada(LocalDate fechaFinEstimada) {
        this.fechaFinEstimada = fechaFinEstimada;
    }

    public LocalDate getFechaInicioReal() {
        return fechaInicioReal;
    }
    public void setFechaInicioReal(LocalDate fechaInicioReal) {
        this.fechaInicioReal = fechaInicioReal;
    }

    public LocalDate getFechaFinReal() {
        return fechaFinReal;
    }
    public void setFechaFinReal(LocalDate fechaFinReal) {
        this.fechaFinReal = fechaFinReal;
    }

    public String getJustificacionRetraso() {
        return justificacionRetraso;
    }
    public void setJustificacionRetraso(String justificacionRetraso) {
        this.justificacionRetraso = justificacionRetraso;
    }

    public Integer getHorasProyecto() {
        return horasProyecto;
    }
    public void setHorasProyecto(Integer horasProyecto) {
        this.horasProyecto = horasProyecto;
    }

    public Integer getPorcentajeAvance() {
        return porcentajeAvance;
    }
    public void setPorcentajeAvance(Integer porcentajeAvance) {
        this.porcentajeAvance = porcentajeAvance;
    }

    public String getIndicadorActual() {
        return indicadorActual;
    }
    public void setIndicadorActual(String indicadorActual) {
        this.indicadorActual = indicadorActual;
    }

    public String getIndicadorEsperado() {
        return indicadorEsperado;
    }
    public void setIndicadorEsperado(String indicadorEsperado) {
        this.indicadorEsperado = indicadorEsperado;
    }

    public String getIndicadorFinal() {
        return indicadorFinal;
    }
    public void setIndicadorFinal(String indicadorFinal) {
        this.indicadorFinal = indicadorFinal;
    }
}


