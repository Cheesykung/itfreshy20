<template>
  <section class="w-full">
    <picture class="rand-container space-y-16 px-4 animate__animated animate__fadeIn" v-if="!dataSecret">
      <img
        src="@/assets/svg/CloseTres.svg"
        :class="loading ? 'animate-loading' : 'animate-bounce'"
        @click="getSmoke()"
      />
      <figure>
        <p
          class="uppercase text-2xl custom-txt"
          :class="loading ? 'animate-pulse' : ''"
        >
          <!-- {{ data.hint }} -->
          YOUR CAPTAIN IS READY!
        </p>
      </figure>
    </picture>
    <picture class="rand-container space-y-16 px-4 animate__animated animate__fadeIn" v-else>
      <img
        src="@/assets/svg/OpenTres.svg"
        class="animate-success animate__animated animate__fadeIn"
        id="success"
      />
      <div
        class="flex flex-col space-y-6 animate__animated animate__fadeIn"
        v-if="showHint"
        id="hint"
      >
        <h1 class="text-5xl text-complementary">HINT</h1>
        <figure class="maps-area">
          <p class="txt--col space-y-6">
            <span>{{ dataSecret.hinttext ? dataSecret.hinttext : 'Your Captain Doesn\'t Have Any Hint.' }}</span>
          </p>
        </figure>
      </div>
      <div
        class="flex flex-col space-y-6 animate__animated animate__fadeIn"
        v-if="showHint"
        id="contact"
      >
        <h1 class="text-5xl text-complementary">CONTACT</h1>
        <figure class="maps-area">
          <p class="txt--col space-y-6">
            <span>{{ dataSecret.socialfake ? dataSecret.socialfake : 'Your Captain Dosn\'t Have Any Social.' }}</span>
          </p>
        </figure>
      </div>
      <div
        class="flex flex-col space-y-6 animate__animated animate__fadeIn"
        v-if="error"
      >
        <h1 class="text-5xl text-complementary-treda">FAILED :(</h1>
        <figure class="maps-area maps--red">
          <p class="txt--col space-y-6 capitalize">
            <span>{{ error }}</span>
          </p>
        </figure>
      </div>
    </picture>
    <span id="blank_smoke" class="block w-100"></span>
  </section>
</template>
<script>
/* eslint-disable */
import Axios from "axios";
import API from "../../middleware/api/userApi";
import "animate.css";
import SmokeMachine from "@bijection/smoke";

export default {
  data() {
    return {
      dataSecret: null,
      loading: false,
      showHint: false,
      error: null
    };
  },
  methods: {
    getSmoke() {
      this.loading = true;
      this.getSecret();

      const canEl = document.getElementById("blank_smoke");
      var canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas");
      canEl.appendChild(canvas);

      let afterCanvas = document.getElementById("canvas");
      var ctx = afterCanvas.getContext("2d");
      afterCanvas.width = innerWidth;
      afterCanvas.height = innerHeight;
      afterCanvas.style = "position: fixed; top: 0; left: 0; z-index:-1;";

      var party = SmokeMachine(ctx, [255, 174, 54]);
      let vm = this;

      party.start(); // start animating
      party.setPreDrawCallback(function(dt) {
        party.addSmoke(innerWidth / 2, innerHeight / 2, 0.75);
        afterCanvas.width = innerWidth;
        afterCanvas.height = innerHeight;
      });

      onclick = function(e) {
        var x = e.clientX;
        var y = e.clientY;
        var n = 0.5;
        var t = Math.floor(Math.random() * 200) + 3800;
        party.addsmoke(x, y, n, t);
      };
    },
    getSecret() {
      this.$store
        .dispatch("user/getToken")
        .then(async res => {
          //Get Data
          const { data, status } = await Axios.get(API + "test/getsecert", {
            headers: {
              FIREBASE_AUTH_TOKEN: res
            }
          });

          if (status === 200 && data) {
            this.dataSecret = data;

            this.loading = false;

            setTimeout(() => {
              this.show();
            }, 4000)
            
          } else {
            this.error = "your captain has never been here."
          }
        })
        .catch(e => {
          throw e;
        });
    },
    show() {
      let closeToHint = document.getElementById("success");
      let smoke = document.getElementById("blank_smoke");
      let hint = document.getElementById("hint");
      let contact = document.getElementById("contact");

      if (!this.loading) {
        closeToHint.classList.remove("animate-success");
        closeToHint.classList.replace("animate__fadeIn", "animate__fadeOut");
        
        setTimeout(() => {
          smoke.classList = "animate__animated animate__fadeOut";

          setTimeout(() => {
            closeToHint.remove();
            smoke.remove();
            this.showHint = true;
          }, 1200);
        }, 1800);
      }
    }
  },
  mounted() {
  }
};
</script>
<style scoped>
.rand-container {
  z-index: 70;
  @apply relative flex flex-col justify-center items-center max-w-2xl mx-auto text-complementary;
}

p.custom-txt {
  text-shadow: 1.5px 1px 10px #ec920f;
}

.txt--col {
  @apply flex flex-col flex-wrap break-all justify-center items-center text-left uppercase text-lg px-4;
}

.rand-container img {
  user-select: none;
  -webkit-user-drag: none;
  cursor: pointer;
  -webkit-filter: drop-shadow(3px 3px 20px #ec920f);
  transition: all ease-in-out 1s;
  filter: drop-shadow(3px 3px 20px rgb(236, 146, 15));
  @apply object-cover max-w-xs w-full;
}

.rand-container img:hover {
  -webkit-filter: drop-shadow(4px 5px 30px rgb(236, 198, 139));
  filter: drop-shadow(4px 5px 30px #ecc68b);
}

.rand-container img.animate-success {
  animation: lights 2.1s infinite 50ms linear alternate;
}

.rand-container img.animate-loading {
  animation: loading 0.075s infinite 50ms linear alternate;
}

.maps-area {
  box-shadow: 1.5px 1px 10px #ec920f;
  flex: 1 1;
  @apply border-complementary border-4 border-solid py-6 px-3 max-w-full rounded-lg;
}

.maps--red {
  color: #ec0f69 !important;
  box-shadow: 1.5px 1px 10px #ec0f69 !important;
}

@keyframes loading {
  0% {
    transform: translate3d(3px, 5px, 7px);
  }
  25% {
    transform: translate3d(5px, 7px, 9px);
  }
  50% {
    transform: translate3d(7px, 9px, 11px);
  }
  75% {
    transform: translate3d(9px, 11px, 13px);
  }
  100% {
    transform: translate3d(11px, 13px, 15px);
  }
}

@keyframes lights {
  0% {
    -webkit-filter: drop-shadow(3px 3px 20px rgb(255, 174, 54));
    filter: drop-shadow(3px 3px 20px #ffae36);
    transform: translateY(0);
  }
  50% {
    -webkit-filter: drop-shadow(3.5px 4px 25px #f5bd6a);
    filter: drop-shadow(3.5px 4px 25px#f5bd6a);
    transform: translateY(-6px);
  }
  100% {
    -webkit-filter: drop-shadow(4px 5px 30px rgb(236, 198, 139));
    filter: drop-shadow(4px 5px 30px #ecc68b);
    transform: translateY(3px);
  }
}
</style>