<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  middleware: 'check-user-name'
})

const supabase = useSupabaseClient()
const user = useSupabaseUser()

const name = ref<string>('')
const nameInput = ref<HTMLInputElement | null>(null)
const pending = ref<boolean>(false)

async function onNameEntered() {
  pending.value = true
  try {
    if (!name.value) return
    const { data, error } = await supabase
      .from('profiles')
      .update({ name: name.value })
      .eq('id', user.value?.id)
      .select()

    if (error) throw error
  } catch (error) {
    console.error(error)
  }
  navigateTo('/')
  pending.value = false
}
onMounted(() => {
  nameInput.value?.focus()
})
</script>

<template>
  <section>
    <h1 class="mb-4">Tu nombre de usuario</h1>
    <form
      class="grid gap-4"
      @submit.prevent="onNameEntered">
      <label for="name">Nombre de usuario</label>
      <input
        id="name"
        ref="nameInput"
        type="text"
        v-model="name"
        required
        placeholder="Introduce un nombre de usuario" />
      <Button
        type="submit"
        :pending="pending">
        Enviar
      </Button>
    </form>
  </section>
</template>
