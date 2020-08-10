<template>
  <div class="grid lg:grid-flow-col grid-flow-row-dense grid-cols-4 gap-12 container">
    <div
      class="flex content-center justify-center flex-col md:rounded-sm md:col-start-2 md:col-end-4 col-start-1 col-end-5 bg-gray-900 opacity-75 xl:mx-16 py-16"
    >
      <h1 class="lucky-font text-green_blue-300 text-6xl">SIGN IN</h1>
      <span class="flex justify-center space-x-6 px-2 md:px-4 lg:px-6 md:py-16 py-12">
        <button
          class="fb-btn bg-blue-600 opacity-100 hover:bg-transparent hover:shadow-outline shadow-outline focus:outline-none text-xs px-6 md:px-10 lg:text-sm"
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
      // return this.$router.push("/profile");
      return window.open("http://localhost:5000/auth/facebook", "_self");
    }
  }
};
</script>
<style scoped>
.fb-btn {
  @apply block py-5 font-semibold text-blue-100 rounded-full transition-all duration-150 ease-linear animate-pulse;
}
</style>