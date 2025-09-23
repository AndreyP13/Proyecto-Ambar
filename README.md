Este proyecto es una **herramienta de gestión de proyectos** que permite administrar de forma sencilla y clara:

- 📂 **Proyectos**
- ✅ **Tareas**
- 👥 **Equipos de trabajo**
- ⏰ **Fechas importantes**
- 📊 **Porcentaje de asignación de equipos**
- 📝 **Historial de cambios**
- 📥 **Descarga de reportes en Excel**

---

## 🔧 Tecnologías utilizadas
- **Backend:** Java + Spring Boot  
- **Frontend:** HTML, CSS, JavaScript  
- **Base de datos:** MySQL (o la que estés usando)  
- **Control de versiones:** Git y GitHub  

---

## 🚀 Lógica principal del código
1. **Inicio de sesión**:  
   El usuario puede iniciar sesión.  
   - Si el login es correcto → muestra mensaje de éxito.  
   - Si cierra sesión → muestra mensaje de cierre.
   - Si no tiene cuenta puede dar clic en los botones de regitrase al inicio de todo el proyecto y crear su usuario y contraseña,IMPORTANTE: El codigo valida qu estos datos sean validos
     si no lo son no podra ingresar.

2. **Gestión de proyectos**:  
   - Crear, editar y eliminar proyectos.  
   
4. **Gestion de tareas**:
 - Crear, editar y eliminar tareas. ( Trabajo en progreso falta la logica de acoplarlas a los proyectos )
    
4. **Gestion de tiempo**:

   - Se puede agregar horas a los proyectos existentes desde el modulo de tiempo,este agregara todas las horas que trabajemos a las semana en el proyecto,
     simpelmente deberemos agregar las horas y darle al boton guardar

6. **Reportes**:  
   - Generación de reportes descargables en formato **PDF** con información de proyectos, tareas y usuarios,esoger la pestaña que quiere
     descargar y darle al boton descargar,esta descargara el PDF con la informacion.  ( Trabajo en progreso falta darle mas profundidad a los reportes a descargar )

  
7. **Gestión de usuarios** (desde el módulo *Usuarios*)  
   - **Crear usuario:** administrador puede crear nuevos usuarios manualmente.  
   - **Modificar usuario:** se permite actualizar datos como nombre, correo, rol, etc.  
   - **Eliminar usuario:** los usuarios pueden ser eliminados del sistema.  
   - **Listar usuarios:** muestra todos los usuarios registrados.
   - Aun pendiente de agregarle la logica en la que se agregan los tipo de proyectos y cantidad de proyectos que tiene el usuario 

8. **Gestión de timepo global** (Por hacer)

   - **ROTURA DE LOGICA:** Al intentar configurar este modulo se rompia la logica de diversos modulos y no es posible configurarla,buscando solucion actualmente.
   - LOGICA: Debera extraer la informacion de los usuarios que registraron horas y debera mostrar en que dias y cuantas horas registro cada usuario por cada semana.
   
---

## ▶️ Cómo ejecutar el proyecto
1. Clona el repositorio:
   ```bash
   git clone https://github.com/AndreyP13/Proyecto-Ambar.git
