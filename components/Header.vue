<template>
  <header
    class="sticky top-0 w-full flex items-center justify-between z-20 p-2">
    <div>
      <slot></slot>
    </div>
    <MenuAccount />
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
