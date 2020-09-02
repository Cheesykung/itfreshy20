<template>
  <pageHFull>
    <template #headline>
      <span class="text-primary-250 font-semibold text-5xl">congrats!</span>
      <br />
      <span class="text-2xl">
        WELCOME
        <span class="text-primary-500 font-semibold">{{ getProfile.fname }}</span>
      </span>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <div class="flex flex-col flex-wrap space-y-8">
            <span class="space-y-3 flex flex-col content-center justify-center items-center">
              <p class="text-xl md:text-2xl text-primary-250 font-normal">IT HUNTER GAME</p>
              <span class="text-xs text-primary-300 font-thin">X</span>
              <h4 class="text-4xl md:text-5xl text-secondary_b font-semibold">Gate ที่คุณได้</h4>
            </span>
            <span
              class="flex flex-col content-center justify-center items-center bg-primary-1100 bg-opacity-75 h-64"
            ></span>
            <span class="flex flex-col content-center justify-center items-center">
              <span class="text-4xl md:text-5xl text-secondary_b font-bold animate-pulse">{{ getProfile.gate }}</span>
            </span>
          </div>
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              class="btn bg-primary-500 hover:bg-opacity-75 text-primary-200 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              @click="submit()"
            >Finish
            </button>
            <span
              class="flex flex-row flex-no-wrap space-x-3 animate-bounce"
            >
              <span class="bullet"></span>
              <span class="bullet"></span>
              <span class="bullet"></span>
            </span>
          </div>
        </template>
      </formContain>
      <!--- End of form area --->
    </template>
  </pageHFull>
</template>
<script>
import { mapGetters } from "vuex";
import store from "../../../store";

export default {
  components: {
    pageHFull: () => import("../../util/pageHFull"),
    formContain: () => import("../../util/formContainer")
  },
  data() {
    return {};
  },
  beforeRouteEnter(to, from, next) {
    if(store.getters["register/getYear"] !== 1) {
      next({ path: '/profile' })
    } else {
      next();
    }
   },
  methods: {
    submit() {
      localStorage.setItem("firstTime", "false");
      this.$router.replace({ path: "/profile" });
    }
  },
  computed: {
    ...mapGetters("user", ["getProfile"])
  }
};
</script>
