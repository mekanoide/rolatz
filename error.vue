<script setup lang="ts">
const error = useError()
</script>

<template>
  <div>
    <h1>Algo va muy mal</h1>
    <p>{{ error.message }}</p>
  </div>
</template>