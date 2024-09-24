<script setup lang="ts">
type ConfirmationProps = {
  title?: string
  message?: string
  confirmText?: string
  cancelText?: string
}

const props = withDefaults(defineProps<ConfirmationProps>(), {
  title: 'Confirmación',
  message: '¿Seguro que quieres hacer esto?',
  confirmText: 'Confirmar',
  cancelText: 'Cancelar'
})

function onClose(): void {}

function onConfirm(): void {}
</script>

<template>
  <dialog popover>
    <h1>HEY</h1>
    <button @click="onClose">Close</button>
    <button @click="onConfirm">Confirm</button>
  </dialog>
</template>
