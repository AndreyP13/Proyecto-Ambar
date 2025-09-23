package com.ambar.backend.dto;

public class TiempoGlobalDTO {

    private Long usuarioId;
    private String nombreUsuario;
    private double totalHoras;
    private double horasEnProgreso;
    private double horasAprobadas;
    private double horasRechazadas;
    private double horasFaltantes;
    private String nota;

    // Getters y Setters
    public Long getUsuarioId() { return usuarioId; }
    public void setUsuarioId(Long usuarioId) { this.usuarioId = usuarioId; }

    public String getNombreUsuario() { return nombreUsuario; }
    public void setNombreUsuario(String nombreUsuario) { this.nombreUsuario = nombreUsuario; }

    public double getTotalHoras() { return totalHoras; }
    public void setTotalHoras(double totalHoras) { this.totalHoras = totalHoras; }

    public double getHorasEnProgreso() { return horasEnProgreso; }
    public void setHorasEnProgreso(double horasEnProgreso) { this.horasEnProgreso = horasEnProgreso; }

    public double getHorasAprobadas() { return horasAprobadas; }
    public void setHorasAprobadas(double horasAprobadas) { this.horasAprobadas = horasAprobadas; }

    public double getHorasRechazadas() { return horasRechazadas; }
    public void setHorasRechazadas(double horasRechazadas) { this.horasRechazadas = horasRechazadas; }

    public double getHorasFaltantes() { return horasFaltantes; }
    public void setHorasFaltantes(double horasFaltantes) { this.horasFaltantes = horasFaltantes; }

    public String getNota() { return nota; }
    public void setNota(String nota) { this.nota = nota; }
}