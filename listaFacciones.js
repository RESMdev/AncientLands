const facciones = [
    {
    nombre: "Olimpus",
    subtitulo: "dioses,",
    subtitulo2: "mortales y más",
    lema: "Hijos del rayo, herederos del mundo.",
    imagen: "assets/olimpus.png",
    linea: "assets/lineaOlimpus.svg",
    miembros: 29,
    lider: "Zeus | Niko",
    epoca: "Antigua Grecia",
    reclutando: true,
    victorias: 0,
    ataque: 0,
    defensa: 0,
    diplomacia: 0,
    arquitectura: 0,
    economia: 0,
    popularidad: 0,
    infanteria: 30,
    arqueros: 1,
    caballeria: 0,
    maquinasDeAsedio: 0,
    barcos: 0,
        color1: "#ffffffff",
    color2: "#14ffec",
    ciudades: {
      Dioses: 10,
      Mortales: 21,
    },
    nivelHostilidad: 2,
  },
    {
    nombre: "el Comtat d'Estiche",
    subtitulo: "victory",
    subtitulo2: "victory through god",
    lema: "",
    imagen: "assets/Estiche.png",
    linea: "assets/lineaEstiche.svg",
    miembros: 14,
    lider: "mr_magere_hien",
    epoca: "Crusaders",
    reclutando: true,
    victorias: 0,
    ataque: 0,
    defensa: 0,
    diplomacia: 0,
    arquitectura: 0,
    economia: 0,
    popularidad: 0,
    infanteria: 14,
    arqueros: 0,
    caballeria: 0,
    maquinasDeAsedio: 0,
    barcos: 0,
        color1: "#ffef0eff",
    color2: "#fd0a0aff",
    ciudades: {
      City1: 12,
      City2: 0,
    },
    nivelHostilidad: 2,
  },

  // Agrega más facciones aquí
];

function obtenerHostilidadHTML(nivel) {
  const niveles = {
    5: {
      nombre: "Guerra Total",
      color: "#000000", // Negro
      caracteristicas: [
        "Todo está permitido: PvP, robo, grifeo sin restricciones y en cualquier lugar."
      ]
    },
    4: {
      nombre: "Guerra Salvaje",
      color: "#ff0000", // Rojo
      caracteristicas: [
        "Se permite PvP y robo en cualquier momento.",
        "Está prohibido el grifeo de estructuras."
      ]
    },
    3: {
      nombre: "Duelo con Honor",
      color: "#ff7a00", // Naranja
      caracteristicas: [
        "Se permite PvP.",
        "El botín del jugador asesinado debe ser respetado."
      ]
    },
    2: {
      nombre: "Frontera Peligrosa",
      color: "#ffcc00", // Amarillo
      caracteristicas: [
        "PvP y robo solo están permitidos fuera del territorio protegido de cada facción."
      ]
    },
    1: {
      nombre: "Duelo Controlado",
      color: "#0066ff", // Azul
      caracteristicas: [
        "PvP permitido fuera del territorio.",
        "Robo prohibido en todo momento."
      ]
    },
    0: {
      nombre: "Paz Total",
      color: "#ffffff", // Blanco
      caracteristicas: [
        "Está completamente prohibido el PvP.",
        "Robo y grifeo prohibidos sin excepciones."
      ]
    }
  };

  const nivelData = niveles[nivel] ?? niveles[0];

  const colorCircle = `<span style="
    display: inline-block;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background-color: ${nivelData.color};
    border: 1px solid #666;
    margin-right: 8px;
  "></span>`;

let html = `
  <div class="div">
    ${colorCircle}
    <div class="div-3" style="display: inline-block; vertical-align: middle;">
      Hostilidad: ${nivelData.nombre} (Nivel ${nivel})
    </div>
  </div>
`;

  for (const frase of nivelData.caracteristicas) {
    html += `
      <div class="div caracteristica-hostilidad">
        <img class="iconoEstadistica" src="assets/check.svg" />
        <div class="text-wrapper-2">${frase}</div>
      </div>
    `;
  }

  return html;
}


const contenedor = document.getElementById("contenedor-facciones");
contenedor.innerHTML = "";

let tarjetaActiva = null;
let graficaFlotante = null;

// Función para hacer arrastrable el elemento
function hacerDraggable(elemento) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  const header = elemento.querySelector('.grafica-header');
  
  header.onmousedown = arrastrarMouse;

  function arrastrarMouse(e) {
    e = e || window.event;
    e.preventDefault();
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = soltarMouse;
    document.onmousemove = moverElemento;
  }

  function moverElemento(e) {
    e = e || window.event;
    e.preventDefault();
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    elemento.style.top = (elemento.offsetTop - pos2) + "px";
    elemento.style.left = (elemento.offsetLeft - pos1) + "px";
    elemento.style.transform = 'none';
  }

  function soltarMouse() {
    document.onmouseup = null;
    document.onmousemove = null;
  }
}

// Función para crear/mostrar la gráfica flotante
function mostrarGraficaFlotante(faccion) {
  if (!graficaFlotante) {
    // Crear el contenedor flotante si no existe
    graficaFlotante = document.createElement('div');
    graficaFlotante.id = 'graficaFlotante';
    graficaFlotante.className = 'grafica-flotante';
    graficaFlotante.style.display = 'none';
    graficaFlotante.innerHTML = `
      <div class="grafica-header">
        <span>Estadísticas de ${faccion.nombre}</span>
        <button class="cerrar-grafica">×</button>
      </div>
      <div class="grafica-container">
        <canvas id="graficaFaccion"></canvas>
      </div>
    `;
    document.body.appendChild(graficaFlotante);
    
    // Añadir funcionalidad de arrastre
    hacerDraggable(graficaFlotante);
    
    // Añadir funcionalidad al botón de cerrar
    graficaFlotante.querySelector('.cerrar-grafica').addEventListener('click', () => {
      graficaFlotante.style.display = 'none';
    });
  } else {
    // Actualizar el título si ya existe
    graficaFlotante.querySelector('span').textContent = `Estadísticas de ${faccion.nombre}`;
  }

  // Posición inicial centrada
  graficaFlotante.style.display = 'block';
  graficaFlotante.style.left = '50%';
  graficaFlotante.style.top = '50%';
  graficaFlotante.style.transform = 'translate(-50%, -50%)';

  // Crear la gráfica
  setTimeout(() => {
    const ctx = graficaFlotante.querySelector('#graficaFaccion').getContext('2d');
    if (window.graficaActual) window.graficaActual.destroy();

    const maxVictorias = Math.max(...facciones.map(f => f.victorias)) || 100;
    const maxMiembros = Math.max(...facciones.map(f => f.miembros)) || 100;
    
    const victoriasNormalizadas = (faccion.victorias / maxVictorias) * 100;
    const miembrosNormalizados = (faccion.miembros / maxMiembros) * 100;

    window.graficaActual = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Victorias', 'Ataque', 'Defensa', 'Diplomacia', 'Arquitectura', 'Economía', 'Popularidad', 'Miembros'],
        datasets: [{
          label: '', // Etiqueta vacía para ocultar la leyenda
          data: [
            victoriasNormalizadas,
            faccion.ataque || 0,
            faccion.defensa || 0,
            faccion.diplomacia || 0,
            faccion.arquitectura || 0,
            faccion.economia || 0,
            faccion.popularidad || 0,
            miembrosNormalizados
          ],
          backgroundColor: 'rgba(20, 255, 236, 0.2)',
          borderColor: '#14ffec',
          borderWidth: 2,
          pointBackgroundColor: '#14ffec'
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false // Oculta completamente la leyenda
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const currentLabel = context.label;
                const value = context.raw;
                
                if (currentLabel === 'Victorias') return `Victorias: ${faccion.victorias}`;
                if (currentLabel === 'Miembros') return `Miembros: ${faccion.miembros}`;
                return `${currentLabel}: ${value}`;
              }
            }
          }
        },
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            angleLines: { color: 'rgba(0, 0, 0, 0.1)' },
            grid: { color: 'rgba(0, 0, 0, 0.1)' },
            pointLabels: {
              color: '#000',
              callback: function(value, index) {
                if (value === 'Victorias') return `${value}: ${faccion.victorias}`;
                if (value === 'Miembros') return `${value}: ${faccion.miembros}`;
                return value;
              }
            },
            ticks: {
              backdropColor: 'transparent',
              color: '#000',
              stepSize: 20,
              showLabelBackdrop: false
            }
          }
        }
      }
    });
  }, 50);
}

facciones.forEach(faccion => {
  const tarjetaFrame = document.createElement("div");
  tarjetaFrame.className = "tarjeta-frame";

  tarjetaFrame.innerHTML = `
    <div class="tematica" style="color: ${faccion.colorTexto || '#000'};">${faccion.epoca}</div>
    <div class="tarjeta" style="
      --color1: ${faccion.color1 || '#fff'};
      --color2: ${faccion.color2 || '#14ffec'};
      --color-texto: ${faccion.colorTexto || '#000'};
    ">
      <img class="foto" src="${faccion.imagen}" />
      <div class="borde" style="background: linear-gradient(180deg, ${faccion.color1 || '#fff'}, ${faccion.color2 || '#14ffec'});">
        <div class="frase">
          <div class="div Fuente8Minecraftnegro">${faccion.subtitulo}</div>
          <div class="text-wrapper-2 Fuente16Minecraftnegro">${faccion.nombre}</div>
        </div>
        <div class="frase-2">
          <div class="text-wrapper-3 Fuente8Minecraftnegro">${faccion.subtitulo2}</div>
          <div class="cono"><img class="vector" src="img/vector.svg" /></div>
        </div>
      </div>
      <div class="fondo">
        <div class="titulo-lema-linea">
          <div class="titulo-lema">
            <p class="p Fuente8Minecraftblanco">${faccion.lema}</p>
            <div class="text-wrapper-4">${faccion.nombre.toUpperCase()}</div>
          </div>
          <img src="${faccion.linea}" />
        </div>
        <div class="faccion-datos">
          <div class="text-wrapper-5 Fuente16Minecraftnegro">Miembros: ${faccion.miembros}</div>
          <div class="text-wrapper-6 Fuente16Minecraftnegro">Líder: ${faccion.lider}</div>
        </div>
      </div>
    </div>
  `;

  const tarjeta = tarjetaFrame.querySelector(".tarjeta");
  tarjeta.addEventListener("click", () => {
    if (tarjetaActiva === tarjeta) {
      // Si haces click en la misma tarjeta activa: quita clase y oculta estadísticas
      tarjeta.classList.remove("sombra-click");
      tarjetaActiva = null;
      const divStats = document.getElementById("estadisticas");
      if(divStats) divStats.innerHTML = ""; // Oculta estadísticas
    } else {
      // Si haces click en otra tarjeta:
      // Quita la clase de la tarjeta activa anterior si existe
      if (tarjetaActiva) tarjetaActiva.classList.remove("sombra-click");

      // Activa la nueva tarjeta
      tarjeta.classList.add("sombra-click");
      tarjetaActiva = tarjeta;

      // Muestra las estadísticas de la facción clickeada
      mostrarEstadisticas(faccion);
    }
  });

  contenedor.appendChild(tarjetaFrame);
});


function mostrarEstadisticas(faccion) {
  const divStats = document.getElementById("estadisticas");
  if (!divStats) return;

  // Construimos el string de ciudades
  let ciudadesStr = "";
  if (faccion.ciudades) {
    for (const [ciudad, cantidad] of Object.entries(faccion.ciudades)) {
      ciudadesStr += `<div class="text-wrapper-2">${ciudad}: ${cantidad}</div>`;
    }
  } else {
    ciudadesStr = "<div>No hay ciudades registradas</div>";
  }

  // Creamos el HTML sin el contenedor de la gráfica
  divStats.innerHTML = `
  <div class="frame-estadisticas">
    <div class="nombre-cabecera">
      <div class="text-wrapper">${faccion.nombre}</div>
      <div class="subinfo">
        <div class="div">
          <div class="ellipse" style="background-color: ${faccion.reclutando ? '--verde' : 'red'};"></div>
          <div class="text-wrapper-2">${faccion.reclutando ? 'Reclutando' : 'No reclutando'}</div>
        </div>
        <div class="div-2"><div class="div-3">líder: ${faccion.lider}</div></div>
      </div>
    </div>
    <div class="estadisticas-zona">
      <div class="div-4">
        <div class="div-3">Estadísticas:</div>
        <div class="div-5">
          <div class="div">
            <img class="iconoEstadistica" src="assets/victorias.svg" />
            <div class="text-wrapper-2">Victorias: ${faccion.victorias ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/ataque.svg" />
            <div class="text-wrapper-2">Ataque: ${faccion.ataque ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/defensa.svg" />
            <div class="text-wrapper-2">Defensa: ${faccion.defensa ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/diplomacia.svg" />
            <div class="text-wrapper-2">Diplomacia: ${faccion.diplomacia ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/arquitectura.svg" />
            <div class="text-wrapper-2">Arquitectura: ${faccion.arquitectura ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/economia.svg" />
            <div class="text-wrapper-2">Economía: ${faccion.economia ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/popularidad.svg" />
            <div class="text-wrapper-2">Popularidad: ${faccion.popularidad ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/poblacion.svg" />
            <div class="text-wrapper-2">Miembros: ${faccion.miembros ?? 0}</div>
          </div>
        </div>
      </div>
      <div class="div-4">
        <div class="div-3">Fuerzas:</div>
        <div class="div-5">
          <div class="div">
            <img class="iconoEstadistica" src="assets/infanteria.svg" />
            <div class="text-wrapper-2">Infantería: ${faccion.infanteria ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/arqueros.svg" />
            <div class="text-wrapper-2">Arqueros: ${faccion.arqueros ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/caballeria.svg" />
            <div class="text-wrapper-2">Caballería: ${faccion.caballeria ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/asedio.svg" />
            <div class="text-wrapper-2">Máquinas de asedio: ${faccion.maquinasDeAsedio ?? 0}</div>
          </div>
          <div class="div">
            <img class="iconoEstadistica" src="assets/barco.svg" />
            <div class="text-wrapper-2">Barcos: ${faccion.barcos ?? 0}</div>
          </div>
          ${obtenerHostilidadHTML(faccion.nivelHostilidad)}
        </div>
      </div>
    </div>
    
    <button id="mostrarGraficaBtn" style="
      background: linear-gradient(180deg, #14ffec, #0d7377);
      border: none;
      color: white;
      padding: 10px 20px;
      border-radius: 5px;
      cursor: pointer;
      margin: 20px 0;
      font-family: 'Minecraft', Helvetica;
    ">
      Mostrar Gráfica
    </button>
    
    <div class="ciudades">
      <p class="div-3">Ciudades:</p>
      ${ciudadesStr}
    </div>
  </div>`;

  // Añadir evento al botón para mostrar la gráfica
  document.getElementById('mostrarGraficaBtn').addEventListener('click', () => {
    mostrarGraficaFlotante(faccion);
  });
}

  setTimeout(() => {
 // Ahora crea la gráfica con Chart.js usando los datos de la facción
   const ctx = document.getElementById('graficaFaccion').getContext('2d');
    
    // Destruye el gráfico anterior si existe
    if (window.graficaActual) {
      window.graficaActual.destroy();
    }

    // Normalizamos los valores de victorias y miembros para que entren en la escala 0-100
    const maxVictorias = Math.max(...facciones.map(f => f.victorias)) || 100;
    const maxMiembros = Math.max(...facciones.map(f => f.miembros)) || 100;
    
    const victoriasNormalizadas = (faccion.victorias / maxVictorias) * 100;
    const miembrosNormalizados = (faccion.miembros / maxMiembros) * 100;

    // Crea el nuevo gráfico
    window.graficaActual = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: ['Victorias', 'Ataque', 'Defensa', 'Diplomacia', 'Arquitectura', 'Economía', 'Popularidad', 'Miembros'],
        datasets: [{
          label: `${faccion.nombre}`,
          data: [
            victoriasNormalizadas,
            faccion.ataque || 0,
            faccion.defensa || 0,
            faccion.diplomacia || 0,
            faccion.arquitectura || 0,
            faccion.economia || 0,
            faccion.popularidad || 0,
            miembrosNormalizados
          ],
          backgroundColor: 'rgba(20, 255, 236, 0.2)',
          borderColor: '#14ffec',
          borderWidth: 2,
          pointBackgroundColor: '#14ffec'
        }]
      },
      options: {
        responsive: true,
        scales: {
          r: {
            beginAtZero: true,
            max: 100,
            angleLines: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            grid: {
              color: 'rgba(0, 0, 0, 0.1)'
            },
            pointLabels: {
              color: '#000',
              callback: function(value, index) {
                // Mostrar el valor real para victorias y miembros
                if (value === 'Victorias') return `${value}: ${faccion.victorias}`;
                if (value === 'Miembros') return `${value}: ${faccion.miembros}`;
                return value;
              }
            },
            ticks: {
              backdropColor: 'transparent',
              color: '#000',
              stepSize: 20,
              showLabelBackdrop: false
            }
          }
        },
        plugins: {
          legend: {
            labels: {
              color: '#000',
              font: {
                size: 12
              }
            }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.dataset.label || '';
                const currentLabel = context.label;
                const value = context.raw;
                
                // Mostrar valores reales en el tooltip
                if (currentLabel === 'Victorias') {
                  return `${label}: ${faccion.victorias}`;
                }
                if (currentLabel === 'Miembros') {
                  return `${label}: ${faccion.miembros}`;
                }
                return `${label}: ${value}`;
              }
            }
          }
        }
      }
    });
  }, 50);

