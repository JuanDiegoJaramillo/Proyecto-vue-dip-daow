<script setup lang="ts">
defineProps<{
  breadcrumbs: { name: string; url?: string }[] // Cada breadcrumb tiene un nombre y un URL opcional.
}>()
</script>

<template>
  <nav class="flex" aria-label="Breadcrumb">
    <ol class="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
      <li
        v-for="(breadcrumb, index) in breadcrumbs"
        :key="index"
        class="inline-flex items-center"
      >
        <div class="flex items-center">
          <!-- Icono de separación -->
          <svg
            v-if="index > 0"
            class="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1 dark:text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m1 9 4-4-4-4"
            />
          </svg>

          <!-- Nombre del breadcrumb -->
          <a
            v-if="breadcrumb.url"
            :href="breadcrumb.url"
            class="font-medium text-gray-700 hover:text-blue-600 dark:text-white dark:hover:text-gray mb-1 text-2xl dark:text-gray"
          >
            {{ breadcrumb.name }}
          </a>
          <span
            v-else
            class="font-medium text-gray-500 md:ms-2 dark:text-white mb-1 text-2xl dark:text-gray"
          >
            {{ breadcrumb.name }}
          </span>
        </div>
      </li>
    </ol>
  </nav>
</template>
