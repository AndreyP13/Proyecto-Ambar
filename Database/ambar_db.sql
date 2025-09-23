-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 23-09-2025 a las 04:38:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ambar_db`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `ocupacion` int(11) NOT NULL,
  `proyectos_equipo` int(11) NOT NULL,
  `proyectos_personales` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`id`, `nombre`, `ocupacion`, `proyectos_equipo`, `proyectos_personales`) VALUES
(2, 'Andrey Team', 69, 2, 2),
(3, 'Carolina Team', 80, 4, 4);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proyectos`
--

CREATE TABLE `proyectos` (
  `id` bigint(20) NOT NULL,
  `cliente` varchar(255) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `equipo_asignado` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_fin_estimada` date DEFAULT NULL,
  `fecha_fin_real` date DEFAULT NULL,
  `fecha_inicio_estimada` date DEFAULT NULL,
  `fecha_inicio_real` date DEFAULT NULL,
  `horas_proyecto` int(11) DEFAULT NULL,
  `identificador` varchar(255) DEFAULT NULL,
  `indicador_actual` varchar(255) DEFAULT NULL,
  `indicador_esperado` varchar(255) DEFAULT NULL,
  `indicador_final` varchar(255) DEFAULT NULL,
  `justificacion_retraso` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `oportunidad` varchar(255) DEFAULT NULL,
  `porcentaje_avance` int(11) DEFAULT NULL,
  `tipo_proyecto` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proyectos`
--

INSERT INTO `proyectos` (`id`, `cliente`, `descripcion`, `equipo_asignado`, `estado`, `fecha_fin_estimada`, `fecha_fin_real`, `fecha_inicio_estimada`, `fecha_inicio_real`, `horas_proyecto`, `identificador`, `indicador_actual`, `indicador_esperado`, `indicador_final`, `justificacion_retraso`, `nombre`, `oportunidad`, `porcentaje_avance`, `tipo_proyecto`) VALUES
(1, 'Konecta', 'Herramienta para gestión de proyectos en Konecta', 'Equipo 1', 'EN_CURSO', '2025-12-20', NULL, '2025-09-20', NULL, 233, 'SGA-001', 'Etapa inicial', 'Avance 50%', 'Entrega completada', NULL, 'Sistema de Gestión Ámbar', 'A tiempo', 10, 'Base'),
(2, 'Cliente A', 'Desarrollo de portal web para cliente A', 'Equipo 2', 'POR_INICIAR', '2025-11-30', NULL, '2025-10-05', NULL, 0, 'PORTAL-A', 'Inicio pendiente', '100%', '0%', NULL, 'Portal Web A', 'Riesgo bajo', 0, 'Estándar'),
(3, 'Cliente B', 'Aplicación móvil para seguimiento de entregas', 'Equipo 3', 'EN_CURSO', '2025-12-15', NULL, '2025-09-25', '2025-09-25', 80, 'APP-B', 'Sprint 2', '80%', '—', NULL, 'App Seguimiento B', 'A tiempo', 45, 'Base'),
(4, 'Cliente C', 'Migración de base de datos', 'Equipo 1', 'FINALIZADO', '2025-08-30', '2025-08-29', '2025-06-01', '2025-06-01', 150, 'DB-C', 'Finalizado', '100%', '100%', NULL, 'Migración DB C', 'A tiempo', 100, 'Estándar'),
(5, 'Cliente D', 'Implementación de sistema CRM', 'Equipo 4', 'EN_CURSO', '2025-12-10', NULL, '2025-09-18', '2025-09-18', 120, 'CRM-D', 'Integración', '70%', '—', NULL, 'CRM Cliente D', 'Retraso leve', 60, 'Base'),
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `tareas`
--

CREATE TABLE `tareas` (
  `id` bigint(20) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `responsable` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `fecha_inicio` date DEFAULT NULL,
  `fecha_fin` date DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `tareas`
--

INSERT INTO `tareas` (`id`, `nombre`, `responsable`, `estado`, `fecha_inicio`, `fecha_fin`) VALUES
(6, 'Definir requerimientos iniciales', 'Andrey Valencia', 'Pendiente', '2025-09-25', '2025-10-05'),
(7, 'Diseño de base de datos', 'Laura Pérez', 'En proceso', '2025-09-26', '2025-10-10'),
(8, 'Configuración del servidor', 'Carlos Gómez', 'Pendiente', '2025-09-28', '2025-10-12'),
(9, 'Desarrollo de API de usuarios', 'María Torres', 'En proceso', '2025-09-30', '2025-10-20'),
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) NOT NULL,
  `correo` varchar(255) DEFAULT NULL,
  `nombre` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `equipo` varchar(255) DEFAULT NULL,
  `rol` varchar(255) DEFAULT NULL,
  `estado` varchar(255) DEFAULT NULL,
  `ultima_actividad` datetime DEFAULT NULL,
  `numero_proyectos` int(11) DEFAULT 0,
  `tipos_proyectos` varchar(255) DEFAULT NULL,
  `permiso_proyectos` tinyint(1) DEFAULT 0,
  `permiso_clientes` tinyint(1) DEFAULT 0,
  `permiso_usuarios` tinyint(1) DEFAULT 0,
  `permiso_notificaciones` tinyint(1) DEFAULT 0,
  `permiso_tiempo` tinyint(1) DEFAULT 0,
  `notif_tareas` tinyint(1) DEFAULT 0,
  `notif_nueva_tarea` tinyint(1) DEFAULT 0,
  `notif_tarea_actualizada` tinyint(1) DEFAULT 0,
  `notif_quitar_permisos` tinyint(1) DEFAULT 0,
  `notif_asignar_proyecto` tinyint(1) DEFAULT 0,
  `notif_desasignar_proyecto` tinyint(1) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `correo`, `nombre`, `password`, `username`, `equipo`, `rol`, `estado`, `ultima_actividad`, `numero_proyectos`, `tipos_proyectos`, `permiso_proyectos`, `permiso_clientes`, `permiso_usuarios`, `permiso_notificaciones`, `permiso_tiempo`, `notif_tareas`, `notif_nueva_tarea`, `notif_tarea_actualizada`, `notif_quitar_permisos`, `notif_asignar_proyecto`, `notif_desasignar_proyecto`) VALUES
(2, 'laura.gomez@gmail.com', 'Laura Gómez', 'pass123', 'laura.gomez', 'Equipo Alfa', 'Administrador', 'Activo', '2025-09-21 18:05:20', 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(3, 'carlos.perez@hotmail.com', 'Carlos Pérez', 'pass456', 'carlos.perez', 'Equipo Beta', 'Usuario', 'Activo', '2025-09-21 19:15:42', 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(4, 'mariana.ruiz@gmail.com', 'Mariana Ruiz', 'clave789', 'mariana.ruiz', 'Equipo Gamma', 'Usuario', 'Activo', '2025-09-20 14:45:10', 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),
(5, 'santiago.torres@gmail.com', 'Santiago Torres', 'santi2025', 'santiago.t', 'DXS Andrey', 'Administrador', 'Activo', '2025-09-22 09:11:05', 0, NULL, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0),

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `tareas`
--
ALTER TABLE `tareas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `proyectos`
--
ALTER TABLE `proyectos`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT de la tabla `tareas`
--
ALTER TABLE `tareas`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
