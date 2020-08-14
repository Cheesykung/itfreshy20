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
            <!-- <span class="text-gray-500 font-normal text-sm">#6207002</span> -->
            <h1 class="text-3xl text-gray-100 font-thin">{{ getProfile.name }}</h1>
          </div>
          <div class="faculty space-x-2 font-normal uppercase">
            <i class="fas fa-map-marked-alt"></i>
            <span>IT KMITL, รุ่น 18</span>
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
            class="px-2 py-3 bg-blue-600 text-blue-100 rounded text-sm animate-pulse"
          >ล่ารายชื่อเลย!</button>
          <button class="px-2 py-3 bg-blue-900 text-blue-100 rounded text-sm">สร้างลิงค์ใหม่</button>
        </div>
      </div>
      <div
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-6 lg:gap-5 xl:gap-10 self-center container px-10 my-20 md:my-24"
      >
        <div class="col-start-1 md:col-end-3 lg:col-end-4">
          <div class="flex flex-row justify-center md:justify-between items-center content-center">
            <h2 class="text-2xl lg:text-3xl font-normal text-gray-200 lg:text-left py-1 md:py-0">
              <span class="text-blue-600 font-semibold">{{ getBro.length }}</span> คนล่าสุดที่ถูกคุณล่า
            </h2>
            <button
              class="hidden md:block btn btn-block bg-transparent border-blue-600 border-4 hover:bg-blue-600 text-blue-100 text-sm py-2 px-6"
              @click="seeAll()"
            >
              ดูทั้งหมด
              <i class="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
        <div
          class="card px-8 xl:px-10 py-12 md:py-8 justify-center flex-col md:justify-between md:flex-row cursor-pointer hover:shadow-outline"
          v-for="item in getBro"
          @click="goProfile(item.id)"
          :key="item.id"
        >
          <div class="img-place self-center md:py-0 py-3">
            <img
              :src="item.img"
              alt="profile picture"
              class="object-cover rounded-full w-32 h-32 md:w-24 md:h-24"
            />
          </div>
          <div class="profile-col justify-center md:justify-start md:text-left">
            <div class="bro-name space-y-1">
              <h2 class="text-gray-300 font-semibold">{{ item.name }}</h2>
              <span class="flex-1 text-gray-400 font-medium text-sm">{{ item.nickName }}</span>
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
              class="text-3xl text-gray-100 font-thin"
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
    return {};
  },
  created() {
    this.getFacebookAuth();
  },
  methods: {
    ...mapActions("user", { getFacebookAuth: "getFacebookAuth"}),
   // ...mapActions("register", ["setGender"]),
    goProfile(id) {
      this.$router.push({ path: "/profile/" + id });
    },
    submitGen(gen) {
      return this.setGender(gen)
    },
    goBack() {
      return this.$router.go(-1);
    },
    seeAll() {
      return this.$router.push("/hunted");
    }
  },
  computed: {
    ...mapGetters("user", {
      getProfile: "getProfile",
      getBro: "getBro",
      getProfileById: "getProfileById"
    }),
   // ...mapGetters("register", ["getGender"]),
    routeId() {
      return parseInt(this.$route.params.id);
    },
    showProfile() {
      //let route = this.$route.params.id;
      return this.getProfileById(this.routeId);
    }
  }
};
</script>
<style scoped>
.profile {
  @apply grid;
}

.profile-wrap {
  background-image: linear-gradient(
    to top,
    rgba(23, 35, 59, 0.9) 45%,
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
  @apply bg-gray-800 rounded-md bg-opacity-50 text-gray-300 flex content-center items-stretch;
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