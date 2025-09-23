package com.ambar.backend.controller;

import com.ambar.backend.model.Proyecto;
import com.ambar.backend.model.Usuario;
import com.ambar.backend.model.Tarea;
import com.ambar.backend.repository.ProyectoRepository;
import com.ambar.backend.repository.UsuarioRepository;
import com.ambar.backend.repository.TareaRepository;
import com.lowagie.text.*;
import com.lowagie.text.pdf.PdfPTable;
import com.lowagie.text.pdf.PdfWriter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.util.List;

@RestController
@RequestMapping("/api/reportes")
@CrossOrigin(origins = "*")
public class ReporteController {

    private final ProyectoRepository proyectoRepository;
    private final UsuarioRepository usuarioRepository;
    private final TareaRepository tareaRepository;

    public ReporteController(ProyectoRepository proyectoRepository,
                             UsuarioRepository usuarioRepository,
                             TareaRepository tareaRepository) {
        this.proyectoRepository = proyectoRepository;
        this.usuarioRepository = usuarioRepository;
        this.tareaRepository = tareaRepository;
    }

    // 📌 1) Reporte de Proyectos
    @GetMapping("/proyectos")
    public ResponseEntity<byte[]> generarReporteProyectos() {
        List<Proyecto> proyectos = proyectoRepository.findAll();
        return generarPdfGenerico("REPORTE DE PROYECTOS", proyectos.stream()
                .map(p -> new String[]{p.getId().toString(), p.getNombre(), p.getDescripcion()})
                .toList(),
                new String[]{"ID", "Nombre", "Descripción"},
                "reporte-proyectos.pdf");
    }

    // 📌 2) Reporte de Usuarios
    @GetMapping("/usuarios")
    public ResponseEntity<byte[]> generarReporteUsuarios() {
        List<Usuario> usuarios = usuarioRepository.findAll();
        return generarPdfGenerico("REPORTE DE USUARIOS", usuarios.stream()
                .map(u -> new String[]{u.getId().toString(), u.getNombre(), u.getCorreo(), u.getUsername()})
                .toList(),
                new String[]{"ID", "Nombre", "Correo", "Username"},
                "reporte-usuarios.pdf");
    }

    // 📌 3) Reporte de Tareas
    @GetMapping("/tareas")
public ResponseEntity<byte[]> generarReporteTareas() {
    List<Tarea> tareas = tareaRepository.findAll();
    return generarPdfGenerico("REPORTE DE TAREAS", tareas.stream()
            .map(t -> new String[]{
                    t.getId().toString(),
                    t.getNombre(),
                    t.getResponsable(),
                    t.getEstado(),
                    t.getFechaInicio() != null ? t.getFechaInicio().toString() : "-",
                    t.getFechaFin() != null ? t.getFechaFin().toString() : "-"
            })
            .toList(),
            new String[]{"ID", "Nombre", "Responsable", "Estado", "Fecha Inicio", "Fecha Fin"},
            "reporte-tareas.pdf");
}

    // 📌 Método genérico para generar PDFs
    private ResponseEntity<byte[]> generarPdfGenerico(String titulo, List<String[]> filas,
                                                String[] columnas, String nombreArchivo) {
        try {
            ByteArrayOutputStream baos = new ByteArrayOutputStream();
            Document document = new Document(PageSize.A4);
            PdfWriter.getInstance(document, baos);
            document.open();

            document.add(new Paragraph(titulo, FontFactory.getFont(FontFactory.HELVETICA_BOLD, 16)));
            document.add(new Paragraph("Fecha de generación: " + java.time.LocalDate.now()));
            document.add(new Paragraph(" "));

            PdfPTable table = new PdfPTable(columnas.length);
            table.setWidthPercentage(100);

            // Encabezados
            for (String col : columnas) {
                table.addCell(new Phrase(col, FontFactory.getFont(FontFactory.HELVETICA_BOLD)));
            }

            // Filas
            for (String[] fila : filas) {
                for (String celda : fila) {
                    table.addCell(celda != null ? celda : "-");
                }
            }

            document.add(table);
            document.close();

            return ResponseEntity.ok()
                    .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=" + nombreArchivo)
                    .contentType(MediaType.APPLICATION_PDF)
                    .body(baos.toByteArray());

        } catch (Exception e) {
            return ResponseEntity.status(500).build();
        }
    }
}
