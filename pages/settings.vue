<script setup lang="ts">
import { useProfileStore } from '@/stores/profile'

const profileStore = useProfileStore()
await profileStore.fetchMe()

const name = ref<string>('')

if (profileStore.me) {
  name.value = profileStore.me.name
}


function onSubmitData() {
  profileStore.updateName(name.value)
}
</script>

<template>
  <div class="max-w-md mx-auto my-16">
    <h1 class="mb-8 text-3xl">Configuración</h1>
    <form @submit="onSubmitData" class="grid gap-4">
      <label for="name">Nombre de usuario</label>
      <input
        id="name"
        v-model="name"
        type="text"
        placeholder="Introduce tu nombre de usuario"
        maxlength="32"
        minlength="2" />
      <Button type="submit" variant="primary">Guardar</Button>
    </form>
  </div>
</template>
