<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
import useAuth from '@/composables/useAuth'

const email = ref<string>('')
const code = ref<string>('')
const stage = ref<string>('email')
const pending = ref<boolean>(false)

const { login, verifyOtp } = useAuth()

async function onSubmit() {
  pending.value = true
  await login(email.value)
  pending.value = false
  stage.value = 'otp'
}

async function onOTPEntered() {
  pending.value = true
  const response = await verifyOtp(email.value, code.value)
  console.log('Response:', response)
  if (response.error) throw response.error
  pending.value = false
  navigateTo('/name')
}

</script>

<template>
  <section v-if="stage === 'email'">
    <h1 class="mb-8">Entrar</h1>
    <form
      class="grid gap-4"
      @submit.prevent="onSubmit">
      <label for="email">Correo electrónico</label>
      <input
        id="email"
        type="email"
        placeholder="Introduce tu correo"
        :disabled="pending"
        required
        v-model="email" />
      <Button
        type="submit"
        :pending="pending">
        Enviar
      </Button>
    </form>
  </section>
  <section v-else-if="stage === 'otp'">
    <h1 class="mb-4">Verificación de código</h1>
    <p class="mb-8">Introduce el código que te hemos enviado al correo.</p>
    <form
      class="grid gap-4"
      @submit.prevent="onOTPEntered">
      <label for="code">Código</label>
      <input
        type="text"
        placeholder="Introduce el código"
        :disabled="pending"
        required
        v-model="code" />
      <Button
        type="submit"
        :pending="pending">
        Verificar código
      </Button>
    </form>
  </section>
</template>
