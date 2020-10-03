<template>
  <section class="w-full">
    <picture
      class="rand-container space-y-16 px-4 animate__animated animate__fadeIn"
      v-if="!dataSecret"
    >
      <img
        src="@/assets/svg/CloseTres.svg"
        :class="loading ? 'animate-loading' : 'animate-bounce'"
        id="img"
        @click="getSmoke()"
      />
      <figure>
        <p
          class="uppercase text-2xl"
          :class="
            loading
              ? 'animate-pulse custom-txt'
              : isErr
              ? 'text-complementary-treda'
              : 'custom-txt'
          "
        >
          {{
            isErr
              ? error
              : loading
              ? "YOUR CAPTAIN IS ON THE WAY.."
              : "YOUR CAPTAIN IS READY!"
          }}
        </p>
      </figure>
    </picture>
    <picture
      class="rand-container space-y-16 px-4 animate__animated animate__fadeIn"
      v-else
    >
      <img
        src="@/assets/svg/OpenTres.svg"
        class="animate-success animate__animated animate__fadeIn"
        id="success"
      />
      <h1
        :class="caption ? 'animate__fadeIn' : 'animate__fadeOut'"
        class="text-complementary my-2 text-5xl animate__animated"
        v-if="caption && showHint"
        id="caption"
      >
        <span class="text-lg block">YOUR</span>
        CAPTAIN
        <span class="text-lg block">IS..</span>
      </h1>
      <div
        class="flex flex-col space-y-6 animate__animated animate__fadeIn"
        v-if="showHint && !caption"
        id="hint"
      >
        <figure class="maps-area space-y-6">
          <div class="txt--col space-y-6">
            <h1 class="font-thin">{{ showFamilyName }}</h1>
            <div class="fb space-x-3">
              <i class="fab fa-facebook text-3xl custom-txt" />
              <span class="text-lg text-primary-100">{{ familySocial }}</span>
            </div>
          </div>
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
      error: null,
      isErr: false,
      caption: false
    };
  },
  methods: {
    getSmoke() {
      this.loading = true;
      this.getSecret();

      const canEl = document.getElementById("blank_smoke");
      var canvas = document.createElement("canvas");
      canvas.setAttribute("id", "canvas");

      canEl.insertBefore(canvas, canEl.lastElementChild);

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
            }, 4000);
          } else {
            this.error = "your captain has never been here.";
            this.loading = false;

            setTimeout(() => {
              this.show();
            }, 4000);
          }
        })
        .catch(e => {
          this.error = "Lost Connection With Your Captain, Please Try Again.";
          this.loading = false;

          setTimeout(() => {
            this.show();
          }, 4000);
          throw e;
        });
    },
    show() {
      var closeToHint = document.getElementById("success");
      var smoke = document.getElementById("blank_smoke");
      let hint = document.getElementById("hint");
      let contact = document.getElementById("contact");
      var error = document.getElementById("error");
      let img = document.getElementById("img");
      let caption = document.getElementById("caption");

      if (!this.loading && this.error) {
        img.classList = "animate__animated animate__fadeOut";
        setTimeout(() => {
          img.remove();
          smoke.classList = "animate__animated animate__fadeOut";
          setTimeout(() => {
            smoke.remove();

            this.isErr = true;
          }, 1200);
        }, 1800);
      } else if (!this.loading && !this.isErr) {
        closeToHint.classList.remove("animate-success");
        closeToHint.classList.replace("animate__fadeIn", "animate__fadeOut");

        setTimeout(() => {
          smoke.classList = "animate__animated animate__fadeOut";
          this.caption = true;
          setTimeout(() => {
            closeToHint.remove();
            smoke.remove();
            this.showHint = true;

            setTimeout(() => {
              this.caption = false;
            }, 1500);
          }, 900);
        }, 1500);
      }
    }
  },
  computed: {
    showFamilyName() {
      let familyName = "No Captain's Name.";

      if (this.dataSecret.familyFname && this.dataSecret.familySurname) {
        familyName =
          this.dataSecret.familyFname + " " + this.dataSecret.familySurname;
      }

      return familyName;
    },
    familySocial() {
      return this.dataSecret.familyFB
        ? this.dataSecret.familyFB
        : "Your Catain is not Have a Facebook.";
    }
  },
  mounted() {}
};
</script>
<style scoped>
.rand-container {
  z-index: 70;
  @apply relative flex flex-col justify-center items-center max-w-2xl mx-auto text-complementary;
}

.custom-txt {
  text-shadow: 1.5px 1px 10px #ec920f;
}

.txt--col {
  overflow-wrap: normal;
  word-break: break-word;
  @apply flex flex-col flex-wrap justify-center items-start text-left uppercase px-4;
  font-size: 2.5em;
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

.question-mark {
  @apply text-4xl text-complementary flex justify-center self-center items-center w-32 h-32 rounded-full bg-primary-1000 bg-opacity-75;
}

.fb {
  @apply flex flex-row flex-no-wrap justify-start items-center break-all font-normal;
}

.maps-area {
  /* box-shadow: 1.5px 1px 10px #ec920f; border-complementary border-4 border-solid*/
  flex: 1 1;
  font-family: "Prompt", "Righteous";
  @apply py-6 px-3 max-w-full rounded-lg;
}

.maps--red {
  border-color: rgb(236, 15, 105) !important;
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