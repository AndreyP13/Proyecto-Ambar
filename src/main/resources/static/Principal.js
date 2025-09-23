document.addEventListener("DOMContentLoaded", function () {
  const API_URL = "http://localhost:8080/api/tareas";
  const ventanaTareas = document.getElementById("ventanaTareas");
  const formularioTarea = document.getElementById("formularioTarea");
  const formNuevaTarea = document.getElementById("formNuevaTarea");
  const tbody = document.querySelector("#tablaTareas tbody");

  if (!tbody) {
    console.error("No se encontró #tablaTareas tbody. Revisa Principal.html");
    return;
  }

  // ---------- Helpers ----------
  function createCell(text) {
    const td = document.createElement("td");
    td.appendChild(document.createTextNode(text ?? ""));
    return td;
  }

// Botón cerrar
const cerrarTareasBtn = document.getElementById("cerrarTareas");
if (cerrarTareasBtn) {
  cerrarTareasBtn.addEventListener("click", () => {
    ventanaTareas.classList.add("oculto");
  });
}

// ---------- FILTRAR TAREAS ----------
document.querySelectorAll(".filtro-tareas").forEach(boton => {
  boton.addEventListener("click", function () {
    const filtro = this.textContent.trim();

    // Quitar activo de todos
    document.querySelectorAll(".filtro-tareas").forEach(btn => btn.classList.remove("activo"));

    // Activar el botón actual
    this.classList.add("activo");

    // Aplicar filtro
    filtrarTareas(filtro);
  });
});

function filtrarTareas(filtro) {
  const filas = document.querySelectorAll("#tablaTareas tbody tr");

  filas.forEach(fila => {
    const estado = fila.querySelector("td:nth-child(3)").textContent.trim().toLowerCase();

    if (filtro === "Todos") {
      fila.style.display = "";
    } else if (filtro === "Pendientes" && estado === "pendiente") {
      fila.style.display = "";
    } else if (filtro === "En proceso" && estado === "en proceso") {
      fila.style.display = "";
    } else if (filtro === "Atrasadas") {
      const fechaFin = new Date(fila.querySelector("td:nth-child(5)").textContent.trim());
      const hoy = new Date();
      if (fechaFin < hoy && estado !== "completada") {
        fila.style.display = "";
      } else {
        fila.style.display = "none";
      }
    } else if (filtro === "Completadas" && estado === "completada") {
      fila.style.display = "";
    } else {
      fila.style.display = "none";
    }
  });
}

  // Esconde todos los menús al hacer click fuera
  document.addEventListener("click", () =>
    document.querySelectorAll(".menu-opciones").forEach(m => m.classList.add("oculto"))
  );

  // ---------- CARGAR TAREAS ----------
  async function cargarTareas() {
    tbody.innerHTML = "";
    try {
      const r = await fetch(API_URL);
      if (!r.ok) throw new Error(`GET ${API_URL} -> ${r.status} ${r.statusText}`);
      const tareas = await r.json();

      if (!Array.isArray(tareas)) {
        console.warn("Respuesta no es array:", tareas);
        return;
      }

      tareas.forEach(tarea => {
        const tr = document.createElement("tr");
        tr.dataset.id = tarea.id;
        tr.dataset.estado = tarea.estado ?? "";

        // Nombre con checkbox
        const tdNombre = document.createElement("td");
        const chk = document.createElement("input");
        chk.type = "checkbox";
        tdNombre.appendChild(chk);
        tdNombre.appendChild(document.createTextNode(" " + (tarea.nombre ?? "")));

        const tdResp = createCell(tarea.responsable ?? "");
        const tdEstado = createCell(tarea.estado ?? "");
        const tdInicio = createCell(tarea.fechaInicio ?? "");
        const tdFin = createCell(tarea.fechaFin ?? "");

        // Acciones (menu + botones)
        const tdAcc = document.createElement("td");
        tdAcc.className = "acciones";

        const wrapper = document.createElement("div");
        wrapper.className = "menu-wrapper";

        const menuBtn = document.createElement("button");
        menuBtn.className = "menu-acciones";
        menuBtn.type = "button";
        menuBtn.textContent = "⋮";

        const menuOpc = document.createElement("div");
        menuOpc.className = "menu-opciones oculto";

        // Botones dentro del menu
        const btnEditar = document.createElement("button");
        btnEditar.type = "button";
        btnEditar.textContent = "✏️ Editar";
        btnEditar.addEventListener("click", async (ev) => {
          ev.stopPropagation();
          // Llenar prompts desde los valores actuales de la fila
          const currentName = tarea.nombre ?? "";
          const currentResp = tarea.responsable ?? "";
          const currentEstado = tarea.estado ?? "";
          const currentInicio = tarea.fechaInicio ?? "";
          const currentFin = tarea.fechaFin ?? "";

          const nuevoNombre = prompt("Nuevo nombre:", currentName);
          if (nuevoNombre === null) { menuOpc.classList.add("oculto"); return; } // cancel
          const nuevoResp = prompt("Nuevo responsable:", currentResp);
          if (nuevoResp === null) { menuOpc.classList.add("oculto"); return; }
          const nuevoEstado = prompt("Nuevo estado:", currentEstado);
          if (nuevoEstado === null) { menuOpc.classList.add("oculto"); return; }
          const nuevoInicio = prompt("Fecha inicio (yyyy-mm-dd):", currentInicio);
          if (nuevoInicio === null) { menuOpc.classList.add("oculto"); return; }
          const nuevoFin = prompt("Fecha fin (yyyy-mm-dd):", currentFin);
          if (nuevoFin === null) { menuOpc.classList.add("oculto"); return; }

          const payload = {
            nombre: nuevoNombre,
            responsable: nuevoResp,
            estado: nuevoEstado,
            fechaInicio: nuevoInicio,
            fechaFin: nuevoFin
          };

          try {
            const res = await fetch(`${API_URL}/${tarea.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`PUT -> ${res.status}`);
            menuOpc.classList.add("oculto");
            await cargarTareas();
            alert("Tarea actualizada ✅");
          } catch (err) {
            console.error("Error actualizando tarea:", err);
            alert("Error actualizando (ver consola)");
          }
        });

        const btnEliminar = document.createElement("button");
        btnEliminar.type = "button";
        btnEliminar.textContent = "🗑️ Eliminar";
        btnEliminar.addEventListener("click", async (ev) => {
          ev.stopPropagation();
          if (!confirm("¿Seguro que deseas eliminar esta tarea?")) { menuOpc.classList.add("oculto"); return; }
          try {
            const res = await fetch(`${API_URL}/${tarea.id}`, { method: "DELETE" });
            if (!res.ok) throw new Error(`DELETE -> ${res.status}`);
            menuOpc.classList.add("oculto");
            tr.remove(); // quitar del DOM inmediatamente
            alert("Tarea eliminada ✅");
          } catch (err) {
            console.error("Error eliminando tarea:", err);
            alert("Error eliminando (ver consola)");
          }
        });

        const btnCopiar = document.createElement("button");
        btnCopiar.type = "button";
        btnCopiar.textContent = "📋 Copiar";
        btnCopiar.addEventListener("click", async (ev) => {
          ev.stopPropagation();
          // Copiar creando una nueva tarea con mismos campos (POST)
          const payload = {
            nombre: tarea.nombre,
            responsable: tarea.responsable,
            estado: tarea.estado,
            fechaInicio: tarea.fechaInicio,
            fechaFin: tarea.fechaFin
          };
          try {
            const res = await fetch(API_URL, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload)
            });
            if (!res.ok) throw new Error(`POST -> ${res.status}`);
            menuOpc.classList.add("oculto");
            await cargarTareas();
            alert("Tarea copiada ✅");
          } catch (err) {
            console.error("Error copiando tarea:", err);
            alert("Error copiando (ver consola)");
          }
        });

        menuOpc.appendChild(btnEditar);
        menuOpc.appendChild(btnEliminar);
        menuOpc.appendChild(btnCopiar);

        menuBtn.addEventListener("click", (ev) => {
          ev.stopPropagation();
          // ocultar otros y mostrar este
          document.querySelectorAll(".menu-opciones").forEach(m => { if (m !== menuOpc) m.classList.add("oculto"); });
          menuOpc.classList.toggle("oculto");
        });

        wrapper.appendChild(menuBtn);
        wrapper.appendChild(menuOpc);
        tdAcc.appendChild(wrapper);

        // Añadir celdas a la fila
        tr.appendChild(tdNombre);
        tr.appendChild(tdResp);
        tr.appendChild(tdEstado);
        tr.appendChild(tdInicio);
        tr.appendChild(tdFin);
        tr.appendChild(tdAcc);

        tbody.appendChild(tr);
      });
    } catch (err) {
      console.error("Error cargando tareas:", err);
      // no hacer crash; mostrar aviso en tabla si se desea
    }
  }

  // Llamar cargarTareas cuando abra el modal
  const abrirBtns = [document.getElementById("abrirTareas"), document.getElementById("abrirTareasTarjeta")].filter(Boolean);
  abrirBtns.forEach(btn => btn.addEventListener("click", () => {
    if (ventanaTareas) ventanaTareas.classList.remove("oculto");
    cargarTareas();
  }));

  // ---------- CREAR TAREA ----------
  if (formNuevaTarea) {
    formNuevaTarea.addEventListener("submit", async function (e) {
      e.preventDefault();
      const nombre = (document.getElementById("nombreTarea")?.value ?? "").trim();
      const responsable = (document.getElementById("responsable")?.value ?? "").trim();
      const estado = (document.getElementById("estado")?.value ?? "").trim();
      const fechaInicio = (document.getElementById("fechaInicio")?.value ?? "").trim();
      const fechaFin = (document.getElementById("fechaFin")?.value ?? "").trim();

      if (!nombre || !responsable || !fechaInicio || !fechaFin || !estado) {
        alert("Todos los campos son obligatorios.");
        return;
      }

      try {
        const res = await fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ nombre, responsable, estado, fechaInicio, fechaFin })
        });
        if (!res.ok) throw new Error(`POST -> ${res.status}`);
        await cargarTareas();
        formNuevaTarea.reset();
        if (formularioTarea) formularioTarea.classList.add("oculto");
      } catch (err) {
        console.error("Error creando tarea:", err);
        alert("Error creando tarea (ver consola)");
      }
    });
  }

  // Inicial (si quieres cargar al abrir la página)
  // cargarTareas();
});

// FINALZIA FUNCION DE CODIGO PARA TAREAS E INICIA CODIGO PARA TIEMPO

// ---------- CONTROL MODAL TIEMPO (autointegrable) ----------
(() => {
  const API_PROYECTOS = "http://localhost:8080/api/proyectos";
  const ventanaTiempo = document.getElementById("ventanaTiempo");
  const btnAbrirTiempo = document.getElementById("abrirTiempo");
  const btnCerrarTiempo = document.getElementById("cerrarTiempo");
  const btnGuardar = document.getElementById("btnGuardarHoras"); // debe existir en HTML

  // abrir modal (si tienes botón)
  if (btnAbrirTiempo) btnAbrirTiempo.addEventListener("click", () => {
    if (ventanaTiempo) ventanaTiempo.classList.remove("oculto");
    cargarProyectosTiempo();
  });
  if (btnCerrarTiempo) btnCerrarTiempo.addEventListener("click", () => {
    if (ventanaTiempo) ventanaTiempo.classList.add("oculto");
  });

  // Cargar proyectos y crear filas
  async function cargarProyectosTiempo() {
    try {
      const res = await fetch(API_PROYECTOS);
      if (!res.ok) throw new Error("Error al obtener proyectos");
      const proyectos = await res.json();

      const tbody = document.querySelector("#tablaTiempo tbody");
      if (!tbody) return;
      tbody.innerHTML = "";

      proyectos.forEach(p => {
        const fila = document.createElement("tr");
        fila.dataset.id = p.id;

        fila.innerHTML = `
          <td><input type="checkbox" class="chk-proyecto" checked /></td>
          <td class="nombre-proy">${escapeHtml(p.nombre || "Sin nombre")}</td>
          <td><input type="number" class="hora" data-dia="lun" min="0" max="24" value="0"></td>
          <td><input type="number" class="hora" data-dia="mar" min="0" max="24" value="0"></td>
          <td><input type="number" class="hora" data-dia="mie" min="0" max="24" value="0"></td>
          <td><input type="number" class="hora" data-dia="jue" min="0" max="24" value="0"></td>
          <td><input type="number" class="hora" data-dia="vie" min="0" max="24" value="0"></td>
          <td class="total-fila">0</td>
        `;
        tbody.appendChild(fila);
      });

      // añadir listeners a inputs y recalcular totales
      attachHoraListeners();
      recalcularTotales();
      actualizarContadorProyectos();
    } catch (err) {
      console.error(err);
      alert("Error cargando proyectos de tiempo. Mira la consola.");
    }
  }

  // evitar inyección simple
  function escapeHtml(text) {
    return String(text).replace(/[&<>"']/g, ch => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));
  }

  function attachHoraListeners() {
    document.querySelectorAll("#tablaTiempo .hora").forEach(input => {
      input.removeEventListener("input", onHoraInput);
      input.addEventListener("input", onHoraInput);
    });
  }

  function onHoraInput(e) {
    const input = e.target;
    if (input.value === "") input.value = 0;
    if (Number(input.value) < 0) input.value = 0;
    if (Number(input.value) > 24) input.value = 24;
    const fila = input.closest("tr");
    if (fila) recalcularFila(fila);
    recalcularTotales();
  }

  function recalcularFila(fila) {
    const horas = fila.querySelectorAll(".hora");
    let total = 0;
    horas.forEach(h => total += Number(h.value) || 0);
    const elTotal = fila.querySelector(".total-fila");
    if (elTotal) elTotal.textContent = total;
  }

  function recalcularTotales() {
    const filas = document.querySelectorAll("#tablaTiempo tbody tr");
    let totalLun=0,totalMar=0,totalMie=0,totalJue=0,totalVie=0;
    filas.forEach(fila => {
      totalLun += Number(fila.querySelector('[data-dia="lun"]').value) || 0;
      totalMar += Number(fila.querySelector('[data-dia="mar"]').value) || 0;
      totalMie += Number(fila.querySelector('[data-dia="mie"]').value) || 0;
      totalJue += Number(fila.querySelector('[data-dia="jue"]').value) || 0;
      totalVie += Number(fila.querySelector('[data-dia="vie"]').value) || 0;
    });
    const totalSemana = totalLun + totalMar + totalMie + totalJue + totalVie;
    const setIf = (selector, val) => { const el = document.querySelector(selector); if (el) el.textContent = val; };
    setIf("#totalLun", totalLun);
    setIf("#totalMar", totalMar);
    setIf("#totalMie", totalMie);
    setIf("#totalJue", totalJue);
    setIf("#totalVie", totalVie);
    setIf("#totalHorasSemana", totalSemana);
  }

  function actualizarContadorProyectos() {
    const count = document.querySelectorAll("#tablaTiempo tbody tr").length;
    const el = document.getElementById("contadorProyectos");
    if (el) el.textContent = `${count} proyecto(s)`;
  }

  // --- Guardar: por cada fila seleccionada hace PATCH sumando total de la fila ---
  async function guardarTodasLasHoras() {
    const filas = Array.from(document.querySelectorAll("#tablaTiempo tbody tr"));
    if (filas.length === 0) { alert("No hay proyectos cargados"); return; }

    // Si tu input semana es obligatorio, puedes validar aquí
    // const semana = document.getElementById("semana").value;
    // if(!semana){ alert("Selecciona una semana"); return; }

    let anyError = false;
    for (const fila of filas) {
      const chk = fila.querySelector(".chk-proyecto");
      if (chk && !chk.checked) continue; // solo filas marcadas

      const proyectoId = fila.dataset.id;
      const totalFila = Number(fila.querySelector(".total-fila").textContent) || 0;

      // si total 0, podemos saltar o enviar 0 según necesidad; aquí lo enviamos
      try {
        const url = `${API_PROYECTOS}/${proyectoId}/agregar-horas?horas=${encodeURIComponent(totalFila)}`;
        const res = await fetch(url, { method: "PATCH" });
        if (!res.ok) {
          console.error("PATCH falló:", res.status, await res.text());
          anyError = true;
          // no return; continúa con otros proyectos
        } else {
          // actualizar UI localmente (opcional)
          const updated = await res.json().catch(()=>null);
          // actualizar input horas en modal proyecto si está abierto
          const inputHorasProyecto = document.getElementById("horasProyecto");
          if (inputHorasProyecto && updated && updated.horasProyecto !== undefined) {
            inputHorasProyecto.value = updated.horasProyecto;
          }
        }
      } catch (err) {
        console.error("Error al enviar PATCH:", err);
        anyError = true;
      }
    }

    // refrescar la lista de proyectos para ver cambios
    if (typeof cargarProyectos === "function") {
      try { await cargarProyectos(); } catch(e){ /*ignore*/ }
    }

    if (anyError) alert("Algún proyecto no se actualizó correctamente. Mira la consola / pestaña Network.");
    else alert("✅ Horas guardadas correctamente.");
  }

  // conectar botón guardar (si existe)
  if (btnGuardar) btnGuardar.addEventListener("click", guardarTodasLasHoras);

  // Exponer funciones si quieres llamarlas manualmente
  window.cargarProyectosTiempo = cargarProyectosTiempo;
  window.recalcularTotalesTiempo = recalcularTotales;

})();



// Inicia parte de EQUIPO

// API base
const API_EQUIPOS = "http://localhost:8080/api/equipos";

// =========================
// ELEMENTOS DOM
// =========================
const ventanaEquipo = document.getElementById("ventanaEquipo");
const btnAbrirEquipo = document.getElementById("abrirEquipo");
const btnCerrarEquipo = document.getElementById("cerrarEquipo");

const btnNuevoEquipo = document.getElementById("btnNuevoEquipo");
const btnEditarEquipo = document.getElementById("btnEditarEquipo");
const btnEliminarEquipo = document.getElementById("btnEliminarEquipo");

const modalNuevoEquipo = document.getElementById("modalNuevoEquipo");
const modalEditarEquipo = document.getElementById("modalEditarEquipo");

const cerrarNuevoEquipo = document.getElementById("cerrarNuevoEquipo");
const cerrarEditarEquipo = document.getElementById("cerrarEditarEquipo");

const btnConfirmarNuevo = document.getElementById("confirmarNuevoEquipo");
const btnConfirmarEditar = document.getElementById("confirmarEditarEquipo");

const selectorEquipo = document.getElementById("selectorEquipo");

// =========================
// ABRIR Y CERRAR VENTANAS
// =========================
btnAbrirEquipo.addEventListener("click", () => {
  ventanaEquipo.classList.remove("oculto");
  listarEquipos();
});
btnCerrarEquipo.addEventListener("click", () => ventanaEquipo.classList.add("oculto"));

btnNuevoEquipo.addEventListener("click", () => {
  modalNuevoEquipo.classList.remove("oculto");
  ventanaEquipo.classList.add("oculto");
});
cerrarNuevoEquipo.addEventListener("click", () => {
  modalNuevoEquipo.classList.add("oculto");
  ventanaEquipo.classList.remove("oculto");
});

btnEditarEquipo.addEventListener("click", async () => {
  const id = selectorEquipo.value;
  if (!id) return alert("⚠️ Selecciona un equipo primero");

  const res = await fetch(`${API_EQUIPOS}/${id}`);
  const equipo = await res.json();

  document.getElementById("editarNombreEquipo").value = equipo.nombre;
  document.getElementById("editarProyectosEquipo").value = equipo.proyectosEquipo;
  document.getElementById("editarProyectosPersonales").value = equipo.proyectosPersonales;
  document.getElementById("editarOcupacionEquipo").value = equipo.ocupacion;

  modalEditarEquipo.classList.remove("oculto");
  ventanaEquipo.classList.add("oculto");
});
cerrarEditarEquipo.addEventListener("click", () => {
  modalEditarEquipo.classList.add("oculto");
  ventanaEquipo.classList.remove("oculto");
});

// =========================
// LISTAR EQUIPOS
// =========================
async function listarEquipos() {
  try {
    const resp = await fetch(API_EQUIPOS);
    const equipos = await resp.json();

    renderizarMiembrosEquipo(equipos);
    cargarEquiposEnSelector(equipos);
  } catch (err) {
    console.error("Error al listar equipos:", err);
  }
}

function renderizarMiembrosEquipo(equipos) {
  const tbody = document.getElementById("tablaMiembros");
  tbody.innerHTML = "";

  let totalOcupacion = 0;

  equipos.forEach((equipo) => {
    const fila = document.createElement("tr");

    const proyectosEquipo = equipo.proyectosEquipo || 0;
    const proyectosPersonales = equipo.proyectosPersonales || 0;
    const ocupacion = equipo.ocupacion || 0;

    totalOcupacion += ocupacion;

    fila.innerHTML = `
      <td>${equipo.nombre}</td>
      <td>${proyectosEquipo}</td>
      <td>${proyectosPersonales}</td>
      <td>
        <div class="barra-ocupacion">
          <div class="barra" style="width:${ocupacion}%"></div>
          <span>${ocupacion}%</span>
        </div>
      </td>
    `;

    tbody.appendChild(fila);
  });

  const totalGeneral = equipos.length > 0
    ? Math.round(totalOcupacion / equipos.length)
    : 0;

  document.querySelector(".fila-total strong").textContent = `${totalGeneral}%`;
}

function cargarEquiposEnSelector(equipos) {
  selectorEquipo.innerHTML = "";
  equipos.forEach((equipo) => {
    const option = document.createElement("option");
    option.value = equipo.id;
    option.textContent = equipo.nombre;
    selectorEquipo.appendChild(option);
  });
}

// =========================
// CREAR EQUIPO
// =========================
btnConfirmarNuevo.addEventListener("click", async () => {
  const nuevo = {
    nombre: document.getElementById("nombreEquipo").value,
    proyectosEquipo: parseInt(document.getElementById("proyectosEquipo").value) || 0,
    proyectosPersonales: parseInt(document.getElementById("proyectosPersonales").value) || 0,
    ocupacion: parseInt(document.getElementById("ocupacionEquipo").value) || 0,
  };

  await fetch(API_EQUIPOS, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(nuevo),
  });

  modalNuevoEquipo.classList.add("oculto");
  ventanaEquipo.classList.remove("oculto");
  listarEquipos();
});

// =========================
// EDITAR EQUIPO
// =========================
btnConfirmarEditar.addEventListener("click", async () => {
  const id = selectorEquipo.value;
  if (!id) return alert("⚠️ Selecciona un equipo primero");

  const actualizado = {
    nombre: document.getElementById("editarNombreEquipo").value,
    proyectosEquipo: parseInt(document.getElementById("editarProyectosEquipo").value) || 0,
    proyectosPersonales: parseInt(document.getElementById("editarProyectosPersonales").value) || 0,
    ocupacion: parseInt(document.getElementById("editarOcupacionEquipo").value) || 0,
  };

  await fetch(`${API_EQUIPOS}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(actualizado),
  });

  modalEditarEquipo.classList.add("oculto");
  ventanaEquipo.classList.remove("oculto");
  listarEquipos();
});

// =========================
// ELIMINAR EQUIPO
// =========================
btnEliminarEquipo.addEventListener("click", async () => {
  const id = selectorEquipo.value;
  if (!id) return alert("⚠️ Selecciona un equipo primero");

  if (confirm("¿Seguro que deseas eliminar este equipo?")) {
    await fetch(`${API_EQUIPOS}/${id}`, { method: "DELETE" });
    listarEquipos();
  }
});


// ================= CREAR EQUIPO =================


// Finaliza parte de EQUIPO

// ========================
// CONFIGURACIÓN
// ========================
const API_URL = "http://localhost:8080/api/proyectos";

// ========================
// MODALES PROYECTO
// ========================
function abrirModalProyectos() {
  document.getElementById("ventanaProyectos").classList.remove("oculto");
  cargarProyectos();
}
function cerrarModalProyectos() {
  document.getElementById("ventanaProyectos").classList.add("oculto");
}
function abrirModalProyecto() {
  document.getElementById("modalProyecto").classList.remove("oculto");
}
function cerrarModalProyecto() {
  document.getElementById("modalProyecto").classList.add("oculto");
  document.getElementById("formProyecto").reset();
  document.getElementById("proyectoId").value = "";
}

// ========================
// CRUD - CARGAR LISTA
// ========================
async function cargarProyectos() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Error al cargar proyectos");
    const proyectos = await res.json();

    const contenedor = document.getElementById("listaProyectos");
    contenedor.innerHTML = "";

    proyectos.forEach(p => {
      const fila = document.createElement("tr");
      console.log("Proyectos desde backend:", proyectos);
      // 📊 Progreso visual
      const progreso = p.porcentajeAvance || 0;
      const barraProgreso = `
        <div class="barra-progreso">
          <div class="relleno" style="width:${progreso}%;"></div>
        </div>
        <span>${progreso}%</span>
      `;

      fila.innerHTML = `
        <td>${p.nombre || "Sin nombre"}</td>
        <td>${barraProgreso}</td>
        <td>${p.estado || "Desconocido"}</td>
        <td>
          ${p.ultimaActualizacion ? p.ultimaActualizacion : "-"}
        </td>
        <td>${p.cliente || "-"}</td>
        <td>
          <button class="btn" onclick="editarProyecto(${p.id})">✏️ Editar</button>
          <button class="btn cancelar" onclick="eliminarProyecto(${p.id})">🗑 Eliminar</button>
        </td>
      `;
      contenedor.appendChild(fila);
    });
  } catch (error) {
    console.error(error);
  }
}

// ========================
// CRUD - CREAR / ACTUALIZAR
// ========================
async function guardarProyecto() {
  const id = document.getElementById("proyectoId").value;

  const proyecto = {
    nombre: document.getElementById("nombre").value,
    identificador: document.getElementById("identificador").value,
    descripcion: document.getElementById("descripcion").value,
    estado: document.getElementById("estadoProyecto").value,
    tipoProyecto: document.getElementById("tipoProyecto").value,
    cliente: document.getElementById("cliente").value,
    equipoAsignado: document.getElementById("equipoAsignado").value,
    oportunidad: document.getElementById("oportunidad").value,
    fechaInicioEstimada: document.getElementById("fechaInicioEstimada").value,
    fechaFinEstimada: document.getElementById("fechaFinEstimada").value,
    fechaInicioReal: document.getElementById("fechaInicioReal").value,
    fechaFinReal: document.getElementById("fechaFinReal").value,
    justificacionRetraso: document.getElementById("justificacionRetraso").value,
    porcentajeAvance: document.getElementById("porcentajeAvance").value,
    indicadorActual: document.getElementById("indicadorActual").value,
    indicadorEsperado: document.getElementById("indicadorEsperado").value,
    indicadorFinal: document.getElementById("indicadorFinal").value
  };
    console.log("Proyecto que se envía:", proyecto); // DEBUG

  try {
    const res = await fetch(id ? `${API_URL}/${id}` : API_URL, {
      method: id ? "PUT" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(proyecto)
    });
    if (!res.ok) throw new Error("Error al guardar proyecto");
    await cargarProyectos();
    cerrarModalProyecto();
  } catch (error) {
    console.error(error);
  }
}

// ========================
// CRUD - EDITAR
// ========================
async function editarProyecto(id) {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    if (!res.ok) throw new Error("Error al obtener proyecto");
    const p = await res.json();

    document.getElementById("proyectoId").value = p.id || "";
    document.getElementById("nombre").value = p.nombre || "";
    document.getElementById("identificador").value = p.identificador || "";
    document.getElementById("descripcion").value = p.descripcion || "";
    // Normalizar valor del backend
    function mapEstadoBackendAEnum(raw) {
    if (!raw) return "POR_INICIAR";
    const v = raw.toString().trim().toLowerCase();

    if (v === "por_iniciar" || v === "por iniciar" || v === "por-iniciar" || v === "poriniciar" || v === "por iniciar") return "POR_INICIAR";
    if (v === "en_curso"   || v === "en curso"   || v === "en-curso"   || v === "enprogreso" || v === "en progreso")  return "EN_CURSO";
    if (v === "finalizado" || v === "final") return "FINALIZADO";

  // si viene ya como enum: POR_INICIAR, EN_CURSO, FINALIZADO
    const u = raw.toString().trim().toUpperCase();
    if (["POR_INICIAR","EN_CURSO","FINALIZADO"].includes(u)) return u;

  // fallback seguro
    return "POR_INICIAR";
}

/* en editarProyecto (después de const p = await res.json(); ) */
const estadoSelect = document.getElementById("estado");
if (estadoSelect) {
  estadoSelect.value = mapEstadoBackendAEnum(p.estado);
}
    document.getElementById("tipoProyecto").value = p.tipoProyecto || "Estándar";
    document.getElementById("cliente").value = p.cliente || "";
    document.getElementById("equipoAsignado").value = p.equipoAsignado || "";
    document.getElementById("oportunidad").value = p.oportunidad || "A tiempo";
    document.getElementById("fechaInicioEstimada").value = p.fechaInicioEstimada || "";
    document.getElementById("fechaFinEstimada").value = p.fechaFinEstimada || "";
    document.getElementById("fechaInicioReal").value = p.fechaInicioReal || "";
    document.getElementById("fechaFinReal").value = p.fechaFinReal || "";
    document.getElementById("justificacionRetraso").value = p.justificacionRetraso || "";
    document.getElementById("horasProyecto").value =
      p.horasProyecto !== null && p.horasProyecto !== undefined ? p.horasProyecto : 0;
    document.getElementById("porcentajeAvance").value = p.porcentajeAvance || "";
    document.getElementById("indicadorActual").value = p.indicadorActual || "";
    document.getElementById("indicadorEsperado").value = p.indicadorEsperado || "";
    document.getElementById("indicadorFinal").value = p.indicadorFinal || "";

    abrirModalProyecto();
  } catch (error) {
    console.error(error);
  }
}

// ========================
// CRUD - ELIMINAR
// ========================
async function eliminarProyecto(id) {
  if (!confirm("¿Seguro que quieres eliminar este proyecto?")) return;
  try {
    const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Error al eliminar proyecto");
    await cargarProyectos();
  } catch (error) {
    console.error(error);
  }
}

// -------------------------
// Helper: lectura segura
// -------------------------
function getVal(id) {
  const el = document.getElementById(id);
  if (!el) {
    console.error(`Elemento no encontrado: #${id}`);
    return ""; // valor por defecto para no romper
  }
  return el.value;
}

// -------------------------
// EVENTOS INICIALES
// -------------------------
document.addEventListener("DOMContentLoaded", () => {
  const btnNuevo = document.getElementById("btnNuevoProyecto");
  const btnCerrar = document.getElementById("btnCerrarProyecto");
  const btnGuardar = document.getElementById("btnGuardarProyecto");
  const cerrarX = document.getElementById("cerrarModal");

  if (btnNuevo) btnNuevo.addEventListener("click", () => {

    // 🔥 LIMPIAR FORMULARIO ANTES DE ABRIR
    const form = document.getElementById("formProyecto");
    if (form) form.reset(); // borra todos los campos
    document.getElementById("proyectoId").value = ""; // asegura que no quede ID del anterior

    // abrir modal
    const m = document.getElementById("modalProyecto");
    if (m) m.classList.remove("oculto");
  });

  if (btnCerrar) btnCerrar.addEventListener("click", () => {
    const m = document.getElementById("modalProyecto");
    if (m) m.classList.add("oculto");
  });

  if (cerrarX) cerrarX.addEventListener("click", () => {
    const m = document.getElementById("modalProyecto");
    if (m) m.classList.add("oculto");
  });

  if (btnGuardar) btnGuardar.addEventListener("click", guardarProyecto);

  // cargar lista al inicio
  if (typeof cargarProyectos === "function") cargarProyectos();
});

 // ----------------- PROYECTOS ASIDE -----------------

async function cargarProyectosAside() {
    try {
      const resp = await fetch("http://localhost:8080/api/proyectos"); // cambia por tu endpoint real
      if (!resp.ok) throw new Error("Error al cargar proyectos");

      const proyectos = await resp.json();
      const lista = document.getElementById("listaProyectosAside");

      // Limpiar lista anterior
      lista.innerHTML = "";

      // Agregar proyectos de la BD
      proyectos.forEach(p => {
        const li = document.createElement("li");
        li.textContent = p.nombre;
        li.addEventListener("click", () => {
        editarProyecto(p.id);
      });
        lista.appendChild(li);
      });

    } catch (err) {
      console.error(err);
    }
  }
    // Llamar al cargar la página
  window.onload = cargarProyectosAside;



 // ----------------- MÓDULO USUARIOS -----------------
function abrirModalUsuarios() {
    const modal = document.getElementById("modalUsuarios");
    modal.classList.remove("oculto"); // o la clase que uses para ocultar
  }

  function cerrarModalUsuarios() {
    const modal = document.getElementById("modalUsuarios");
    modal.classList.add("oculto");
  }

// =============================
// CARGAR USUARIOS
// =============================
async function cargarUsuarios() {
  const response = await fetch("http://localhost:8080/api/usuarios");
  const usuarios = await response.json();

  const tbody = document.querySelector("#tablaUsuariosBody");
  tbody.innerHTML = "";

  usuarios.forEach(u => {
    const fila = `
      <tr>
        <td>${u.nombre}</td>
        <td>${u.rol}</td>
        <td>${u.tiposProyectos || "-"}</td>
        <td>${u.numeroProyectos || "-"}</td>
        <td>${u.equipo}</td>
        <td>${u.correo}</td>
        <td>${u.estado}</td>
        <td>
          <button class="btn-editar" data-id="${u.id}">✏️ Editar</button>
        </td>
      </tr>
    `;
    tbody.insertAdjacentHTML("beforeend", fila);
  });

  prepararBotonesEditar();
}

// =============================
// ABRIR MODAL DE EDICIÓN
// =============================
function prepararBotonesEditar() {
  document.querySelectorAll(".btn-editar").forEach(btn => {
    btn.addEventListener("click", async () => {
      const id = btn.dataset.id;

      const response = await fetch(`http://localhost:8080/api/usuarios/${id}`);
      const usuario = await response.json();

      // Llenar formulario con datos
      document.querySelector("#editId").value = usuario.id;
      document.querySelector("#editNombre").value = usuario.nombre;
      document.querySelector("#editUsername").value = usuario.username;
      document.querySelector("#editCorreo").value = usuario.correo;
      document.querySelector("#editEquipo").value = usuario.equipo;
      document.querySelector("#editEstado").value = usuario.estado;
      document.querySelector("#editRol").value = usuario.rol;

      // Mostrar modal
      document.querySelector("#modalEditarUsuario").classList.remove("oculto");
    });
  });
}

// Botón eliminar dentro del modal
document.querySelector("#btnEliminarUsuario").addEventListener("click", async () => {
  const id = document.querySelector("#editId").value;

  if (!id) {
    alert("❌ No se encontró el ID del usuario");
    return;
  }

  if (confirm("⚠️ ¿Seguro que quieres eliminar este usuario?")) {
    const res = await fetch(`http://localhost:8080/api/usuarios/${id}`, {
      method: "DELETE"
    });

    if (res.ok) {
      alert("✅ Usuario eliminado");
      cerrarModalEditar();
      cargarUsuarios(); // recargar la tabla
    } else {
      alert("❌ Error al eliminar usuario");
    }
  }
});

// Abrir modal en modo "nuevo usuario"
document.querySelector("#btnNuevoUsuario").addEventListener("click", () => {
  document.querySelector("#formEditarUsuario").reset(); // limpiar campos
  document.querySelector("#editId").value = ""; // vacío = crear
  document.querySelector("#modalEditarUsuario").classList.remove("oculto");
});

document.querySelector("#formEditarUsuario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.querySelector("#editId").value;
  const data = {
    nombre: document.querySelector("#editNombre").value,
    username: document.querySelector("#editUsername").value,
    correo: document.querySelector("#editCorreo").value,
    equipo: document.querySelector("#editEquipo").value,
    estado: document.querySelector("#editEstado").value,
    rol: document.querySelector("#editRol").value
  };

  // Si es nuevo usuario, agregar contraseña
  if (!id) {
    data.password = document.querySelector("#editPassword").value;
  }

  const url = id
    ? `http://localhost:8080/api/usuarios/${id}`
    : `http://localhost:8080/api/usuarios`;

  const method = id ? "PUT" : "POST";

  await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });

  cerrarModalEditar();
  cargarUsuarios();
});




// Cambiar pestañas en el modal
document.querySelectorAll(".tablink").forEach(btn => {
  btn.addEventListener("click", () => {
    // Quitar "active" de todas
    document.querySelectorAll(".tablink").forEach(b => b.classList.remove("active"));
    document.querySelectorAll(".tab-pane").forEach(p => p.classList.remove("active"));

    // Activar la seleccionada
    btn.classList.add("active");
    document.getElementById(btn.dataset.tab).classList.add("active");
  });
});

// =============================
// GUARDAR CAMBIOS
// =============================
document.querySelector("#formEditarUsuario").addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = document.querySelector("#editId").value;

  const usuarioActualizado = {
    id: id,
    nombre: document.querySelector("#editNombre").value,
    username: document.querySelector("#editUsername").value,
    correo: document.querySelector("#editCorreo").value,
    equipo: document.querySelector("#editEquipo").value,
    estado: document.querySelector("#editEstado").value,
    rol: document.querySelector("#editRol").value
  };

  await fetch(`http://localhost:8080/api/usuarios/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(usuarioActualizado)
  });

  cerrarModalEditar();
  cargarUsuarios(); // refrescar tabla
});

// =============================
// CERRAR MODAL
// =============================
function cerrarModalEditar() {
  document.querySelector("#modalEditarUsuario").classList.add("oculto");
}

// =============================
// INICIO
// =============================
cargarUsuarios();





  // MODAL REPORTES

console.log("✅ Archivo de reportes cargado correctamente");

function abrirModalReportes() {
  const modal = document.getElementById("ventanaReportes");
  if (modal) modal.classList.remove("oculto");
}

function cerrarModalReportes() {
  const modal = document.getElementById("ventanaReportes");
  if (modal) modal.classList.add("oculto");
}

function mostrarTabReporte(tab, event) {
  // Ocultar todos los contenidos
  document.querySelectorAll(".contenido-reporte").forEach(t => t.classList.add("oculto"));
  // Quitar "active" de todos los botones
  document.querySelectorAll(".tabs-reportes .tab").forEach(b => b.classList.remove("active"));
  // Mostrar el tab seleccionado
  document.getElementById(`tab-${tab}`).classList.remove("oculto");
  if (event) event.target.classList.add("active");
}

function descargarReporte() {
  alert("✅ Función descargarReporte encontrada");

  const tabActiva = document.querySelector(".tabs-reportes .tab.active");
  if (!tabActiva) {
    alert("No hay ninguna pestaña seleccionada.");
    return;
  }

  const tabNombre = tabActiva.innerText.toLowerCase();

  let endpoint = "";
  if (tabNombre.includes("tareas")) {
    endpoint = "/api/reportes/tareas";
  } else if (tabNombre.includes("proyectos")) {
    endpoint = "/api/reportes/proyectos";
  } else if (tabNombre.includes("usuarios")) {
    endpoint = "/api/reportes/usuarios";
  }

  console.log("📊 Tab activa:", tabNombre, "-> Endpoint:", endpoint);

  if (!endpoint) {
    alert("No se pudo determinar el reporte a descargar.");
    return;
  }

  // Hacer la petición al backend
  fetch("http://localhost:8080" + endpoint)
    .then(response => {
      if (!response.ok) throw new Error("Error al generar el reporte");
      return response.blob();
    })
    .then(blob => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `reporte-${tabNombre}.pdf`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    })
    .catch(error => {
      console.error("❌ Error en descarga:", error);
      alert("Hubo un problema al descargar el reporte.");
    });
}

// 🔑 Hacerla accesible globalmente
window.descargarReporte = descargarReporte;

function verReporte() {
  const tabActiva = document.querySelector(".tabs-reportes .tab.active");
  if (!tabActiva) return;
  const tabNombre = tabActiva.innerText.toLowerCase();
  window.open("http://localhost:8080/api/reportes/" + tabNombre, "_blank");
}

  // MODAL TIEMPO GLOBAL

function abrirModalTiempoUsuarios() {
  document.getElementById("modalTiempoUsuarios").classList.remove("oculto");
}

function cerrarModalTiempoGlobal() {
  const modal = document.getElementById("modalTiempoUsuarios");
  if (modal) {
    modal.classList.add("oculto");
  }
}

  // PERFIL DE USUARIO


document.addEventListener("DOMContentLoaded", () => {
    const btnPerfil = document.getElementById("btnVerPerfil");
    if (btnPerfil) {
      btnPerfil.addEventListener("click", (e) => {
        e.preventDefault();
        window.location.href = "perfil.html";
      });
    }
  });

  document.addEventListener("DOMContentLoaded", () => {
  const usuario = JSON.parse(localStorage.getItem("usuarioLogueado"));

  if (!usuario) {
    console.warn("⚠️ No hay usuario logueado. Redirigiendo al login...");
    window.location.href = "login.html";
    return;
  }

  // ✅ Mostrar datos del usuario en el header
  document.querySelector(".usuario-info span").textContent = usuario.username;

  // ✅ Insertar nombre y correo en el dropdown
  const dropdown = document.querySelector(".dropdown-content");
  dropdown.insertAdjacentHTML("afterbegin", `
    <li><strong>${usuario.nombre}</strong></li>
    <li>${usuario.correo}</li>
    <hr>
  `);

  // ✅ Mostrar mensaje de bienvenida si existe
  const mensajeLogin = localStorage.getItem("mensajeLogin");
  if (mensajeLogin) {
    mostrarToast(mensajeLogin);
    localStorage.removeItem("mensajeLogin");
  }

  // ✅ Botón cerrar sesión
  document.getElementById("btnCerrarSesion").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioLogueado");
    window.location.href = "login.html";
  });

  // ✅ Botón ver perfil
  document.getElementById("btnVerPerfil").addEventListener("click", (e) => {
    e.preventDefault();
    alert(`👤 Nombre: ${usuario.nombre}\n📧 Correo: ${usuario.correo}`);
  });
});

// ✅ Pequeña función para mostrar un toast bonito
function mostrarToast(mensaje) {
  const toast = document.createElement("div");
  toast.textContent = mensaje;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "#4CAF50";
  toast.style.color = "#fff";
  toast.style.padding = "12px 20px";
  toast.style.borderRadius = "8px";
  toast.style.boxShadow = "0px 4px 10px rgba(0,0,0,0.2)";
  toast.style.fontSize = "16px";
  toast.style.zIndex = "9999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.5s ease";

  document.body.appendChild(toast);
  setTimeout(() => toast.style.opacity = "1", 50);

  // Ocultar automáticamente
  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 500);
  }, 3000);
}

// ✅ Botón cerrar sesión
document.getElementById("btnCerrarSesion").addEventListener("click", (e) => {
  e.preventDefault();
  localStorage.removeItem("usuarioLogueado"); // ✅ Borra la sesión
  localStorage.removeItem("mensajeLogin"); // ✅ Limpia mensaje por si acaso
  window.location.href = "login.html"; // ✅ Redirige al login
});

document.addEventListener("DOMContentLoaded", () => {
  const datos = localStorage.getItem("usuarioLogueado");

  // Si no hay datos, redirigir a login
  if (!datos) {
    window.location.href = "login.html";
    return;
  }

  const usuario = JSON.parse(datos);

  // ✅ Mostrar mensaje de bienvenida si existe
  const mensajeLogin = localStorage.getItem("mensajeLogin");
  if (mensajeLogin) {
    alert(mensajeLogin);
    localStorage.removeItem("mensajeLogin");
  }

  // ✅ Mostrar nombre de usuario en header
  document.querySelector(".usuario-info span").textContent = usuario.username;

  // ✅ Botón cerrar sesión
  document.getElementById("btnCerrarSesion").addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("usuarioLogueado");
    localStorage.removeItem("mensajeLogin");
    localStorage.setItem("mensajeLogout", "👋 Has cerrado sesión correctamente");
    window.location.href = "login.html";
  });
});
