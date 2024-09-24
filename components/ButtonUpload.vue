<script setup lang="ts">
const supabase = useSupabaseClient()
const uuid = useId()

const props = defineProps<{
  pending?: boolean
  label: string
  id: string
}>()

const emit = defineEmits<{
  (e: 'uploaded', path: string): void
}>()

async function onUpload(event: Event) {
  const file = (event.target as HTMLInputElement).files?.[0]
  if (!file) return
  console.log('file', file)
  const extension = file.name.split('.').pop()
  const uniqueName = `${uuid}.${extension}`
  const { data, error } = await supabase.storage.from('profile_images').upload(`public/${uniqueName}`, file)
  if (error) throw error
  if (!data || !data.fullPath) return
  console.log(data)
  emit('uploaded', data.fullPath)
}
</script>

<template>
  <div>
    <input
      :id="id"
      type="file"
      hidden @change="onUpload" />
    <label
      :aria-label="label"
      :for="id"
      class="text-stone-400 cursor-pointer hover:text-stone-100 border p-2 rounded-full border-current grid place-content-center"
      ><slot></slot>
    </label>
  </div>
</template>
