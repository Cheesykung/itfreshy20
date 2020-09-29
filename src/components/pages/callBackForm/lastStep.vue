<template>
  <pageHFull>
    <template #headline>
      <span class="text-primary-250 font-semibold text-5xl">congrats!</span>
      <br />
      <span class="text-2xl">
        WELCOME
        <span
          v-bind:style="{ color: gateInfo.rgb }"
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
              <h4 class="text-4xl md:text-5xl font-semibold" v-bind:style="{ color: gateInfo.rgb }">
                Gate
                <span class="text-primary-200">ที่คุณได้</span>
              </h4>
            </span>

            <span
              v-lazy-container="{ selector: 'img' }"
              class="relative img flex flex-col content-center justify-center items-center px-4 sm:px-0 py-5 sm:py-8"
            >
              <img
                :data-src="gatePic[0].src"
                :alt="getProfile.gate"
                class="object-cover w-56 animate-pulse img-gate"
              />
            </span>
            <span class="flex flex-col content-center justify-center items-center">
              <span
                v-bind:style="{ color: gateInfo.rgb }"
                class="text-4xl md:text-5xl md:text-5xl space-x-4 font-bold animate-pulse flex flex-row justify-center items-center"
              >
                <span>{{ gateInfo.name }}</span>
              </span>
            </span>
          </div>

          <div class="flex flex-col items-center justify-center space-y-10 text-gray-400 px-4">
            <button
              type="submit"
              v-bind:style="{ backgroundColor: gateInfo.rgb }"
              class="btn hover:bg-opacity-75 text-primary-100 px-12 py-3 md:px-12 md:py-4 capitalize font-medium text-sm rounded-md flex items-center"
              @click="submit()"
            >Finish</button>
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
import pageHFull from "../../util/pageHFull";
import formContain from "../../util/formContainer";

export default {
  components: {
    pageHFull,
    formContain
  },
  data() {
    return {
      gateInfo: '',
      color: ''
    };
  },
  beforeRouteEnter(to, from, next) {
    
    if (store.getters["register/getYear"] !== 1) {
      next({ path: "/profile" });
    } else {
      next();
    }
 
  },
  async mounted() {
    await this.$nextTick(function () {
      this.gateInfo = this.gatePic[0]
      this.color = this.gatePic[0].color
    })
    
    localStorage.setItem("firstTime", "false");
  },
  beforeUpdate() {
    store.dispatch("user/sendToken");
  },
  methods: {
    submit() {
     // store.dispatch("user/sendToken");
      this.$router.go({ path: "/profile", params: {redirect: true} });
    },
    tryGate() {
      return gate.filter(item => {
        return item.name === store.getters["register/getGate"];
      });
    },
    textColor: async function() {
      let thisColor = this.gatePic[0].rgb;
      return {color: thisColor}
    },
    bgcolor: async function() {
      let thisColor = this.gatePic[0].rgb;
      return {backgroundColor: thisColor}

    }
  },
  computed: {
    ...mapGetters("register", ["getProfile", "getGate"]),
    gatePic() {
      return gate.filter(item => {
        return item.name === this.getGate;
      });
    },
    colorInfo: function() {
      return this.gatePic[0].color;
    }
  }
};
</script>
<style scoped>
.img {
  flex: 0 1;
}

.img-gate {
  -webkit-animation: spin 3s ease-in-out infinite alternate;
  -moz-animation: spin 3s ease-in-out infinite alternate;
  animation: spin 3s ease-in-out infinite alternate;
}

@-moz-keyframes spin {
  0% {
    -moz-transform: rotate(-30deg);
  }
  50% {
    -moz-transform: rotate(0deg) translate(0.5rem, 1.5rem);
  }
  100% {
    -moz-transform: rotate(30deg);
  }
}
@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(-30deg);
  }
  50% {
    -webkit-transform: rotate(0deg) translate(0.5rem, 1.5rem);
  }
  100% {
    -webkit-transform: rotate(30deg);
  }
}
@keyframes spin {
  0% {
    -webkit-transform: rotate(-30deg);
  }
  50% {
    -webkit-transform: rotate(0deg) translate(0.5rem, 1.5rem);
  }
  100% {
    -webkit-transform: rotate(30deg);
    transform: rotate(30deg);
  }
}
</style>