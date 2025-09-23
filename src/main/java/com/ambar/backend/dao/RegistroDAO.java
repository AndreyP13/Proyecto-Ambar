package com.ambar.backend.dao;

import com.ambar.backend.Config.ConexionDB;
import com.ambar.backend.model.Registro;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class RegistroDAO {

    // CREATE
    public boolean insertar(Registro registro) {
        String sql = "INSERT INTO users (nombre, correo, username, password) VALUES (?, ?, ?, ?)";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, registro.getNombre());
            stmt.setString(2, registro.getCorreo());
            stmt.setString(3, registro.getUsername());
            stmt.setString(4, registro.getPassword());

            int rows = stmt.executeUpdate();
            return rows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // READ ALL
    public List<Registro> obtenerTodos() {
        List<Registro> registros = new ArrayList<>();
        String sql = "SELECT id, nombre, correo, username, password FROM users";
        try (Connection conn = ConexionDB.getConnection();
             Statement stmt = conn.createStatement();
             ResultSet rs = stmt.executeQuery(sql)) {

            while (rs.next()) {
                Registro r = new Registro();
                r.setId(rs.getLong("id"));
                r.setNombre(rs.getString("nombre"));
                r.setCorreo(rs.getString("correo"));
                r.setUsername(rs.getString("username"));
                r.setPassword(rs.getString("password"));
                registros.add(r);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return registros;
    }

    // UPDATE
    public boolean actualizar(Registro registro) {
        String sql = "UPDATE users SET nombre=?, correo=?, username=?, password=? WHERE id=?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setString(1, registro.getNombre());
            stmt.setString(2, registro.getCorreo());
            stmt.setString(3, registro.getUsername());
            stmt.setString(4, registro.getPassword());
            stmt.setLong(5, registro.getId());

            int rows = stmt.executeUpdate();
            return rows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // DELETE
    public boolean eliminar(Long id) {
        String sql = "DELETE FROM users WHERE id=?";
        try (Connection conn = ConexionDB.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {

            stmt.setLong(1, id);
            int rows = stmt.executeUpdate();
            return rows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }
}