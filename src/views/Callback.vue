<template>
  <transition name="animated-form">
    <router-view></router-view> 
  </transition>
</template>
<style scoped>
.animated-form-enter-active {
  transition: all 0.3s ease;
}
.animated-form-leave-active {
  transition: all 0.8s cubic-bezier(0.77, 0, 0.175, 1);
}
.animated-form-enter,
.animated-form-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.bg-wrap {
  background-image: linear-gradient(
    to top,
    rgba(23, 35, 59, 0.9) 45%,
    transparent 70%
  );
}


* >>> .bullet {
  @apply w-2 h-2 bg-primary-700 block rounded-full;
}

* >>> .bullet.active {
  @apply bg-primary-500;
}

* >>> ::placeholder {
  @apply text-primary-400 opacity-75 text-sm;
}

</style>