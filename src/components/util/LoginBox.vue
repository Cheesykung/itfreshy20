<template>
  <div class="grid lg:grid-flow-col grid-flow-row-dense grid-cols-4 gap-12 container">
    <div
      class="flex content-center justify-center flex-col col-start-1 col-end-5 bg-primary-1100 bg-opacity-75 xl:mx-16 py-16 space-y-24"
    >
      <h1 class="lucky-font text-primary-100 text-6xl">SIGN IN</h1>
      <span class="flex justify-center space-x-6 px-2 md:px-4 lg:px-6">
        <button
          class="fb-btn shadow-outline bg-primary-500 hover:bg-transparent hover:shadow-outline focus:outline-none text-xs px-8 md:px-12 lg:text-sm"
          @click="loginSubmit"
        >SIGN IN WITH FACEBOOK</button>
      </span>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    loginSubmit() {
      return window.open("/auth/facebook", "_self");
    }
  }
};
</script>
<style scoped>
.fb-btn {
  @apply block py-5 font-semibold text-primary-200 rounded-full transition-all duration-150 ease-linear animate-pulse;
}
.shadow-outline, .shadow-outline:hover, .hover\:shadow-outline:hover {
  box-shadow: 0 0 0 3px rgba(60,54,173, .65) !important;
}
</style>