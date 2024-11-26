<template>
  <main class="h-full overflow-y-auto">
    <div class="container px-6 mx-auto grid">
      <!--  -->
      <!-- titulo -->
      <h1 class="mb-1 text-4xl font-bold dark:text-gray">Gestion Actas</h1>
      <BreadCrumb home="Actas" modulo="Gestion" />
      <div class="grid grid-cols-2 my-6 font-bold dark:text-gray">
        <div class="flex items-center">
          <h2 class="mb-1 text-4xl font-bold dark:text-gray">Listado de Actas</h2>
        </div>
        <div></div>
      </div>

      <!-- Contenedor Principal -->
      <div class="max-w-3xl mx-auto my-6 space-y-8">
        <form class="max-w-md mx-auto">
          <label
            for="default-search"
            class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >Search</label
          >
          <div class="relative">
            <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg
                class="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
            </div>

            <!-- Campo de búsqueda -->
            <input
              type="search"
              id="default-search"
              v-model="filtroIdTema"
              class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Tema o Numero de Acta..."
              @input="limpiarOtrosFiltros(['idTema'])"
              required
            />

            <!-- Botones -->
            <div class="absolute inset-y-0 end-0 flex items-center gap-2 pe-3">
              <!-- Botón Buscar -->
              <button
                type="button"
                @click="buscarIdTema()"
                class="bg-blue-700 text-white font-medium rounded-lg text-sm px-4 py-2 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Buscar
              </button>
              <!-- Botón Limpiar -->
              <button
                type="button"
                @click="RecargarDatos()"
                class="bg-red-500 text-white font-medium rounded-lg text-sm px-4 py-2 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-600"
              >
                Limpiar
              </button>
            </div>
          </div>
        </form>

        <!-- Título para el primer buscador -->
        <div class="p-2 bg-blue-100 border border-blue-300 rounded-lg">
          <h4 class="font-semibold text-blue-800">Buscar por Año o Año/Mes</h4>
          <form class="mt-4 flex items-center gap-4">
            <!-- Input para Año -->
            <input
              type="number"
              v-model="filtroAnio"
              placeholder="Año (YYYY)"
              min="1900"
              max="2100"
              class="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              @input="limpiarOtrosFiltros(['anio'])"
            />

            <!-- Input para Año-Mes -->
            <input
              type="month"
              v-model="filtroAnioMes"
              class="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              @input="limpiarOtrosFiltros(['anioMes'])"
            />

            <!-- Botón de Búsqueda -->
            <button
              type="button"
              @click="buscarActaPorfecha()"
              class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300"
            >
              Buscar
            </button>

            <!-- Botón de Limpiar -->
            <button
              type="button"
              @click="RecargarDatos()"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              X
            </button>
          </form>
        </div>

        <!-- Título para el segundo buscador -->
        <div class="p-2 bg-green-100 border border-green-300 rounded-lg">
          <h4 class="font-semibold text-green-800">Buscar por Tema y fecha</h4>
          <form class="mt-4 flex items-center gap-4">
            <!-- Input para Tema o Número de Acta -->

            <input
              type="search"
              id="default-search"
              v-model="filtroTemaFecha"
              class="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              placeholder="Tema o Número de Acta..."
              @input="limpiarOtrosFiltros(['Fechatema', 'Temafecha'])"
              required
            />
            <!-- Input para Año-Mes -->
            <input
              type="month"
              v-model="filtroAnioMesTema"
              class="w-full p-2 text-sm border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
              @input="limpiarOtrosFiltros(['Fechatema', 'Temafecha'])"
            />
            <!-- Botón de Búsqueda -->
            <button
              type="button"
              @click="buscarActaPorTemafecha()"
              class="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300"
            >
              Buscar
            </button>

            <!-- Botón de Limpiar -->
            <button
              type="button"
              @click="RecargarDatos()"
              class="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300"
            >
              X
            </button>
          </form>
        </div>
      </div>

      <AgregarLink titulo="Actas" ruta="/actas/crear" titulo-link="Agregar"></AgregarLink>

      <div class="w-full overflow-hidden rounded-lg shadow-xs mt-3">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th class="px-4 py-3">Número de Actas</th>
                <th class="px-4 py-3">Estado</th>
                <th class="px-4 py-3">Lugar</th>
                <th class="px-4 py-3">Fecha</th>
                <th class="px-4 py-3">Hora Inicio</th>
                <th class="px-4 py-3">Hora Final</th>
                <th class="px-4 py-3">Presidente</th>
                <th class="px-4 py-3">Secretario</th>
                <th class="px-4 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="acta in actas"
                :key="acta.NUM_ACTAS"
              >
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <div
                        class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <p class="font-semibold">{{ acta.NUM_ACTAS }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ acta.ESTADO }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ acta.LUGAR }}
                </td>
                <td class="px-4 py-3 text-xs">
                  {{ acta.FECHA }}
                </td>
                <td class="px-4 py-3 text-xs">
                  <span
                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                  >
                    {{ acta.HORAINICIO }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs">
                  <span
                    class="px-2 py-1 font-semibold leading-tight text-green-700 bg-green-100 rounded-full dark:bg-green-700 dark:text-green-100"
                  >
                    {{ acta.HORAFINAL }}
                  </span>
                </td>
                <td class="px-4 py-3 text-xs">
                  {{ acta.PRESIDENTE }}
                </td>
                <td class="px-4 py-3 text-xs">
                  {{ acta.SECRETARIO }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex">
                    <BotonVer
                      @click="DetallerActa(acta)"
                      :ruta="``"
                      titulo="'Ver temas'"
                    ></BotonVer>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </main>

  <div
    v-if="DetallesActa"
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
  >
    <div class="relative w-full max-w-7xl max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-xl font-medium text-gray-900 dark:text-white">Extra Large modal</h3>
          <button
            @click="DetallesdesModal()"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-hide="extralarge-modal"
          >
            <svg
              class="w-3 h-3"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 14 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
              />
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
        </div>
        <div>
          <!-- Botón para generar el PDF -->
          <button
            @click="generarPDF"
            :disabled="cargando == true"
            class="px-4 py-2 bg-blue-500 text-white rounded disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            <span v-if="cargando == true" class="flex items-center">
              <svg
                aria-hidden="true"
                class="w-5 h-5 text-white animate-spin mr-2"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M100 50.9a49.9 49.9 0 1 1-15.25-35.3" fill="#E5E7EB" />
                <path
                  d="M93.97 39.04a49.9 49.9 0 1 1-43.31-38.03"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-width="10"
                />
              </svg>
              Generando...
            </span>
            <span v-else>Generar PDF</span>
          </button>
        </div>
        <!-- Modal body -->
        <div id="pdf-content" ref="pdfContent" class="p-4 md:p-5 space-y-4">
          <div class="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
            <!-- Información del Acta -->
            <div class="mb-8">
              <h2 class="text-2xl font-bold text-gray-800">Acta de Reunión</h2>
              <p class="text-sm text-gray-500">
                Comité de Acreditación y Currículo - Programa de Ingeniería de Sistemas
              </p>
              <div class="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <p><span class="font-semibold">N° Acta:</span> {{ Nacta }}</p>
                  <p><span class="font-semibold">Lugar:</span> {{ lugar }}</p>
                </div>
                <div>
                  <p><span class="font-semibold">Fecha:</span> {{ ActafechaDetallada }}</p>
                  <p><span class="font-semibold">Hora:</span> {{ horaInicio }} - {{ horaFinal }}</p>
                </div>
              </div>
            </div>

            <!-- Verificación de Quórum -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-700">Verificación de Quórum</h3>
              <h4 class="text-xl font-bold text-gray-700">
                <h3 class="text-xl font-bold text-gray-700">INTEGRANTES DEL CONSEJO O COMITÉ</h3>
              </h4>
              <table class="w-full mt-4 border border-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="p-2 text-left font-semibold text-gray-600">Cargo</th>
                    <th class="p-2 text-left font-semibold text-gray-600">Nombre</th>
                    <th class="p-2 text-center font-semibold text-gray-600">Asistió</th>
                    <th class="p-2 text-center font-semibold text-gray-600">No Asistió</th>
                    <th class="p-2 text-center font-semibold text-gray-600">Excusa</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="hover:bg-gray-100 dark:hover:bg-gray-600"
                    v-for="AsistenciaM in AsistenciaMiembro"
                    :key="AsistenciaM.MIEMBROS_IDMIEMBRO"
                  >
                    <td class="border px-4 py-2 w-auto">
                      <label type="text" class="border rounded p-1 w-auto">{{
                        AsistenciaM.CARGO
                      }}</label>
                    </td>
                    <td class="border px-4 py-2 w-auto">
                      <label type="text" class="border rounded p-1 w-auto">{{
                        AsistenciaM.NOMBRE
                      }}</label>
                    </td>
                    <!-- Inputs con ancho ajustado para espacio mínimo -->
                    <td class="border px-2 py-2 text-center">
                      <input
                        v-if="AsistenciaM.ESTADO_ASISTENCIA === 'X'"
                        type="text"
                        class="border rounded p-1 w-7 text-center"
                        disabled
                        placeholder="X"
                      />
                    </td>
                    <td class="border px-2 py-2 text-center">
                      <input
                        v-if="AsistenciaM.ESTADO_ASISTENCIA === '-'"
                        type="text"
                        class="border rounded p-1 w-7 text-center"
                        disabled
                        placeholder="-"
                      />
                    </td>
                    <td class="border px-2 py-2 text-center">
                      <input
                        v-if="AsistenciaM.ESTADO_ASISTENCIA === 'ES'"
                        type="text"
                        class="border rounded p-1 w-7 text-center"
                        disabled
                        placeholder="ES"
                      />
                    </td>
                  </tr>
                  <!-- Repite los tr para otros miembros -->
                </tbody>
              </table>
            </div>

            <div class="mb-8">
              <h4 class="text-xl font-bold text-gray-700">ASISTENTES INVITADOS</h4>
              <table class="w-full mt-4 border border-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="p-2 text-left font-semibold text-gray-600">Cargo</th>
                    <th class="p-2 text-left font-semibold text-gray-600">Nombre</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    class="hover:bg-gray-100 dark:hover:bg-gray-600"
                    v-for="AsistenciaI in AsistenciaInvitado.filter(
                      (invitado) => invitado.ESTADO_ASISTENCIA === 'ASISTIO'
                    )"
                    :key="AsistenciaI.INVITADO_IDINVITADO"
                  >
                    <td class="border px-4 py-2 w-auto">
                      <label type="text" class="border rounded p-1 w-auto">{{
                        AsistenciaI.CARGO
                      }}</label>
                    </td>
                    <td class="border px-4 py-2 w-auto">
                      <label type="text" class="border rounded p-1 w-auto">{{
                        AsistenciaI.NOMBRE
                      }}</label>
                    </td>
                  </tr>
                  <!-- Repite los tr para otros miembros -->
                </tbody>
              </table>
            </div>

            <!-- Orden del Día -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-700">Orden del Día</h3>
              <ol class="mt-4 list-decimal list-inside">
                <li>Verificación del Quórum</li>
                <li>Aprobación del Orden del Día</li>
                <li>Aprobación del Acta Anterior</li>
                <li>Revisión de compromisos de la sesión anterior</li>
                <li>
                  Desarrollo de la sesión
                  <ol
                    class="text-gray-700 dark:text-gray-400"
                    v-for="temasSesion in datos"
                    :key="temasSesion.SESION_IDSESION"
                  >
                    <li>{{ temasSesion.TEMA }}</li>
                  </ol>
                </li>
                <li>Lectura de Correspondencia</li>
                <li>Proposiciones y Varios</li>
              </ol>
            </div>

            <!-- Acta anterio -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-700">APROBACIÓN DEL ACTA ANTERIOR</h3>
              <h4>Se aprueba el acta anterior Acta-{{ ActaNumero }}_{{ ActafechaDetallada }}</h4>
            </div>

            <div class="mb-8">
              <h4 class="text-xl font-bold text-gray-700">
                REVISIÓN DE COMPROMISOS DE LA SESIÓN ANTERIOR
              </h4>
              <table class="w-full mt-4 border border-gray-200">
                <thead class="bg-gray-100">
                  <th scope="col" class="px-6 py-3">Tareas</th>
                  <th scope="col" class="px-6 py-3">Fecha de Entrega</th>
                  <th scope="col" class="px-6 py-3">Responsables</th>
                  <th scope="col" class="px-6 py-3">Estado</th>
                </thead>
                <tbody>
                  <tr
                    v-for="tarea in tareasIDSesionAnterior"
                    :key="tarea.ID_TAREAS"
                    class="text-gray-700 dark:text-gray-400"
                  >
                    <td class="py-4 px-6">{{ tarea.DESCRIPCION }}</td>
                    <td class="py-4 px-6">{{ tarea.FECHA_ENTREGA }}</td>
                    <td class="py-4 px-6">
                      <ul v-if="tarea.RESPONSABLES != null">
                        <li
                          v-for="responsable in tarea.RESPONSABLES.split(',')"
                          :key="responsable.trim()"
                          class="py-1"
                        >
                          {{ responsable.trim() }}
                        </li>
                      </ul>
                      <p v-else>Sin Responsables</p>
                    </td>
                    <td class="py-4 px-6">{{ tarea.ESTADO }}</td>
                  </tr>
                  <!-- Repite los tr para otros miembros -->
                </tbody>
              </table>
            </div>

            <div class="mb-8">
              <h4 class="text-xl font-bold text-gray-700">LECTURA DE CORRESPONDENCIA</h4>
              <table class="w-full mt-4 border border-gray-200">
                <thead class="bg-gray-100">
                  <th scope="col" class="px-6 py-3">CARGO O ENTIDAD QUE ENVÍA</th>
                  <th scope="col" class="px-6 py-3">DEPENDENCIA</th>
                  <th scope="col" class="px-6 py-3">ASUNTO</th>
                  <th scope="col" class="px-6 py-3">DESICION</th>
                </thead>
                <tbody>
                  <tr
                    v-for="solicitud in solicitudes"
                    :key="solicitud.NOMBRE"
                    class="text-gray-700 dark:text-gray-400"
                  >
                    <td class="py-4 px-6">{{ solicitud.NOMBRE }}</td>
                    <td class="py-4 px-6">{{ solicitud.DEPENDENCIA }}</td>
                    <td class="py-4 px-6">{{ solicitud.ASUNTO }}</td>
                    <td class="py-4 px-6">{{ solicitud.DESICION }}</td>
                  </tr>
                  <!-- Repite los tr para otros miembros -->
                </tbody>
              </table>
            </div>

            <div class="mb-8">
              <h4 class="text-xl font-bold text-gray-700">
                TAREAS O COMPROMISOS ADQUIRIDOS EN ESTA SESIÓN
              </h4>
              <table class="w-full mt-4 border border-gray-200">
                <thead class="bg-gray-100">
                  <th scope="col" class="px-6 py-3">Tareas</th>
                  <th scope="col" class="px-6 py-3">Responsables</th>
                  <th scope="col" class="px-6 py-3">Fecha de Entrega</th>
                </thead>
                <tbody>
                  <tr
                    v-for="tarea in tareasIDSesion"
                    :key="tarea.ID_TAREAS"
                    class="text-gray-700 dark:text-gray-400"
                  >
                    <td class="py-4 px-6">{{ tarea.DESCRIPCION }}</td>
                    <td class="py-4 px-6">
                      <ul v-if="tarea.RESPONSABLES != null">
                        <li
                          v-for="responsable in tarea.RESPONSABLES.split(',')"
                          :key="responsable.trim()"
                          class="py-1"
                        >
                          {{ responsable.trim() }}
                        </li>
                      </ul>
                      <p v-else>Sin Responsables</p>
                    </td>
                    <td class="py-4 px-6">{{ tarea.FECHA_ENTREGA }}</td>
                  </tr>
                  <!-- Repite los tr para otros miembros -->
                </tbody>
              </table>
            </div>

            <!-- Decisiones Tomadas -->
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-700">Decisiones Tomadas</h3>
              <table class="w-full mt-4 border border-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="p-2 text-left font-semibold text-gray-600">Decisión</th>
                    <th class="p-2 text-left font-semibold text-gray-600">Responsable</th>
                    <th class="p-2 text-left font-semibold text-gray-600">Fecha de Cumplimiento</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-2 border-b">Aprobar solicitud de práctica</td>
                    <td class="p-2 border-b">Coordinador</td>
                    <td class="p-2 border-b">10-09-2024</td>
                  </tr>
                  <!-- Repite los tr para otras decisiones -->
                </tbody>
              </table>
            </div>
            <div class="mb-8">
              <h3 class="text-xl font-bold text-gray-700">
                Como constancia de la anterior firman los siguientes miembros del Consejo o Comité:s
              </h3>
              <table class="w-full mt-4 border border-gray-200">
                <thead class="bg-gray-100">
                  <tr>
                    <th class="p-2 text-left font-semibold text-gray-600">
                      PRESIDENTE DEL CONSEJO O COMITÉ
                    </th>
                    <th class="p-2 text-left font-semibold text-gray-600">
                      SECRETARIO DEL CONSEJO O COMITÉ
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td class="p-2 border-b">NOMBRE: {{ presidente }}</td>
                    <td class="p-2 border-b">NOMBRE: {{ secretario }}</td>
                  </tr>
                  <tr>
                    <td class="p-2 border-b">FIRMA</td>
                    <td class="p-2 border-b">FIRMA</td>
                  </tr>
                  <!-- Repite los tr para otras decisiones -->
                </tbody>
              </table>
            </div>
            <!-- Próxima Sesión -->
            <div>
              <h3 class="text-xl font-bold text-gray-700">Próxima Sesión</h3>
              <div class="grid grid-cols-3 gap-4 mt-4">
                <div><span class="font-semibold">Fecha:</span> 10 de octubre del 2024</div>
                <div><span class="font-semibold">Hora:</span> 9:00 A.M.</div>
                <div><span class="font-semibold">Lugar:</span> Presencial</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Modal footer -->
        <div
          class="flex items-center p-4 md:p-5 space-x-3 rtl:space-x-reverse border-t border-gray-200 rounded-b dark:border-gray-600"
        ></div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref, onMounted, nextTick } from 'vue'
import AgregarLink from '@/components/modules/AgregarLink.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import BotonVer from '@/components/botones/BotonVer.vue'
import servicesActas from '@/modules/actas/services'
import SesionService from '@/modules/sesion/services'
import OrdenService from '@/modules/ordenSesion/services'
import TareasService from '@/modules/tareas/services'
import html2pdf from 'html2pdf.js'

import 'dayjs/locale/es'
import dayjs from 'dayjs'
interface Acta {
  NUM_ACTAS: number
  ESTADO: string
  SESION_IDSESION: number
  LUGAR: string
  FECHA: string
  HORAINICIO: string
  HORAFINAL: string
  PRESIDENTE: string
  SECRETARIO: string
}

const actas = ref<Acta[]>([])
const cargarDatos = async () => {
  const respuesta = await servicesActas.MostrarActasFirmadas()
  if (respuesta.status == 200) {
    actas.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
  } else if (respuesta.status == 404) {
    console.log(respuesta.error.message)
  } else {
    console.log(respuesta.error.error)
  }
}

const DetallerActa = (actas: Acta) => {
  DetallesdesModal()
  CargarSesion(actas)
  cargarDetallesActa()
}

const DetallesActa = ref(false)
const DetallesdesModal = () => {
  DetallesActa.value = !DetallesActa.value
  // Llamar a 'cargarDatos' cuando el componente se monta
}
onMounted(() => {
  cargarDatos()
})
// Declaración de refs reactivas
const filtroAnio = ref('') // Campo para el Año
const filtroAnioMes = ref('') // Campo para Año-Mes
const filtroIdTema = ref('') // Campo para ID o Tema
const filtroAnioMesTema = ref('') // Campo para Año-Mes
const filtroTemaFecha = ref('') // Campo para ID o Tema

// Método para limpiar los filtros según el campo activo
const limpiarOtrosFiltros = (camposActivos: string[]) => {
  if (!camposActivos.includes('anio')) filtroAnio.value = ''
  if (!camposActivos.includes('anioMes')) filtroAnioMes.value = ''
  if (!camposActivos.includes('idTema')) filtroIdTema.value = ''
  if (!camposActivos.includes('Fechatema')) filtroAnioMesTema.value = ''
  if (!camposActivos.includes('Temafecha')) filtroTemaFecha.value = ''
}

// Método para realizar la búsqueda
const buscarIdTema = async () => {
  const params = new URLSearchParams()
  //  if (filtroAnio.value) params.append('anio', filtroAnio.value);
  //  if (filtroAnioMes.value) params.append('anioMes', filtroAnioMes.value);
  if (filtroIdTema.value) params.append('idTema', filtroIdTema.value)
  const valor = convertToVarchar(filtroIdTema.value)
  let buscarDatos = ''
  console.log(valor)
  if (valor == null) {
    buscarDatos = filtroIdTema.value
  } else {
    buscarDatos = valor
  }
  const respuesta = await servicesActas.BuscarIdTema(buscarDatos)
  console.log(respuesta)
  if (respuesta.status == 200) {
    actas.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
  } else if (respuesta.status == 404) {
    alert(respuesta.error.message)
  } else {
    console.log(respuesta.error.message)
  }
  // Simulación de búsqueda (puedes integrar con tu API aquí)
  console.log('Buscando con parámetros:', params.toString())
  // Aquí puedes usar fetch para enviar los datos al backend
}

const buscarActaPorfecha = async () => {
  const Year = filtroAnio.value
  const YearMonth = filtroAnioMes.value
  let buscarDatos = ''
  if (Year != '') {
    buscarDatos = filtroAnio.value
    const respuesta = await servicesActas.BuscarActaPorYear(buscarDatos)
    console.log(respuesta)
    if (respuesta.status == 200) {
      actas.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      alert(respuesta.error.message)
    } else {
      console.log(respuesta.error.message)
    }
  } else if (YearMonth != '') {
    buscarDatos = YearMonth
    const [year, month] = buscarDatos.split('-')
    const respuesta = await servicesActas.BuscarActaPorFecha(year, month)
    console.log(respuesta)
    if (respuesta.status == 200) {
      actas.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      alert(respuesta.error.message)
    } else {
      console.log(respuesta.error.message)
    }
  } else {
    alert('Seleccione una Fecha')
  }
}

const buscarActaPorTemafecha = async () => {
  const Tema = filtroTemaFecha.value
  const fecha = filtroAnioMesTema.value

  if (!Tema || !fecha) {
    alert('Por favor, llena todos los campos')
    return
  }

  try {
    // Extraer año y mes de la fecha proporcionada
    const [year, month] = fecha.split('-')
    if (!year || !month) {
      alert('Formato de fecha incorrecto')
      return
    }

    // Convertir el tema a varchar
    const tema = convertToVarchar(Tema)
    if (!tema) {
      alert('El tema no es válido')
      return
    }

    // Llamar al servicio para buscar el acta
    const respuesta = await servicesActas.BuscarActaPorTemaFecha(year, month, tema)

    // Manejo de respuesta del servidor
    if (respuesta.status === 200) {
      actas.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status === 404) {
      alert(respuesta.error.message || 'No se encontraron actas con los datos proporcionados')
    } else {
      console.error('Error en la respuesta:', respuesta.error.message)
    }
  } catch (error) {
    console.error('Ocurrió un error al buscar las actas:', error)
    alert('Ocurrió un error. Por favor, inténtalo de nuevo más tarde.')
  }
}

const RecargarDatos = () => {
  filtroAnio.value = '' // Campo para el Año
  filtroAnioMes.value = '' // Campo para Año-Mes
  filtroIdTema.value = '' // Campo para ID o Tema
  filtroAnioMesTema.value = '' // Campo para Año-Mes
  filtroTemaFecha.value = '' // Campo para ID o Tema
  cargarDatos()
}

function convertToVarchar(value: string): string | null {
  // Verifica si el valor es vacío o contiene solo espacios
  if (!value.trim()) {
    console.warn('El valor está vacío o solo contiene espacios')
    return null
  }

  try {
    // Decodifica la URI si contiene caracteres codificados
    const decodedValue = decodeURIComponent(value)

    // Reemplaza los espacios por "t2" y retorna el resultado
    return decodedValue.replace(/\s+/g, 't2')
  } catch (e) {
    console.error('Error al decodificar el valor:', e)
    return null // Retorna null si ocurre un error
  }
}

const idSesion = ref<number | null>(null)

const ActafechaDetallada = ref<string | null>(null)
const Actalugar = ref<string | null>(null)
const ActahoraInicio = ref<string | null>(null)
const ActahoraFinal = ref<string | null>(null)
const Actasecretario = ref<string | null>(null)
const Actapresidente = ref<string | null>(null)
const ActaNumero = ref<number | null>(null)
const ActaEstado = ref<string | null>(null)

interface ActaAnterior {
  IDSESION: number
  LUGAR: string
  FECHA: string
  HORAINICIO: string
  HORAFINAL: string
  PRESIDENTE: string
  SECRETARIO: string
  NUM_ACTAS: number
  ESTADO: string
}
let actaAnterior: Ref<ActaAnterior[]> = ref([])
const IDSesionAnterior: Ref<{ id: string }> = ref({
  id: ''
})
const CargarActa = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await SesionService.ActaAnterior(IDSesion)
    if (respuesta.status == 200) {
      actaAnterior.value = Array.isArray(respuesta.data[0])
        ? respuesta.data[0]
        : [respuesta.data[0]]
      ActafechaDetallada.value = obtenerFechaDetallada(actaAnterior.value[0].FECHA)
      Actalugar.value = actaAnterior.value[0].LUGAR
      ActahoraInicio.value = actaAnterior.value[0].HORAINICIO
      ActahoraFinal.value = actaAnterior.value[0].HORAFINAL
      Actapresidente.value = actaAnterior.value[0].PRESIDENTE
      Actasecretario.value = actaAnterior.value[0].SECRETARIO
      ActaNumero.value = actaAnterior.value[0].NUM_ACTAS
      ActaEstado.value = actaAnterior.value[0].ESTADO
      IDSesionAnterior.value.id = String(actaAnterior.value[0].IDSESION)
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  }
}

function obtenerFechaDetallada(fecha: string): string {
  return dayjs(fecha).format('D [de] MMMM [de] YYYY, dddd')
}
const Nacta = ref<number | null>(null)
const lugar = ref<string | null>(null)
const fechaDetallada = ref<string | null>(null)
const fecha = ref<string | null>(null)
const horaInicio = ref<string | null>(null)
const horaFinal = ref<string | null>(null)
const secretario = ref<string | null>(null)
const presidente = ref<string | null>(null)

const CargarSesion = async (acta: Acta) => {
  lugar.value = acta.LUGAR
  horaInicio.value = acta.HORAINICIO
  fecha.value = String(acta.FECHA)
  fechaDetallada.value = obtenerFechaDetallada(fecha.value)
  Nacta.value = acta.NUM_ACTAS
  idSesion.value = acta.SESION_IDSESION
  horaFinal.value = acta.HORAFINAL
  presidente.value = acta.PRESIDENTE
  secretario.value = acta.SECRETARIO
}

interface asistenciaM {
  MIEMBROS_IDMIEMBRO: number
  CARGO: string
  NOMBRE: string
  ESTADO_ASISTENCIA: string
}

let AsistenciaMiembro: Ref<asistenciaM[]> = ref([])

const asistenciaMiembro = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await SesionService.AsistenciaMiembros(IDSesion)
    if (respuesta.status == 200) {
      AsistenciaMiembro.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  }
}

interface asistenciaI {
  INVITADO_IDINVITADO: number
  CARGO: string
  NOMBRE: string
  ESTADO_ASISTENCIA: string
}
let AsistenciaInvitado: Ref<asistenciaI[]> = ref([])
const asistenciaInvitado = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await SesionService.AsistenciaInvitados(IDSesion)
    if (respuesta.status == 200) {
      AsistenciaInvitado.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      AsistenciaInvitado.value = []
      //console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  }
}
interface temasSesion {
  SESION_IDSESION: number
  TEMA: string
  DESCRIPCION: string
  IDtema: number
}
let datos: Ref<temasSesion[]> = ref([])
const SesionesTemas = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await OrdenService.TemasSesion(IDSesion)
    if (respuesta.status == 200) {
      datos.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      alert(respuesta.error.error)
    }
  }
}

interface TareasIDSesionAnterior {
  ID_TAREAS: number
  DESCRIPCION: string
  FECHA_ENTREGA: string
  FECHA_VERIFICACION: string
  RESPONSABLES: string
  SESION_IDSESION: number
  ESTADO: string
}

let tareasIDSesionAnterior: Ref<TareasIDSesionAnterior[]> = ref([])
const MostrarTareasIDSesionAnterior = async () => {
  let IDSesion = Number(IDSesionAnterior.value.id)
  if (IDSesion !== null) {
    const respuesta = await TareasService.MostrarTareasSesionAnterior(IDSesion)
    if (respuesta.status == 200) {
      tareasIDSesionAnterior.value = Array.isArray(respuesta.data)
        ? respuesta.data
        : [respuesta.data]
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  } else {
    alert('El ID de sesión es nulo')
  }
}

interface Solicitudes {
  IDSOLICITUD: number
  DEPENDENCIA: string
  ASUNTO: string
  DESICION: string
  SOLICITANTE_IDSOLICITANTE: number
  FECHADESOLICITUD: string
  NOMBRE: string
  TIPODESOLICITANTE: string
  EMAIL: string
  CELULAR: string
  ESTU_IMPLICADOS: string
  NUM_ESTU_IMPLICADOS: string
  CIUDAD_IMPLICADA: string
  PAIS_IMPLICADO: string
  EVENTO: string
}

let solicitudes: Ref<Solicitudes[]> = ref([])
const CargarSolicitudes = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await SesionService.solicitudes(IDSesion)
    if (respuesta.status == 200) {
      solicitudes.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  }
}

// mostrar tareas
interface TareasIDSesion {
  ID_TAREAS: number
  DESCRIPCION: string
  FECHA_ENTREGA: string
  RESPONSABLES: string
}
let tareasIDSesion: Ref<TareasIDSesion[]> = ref([])
const MostrarTareasIDSesion = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await TareasService.MostrarTareasIDSesion(IDSesion)
    if (respuesta.status == 200) {
      tareasIDSesion.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  }
}

const cargarDetallesActa = () => {
  CargarActa()

  asistenciaMiembro()
  asistenciaInvitado()
  SesionesTemas()
  MostrarTareasIDSesionAnterior()
  CargarSolicitudes()
  MostrarTareasIDSesion()
}

const cargando = ref(false)
const pdfContent = ref<HTMLElement | null>(null) // El ref para el contenedor del PDF

const generarPDF = async () => {
  
  cargando.value = true;
  try {
    // Activa el estado de carga
    // Asegúrate de que el ref esté disponible después de la actualización del DOM
    await nextTick(() => {
      const element = pdfContent.value;

      // Comprobamos si el elemento está definido
      if (element && element instanceof HTMLElement) {
        const options = {
          margin: 0.5,
          filename: `Acta_${Nacta.value}_${ActafechaDetallada.value}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2 }, // Ajusta la escala para mayor calidad
          jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
        };

        // Simula un retardo de 2 segundos antes de generar el PDF
        new Promise((resolve) => setTimeout(resolve, 2000)).then(() => {
          // Genera el PDF después del retardo
          html2pdf().set(options).from(element).save();
        });
      } else {
        console.error('El elemento PDF no se encontró.');
      }
    });
  } catch (error) {
    console.error('Error al generar el PDF:', error);
  } finally {
    cargando.value = false; // Restablece el estado de carga
  }
};

</script>

<style scoped>
.text-blue-600 {
  color: #2563eb;
}

.text-red-600 {
  color: #dc2626;
}

.text-blue-600:hover,
.text-red-600:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
