<template>
  <div class="grid grid-flow-col gap-1 place-content-center h-6">
    <span class="bg-current w-1 h-1 rounded-full" v-for="i in 3"></span>
  </div>
</template>

<style scoped>
span {
  animation: bounce 600ms infinite alternate ease-out;
}

span:nth-child(2) {
  animation-delay: 200ms;
}

span:nth-child(3) {
  animation-delay: 400ms;
}

@keyframes bounce {
  0% {
    translate: 0rem 0.125rem;
  }
  50% {
    translate: 0 0;
    opacity: 0.5;
  }
  100% {
    translate: 0rem -0.125rem;
  }
}
</style>