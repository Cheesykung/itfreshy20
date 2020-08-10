<template>
  <div id="app">
    <Nav v-if="signInCheck" />
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
  components: {
    //  Footer,
    Nav
  },
  computed: {
    ...mapGetters(["signInCheck"])
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400&family=Roboto:wght@300;400&display=swap");

html, body {
  @apply h-full;
}

#app {
  font-family: Roboto, Helvetica, Arial, Prompt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  word-spacing: 1px;
  color: #2c3e50;
  background-image: url("assets/images/bg.jpg");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center top;
  overflow: hidden;
  @apply h-full;
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
</style>
