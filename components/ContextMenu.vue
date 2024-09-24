<script setup lang="ts">
const id = useId()
</script>

<template>
  <div class="relative">
    <button
      type="button"
      class="p-2 grid text-stone-400 hover:text-stone-100"
      @click.stop=""
      :style="`anchor-name: --anchor-${id}`"
      :popovertarget="id">
      <Icon name="mdi:dots-horizontal" />
    </button>
    <Dropdown
      :id="id"
      :style="`right: anchor(--anchor-${id} right); top: anchor(--anchor-${id} bottom)`">
      <slot></slot>
    </Dropdown>
  </div>
</template>
