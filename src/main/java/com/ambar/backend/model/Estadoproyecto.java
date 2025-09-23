package com.ambar.backend.model;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum Estadoproyecto {
    POR_INICIAR("Por iniciar"),
    EN_CURSO("En curso"),
    FINALIZADO("Finalizado");

    private final String label;

    Estadoproyecto(String label) {
        this.label = label;
    }

    @JsonValue
    public String getLabel() {
        return label;
    }

    @JsonCreator
    public static Estadoproyecto fromString(String value) {
        if (value == null) return POR_INICIAR;
        String v = value.trim().toLowerCase();

        switch (v) {
            case "por iniciar":
            case "por_iniciar":
            case "por-iniciar":
            case "poriniciar":
                return POR_INICIAR;

            case "en curso":
            case "en_curso":
            case "en-curso":
            case "enprogreso":
            case "en progreso":
                return EN_CURSO;

            case "finalizado":
            case "final":
                return FINALIZADO;

            default:
                // Intentar parsear directamente el nombre del enum
                try {
                    return Estadoproyecto.valueOf(value.trim().toUpperCase());
                } catch (Exception e) {
                    throw new IllegalArgumentException("Estado desconocido: " + value);
                }
        }
    }
}
