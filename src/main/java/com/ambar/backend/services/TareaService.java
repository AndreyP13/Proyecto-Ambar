package com.ambar.backend.services;

import com.ambar.backend.model.Tarea;
import com.ambar.backend.repository.TareaRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class TareaService {

    private final TareaRepository tareaRepository;

    public TareaService(TareaRepository tareaRepository) {
        this.tareaRepository = tareaRepository;
    }

    public List<Tarea> listarTodas() {
        return tareaRepository.findAll();
    }

    public List<Tarea> listarPorEstado(String estado) {
        return tareaRepository.findByEstado(estado);
    }

    public Tarea crearTarea(Tarea tarea) {
        return tareaRepository.save(tarea);
    }

    public Tarea actualizarTarea(Long id, Tarea tareaActualizada) {
        Optional<Tarea> tareaExistente = tareaRepository.findById(id);
        if (tareaExistente.isPresent()) {
            Tarea tarea = tareaExistente.get();
            tarea.setNombre(tareaActualizada.getNombre());
            tarea.setResponsable(tareaActualizada.getResponsable());
            tarea.setEstado(tareaActualizada.getEstado());
            tarea.setFechaInicio(tareaActualizada.getFechaInicio());
            tarea.setFechaFin(tareaActualizada.getFechaFin());
            return tareaRepository.save(tarea);
        }
        return null;
    }

    public void eliminarTarea(Long id) {
        tareaRepository.deleteById(id);
    }
}
