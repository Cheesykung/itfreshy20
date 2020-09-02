<template>
  <div id="app" v-lazy:background-image="bgObj">
    <Nav v-if="showNav" />
    <transition name="animated">
      <keep-alive max="5">
        <router-view :key="$route.fullPath" />
      </keep-alive>
    </transition>
    <div v-if="!online" @change="alertThis()"></div>
  </div>
</template>
<script>
//import Footer from "@/components/util/Footer.vue";
import Nav from "@/components/util/Nav.vue";
import alertify from "alertifyjs";

export default {
  data() {
    return {
      showNav: true,
      bgObj: {
        src: "/img/bg.jpg"
      },
      online: navigator.onLine,
      showOnline: false
    };
  },
  mounted() {
    window.addEventListener("online", this.updateNwStatus);
    window.addEventListener("offline", this.updateNwStatus);
  },
  beforeDestroy() {
    window.removeEventListener("online", this.updateNwStatus);
    window.removeEventListener("offline", this.updateNwStatus);
  },
  watch: {
    "$route.meta.hideNavigation": function(hideNavigation) {
      this.showNav = !hideNavigation;
    },
    online(v) {
      if (v) {
        this.showOnline = true;
        setTimeout(() => {
          this.showOnline = false;
        }, 1000);
      }
    }
  },
  methods: {
    setNav(status) {
      this.showNav = status;
    },
    updateNwStatus(e) {
      const { type } = e;
      this.online = type === "online";
    },
    alertThis() {
      return alertify.notify("ขาดการเชื่อมต่อ, Network Error", "error", 3);
    }
  },

  components: {
    Nav
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Luckiest+Guy&display=swap");
@import url("https://fonts.googleapis.com/css2?family=Prompt:wght@100;200;300;400&family=Roboto:wght@300;400;600&display=swap");

html,
body {
  @apply h-full;
}

#app {
  font-family: Helvetica, Arial, Prompt;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  word-spacing: 1px;
  letter-spacing: 0.8px;
  color: #2c3e50;
  background-repeat: no-repeat;
  background-position: center top;
  background: linear-gradient(270deg, #33deb2, #7295d3, #dc9b62);
  background-size: 600% 600%;
  -webkit-animation: bgTransition 3s ease infinite;
  -moz-animation: bgTransition 3s ease infinite;
  animation: bgTransition 3s ease infinite;
  overflow: hidden;
  @apply min-h-full;
}

#app[lazy="loading"] {
  background: linear-gradient(119deg, #79c3c3, #524cb6, #ec920f);
  background-size: 600% 600%;
  -webkit-animation: bgTransition 3s ease infinite;
  -o-animation: bgTransition 3s ease infinite;
  -moz-animation: bgTransition 3s ease infinite;
  animation: bgTransition 3s ease infinite;
}

#app[lazy="loaded"] {
  background-size: cover !important;
  animation: none !important;
}

@-webkit-keyframes bgTransition {
  0% {
    background-position: 97% 0%;
  }
  50% {
    background-position: 4% 100%;
  }
  100% {
    background-position: 97% 0%;
  }
}
@-moz-keyframes bgTransition {
  0% {
    background-position: 97% 0%;
  }
  50% {
    background-position: 4% 100%;
  }
  100% {
    background-position: 97% 0%;
  }
}
@-o-keyframes bgTransition {
  0% {
    background-position: 97% 0%;
  }
  50% {
    background-position: 4% 100%;
  }
  100% {
    background-position: 97% 0%;
  }
}
@keyframes bgTransition {
  0% {
    background-position: 97% 0%;
  }
  50% {
    background-position: 4% 100%;
  }
  100% {
    background-position: 97% 0%;
  }
}

.loading {
  font-size: 1.3rem;
  font-weight: 500;
  font-family: Kanit;
}

.loading:after {
  content: " .";
  animation: dots 1s steps(5, end) infinite;
}

@keyframes dots {
  0%,
  20% {
    color: rgba(23, 19, 98);
    text-shadow: 0.25em 0 0 rgba(23, 19, 98), 0.5em 0 0 rgba(23, 19, 98);
  }

  40% {
    color: #a8a5da;
    text-shadow: 0.25em 0 0 rgba(23, 19, 98), 0.5em 0 0 rgba(23, 19, 98);
  }

  60% {
    text-shadow: 0.25em 0 0 #a8a5da, 0.5em 0 0 rgba(23, 19, 98);
  }

  80%,
  100% {
    text-shadow: 0.25em 0 0 #a8a5da, 0.5em 0 0 #a8a5da;
  }
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
  width: 0.35rem;
}

::-webkit-scrollbar-track {
  @apply bg-primary-1000;
}

::-webkit-scrollbar-thumb {
  @apply bg-primary-850 rounded-full;
}

::-webkit-scrollbar-thumb:hover {
  @apply bg-primary-700;
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
