<template>
  <section class="w-screen min-h-screen profile-wrap">
    <div
      class="page-container"
    >
      <div class="profile container grid-cols-1 gap-10 self-center">
        <div class="img-wrap space-y-4" v-lazy-container="{ selector: 'img' }">
          <img
              :data-src="getProfile.photoURL? getProfile.photoURL + '?width=226' : getProfile.pic + '?width=226'"
              class="profile-pic object-cover h-32 w-32 md:h-40 md:w-40 rounded-full self-center"
          />
          <div class="details space-y-2 items-center">
            <h1 class="text-3xl text-primary-100 font-thin" >
              {{ getProfile.displayName ? getProfile.displayName : getProfile.name }}
            </h1>
          </div>
          <div class="faculty space-x-2 font-normal uppercase">
            <i class="fas fa-map-marked-alt"></i>
            <span>IT KMITL{{ getProfile.branch ? ", " + getProfile.branch : '' }}{{ getProfile.year ? " ปี " + getProfile.year : '' }}</span>
          </div>
          <div class="like space-x-4">
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
        <div class="stats">
          <div class="chased flex flex-col space-y-2 justify-center content-center">
            <span class="text-2xl font-semibold text-gray-200">268</span>
            <span class="text-sm font-normal text-gray-400">รุ่นพี่ที่ล่าไปแล้ว</span>
          </div>
          <div class="un-chased flex flex-col space-y-2 justify-center content-center">
            <span class="text-2xl font-semibold text-gray-200">2K</span>
            <span class="text-sm font-normal text-gray-400">รุ่นพี่ที่ยังไม่ได้ล่า</span>
          </div>
        </div>
        <div class="button-gp space-x-4 md:space-x-6 lg:space-x-8">

        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-5 xl:gap-10 self-center container px-8 my-12 md:my-24"
      >
        <div class="col-start-1 md:col-end-3 lg:col-end-4">
          <div class="flex flex-row justify-center md:justify-between items-center content-center">
            <h2 class="text-2xl lg:text-3xl font-normal text-gray-200 lg:text-left py-1 md:py-0">
              ล่าไปแล้วทั้งหมด
              <span class="text-primary font-semibold">{{ scanned }}</span> คน
            </h2>
            <button
              class="hidden md:block btn btn-block bg-transparent border-primary border-4 hover:bg-primary text-primary-100 text-sm py-2 px-6"
              @click="$router.go(-1)"
            >
              <i class="fas fa-chevron-left"></i> ย้อนกลับ
            </button>
          </div>
        </div>
        <div
          class="card px-8 sm:space-x-4 xl:px-10 py-12 sm:py-8 justify-center items-center flex-col sm:justify-between sm:flex-row cursor-pointer hover:shadow-outline"
          v-for="(item, i) in getProfile.scanSave" :key="i"
        >
          <div class="img-place self-center sm:py-0 py-3">
            <img
              :src="item.pic + '?width=120'"
              :alt="item.name"
              class="object-cover rounded-full w-32 h-32 md:w-full md:h-full"
            />
          </div>
          <div class="profile-col justify-center sm:justify-start sm:text-left">
            <div class="bro-name space-y-1">
              <h2 class="text-gray-300 font-semibold">{{ item.name }}</h2>
<!--              <span class="flex-1 text-gray-400 font-medium text-sm">test</span>-->
            </div>
            <div class="flex flex-col space-y-1 my-2">
              <span
                class="flex-1 text-gray-500 font-medium text-xs"
              >{{ item.branch }} KMITL, Year {{ item.year }}</span>
              <div class="flex-1 md:self-start space-x-2">
                <i class="fas fa-pizza-slice text-gray-500 text-sm"></i>
                <i class="fas fa-football-ball text-gray-500 text-sm"></i>
                <i class="fab fa-spotify text-gray-500 text-sm"></i>
                <i class="fas fa-film text-gray-500 text-sm"></i>
              </div>
            </div>
          </div>
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
import API from "../middleware/api/userApi"

var vm = this;

export default {
  components: {
  },
  data() {
    return {
      image: null,
      loading: false,
      scanned: 0
    };
  },
  beforeUpdate() {
    if (this.getYear === "1") this.image = this.gatePic[0].smallImg;

  },
  updated() {
    this.scanned = this.getScanned;
  },
  methods: {

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
    gatePic() {
      return gate.filter(item => {
        return item.name === this.getGate;
      });
    },
    getScanned() {
      return this.getProfile.scanSave.length
    }
  }
};
</script>
<style scoped>
.profile {
  @apply grid;
}

.page-container {
  @apply flex  flex-col content-center justify-center items-center h-full py-12;
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
  @apply border-primary-900;
}

.button-gp {
  @apply flex flex-row justify-center content-center flex-wrap px-4;
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
  @apply bg-primary-1100 rounded-md bg-opacity-75 text-primary-200 flex content-center items-stretch;
}

.card .img-place {
  flex: 1 0 25%;
  display: flex;
  justify-content: center;
}

.card .profile-col {
  flex: 1 1 60%;
  @apply flex flex-col content-start p-3;
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
</style>