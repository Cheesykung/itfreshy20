<template>
  <section class="w-screen min-h-screen profile-wrap">
    <div class="page-container">
      <v-popover offset="16" class="score-master space-x-2 cursor-pointer">
        <span class="flex flex-row">
          <div v-html="imgCoin"></div>
          {{ getProfile.point }}
        </span>
        <span slot="popover"
          >เหรียญ
          <span class="text-primary-200"
            >ที่ได้จากการล่า
            สามารถช่วยเพิ่มเปอร์เซ็นต์ในการจับคู่สายรหัสได้</span
          ></span
        >
      </v-popover>
      <div class="profile container grid-cols-1 gap-10 self-center">
        <div class="img-wrap space-y-4" v-lazy-container="{ selector: 'img' }">
          <img
            :data-src="
              getProfile.photoURL
                ? getProfile.photoURL + '?width=226'
                : getProfile.pic + '?width=226'
            "
            class="profile-pic object-cover h-32 w-32 md:h-40 md:w-40 rounded-full self-center"
          />
          <div class="details space-y-2 items-center">
            <h1 class="text-3xl text-primary-100 font-thin">
              {{
                getProfile.displayName
                  ? getProfile.displayName
                  : getProfile.name
              }}
            </h1>
          </div>
          <div class="faculty space-x-2 font-normal uppercase">
            <i class="fas fa-map-marked-alt"></i>
            <span
              >IT KMITL{{ getProfile.branch ? ", " + getProfile.branch : ""
              }}{{ getProfile.year ? " ปี " + getProfile.year : "" }}</span
            >
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
              <img
                class="object-cover w-full"
                :data-src="image"
                v-if="image !== null"
              />
              <ion-icon name="skull-outline" v-else></ion-icon>
              <p class="capitalize">{{ getProfile.status }}</p>
            </span>
          </div>
        </div>
        <!--- Profile Stats --->
        <div class="stats items-stretch">
          <div
            class="chased flex flex-col space-y-2 justify-center content-center cursor-pointer"
            @click="$router.push('/hunted')"
          >
            <span class="text-2xl font-semibold text-gray-200">{{
              getProfile.count ? getProfile.count : 0
            }}</span>
            <span class="text-sm font-normal text-gray-400"
              >คนที่ล่าไปแล้ว</span
            >
          </div>
          <div
            class="un-chased flex flex-col space-y-2 justify-center content-center"
          >
            <span class="text-2xl font-semibold text-gray-200">{{
              getProfile.year === 1
                ? getProfile.count
                  ? Math.abs(235 - getProfile.count)
                  : 235
                : getProfile.count
                ? Math.abs(235 - getProfile.count)
                : 235
            }}</span>
            <span class="text-sm font-normal text-gray-400"
              >คนที่คุณยังไม่ได้ล่า</span
            >
          </div>
        </div>
        <!--- Profile button --->
        <div class="button-gp py-6">
          <button
            class="btn-random animate-pulse"
            v-if="!isShow && getProfile.year === '1'"
            disabled
          >
            WAIT FOR YOUR CAPTAIN!
            <!-- <div class="bar top"></div>
            <div class="bar right delay"></div>
            <div class="bar bottom delay"></div>
            <div class="bar left"></div> -->
          </button>
          <span class="text-3xl text-secondary_b font-normal" v-else>
            <p>หมดเวลากิจกรรม</p>
            <p class="text-lg text-green_blue-200 py-3">โปรดรอการประกาศอย่างเป็นทางการ</p>
            </span>
          <!-- <span class="loading" v-if="isShow"></span> -->
        </div>
        <!-- <div class="button-gp space-x-4 md:space-x-6 lg:space-x-8 py-6" v-if="isVisible">
          <button
            class="px-2 py-3 bg-primary-600 text-primary-200 rounded text-sm w-full"
            id="qrscan"
            @click="$router.push({ path: '/qrscan' })"
          >
            สแกนคิวอาร์โค้ด
          </button>
          <button
            class="px-2 py-3 bg-primary-800 text-primary-200 rounded text-sm"
            @click="genQr()"
          >
            <span :class="loading ? 'loading text-sm' : ''">{{
              !loading ? "รับลิงค์เพื่อสแกน" : ""
            }}</span>
          </button>
        </div>
        <span class="hero" v-if="isVisible">
          จำนวนที่ล่าได้ในวันนี้
        </span>
        <div class="daily_stats" v-if="isVisible">
          <div class="stats_item space-y-4">
            <span
              :class="
                getProfile.year1 != 0 ? 'text-secondary_b' : 'text-primary-300'
              "
              >{{
                getProfile.year1 != 0 ? getProfile.year1 : "ยังไม่ได้ล่า"
              }}</span
            >
            <p>ปีหนึ่ง</p>
          </div>
          <div class="stats_item space-y-4">
            <span
              :class="
                getProfile.year2 != 0 ? 'text-secondary_b' : 'text-primary-300'
              "
              >{{
                getProfile.year2 != 0 ? getProfile.year2 : "ยังไม่ได้ล่า"
              }}</span
            >
            <p>ปีสอง</p>
          </div>
          <div class="stats_item space-y-4">
            <span
              :class="
                getProfile.year3 != 0 ? 'text-secondary_b' : 'text-primary-300'
              "
              >{{
                getProfile.year3 != 0 ? getProfile.year3 : "ยังไม่ได้ล่า"
              }}</span
            >
            <p>ปีสาม</p>
          </div>
          <div class="stats_item space-y-4">
            <span
              :class="
                getProfile.year4 != 0 ? 'text-secondary_b' : 'text-primary-300'
              "
              >{{
                getProfile.year4 != 0 ? getProfile.year4 : "ยังไม่ได้ล่า"
              }}</span
            >
            <p>ปีสี่</p>
          </div>
        </div> -->
      </div>
    </div>
    <!-- <div class="modal_wrap animate__animated animate__fadeIn" :class="isShow === true ? 'flex' : 'hidden'" id="modal_content">
      <circle-loader v-if="modalLoading" />
      <close-btn @click="closeModal()">Close</close-btn>
      <Random />
    </div> -->
  </section>
</template>
<script>
/* eslint-disable */
import "animate.css";
import { mapGetters } from "vuex";
import axios from "axios";
import alertify from "alertifyjs";
import gate from "../store/modules/gateModule";
import firebase from "firebase/app";
import "firebase/auth";
import store from "../store";
import QRCode from "qrcode";
import API from "../middleware/api/userApi";

var vm = this;

export default {
  data() {
    return {
      isVisible: false,
      image: null,
      loading: false,
      isShow: false,
      modalLoading: false,
      qr: new Array(1),
      imgCoin:
        '<img src="img/icons/coin.png" alt="coin" class="w-6 h-6 object-cover mx-2 block" />'
    };
  },
  components: {
    Random: () => import("../components/functional/Random"),
    circleLoader: () => import("../components/util/circleLoader"),
    CloseBtn: () => import("../components/util/CloseBtn")
  },
  beforeUpdate() {
    //if (this.getYear === "1") this.image = this.gatePic[0].smallImg;
  },
  methods: {
    openModal() {
      this.modalLoading = true;
      this.isShow = true;
    },
    closeModal() {
      this.isShow = false;
    },
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
              .get(API + "test/genqrcode/", {
                withCredentials: true,
                headers: {
                  FIREBASE_AUTH_TOKEN: idToken
                }
              })
              .then(setQr => {
                if (setQr.status === 200) {
                  let data = setQr.data;
                  let url = new URL(data.qrcode);
                  let newUrl = url.pathname
                    .toString()
                    .substring(url.pathname.lastIndexOf("qrcode"));
                  newUrl = newUrl.replace("qrcode/", "scan/");
                  newUrl = new URL("https://hunter.war.in.th/" + newUrl);

                  alertify
                    .alert(
                      '<div id="qr-code" class="flex flex-col space-y-6 justify-center content-center items-center py-6">\
                      <div id="url" class=" break-all block user-select-all bg-gray-300 text-gray-700 p-4 text-xs rounded-lg cursor-pointer select-text border-2 font-medium border-gray-400">\
                      ' +
                        newUrl +
                        "\
                      </div> " +
                        '<div class="text-red-600 font-semibold text-xs text-left">ทุกปีสามารถสแกนกันได้</div> </div>'
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
                      alertify.success("Copied!");

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
  watch: {
    gatePic(val, oldVal) {
      if (this.getYear === "1") this.image = val[0].smallImg;
    },
    getProfile(val, oldVal) {}
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
#qrscan {
  position: relative;
}

#qrscan .notify {
  position: absolute;
  top: -1rem;
  right: -1rem;
  @apply bg-complementary-treda px-2 py-1 rounded-full text-xs;
}

.modal_wrap {
  @apply fixed top-0 justify-center items-center max-w-full w-screen min-h-screen bg-opacity-75 bg-primary-1100 z-50 transition-all ease-linear duration-150;
}

.btn-random {
  box-shadow: 2px 2px 16px #0a9e6a;
  font-size: 1rem;
  @apply max-w-sm bg-primary-1000 bg-opacity-75 rounded-full border-secondary_b border-2 py-4 px-6 text-primary-250 transition-all duration-150 ease-linear;
}

.btn-random:hover {
  box-shadow: 2px 2px 16px 8px #0a9e6a;
}

.bar {
  position: absolute;
  width: 50px;
  height: 5px;
  background: #fff;
  transition: all 1s linear;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
  -webkit-animation-iteration-count: infinite;
  animation-iteration-count: infinite;
}
.bar.delay {
  animation-delay: 0.5s;
  -webkit-animation-delay: 0.5s;
}
.top {
  top: -5px;
  left: -5px;
}
.right {
  top: 18px;
  right: -28px;
  transform: rotate(90deg);
}
.bottom {
  bottom: -5px;
  left: -5px;
}
.left {
  top: 18px;
  left: -28px;
  transform: rotate(90deg);
}
@-webkit-keyframes h-move {
  0% {
    left: -5px;
  }
  100% {
    left: 200px;
  }
}
@keyframes h-move {
  0% {
    left: -5px;
  }
  100% {
    left: 200px;
  }
}
.top,
.bottom {
  -webkit-animation-name: h-move;
  animation-name: h-move;
}
@-webkit-keyframes v-move {
  0% {
    top: -5px;
  }
  100% {
    top: 228px;
  }
}
@keyframes v-move {
  0% {
    top: -5px;
  }
  100% {
    top: 228px;
  }
}
.right,
.left {
  -webkit-animation-name: v-move;
  animation-name: v-move;
}

.btn-random {
  flex: 1 1 50% !important;
}

.daily_stats {
  @apply grid grid-cols-2 gap-8 max-w-xl w-full mx-auto text-purple-200 my-4;
}

.daily_stats .stats_item {
  @apply flex flex-col justify-center items-stretch;
}

.daily_stats .stats_item span {
  @apply text-2xl;
}

.daily_stats .stats_item p {
  @apply text-sm font-thin;
}

@screen md {
  .daily_stats {
    @apply grid grid-cols-4;
  }
}

.hero {
  @apply max-w-2xl mx-auto text-3xl text-secondary_b text-center;
}

.profile {
  @apply grid;
}

.page-container {
  @apply flex  flex-col content-center justify-center items-center h-full pb-12 relative;
}

.score-master {
  top: -50px;
  right: 4%;
  transform: translateX(-4%);
  text-shadow: 0 1px 0 rgb(0, 170, 100);
  @apply absolute text-secondary_b flex flex-row justify-center items-center;
}

.tooltip {
  font-family: "Prompt";
}

.profile-pic[lazy="loading"] {
  position: relative;
  background-color: #e2e2e2;
}

.profile-pic[lazy="loading"]::after {
  display: block;
  content: "";
  position: absolute;
  width: 100%;
  height: 100%;
  transform: translateY(-100%);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
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
  @apply py-12 relative;
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