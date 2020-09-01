<template>
  <div class="grid lg:grid-flow-col grid-flow-row-dense grid-cols-4 gap-12 container">
    <div
      class="flex content-center justify-center flex-col col-start-1 col-end-5 bg-primary-1100 bg-opacity-75 xl:mx-16 py-16 space-y-16"
    >
      <div
        class="flex flex-col self-center justify-center content-center items-center space-y-8"
        v-lazy-container="{ selector: 'img' }"
      >
        <img data-src="/img/logo.png" alt="IT HUNTER GAME" class="object-cover w-48" />
        <h1 class="lucky-font text-primary-100 text-6xl">SIGN IN</h1>
      </div>
      <span class="flex justify-center space-x-6 px-2 md:px-4 lg:px-6">
        <button
          v-if="!loading"
          class="fb-btn shadow-outline bg-primary-500 hover:bg-transparent hover:scale-105 transform transition-all ease-linear delay-75 hover:shadow-outline focus:outline-none text-xs px-8 md:px-12 lg:text-sm"
          @click="loginSubmit"
          :disabled="isClick"
        >SIGN IN WITH FACEBOOK</button>
        <span class="loading" v-if="loading"></span>
      </span>
    </div>
  </div>
</template>
<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  data() {
    return {
      isClick: false,
      loading: false
    };
  },
  methods: {
    loginSubmit() {
      this.isClick = true;
      this.$store
        .dispatch("user/signInWithFB")
        .then(res => {
          if (res) {
            this.loading = true;
          }
        })
        .catch(e => console.log(e));
    }
  },
  beforeRouteEnter(to, from, next) {
    this.$router.go();
    if (
      firebase.auth().currentUser &&
      localStorage.getItem("firstTime") === "true" &&
      !to.matched.some(({ path }) => path === "/continue")
    ) {
      next({ path: "/continue", query: to.path, replace: true });
    } else {
      next();
    }
  }
};
</script>
<style scoped>
.fb-btn {
  @apply block py-5 font-semibold text-primary-200 rounded-full transition-all duration-150 ease-linear animate-pulse;
}
.shadow-outline,
.shadow-outline:hover,
.hover\:shadow-outline:hover {
  box-shadow: 0 0 0 3px rgba(60, 54, 173, 0.65) !important;
}
</style>