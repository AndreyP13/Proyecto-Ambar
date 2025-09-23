package com.ambar.backend.controller;

import com.ambar.backend.dto.TiempoGlobalDTO;
import com.ambar.backend.services.TiempoGlobalService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/tiempo-global")
public class TiempoGlobalController {

    private final TiempoGlobalService tiempoGlobalService;

    public TiempoGlobalController(TiempoGlobalService tiempoGlobalService) {
        this.tiempoGlobalService = tiempoGlobalService;
    }

    @GetMapping("/por-semana")
    public List<TiempoGlobalDTO> obtenerTiempoPorSemana(
            @RequestParam("inicio") String inicioStr,
            @RequestParam("fin") String finStr) {
        LocalDate inicio = LocalDate.parse(inicioStr);
        LocalDate fin = LocalDate.parse(finStr);
        return tiempoGlobalService.obtenerTiempoPorSemana(inicio, fin);
    }
}