package com.ambar.backend.dao;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import com.ambar.backend.model.Usuario;
import org.springframework.stereotype.Repository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@Repository
public class UsuarioDao {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioDao.class);

    private static final String URL = "jdbc:mysql://localhost:3306/ambar_db";
    private static final String USER = "root";
    private static final String PASSWORD = "";

    private Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }

    // 1. Listar todos los usuarios
    public List<Usuario> obtenerUsuarios() {
        List<Usuario> lista = new ArrayList<>();
        String sql = "SELECT id, correo, nombre, password, username FROM users";

        try (Connection conn = getConnection();
            PreparedStatement stmt = conn.prepareStatement(sql);
            ResultSet rs = stmt.executeQuery()) {

            while (rs.next()) {
                Usuario u = new Usuario();
                u.setId(rs.getLong("id"));
                u.setCorreo(rs.getString("correo"));
                u.setNombre(rs.getString("nombre"));
                u.setPassword(rs.getString("password"));
                u.setUsername(rs.getString("username"));
                lista.add(u);
            }
        } catch (SQLException e) {
            logger.error("Error al obtener usuarios", e);
        }

        return lista;
    }

    // ✅ Método para insertar usuario
    public boolean insertarUsuario(Usuario usuario) {
        String sql = "INSERT INTO users (correo, nombre, password, username) VALUES (?, ?, ?, ?)";

        try (Connection conn = getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, usuario.getCorreo());
            stmt.setString(2, usuario.getNombre());
            stmt.setString(3, usuario.getPassword());
            stmt.setString(4, usuario.getUsername());

            int filas = stmt.executeUpdate();
            return filas > 0;

        } catch (SQLException e) {
            logger.error("Error al insertar usuario", e);
            return false;
        }
    }

    // ✅ Método main para probar sin controlador
    public static void main(String[] args) {
        UsuarioDao dao = new UsuarioDao();

        Usuario nuevo1 = new Usuario();
        nuevo1.setCorreo("prueba@correo.com");
        nuevo1.setNombre("Usuario Prueba");
        nuevo1.setPassword("123456");
        nuevo1.setUsername("usuarioPrueba");

        boolean creado1 = dao.insertarUsuario(nuevo1);
        logger.info(creado1 ? "✅ Usuario insertado" : "❌ Error al insertar");

        Usuario nuevo2 = new Usuario();
        nuevo2.setCorreo("prueba2@correo.com");
        nuevo2.setNombre("Segundo Usuario");
        nuevo2.setPassword("654321");
        nuevo2.setUsername("usuarioPrueba2");

        boolean creado2 = dao.insertarUsuario(nuevo2);
        logger.info(creado2 ? "✅ Usuario insertado" : "❌ Error al insertar");

        logger.info("📋 Lista de usuarios en la base de datos:");
        for (Usuario u : dao.obtenerUsuarios()) {
            logger.info("ID: {} | Nombre: {} | Correo: {} | Username: {}",
                    u.getId(), u.getNombre(), u.getCorreo(), u.getUsername());
        }
    }
}
