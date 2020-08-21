<template>
  <section class="w-screen min-h-screen profile-wrap">
    <div
      class="flex flex-col content-center justify-center items-center h-full py-12"
      v-if="!this.$route.params.id"
    >
      <div class="profile container grid-cols-1 md:gap-10 gap-12 self-center">
        <div class="img-wrap space-y-4">
          <img
            :src="getProfile.pic"
            class="object-cover h-32 w-32 md:h-40 md:w-40 rounded-full self-center"
          />
          <div class="details space-y-2 items-center">
            <h1 class="text-3xl text-primary-100 font-thin">{{ getProfile.name }}</h1>
          </div>
          <div class="faculty space-x-2 font-normal uppercase">
            <i class="fas fa-map-marked-alt"></i>
            <span>IT KMITL, ปี {{ year }}</span>
          </div>
          <div class="like space-x-4">
            <i class="fas fa-pizza-slice text-gray-400"></i>
            <i class="fas fa-football-ball text-gray-400"></i>
            <i class="fab fa-spotify text-gray-400"></i>
            <i class="fas fa-film text-gray-400"></i>
          </div>
        </div>
        <!--- Profile Stats --->
        <div class="stats">
          <div class="chased flex flex-col space-y-2 justify-center content-center">
            <span class="text-2xl font-semibold text-gray-200">{{ hunted }}</span>
            <span class="text-sm font-normal text-gray-400">รุ่นพี่ที่ล่าไปแล้ว</span>
          </div>
          <div class="un-chased flex flex-col space-y-2 justify-center content-center">
            <span class="text-2xl font-semibold text-gray-200">2K</span>
            <span class="text-sm font-normal text-gray-400">รุ่นพี่ที่ยังไม่ได้ล่า</span>
          </div>
        </div>
        <!--- Profile button --->
        <div class="button-gp space-x-4 md:space-x-6 lg:space-x-8">
          <button
            class="px-2 py-3 bg-primary-600 text-primary-200 rounded text-sm animate-pulse"
          >ล่ารายชื่อเลย!</button>
          <button class="px-2 py-3 bg-primary-850 text-primary-200 rounded text-sm" @click="genQr()">สร้างลิงค์ใหม่</button>
        </div>
      </div>
    </div>
    <!--- SEE ANOTHER PROFILE --->
    <div class="flex flex-col content-center justify-center items-center h-full py-12" v-else>
      <div class="profile container grid-cols-1 md:gap-10 gap-12 self-center">
        <div class="img-wrap space-y-4">
          <img
            :src="showProfile.img"
            class="object-cover h-32 w-32 md:h-40 md:w-40 rounded-full self-center"
          />
          <div class="details space-y-2 items-center">
            <!-- <span class="text-gray-500 font-normal text-sm">#6207002</span> -->
            <h1
              class="text-3xl text-primary-100 font-thin"
            >{{ showProfile.name }} ({{ showProfile.nickName }})</h1>
          </div>
          <div class="faculty space-x-2 font-normal uppercase">
            <i class="fas fa-map-marked-alt"></i>
            <span>{{ showProfile.branch }} KMITL, ปี {{ showProfile.year }}</span>
          </div>
          <div class="like space-x-4">
            <i class="fas fa-pizza-slice text-gray-400"></i>
            <i class="fas fa-football-ball text-gray-400"></i>
            <i class="fab fa-spotify text-gray-400"></i>
            <i class="fas fa-film text-gray-400"></i>
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
          <button
            class="px-2 py-3 border-blue-600 border-4 text-blue-100 rounded text-sm"
          >ข้อมูลส่วนตัว</button>
          <button
            class="px-2 py-3 bg-blue-900 text-blue-100 rounded text-sm"
            @click="goBack()"
          >ย้อนกลับ</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isShow: false
    };
  },
  created() {
    this.getFacebookAuth();
  },
  methods: {
    ...mapActions("user", { getFacebookAuth: "getFacebookAuth" }),
    // ...mapActions("register", ["setGender"]),
    goProfile(id) {
      this.$router.push({ path: "/profile/" + id });
    },
    submitGen(gen) {
      return this.setGender(gen);
    },
    goBack() {
      return this.$router.go(-1);
    },
    seeAll() {
      return this.$router.push("/hunted");
    },
    genQr() {
      return window.open('/genqrcode', '_blank')
    }
  },
  computed: {
    ...mapGetters("user", {
      getProfile: "getProfile",
      getBro: "getBro",
      getProfileById: "getProfileById",
      hunted: "getHuntedCount",
      year: "getYear"
    }),
    // ...mapGetters("register", ["getGender"]),
    routeId() {
      return parseInt(this.$route.params.id);
    },
    showProfile() {
      //let route = this.$route.params.id;
      return this.getProfileById(this.routeId);
    }
  },
  mounted() {}
};
</script>
<style scoped>
.profile {
  @apply grid;
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

.shadow-outline, .shadow-outline:hover, .hover\:shadow-outline:hover {
  box-shadow: 0 0 0 3px rgba(60,54,173, .65) !important;
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