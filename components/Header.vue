<template>
  <header
    class="fixed top-0 w-full flex items-center justify-between z-20 py-2 px-4">
    <div>
      <slot></slot>
    </div>
    <MenuSettings />
  </header>
</template>

<style scoped>
header {
  background: linear-gradient(
    to bottom,
    theme('colors.stone.950') 0,
    transparent 100%
  );
  animation: background-color linear forwards;
  animation-timeline: scroll();
  animation-range-end: 33%;
}

@keyframes background-color {
  to {
    @apply bg-stone-950 bg-opacity-60;
    backdrop-filter: blur(0.5rem);
  }
}
</style>
