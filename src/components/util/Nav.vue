<template>
  <nav class="flex flex-row justify-between content-center items-center w-screen py-8 px-6 md:px-12 bg-dark text-gray-200"
        v-if="$route.matched.some(({ path }) => path !== '/signin' && path !== '/continue')">
    <div class="flex flex-row justify-center items-center text-2xl">
    <i class="fas fa-bars text-gray-300"></i>
    </div>
    <div class="self-center flex-1 -mr-16 -ml-6 sm:-ml-2 text-3xl sm:text-4xl font-normal uppercase text-gray-300 lucky-font">
      {{ this.$route.name }}
    </div>
    <div class="flex flex-row justify-center items-center space-x-8 text-2xl">
      <i class="fas fa-user-alt text-gray-300 hidden md:block"></i>
      <i class="fas fa-cog text-gray-300"></i>
    </div>
  </nav>
</template>