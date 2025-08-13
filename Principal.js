document.addEventListener("DOMContentLoaded", function () {
  const ventanaTareas = document.getElementById("ventanaTareas");
  const formularioTarea = document.getElementById("formularioTarea");
  const formNuevaTarea = document.getElementById("formNuevaTarea");
  const tabla = document.querySelector("#tablaTareas tbody");

  // Abrir/Cerrar ventana de tareas
  [document.getElementById("abrirTareas"), document.getElementById("abrirTareasTarjeta")].forEach(btn => {
    if (btn) btn.addEventListener("click", () => ventanaTareas.classList.remove("oculto"));
  });

  const cerrarTareasBtn = ventanaTareas.querySelector("button");
  if (cerrarTareasBtn) {
    cerrarTareasBtn.addEventListener("click", () => ventanaTareas.classList.add("oculto"));
  }

  // Abrir/Cerrar formulario de nueva tarea
  document.getElementById("btnCrearTarea").addEventListener("click", () => {
    formularioTarea.classList.remove("oculto");
  });

  const cerrarFormularioBtn = formularioTarea.querySelector("button");
  if (cerrarFormularioBtn) {
    cerrarFormularioBtn.addEventListener("click", () => {
      formularioTarea.classList.add("oculto");
    });
  }

  // Agregar tarea desde el formulario
  formNuevaTarea.addEventListener("submit", function (e) {
    e.preventDefault();

    const nombre = document.getElementById("nombreTarea").value.trim();
    const responsable = document.getElementById("responsable").value.trim();
    const estado = document.getElementById("estado").value;
    const fechaInicio = document.getElementById("fechaInicio").value;
    const fechaFin = document.getElementById("fechaFin").value;

    if (!nombre || !responsable || !fechaInicio || !fechaFin || !estado) {
      alert("Todos los campos son obligatorios.");
      return;
    }

    const estadoMap = {
      por_iniciar: "Pendiente",
      en_proceso: "En proceso",
      completada: "Completada",
      atrasada: "Atrasada"
    };

    const estadoTexto = estadoMap[estado] || estado;

    const nuevaFila = document.createElement("tr");
    nuevaFila.setAttribute("data-estado", estadoTexto);
    nuevaFila.innerHTML = `
      <td><input type="checkbox" /> ${nombre}</td>
      <td>${responsable}</td>
      <td>${estadoTexto}</td>
      <td>${fechaInicio}</td>
      <td>${fechaFin}</td>
      <td class="acciones">
        <div class="menu-wrapper">
          <button class="menu-acciones">⋮</button>
          <div class="menu-opciones oculto">
            <button onclick="editarTarea(this)">✏️ Editar</button>
            <button onclick="eliminarTarea(this)">🗑️ Eliminar</button>
            <button onclick="copiarTarea(this)">📋 Copiar</button>
          </div>
        </div>
      </td>
    `;

    tabla.appendChild(nuevaFila);
    formNuevaTarea.reset();
    formularioTarea.classList.add("oculto");
  });

  // Menú ⋮
  document.addEventListener("click", function (e) {
    document.querySelectorAll(".menu-opciones").forEach(menu => {
      menu.classList.add("oculto");
    });

    if (e.target.classList.contains("menu-acciones")) {
      const menu = e.target.nextElementSibling;
      menu.classList.toggle("oculto");
      e.stopPropagation();
    }
  });

  // Acciones
  window.editarTarea = function (boton) {
    alert("Editar tarea");
  };

  window.eliminarTarea = function (boton) {
    const fila = boton.closest("tr");
    if (confirm("¿Seguro que deseas eliminar esta tarea?")) {
      fila.remove();
    }
  };

  window.copiarTarea = function (boton) {
    const fila = boton.closest("tr");
    const nueva = fila.cloneNode(true);
    fila.parentElement.appendChild(nueva);
  };

  // Filtro por estado
  document.querySelectorAll(".filtro").forEach((boton) => {
    boton.addEventListener("click", () => {
      const filtro = boton.getAttribute("data-filtro");
      const filas = document.querySelectorAll("#tablaTareas tbody tr");

      filas.forEach((fila) => {
        const estado = fila.getAttribute("data-estado");
        if (filtro === "todos" || estado === filtro) {
          fila.style.display = "";
        } else {
          fila.style.display = "none";
        }
      });
    });
  });

  // Asignar data-estado a filas ya existentes
  document.querySelectorAll("#tablaTareas tbody tr").forEach((fila) => {
    const estadoCelda = fila.children[2]?.textContent.trim();
    if (estadoCelda) {
      fila.setAttribute("data-estado", estadoCelda);
    }
  });
});
// FINALZIA FUNCION DE CODIGO PARA TAREAS EN 130 E INICIA CODIGO APRA TIEMPO EN 136

const ventanaTiempo = document.getElementById("ventanaTiempo");
const btnAbrirTiempo = document.getElementById("abrirTiempo");
const btnCerrarTiempo = document.getElementById("cerrarTiempo");

// Mostrar la ventana de tiempo
btnAbrirTiempo.addEventListener("click", () => {
  ventanaTiempo.classList.remove("oculto");

  // Solo agregar proyectos por defecto si la tabla está vacía
  if (cuerpoTablaTiempo.querySelectorAll("tr").length === 0) {
    proyectosPorDefecto.forEach(proyecto => {
      agregarProyecto(proyecto.nombre, proyecto.horas);
    });
  }
});

// Cerrar la ventana de tiempo
btnCerrarTiempo.addEventListener("click", () => {
  ventanaTiempo.classList.add("oculto");
});
const btnAgregarFilaTiempo = document.getElementById("agregarFilaTiempo");
const cuerpoTablaTiempo = document.querySelector("#tablaTiempo tbody");
const contadorProyectos = document.getElementById("contadorProyectos");

let contador = 0;

const proyectosPorDefecto = [
  {
    nombre: "Proyecto A",
    horas: [2, 4, 3, 5, 0]
  },
  {
    nombre: "Proyecto B",
    horas: [1, 2, 2, 3, 4]
  },
  {
    nombre: "Proyecto C",
    horas: [0, 0, 5, 3, 6]
  }
];

btnAgregarFilaTiempo.addEventListener("click", () => {
  contador++;

  const nuevaFila = document.createElement("tr");

  nuevaFila.innerHTML = `
    <td><input type="checkbox" /></td>
    <td><input type="text" placeholder="Nombre del proyecto"></td>
    <td><input type="number" min="0" max="24" value="0" class="hora-dia"></td>
    <td><input type="number" min="0" max="24" value="0" class="hora-dia"></td>
    <td><input type="number" min="0" max="24" value="0" class="hora-dia"></td>
    <td><input type="number" min="0" max="24" value="0" class="hora-dia"></td>
    <td><input type="number" min="0" max="24" value="0" class="hora-dia"></td>
    <td class="total-proyecto">0</td>
    <td><button class="editar-proyecto">✏️</button></td>
    <td><button class="eliminar-proyecto">🗑️</button></td>
  `;

  cuerpoTablaTiempo.appendChild(nuevaFila);
  actualizarContadorProyectos();
  actualizarEventosEliminar();
  actualizarEventosInputHoras();
  calcularTotales();
});

function actualizarContadorProyectos() {
  const filas = cuerpoTablaTiempo.querySelectorAll("tr");
  contadorProyectos.textContent = `${filas.length} proyecto(s)`;
}
function agregarProyecto(nombre, horasArray) {
  contador++;

  const nuevaFila = document.createElement("tr");

  nuevaFila.innerHTML = `
    <td><input type="checkbox" /></td>
    <td><input type="text" placeholder="Nombre del proyecto" value="${nombre}"></td>
    ${horasArray.map(h => `<td><input type="number" min="0" max="24" value="${h}" class="hora-dia"></td>`).join("")}
    <td class="total-proyecto">0</td>
    <td><button class="editar-proyecto">✏️</button></td>
    <td><button class="eliminar-proyecto">🗑️</button></td>
  `;

  cuerpoTablaTiempo.appendChild(nuevaFila);
  actualizarContadorProyectos();
  actualizarEventosEliminar();
  actualizarEventosInputHoras();
  calcularTotales();
}
// Escuchar todos los cambios en inputs de horas, incluso los agregados después
cuerpoTablaTiempo.addEventListener("input", function (e) {
  if (e.target.classList.contains("hora-dia")) {
    calcularTotales();
  }
});

function calcularTotales() {
  const filas = cuerpoTablaTiempo.querySelectorAll("tr");

  let totalLun = 0, totalMar = 0, totalMie = 0, totalJue = 0, totalVie = 0;
  let totalSemana = 0;

  filas.forEach(fila => {
    const inputs = fila.querySelectorAll(".hora-dia");
    let totalFila = 0;

    inputs.forEach((input, index) => {
      const valor = parseFloat(input.value) || 0;
      totalFila += valor;

      switch (index) {
        case 0: totalLun += valor; break;
        case 1: totalMar += valor; break;
        case 2: totalMie += valor; break;
        case 3: totalJue += valor; break;
        case 4: totalVie += valor; break;
      }
    });

    fila.querySelector(".total-proyecto").textContent = totalFila;
    totalSemana += totalFila;
  });

  // Mostrar en footer
  document.getElementById("totalLun").textContent = totalLun;
  document.getElementById("totalMar").textContent = totalMar;
  document.getElementById("totalMie").textContent = totalMie;
  document.getElementById("totalJue").textContent = totalJue;
  document.getElementById("totalVie").textContent = totalVie;
  document.getElementById("totalHorasSemana").textContent = totalSemana;
}
// Inicia parte de EQUIPO

const ventanaEquipo = document.getElementById("ventanaEquipo");
const btnAbrirEquipo = document.getElementById("abrirEquipo");
const btnCerrarEquipo = document.getElementById("cerrarEquipo");

// Mostrar ventana y renderizar datos
btnAbrirEquipo.addEventListener("click", () => {
  ventanaEquipo.classList.remove("oculto");
  renderizarMiembrosEquipo(); // Mostrar tabla actualizada
});

// Ocultar ventana
btnCerrarEquipo.addEventListener("click", () => {
  ventanaEquipo.classList.add("oculto");
});

// Datos de ejemplo (puedes reemplazarlos por datos reales más adelante)
const miembrosEquipo = [
  {
    nombre: "Andrey Valencia",
    proyectosEquipo: 4,
    proyectosPersonales: 2,
  },
  {
    nombre: "Lucía Pérez",
    proyectosEquipo: 4,
    proyectosPersonales: 1,
  },
  {
    nombre: "Carlos Mejía",
    proyectosEquipo: 4,
    proyectosPersonales: 1,
  }
];

// Función que genera las filas de la tabla con ocupación
function renderizarMiembrosEquipo() {
  const tbody = document.getElementById("tablaMiembros");
  tbody.innerHTML = "";

  let totalOcupacion = 0;

  miembrosEquipo.forEach((miembro) => {
    const fila = document.createElement("tr");

    const totalProyectos = miembro.proyectosEquipo + miembro.proyectosPersonales;
    const ocupacion = Math.min(100, totalProyectos * 10); // Ej: cada proyecto suma 10%

    totalOcupacion += ocupacion;

    fila.innerHTML = `
      <td>${miembro.nombre}</td>
      <td>${miembro.proyectosEquipo}</td>
      <td>${miembro.proyectosPersonales}</td>
      <td>
        <div class="barra-ocupacion">
          <div class="barra" style="width:${ocupacion}%"></div>
          <span>${ocupacion}%</span>
        </div>
      </td>
    `;

    tbody.appendChild(fila);
  });

  // Mostrar promedio general de ocupación del equipo
  const totalGeneral = Math.round(totalOcupacion / miembrosEquipo.length);
  document.querySelector(".totales-equipo strong").textContent = `${totalGeneral}%`;
}

// Finaliza parte de EQUIPO
//Inicia parte de DOCUMENTOS

document.getElementById("abrirDocumentos").addEventListener("click", function () {
  cargarTablaDocumentos(); // <- carga los datos dinámicamente
  mostrarVentana("ventanaDocumentos");
});

document.getElementById("buscarDocumento").addEventListener("input", function () {
  const valor = this.value.trim();
  cargarTablaDocumentos(valor);
});

function mostrarVentana(idVentana) {
  document.getElementById(idVentana).style.display = "flex";
  document.body.classList.add('modal-abierto');
}

function cerrarVentana(idVentana) {
  document.getElementById(idVentana).style.display = "none";
  document.body.classList.remove('modal-abierto');
}
const listaDocumentos = [
  {
    nombreProyecto: "Proyecto B",
    cantidad: 3,
    ultimaFecha: "2025-07-21"
  },
  {
    nombreProyecto: "Proyecto C",
    cantidad: 7,
    ultimaFecha: "2025-07-18"
  },
  {
    nombreProyecto: "Proyecto D",
    cantidad: 0,
    ultimaFecha: "-"
  }
];

function cargarTablaDocumentos(filtro = "") {
  const tbody = document.getElementById("tbodyDocumentos");
  tbody.innerHTML = "";

  const documentosFiltrados = listaDocumentos.filter(doc =>
    doc.nombreProyecto.toLowerCase().includes(filtro.toLowerCase())
  );

  documentosFiltrados.forEach((doc, index) => {
    const fila = document.createElement("tr");

fila.innerHTML = `
  <td>${doc.nombreProyecto}</td>
  <td>${doc.cantidad}</td>
  <td>${doc.ultimaFecha || '-'}</td>
  <td class="acciones-documento">
    <button class="btn-ver" data-index="${index}" title="Ver documento">
      <i class="fas fa-eye"></i>
    </button>
    <button class="btn-subir" data-index="${index}" title="Subir documento">
      <i class="fas fa-upload"></i>
    </button>
    <button class="btn-eliminar" data-index="${index}" title="Eliminar documento">
      <i class="fas fa-trash-alt"></i>
    </button>
  </td>
`;

    tbody.appendChild(fila);
  });

  // Eventos para los botones
  document.querySelectorAll(".btn-ver").forEach(btn =>
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      verDocumentosProyecto(index);
    })
  );

  document.querySelectorAll(".btn-subir").forEach(btn =>
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      subirDocumento(index);
    })
  );

  document.querySelectorAll(".btn-borrar").forEach(btn =>
    btn.addEventListener("click", e => {
      const index = e.target.dataset.index;
      eliminarDocumento(index);
    })
  );
}
function verDocumentosProyecto(index) {
  const doc = listaDocumentos[index];
  alert(`Documentos del proyecto "${doc.nombreProyecto}"`);
  // Aquí puedes abrir un modal si quieres una vista más elegante
}

function subirDocumento(index) {
  const doc = listaDocumentos[index];
  const confirmacion = confirm(`¿Quieres subir un nuevo documento para "${doc.nombreProyecto}"?`);
  if (confirmacion) {
    doc.cantidad += 1;
    doc.ultimaFecha = new Date().toISOString().split("T")[0];
    cargarTablaDocumentos(); // Refrescar
  }
}

function eliminarDocumento(index) {
  const doc = listaDocumentos[index];
  const confirmacion = confirm(`¿Eliminar todos los documentos del proyecto "${doc.nombreProyecto}"?`);
  if (confirmacion) {
    listaDocumentos.splice(index, 1); // Elimina del array
    cargarTablaDocumentos(); // Refrescar tabla
  }
}
// Finaliza parte de DOCUMENTOS
// Inicia parte de ver documento dentro de proyecto

function abrirModalVerDocumentos() {
  const modal = document.getElementById("modalVerDocumentos");
  if (modal) {
    modal.classList.remove("oculto");
  }
}

function cerrarModalVerDocumentos() {
  const modal = document.getElementById("modalVerDocumentos");
  if (modal) {
    modal.classList.add("oculto");
  }
}

// Asigna a todos los íconos de ojo la apertura del modal
document.addEventListener("DOMContentLoaded", function () {
  const iconosVer = document.querySelectorAll(".fa-eye");
  iconosVer.forEach(icono => {
    icono.addEventListener("click", abrirModalVerDocumentos);
  });
});

// INICIAMOS LA APRTE DE VER PROYECTOS

function abrirModalProyectos() {
  document.getElementById("ventanaProyectos").classList.remove("oculto");
}

// Cerrar la ventana modal de proyectos
function cerrarModalProyectos() {
  document.getElementById("ventanaProyectos").classList.add("oculto");
}

// Alternar el dropdown del filtro
function toggleFiltroProyectos() {
  const dropdown = document.getElementById("dropdownFiltroProyectos");
  dropdown.classList.toggle("oculto");
}
// Filtrar proyectos por estado
function aplicarFiltroProyectos(valorSeleccionado) {
  const filas = document.querySelectorAll("#ventanaProyectos .proyecto");

  filas.forEach(fila => {
    fila.classList.remove("oculto");

    const esActivo = fila.classList.contains("activo");
    const esCerrado = fila.classList.contains("cerrado");
    const esBorrado = fila.classList.contains("borrado");

    if (valorSeleccionado === "Activos" && !esActivo) {
      fila.classList.add("oculto");
    } else if (valorSeleccionado === "Cerrados" && !esCerrado) {
      fila.classList.add("oculto");
    } else if (valorSeleccionado === "Borrados" && !esBorrado) {
      fila.classList.add("oculto");
    }
    // "Todos los proyectos" muestra todo, así que no ocultamos nada
  });
}
// Abrir modal de edicion de proyecto
function abrirModalProyecto() {
  document.getElementById("modalProyecto").classList.remove("oculto");
}

// Cerrar modal de proyecto
function cerrarModalProyecto() {
  document.getElementById("modalProyecto").classList.add("oculto");
}

// Asignar eventos al botón y a la X de cierre
document.addEventListener("DOMContentLoaded", function () {
  const btnNuevoProyecto = document.getElementById("btnNuevoProyecto");
  const btnCerrarProyecto = document.getElementById("btnCerrarProyecto");

  if (btnNuevoProyecto) {
    btnNuevoProyecto.addEventListener("click", abrirModalProyecto);
  }

  if (btnCerrarProyecto) {
    btnCerrarProyecto.addEventListener("click", cerrarModalProyecto);
  }
});
function mostrarSeccionProyecto(seccion) {
  const secciones = document.querySelectorAll('.seccion-proyecto');
  secciones.forEach(s => s.classList.add('oculto'));

  const actual = document.getElementById(`seccion-${seccion}`);
  if (actual) actual.classList.remove('oculto');
}
function mostrarSeccionProyecto(idSeccion) {
  // Oculta todas las secciones del modal del proyecto
  const secciones = document.querySelectorAll('.seccion-proyecto');
  secciones.forEach(seccion => {
    seccion.classList.add('oculto');
  });

  // Muestra solo la sección seleccionada
  const seccionMostrar = document.getElementById(`seccion-${idSeccion}`);
  if (seccionMostrar) {
    seccionMostrar.classList.remove('oculto');
  }
}

// Función para abrir el modal de usuarios
function abrirModalUsuarios() {
  document.getElementById("modalUsuarios").classList.remove("oculto");
}

// Función para cerrar el modal de usuarios
function cerrarModalUsuarios() {
  document.getElementById("modalUsuarios").classList.add("oculto");
}

// Opcional: cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", function (e) {
  const modal = document.getElementById("modalUsuarios");
  if (e.target === modal) {
    cerrarModalUsuarios();
  }
});

function abrirModalEditarUsuario() {
  document.getElementById("modalEditarUsuario").classList.remove("oculto");
  mostrarTabUsuario('identificacion');
}

function cerrarModalEditarUsuario() {
  document.getElementById("modalEditarUsuario").classList.add("oculto");
}

function mostrarTabUsuario(tabId) {
  const tabs = document.querySelectorAll(".contenido-tab");
  const botones = document.querySelectorAll(".tab-btn");

  tabs.forEach(tab => tab.classList.add("oculto"));
  botones.forEach(btn => btn.classList.remove("activo"));

  document.getElementById("tab-" + tabId).classList.remove("oculto");
  document.querySelector(`.tab-btn[onclick*="${tabId}"]`).classList.add("activo");
}

function mostrarTabUsuario(tab) {
  const secciones = ["contenidoIdentificacion", "contenidoPermisos", "contenidoNotificaciones"];
  secciones.forEach(id => {
    document.getElementById(id).classList.add("oculto");
  });
  document.getElementById("contenido" + capitalizarPrimera(tab)).classList.remove("oculto");

  // Cambiar botón activo
  const botones = document.querySelectorAll(".tabs button");
  botones.forEach(btn => btn.classList.remove("active"));
  const index = secciones.findIndex(id => id.includes(tab));
  if (index >= 0) botones[index].classList.add("active");
}

function capitalizarPrimera(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function abrirModalReportes() {
  const modal = document.getElementById("ventanaReportes");
  modal.classList.remove("oculto");
  mostrarTabReporte('tareas'); // Muestra por defecto la pestaña de tareas
}

function cerrarModalReportes() {
  document.getElementById("ventanaReportes").classList.add("oculto");
}

function mostrarTabReporte(nombre) {
  // Oculta todo el contenido
  const contenidos = document.querySelectorAll('.contenido-reporte');
  contenidos.forEach(div => div.classList.add('oculto'));

  // Desactiva todos los tabs
  const tabs = document.querySelectorAll('.tabs-reportes .tab');
  tabs.forEach(btn => btn.classList.remove('active'));

  // Muestra el seleccionado
  document.getElementById(`tab-${nombre}`).classList.remove('oculto');

  // Activa el botón correspondiente
  const btnActivo = document.querySelector(`.tabs-reportes .tab[onclick="mostrarTabReporte('${nombre}')"]`);
  if (btnActivo) btnActivo.classList.add('active');
}

function abrirModalReportes() {
  const modal = document.getElementById("ventanaReportes");
  if (modal) {
    modal.classList.remove("oculto");
  }
}

function cerrarModalReportes() {
  const modal = document.getElementById("ventanaReportes");
  if (modal) {
    modal.classList.add("oculto");
  }
}

function mostrarTabReporte(tab) {
  const tabs = document.querySelectorAll(".contenido-reporte");
  tabs.forEach(t => t.classList.add("oculto"));

  const botones = document.querySelectorAll(".tabs-reportes .tab");
  botones.forEach(b => b.classList.remove("active"));

  document.getElementById(`tab-${tab}`).classList.remove("oculto");
  event.target.classList.add("active");
}

function abrirModalTiempoUsuarios() {
  document.getElementById("modalTiempoUsuarios").classList.remove("oculto");
}

function cerrarModalTiempoGlobal() {
  const modal = document.getElementById("modalTiempoUsuarios");
  if (modal) {
    modal.classList.add("oculto");
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const btnVerPerfil = document.getElementById("btnVerPerfil");
  const modalEditarUsuario = document.getElementById("modalEditarUsuario");

  btnVerPerfil.addEventListener("click", function (e) {
    e.preventDefault();
    modalEditarUsuario.classList.remove("oculto");
  });
});

function cerrarModalEditarUsuario() {
  document.getElementById("modalEditarUsuario").classList.add("oculto");
}