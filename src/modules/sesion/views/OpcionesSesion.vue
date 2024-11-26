<template>
  <main class="h-full overflow-y-auto space-y-4">
    <div class="container px-6 mx-auto grid">
      <BreadCrumb home="Orden" modulo="Gestion" />
    </div>
    <div class="flex justify-center items-center space-x-4 p-4">
      <p class="text-lg font-medium">Estado de la sesión: {{ estadoSesion }}</p>

      <template v-if="estadoSesion === 'próxima' || estadoSesion === 'en proceso'">
        <!-- Días -->
        <div class="bg-blue-100 text-blue-800 rounded-lg shadow-lg p-4 w-24 text-center">
          <p class="text-4xl font-bold">{{ diasRestantes }}</p>
          <p class="text-sm uppercase font-medium">Días</p>
        </div>

        <!-- Horas -->
        <div class="bg-green-100 text-green-800 rounded-lg shadow-lg p-4 w-24 text-center">
          <p class="text-4xl font-bold">{{ horasRestantes }}</p>
          <p class="text-sm uppercase font-medium">Horas</p>
        </div>

        <!-- Minutos -->
        <div class="bg-yellow-100 text-yellow-800 rounded-lg shadow-lg p-4 w-24 text-center">
          <p class="text-4xl font-bold">{{ minutosRestantes }}</p>
          <p class="text-sm uppercase font-medium">Minutos</p>
        </div>
      </template>

      <template v-else>
        <p class="text-xl font-semibold text-red-600">La sesión ha finalizado</p>
      </template>
    </div>

    <div class="grid grid-cols-2 my-6 font-bold dark:text-gray w-auto">
      <header
        class="flex justify-between items-center backdrop-blur-md bg-white/30 p-4 shadow rounded-lg m-8"
      >
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Reunión de Coordinación</h1>
          <p class="text-gray-800">Fecha: {{ fechaDetallada }}--Lugar: {{ lugar }}</p>
          <p>Presidente {{ presidente }}</p>
          <p>Secretario {{ secretario }}</p>
          <p>HORA: {{ horaInicio }} - {{ horaFinal }}</p>
        </div>
      </header>
      <header
        class="flex justify-between items-center backdrop-blur-md bg-white/30 p-4 shadow rounded-lg m-8"
      >
        <div>
          <h1 class="text-2xl font-semibold text-gray-800">Acta Anterior</h1>
          <p>N* Acta: {{ ActaNumero }} -- Lugar: {{ Actalugar }}</p>
          <p class="text-gray-800">Fecha: {{ ActafechaDetallada }}</p>
          <p>HORA: {{ ActahoraInicio }} - {{ ActahoraFinal }}</p>
          <p>Presidente: {{ Actapresidente }}</p>
          <p>Secretario: {{ Actasecretario }}</p>
          <p>Estado: {{ ActaEstado }}</p>
        </div>
      </header>
    </div>
    <div class="container px-6 mx-auto grid my-4 text-center pt-1">
      <div
        class="max-w p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          VERIFICACIÓN DE QUORUM
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>
    <div class="container px-6 mx-auto grid m-5 pt-4">
      <AgregarLink titulo="Asistencia" ruta="" accion="" :visible="false"></AgregarLink>
    </div>

    <div class="container px-6 mx-auto grid">
      <h1 class="text-2xl font-bold mb-4">Hoja de Asistencia Miembros</h1>

      <div class="inline-flex rounded-md shadow-sm" role="group">
        <button
          v-if="CargarMiembros"
          type="button"
          @click="CargarMiembrosAsistencia()"
          :disabled="isLoading"
          class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          {{ isLoading ? 'Cargando...' : 'Cargar Miembros' }}
        </button>

        <button
          v-if="enviarCitacionMiembro"
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Enviar Citacion
        </button>
      </div>
      <div v-if="isLoading" class="spinner">
      <!-- Puedes usar un ícono, texto o una animación aquí -->
      <p>Cargando...</p>
    </div>
      <div class="w-full overflow-x-auto rounded-lg shadow-xs my-4">
        <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <th class="py-2 px-4">Cargo</th>
              <th class="py-2 px-4">Asistidor</th>
              <th class="py-2 px-2">Asistió</th>
              <th class="py-2 px-2">No Asistió</th>
              <th class="py-2 px-2">Excusa</th>
              <th class="py-2 px-2">Marcar Asistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover:bg-gray-100 dark:hover:bg-gray-600"
              v-for="AsistenciaM in AsistenciaMiembro"
              :key="AsistenciaM.MIEMBROS_IDMIEMBRO"
            >
              <td class="border px-4 py-2 w-auto">
                <label type="text" class="border rounded p-1 w-auto">{{ AsistenciaM.CARGO }}</label>
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
              <td class="border px-2 py-2 flex">
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-1 mb-2"
                  @click="actualizarAsistenciaMiembro('X', AsistenciaM.MIEMBROS_IDMIEMBRO)"
                >
                  Asistio
                </button>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 shadow-lg shadow-cyan-500/50 dark:shadow-lg dark:shadow-cyan-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-1 mb-2"
                  @click="actualizarAsistenciaMiembro('ES', AsistenciaM.MIEMBROS_IDMIEMBRO)"
                >
                  Excusa
                </button>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-1 mb-2"
                  @click="actualizarAsistenciaMiembro('-', AsistenciaM.MIEMBROS_IDMIEMBRO)"
                >
                  No Asistio
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <hr class="border-t-2 border-dashed border-gray-400 my-4" />

    <div class="container px-6 mx-auto grid my-4">
      <h1 class="text-2xl font-bold mb-4">Hoja de Asistencia Invitados</h1>
      <div class="inline-flex rounded-md shadow-sm" role="group ">
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-s-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
          @click="NoInvitadosteModal()"
        >
          Agregar invitado
        </button>

        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-gray-900 bg-white border border-gray-200 rounded-e-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-blue-500 dark:focus:text-white"
        >
          Invitar por email
        </button>
      </div>
      <div class="w-full overflow-x-auto rounded-lg shadow-xs my-4">
        <table class="min-w-full bg-white dark:bg-gray-800 rounded-lg shadow-md">
          <thead>
            <tr class="bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
              <th class="py-2 px-4">Cargo</th>
              <th class="py-2 px-4">Asistidor</th>
              <th class="py-2 px-2">Estado asistencia</th>
              <th class="py-2 px-2">Marcar Asistencia</th>
            </tr>
          </thead>
          <tbody>
            <tr
              class="hover:bg-gray-100 dark:hover:bg-gray-600"
              v-for="AsistenciaI in AsistenciaInvitado"
              :key="AsistenciaI.INVITADO_IDINVITADO"
            >
              <td class="border px-4 py-2 w-auto">
                <label type="text" class="border rounded p-1 w-auto">{{ AsistenciaI.CARGO }}</label>
              </td>
              <td class="border px-4 py-2 w-auto">
                <label type="text" class="border rounded p-1 w-auto">{{
                  AsistenciaI.NOMBRE
                }}</label>
              </td>
              <!-- Inputs con ancho ajustado para espacio mínimo -->
              <td class="border px-2 py-2 text-center p-1 w-auto">
                <input
                  v-model="AsistenciaI.ESTADO_ASISTENCIA"
                  type="text"
                  class="border rounded text-center p-1 w-auto"
                  disabled
                />
              </td>
              <td class="border px-2 py-2 flex">
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 shadow-lg shadow-green-500/50 dark:shadow-lg dark:shadow-green-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-1 mb-2"
                  @click="actualizarAsistenciaInvitado('ASISTIO', AsistenciaI.INVITADO_IDINVITADO)"
                >
                  Asistio
                </button>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-pink-400 via-pink-500 to-pink-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-pink-300 dark:focus:ring-pink-800 shadow-lg shadow-pink-500/50 dark:shadow-lg dark:shadow-pink-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                  @click="
                    actualizarAsistenciaInvitado('NO ASISTIO', AsistenciaI.INVITADO_IDINVITADO)
                  "
                >
                  No Asistio
                </button>
                <button
                  type="button"
                  class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg text-sm px-5 py-2 text-center me-1 mb-2"
                  @click="eliminarAsistenciaInvitado(AsistenciaI.INVITADO_IDINVITADO)"
                >
                  Eliminar Asistencia
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>

    <hr class="border-t-2 border-dashed border-gray-400 my-4" />

    <div class="container px-6 mx-auto grid my-4 text-center pt-10">
      <div
        class="max-w p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          TEMAS DE LA SESION
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>

    <div class="container px-6 mx-auto grid">
      <AgregarLink
        titulo="Orden Sesion"
        ruta=""
        accion="Agregar"
        @click="toggleModaRegistar"
        :visible="true"
      ></AgregarLink>
    </div>
    <div class="container px-6 mx-auto grid">
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th scope="col" class="px-6 py-3">Sesión (ID Sesión)</th>
                <th scope="col" class="px-6 py-3">Tema</th>
                <th scope="col" class="px-6 py-3">Descripción</th>
                <th scope="col" class="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="temasSesion in datos"
                :key="temasSesion.SESION_IDSESION"
              >
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <div
                        class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <p class="font-semibold">{{ temasSesion.SESION_IDSESION }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ temasSesion.TEMA }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ temasSesion.DESCRIPCION }}
                </td>
                <td class="px-4 py-3 text-sm">
                  <div class="flex">
                    <BotonEditar
                      :ruta="''"
                      :titulo="'Editar Tema'"
                      @click="abrirModalYSeleccionarTema(temasSesion.IDtema)"
                    ></BotonEditar>
                    <BotonEliminar
                      :ruta="''"
                      :titulo="'Eliminar Tema'"
                      @click="SeleccionarTemaEliminar(temasSesion.IDtema)"
                    ></BotonEliminar>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr class="border-t-2 border-dashed border-gray-400 my-4" />

    <div class="container px-6 mx-auto grid my-4 text-center pt-10">
      <div
        class="max-w p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          APROBACIÓN DEL ACTA ANTERIOR
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>
    <header
      class="flex justify-between items-center backdrop-blur-md bg-white/30 p-4 shadow rounded-lg m-8"
    >
      <div>
        <h1 class="text-2xl font-semibold text-gray-800">Acta Anterior</h1>
        <p>N* Acta: {{ ActaNumero }} -- Lugar: {{ Actalugar }}</p>
        <p class="text-gray-900">Fecha: {{ ActafechaDetallada }}</p>
        <p>HORA: {{ ActahoraInicio }} - {{ ActahoraFinal }}</p>
        <p>Presidente: {{ Actapresidente }}</p>
        <p>Secretario: {{ Actasecretario }}</p>
        <p>Estado: {{ ActaEstado }}</p>
      </div>
      <div>
        <button
          @click="ActualizarEstadoActa('FIRMADA')"
          class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          Aprobar
        </button>
        <button
          @click="ActualizarEstadoActa('PENDIENTE')"
          class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded ml-2"
        >
          Pendiente
        </button>
      </div>
    </header>
    <div class="container px-6 mx-auto grid my-4 text-center">
      <h1 class="text-2xl font-bold mb-4">REVISIÓN DE COMPROMISOS DE LA SESIÓN ANTERIOR</h1>
    </div>
    <div class="container px-6 mx-auto grid">
      <h2 class="text-2xl font-semibold mb-6">Lista de Tareas de la Sesión Anterior</h2>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th scope="col" class="px-6 py-3">Tareas</th>
                <th scope="col" class="px-6 py-3">Fecha de Entrega</th>
                <th scope="col" class="px-6 py-3">Fecha de Verificación</th>
                <th scope="col" class="px-6 py-3">Responsables</th>
                <th scope="col" class="px-6 py-3">Estado</th>
                <th scope="col" class="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                v-for="tarea in tareasIDSesionAnterior"
                :key="tarea.ID_TAREAS"
                class="text-gray-700 dark:text-gray-400"
              >
                <td class="py-4 px-6">{{ tarea.DESCRIPCION }}</td>
                <td class="py-4 px-6">{{ tarea.FECHA_ENTREGA }}</td>
                <td class="py-4 px-6">{{ tarea.FECHA_VERIFICACION }}</td>
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
                <td class="py-4 px-6">
                  <button
                    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    @click="ActualizarEstadoTarea(tarea.ID_TAREAS, 'REALIZADA')"
                  >
                    Finalizado
                  </button>
                  <button
                    class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-2 rounded ml-2"
                    @click="ActualizarEstadoTarea(tarea.ID_TAREAS, 'PENDIENTE')"
                  >
                    Pendiente
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <hr class="border-t-2 border-dashed border-gray-400 my-4" />
    <div class="container px-6 mx-auto grid my-4 text-center pt-10">
      <div
        class="max-w p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          LECTURA DE CORRESPONDENCIA
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>
    <div class="container px-6 mx-auto grid pt-4">
      <AgregarLink titulo="Solicitudes" ruta="" accion="Agregar" :visible="false"></AgregarLink>
    </div>
    <div class="container px-6 mx-auto grid">
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th scope="col" class="px-6 py-3">ID</th>
                <th scope="col" class="px-6 py-3">DEPENDENCIA</th>
                <th scope="col" class="px-6 py-3">ASUNTO</th>
                <th scope="col" class="px-6 py-3">DESICION</th>
                <th scope="col" class="px-6 py-3">FECHA SOLICITUD</th>
                <th class="px-4 py-3">ACCIONES</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                class="text-gray-700 dark:text-gray-400"
                v-for="solicitudes in solicitudes"
                :key="solicitudes.IDSOLICITUD"
              >
                <td class="px-4 py-3 border-b border-gray-300 dark:border-gray-700">
                  <div class="flex items-center text-sm">
                    <!-- Avatar with inset shadow -->
                    <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                      <div
                        class="absolute inset-0 rounded-full shadow-inner flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <p class="font-semibold">{{ solicitudes.IDSOLICITUD }}</p>
                      </div>
                    </div>
                  </div>
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitudes.DEPENDENCIA }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitudes.ASUNTO }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitudes.DESICION }}
                </td>
                <td class="px-4 py-3 text-sm">
                  {{ solicitudes.FECHADESOLICITUD }}
                </td>

                <td class="px-4 py-3 text-sm">
                  <div class="flex">
                    <BotonVer
                      :ruta="``"
                      :titulo="'Ver Solicitante'"
                      @click="IDSolicitante(solicitudes.IDSOLICITUD)"
                    ></BotonVer>
                    <button
                      @click="IDSolicitudResponder(solicitudes.IDSOLICITUD, solicitudes.DESICION)"
                      type="button"
                      class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                    >
                      Dar Respuesta
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <div
      v-if="isModalResponderSolicitud"
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-blue-100 rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Terms of Service</h3>
            <button
              @click="ModalRespuestaSolicitud()"
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
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
          <div class="px-4 py-5 sm:px-6">
            <div
              class="text-xl font-semibold text-gray-900 dark:text-white overflow-hidden shadow rounded-lg border"
            >
              <div class="px-4 py-5 sm:px-6">
                <h3 class="leading-6 text-xl font-semibold text-gray-900 dark:text-white">
                  Solicitud
                </h3>
                <p class="mt-1 max-w-2xl text-sm dark:text-gray-400">
                  información sobre la Solicitud.
                </p>
              </div>
              <div
                class="border-t px-4 py-5 sm:p-0 text-xl font-semibold text-gray-900 dark:text-white"
              >
                <dl class="font-semibold text-gray-900 dark:text-white">
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium dark:text-gray-400">Dependencia</dt>
                    <dd class="mt-1 text-sm dark:text-gray-400 sm:mt-0 sm:col-span-2">
                      {{ solicitante.dependencia }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium dark:text-gray-400">Asunto</dt>
                    <dd class="mt-1 text-sm dark:text-gray-400 sm:mt-0 sm:col-span-2">
                      {{ solicitante.asunto }}
                    </dd>
                  </div>
                  <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt class="text-sm font-medium dark:text-gray-400">Fecha Solicitud</dt>
                    <dd class="mt-1 text-sm dark:text-gray-400 sm:mt-0 sm:col-span-2">
                      {{ solicitante.fechasolicitud }}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          <hr class="border-t-2 border-dashed border-gray-400 my-4" />
          <div class="px-4 py-5 sm:px-6">
            <form class="text-xl font-semibold text-gray-900 dark:text-white">
              <h2 class="text-xl font-semibold text-gray-900 dark:text-white">Respuesta</h2>
              <div
                class="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
              >
                <div class="px-4 py-2 bg-white rounded-t-lg dark:bg-gray-800">
                  <textarea
                    v-model="RespuestaSolicitud"
                    id="comment"
                    rows="4"
                    class="w-full px-0 text-sm text-gray-900 bg-white border-0 dark:bg-gray-800 focus:ring-0 dark:text-white dark:placeholder-gray-400"
                    placeholder="Detalles de la respuesta"
                    required
                  ></textarea>
                </div>
                <div
                  class="flex items-center justify-between px-3 py-2 border-t dark:border-gray-600"
                >
                  <button
                    type="button"
                    class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
                    @click="ResponderSolicitud()"
                  >
                    Aceptar Respuesta
                  </button>
                  <div class="flex ps-0 space-x-1 rtl:space-x-reverse sm:ps-2"></div>
                </div>
              </div>
            </form>
          </div>

          <!-- Modal footer -->
        </div>
      </div>
    </div>
    <hr class="border-t-2 border-dashed border-gray-400 my-4" />

    <div class="container px-6 mx-auto grid my-4 text-center pt-10">
      <div
        class="max-w p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          PROPOSICIONES Y VARIOS
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>

    <hr class="border-t-2 border-dashed border-gray-400 my-4" />
    <div class="container px-6 mx-auto grid my-4 text-center pt-10">
      <div
        class="max-w p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          TAREAS O COMPROMISOS ADQUIRIDOS EN ESTA SESIÓN
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>

    <div
      class="backdrop-blur-sm bg-white/60 dark:border-slate-300 p-6 rounded-lg shadow-md max-w-lg mx-auto"
    >
      <!-- Panel de Tarea -->
      <h2 class="text-xl font-semibold mb-4 dark:text-gray-600">Crear Tarea</h2>
      <div class="mb-4">
        <label class="block dark:text-gray-500 text-sm font-bold mb-2">Descripción</label>
        <textarea
          v-model="descripcionTarea"
          @input="descripcionTarea = descripcionTarea.toUpperCase()"
          class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
          rows="4"
          placeholder="Describe la tarea aquí"
        ></textarea>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        @click="RegistrarTarea()"
      >
        Guardar Tarea
      </button>
    </div>

    <div class="container px-6 mx-auto grid">
      <h2 class="text-2xl font-semibold mb-6">Lista de Tareas</h2>
      <div class="w-full overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap border-black dark:border-slate-300">
            <thead>
              <tr
                class="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border-b dark:border-gray-700 bg-gray-50 dark:text-gray-400 dark:bg-gray-800"
              >
                <th scope="col" class="px-6 py-3">Tareas</th>
                <th scope="col" class="px-6 py-3">Fecha de Entrega</th>
                <th scope="col" class="px-6 py-3">Responsables</th>
                <th scope="col" class="px-6 py-3">Acciones</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y dark:divide-gray-700 dark:bg-gray-800">
              <tr
                v-for="tarea in tareasIDSesion"
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
                <td class="py-4 px-6">
                  <button
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                    @click="idResponsableSeleccionado(tarea.ID_TAREAS)"
                  >
                    Asignar Responsables
                  </button>
                  <button
                    class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded ml-2"
                    @click="idTareaSeleccionada(tarea.ID_TAREAS, tarea.DESCRIPCION)"
                  >
                    Editar
                  </button>
                  <button
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 ml-2 rounded"
                    @click="idTareaSeleccionadaEliminar(tarea.ID_TAREAS)"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <!-- modal para asignar responsables -->
    <div
      v-if="isModalOpenAsignarResponsables"
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-100 flex justify-center items-center w-auto h-auto overflow-y-auto overflow-x-hidden"
    >
      <div class="relative p-4 w-auto max-w-30 max-h-full">
        <!-- Modal content -->
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-lg font-semibold text-gray-900 dark:text-white">
              Asignacion de Responsables
            </h3>
            <button
              type="button"
              class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-toggle="select-modal"
              @click="toggleModalAsignarResponsables()"
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
          <!-- Modal body -->
          <div class="p-4 md:p-5">
            <p class="text-gray-500 dark:text-gray-400 mb-4">Disponibles para asignar</p>
            <div class="space-y-4 mb-4">
              <div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table
                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <thead
                      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                      <tr>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3">cargo</th>

                        <th scope="col" class="px-6 py-3">Asignar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        v-for="miembrosAsignados in miembrosDisponibles"
                        :key="miembrosAsignados.IDMIEMBRO"
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {{ miembrosAsignados.CARGO }}
                        </th>
                        <td class="px-6 py-4">{{ miembrosAsignados.NOMBRE }}</td>

                        <td class="px-6 py-4 text-right">
                          <button
                            type="button"
                            @click="AsignarResponsable(miembrosAsignados.IDMIEMBRO)"
                            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Asignar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          <div class="p-4 md:p-5">
            <p class="text-gray-500 dark:text-gray-400 mb-4">Responsables Asignados</p>
            <div class="space-y-4 mb-4">
              <div>
                <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                  <table
                    class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <thead
                      class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                    >
                      <tr>
                        <th scope="col" class="px-6 py-3">Nombre</th>
                        <th scope="col" class="px-6 py-3">cargo</th>

                        <th scope="col" class="px-6 py-3">Desasignar</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr
                        class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                        v-for="miembrosAsignados in miembrosAsignados"
                        :key="miembrosAsignados.IDMIEMBRO"
                      >
                        <th
                          scope="row"
                          class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                        >
                          {{ miembrosAsignados.CARGO }}
                        </th>
                        <td class="px-6 py-4">{{ miembrosAsignados.NOMBRE }}</td>

                        <td class="px-6 py-4 text-right">
                          <button
                            type="button"
                            @click="DesasignarResponsable(miembrosAsignados.IDMIEMBRO)"
                            class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                          >
                            Desasignar
                          </button>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--modal para Actualizar tarea-->
    <div
      v-if="isModalOpenActualizarTarea"
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <div class="relative p-4 w-full max-w-2xl max-h-full">
        <!-- Modal content -->
        <div class="relative bg-slate-500 rounded-lg shadow dark:bg-gray-700">
          <!-- Modal header -->
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
          >
            <h3 class="text-xl font-semibold text-gray-900 dark:text-white">Actualizar Tarea</h3>
            <button
              @click="toggleModaActualizarTarea()"
              type="button"
              class="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              data-modal-hide="default-modal"
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
          <!-- Modal body -->
          <div class="p-4 md:p-5 space-y-4">
            <!-- Panel de Tarea -->
            <div class="mb-4">
              <label class="block text-gray-300 text-sm font-bold mb-2">Descripción</label>
              <textarea
                v-model="descripcionTareaActualizar"
                @input="descripcionTareaActualizar = descripcionTareaActualizar.toUpperCase()"
                class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-500 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 leading-tight focus:outline-none focus:shadow-outline"
                rows="4"
                placeholder="Describe la tarea aquí"
              ></textarea>
            </div>
          </div>
          <!-- Modal footer -->
          <div
            class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600"
          >
            <button
              @click="ActualizarTarea()"
              data-modal-hide="default-modal"
              type="button"
              class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Actualizar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal para eliminar tarea -->

    <div
      v-if="isModalOpenEliminarTarea"
      id="crud-modal"
      tabindex="-1"
      aria-hidden="true"
      class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
    >
      <div class="relative p-4 w-full max-w-md h-full md:h-auto">
        <!-- Modal content -->
        <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
          <button
            @click="toggleModalEliminarTarea()"
            type="button"
            class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="deleteModal"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Close modal</span>
          </button>
          <svg
            class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
            aria-hidden="true"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <p class="mb-4 text-gray-500 dark:text-gray-300">Esta seguro de eliminar esta tarea?</p>
          <div class="flex justify-center items-center space-x-4">
            <button
              data-modal-toggle="deleteModal"
              type="button"
              class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            >
              No, cancelar
            </button>
            <button
              type="submit"
              class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
              @click="eliminarTarea()"
            >
              Si, Eliminar
            </button>
          </div>
        </div>
      </div>
    </div>
    <!-- modal para asignar responsables -->
    <hr class="border-t-2 border-dashed border-gray-400 my-4" />
    <div class="container px-6 mx-auto grid my-4 text-center pt-10">
      <div
        class="max-w p-2 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
      >
        <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          PROXIMA SESION
        </h5>
        <p class="font-normal text-gray-700 dark:text-gray-400"></p>
      </div>
    </div>

    <hr class="border-t-2 border-dashed border-gray-400 my-4" />
  </main>

  <div
    v-if="isModalOpen"
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Registara Tema</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleModaRegistar"
          >
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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

        <!-- Modal body -->
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tema</label
              >
              <input
                type="text"
                name="name"
                id="name"
                v-model="RegistrarTema.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tema de la sesion"
                required
              />
            </div>
            <div class="col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <textarea
                id="description"
                rows="4"
                v-model="RegistrarTema.description"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description Del tema"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="Registrar()"
          >
            <svg
              class="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Agregar Tema
          </button>
        </form>
      </div>
    </div>
  </div>

  <div
    v-if="isModalOpen1"
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Actualizar Tema</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            @click="toggleModaActualizar"
          >
            <svg class="w-3 h-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
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

        <!-- Modal body -->
        <form class="p-4 md:p-5">
          <div class="grid gap-4 mb-4 grid-cols-2">
            <div class="col-span-2">
              <label for="name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Tema</label
              >
              <input
                type="text"
                name="name"
                id="name"
                v-model="tema.name"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Tema de la sesion"
                required
              />
            </div>
            <div class="col-span-2">
              <label
                for="description"
                class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >Description</label
              >
              <textarea
                id="description"
                v-model="tema.description"
                rows="4"
                class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Description Del tema"
                required
              ></textarea>
            </div>
          </div>
          <button
            type="button"
            class="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="Actualizar()"
          >
            <svg
              class="me-1 -ms-1 w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                clip-rule="evenodd"
              ></path>
            </svg>
            Actualizar
          </button>
        </form>
      </div>
    </div>
  </div>

  <!-- Main modal -->
  <div
    v-if="isModalOpenEliminar"
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
  >
    <div class="relative p-4 w-full max-w-md h-full md:h-auto">
      <!-- Modal content -->
      <div class="relative p-4 text-center bg-white rounded-lg shadow dark:bg-gray-800 sm:p-5">
        <button
          @click="toggleModaEliminar"
          type="button"
          class="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
          data-modal-toggle="deleteModal"
        >
          <svg
            aria-hidden="true"
            class="w-5 h-5"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clip-rule="evenodd"
            ></path>
          </svg>
          <span class="sr-only">Close modal</span>
        </button>
        <svg
          class="text-gray-400 dark:text-gray-500 w-11 h-11 mb-3.5 mx-auto"
          aria-hidden="true"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
            clip-rule="evenodd"
          ></path>
        </svg>
        <p class="mb-4 text-gray-500 dark:text-gray-300">
          Are you sure you want to delete this item?
        </p>
        <div class="flex justify-center items-center space-x-4">
          <button
            @click="toggleModaEliminar"
            data-modal-toggle="deleteModal"
            type="button"
            class="py-2 px-3 text-sm font-medium text-gray-500 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-primary-300 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
          >
            No, cancel
          </button>
          <button
            type="submit"
            class="py-2 px-3 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-900"
            @click="eliminarTema"
          >
            Si, Eliminar
          </button>
        </div>
      </div>
    </div>
  </div>

  <div
    v-if="Solicitante"
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-50 flex justify-center items-center w-full h-full overflow-y-auto overflow-x-hidden"
  >
    <div class="relative p-4 w-full max-w-md max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Infomacion Perfil</h3>
          <button
            @click="SolicitanteModal()"
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="select-modal"
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
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <div class="bg-white overflow-hidden shadow rounded-lg border">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Perfil Solicitante</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">información sobre el Solicitante.</p>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Nombre</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.nombre }}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Email</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.email }}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Celular</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.celular }}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Tipo de Solicitante</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.TipoSolicitante }}
                  </dd>
                </div>
              </dl>
            </div>
            <hr class="border-t-2 border-dashed border-gray-400 my-4" />
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">Descripcion</h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">Descripcion Solicitud.</p>
            </div>
            <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
              <dl class="sm:divide-y sm:divide-gray-200">
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Estudiantes Implicados</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.estu_implicados }}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Numero de estudiantes</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.numEstu_implicados }}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Pais</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.pais }}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Ciudad</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.ciudad }}
                  </dd>
                </div>
                <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Evento</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {{ solicitante.evento }}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Modal toggle -->
  <div
    v-if="NoInvitados"
    id="crud-modal"
    tabindex="-1"
    aria-hidden="true"
    class="fixed inset-0 z-100 flex justify-center items-center w-auto h-auto overflow-y-auto overflow-x-hidden"
  >
    <div class="relative p-4 w-auto max-w-30 max-h-full">
      <!-- Modal content -->
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <!-- Modal header -->
        <div
          class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600"
        >
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white">Open positions</h3>
          <button
            type="button"
            class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm h-8 w-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            data-modal-toggle="select-modal"
            @click="NoInvitadosteModal()"
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
        <!-- Modal body -->
        <div class="p-4 md:p-5">
          <p class="text-gray-500 dark:text-gray-400 mb-4">Select your desired position:</p>
          <div class="space-y-4 mb-4">
            <div>
              <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
                <table
                  class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
                >
                  <thead
                    class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400"
                  >
                    <tr>
                      <th scope="col" class="px-6 py-3">Nombre</th>
                      <th scope="col" class="px-6 py-3">cargo</th>

                      <th scope="col" class="px-6 py-3">Agrega Invitador</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr
                      class="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      v-for="invitado in Invitado"
                      :key="invitado.IDINVITADOS"
                    >
                      <th
                        scope="row"
                        class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {{ invitado.CARGO }}
                      </th>
                      <td class="px-6 py-4">{{ invitado.NOMBRE }}</td>

                      <td class="px-6 py-4 text-right">
                        <button
                          type="button"
                          @click="AgregarInvitado(invitado.IDINVITADOS)"
                          class="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        >
                          Agregar
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, type Ref, onMounted, onBeforeUnmount, watch } from 'vue'
import AgregarLink from '@/components/modules/AgregarLink.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
import BotonEditar from '@/components/botones/BotonEditar.vue'
import BotonEliminar from '@/components/botones/BotonEliminar.vue'
import { useRoute } from 'vue-router'
import ActasService from '@/modules/actas/services'
import OrdenService from '@/modules/ordenSesion/services'
import SesionService from '@/modules/sesion/services'
import SolicitudService from '@/modules/solicitud/services'
import TareasService from '@/modules/tareas/services'
import MiembrosService from '@/modules/miembros/services'
import BotonVer from '@/components/botones/BotonVer.vue'
const TemaSelecionado = ref<Number | null>(null)
import 'dayjs/locale/es'
import dayjs from 'dayjs'
// Recuperamos el valor de IDSESION
const route = useRoute()
const idSesion = ref<number | null>(null)

dayjs.locale('es')

// Estado para el estado de la sesión
const estadoSesion = ref('próxima')

// Variables para el contador
const diasRestantes = ref(0)
const horasRestantes = ref(0)
const minutosRestantes = ref(0)

let intervalId: number | null = null

// Función para obtener el formato detallado
function obtenerFechaDetallada(fecha: string): string {
  return dayjs(fecha).format('D [de] MMMM [de] YYYY, dddd')
}

// Función para actualizar el contador basado en la fecha y horas de inicio y final de la sesión
function actualizarContador() {
  if (!fecha.value || !horaInicio.value || !horaFinal.value) return

  const fechaInicio = dayjs(`${fecha.value} ${horaInicio.value}`)
  const fechaFin = dayjs(`${fecha.value} ${horaFinal.value}`)
  const fechaActual = dayjs()

  if (fechaInicio.isAfter(fechaActual)) {
    // La sesión aún no inicia
    estadoSesion.value = 'próxima'
    const diferencia = fechaInicio.diff(fechaActual, 'minute')
    diasRestantes.value = Math.floor(diferencia / (60 * 24))
    horasRestantes.value = Math.floor((diferencia % (60 * 24)) / 60)
    minutosRestantes.value = diferencia % 60
  } else if (fechaInicio.isBefore(fechaActual) && fechaFin.isAfter(fechaActual)) {
    // La sesión está en proceso
    estadoSesion.value = 'en proceso'
    const diferencia = fechaFin.diff(fechaActual, 'minute')
    diasRestantes.value = Math.floor(diferencia / (60 * 24))
    horasRestantes.value = Math.floor((diferencia % (60 * 24)) / 60)
    minutosRestantes.value = diferencia % 60
  } else {
    // La sesión ya terminó
    estadoSesion.value = 'finalizado'
    diasRestantes.value = 0
    horasRestantes.value = 0
    minutosRestantes.value = 0
    if (intervalId) clearInterval(intervalId) // Detener el contador cuando la sesión termina
  }
}

// Función para iniciar el contador
function iniciarContador() {
  actualizarContador()
  intervalId = setInterval(actualizarContador, 60000) // Actualiza cada minuto
}

// Evento que detecta si la página está visible o no
document.addEventListener('visibilitychange', () => {
  if (document.visibilityState === 'visible') {
    iniciarContador()
  } else {
    if (intervalId) clearInterval(intervalId)
  }
})

// Detener el contador al salir de la página
onBeforeUnmount(() => {
  if (intervalId) clearInterval(intervalId)
})



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
const lugar = ref<string | null>(null)
const fechaDetallada = ref<string | null>(null)
const fecha = ref<string | null>(null)
const horaInicio = ref<string | null>(null)
const horaFinal = ref<string | null>(null)
const secretario = ref<string | null>(null)
const presidente = ref<string | null>(null)

interface Sesion {
  IDSESION: number
  LUGAR: string
  FECHA: string
  HORAINICIO: string
  HORAFINAL: string
  PRESIDENTE: string
  SECRETARIO: string
}
let sesion: Ref<Sesion[]> = ref([])
const CargarSesion = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await SesionService.MostrarSesionIDSesion(IDSesion)
    if (respuesta.status == 200) {
      sesion.value = Array.isArray(respuesta.data[0]) ? respuesta.data[0] : [respuesta.data[0]]
      fechaDetallada.value = obtenerFechaDetallada(sesion.value[0].FECHA)
      fecha.value = sesion.value[0].FECHA
      lugar.value = sesion.value[0].LUGAR
      horaInicio.value = sesion.value[0].HORAINICIO
      horaFinal.value = sesion.value[0].HORAFINAL
      presidente.value = sesion.value[0].PRESIDENTE
      secretario.value = sesion.value[0].SECRETARIO
      iniciarContador()
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
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

function obtenerSolicitudPorId(id: number): Solicitudes | null {
  return solicitudes.value.find((solicitud) => solicitud.IDSOLICITUD === id) || null
}

const solicitante: Ref<{
  dependencia: string
  asunto: string
  fechasolicitud: string
  desicion: string
  nombre: string
  email: string
  celular: string
  TipoSolicitante: string
  estu_implicados: string
  numEstu_implicados: string
  ciudad: string
  pais: string
  evento: string
}> = ref({
  dependencia: '',
  asunto: '',
  fechasolicitud: '',
  desicion: '',
  nombre: '',
  email: '',
  celular: '',
  TipoSolicitante: '',
  estu_implicados: '',
  numEstu_implicados: '',
  ciudad: '',
  pais: '',
  evento: ''
})
const DetallesSolicitud = (id: number) => {
  let datosDetalle = obtenerSolicitudPorId(id)
  console.log('detalles ' + datosDetalle)
  solicitante.value.nombre = datosDetalle?.NOMBRE || ''
  solicitante.value.email = datosDetalle?.EMAIL || ''
  solicitante.value.celular = datosDetalle?.CELULAR || ''
  solicitante.value.TipoSolicitante = datosDetalle?.TIPODESOLICITANTE || ''
  solicitante.value.estu_implicados = datosDetalle?.ESTU_IMPLICADOS || ''
  solicitante.value.numEstu_implicados = datosDetalle?.NUM_ESTU_IMPLICADOS || ''
  solicitante.value.ciudad = datosDetalle?.CIUDAD_IMPLICADA || ''
  solicitante.value.pais = datosDetalle?.PAIS_IMPLICADO || ''
  solicitante.value.evento = datosDetalle?.EVENTO || ''
  solicitante.value.dependencia = datosDetalle?.DEPENDENCIA || ''
  solicitante.value.asunto = datosDetalle?.ASUNTO || ''
  solicitante.value.fechasolicitud = datosDetalle?.FECHADESOLICITUD || ''
}

const RespuestaSolicitud = ref('')
const ResponderSolicitud = async () => {
  let idSolicitud = Number(IDsolicitud.value.id)
  const respuesta = await SolicitudService.ResponderSolicitud(RespuestaSolicitud.value, idSolicitud)
  if (respuesta.status == 201) {
    alert(respuesta.data.message)
    CargarSolicitudes()
  } else if (respuesta.status == 400) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 500) {
    console.log(respuesta.error.message)
  }
}

onMounted(() => {
  let id = route.params.IDSESION
  let valor = Number(id)
  idSesion.value = valor
  Cargardatos()
  CargarSesion()
  CargarActa()
})

function Cargardatos() {
  SesionesTemas()
  CargarSolicitudes()
  TodosCitados()
  asistenciaMiembro()
  asistenciaInvitado()
  MostrarTareasIDSesion()
  InvitadosPendientes()
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
      datos.value=[]
    } else {
      alert(respuesta.error.error)
    }
  }
}

const tema: Ref<{ name: string; description: string; id: string }> = ref({
  name: '',
  description: '',
  id: ''
})

//REgistro de temas
const RegistrarTema: Ref<{ name: string; description: string }> = ref({ name: '', description: '' })
const Registrar = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await OrdenService.InsertarTema(
      RegistrarTema.value.name,
      RegistrarTema.value.description,
      IDSesion
    )
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      SesionesTemas()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 409) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  } else {
    alert('El ID de sesión es nulo')
  }
}
// Actualizar Temas

const Actualizar = async () => {
  let IDtema = Number(tema.value.id)
  let IDsesion = Number(idSesion.value)
  if (IDtema !== null) {
    const respuesta = await OrdenService.ActualizarTema(
      tema.value.name,
      tema.value.description,
      IDtema,
      IDsesion
    )
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      SesionesTemas()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 409) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  }
}

const temaSelecionado = async (id: number) => {
  const respuesta = await OrdenService.datosTema(id)
  let valor = Number(id)
  TemaSelecionado.value = valor
  if (respuesta.status === 200 && Array.isArray(respuesta.data) && respuesta.data.length > 0) {
    const temaData = respuesta.data[0]
    // Asignamos los valores a tema.value
    tema.value.name = temaData.TEMA
    tema.value.description = temaData.DESCRIPCION
    tema.value.id = temaData.IDtema
  } else if (respuesta.status == 404) {
    alert(respuesta.error.message)
  } else {
    console.error(respuesta.error.message)
  }
}

const idTema: Ref<{ id: string }> = ref({
  id: ''
})

const idSelecionado = (id: Number) => {
  idTema.value.id = String(id)
}

const eliminarTema = async () => {
  let IDtema = Number(idTema.value.id)
  const respuesta = await OrdenService.EliminarTema(IDtema)
  if (respuesta.status == 200) {
    SesionesTemas()
    toggleModaEliminar()
    alert(respuesta.data.message)

    idTema.value.id = ''
  } else if (respuesta.status == 400) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 409) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 500) {
    alert(respuesta.error.message)
  }
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

//Actualizar Asistencia
const actualizarAsistenciaMiembro = async (estado: string, idMiembro: number) => {
  const estadoValido = ['X', '-', 'ES'].includes(estado)

  if (!estadoValido) {
    alert('Por favor selecciona un estado de asistencia válido.')
    return
  } else {
    let IDSesion: number | null = idSesion.value
    if (IDSesion !== null) {
      let respuesta = await SesionService.ActualizarAsistenciaMiembro(estado, IDSesion, idMiembro)
      if (respuesta.status == 201) {
        alert(respuesta.data.message)
        asistenciaMiembro()
      } else if (respuesta.status == 400) {
        alert(respuesta.error.message)
      } else if (respuesta.status == 500) {
        alert(respuesta.error.message)
      }
    }
  }
}

// Asistencia Invitado
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

const actualizarAsistenciaInvitado = async (estado: string, idInvitado: number) => {
  const estadoValido = ['ASISTIO', 'NO ASISTIO'].includes(estado)
  if (!estadoValido) {
    alert('Por favor selecciona un estado de asistencia válido.')
    return
  } else {
    let IDSesion: number | null = idSesion.value
    if (IDSesion !== null) {
      let respuesta = await SesionService.ActualizarAsistenciaInvitado(estado, IDSesion, idInvitado)
      if (respuesta.status == 201) {
        alert(respuesta.data.message)
        asistenciaInvitado()
      } else if (respuesta.status == 400) {
        alert(respuesta.error.message)
      } else if (respuesta.status == 500) {
        alert(respuesta.error.message)
      }
    }
  }
}

//Asistencias pendientes
interface invitado {
  IDINVITADOS: number
  CARGO: string
  NOMBRE: string
}

let Invitado: Ref<invitado[]> = ref([])

const InvitadosPendientes = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await SesionService.MostrarInvitacionPendiente(IDSesion)
    if (respuesta.status == 200) {
      Invitado.value = Array.isArray(respuesta.data) ? respuesta.data : [respuesta.data]
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
      Invitado.value = []
    } else {
      console.log(respuesta.error.error)
    }
  }
}

//agregar invitado
const AgregarInvitado = async (idInvitado: number) => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    let respuesta = await SesionService.AgregarInvitado(IDSesion, idInvitado)
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      asistenciaInvitado()
      InvitadosPendientes()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 409) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  }
}

const eliminarAsistenciaInvitado = async (idInvitado: number) => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    let respuesta = await SesionService.EliminarAsistenciaInvitado(IDSesion, idInvitado)
    if (respuesta.status == 200) {
      alert(respuesta.data.message)
      asistenciaInvitado()
      InvitadosPendientes()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  }
}

const CargarMiembros = ref(false)
const enviarCitacionMiembro = ref(false)
const TodosCitados = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await SesionService.TodosCitados(IDSesion)
    if (respuesta.status == 200) {
      if (respuesta.data.message == true) {
        enviarCitacionMiembro.value = true
        CargarMiembros.value = false
      }
    } else if (respuesta.status == 400) {
      if (respuesta.error.message == false) {
        CargarMiembros.value = true
        enviarCitacionMiembro.value = false
      }
    }
  }
}
const isLoading = ref(false)

const CargarMiembrosAsistencia = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    isLoading.value = true
    try {
      let respuesta = await SesionService.CardarMiembros(IDSesion)
      if (respuesta.status == 201) {
        alert(respuesta.data.message)
        asistenciaMiembro()
        TodosCitados()
      } else if (respuesta.status == 400) {
        alert(respuesta.error.message)
      } else if (respuesta.status == 500) {
        alert(respuesta.error.message)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
    } finally {
      isLoading.value = false // Ocultar spinner
    }
  }
}

//aciones
const isModalOpen = ref(false)
const toggleModaRegistar = () => {
  isModalOpen.value = !isModalOpen.value
  if (isModalOpen.value == false) {
    RegistrarTema.value.name = ''
    RegistrarTema.value.description = ''
  }
}
const isModalOpen1 = ref(false)
const toggleModaActualizar = () => {
  isModalOpen1.value = !isModalOpen1.value
}
const abrirModalYSeleccionarTema = (id: number) => {
  toggleModaActualizar()
  temaSelecionado(id)
}
const isModalOpenEliminar = ref(false)
const toggleModaEliminar = () => {
  isModalOpenEliminar.value = !isModalOpenEliminar.value
}
const SeleccionarTemaEliminar = (id: number) => {
  toggleModaEliminar()
  idSelecionado(id)
}
const Solicitante = ref(false)
const SolicitanteModal = () => {
  Solicitante.value = !Solicitante.value
}

const NoInvitados = ref(false)
const NoInvitadosteModal = () => {
  NoInvitados.value = !NoInvitados.value
}

const IDSolicitante = (id: number) => {
  SolicitanteModal()
  DetallesSolicitud(id)
}

const isModalResponderSolicitud = ref(false)
const ModalRespuestaSolicitud = () => {
  isModalResponderSolicitud.value = !isModalResponderSolicitud.value
}

const IDsolicitud: Ref<{ id: string }> = ref({
  id: ''
})

const idSolicitud = (id: Number) => {
  IDsolicitud.value.id = String(id)
}

const IDSolicitudResponder = (id: number, desicion: string) => {
  ModalRespuestaSolicitud()
  DetallesSolicitud(id)
  RespuestaSolicitud.value = desicion
  idSolicitud(id)
}

const descripcionTarea = ref<string>('')

// Asignar tareas
const RegistrarTarea = async () => {
  let IDSesion: number | null = idSesion.value
  if (IDSesion !== null) {
    const respuesta = await TareasService.InsertarTarea(descripcionTarea.value, IDSesion)
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      MostrarTareasIDSesion()
      descripcionTarea.value = ''
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 409) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  } else {
    alert('El ID de sesión es nulo')
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
      tareasIDSesion.value = []
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  }
}

const idTarea: Ref<{ id: string }> = ref({
  id: ''
})
// Actualizar Tarea
const idTareaSeleccionada = (id: number, descripcion: string) => {
  toggleModaActualizarTarea()
  idTarea.value.id = String(id)
  descripcionTareaActualizar.value = descripcion
}

const descripcionTareaActualizar = ref<string>('')
const isModalOpenActualizarTarea = ref(false)
const toggleModaActualizarTarea = () => {
  isModalOpenActualizarTarea.value = !isModalOpenActualizarTarea.value
}

const ActualizarTarea = async () => {
  let IDTarea: number | null = Number(idTarea.value.id)
  let IDSesion: number | null = idSesion.value
  if (IDTarea !== null && IDSesion !== null) {

    const respuesta = await TareasService.ActualizarTarea(
      IDTarea,
      descripcionTareaActualizar.value,
      IDSesion
    )
    console.log(respuesta)
    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      MostrarTareasIDSesion()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 409) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  }
}

const isModalOpenAsignarResponsables = ref(false)
const toggleModalAsignarResponsables = () => {
  isModalOpenAsignarResponsables.value = !isModalOpenAsignarResponsables.value
}

const idTareaAsignarResponsable: Ref<{ id: string }> = ref({
  id: ''
})

const idResponsableSeleccionado = (id: number) => {
  idTareaAsignarResponsable.value.id = String(id)
  toggleModalAsignarResponsables()
  AsignadosTarea()
}

// cargar miembros
interface MiembrosAsignadosTarea {
  IDMIEMBRO: number
  NOMBRE: string
  CARGO: string
  ASIGNADO: number
}
let miembrosDisponibles: Ref<MiembrosAsignadosTarea[]> = ref([])
let miembrosAsignados: Ref<MiembrosAsignadosTarea[]> = ref([])
const miembrosAsignadosTarea: Ref<MiembrosAsignadosTarea[]> = ref([])
const AsignadosTarea = async () => {
  let IDTarea: number | null = Number(idTareaAsignarResponsable.value.id)
  if (IDTarea !== null) {
    const respuesta = await MiembrosService.MiembrosAsignadosTarea(IDTarea)
    if (respuesta.status == 200) {
      miembrosAsignadosTarea.value = Array.isArray(respuesta.data)
        ? respuesta.data
        : [respuesta.data]
      miembrosDisponibles.value = respuesta.data.filter(
        (m: MiembrosAsignadosTarea) => m.ASIGNADO === 0
      )
      miembrosAsignados.value = respuesta.data.filter(
        (m: MiembrosAsignadosTarea) => m.ASIGNADO === 1
      )
      console.log(miembrosDisponibles.value)
      console.log(miembrosAsignados.value)
    } else if (respuesta.status == 404) {
      console.log(respuesta.error.message)
    } else {
      console.log(respuesta.error.error)
    }
  }
}

const AsignarResponsable = async (IDMIEMBRO: number) => {
  let IDTarea: number | null = Number(idTareaAsignarResponsable.value.id)
  if (IDTarea !== null && IDMIEMBRO !== null) {
    const respuesta = await MiembrosService.AsignarResponsable(IDTarea, IDMIEMBRO)

    if (respuesta.status == 201) {
      alert(respuesta.data.message)
      AsignadosTarea()
      MostrarTareasIDSesion()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  }
}

const DesasignarResponsable = async (IDMIEMBRO: number) => {
  let IDTarea: number | null = Number(idTareaAsignarResponsable.value.id)
  if (IDTarea !== null && IDMIEMBRO !== null) {
    const respuesta = await MiembrosService.DesasignarResponsable(IDMIEMBRO, IDTarea)

    if (respuesta.status == 200) {
      alert(respuesta.data.message)
      AsignadosTarea()
      MostrarTareasIDSesion()
    } else if (respuesta.status == 400) {

      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    } else {
      alert(respuesta.error.error)
    }
  }
}

const isModalOpenEliminarTarea = ref(false)
const toggleModalEliminarTarea = () => {
  isModalOpenEliminarTarea.value = !isModalOpenEliminarTarea.value
}

const idTareaEliminar: Ref<{ id: string }> = ref({
  id: ''
})

const idTareaSeleccionadaEliminar = (id: number) => {
  toggleModalEliminarTarea()
  idTareaEliminar.value.id = String(id)
}

const eliminarTarea = async () => {
  let IDTarea: number | null = Number(idTareaEliminar.value.id)
  if (IDTarea !== null) {
    const respuesta = await TareasService.EliminarTarea(IDTarea)
    if (respuesta.status == 200) {
      alert(respuesta.data.message)
      MostrarTareasIDSesion()
      idTareaEliminar.value.id = ''
      toggleModalEliminarTarea()
    } else if (respuesta.status == 400) {
      alert(respuesta.error.message)
    } else if (respuesta.status == 500) {
      alert(respuesta.error.message)
    }
  }
}

// Tareas anteriores
interface TareasIDSesionAnterior {
  ID_TAREAS: number
  DESCRIPCION: string
  FECHA_ENTREGA: string
  FECHA_VERIFICACION: string
  RESPONSABLES: string
  SESION_IDSESION: number
  ESTADO: string
}
const IDSesionAnterior: Ref<{ id: string }> = ref({
  id: ''
})
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

watch(
  () => IDSesionAnterior.value.id,
  (newId) => {
    if (newId) MostrarTareasIDSesionAnterior()
  }
)

//Actualizar estado tarea
const ActualizarEstadoTarea = async (IDTAREA: number, ESTADO: string) => {
  const respuesta = await TareasService.ActualizarEstadoTarea(IDTAREA, ESTADO)
  if (respuesta.status == 201) {
    alert(respuesta.data.message)
    MostrarTareasIDSesionAnterior()
  } else if (respuesta.status == 400) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 500) {
    alert(respuesta.error.message)
  }
}

const ActualizarEstadoActa = async (ESTADO: string) => {
  let IDSesion = Number(IDSesionAnterior.value.id)
  const respuesta = await ActasService.ActualizarEstadoActa(IDSesion, ESTADO)
  if (respuesta.status == 201) {
    alert(respuesta.data.message)
    CargarActa()
  } else if (respuesta.status == 400) {
    alert(respuesta.error.message)
  } else if (respuesta.status == 500) {
    alert(respuesta.error.message)
  }
}
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
