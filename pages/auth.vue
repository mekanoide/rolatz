<script setup lang="ts">
definePageMeta({
  layout: 'auth'
})
import useAuth from '@/composables/useAuth'
import { navigateTo } from 'nuxt/app'
import { ref, type Ref } from 'vue'
const supabase = useSupabaseClient()
const user = useSupabaseUser()

const email = ref<string>('')
const code = ref<string>('')
const name = ref<string>('')
const stage = ref<string>('email')
const pending = ref<boolean>(false)

const { login, verifyOtp, fetchUserProfile } = useAuth()

async function onSubmit() {
  pending.value = true
  await login(email.value)
  pending.value = false
  stage.value = 'otp'
}

async function onOTPEntered() {
  pending.value = true
  const { user } = await verifyOtp(email.value, code.value)
  if (!user) {
    pending.value = false
    return
  }
  console.log('Usuario verificado:', user.id)
  const hasUserName = await checkUserName(user.id)
  console.log('Tiene nombre de usuario:', hasUserName)
  pending.value = false
  if (hasUserName) {
    navigateTo('/')
  } else {
    navigateTo('/name')
  }
}

async function checkUserName(id: string): Promise<boolean> {
  const userProfile = await fetchUserProfile(id)
  if (userProfile && userProfile.name !== '') {
    return true
  }
  return false
}

async function onNameEntered() {
  pending.value = true
  try {
    supabase.from('users').upsert({ name: name.value }).eq('id', user.value?.id)
  } catch (error) {
    console.error(error)
  }
  navigateTo('/')
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
