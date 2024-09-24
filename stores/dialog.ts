import { defineStore } from 'pinia'

export const useDialogStore = defineStore('dialog', () => {
  const isOpen = ref<boolean>(false)
  const title = ref<string>('Confirmar')
  const message = ref<string>('¿Seguro que quieres hacer esto?')
  const confirmText = ref<string>('Confirmar')
  const cancelText = ref<string>('Cancelar')
  const resolve = ref<any>()

  function open(msg: string): Promise<boolean> {
    message.value = msg
    isOpen.value = true
    return new Promise<boolean>((rslv) => {
      resolve.value = rslv
    })
  }

  function confirm() {
    close()
    resolve.value(true)
  }

  function cancel() {
    close()
    resolve.value(false)
  }

  function close() {
    isOpen.value = false
  }

  return {
    isOpen,
    title,
    message,
    confirmText,
    cancelText,
    resolve,
    open,
    confirm,
    cancel
  }
})
