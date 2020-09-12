<template>
  <section class="w-screen min-h-screen profile-wrap">
    <div class="flex flex-col content-center justify-center items-center h-full py-12">
      <div class="profile container grid-cols-1 gap-10 self-center">
        <div class="img-wrap space-y-4" v-lazy-container="{ selector: 'img' }">
          <img
            :data-src="getProfile.photoURL? getProfile.photoURL + '?width=500' : getProfile.pic + '?width=500'"
            class="profile-pic object-cover h-32 w-32 md:h-40 md:w-40 rounded-full self-center"
          />
          <div class="details space-y-2 items-center">
            <h1
              class="text-3xl text-primary-100 font-thin"
            >{{ getProfile.displayName ? getProfile.displayName : getProfile.name }}</h1>
          </div>
          <div class="faculty space-x-2 font-normal uppercase">
            <i class="fas fa-map-marked-alt"></i>
            <span>IT KMITL{{ getProfile.branch ? ", " + getProfile.branch : '' }}{{ getProfile.year ? " ปี " + getProfile.year : '' }}</span>
          </div>
          <div class="like space-x-4">
            <i
              class="fas fa-pizza-slice text-gray-400"
              v-if="getProfile.gate === '' && getProfile.year !== '1'"
            ></i>
            <i
              class="fas fa-football-ball text-gray-400"
              v-if="getProfile.gate === '' && getProfile.year !== '1'"
            ></i>
            <i
              class="fab fa-spotify text-gray-400"
              v-if="getProfile.gate === '' && getProfile.year !== '1'"
            ></i>
            <i
              class="fas fa-film text-gray-400"
              v-if="getProfile.gate === '' && getProfile.year !== '1'"
            ></i>
            <span
              v-lazyload="{ selector: 'img' }"
              v-if="getProfile.gate !== '' || getProfile.year === '1'"
              class="flex flex-row space-x-2 justify-center items-center content-center text-primary-200"
            >
              <img class="object-cover w-full" :data-src="image" v-if="image !== null" />
              <ion-icon name="skull-outline" v-else></ion-icon>
              <p class="capitalize">{{ getProfile.status }}</p>
            </span>
          </div>
        </div>
        <!--- Profile Stats --->
        <div class="stats items-stretch">
          <div class="chased flex flex-col space-y-2 justify-center content-center">
            <span
              class="text-2xl font-semibold text-gray-200"
            >{{ getProfile.count ? getProfile.count : 0 }}</span>
            <span class="text-sm font-normal text-gray-400">รุ่น{{ getProfile.year === '1' ? 'พี่' : 'น้อง'  }}ที่ล่าไปแล้ว</span>
          </div>
          <div class="un-chased flex flex-col space-y-2 justify-center content-center">
            <span
              class="text-2xl font-semibold text-gray-200"
            >{{ getProfile.year === 1 ? getProfile.count ? Math.abs(148 - getProfile.count) : 148 : getProfile.count ? Math.abs(251 - getProfile.count) : 251 }}</span>
            <span class="text-sm font-normal text-gray-400">รุ่น{{ getProfile.year === '1' ? 'พี่' : 'น้อง'  }}ที่ยังไม่ได้ล่า</span>
          </div>
        </div>
        <!--- Profile button --->
        <div class="button-gp space-x-4 md:space-x-6 lg:space-x-8 py-6">
          <!-- <button
            class="px-2 py-3 bg-primary-600 text-primary-200 rounded text-sm animate-pulse"
            @click="!loading ? Bounty() : null"
          >ล่ารายชื่อเลย!</button>
          <button
            class="px-2 py-3 bg-primary-850 text-primary-200 rounded text-sm"
            @click="genQr()"
          >
            <span :class="loading ? 'loading text-sm' : ''">{{ !loading? 'สร้างลิงค์ใหม่' : ''}}</span>
          </button> -->

          <h3 class="text-2xl animate-pulse text-primary-200 font-semibold">เตรียมออกล่าเร็วๆนี้!</h3>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
/* eslint-disable */
import { mapGetters } from "vuex";
import axios from "axios";
import alertify from "alertifyjs";
import gate from "../store/modules/gateModule";
import firebase from "firebase/app";
import "firebase/auth";
import store from "../store";
import QRCode from "qrcode";

var vm = this;

export default {
  components: {
  },
  data() {
    return {
      image: null,
      loading: false,
      qr: new Array(1),
    };
  },
  beforeUpdate() {
    if (this.getYear === "1") this.image = this.gatePic[0].smallImg;
  },
  methods: {
    Bounty() {
      this.$router.push({ path: "/bounty" });
    },
    copyTxt: function(e) {
      if (e) {
        e.target.select();
        e.target.setSelectionRange(0, 99999);
        document.execCommand("copy");
        alertify.success("Copied!");
      }
    },
    genQr: function() {
      this.loading = true;
      try {
        firebase
          .auth()
          .currentUser.getIdToken(/* forceRefresh */ true)
          .then(idToken => {
            axios
              .get(
                "https://us-central1-itfreshy2020.cloudfunctions.net/test/genqrcode/",
                {
                  withCredentials: true,
                  headers: {
                    FIREBASE_AUTH_TOKEN: idToken
                  }
                }
              )
              .then(setQr => {
                if (setQr.status === 200) {
                  let data = setQr.data;
                  let url = new URL(data.qrcode);
                  let newUrl = url.pathname
                    .toString()
                    .substring(url.pathname.lastIndexOf("qrcode"));
                  newUrl = newUrl.replace("qrcode/", "scan/");
                  newUrl = new URL("https://localhost:8080/" + newUrl);

                  alertify
                    .alert(
                      '<div id="qr-code" class="flex flex-col space-y-6 content-center items-center py-6">\
                      <div id="url" class=" user-select-all bg-gray-300 text-gray-700 p-4 text-xs rounded-lg cursor-pointer select-text border-2 font-medium border-gray-400">\
                      ' +
                        newUrl +
                        "\
                      </div>\
                      </div>"
                    )
                    .setHeader("Your QR Code");

                  let qrEl = document.getElementById("qr-code");
                  let qrUrl = document.getElementById("url");

                  if (this.qr.length < 2) {
                    QRCode.toCanvas(newUrl.href, (err, canvas) => {
                      if (err) throw err;

                      qrEl.insertBefore(canvas, qrUrl);
                      this.qr.push(data.qrcode);
                    });

                    qrUrl.addEventListener("click", () => {
                    qrUrl.classList.add("bg-green-200");
                    qrUrl.classList.add("border-green-300");
                    qrUrl.classList.add("text-green-700");
                    alertify.success("Copied!")
                    
                    var range = document.createRange();
                    range.selectNode(qrUrl);
                    window.getSelection().removeAllRanges(); // clear current selection
                    window.getSelection().addRange(range); // to select text
                    document.execCommand("copy");
                    window.getSelection().removeAllRanges();
                    
                  });
                  }
                  
                  this.loading = false;
                  alertify.success("สร้าง Qr Code สำเร็จ!");
                  store.commit("user/setLink", data.qrcode);
                } else {
                  console.log("Something went wrong.");
                }
              })
              .catch(e => {
                throw e;
              });
          });
      } catch (e) {
        console.log(e);
      }
    },
    logout() {
      this.$store.dispatch("user/signOut");
    }
  },
  computed: {
    ...mapGetters("user", {
      getProfile: "getProfile",
      getYear: "getYear",
      getLink: "getLink",
      getGate: "getGate"
    }),
    routeId() {
      return parseInt(this.$route.params.id);
    },
    showProfile() {
      return this.getProfileById(this.routeId);
    },
    gatePic() {
      return gate.filter(item => {
        return item.name === this.getGate;
      });
    }
  }
};
</script>
<style scoped>
.profile {
  @apply grid;
}

.profile-pic[lazy="loading"] {
  position: relative;
  background-color: #E2E2E2;
}

.profile-pic[lazy="loading"]::after {
  display: block;
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    transform: translateY(-100%);
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, .2), transparent);
    animation: loading 1s infinite;
}

@keyframes loading {
  100% {
    transform: translateY(100%);
  }
}

.profile-wrap {
  background-image: linear-gradient(
    to top,
    rgba(11, 9, 49, 0.9) 45%,
    transparent 70%
  );
}

.img-wrap {
  @apply flex content-start flex-col justify-center;
}

.details {
  @apply flex  flex-col flex-wrap justify-center content-center px-4;
}

.like {
  @apply flex flex-row justify-center content-center text-lg;
}

.stats {
  @apply flex flex-row justify-center content-center flex-wrap;
}
.stats .un-chased,
.stats .chased {
  flex: 0 1 20%;
}

.stats .chased {
  border-right: solid 1px;
  @apply border-gray-800;
}

.button-gp {
  @apply flex flex-row items-center justify-center content-center flex-wrap px-4;
}

.button-gp button {
  flex: 1 1 20%;
  @apply transition-all ease-in-out duration-300;
}

.button-gp button:hover {
  @apply bg-opacity-75;
}

.faculty {
  @apply text-sm text-gray-300 flex justify-center content-center;
}

.card {
  @apply bg-primary-850 rounded-md bg-opacity-50 text-primary-200 flex content-center items-stretch;
}

.card .img-place {
  flex: 1 0 25%;
}

.card .profile-col {
  flex: 1 1 50%;
  @apply flex flex-col content-start py-3 px-4;
}

.card .bro-name {
  @apply flex flex-col;
}

.card .bro-name h2 {
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  word-break: break-all;
}

.shadow-outline,
.shadow-outline:hover,
.hover\:shadow-outline:hover {
  box-shadow: 0 0 0 3px rgba(60, 54, 173, 0.65) !important;
}

@media screen and (max-width: 676.8px) {
  .stats .un-chased,
  .stats .chased {
    flex: 0 1 50%;
  }
}

@media (min-width: 678px) and (max-width: 1023.8px) {
  .stats .un-chased,
  .stats .chased {
    flex: 0 1 30%;
  }

  .button-gp button {
    flex: 0 1 30%;
  }
}

@media screen and (min-width: 1024px) {
  .button-gp button {
    flex: 0 1 20%;
  }
}

.ajs-dialog-custom {
  @apply bg-primary-1100 bg-opacity-75;
}
</style>