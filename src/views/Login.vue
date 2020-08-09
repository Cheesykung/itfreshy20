<template>
  <section class="w-screen h-screen relative" v-if="!signInCheck">
    <div
      class="grid lg:grid-flow-col grid-flow-row grid-cols-4 gap-12 py-16 container mx-auto"
    >
      <div
        class="rounded-lg row-start-4 col-start-2 col-end-4 bg-gray-900 opacity-75 px-8 md:px-12 py-16  text-2xl md:text-6xl"
      >
        <h1 class="lucky-font text-green_blue-300">SIGN IN</h1>
        <span class="flex justify-center space-x-6 px-8 py-12">
          <button class="fb-btn hover:opacity-75 focus:outline-none">SIGN IN WITH FACEBOOK</button>
        </span>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getProfile", "getUser", "signInCheck"])
  }
};
</script>
<style scoped>
.fb-btn {
  @apply bg-blue-700 block px-10 py-5 text-sm  font-semibold text-blue-100 rounded-full;
}
</style>