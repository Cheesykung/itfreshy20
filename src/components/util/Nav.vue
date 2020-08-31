<template>
  <section
    v-if="$route.matched.some(({ path }) => path !== '/signin' && path !== '/continue')"
    class="relative"
  >
    <nav
      class="flex flex-row justify-between content-center items-center w-screen py-8 px-6 md:px-12 bg-dark text-gray-200"
    >
      <div class="flex flex-row justify-center items-center text-2xl">
        <div @click="hidden = false" :class="hidden === true ? 'block' : 'hidden'">
          <i
            class="fas fa-bars text-gray-300 basic-icon ease delay-50 duration-200 hover:scale-125"
            
          ></i>
        </div>
      </div>
      <div
        class="self-center flex-1 mx-auto md:ml-16 text-3xl sm:text-4xl font-normal uppercase text-gray-300 lucky-font"
      >{{ this.$route.name }}</div>
      <div class="flex flex-row justify-center items-center md:space-x-8 text-2xl">
        <div @click="goProfile()">
          <i
            class="fas fa-user-alt basic-icon hidden md:block ease delay-50 duration-200 hover:scale-125"
          ></i>
        </div>
        <div>
          <i
            class="fas fa-cog basic-icon ease delay-50 duration-200 hover:scale-125 hover:rotate-90"
          ></i>
        </div>
      </div>
    </nav>
    <aside class="nav-content transition-all duration-200 delay-75 ease-linear transform" :class="hidden ? 'hidden' : 'flex'">
      <span @click="hidden = true" class="cursor-pointer basic-icon ease delay-50 duration-200 hover:scale-125 hover:rotate-90">&times;</span>
      <ul>
        <li v-for="(item, i) in navLinks" :key="i" class="capitalize">
          <router-link :to="item.link">{{ item.name }}</router-link>
        </li>
        <li @click="signOut">
          Sign out
        </li>
      </ul>
    </aside>
  </section>
</template>
<style scoped>
.basic-icon {
  @apply text-gray-300 cursor-pointer transition-all transform;
}
</style>
<script>
import { mapActions } from "vuex"

export default {
  data() {
    return {
      hidden: true,
      navLinks: [
        { name: "Dashboard", link: "/dashboard", icon: "" },
        { name: "Profile", link: "/profile", icon: "" },
        { name: "Bounty", link: "/bounty", icon: "" },
        { name: "Hunted", link: "/Hunted", icon: "" },
        { name: "Leaderboard", link: "/leaderboard", icon: "" }
      ]
    };
  },
  methods: {
    ...mapActions("user", ["signOut"]),
    goProfile() {
      return this.$route.path !== "/profile"
        ? this.$router.push({ path: "/profile" })
        : this.$router.go();
    }
  }
};
</script>
<style scoped>
.nav-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  max-width: 350px;
  min-height: 100vh;
  max-height: 100%;
  z-index: 99999999;
  @apply bg-primary-1100 bg-opacity-100 py-6 px-6 text-primary-250 flex-col justify-start content-center items-stretch;
}

.nav-content span {
  @apply text-5xl self-start px-6;
}

.nav-content ul {
  flex: 1 1 100%;
  @apply flex flex-col justify-start content-center items-center px-6;
}

.nav-content ul li {
  flex: 0;
  width: 100%;
  @apply py-4 px-6 text-lg cursor-pointer;
}

.nav-content ul li:hover {
  @apply text-secondary_a;
}
</style>