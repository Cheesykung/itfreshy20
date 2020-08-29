<template>
  <div id="app">
    <Nav v-if="signInCheck && !$route.matched.some(({ path }) => path === '/continue')"/>
    <transition name="animated">
      <router-view />
    </transition>
    <!-- <Footer /> -->
  </div>
</template>
<script>
//import Footer from "@/components/util/Footer.vue";
import Nav from "@/components/util/Nav.vue";
import { mapGetters } from "vuex";

export default {
  name: 'IT HUNTER GAME',
  components: {
    //  Footer,
    Nav
  },
  computed: {
    ...mapGetters('user', ["signInCheck"])
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400&family=Roboto:wght@300;400;600&display=swap");

html, body {
  @apply h-full;
}

#app {
  font-family: Roboto, Helvetica, Arial, Prompt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  word-spacing: 1px;
  letter-spacing: .8px;
  color: #2c3e50;
  background-image: url("assets/images/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  background-color: rgba(23, 35, 59, 0.9);
  overflow: hidden;
  @apply min-h-full;
}

.main-wrap {
  background-image: linear-gradient(
    to top,
    rgba(11, 9, 49, 0.9) 45%,
    transparent 70%
  );
}

button:focus {
  outline: 0 !important;
}

::-webkit-scrollbar {
  width: .35rem;
}

::-webkit-scrollbar-track {
  @apply bg-primary-1000;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary-850 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-primary-700 ;
}

.lucky-font {
  font-family: "Luckiest Guy";
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

.alertify .ajs-dialog {
    top: 50%;
    transform: translateY(-50%);
    margin: auto;
}
</style>
