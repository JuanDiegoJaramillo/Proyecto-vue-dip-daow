<template>
<SesionSolicitudesIDSolicitante :IDsolicitante="idSolicitanteSeleccionado || 0" />
</template>
<script setup lang="ts">
import { ref , onMounted } from 'vue'
import SesionSolicitudesIDSolicitante from '@/modules/solicitud/components/SesionSolicitudesIDSolicitante.vue';
import SolicitantesService from '@/modules/solicitantes/services'
const idSolicitanteSeleccionado = ref<number | null>(null)
const getIDSolicitante =async()=>{
 const respuesta =  await SolicitantesService.getIDolicitante()
 idSolicitanteSeleccionado.value = respuesta.data[0].IDSOLICITANTE
}
onMounted(() => {
  getIDSolicitante()
})

</script>
<style scoped>
</style>
