package com.ambar.backend.services;

import com.ambar.backend.dto.TiempoGlobalDTO;
import com.ambar.backend.model.TiempoGlobal;
import com.ambar.backend.repository.TiempoGlobalRepository;
import com.ambar.backend.repository.UsuarioRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class TiempoGlobalService {

    private final TiempoGlobalRepository tiempoGlobalRepository;
    private final UsuarioRepository usuarioRepository;

    public TiempoGlobalService(TiempoGlobalRepository tiempoGlobalRepository,
                            UsuarioRepository usuarioRepository) {
        this.tiempoGlobalRepository = tiempoGlobalRepository;
        this.usuarioRepository = usuarioRepository;
    }

    public List<TiempoGlobalDTO> obtenerTiempoPorSemana(LocalDate inicio, LocalDate fin) {
        // 1) Traer registros de TiempoGlobal entre fechas
        List<TiempoGlobal> registros = tiempoGlobalRepository.findByFechaBetween(inicio, fin);

        // 2) Agrupar por usuario
        Map<Long, List<TiempoGlobal>> porUsuario = registros.stream()
                .collect(Collectors.groupingBy(r -> r.getUsuario().getId())); // asegurarse que TiempoGlobal tiene getUsuario()

        List<TiempoGlobalDTO> resultado = new ArrayList<>();

        // 3) Calcular totales por usuario
        for (Map.Entry<Long, List<TiempoGlobal>> entry : porUsuario.entrySet()) {
            Long usuarioId = entry.getKey();
            List<TiempoGlobal> listaUsuario = entry.getValue();

            double total = listaUsuario.stream()
                    .mapToDouble(r -> r.getHoras() != null ? r.getHoras() : 0.0)
                    .sum();

            double enProgreso = listaUsuario.stream()
                    .filter(r -> "EN_PROGRESO".equalsIgnoreCase(r.getEstado()))
                    .mapToDouble(r -> r.getHoras() != null ? r.getHoras() : 0.0)
                    .sum();

            double aprobado = listaUsuario.stream()
                    .filter(r -> "APROBADO".equalsIgnoreCase(r.getEstado()))
                    .mapToDouble(r -> r.getHoras() != null ? r.getHoras() : 0.0)
                    .sum();

            double rechazado = listaUsuario.stream()
                    .filter(r -> "RECHAZADO".equalsIgnoreCase(r.getEstado()))
                    .mapToDouble(r -> r.getHoras() != null ? r.getHoras() : 0.0)
                    .sum();

            // Construimos el DTO
            TiempoGlobalDTO dto = new TiempoGlobalDTO();
            dto.setUsuarioId(usuarioId);
            dto.setNombreUsuario(usuarioRepository.findById(usuarioId).get().getNombre()); // opcional: traer nombre
            dto.setTotalHoras(total);
            dto.setHorasEnProgreso(enProgreso);
            dto.setHorasAprobadas(aprobado);
            dto.setHorasRechazadas(rechazado);

            resultado.add(dto);
        }

        return resultado;
    }
}