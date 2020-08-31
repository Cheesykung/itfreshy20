<template>
  <section class="w-screen min-h-screen profile-wrap">
    <div class="flex flex-col content-center justify-center items-center h-full py-12">
      <div class="profile container grid-cols-1 md:gap-10 gap-12 self-center">
        <div class="img-wrap space-y-4" v-lazy-container="{ selector: 'img' }">
          <img
            :data-src="getProfile.photoURL + '?width=500'"
            class="object-cover h-32 w-32 md:h-40 md:w-40 rounded-full self-center"
          />
          <div class="details space-y-2 items-center">
            <h1 class="text-3xl text-primary-100 font-thin">{{ getProfile.displayName }}</h1>
          </div>
          <div class="faculty space-x-2 font-normal uppercase">
            <i class="fas fa-map-marked-alt"></i>
            <span>IT KMITL</span>
          </div>
          <div class="like space-x-4">
            <i class="fas fa-pizza-slice text-gray-400"></i>
            <i class="fas fa-football-ball text-gray-400"></i>
            <i class="fab fa-spotify text-gray-400"></i>
            <i class="fas fa-film text-gray-400"></i>
          </div>
        </div>
        <!--- Profile Stats --->
        <div class="stats items-stretch">
          <div class="chased flex flex-col space-y-2 justify-center content-center">
            <span class="text-2xl font-semibold text-gray-200">1K</span>
            <span class="text-sm font-normal text-gray-400">รุ่นพี่ที่ล่าไปแล้ว</span>
          </div>
          <div class="un-chased flex flex-col space-y-2 justify-center content-center">
            <span class="text-3xl font-semibold text-gray-200 -m-1">
              <ion-icon name="skull-outline"></ion-icon> 
            </span>
            <span class="text-sm font-normal text-gray-400">รุ่นพี่ที่ยังไม่ได้ล่า</span>
          </div>
        </div>
        <!--- Profile button --->
        <div class="button-gp space-x-4 md:space-x-6 lg:space-x-8">
          <button
            class="px-2 py-3 bg-primary-600 text-primary-200 rounded text-sm animate-pulse"
            @click="$router.push({ path: '/bounty' })"
          >ล่ารายชื่อเลย!</button>
          <button
            class="px-2 py-3 bg-primary-850 text-primary-200 rounded text-sm"
            @click="genQr()"
          >สร้างลิงค์ใหม่</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { mapGetters } from "vuex";
import axios from "axios";
import alertify from "alertifyjs";
import Cookies from "js-cookie";

export default {
  data() {
    return {};
  },
  mounted() {
  },
  methods: {
    goProfile(id) {
      this.$router.push({ path: "/profile/" + id });
    },
    async genQr() {
      try {
        const setQr = await axios.get(
          "https://us-central1-itfreshy2020.cloudfunctions.net/test/genqrcode/", Cookies.get("user"),
          {
            withCredentials: true,
            headers: {
              "Content-Type": "text/html"
            }
          }
        );

        if (setQr.status === 200) {
          let data = await setQr.data;
          alertify.success("สร้างลิงค์สำเร็จ!");
          alertify.alert("QR Code ของคุณ", data.qrcode);
          this.$store.commit("user/setLink", data.qrcode);
        } else {
          console.log("Something went wrong.");
        }
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
      getLink: "getLink"
    }),
    routeId() {
      return parseInt(this.$route.params.id);
    },
    showProfile() {
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
</style>