<template>
  <pageHFull>
    <template #headline>
      <span class="text-primary-250 font-semibold text-5xl">congrats!</span>
      <br />
      <span class="text-2xl">
        WELCOME
        <span
          :class="'text-' + gateInfo[0].color"
          class="font-semibold"
        >{{ getProfile.nickname }}</span>
      </span>
    </template>
    <template #body>
      <!--- Form area --->
      <formContain>
        <template #content>
          <div class="flex flex-col flex-wrap space-y-8">
            <span class="space-y-3 flex flex-col content-center justify-center items-center">
              <p class="text-2xl text-primary-250 font-normal">IT HUNTER GAME</p>
              <span class="text-xs text-primary-300 font-thin">X</span>
              <h4 class="text-4xl md:text-5xl font-semibold" :class="'text-' + gateInfo[0].color">
                Gate
                <span class="text-primary-200">ที่คุณได้</span>
              </h4>
            </span>

            <span
              v-lazy-container="{ selector: 'img' }"
              class="img flex flex-col content-center justify-center items-center px-4 sm:px-0 py-5 sm:py-10"
            >
              <img
                :data-src="gateInfo[0].src"
                :alt="getProfile.gate"
                class="object-cover w-56 animate-pulse"
              />
            </span>

          </div>
            <span class="flex flex-col content-center justify-center items-center">
              <span
                :class="'text-' + gateInfo[0].color"
                class="text-4xl md:text-5xl md:text-5xl font-bold"
              >{{ gateInfo[0].name }}</span>
            </span>
          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              :class="'bg-' + gateInfo[0].color"
              class="btn hover:bg-opacity-75 text-primary-100 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              @click="submit()"
            >Finish</button>
            <span class="flex flex-row flex-no-wrap space-x-3 animate-bounce">
              <span class="bullet" :class="'bg-' + gateInfo[0].color"></span>
              <span class="bullet" :class="'bg-' + gateInfo[0].color"></span>
              <span class="bullet" :class="'bg-' + gateInfo[0].color"></span>
            </span>
          </div>
        </template>
      </formContain>
      <!--- End of form area --->
    </template>
  </pageHFull>
</template>h
<script>
import { mapGetters } from "vuex";
import store from "../../../store";
import gate from "../../../store/modules/gateModule";

export default {
  components: {
    pageHFull: () => import("../../util/pageHFull"),
    formContain: () => import("../../util/formContainer")
  },
  data() {
    return {
      gateInfo: null
    };
  },
  beforeRouteEnter(to, from, next) {
    if (store.getters["register/getYear"] !== 1) {
      next({ path: "/profile" });
    } else {
      next();
    }
  },
  mounted() {
    this.gatePic();
    localStorage.setItem("firstTime", "false");
  },
  methods: {
    submit() {
      this.$router.replace({ path: "/profile" });
    },
    gatePic() {
      this.gateInfo = gate.filter(item => {
        return item.name === store.getters["user/getGate"];
      });
    }
  },
  computed: {
    ...mapGetters("user", ["getProfile", "getGate"])
  }
};
</script>
<style scoped>
.img {
  flex: 0 1;
}

</style>