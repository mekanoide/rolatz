<template>
  <div
    popover
    class="hidden z-10 flex-col p-0 bg-stone-900 rounded-md shadow-xl border border-stone-700"
    role="menu">
    <slot></slot>
  </div>
</template>

<style scoped>
:popover-open {
  @apply absolute grid;
  inset: unset;
}
</style>
