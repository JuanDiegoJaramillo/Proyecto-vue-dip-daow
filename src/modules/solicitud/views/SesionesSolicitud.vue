<template>
<SesionSolicitudesIDSolicitante :IDsolicitante="idSolicitante || 0" />
</template>
<script setup lang="ts">
import { ref , onMounted } from 'vue'
import { useRoute } from 'vue-router'
import SesionSolicitudesIDSolicitante from '@/modules/solicitud/components/SesionSolicitudesIDSolicitante.vue';
const route = useRoute()
const idSolicitante = ref<number | null>(null)
onMounted(() => {
  let id = route.params.idsolicitante
  let valor = Number(id)
  idSolicitante.value = valor
})

</script>
<style scoped>
</style>
