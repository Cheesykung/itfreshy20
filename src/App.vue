<template>
  <div id="app">
    <nav></nav>
    <transition name="animated">
      <router-view />
    </transition>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.animated-enter-active {
  transition: all 0.3s ease;
}
.animated-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.animated-enter,
.animated-leave-to {
  transform: translateX(10px);
  opacity: 0;
}
</style>
