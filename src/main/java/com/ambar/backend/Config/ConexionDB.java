package com.ambar.backend.Config;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConexionDB {
    private static final String URL = "jdbc:mysql://localhost:3306/ambar_db"; // Cambia a tu BD
    private static final String USER = "root";  // NO APLICA usuario XAMPP
    private static final String PASSWORD = "";  // NO APLICA contraseña XAMPP

    public static Connection getConnection() throws SQLException {
        return DriverManager.getConnection(URL, USER, PASSWORD);
    }
}