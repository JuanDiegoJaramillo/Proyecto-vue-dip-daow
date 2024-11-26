<!-- src/modules/actas/views/index.vue -->
<script setup lang="ts">
import botonLink from '@/components/Navegation/BottomLink.vue'
import BarraNavegation from '@/components/Navegation/BottomNavegation.vue'
import BreadCrumb from '@/components/BreadCrumb.vue'
</script>
<template>
  <div class="p-4">
    <h1>Gestión - solicitantes</h1>
    <div>
      <BreadCrumb home="Solicitantes" modulo="Gestion" />
    </div>
    <div class="w-f flex items-center justify-center">
      <BarraNavegation>
        <botonLink ruta="/solicitantes/listar" titulo="Listar" />
        <botonLink ruta="/solicitantes/crear" titulo="Crear" />
      </BarraNavegation>
    </div>
  </div>
  <div class="p-6">
    <!-- Aquí se renderizarán las subrutas (ListaActas, DetalleActa, etc.) -->
    <router-view></router-view>
  </div>
</template>

<script lang="ts"></script>
